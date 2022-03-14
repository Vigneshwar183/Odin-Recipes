import firstPage from './firstpage';
import secondPage from './secondpage';
import './style.css';

function pageLoad(){
    let parent=document.querySelector('#content');
    let page1=document.createElement('div');
    page1.innerHTML='Home';
    page1.setAttribute('class','home');
    parent.appendChild(page1);
    let page2=document.createElement('div');
    page2.innerHTML='Menu';
    page2.setAttribute('class','menu');
    parent.appendChild(page2);
    let page3=document.createElement('div');
}

function primaryPage(){
    let parent=document.querySelector('#content');
    parent.appendChild(firstPage.bodyContent());
}

function menuPage(){
    let parent=document.querySelector('#content');
    parent.appendChild(secondPage.secondPage());
}

pageLoad();
primaryPage();
let menu=document.getElementsByClassName('menu');
menu[0].addEventListener('click',()=>{
    let parent=document.getElementsByClassName('remove');
    parent[0].remove();
    menuPage();
})
let home=document.getElementsByClassName('home');
home[0].addEventListener('click',()=>{
    let parent=document.getElementsByClassName('remove');
    parent[0].remove();
    primaryPage();
})
