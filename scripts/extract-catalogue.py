#!/usr/bin/env python3
"""Extrait les 22 fiches du catalogue Word (export HTML pandoc) vers un JSON brut.

Aucune reformulation : les textes sont copiés tels quels depuis le Word.
Usage : python3 -I scripts/extract-catalogue.py source/catalogue-word.html content/catalogue/formations.raw.json
"""
import json
import re
import sys

from bs4 import BeautifulSoup, NavigableString

SRC, OUT = sys.argv[1], sys.argv[2]
soup = BeautifulSoup(open(SRC, encoding="utf-8").read(), "html.parser")

TITLE_RE = re.compile(r"^(Thème (\d)|([CB]\d)) · (.+)$")
LABELS = {
    "DURÉE": "duree", "FORMAT": "format", "PUBLIC": "public", "PRÉREQUIS": "prerequis",
    "LIEU": "lieu", "PÉRIODE": "periode", "COÛT DE PARTICIPATION": "cout", "HÉBERGEMENT": "hebergement",
}
LEFT_LABELS = {
    "Problématique & enjeux": "problematique", "Compétences visées": "competences",
    "Livrable": "livrable", "Prolonge la COPAF 2026": "prolonge",
    "Ports concernés (projets publics)": "portsConcernes",
    "Différence avec le Thème 2": "differenceT2", "Prolonge la COPAF": "prolonge",
}


def clean(t: str) -> str:
    return re.sub(r"\s+", " ", t.replace(" ", " ")).strip()


def cell_pairs(cell):
    """Dans une cellule : <p><strong>LABEL</strong></p><p>valeur</p>... -> [(label, valeur)]"""
    pairs, label = [], None
    for p in cell.find_all("p", recursive=False):
        strong = p.find("strong")
        if strong and clean(strong.get_text()) == clean(p.get_text()):
            label = clean(p.get_text())
            pairs.append([label, []])
        elif label is not None:
            pairs[-1][1].append(clean(p.get_text()))
    return [(l, " ".join(v)) for l, v in pairs]


fiches = []
for h1 in soup.find_all("h1"):
    m = TITLE_RE.match(clean(h1.get_text()))
    if not m:
        continue
    code = f"T{m.group(2)}" if m.group(2) else m.group(3)
    fiche = {"code": code, "titreWord": clean(h1.get_text()), "intitule": clean(m.group(4))}
    # fil d'Ariane (paragraphe en gras juste avant le titre)
    prev = h1.find_previous_sibling()
    if prev is not None and prev.name == "p":
        fiche["filAriane"] = clean(prev.get_text())
    tables, objectif = [], None
    for sib in h1.find_next_siblings():
        if sib.name == "h1":
            break
        if sib.name == "table":
            tables.append(sib)
        elif sib.name == "p" and clean(sib.get_text()).startswith("Objectif."):
            objectif = clean(sib.get_text())[len("Objectif."):].strip()
    fiche["objectif"] = objectif
    # tableau 1 : infos clés
    for cell in tables[0].find_all(["th", "td"]):
        for label, val in cell_pairs(cell):
            if label in LABELS:
                fiche[LABELS[label]] = val or None
            else:
                raise SystemExit(f"{code}: libellé inconnu {label!r}")
    for key in LABELS.values():
        fiche.setdefault(key, None)
    # tableau 2 : enjeux / compétences / livrable + contenu
    left, right = tables[1].find_all(["th", "td"])[:2]
    for label, val in cell_pairs(left):
        if label not in LEFT_LABELS:
            raise SystemExit(f"{code}: libellé gauche inconnu {label!r}")
        fiche[LEFT_LABELS[label]] = val
    fiche["contenu"] = [clean(li.get_text()) for li in right.find_all("li")]
    fiches.append(fiche)

json.dump(fiches, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print(f"{len(fiches)} fiches :", " ".join(f["code"] for f in fiches))
