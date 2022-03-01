function createGrid(size){
    parent=document.getElementsByClassName('parent-div');
    console.log(parent[0]);
    let height=Math.floor(vh/size);
    for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
            div=document.createElement('div');
            div.className='grid';
            div.style.height=height+'px';
            div.style.width=height+'px';
            parent[0].appendChild(div);
        }
    }
}

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
let button=document.querySelector('.btn');
button.addEventListener('click',()=>{
    let div=document.querySelectorAll('grid');
    if(div !==null){    
        div.forEach(element => {
                div.remove();
        });
    }
    let size=+prompt(`Enter grid size`);
    createGrid(size);
})