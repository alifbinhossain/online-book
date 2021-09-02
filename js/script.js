/* --------------------- REUSABLE VARIABLES & FUNCTIONS --------------------- */
const toggleBanner = (displayPro, width, imgSrc) => {
  document.getElementById("banner").style.display = displayPro;
  document.getElementById("banner").innerHTML = ` <img
  class="mx-auto ${width} mt-5 d-block"
  src="images/${imgSrc}.png"
  alt=""
/>`;
};

const toggleContainer = (displayPro) => {
  document.getElementById("container").style.display = displayPro;
};
const notifyText = document.getElementById("notify-text");
const spinner = `
       <div id="spinner" class="spinner-border text-dark" role="status">
             <span class="visually-hidden">Loading...</span>
      </div>`;
let wrongSearchText;

toggleBanner("block", "w-25", "banner");

/* ----------------------- LOAD DATA FUNCTIONALLITY ----------------------- */
const loadData = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  wrongSearchText = searchText;
  searchField.value = "";
  const url = `http://openlibrary.org/search.json?q=${searchText}`;

  if (searchText === "") {
    notifyText.innerText = "Please enter a book name!";
  } else {
    toggleBanner("none");
    notifyText.innerHTML = ` Please wait for a moment... <br>
    ${spinner}`;
    toggleContainer("none");
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayBooks(data.docs));
  }
};

/* ---------------------- DISPLAY BOOKS FUNCTIONALLITY ---------------------- */
const displayBooks = (books) => {
  const totalbooks = books.length;
  const booksContainer = document.getElementById("books");
  booksContainer.innerHTML = "";

  if (totalbooks === 0) {
    notifyText.innerHTML = `Sorry <span class="text-danger">${wrongSearchText}</span> is not found.`;
    toggleBanner("block", "w-50", "not-found-2");
  } else {
    books.forEach((book) => {
      notifyText.innerHTML = `Total result : ${totalbooks}`;
      /* ------------------------- STORE BOOK INFORMATION ------------------------- */
      const bookName = book?.title ? book?.title : "AlifScript";
      const author = book?.author_name?.[0] ? book?.author_name?.[0] : "Alif";
      const firstPublish = book?.first_publish_year
        ? book?.first_publish_year
        : 2005;
      const publisher = book?.publisher?.[0]
        ? book?.publisher?.[0]
        : "Alif Publication";
      const language = book?.language?.toString()
        ? book?.language?.toString()
        : "eng";
      const imageUrl = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "images/default-book.jpg";

      /* ------------- CREATE NEW ELEMENT & APPEND TO BOOKS CONTAINER ------------- */
      const newBook = document.createElement("div");
      newBook.innerHTML = `
                   <div class="card h-100 p-3 pb-1">
                      <img
                        class="book-cover"
                        src="${imageUrl}"
                        class="card-img-top"
                        alt="..."
                      />
                      <div class="card-body px-0 text-center">
                        <h5 class="card-title mt-2 mb-3">${bookName}</h5>
                        <div class="book-details">
                          <h6>Author: <span>${author}</span></h6>
                          <h6>First Publish: <span>${firstPublish}</span></h6>
                          <h6>Publisher: <span>${publisher}</span></h6>
                          <h6>Language: <span>${language}</span></h6>
                        </div>
                      </div>
                    </div>
          `;
      toggleContainer("block");
      booksContainer.appendChild(newBook);
    });
  }
};
