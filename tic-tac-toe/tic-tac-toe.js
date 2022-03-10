const gameBoard=(()=>{
    var gameboard=[['1','1','1'],['1','1','1'],['1','1','1']];
    let count=0;
    var users=(player1,player2)=>{
        var user1=player1;
        var user2=player2;
        console.log(user1,user2);
        turn(count,user1,user2);
    }
    var turn=(count,user1,user2)=>{
        if (count%2===0){
            display(user1);
            checkResult(user1);
            count+=1;
        }
        else{
            display(user2);
            checkResult(user2);
            count+=1;
        }            
    }
    var updateGameboard=(user,position)=>{
        row=+position[0];
        column=+position[2];
        if (gameboard[row][column]==='1'){
            gameboard[row][column]=user.symbol;
            console.log(gameboard);
            count+=1;
            turn(count);
        }
        else{
            alert('Invalid Move');
        }
    }
    var display=(user)=>{
        console.log(user);
        let parent=document.querySelector('body');
        for (var i=0;i<gameboard.length;i++){
            let tr=document.createElement('tr');
            for(var j=0;j<gameboard[0].length;j++){
                let td=document.createElement('td');
                td.innerHTML=gameboard[i][j];
                td.setAttribute('id',i+'+'+j);
                td.style.padding='5px';
                tr.appendChild(td);
            }
            parent.appendChild(tr);
        }
        let positions=document.getElementsByTagName('td');
        for (var i=0;i<positions.length;i++){
            positions[i].addEventListener('click',(event)=>{
                updateGameboard(user,event.target.id)
            })
        }
    }
    var checkResult=(user)=>{
        let count=0;
        flag=0;
        let temp=gameboard[0][0];
        if (flag===0)
        {
            for (var i=0,j=0;i<gameboard.length;i++,j++){
                if (gameboard[i][j]===temp)
                    count+=1;
            }
        }
        if (count==3){
            flag=1;
            winnerSymbol=temp;
        }
        temp=gameboard[0][0];
        if (flag===0){
            for (var i=0;i<gameboard.length;i++){
                let temp=gameboard[i][0];
                count=0;
                for (var j=0;j<gameboard.length;j++){
                    if (gameboard[i][j]===temp)
                        count+=1
                }
                if (count===3){
                    flag=1;
                    break;
                }
            }
        }
        if (count==3){
            flag=1;
            winnerSymbol=temp;
        }
        temp=gameboard[0][0];
        if (flag===0){
            for (var i=0;i<gameboard.length;i++){
                let temp=gameboard[i][0];
                count=0;
                for (var j=0;j<gameboard.length;j++){
                    if (gameboard[j][i]===temp)
                        count+=1
                }
                if (count===3){
                    flag=1;
                    break;
                }
            }
        }
        if (count==3){
            flag=1;
            winnerSymbol=temp;
        }
        if (flag===0)
            console.log('tie');

    }
    return {turn,display,users}
})();

const Display=()=>{

}

const player=(name,symbol)=>{
    return {name,symbol}
}

let symbol1='X';
let symbol2='O';
// let form=document.getElementsByTagName('form');
let form=document.querySelector('form');
form.onsubmit=(event)=>{
    event.preventDefault();
    console.log(document.getElementById('name1').value);
    let player1= player(document.getElementById('name1').value,symbol1);
    let player2= player(document.getElementById('name2').value,symbol2);
    console.log(player1,player2);
    gameBoard.users(player1,player2)
}

// let positions=document.getElementsByTagName('td');
// for (var i=0;i<positions.length;i++){
//     positions[i].addEventListener('click',(event)=>{
//         event.target.innerHTML='hi';
//     })
// }