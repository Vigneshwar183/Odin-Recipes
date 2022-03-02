function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if(b!=0){
        return a/b
    }else{
        prompt('division not possible');
    }
}

function display_output(){
    parent=document.querySelector('.display');
    parent.textContent=output;
}

function assign(decimal_active,event){    
    if (decimal_active===0){    
        temporary=temporary*10 + +event.target.value;
    }else if (decimal_active===1){
        let temp=+event.target.value /decimal_place;
        temporary=temporary+ temp;
        decimal_place*=10;
    }
    if (operator_active==='' || operator_active==='='){
        firstNumber=temporary;
        output=temporary;
    }else{
        secondNumber=temporary;
        output=firstNumber+operator_active+secondNumber;
    }
    console.log(output);
    display_output();
}

let firstNumber=null;
let secondNumber=null;  
let digit_button=document.querySelectorAll('.digits');
let decimal=document.querySelector('.decimal');
let operator=document.querySelectorAll('.operator');
let decimal_active=0;
let operator_active='';
let operator_in_use=''
let temporary=0;
let output='';

decimal.addEventListener('click',(event)=>{
    if (decimal_active===0){    
        decimal_active=1;
        decimal_place=10;
        if (operator_active===''){
            output=firstNumber+'.';
        }
        else{
            output=firstNumber+operator_active+secondNumber+'.';
        }
        console.log(output);
        display_output();
    }else{
        decimal_active=2;
    }
})

digit_button.forEach(element=>{
    element.addEventListener('click',(event)=>{
        if(event.target.value!=='='){
            assign(decimal_active,event);
        }        
    })
})

operator.forEach(element=>{
    element.addEventListener('click',(event)=>{
        if(firstNumber!==null && secondNumber!==null){
            operator_active=event.target.value;
            switch(operator_in_use){
                case '+':{
                    firstNumber=add(firstNumber,secondNumber);
                    temporary=0;
                    secondNumber=null;
                    break;
                }
                case '-':{
                    firstNumber=subtract(firstNumber,secondNumber);
                    temporary=0;
                    secondNumber=null;
                    break;

                }
                case '*':{
                    firstNumber=multiply(firstNumber,secondNumber);
                    temporary=0;
                    secondNumber=null;
                    break;
                }
                case '/':{
                    firstNumber=divide(firstNumber,secondNumber);
                    temporary=0;
                    secondNumber=null;
                    break;
                }
            }
            if (operator_active !=='='){
                output=firstNumber+operator_active;
            }else{
                output=firstNumber;
            }
            console.log(output);
            display_output();
        }else if (firstNumber!==null){
            operator_active=event.target.value
            decimal_active=0;
            operator_in_use=event.target.value
            temporary=0;
            console.log(firstNumber+operator_active);
            output=firstNumber+operator_active;
            display_output();
        }

    })
    console.log(operator_active);
})
