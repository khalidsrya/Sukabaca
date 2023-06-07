const STORAGE_KEY = "BOOK_APPS";

let books = [];

function isStorageExist() {
  if (typeof Storage == "undefined") {
    alert("Browser not support web storage");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("onDataSaved"));
  booksLength();
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);
  if (data !== null) {
    books = data;
  }
  document.dispatchEvent(new Event("onDataLoaded"));
  booksLength();
}

function updateDataToStorage() {
  if (isStorageExist()) {
    saveData();
  }
}

function composeToObject(title, author, year, isComplete) {
  return {
    id: +new Date(), 
    title,
    author,
    year,
    isComplete,
  };
}

function findBook(bookId) {
  for (book of books) {
    if (book.id == bookId) {
      return book;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) {
      return index;
    }

    index++;
  }

  return -1;
}

function refreshDataFromBooks() {
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_LIST);
  let listCompleted = document.getElementById(COMPLETED_BOOK_LIST);

  for (book of books) {
    const newBook = makeBook(
      book.title,
      book.author,
      book.year,
      book.isComplete
    );
    newBook[BOOK_ITEMID] = book.id;

    if (book.isComplete) {
      listCompleted.append(newBook);
    } else {
      listUncompleted.append(newBook);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("onDataSaved", () => {
  console.log("Buku telah berhasil disimpan");
});

document.addEventListener("onDataLoaded", () => {
  refreshDataFromBooks();
});