# 🔐 Configuration du Secret GitHub pour SOGIS

## Étape Importante: Ajouter l'URL de l'API aux Secrets GitHub

Avant que le déploiement fonctionne, vous devez ajouter l'URL de votre API Google Sheets comme secret GitHub.

### 📋 Étapes à Suivre

#### 1. Copier l'URL de votre API

Votre URL actuelle (depuis le fichier `.env`):
```
https://script.google.com/macros/s/AKfycby0S2EG9kYN92uP_Obn0u9ucZE8hF-pB0Ej0lq7Z_MBw18D40ekxGCIZjsl3qKOAT9Nnw/exec
```

#### 2. Aller sur votre Repository GitHub

1. Ouvrir votre repository SOGIS sur GitHub
2. Cliquer sur **Settings** (⚙️ Paramètres)
3. Dans le menu de gauche, cliquer sur **Secrets and variables** > **Actions**

#### 3. Ajouter le Secret

1. Cliquer sur le bouton vert **New repository secret**
2. Remplir les champs:
   - **Name:** `VITE_GOOGLE_SHEETS_API_URL`
   - **Value:** `https://script.google.com/macros/s/AKfycby0S2EG9kYN92uP_Obn0u9ucZE8hF-pB0Ej0lq7Z_MBw18D40ekxGCIZjsl3qKOAT9Nnw/exec`
3. Cliquer sur **Add secret**

### ✅ Vérification

Une fois le secret ajouté, vous devriez voir:
- **VITE_GOOGLE_SHEETS_API_URL** dans la liste des secrets
- La valeur sera masquée (c'est normal)

### 🚀 Prochaine Étape

Une fois le secret configuré, vous pouvez pousser votre code:
```bash
git push
```

Le déploiement utilisera automatiquement ce secret pour construire votre application.

---

## 🔍 Pourquoi cette étape est nécessaire?

- Le fichier `.env` est dans `.gitignore` (il ne sera jamais poussé sur GitHub)
- GitHub Actions a besoin de l'URL de l'API pour construire l'application
- Les secrets GitHub permettent de stocker des informations sensibles de manière sécurisée

---

## ⚠️ Important

**NE JAMAIS** pousser le fichier `.env` sur GitHub!
- Il contient des informations sensibles
- Il est déjà dans `.gitignore`
- Utilisez toujours les secrets GitHub pour la production
