// Library Project

// Class declaration
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  // Method to toggle isRead between true and false
  changeReadStatus() {
    this.isRead = !this.isRead;
  }

  // Method to return the book's info
  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, Read: ${this.isRead}`;
  }
}

/// Global Vars
var myLibrary = [];
const body = document.querySelector("body");
const submitButton = document.querySelector("submit-button");

/// EVENT LISTENERS

document.addEventListener("DOMContentLoaded", () => {
  const addBookButton = document.getElementById("addBook");
  const bookForm = document.getElementById("bookForm");

  addBookButton.addEventListener("click", () => {
    // Toggle the form's visibility
    if (bookForm.style.display === "none") {
      bookForm.style.display = "block";
    } else {
      bookForm.style.display = "none";
    }
  });

  bookForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents the form from submitting

    // Get form data
    const formData = {
      title: bookForm.querySelector('input[name="book-title"]').value,
      author: bookForm.querySelector('input[name="book-author"]').value,
      pages: bookForm.querySelector('input[name="book-pages"]').value,
      isRead:
        bookForm.querySelector(
          'select[name="book-isRead"], input[name="book-isRead"]:checked'
        ).value === "true", // Determine if the book is read or not
    };

    // Create a new Book instance 
    const newBook = new Book(
      formData.title,
      formData.author,
      formData.pages,
      formData.isRead
    );

    // Add the Book instance to the library
    myLibrary.push(newBook);

    // Update the display
    displayLibraryBooks(myLibrary); 
  });
});

function displayLibraryBooks(array) {
  let bookList = document.querySelector("#bookList");

  // If it doesn't exist, create it
  if (!bookList) {
    bookList = document.createElement("ul");
    bookList.id = "bookList"; // Assign a unique ID
    document.body.appendChild(bookList);
  }

  bookList.innerHTML = ""; // Clear the html

  for (let i = 0; i < array.length; i++) {
    const book = array[i]; // Current Book Object
    var listItem = document.createElement("li");
    listItem.textContent = `${book.title} by ${book.author}`;

    // Add a delete button to each list item
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteBook(i);
    });

    // Add a selector to change its read status
    var selectButton = document.createElement("select");
    selectButton.name = "book-isRead";

    // Add options to the select button
    const options = [
      { value: "true", text: "Read" },
      { value: "false", text: "Not Read" },
    ];

    options.forEach((option) => {
      let optionElement = document.createElement("option");
      optionElement.value = option.value;
      optionElement.textContent = option.text;

      selectButton.appendChild(optionElement);
    });

    // Add event listener to change the read status
    selectButton.value = book.isRead.toString(); // Set initial value of select
    selectButton.addEventListener("change", () => {
      // Call changeReadStatus on the current Book object
      book.changeReadStatus(); 
      selectButton.value = book.isRead.toString(); // Update the select button to reflect the new status
      displayLibraryBooks(myLibrary); // Refresh the display
    });

    listItem.appendChild(selectButton);
    listItem.appendChild(deleteButton);
    bookList.appendChild(listItem);
  }
}

function deleteBook(index) {
  if (confirm("Are you sure you want to delete this book?")) {
    myLibrary.splice(index, 1);
  }
  displayLibraryBooks(myLibrary);
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  console.log(
    `${newBook.title} by ${newBook.author} has been added to the library.`
  );
    myLibrary.push(newBook);
}

addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 214, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("Moby-Dick", "Herman Melville", 635, false);
addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, false);
addBookToLibrary("The Alchemist", "Paulo Coelho", 208, true);
addBookToLibrary("Brave New World", "Aldous Huxley", 268, true);
addBookToLibrary("The Fellowship of the Ring", "J.R.R. Tolkien", 423, false);

displayLibraryBooks(myLibrary);

