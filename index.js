document.getElementById("error-message").style.display = "none";
document.getElementById('loading-spinner').style.display="none";
const searchBook=()=>{

  const searchField = document.getElementById('input-field');
  const searchValue = searchField.value ;
  searchField.value ='';
  if (searchValue === "") {
    document.getElementById("error-message").style.display = "block";
  }
  else{
    document.getElementById('loading-spinner').style.display="block";
    const url =` https://openlibrary.org/search.json?q=${searchValue}`
  fetch(url)
  .then(res=>res.json())
  .then(data=>displaySearchResult(data.docs))
  }
}

const displaySearchResult = (books)=>{

  document.getElementById("error-message").style.display = "none";

  document.getElementById('loading-spinner').style.display="none";

  document.getElementById('heading').style.display="none";

  if(books.numFound == 0){

  }
  else{
    const resultContainer = document.getElementById('search-result');
  resultContainer.innerHTML='';
  books.slice(0,10).forEach((book)=>{
    const { title, author_name, publish_date, cover_i, author_key } =
    book;
    const bookCard = document.createElement('div');
    bookCard.classList.add("col");
    bookCard.innerHTML=`
    <div class="card shadow-lg">
    <div class="">
    <img src=${cover_i? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`:"N/A"} alt=".." class="card-img-top w-full">
    </div>
    <div class="card-body">
    <h5 class="card-title">Book Title: ${title ? title : ""}</h5>
    <p class="card-text">Author: ${author_name[0]}</p>
    <p class="card-text">Publish date: ${publish_date[0]}</p>
    </div>
    <div class="card-footer"><button class="btn btn-outline btn-outline-success" onclick="loadAuthorDetail('${
      author_key[0]
    }')">Author Detail</button></div>
</div>
    
    `
    resultContainer.appendChild(bookCard)

  })
  
  }
}

const loadAuthorDetail =(authId)=>{

  fetch(`https://openlibrary.org/authors/${authId}.json`)
  .then((res) => res.json())
  .then((data) => displayAuthorDetail(data));
}
const displayAuthorDetail = (author) => {
  window.scrollTo(0,40)
  const { name, birth_date, bio } = author;
  const detailContainer = document.getElementById("author-detail");
  detailContainer.innerHTML = `
     <div>
        <h5 class="card-title">Author Name: ${name}</h5>
        <p class="card-text">Author DOB: ${birth_date ? birth_date : "N/a"}</p>
        <p class="card-text">Author Bio: ${bio ? bio : "N/a"}</p>
     </div>
     
     `;
};
// searchBook();
















