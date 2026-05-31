import { initializeApp }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    limit,
    where

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


window.saveScore = async function(
    playerName,
    score,
    mode,
    survivalTime
){

    try{

        await addDoc(

            collection(db, "scores"),

            {

                playerName: playerName,
                score: score,
                mode: mode,
                survivalTime,
                createdAt: new Date()

            }

        );

        console.log("Score saved!");

    }

    catch(error){

        console.log(error);

    }

}

window.loadLeaderboard = async function(mode){

    try{

        const leaderboardTitle =
        document.getElementById("leaderboardTitle");

        if(mode === "classic"){

            leaderboardTitle.innerText =
                "Classic Leaderboard";

        }

        else{

            leaderboardTitle.innerText =
                "Survival Leaderboard";

        }

        const leaderboardList =
        document.getElementById("leaderboardList");

        leaderboardList.innerHTML = "";

        const q = query(

            collection(db, "scores"),

            where("mode", "==", mode),

            orderBy("score", "desc"),

            limit(5)

        );

        const querySnapshot = await getDocs(q);
        console.log("Leaderboard size:", querySnapshot.size);

        console.log(
            "Leaderboard docs:",
            querySnapshot.size
        );

        if(querySnapshot.empty){

            leaderboardList.innerHTML =
                "<div>No scores yet</div>";

            return;

        }

        let rank = 1;

        querySnapshot.forEach((doc)=>{

            const data = doc.data();

            if(mode === "survival"){

                leaderboardList.innerHTML += `
                <div>
                    ${rank}. ${data.playerName}
                    - ${data.score} pts
                    - ${data.survivalTime}s
                </div>
                `;

            }

            else{

                leaderboardList.innerHTML += `
                <div>
                    ${rank}. ${data.playerName}
                    - ${data.score} pts
                </div>
                `;

            }

        rank++;

    });

}

    catch(error){

        console.log(error);

    }

}

window.loadHistory = async function(){

    const historyList =
        document.getElementById("historyList");

    historyList.innerHTML = "";

    const q = query(

        collection(db, "scores"),

        orderBy("createdAt", "desc"),

        limit(5)

    );

    const querySnapshot =
        await getDocs(q);

    querySnapshot.forEach((doc)=>{

        const data = doc.data();

        if(data.mode === "survival"){

            historyList.innerHTML += `
                <div>
                    ${data.playerName}
                    - ${data.score} pts
                    - ${data.survivalTime}s
                </div>
            `;

        }

        else{

            historyList.innerHTML += `
                <div>
                    ${data.playerName}
                    - ${data.score} pts
                </div>
            `;

        }

    });

}

window.dbReady = true;
