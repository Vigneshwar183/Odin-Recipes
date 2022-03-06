function Book(){
    this.book=form.elements['bookName'].value;
    this.name=form.elements['author'].value;
    this.desc=form.elements['description'].value;
    this.cost=form.elements['price'].value;
}

function addBookToLibrary(book){
    library.push(book);
    console.log(library[0]['book']);
    let parent=document.querySelector('table');
    for (i in library){
        let row=document.createElement('tr');
        let td=document.createElement('td');
        td=library[0]['book']
        row.append(td);
        td=library[0]['name']
        row.append(td);
        td=library[0]['description']
        row.append(td);
        td=library[0]['price']
        row.append(td);
        console.log(row)
        parent.appendChild(row);
    }
}

function updateTable(){
    // let parent=document.querySelector('table');
    // parent.appendChild(child);
    // for (i in library){
    //     let row=document.createElement('tr');
    //     let td=document.createElement('td');
    //     td=library[0]['book']
    //     row.append(td);
    //     td=library[0]['name']
    //     row.append(td);
    //     td=library[0]['description']
    //     row.append(td);
    //     td=library[0]['price']
    //     row.append(td);
    //     console.log(row)
    //     parent.appendChild('row');
    // }
}

let library=[]
addBookToLibrary.prototype=Object.create(Book.prototype)
let form=document.querySelector('form');
form.onsubmit=(event)=>{
    event.preventDefault();
    let book=new Book();
    addBookToLibrary(book);
}
    
let display=document.querySelector('.display');
display.onsubmit=updateTable