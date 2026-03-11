# 📔 Guide Technique & Workflow — DS Wizard

Ce document récapitule l'évolution de ton projet, son architecture actuelle et comment tu peux continuer à le faire progresser.

---

## 🏗️ 1. L'évolution du projet

Au départ, nous avions un fichier monolithique `.jsx`. Nous l'avons transformé en une véritable **Web Application moderne** basée sur **Vite + React**.

### Pourquoi avoir séparé les fichiers ?
- **`logic.js` (Le Cerveau)** : Contient les données (catalogue de composants, constantes) et les fonctions de calcul (générateurs JSON/Markdown). C'est du code "pur" qui n'a pas besoin de React pour exister.
- **`Interface.jsx` (Le Corps)** : Contient l'interface visuelle et la gestion de l'état (quel onglet est ouvert, quelle case est cochée). Il appelle les fonctions de `logic.js` pour afficher les résultats.

> [!TIP]
> Cette séparation permet de modifier le catalogue de composants dans `logic.js` sans risquer de casser le design dans `Interface.jsx`.

---

## 🛠️ 2. Structure et Technique

### Les fichiers clés du projet
- **`index.html`** : La porte d'entrée. Il contient la balise `<div id="root"></div>` où React vient "dessiner" l'application.
- **`vite.config.js`** : Le centre de commande. Il configure la PWA et indique à l'app qu'elle est hébergée dans le sous-dossier `/Figma-DS-Wizard/` (la propriété `base`).
- **`.github/workflows/deploy.yml`** : Le robot de déploiement. C'est une **GitHub Action** qui, à chaque fois que tu envoies du code, lance un ordinateur virtuel pour compiler ton projet et le mettre en ligne.

### Les "super-pouvoirs" ajoutés (PWA)
- **Manifeste** : Un fichier JSON qui dit au navigateur "Ceci est une application, voici son icône et son nom".
- **Service Worker** : Un script qui tourne en arrière-plan et qui enregistre les fichiers essentiels. C'est grâce à lui que l'app fonctionne même si tu coupes ton Wi-Fi.

---

## 🚀 3. Workflow : Comment modifier ton projet ?

En tant que novice, voici la routine simplifiée pour apporter des modifications :

### Étape A : Modifier localement
1. Ouvre ton projet dans ton éditeur.
2. Si tu veux ajouter un composant, va dans `src/logic.js` et modifie `COMPONENT_CATALOG`.
3. Si tu veux changer une couleur de l'interface, va dans `src/Interface.jsx`.

### Étape B : Tester (toujours !)
Avant d'envoyer, vérifie que tout marche sur ton ordinateur :
```bash
npm run dev
```
Ouvre `http://localhost:5173` pour voir les changements en direct.

### Étape C : Envoyer sur GitHub
Une fois satisfait, utilise ces trois commandes magiques dans ton terminal :

1. **Préparer les fichiers** :
   ```bash
   git add .
   ```
2. **Nommer ton changement** :
   ```bash
   git commit -m "Ajout du composant Bouton Radio"
   ```
3. **Envoyer** :
   ```bash
   git push origin main
   ```

---

## 🪄 4. Que se passe-t-il après le `push` ?

C'est là que la magie opère :
1. **GitHub reçoit ton code**.
2. Il voit le dossier `.github/workflows` et lance le "robot".
3. **Le robot compile** ton code (il fait un `npm run build` tout seul).
4. **Il met à jour le site** : Le résultat de la compilation est envoyé sur la branche `gh-pages`.
5. Ton site sur `flogll.github.io/Figma-DS-Wizard/` est mis à jour automatiquement au bout de ~60 secondes.

---

### Résumé des commandes utiles
- `npm run dev` : Pour travailler et voir les changements en temps réel.
- `npm run build` : Pour vérifier que la compilation finale ne comporte pas d'erreurs.
- `git status` : Pour voir quels fichiers tu as modifiés.
