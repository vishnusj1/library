const Book = class {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
  }
};

const Library = (function () {
  let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

  function getLibrary() {
    return myLibrary;
  }

  function addToLibrary(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    console.log(title, author, pages);
    let newBook = new Book(title, author, pages);
    myLibrary.push(newBook);
    LocalStorage.set();
  }
  return {
    add: addToLibrary,
    get: getLibrary,
  };
})();

const displayController = (function () {
  const form = document.getElementById('input-form');
  const formButton = document.getElementById('add-form');
  const formView = document.querySelector('.form-card');
  const bookWrapper = document.querySelector('.books-wrapper');
  const myLibrary = Library.get();

  formButton.addEventListener('click', toggleForm);
  form.addEventListener('submit', addBook);
  document.addEventListener('DOMContentLoaded', render);

  function addBook(e) {
    Library.add(e);
    clear();
    render();
  }

  function render() {
    myLibrary.forEach((book, index) => {
      book.id = index;
      const cardContent = `
                <div class="card-info-wrapper">
                    <h2>${book.title}</h2>
                    <h3>${book.author}</h3>
                    <h4>${book.pages} Pages</h4>
                    <p>${getInfo(book)}</p>
                </div>
                <p id="status-book${book.id}" class ="read-status">${
        book.read ? 'Completed' : 'Not read'
      }</p>
                <div class="card-menu">
                    <div class="button read" id="read-btn-${book.id}">
                        ${book.read ? 'Mark as Unread' : 'Mark as Read'}
                    </div>
                    <div class="button remove" id="remove-btn-${book.id}">Remove</div>
                </div>
            `;
      const element = document.createElement('div');
      element.classList.add('book-card');
      element.dataset.index = book.id;
      element.innerHTML = cardContent;
      bookWrapper.appendChild(element);

      const removeButton = document.querySelector(`#remove-btn-${book.id}`);
      removeButton.addEventListener('click', () => {
        remove(book.id);
      });

      const readButton = document.querySelector(`#read-btn-${book.id}`);
      const status = document.querySelector(`#status-book${book.id}`);

      readButton.addEventListener('click', (e) => {
        toggleRead(book, status, readButton);
        book.read
          ? (readButton.textContent = 'Mark as Unread')
          : (readButton.textContent = 'Mark as Read');
        status.textContent = book.read ? 'Completed' : 'Not read';
      });
    });
  }

  function clear() {
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach((bookCard) => bookWrapper.removeChild(bookCard));
  }

  function remove(id) {
    myLibrary.splice(id, 1);
    LocalStorage.set();
    clear();
    render();
  }

  function toggleRead(book) {
    book.read = !book.read;
    LocalStorage.set();
  }

  function getInfo(book) {
    return `
            ${book.title} is a book by ${book.author},
            ${book.pages}Pages.
            `;
  }

  function toggleForm() {
    form.reset();
    formView.classList.toggle('toggle-on');
  }

  return {
    toggleForm,
    render,
    clear,
    remove,
    getInfo,
  };
})();

const LocalStorage = (function () {
  myLibrary = Library.get();
  function loadDummy() {
    if (localStorage.getItem('myLibrary') === null) {
      myLibrary = [
        new Book('The Hobbit', 'J.R.R. Tolkien', 295),
        new Book('Harry Potter', 'J.K Rowling', 320),
        new Book('The Subtle Art of Not Giving a Fuck', 'Mark Manson', 300),
      ];
      setItem();
    }
  }

  function setItem() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  }

  return {
    get: loadDummy,
    set: setItem,
  };
})();
