function secondPage(){
    let parent=document.createElement('div');
    parent.setAttribute('class','remove');
    
    let header=document.createElement('h1');
    header.innerHTML='Menu';
    parent.appendChild(header);
    
    let subHeader1=document.createElement('ul');
    subHeader1.innerHTML='Beverages';
    let subHeaderContent1=document.createElement('li');
    subHeaderContent1.innerHTML='Honey Tea';
    subHeader1.appendChild(subHeaderContent1);
    let subHeaderContent2=document.createElement('li');
    subHeaderContent2.innerHTML='Beary Tea';
    subHeader1.appendChild(subHeaderContent2);
    parent.appendChild(subHeader1);

    let subHeader2=document.createElement('ul');
    subHeader2.innerHTML='Sides';
    let subHeader2Content1=document.createElement('li');
    subHeader2Content1.innerHTML='Toast and Jam';
    subHeader2.appendChild(subHeader2Content1);
    let subHeader2Content2=document.createElement('li');
    subHeader2Content2.innerHTML='Fresh Fruit';
    subHeader2.appendChild(subHeader2Content2);
    parent.appendChild(subHeader2);

    return parent;
}

module.exports={
    secondPage:secondPage,
}