const gameBoard=(()=>{
    var turn=(count,user1,user2)=>{
        console.log('turn called');
        let result;
        let positions=document.getElementsByTagName('td');
        for (var i=0;i<positions.length;i++){
            positions[i].addEventListener('click',(event)=>{
                if (count%2===0){
                    updateGameboard(user1,event.target.id)
                    result=checkResult(user1,event.target.id);
                    count+=1;
                }
                else{
                    updateGameboard(user2,event.target.id);
                    result=checkResult(user2,event.target.id);
                    count+=1;
                } 
                if (count===9){
                    console.log('tie');
                    return
                }
                if (result===true){
                    if (count%2!==0){
                        console.log(`${user1.name} wins`);
                        user1.score+=1;
                        let temp=document.querySelector('body');
                        let tempChild=document.createElement('div');
                        tempChild.innerHTML=`${user1.name}:${user1.score} || ${user2.name}:${user2.score}`;
                        temp.appendChild(tempChild);
                        return
                    }
                    else{
                        console.log(`${user2.name} wins`);
                        user2.score+=1;
                        let temp=document.querySelector('body');
                        let tempChild=document.createElement('div');
                        tempChild.innerHTML=`${user1.name}:${user1.score} || ${user2.name}:${user2.score}`;
                        temp.appendChild(tempChild);
                        return
                    }

                }
            })
        } 
                   
    }
    var updateGameboard=(user,position)=>{
        row=+position[0];
        column=+position[2];
        console.log(typeof gameboard[row][column]);
        if (gameboard[row][column]==='1'){
            gameboard[row][column]=user.symbol;
            count+=1;
        }
        else{
            alert('Invalid Move');
        }
        let changePosition=document.getElementById(position);
        changePosition.innerHTML=user.symbol;
        return null
    }
    var checkResult=(user,position)=>{
        let row=+position[0];
        let col=+position[2];
        if (gameboard[0][0]===gameboard[1][1] && gameboard[0][0]===gameboard[2][2]){
            if (gameboard[0][0]!=='1'){
                console.log('hi');
                return true
            }
        }
        if (gameboard[1][1]===gameboard[0][2] && gameboard[1][1]===gameboard[2][0]){
            if (gameboard[1][1]!=='1'){
                console.log('hi2');
                return true
            }
        }
        if (gameboard[0][col]===gameboard[1][col] && gameboard[0][col]===gameboard[2][col]){
            if (gameboard[0][col]!=='1'){
                console.log('hi3');
                return true
            }
        }
        if (gameboard[row][0]===gameboard[row][1] && gameboard[row][0]===gameboard[row][2]){
            if (gameboard[row][0]!=='1'){
                console.log('hi4');
                return true
            }
        }
        return false
    }
    var reset=()=>{
        count=0;
        let temp2=document.getElementsByTagName('td');
        for (let j=0;j<temp2.length;j++){
            temp2[j].innerHTML='1';
        }
        console.log(count);
        return
    }

    return {gameboard,turn,reset}
})();

const mainDisplay=((gameboard)=>{
    let parent=document.querySelector('body');
    let table=document.createElement('table');
    for (var i=0;i<gameboard.length;i++){
        let tr=document.createElement('tr');
        for(var j=0;j<gameboard[0].length;j++){
            let td=document.createElement('td');
            td.innerHTML=gameboard[i][j];
            td.setAttribute('id',i+'+'+j);
            td.style.padding='5px';
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    parent.appendChild(table);
})

const player=(name,symbol,score)=>{
    return {name,symbol,score}
}

let symbol1='X';
let symbol2='O';
var gameboard=[['1','1','1'],['1','1','1'],['1','1','1']];
let count=0;
let user1;
let user2;
let form=document.querySelector('form');
form.onsubmit=(event)=>{
    event.preventDefault();
    console.log(document.getElementById('name1').value);
    let player1= player(document.getElementById('name1').value,symbol1,0);
    let player2= player(document.getElementById('name2').value,symbol2,0);
    user1=player1;
    user2=player2;
    mainDisplay(gameboard);
    gameBoard.turn(0,user1,user2);
}
let reset=document.getElementById('reset');
reset.onclick=()=>{
    let table=document.getElementsByTagName('table');
    table[0].remove();
    gameboard=[['1','1','1'],['1','1','1'],['1','1','1']];
    mainDisplay(gameboard);
    gameBoard.turn(0,user1,user2);
}