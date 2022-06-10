//main functions - book creation + library addition and rendering.

//Library Class

class Library {
  books = [];

  get books() {
    return this._books;
  }

  setBooks(book) {
    return this.books.push(book);
  }

  clearBooks() {
    return (this.books = []);
  }

  renderLibrary() {
    let renderedBooks = document.querySelector(".library").children;
    let renderedBooksArray = Array.from(renderedBooks);

    if (renderedBooks.length)
      renderedBooksArray.forEach((renderedBook) => renderedBook.remove());

    this.books.forEach((book, index) => {
      book.id = index;
      //get library div
      const libraryDiv = document.querySelector(".library");

      //initialize elements for each book
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book");
      bookDiv.dataset.id = book.id;

      const titleP = document.createElement("p");
      titleP.textContent = book.title;

      const authorP = document.createElement("p");
      authorP.textContent = book.author;

      const pagesP = document.createElement("p");
      pagesP.textContent = book.pages;

      const buttonsDiv = document.createElement("div");
      buttonsDiv.classList.add("book-buttons");

      const checkboxDiv = document.createElement("div");
      checkboxDiv.classList.add("checkbox");

      const isReadSpan = document.createElement("span");
      isReadSpan.classList.add("is-read");
      isReadSpan.textContent = book.isRead ? "Read" : "Not Read";

      const checkboxInput = document.createElement("input");
      checkboxInput.classList.add("change-read-status");
      checkboxInput.setAttribute("type", "checkbox");
      checkboxInput.checked = book.isRead ? true : false;

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("del-btn");
      deleteBtn.textContent = "Delete";

      //append elements to their corresponding elements
      checkboxDiv.appendChild(isReadSpan);
      checkboxDiv.appendChild(checkboxInput);

      buttonsDiv.appendChild(checkboxDiv);
      buttonsDiv.appendChild(deleteBtn);

      bookDiv.appendChild(titleP);
      bookDiv.appendChild(authorP);
      bookDiv.appendChild(pagesP);
      bookDiv.appendChild(buttonsDiv);

      libraryDiv.appendChild(bookDiv);
    });
  }
}

let myLibrary = new Library();
//Book Class

class Book {
  isRead = false;
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

//render library function

//toggle modal
function toggleModal(displayValue) {
  const modal = (document.querySelector(
    ".form-modal"
  ).style.cssText = `display: ${displayValue}`);
}

//Basic event listeners
const enableModalBtn = document
  .querySelector(".enable-modal-btn")
  .addEventListener("click", () => {
    toggleModal("initial");
  });

const closeModalBtn = document
  .querySelector(".close")
  .addEventListener("click", (e) => {
    toggleModal("none");
  });

//add new book event listener

const form = document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const isRead = document.getElementById("read");

  const newBook = new Book(
    title.value,
    author.value,
    pages.value,
    isRead.checked
  );

  title.value = "";
  author.value = "";
  pages.value = "";
  isRead.checked = false;

  myLibrary.setBooks(newBook);

  myLibrary.renderLibrary();

  toggleModal("none");
});

//Event listener after new items are initialized

//used event delegation for this.

const libraryGrid = document
  .querySelector(".library")
  .addEventListener("click", (e) => {
    if (e.target.classList.contains("change-read-status")) {
      let isReadSpan = e.target.previousSibling;
      isReadSpan.textContent = e.target.checked ? "Read" : "Not Read";

      const bookDiv = e.target.parentElement.parentElement.parentElement;
      const bookIndex = bookDiv.dataset.id;

      myLibrary.books[bookIndex].isRead = e.target.checked ? true : false;

      console.log(myLibrary.books[bookIndex].isRead);
    } else if (e.target.classList.contains("del-btn")) {
      const bookDiv = e.target.parentElement.parentElement;
      const id = bookDiv.dataset.id;

      myLibrary.books.splice(id, 1);
      myLibrary.renderLibrary();
    }
  });
