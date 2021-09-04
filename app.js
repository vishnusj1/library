const form = document.getElementById('input-form');
const formButton = document.getElementById('add-form');
const formView = document.querySelector('.form-card')
const bookList = document.querySelector('.books-wrapper');

let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
let newBook;

if (localStorage.getItem('myLibrary') === null) {
    myLibrary = [
        new Book('The Hobbit', 'J.R.R. Tolkien', 295),
        new Book('Harry Potter', 'J.K Rowling', 320),
        new Book('The Subtle Art of Not Giving a Fuck', 'Mark Manson', 300)
    ];
    setItem();
}

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    // this.info = function() {
    //     return `${this.title} is a book by ${this.author}, ${this.pages} pages`
    // };
};

function info(book) {
    return `${book.title} is a book by ${book.author}, ${book.pages} pages`
}

// Book.prototype.read = false;
// Book.prototype.info = function() {
//     return `${this.title} is a book by ${this.author}, ${this.pages} pages`
// }

// function setItem() {
//     localStorage.setItem('myLibrary', JSON.stringify(myLibrary, function replacer(key, value) {
//         return (key == 'info') ? undefined : value;
//     }));
// }
function setItem() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

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
        setItem();
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
                                    <p>${info(book)}</p>
                                <p id="status-book${book.id}" class ="read-status">${
                                    book.read ? 'Completed' : 'Not read'}
                                    </p>
                                </div>
                                <div class="card-menu">
                                <div class="button read" id="read-btn-${book.id}">
                                    ${
                                        book.read ?  'Mark as Unread' : 'Mark as Read'
                                    }
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
        // removeButton.addEventListener('click', (e) => {
        //     removeBook(book.id)
        // })
        removeButton.addEventListener('click', removeBook.bind(book.id), false);

        const readButton = document.querySelector(`#read-btn-${book.id}`);
        const status = document.querySelector(`#status-book${book.id}`)

        readButton.addEventListener("click", (e) => {
            readStatus(book, status, readButton);
            book.read ? readButton.textContent = 'Mark as Unread' : readButton.textContent = 'Mark as Read'
            status.textContent = book.read ? 'Completed' : 'Not read';
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
    console.log(this);
    myLibrary.splice(id, 1);
    setItem();
    populateBooks(myLibrary, bookList);
}

function readStatus(book, status, readButton) {
    book.read = !book.read;
    setItem();
    // populateBooks(myLibrary, bookList);
}

document.addEventListener("DOMContentLoaded", function() {
    form.addEventListener("submit", function(e) {
        addToLibrary(e)
    });
    formButton.addEventListener('click', formDisplay);
    populateBooks(myLibrary, bookList);
});