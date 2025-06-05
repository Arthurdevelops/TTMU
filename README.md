# Gesture-Controlled Music Player 🎵

Une application web interactive qui permet de contrôler la lecture de musique en utilisant des gestes de la main. L'application utilise la webcam pour détecter la position de vos doigts et ajuster le volume de la musique en conséquence.

## Fonctionnalités 🚀

- 🎥 Détection des mains en temps réel avec MediaPipe
- 🎵 Lecteur de musique avec contrôles de lecture
- 🔊 Contrôle du volume par gestes de la main
- ⏯️ Navigation entre les pistes (précédent/suivant)
- ⏱️ Barre de progression interactive
- 🎨 Interface utilisateur moderne et responsive

## Comment ça marche ? 🤔

1. **Contrôle du volume** :

   - Placez votre main devant la caméra
   - Utilisez votre pouce et votre index pour contrôler le volume
   - Plus la distance entre vos doigts est grande, plus le volume est bas
   - Plus la distance est petite, plus le volume est élevé

2. **Contrôles de lecture** :
   - Bouton Play/Stop pour démarrer/arrêter la lecture
   - Boutons Previous/Next pour naviguer entre les pistes
   - Barre de progression pour se déplacer dans la chanson

## Prérequis 📋

- Node.js (version 14 ou supérieure)
- Une webcam fonctionnelle
- Un navigateur moderne (Chrome recommandé)

## Installation 🛠️

1. Clonez le repository :

```bash
git clone [URL_DU_REPO]
cd [NOM_DU_DOSSIER]
```

2. Installez les dépendances :

```bash
npm install
```

3. Placez vos fichiers audio dans le dossier `public/audio/` :

   - `adore-u.mp3`
   - `one_more_time.mp3`
   - `the_less_i_know_the_better.mp3`

4. Lancez l'application en mode développement :

```bash
npm run dev
```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Technologies utilisées 💻

- Next.js 14
- TypeScript
- MediaPipe Hands
- Tailwind CSS
- React Hooks

## Structure du projet 📁

```
├── public/
│   └── audio/           # Fichiers audio
├── src/
│   ├── app/
│   │   ├── components/  # Composants React
│   │   └── utils/       # Utilitaires
│   └── ...
└── ...
```
