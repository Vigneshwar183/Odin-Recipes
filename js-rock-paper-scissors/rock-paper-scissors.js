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

function game(event){
    let playerSelection=event.getAttribute('value');
    console.log(playerSelection);
    let computerSelection=computerPlay();
    let result=playRound(playerSelection,computerSelection)
    if(result==="win"){
        user++;
    }
    else{
        comp++;
    }
    let container=document.querySelector('#result');
    console.log(container);
    if (container){
        let div=document.getElementById('result')
        div.textContent=`user: ${user};comp: ${comp}`;
    }else{
        div=document.createElement('div');
        div.setAttribute('id','result');
        div.textContent=`user: ${user};comp: ${comp}`;
    }
    let parent=document.getElementById('results-container');
    parent.appendChild(div)
    if (user===5){
        let div=document.getElementById('result')
        div.textContent=`user wins`;
    }else if(comp===5){
        let div=document.getElementById('result')
        div.textContent=`comp wins`;
    }
}

let user=0;
let comp=0;
let buttons=document.querySelectorAll('.btn');
buttons.forEach(element => {
    console.log(element)
    element.addEventListener('click',(event)=>{
        game(event.target);
    });
});
