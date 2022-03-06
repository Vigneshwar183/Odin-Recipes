function Book(){
    this.book=form.elements['bookName'].value;
    this.name=form.elements['author'].value;
    this.desc=form.elements['description'].value;
    this.cost=form.elements['price'].value;
    alert(this.book+this.name+this.desc+this.cost)
}

function addBookToLibrary(){
}

let library=[]
addBookToLibrary.prototype=Object.create(Book.prototype)
let form=document.querySelector('form');
form.onsubmit=Book
    