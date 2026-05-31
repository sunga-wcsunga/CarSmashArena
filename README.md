**Car Smash Arena**

Car Smash Arena is a browser-based JavaScript game developed for ITCC 13.1 – Web Development & Technologies.
Players control a car and smash enemy cars in two different game modes while scores and match records are stored using Firebase Firestore.

Features:

Classic Mode:
• 60-second time limit
• Smash enemy cars to earn points
• Combo system for bonus points
• Top scores saved to leaderboard

Survival Mode:
• Health-based gameplay
• Survive as long as possible
• Earn points by attacking enemies
• Records store both score and survival time

General Features:
• Player name input
• 3-second countdown before game starts
• Pause and resume system (Spacebar)
• Game Over screen
• Play Again option
• Instructions menu
• Sound effects and background music
• Firebase leaderboard
• Match history tracking

Controls:
| Key | Action |
|------|----------|
| W / ↑ | Move Forward |
| S / ↓ | Move Backward |
| A / ← | Turn Left |
| D / → | Turn Right |
| Space | Pause / Resume |


Project Structure:

CarSmashArena/
│
├── index.html
├── css/
│   └── style.css
│
├── js/
│   ├── game.js
│   ├── player.js
│   ├── enemies.js
│   ├── collisions.js
│   ├── barriers.js
│   ├── controls.js
│   ├── menu.js
│   ├── audio.js
│   └── firebase.js
│
├── assets/
│   ├── player.png
│   ├── enemy.png
│   ├── background.png
│   ├── instructions.png
│   └── sounds/
│       ├── bgm.mp3
│       └── crash.mp3
│
└── README.md
