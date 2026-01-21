# Configuration Google Sheets pour SOGIS

Ce guide vous explique comment configurer Google Sheets comme backend pour votre site SOGIS.

## Étape 1 : Créer le Google Sheet

1. **Accédez à votre Google Drive** : https://drive.google.com/drive/folders/1e7BrjmRF-iwpwSa4iFI_5aRctMLtZgzd
2. **Créez un nouveau Google Sheet** :
   - Cliquez sur "Nouveau" > "Google Sheets" > "Feuille de calcul vierge"
   - Nommez-le : **"SOGIS Database"**

## Étape 2 : Configurer les feuilles

### Feuille 1 : "Demandes"

1. Renommez la première feuille en **"Demandes"**
2. Ajoutez les en-têtes suivants dans la première ligne (A1 à J1) :

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Ticket ID | Date | Nom | Email | Téléphone | Service | Message | Type | Statut | Historique |

### Feuille 2 : "Commentaires"

1. Créez une nouvelle feuille (cliquez sur le "+" en bas)
2. Nommez-la **"Commentaires"**
3. Ajoutez les en-têtes suivants dans la première ligne (A1 à H1) :

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| ID | Date | Nom | Email | Note | Commentaire | Type | Statut |

## Étape 3 : Créer le script Apps Script

1. Dans votre Google Sheet, allez dans **Extensions > Apps Script**
2. Supprimez le code par défaut
3. **Copiez tout le contenu du fichier `GOOGLE_SHEETS_SCRIPT.js`** et collez-le
4. Cliquez sur **Enregistrer** (icône disquette) et nommez le projet "SOGIS API"

## Étape 4 : Déployer l'API Web

1. Dans Apps Script, cliquez sur **Déployer > Nouveau déploiement**
2. Cliquez sur l'icône **⚙️ (engrenage)** à côté de "Sélectionner un type"
3. Choisissez **"Application Web"**
4. Configurez :
   - **Description** : "SOGIS API v1"
   - **Exécuter en tant que** : **Moi** (votre compte)
   - **Qui a accès** : **Tout le monde**
5. Cliquez sur **Déployer**
6. **Autorisez l'accès** :
   - Cliquez sur "Autoriser l'accès"
   - Sélectionnez votre compte Google
   - Cliquez sur "Paramètres avancés" > "Accéder à SOGIS API (non sécurisé)"
   - Cliquez sur "Autoriser"
7. **Copiez l'URL de déploiement** qui ressemble à :
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

## Étape 5 : Configurer le projet React

1. Dans votre projet SOGIS, créez un fichier **`.env`** à la racine :
   ```env
   VITE_GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/VOTRE_ID_ICI/exec
   ```
   
2. Remplacez `VOTRE_ID_ICI` par l'URL complète que vous avez copiée à l'étape 4

3. **Important** : Le fichier `.env` est déjà dans `.gitignore`, il ne sera pas poussé sur Git

## Étape 6 : Tester l'API

### Test manuel dans Apps Script

1. Dans Apps Script, sélectionnez la fonction `doGet` dans le menu déroulant
2. Cliquez sur **Exécuter**
3. Vérifiez qu'il n'y a pas d'erreur

### Test depuis le navigateur

Ouvrez cette URL dans votre navigateur (remplacez par votre URL) :
```
https://script.google.com/macros/s/VOTRE_ID/exec?action=getRequests&filter=all
```

Vous devriez voir une réponse JSON :
```json
{
  "success": true,
  "message": "Succès",
  "data": []
}
```

## Étape 7 : Démarrer le serveur local

1. Ouvrez un terminal dans le dossier du projet
2. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
3. Ouvrez http://localhost:5173/sogis/
4. Testez en soumettant une demande ou un commentaire
5. Vérifiez que les données apparaissent dans votre Google Sheet

## Étape 8 : Déployer sur GitHub Pages

1. Ajoutez l'URL de l'API dans les **GitHub Secrets** :
   - Allez sur votre repo GitHub
   - Settings > Secrets and variables > Actions
   - Cliquez sur "New repository secret"
   - Nom : `VITE_GOOGLE_SHEETS_API_URL`
   - Valeur : Votre URL complète
   - Cliquez sur "Add secret"

2. Modifiez `.github/workflows/deploy.yml` pour utiliser le secret (déjà fait dans le code)

3. Poussez vos changements sur Git :
   ```bash
   git add .
   git commit -m "Intégration Google Sheets API"
   git push
   ```

4. Attendez que le déploiement se termine (1-2 minutes)

5. Testez sur votre site en ligne !

## Structure des données

### Exemple de demande dans "Demandes"

| Ticket ID | Date | Nom | Email | Téléphone | Service | Message | Type | Statut | Historique |
|-----------|------|-----|-------|-----------|---------|---------|------|--------|------------|
| SOG-BUS-L5K2M3-ABCD | 2026-01-21T17:00:00 | Marie Dupont | marie@example.com | +237 6XX XX XX XX | Gestion Bancaire | Je souhaite... | business | pending | [{"status":"pending","timestamp":"2026-01-21T17:00:00"}] |

### Exemple de commentaire dans "Commentaires"

| ID | Date | Nom | Email | Note | Commentaire | Type | Statut |
|----|------|-----|-------|------|-------------|------|--------|
| 1737478800000 | 2026-01-21T17:00:00 | Jean Kamga | jean@example.com | 5 | Excellent service ! | services | pending |

## Gestion depuis Google Sheets

Vous pouvez également gérer les données directement depuis Google Sheets :

- **Modifier un statut** : Changez la valeur dans la colonne "Statut" (pending, accepted, inprogress, completed)
- **Supprimer une demande** : Supprimez la ligne entière
- **Valider un commentaire** : Changez le statut de "pending" à "validated"
- **Exporter** : Fichier > Télécharger > Microsoft Excel (.xlsx)

Les changements seront visibles sur le site immédiatement !

## Dépannage

### Erreur "Script function not found: doPost"
- Vérifiez que vous avez bien copié tout le code du script
- Enregistrez le script et redéployez

### Erreur "Authorization required"
- Vous devez autoriser le script à accéder à votre Google Sheet
- Suivez les étapes d'autorisation dans l'étape 4

### Les données n'apparaissent pas sur le site
- Vérifiez que l'URL dans `.env` est correcte
- Vérifiez que le serveur de développement a été redémarré après la modification de `.env`
- Ouvrez la console du navigateur (F12) pour voir les erreurs

### Erreur CORS
- Assurez-vous que le script est déployé avec "Qui a accès : Tout le monde"
- Redéployez si nécessaire

## Support

Si vous rencontrez des problèmes, vérifiez :
1. L'URL de l'API est correcte dans `.env`
2. Le script Apps Script est bien déployé
3. Les noms des feuilles sont exactement "Demandes" et "Commentaires"
4. Les en-têtes des colonnes sont corrects
