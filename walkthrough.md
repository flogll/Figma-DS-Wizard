# Walkthrough — DS Wizard Web App

Le projet est maintenant une application web moderne (PWA) hébergée sur GitHub Pages.

## 🚀 Fonctionnalités implémentées

![Aperçu de l'application DS Wizard héritée de Vite](./docs/assets/ds_wizard_verification_1773245667954.webp)

- **Accès Direct** : L'outil est utilisable instantanément via ton URL GitHub Pages sans aucune installation.
- **Structure modulaire** : Séparation nette entre la logique métier (`logic.js`) et l'interface React (`Interface.jsx`).
- **Support PWA** : 
    - Icône personnalisée et manifeste web configurés.
    - Fonctionne hors-ligne grâce au Service Worker.
- **Accents & Contrastes** : Ajout d'un validateur d'accessibilité AAA en temps réel.
    - **Lead accent sur Neutre** : Affiché en premier (texte large, règle 4.5:1).
    - **Body on-brand sur Accent** : Affiché en second (texte normal, règle 7:1).
    - **Indicateurs visuels** : Bordure rouge si le contraste échoue, avec tooltip suggérant la couleur AAA la plus proche.

![Refonte du layout Accent](./docs/assets/step_2_verification_1773252589084.png)

- **Déploiement Automatique** : GitHub Actions gère la mise en ligne à chaque `git push`.

## 🔧 Correctifs & Fiabilisation
- **Anti-crash Couleur** : Les fonctions de calcul de contraste sont désormais protégées contre les saisies hexadécimales incomplètes (ex: `#f`, `#`), évitant ainsi tout crash de l'interface lors de la frappe.

![Test de saisie hexadécimale sécurisée](./docs/assets/hex_input_test_1773253148214.png)

## ✨ Comment l'utiliser ?

1. **Outil Web** : Accède simplement à l'URL de ton projet.
2. **Installation (Optionnel)** : Si tu souhaites l'avoir comme une app macOS, utilise le bouton "Installer" (icône `+`) dans ton navigateur.

## 🛠️ Maintenance & Evolution

Pour toute modification, suis le workflow :
1. Modifie le code.
2. Teste avec `npm run dev`.
3. Push avec `git push origin main`.
Le site se mettra à jour tout seul.
