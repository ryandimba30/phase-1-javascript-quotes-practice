let id = 1;
let count = 0;
document.addEventListener("DOMContentLoaded", () => {
    body = document.getElementsByName("body");
    fetchQuotes();
    addQuoteForm();
})

function fetchQuotes() {
    fetch("http://localhost:3000/quotes"+"?_embed=likes")
        .then(res => res.json())
        .then(data => {
            arr = data;
            data.forEach(element => addQuote(element));
            addDeleteEventListener();
            addLikeEventListener();
        });
}

function addDeleteEventListener(){
    let deleteButtonList = document.getElementsByClassName("btn-danger");
    for(let i =0; i < deleteButtonList.length; i++) {
        deleteButtonList[i].addEventListener("click", deleteElement);
    }
}

function deleteFunction(i) {
    fetch("http://localhost:3000/quotes/" + i, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => console.log(data));
}


function deleteElement(e){
    id = e.target.parentNode.id
    e.target.parentElement.innerHTML = "";
    debugger;
    deleteFunction(id);
}

function addQuote(element) {
    const ul = document.getElementById("quote-list");
    ul.style.listStyle = "none";
    const li = document.createElement("li");
    li.setAttribute("class", "quote-card");
    li.setAttribute("id", id);
    id++
    li.innerHTML = `
    <blockquote class="blockquote">
        <p class="mb-0">${element.quote}</p>
        <footer class="blockquote-footer">${element.author}</footer>
        <br>
        </blockquote>`;
    const likeButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    likeButton.classList.add('btn-success');
    deleteButton.classList.add('btn-danger');

    li.appendChild(likeButton);
    li.appendChild(deleteButton);

    likeButton.innerHTML = `Likes: <span>0</span>`
    deleteButton.innerHTML = `Delete`;

    likeButton.addEventListener("click", likeElement);
    deleteButton.addEventListener("click", deleteElement);

    ul.append(li);
}
//add new quote
const newQuote = {
    "quote": event.target.quote.value,
    "author": event.target.author.value
}
function addQuoteForm() {
    const form = document.querySelector("#new-quote-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        submitQuote(newQuote);
        form.reset();
    })
}
//submit new quote to the API
function  submitQuote(obj) {
    fetch("http://localhost:3000/likes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            quoteID: "7",
            quote: "obj.quote"
        })
    })
        .then(res => res.json())
        .then(data => addQuote(data));
}

function addLikeEventListener(){
    let likeButtonList = document.getElementsByClassName("btn-success");
    for(let i =0; i < likeButtonList.length; i++) {
        likeButtonList[i].addEventListener("click", likeElement);
    }
}

function likeElement(e) {
    e.preventDefault()
    id = e.target.parentNode.parentElement.id;

    count++;
    e.target.innerHTML = `Likes: <span>${count}</span>`;
    const likeCounter = {
        "quoteId": id,
        createdAt: Date.now()
    }
    postLikes(likeCounter);
}

function postLikes(like) {
    fetch("http://localhost:3000/likes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(like)
    })
        .then(res => res.json())
        .then(data => data)
} 