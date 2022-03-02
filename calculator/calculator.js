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

function assign(decimal_active,event){    
    if (decimal_active===0){    
        temporary=temporary*10 + +event.target.value;
    }else if (decimal_active===1){
        let temp=+event.target.value /decimal_place;
        temporary=temporary+ temp;
        decimal_place*=10;
    }
    if (operator_active===''){
        firstNumber=temporary;
        output=temporary;
    }
    else{
        secondNumber=temporary;
        output=firstNumber+operator_active+secondNumber;
    }
    console.log(output);
}

let firstNumber=null;
let secondNumber=null;  
let digit_button=document.querySelectorAll('.digits');
let decimal=document.querySelector('.decimal');
let operator=document.querySelectorAll('.operator');
let decimal_active=0;
let operator_active='';
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
    }else{
        decimal_active=2;
    }
})

digit_button.forEach(element=>{
    element.addEventListener('click',(event)=>{
        assign(decimal_active,event);        
    })
})

operator.forEach(element=>{
    element.addEventListener('click',(event)=>{
        if (firstNumber!==null){
            operator_active=event.target.value
            decimal_active=0;
            temporary=0;
            console.log(firstNumber+operator_active);
            output=firstNumber+operator_active;
        }

    })
    console.log(operator_active);
})
