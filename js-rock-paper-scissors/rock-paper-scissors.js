function computerPlay(){
    let arr=["Rock","Paper","Scissors"];
    let randomNumber=Math.floor(Math.random()*3);
    console.log(arr[randomNumber]);
    return arr[randomNumber];
}

function playRound(playerSelection,computerSelection){
    if (playerSelection.toLowerCase() === computerSelection.toLowerCase()){
        console.log("Draw")
    }
    else if(playerSelection.toLowerCase()==="rock"){
        switch(computerSelection){
            case "Scissors":
                console.log(`You win! ${playerSelection} beats ${computerSelection}`);
                return('win');
            case "Paper":
                console.log(`You lose! ${computerSelection} beats ${playerSelection}`);
                return('lose');
        }
    }
    else if(playerSelection.toLowerCase()==="scissors"){
        switch(computerSelection){
            case "Rock":
                console.log(`You lose! ${computerSelection} beats ${playerSelection}`);
                return('lose');
            case "Paper":
                console.log(`You win! ${playerSelection} beats ${computerSelection}`);
                return('win');
        }
    }
    else if(playerSelection.toLowerCase()==="paper"){
        switch(computerSelection){
            case "Rock":
                console.log(`You win! ${playerSelection} beats ${computerSelection}`);
                return('win');
            case "Scissors":
                console.log(`You lose! ${computerSelection} beats ${playerSelection}`);
                return('lose');
        }
    }
    else{
        console.log(`Enter valid input`);
    }
}

function game(){
    let user=0;
    let comp=0;
    for(let i=0; i<5;i++){
        let playerSelection=prompt("Enter Rock, Paper or Scissors");
        let computerSelection=computerPlay();
        let result=playRound(playerSelection,computerSelection)
        if(result==="win"){
            user++;
        }
        else{
            comp++;
        }
    }
    if(user>comp){
        console.log(`You win!`);
    }
    else if(comp>user){
        console.log('You lose!');
    }
    else{
        console.log('Draw');
    }
}

game();
