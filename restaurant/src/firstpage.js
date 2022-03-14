function bodyContent(){
    let parent=document.createElement('div');
    parent.setAttribute('class','remove');
    let heading=document.createElement('h1');
    heading.innerHTML=`Beary's Breakfast Bar`;
    parent.appendChild(heading);
    let content=document.createElement('div');
    content.innerHTML=`Beary's has the best porridge! The atmosphere and customer service make you feel like you are sitting in the middle of the woods, eating like a bear! This is exactly the kind of place that I like to return to again and again.`
    parent.appendChild(content);
    let footer=document.createElement('div');
    let footerhead=document.createElement('h3');
    footerhead.innerHTML='Location';
    footer.appendChild(footerhead);
    let footerContent=document.createElement('p');
    footerContent.innerHTML='123 Forest Drive,ForestVille,Maine';
    footer.appendChild(footerContent);
    parent.appendChild(footer);
    return parent;
}


module.exports= {
    bodyContent:bodyContent,    
};