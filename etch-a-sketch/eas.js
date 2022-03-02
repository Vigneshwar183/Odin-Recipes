function createGrid(size){
    parent=document.getElementsByClassName('parent-div');
    let height=Math.floor(900/size);
    for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
            div=document.createElement('div');
            div.className='grid';
            div.style.height=height+'px';
            div.style.width=height+'px';
            div.style.margin=0;
            parent[0].appendChild(div);
        }
    }
}

function clear(){
    let elements=document.querySelectorAll('.grid');
    
    if (elements!==null){    
        elements.forEach(element=>{
            element.parentNode.removeChild(element);
            
        })
        console.log('hi');
    }
}

function alterDiv(){
    let gridBoxes=document.querySelectorAll('.grid');
    console.log(gridBoxes);
    gridBoxes.forEach(element =>{
        element.addEventListener('mouseover',(event)=>{
            event.target.style.backgroundColor='black';
        })
    })
}


const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
let button=document.querySelector('.btn');
button.addEventListener('click',()=>{
    if(document.querySelector('.grid')===null){
        let size=+prompt(`Enter grid size`);
        createGrid(size);
        alterDiv();
    }else{
        clear();
    }
})

