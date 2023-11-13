
const jokesContainer = document.getElementById('jokes_container');

const jokeForm = document.getElementById('joke_form');

let currentLength = 0;

const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/jokes');
xhr.send();
xhr.responseType = 'json';
xhr.onload = () => {
    const jokes = xhr.response;
    if(jokes.light){
        jokesContainer.innerHTML = ''
        jokes.forEach(joke => {
            jokesConteiner.innerHTML += getJokeHTML(joke)
        });
    }    
};

function getJokeHTML(joke){
    return `
        <div class="joke">
        <div class="joke__content">
            $(joke.content)
        </div>
        <div class="joke__footer">
            <div class="joke__likes">
                <span>$(joke.likes)</span>
            </div>
            </div>
        <button class="joke__btn">
            <span class="material-symbols-outlined">
                thumb_up
            </span>
        </button>
    </div>
    `
}