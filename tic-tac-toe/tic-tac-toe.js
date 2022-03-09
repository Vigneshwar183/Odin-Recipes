const gameBoard=(()=>{
    var gameboard=[['1','1','1'],['1','1','1'],['1','1','1']];
    var updateGameboard=(user,row,column)=>{
        console.log(gameboard[row][column]);
        if (gameboard[row][column]==='1'){
            gameboard[row][column]=user.symbol;
        }
        else{
            alert('Invalid Move');
        }
    }
    var display=(user)=>{
        let parent=document.querySelector('body');
        for (var i=0;i<gameboard.length;i++){
            let tr=document.createElement('tr');
            for(var j=0;j<gameboard[0].length;j++){
                let td=document.createElement('td');
                td.innerHTML=gameboard[i][j];
                td.style.padding='5px';
                tr.appendChild(td);
            }
            parent.appendChild(tr);
        }
        let positions=document.getElementsByTagName('td');
        console.log(positions);
        for (var i=0;i<positions.length;i++){
            positions[i].addEventListener('click',()=>{
                console.log('hi');
            })
        }
    }
    var checkResult=()=>{
        let count=0;
        flag=0;
        if (flag===0)
        {
            let temp=gameboard[0][0];
            for (var i=0,j=0;i<gameboard.length;i++,j++){
                if (gameboard[i][j]===temp)
                    count+=1;
            }
        }
        if (count==3){
            flag=1;
            winnerSymbol=temp;
        }
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

    }
    return {updateGameboard,display}
})();

const Display=()=>{

}

const player=(name,symbol)=>{
    this.name=name;
    this.symbol=symbol;
}

let symbol1='X';
let symbol2='O';
gameBoard.display();
// let form=document.getElementsByTagName('form');
let form=document.querySelector('form');
form.onsubmit=(event)=>{
    event.preventDefault();
    let player1= player(document.getElementById('name1').value,symbol1);
    let player2= player(document.getElementById('name2').value,symbol2);
}

// let positions=document.getElementsByTagName('td');
// for (var i=0;i<positions.length;i++){
//     positions[i].addEventListener('click',(event)=>{
//         event.target.innerHTML='hi';
//     })
// }