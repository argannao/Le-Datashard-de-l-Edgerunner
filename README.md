# Le Datashard de l'Edgerunner

Site de référence **non officiel** en français pour le jeu de rôle **Cyberpunk RED** (R. Talsorian Games), sur le même principe que *Le Grimoire de l'aventurier* : un menu d'accueil et des modules HTML.

## Modules

| Fichier | Contenu |
|---|---|
| `index.html` | Menu d'accueil |
| `roles.html` | Les dix rôles et leurs capacités |
| `creation.html` | Méthodes de création, caractéristiques, Lifepath |
| `regles.html` | Test au d10, SD, critiques, Chance, lanceur de dés |
| `combat.html` | Initiative, dégâts, armure, blessures, mort |
| `netrunning.html` | Architectures NET, actions, programmes, Black ICE |
| `cyberware.html` | Familles d'implants, Humanité, cyberpsychose |
| `equipement.html` | Prix, armes, armures, Night Markets |
| `lore.html` | Chronologie, Night City, corporations, gangs |
| `glossaire.html` | Argot de la rue |

Styles et scripts partagés dans `assets/` (`style.css`, `app.js`). Aucun outil de build : le site fonctionne tel quel.

## Publication

GitHub Pages : *Settings → Pages → Deploy from a branch → `main` / root*.

## Ajouter un module

1. Copier un module existant (par ex. `combat.html`).
2. Changer le code `SHARD-XX`, le titre et le contenu.
3. Ajouter une carte `.shard` dans `index.html`.

## Mentions

Fan-site gratuit et non commercial. Cyberpunk, Cyberpunk RED et Night City sont des marques de R. Talsorian Games Inc. et de CD Projekt Red. Les règles sont résumées et reformulées ; référez-vous aux livres officiels pour le texte complet.
