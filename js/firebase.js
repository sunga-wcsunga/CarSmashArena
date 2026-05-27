import { initializeApp }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    limit

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyBoyjgbZxqOHR87YduGkIJofDOjzHIteOc",

    authDomain: "car-smash-arena.firebaseapp.com",

    projectId: "car-smash-arena",

    storageBucket: "car-smash-arena.firebasestorage.app",

    messagingSenderId: "810804730810",

    appId: "1:810804730810:web:c0cd75be48e5336a795b83"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


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

window.loadLeaderboard = async function(){

    const leaderboardList =
        document.getElementById("leaderboardList");

    leaderboardList.innerHTML = "";

    const q = query(

        collection(db, "scores"),

        orderBy("score", "desc"),

        limit(5)

    );

    const querySnapshot = await getDocs(q);

    let rank = 1;

    querySnapshot.forEach((doc)=>{

        const data = doc.data();

        leaderboardList.innerHTML += `

            <div>

                ${rank}. ${data.playerName}
                - ${data.score}

            </div>

        `;

        rank++;

    });

}

window.addEventListener("load", ()=>{

    loadLeaderboard();

});