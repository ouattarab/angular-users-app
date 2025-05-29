## Installer FileSaver.js
npm install file-saver

## Ou
npm install --save-dev @types/file-saver

 ng build
Initial chunk files   | Names         |  Raw size | Estimated transfer size
main-B7KIV7VL.js      | main          | 328.58 kB |                82.30 kB
polyfills-FFHMD2TL.js | polyfills     |  33.71 kB |                11.02 kB
styles-5INURTSO.css   | styles        |   0 bytes |                 0 bytes

                      | Initial total | 362.29 kB |                93.32 kB

Output location: E:\Projet personnel\Angular_30012025\angular-users-app\dist\angular-users-app
####

Merci pour la capture. En fait, **tu es déjà dans la bonne vue** dans Sourcetree ! Le panneau que tu vois (avec les commits “initial commit” et “build 1”) **est l’onglet `History`**, même si ce n’est pas marqué explicitement.

Tu veux annuler le commit `build 1` (`b333e93`), voici exactement quoi faire :

---

### ✅ Étapes pour annuler le commit "build 1" dans Sourcetree :

1. **Clic droit** sur le commit **juste avant** `build 1` (celui dont l'ID est `43a3021f0a`)

2. Choisis :
   👉 **`Reset current branch to this commit`**

3. Une fenêtre s’ouvre avec plusieurs options :

   * 🔘 **Soft** → garde les fichiers dans la staging area (ce que tu veux)
   * Mixed → garde les fichiers modifiés mais non stage
   * Hard → tout efface (à éviter ici)

4. Sélectionne **`Soft`**

5. Clique sur **OK**

---

### 🧹 Ensuite

* Tu verras tous les fichiers dans l'onglet **“File Status”** avec la case cochée.
* Tu peux maintenant **retirer les fichiers que tu ne veux pas re-committer**, par exemple :

  * Clic droit > **Remove from index** pour les gros fichiers (`git rm --cached`)
* Puis tu peux faire un commit propre et un push.
------
Parfait ! 🎉

Ton message indique que :

### ✅ Le build Angular s'est **bien terminé**

* **Aucune erreur** détectée.
* Les fichiers de sortie (`main`, `polyfills`, `styles`) ont été générés correctement dans `dist/angular-users-app`.
* Temps de build : **28,9 secondes** (raisonnable selon la taille du projet).

---

### 📌 Ce que tu peux faire maintenant :

#### 1. **Tester le rendu localement**

Lancer un serveur statique pour visualiser le résultat :

```bash
npx serve -s dist/angular-users-app
```

Puis ouvre `http://localhost:3000` dans ton navigateur.

---

#### 2. **Faire un test avec la configuration production (si ce n’était pas déjà le cas)**

```bash
ng build --configuration production
```

Cela active :

* AOT (Ahead-of-Time compilation),
* optimisations JS/CSS,
* tree-shaking,
* minification.

---

#### 3. **Analyser le bundle (optionnel, mais recommandé)**

```bash
ng build --stats-json
npx webpack-bundle-analyzer dist/angular-users-app/stats-es2015.json
```

Tu verras quels fichiers pèsent le plus dans ton bundle.

---




