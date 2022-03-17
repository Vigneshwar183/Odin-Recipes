function weather(location){
    // let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d902eb5b1b4b5a9fb9e699f6cd2869ee`,{mode:'cors'});
    // console.log(response);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d902eb5b1b4b5a9fb9e699f6cd2869ee`,{mode:'cors'})
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            display(data);
        })
        
}

function display(data){
    let parent=document.querySelector('body');
    let child=document.createElement('div');
    let div1=document.createElement('div');
    div1.innerHTML=`London=${data['name']}`
    child.appendChild(div1);
    let div2=document.createElement('div');
    div2.innerHTML=`Temperature=${data['main']['temp']}`;
    child.appendChild(div2);
    if (data['main']['temp']<270){
        child.style.backgroundColor='grey';
    }else if (data['main']['temp']>300){
        child.style.backgroundColor='yellow';
    }else{
        child.style.backgroundColor='blue';
    }
    parent.appendChild(child);
}


let button=document.getElementById('button');
button.addEventListener('click',()=>{
    let location=document.getElementById('location');
    weather(location.value);
});
