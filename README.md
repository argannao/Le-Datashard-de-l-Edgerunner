# Le Datashard de l'Edgerunner

Site de référence **non officiel** en français pour le jeu de rôle **Cyberpunk RED** (R. Talsorian Games), sur le même principe que *Le Grimoire de l'aventurier* : un menu d'accueil et des modules HTML.

## Modules

| Groupe | Fichier | Contenu |
|---|---|---|
| — | `index.html` | Menu d'accueil |
| Univers | `lore.html` | Chronologie, Night City, corporations, gangs, districts |
| Univers | `glossaire.html` | Argot de la rue, correspondances VO / VF |
| Personnage | `roles.html` | Les dix rôles et leurs capacités |
| Personnage | `creation.html` | Méthodes de création, caractéristiques, 66 compétences, Lifepath |
| Règles | `regles.html` | Test au d10, SD, critiques, Chance, lanceur de dés |
| Règles | `combat.html` | Initiative, dégâts, armure, blessures, mort |
| Règles | `netrunning.html` | Architectures NET, netrunning furtif, piratage d'Agent, cyberdecks, Black ICE |
| Règles | `systemes.html` | Météo, enquêtes, récupération, entretien, QG, sports, succès, règles maison |
| Matériel | `equipement.html` | Prix, armes, armures, Black Chrome, Night Markets |
| Matériel | `cyberware.html` | Familles d'implants, Humanité, cyberpsychose |
| Meneur de jeu | `pnj.html` | Gens ordinaires, adversaires renforcés, cyberpets |
| Meneur de jeu | `missions.html` | Scénarios, Toggle's Temple, prétirés, architectures NET, idées de campagne |
| Référence | `extensions.html` | La gamme, les titres en VF et les 48 DLC gratuits intégrés |

Styles et scripts partagés dans `assets/` (`style.css`, `app.js`). Aucun outil de build : le site fonctionne tel quel.

## Publication

GitHub Pages : *Settings → Pages → Deploy from a branch → `main` / root*.

## Ajouter un module

1. Copier un module existant (par ex. `combat.html`).
2. Changer le code `SHARD-XX`, le titre et le contenu.
3. Ajouter une carte `.shard` dans le bon groupe de `index.html`, puis mettre à jour la numérotation et la navigation précédent / suivant.

## Mentions

Fan-site gratuit et non commercial. Cyberpunk, Cyberpunk RED et Night City sont des marques de R. Talsorian Games Inc. et de CD Projekt Red. Les règles sont résumées et reformulées ; référez-vous aux livres officiels pour le texte complet.
