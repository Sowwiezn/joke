// const { json } = require("node:stream/consumers");

const jokesContainer = document.getElementById('jokes_container');

const jokeForm = document.getElementById('joke_form');

let currentLength = 0;

const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/jokes');
xhr.send();
xhr.responseType = 'json';
xhr.onload = () => {
    console.log('jokes')
    console.log(xhr.response)
    const jokes = xhr.response;
    if(jokes.length){
        jokesContainer.innerHTML = ''
        jokes.forEach(joke => {
            jokesContainer.innerHTML += getJokeHTML(joke)
        });
    }
        
};

function getJokeHTML(joke){
    return `
        <div class="joke">
        <div class="joke__content">
            ${joke.content}
        </div>
        <div class="joke__footer">
            <div class="joke__likes">
                <span>${joke.likes}</span>
                <button class="joke__btn" onclick="like(${joke.id})">
                    <span class="material-symbols-outlined">
                        thumb_up
                    </span>                
                </button>
            </div>
            <div class="joke__likes">
                <span>${joke.dislikes}</span>
                <button class="joke__btn" onclick="dislike(${joke.id})">
                <span class="material-symbols-outlined">
                    thumb_down
                </span>
                </button>
            </div>    
        </div>
        </div>
    `
}

jokeForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const content = jokeForm.joke.value
    const joke = {content, likes: 0, dislikes: 0, id: currentLength}
    const addJokeXhr = new XMLHttpRequest
    addJokeXhr.open('POST', 'http://localhost:3000/jokes')
    addJokeXhr.send(JSON.stringify(joke))
    addJokeXhr.onload = () => {
        jokesContainer.innerHTML += getJokeHTML(joke)
        currentLength++
    }
})

function like(id){
    const xhrLike = new XMLHttpRequest
    xhrLike.open('GET', 'http://localhost:3000/likes?id='+id)
    xhrLike.send()
    xhrLike.responseType = 'json'
    xhrLike.onload = () => {
        const joke = xhrLike.response
        document.getElementById('joke_'+id).outerHTML = getJokeHTML(joke)
    }
}
function dislike(id){
    const xhrDislike = new XMLHttpRequest
    xhrDislike.open('GET', 'http://localhost:3000/dislikes?id='+id)
    xhrDislike.send()
    xhrDislike.responseType = 'json'
    xhrDislike.onload = () => {
        const joke = xhrDislike.response
        document.getElementById('joke_'+id).outerHTML = getJokeHTML(joke)
    }
}