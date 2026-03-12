# 🧙‍♂️ Figma DS Wizard

Générez vos variables Figma et documentez vos composants Design System en quelques étapes simples.

🚀 **Accéder à l'outil en ligne : [https://flogll.github.io/Figma-DS-Wizard/](https://flogll.github.io/Figma-DS-Wizard/)**

---

## 🛠️ Développement & Structure

Ce projet est une application HTML/Javascript "Vanilla" ultra-légère, utilisant **Alpine.js** pour la réactivité. Il est conçu pour être modulaire, rapide et installable (PWA) **sans aucune étape de build (Buildless)**.

- **`assets/logic.js`** : Contient toute la logique métier et le catalogue de composants (JavaScript pur).
- **`assets/app.js`** : Gère l'état de l'application via Alpine.js.
- **`index.html`** / **`assets/style.css`** : Structure et styles de l'interface.
- **Déploiement** : Automatisé via GitHub Actions vers GitHub Pages (déploiement direct).

## 📖 Documentation technique

Si tu souhaites modifier ce projet ou comprendre comment il fonctionne :
- **[Guide Technique & Workflow](./guide_technique.md)**

---

## 💻 Workflow de mise à jour

1. Modifier le code dans `/assets` ou `index.html`
2. Tester localement via un serveur local HTTP basique (ex: `python3 -m http.server 8000` ou *Live Server* dans VS Code).
3. Publier : `git add .` -> `git commit -m "..."` -> `git push`
