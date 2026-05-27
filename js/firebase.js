// FIREBASE IMPORTS
import { initializeApp }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

    getFirestore,
    collection,
    addDoc

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// FIREBASE CONFIG
const firebaseConfig = {

    apiKey: "AIzaSyBoyjgbZxqOHR87YduGkIJofDOjzHIteOc",

    authDomain: "car-smash-arena.firebaseapp.com",

    projectId: "car-smash-arena",

    storageBucket: "car-smash-arena.firebasestorage.app",

    messagingSenderId: "810804730810",

    appId: "1:810804730810:web:c0cd75be48e5336a795b83"

};

// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);

// DATABASE
const db = getFirestore(app);

// SAVE SCORE FUNCTION
window.saveScore = async function(playerName, score, mode){

    try{

        await addDoc(

            collection(db, "scores"),

            {

                playerName: playerName,

                score: score,

                mode: mode,

                createdAt: new Date()

            }

        );

        console.log("Score saved!");

    }

    catch(error){

        console.log(error);

    }

}