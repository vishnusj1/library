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
    this.info = function() {
        return `${this.title} is a book by ${this.author}, ${this.pages} pages`
    };
};

Book.prototype.read = false;
// console.log(Book.prototype.read);
// Book.prototype.info = function() {
//     return `${this.title} is a book by ${this.author}, ${this.pages} pages, not read yet.`
// };
// newBook.prototype = Object.create(Book.prototype)

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
        formDisplay();
        form.reset();
        console.table(myLibrary)
    }
};

function populateBooks(myLib, bookView) {
    const bookCards = document.querySelectorAll('.book-card')
    bookCards.forEach(bookCard => bookList.removeChild(bookCard));
    myLib.forEach((book, index) => {
        book.prototype = Object.create(Book.prototype)
        book.id = index;
        const cardContent = `<div class="book-card" data-index=${book.id} >
                                <div class="card-info-wrapper">
                                    <h2>${book.title}</h2>
                                    <h3>${book.author}</h3>
                                    <h4>${book.pages} Pages</h4>
                                    <p>${book.info()}</p>
                                <p id="status-book${book.id}" class ="read-status"></p>
                                </div>
                                <div class="card-menu">
                                <div class="button read" id="read-btn-${book.id}">
                                        Mark as Read
                                </div>
                                    <div class="button remove" id="remove-btn-${book.id}">
                                        Remove
                                    </div>
                                </div>
                        </div>`

        const element = document.createElement('div');
        element.innerHTML = cardContent;
        bookView.appendChild(element.firstChild);

        const removeButton = document.querySelector(`#remove-btn-${book.id}`);
        removeButton.addEventListener('click', (e) => {
            removeBook(book.id)
        })
        const readButton = document.querySelector(`#read-btn-${book.id}`);
        const status = document.querySelector(`#status-book${book.id}`)
        readButton.addEventListener("click", (e) => {
            readStatus(book);
            console.log(book.prototype.read);
            book.prototype.read ? readButton.textContent = 'Mark as Unread' : readButton.textContent = 'Mark as Read'
                // readButton.textContent = 'Mark as Unread';
            status.textContent = book.prototype.read ? 'Read' : 'Not read';
        });
    });

};


// bookList.addEventListener("click", (e) => {
//     if (e.target.classList.contains("remove")) {
//         const index = e.target.parentElement.parentElement.dataset.index;
//         removeBook(index);
//     }
// });

function formDisplay() {
    form.reset();
    formView.classList.toggle('toggle-on');
};

function removeBook(id) {
    // console.log('deleting', id);
    myLibrary.splice(id, 1);
    populateBooks(myLibrary, bookList);
    // console.table(myLibrary);
}

function readStatus(book) {
    book.prototype.read = !book.prototype.read;
    // console.log(book);
}



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