let keys = {};

document.addEventListener("keydown", (e)=> {

    keys[e.key] = true;

} );

document.addEventListener("keyup", (e)=> {

    keys[e.key] = false;
    
} );

document.addEventListener("keydown", (e)=>{

    //space:pause
    if(e.code === "Space"){

        paused = !paused;

    }

});

if(e.code === "Escape"){

    if(paused){

        gameStarted = false;

        paused = false;

        gameOver = false;

        menu.style.display = "flex";

    }

}