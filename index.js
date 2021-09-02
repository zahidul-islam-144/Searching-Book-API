// variable 
const bookContainer = document.getElementById('book-container');
const error = document.getElementById('error-messages');

//fetching value from API when button clicked
const searchBooks = () => {
   const searchInputField = document.getElementById('search-input-field');
   let searchInputValue = searchInputField.value;

   const API_URL = `https://openlibrary.org/search.json?q=${searchInputValue}`;

// converted API data
   fetch(API_URL)
       .then(Response => Response.json())
       .then(data => showData(data));

// clear field
    searchInputField.value = '';
    bookContainer.innerHTML = '';
    error.innerText = '';
}

//passing data by parameter
const showData = (books) => {

    // books availability checking
       if(books.num_found === 0){
        error.innerText = 'No books found !';
       }
       else{
        // showing search result
           const bookNumber = document.getElementById('total-book-found');
           bookNumber.innerText = `Total Books Found: ${books.num_found}`;
           const errNum = books.num_found; 
       }  
       displayBooks(books.docs); 
}

// showing searched books
const displayBooks = (book) =>{

    book.forEach(element => {
        // creating child element 
        const div = document.createElement('div');
        div.classList.add('col-12');
        div.innerHTML = `
        <div class="col">
            <div class="card">
            <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top" alt=${element.title}>
                <div class="card-body">
                    <h4 class="card-title"><strong>Book Name: ${element.title}</strong></h4>
                    <p class="card-text">
                        <span><strong>Author Name:</strong> ${element.author_name} </span><br>
                        <span><strong>Publish Date:</strong> ${element.first_publish_year}</span>
                    </p>
                </div>
            </div>
        </div>`;
        bookContainer.appendChild(div);
    });
}
