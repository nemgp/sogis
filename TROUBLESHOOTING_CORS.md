# 🔧 Solution au Problème CORS en Production

## 🔍 Diagnostic

Vous avez une erreur "Une erreur est survenue. Veuillez réessayer." même en production sur GitHub Pages. Cela indique que le problème CORS persiste.

**Cause probable:** Le script Google Apps Script n'est pas correctement déployé ou configuré.

---

## ✅ Solution: Redéployer le Script Apps Script

### Étape 1: Vérifier le Déploiement Actuel

1. **Ouvrir votre Google Sheet "SOGIS Database"**
   - Aller sur https://drive.google.com/drive/folders/1e7BrjmRF-iwpwSa4iFI_5aRctMLtZgzd
   - Ouvrir "SOGIS Database"

2. **Ouvrir Apps Script**
   - Cliquer sur **Extensions** > **Apps Script**

3. **Vérifier le code**
   - Assurez-vous que le code du fichier `GOOGLE_SHEETS_SCRIPT.js` est bien présent
   - Vérifier qu'il y a bien les fonctions `doGet` et `doPost`

### Étape 2: Redéployer avec une Nouvelle Version

1. **Dans Apps Script, cliquer sur "Déployer" > "Gérer les déploiements"**

2. **Cliquer sur l'icône ✏️ (Modifier)** à côté de votre déploiement existant

3. **Dans "Version", sélectionner "Nouvelle version"**
   - Cela créera une nouvelle version du déploiement

4. **Vérifier la configuration:**
   - **Type:** Application Web
   - **Exécuter en tant que:** Moi (votre compte)
   - **Qui a accès:** **Tout le monde** ⚠️ **IMPORTANT!**

5. **Cliquer sur "Déployer"**

6. **Copier la NOUVELLE URL** (elle peut avoir changé)
   - Elle ressemble à: `https://script.google.com/macros/s/XXXXX/exec`

### Étape 3: Mettre à Jour le Secret GitHub

1. **Aller sur:** https://github.com/nemgp/sogis/settings/secrets/actions

2. **Cliquer sur `VITE_GOOGLE_SHEETS_API_URL`**

3. **Cliquer sur "Update"**

4. **Coller la NOUVELLE URL** du script Apps Script

5. **Cliquer sur "Update secret"**

### Étape 4: Redéployer le Site

```bash
git commit --allow-empty -m "Update API URL after Apps Script redeployment"
git push
```

---

## 🔍 Vérification Alternative: Tester l'API Directement

Avant de redéployer, testons l'API directement dans le navigateur:

### Test GET (devrait fonctionner)

Ouvrir cette URL dans votre navigateur:
```
https://script.google.com/macros/s/AKfycby0S2EG9kYN92uP_Obn0u9ucZE8hF-pB0Ej0lq7Z_MBw18D40ekxGCIZjsl3qKOAT9Nnw/exec?action=getComments&filter=all
```

**Résultat attendu:**
```json
{
  "success": true,
  "message": "Succès",
  "data": []
}
```

**Si vous voyez une erreur ou une page de connexion Google:**
- Le déploiement n'est pas configuré avec "Qui a accès: Tout le monde"
- Vous devez redéployer

---

## 🎯 Checklist de Vérification

Avant de redéployer, vérifiez:

- [ ] Le script Apps Script contient bien le code complet (328 lignes)
- [ ] Les fonctions `doGet` et `doPost` sont présentes
- [ ] Le script est enregistré (icône 💾)
- [ ] Le déploiement existe (Déployer > Gérer les déploiements)
- [ ] "Qui a accès" est bien "Tout le monde" (pas "Moi uniquement")

---

## 📝 Problème Courant: "Qui a accès"

Le problème le plus fréquent est que "Qui a accès" est configuré sur:
- ❌ **Moi uniquement** (nécessite authentification)
- ✅ **Tout le monde** (accès public, requis pour votre site)

**Pour vérifier:**
1. Déployer > Gérer les déploiements
2. Cliquer sur ✏️ (Modifier)
3. Vérifier "Qui a accès"
4. Si ce n'est pas "Tout le monde", le changer
5. Déployer

---

## 🔧 Solution Alternative: Nouveau Déploiement Complet

Si le redéploiement ne fonctionne pas, créez un nouveau déploiement:

1. **Dans Apps Script:**
   - Déployer > **Nouveau déploiement**
   - Type: Application Web
   - Description: "SOGIS API v2"
   - Exécuter en tant que: Moi
   - Qui a accès: **Tout le monde**
   - Déployer

2. **Copier la nouvelle URL**

3. **Mettre à jour le secret GitHub** avec cette nouvelle URL

4. **Redéployer le site**

---

## 📞 Besoin d'Aide?

Si le problème persiste après ces étapes:
1. Vérifier que le test GET fonctionne dans le navigateur
2. Vérifier les logs dans Apps Script (Exécutions)
3. Partager le message d'erreur exact de la console du navigateur (F12)
