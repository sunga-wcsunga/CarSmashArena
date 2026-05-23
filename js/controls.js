let keys = {};

document.addEventListener("keydown", (e)=> {

    keys[e.key] = true;

} );

document.addEventListener("keyup", (e)=> {

    keys[e.key] = false;
    
} );

document.addEventListener("keydown", (e)=>{

    if(e.code === "Space"){

        if(gameStarted && !gameOver){

            paused = !paused;

            if(paused){

                document.getElementById("pauseMenu")
                    .style.display = "flex";

            }

            else{

                document.getElementById("pauseMenu")
                    .style.display = "none";

            }

        }

    }

});

