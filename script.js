const form = document.getElementById('input-form');
const formButton = document.getElementById('add-form');
const formView = document.querySelector('.form-card')
const bookList = document.querySelector('.books-wrapper');

let myLibrary = [];
let newBook;

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    // this.info = function() {
    //     return `${this.title} is a book by ${this.author}, ${this.pages} pages, not read yet.`
    // };
};
Book.prototype.read = false;


function addToLibrary(e) {
    {
        e.preventDefault();
        const title = (document.getElementById('title')).value;
        const author = (document.getElementById('author')).value;
        const pages = (document.getElementById('pages')).value;
        newBook = new Book(title, author, pages);
    } {
        myLibrary.push(newBook);
        populateBooks(myLibrary, bookList);
        // updateTable();
        formDisplay();
        form.reset();
        console.table(myLibrary)
    }
};

// function updateTable() {
//     localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
// };
//Problem - The Form is getting removed along with with refreshing the bookList
//Sol - Selecting bookcards (line-72) and deleting before adding a new card fixed the problem 
function populateBooks(myLib, bookView) {
    document.querySelectorAll('.book-card').forEach(e => e.remove());
    myLib.forEach((book, i) => {
        book.id = i;
        const cardContent = `<div class="book-card" data-index=${book.id}>
                                <div class="card-info-wrapper">
                                    <h2>${book.title}</h2>
                                    <h3>${book.author}</h3>
                                    <h4>${book.pages} Pages</h4>
                                    <p>${book.info()}</p>
                                </div>
                                <div class="card-menu">
                                    <div class="button" id="remove-btn">
                                        Remove
                                    </div>
                                </div>
                        </div>`
        const element = document.createElement('div');
        element.innerHTML = cardContent;
        bookView.appendChild(element.firstChild);
        const cards = document.querySelectorAll('[data-index]');
        cards.forEach(card => {
            const removeButton = card.querySelector('.button');
            removeButton.addEventListener('click', () => {
                removeBook(book.id)
            })
        })

    });
};

function removeBook(id) {
    console.log('deleting', id);
    myLibrary.splice(id, 1);
    console.table(myLibrary);
    populateBooks(myLibrary, bookList);
}

function formDisplay() {
    form.reset();
    formView.classList.toggle('toggle-on');
};

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295);
myLibrary.push(theHobbit)
const harryPotter = new Book('Harry Potter', 'J.K Rowling', 320);
myLibrary.push(harryPotter)
const sangaf = new Book('The Subtle Art of Not Giving a Fuck', 'Mark Manson', 300)
myLibrary.push(sangaf)

document.addEventListener("DOMContentLoaded", function() {
    form.addEventListener("submit", function(e) {
        addToLibrary(e)
    });
});

formButton.addEventListener('click', formDisplay);


populateBooks(myLibrary, bookList);