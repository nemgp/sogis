# 🚀 Guide Rapide : Configuration Google Sheets pour SOGIS

## ✅ Étape 1 : Créer le Google Sheet (2 minutes)

1. Allez sur https://drive.google.com/drive/folders/1e7BrjmRF-iwpwSa4iFI_5aRctMLtZgzd
2. Cliquez sur **"Nouveau"** > **"Google Sheets"** > **"Feuille de calcul vierge"**
3. Nommez le fichier : **"SOGIS Database"**

## ✅ Étape 2 : Configurer les feuilles (3 minutes)

### Feuille 1 : "Demandes"
1. Renommez la première feuille en **"Demandes"** (double-clic sur l'onglet en bas)
2. Dans la première ligne, copiez-collez ces en-têtes (de A1 à J1) :

```
Ticket ID	Date	Nom	Email	Téléphone	Service	Message	Type	Statut	Historique
```

### Feuille 2 : "Commentaires"
1. Cliquez sur le **"+"** en bas pour créer une nouvelle feuille
2. Renommez-la en **"Commentaires"**
3. Dans la première ligne, copiez-collez ces en-têtes (de A1 à H1) :

```
ID	Date	Nom	Email	Note	Commentaire	Type	Statut
```

## ✅ Étape 3 : Copier le script Apps Script (2 minutes)

1. Dans votre Google Sheet, cliquez sur **Extensions** > **Apps Script**
2. Supprimez tout le code par défaut
3. Ouvrez le fichier `GOOGLE_SHEETS_SCRIPT.js` dans votre projet
4. **Copiez TOUT le contenu** et collez-le dans Apps Script
5. Cliquez sur **💾 Enregistrer** (icône disquette)
6. Nommez le projet : **"SOGIS API"**

## ✅ Étape 4 : Déployer l'API Web (3 minutes)

1. Dans Apps Script, cliquez sur **Déployer** > **Nouveau déploiement**
2. Cliquez sur l'icône **⚙️ (engrenage)** à côté de "Sélectionner un type"
3. Choisissez **"Application Web"**
4. Configurez :
   - **Description** : SOGIS API v1
   - **Exécuter en tant que** : **Moi**
   - **Qui a accès** : **Tout le monde**
5. Cliquez sur **Déployer**
6. **Autorisez l'accès** :
   - Cliquez sur "Autoriser l'accès"
   - Sélectionnez votre compte Google
   - Si vous voyez "Google n'a pas vérifié cette application" :
     - Cliquez sur **"Paramètres avancés"**
     - Cliquez sur **"Accéder à SOGIS API (non sécurisé)"**
   - Cliquez sur **"Autoriser"**
7. **COPIEZ L'URL** qui ressemble à :
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

## ✅ Étape 5 : Configurer le projet React (1 minute)

1. Dans votre projet SOGIS, créez un fichier **`.env`** à la racine (à côté de `package.json`)
2. Collez ce contenu et remplacez par votre URL :

```env
VITE_GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/VOTRE_URL_ICI/exec
```

3. **Sauvegardez** le fichier

## ✅ Étape 6 : Tester en local (1 minute)

1. **Redémarrez le serveur de développement** :
   - Arrêtez le serveur actuel (Ctrl+C dans le terminal)
   - Relancez : `npm run dev`
2. Ouvrez http://localhost:5173/sogis/
3. Testez en soumettant une demande ou un commentaire
4. Vérifiez que les données apparaissent dans votre Google Sheet !

## ✅ Étape 7 : Déployer sur GitHub Pages

1. Les modifications sont déjà prêtes
2. Poussez sur Git :
   ```bash
   git add .
   git commit -m "Intégration Google Sheets API"
   git push
   ```
3. Attendez 1-2 minutes que GitHub Pages redéploie
4. Testez sur votre site en ligne !

## 🎉 C'est terminé !

Votre site SOGIS utilise maintenant Google Sheets comme base de données !

### Ce qui fonctionne maintenant :
- ✅ Les formulaires envoient les données vers Google Sheets
- ✅ Le panneau admin charge les données depuis Google Sheets
- ✅ Bouton "Export Excel" pour télécharger les demandes en CSV
- ✅ Synchronisation automatique entre tous les utilisateurs
- ✅ Page de suivi qui recherche dans Google Sheets

### En cas de problème :

**Les données n'apparaissent pas ?**
- Vérifiez que l'URL dans `.env` est correcte
- Vérifiez que le serveur a été redémarré après la création de `.env`
- Ouvrez la console du navigateur (F12) pour voir les erreurs

**Erreur "Script function not found" ?**
- Vérifiez que vous avez bien copié TOUT le script
- Enregistrez et redéployez

**Besoin d'aide ?**
- Consultez le fichier `GOOGLE_SHEETS_SETUP.md` pour plus de détails
