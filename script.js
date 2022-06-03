//main functions - book creation + library addition and rendering.

//Library
let myLibrary = [];

//Book Object

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

//render library function
function renderLibrary() {
  const renderedBooks = document.querySelector(".library").children;
  const renderedBooksArray = Array.from(renderedBooks);
  console.log(renderedBooksArray);

  if (renderedBooks.length)
    renderedBooksArray.forEach((renderedBook) => renderedBook.remove());

  myLibrary.forEach((book, index) => {
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

//helper functions

//add book to library
function addBookToLibrary(book) {
  myLibrary.push(book);
}

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

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("read").checked;

  const newBook = new Book(title, author, pages, isRead);

  addBookToLibrary(newBook);

  renderLibrary();

  toggleModal("none");

  //Event listener after new items are initialized

  //change isRead status
  const changeReadStatusCheckbox = document
    .querySelector(".change-read-status")
    .addEventListener("input", (e) => {
      const isReadSpan = document.querySelector(".is-read");
      isReadSpan.textContent = e.target.checked ? "Read" : "Not Read";

      const bookDiv = e.target.parentElement.parentElement.parentElement;
      const bookIndex = bookDiv.dataset.id;

      myLibrary[bookIndex].isRead = e.target.checked ? true : false;
    });

  //add delete function
  const deleteBtn = document
    .querySelector(".del-btn")
    .addEventListener("click", (e) => {
      const bookDiv = e.target.parentElement.parentElement;
      const id = bookDiv.dataset.id;
      console.log(bookDiv.dataset.id);

      bookDiv.remove();
      myLibrary = myLibrary.filter((book) => book.id !== id);
      renderLibrary();
    });
});
