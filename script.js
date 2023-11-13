
const jokesContainer = document.getElementById('jokes_container');

const jokeForm = document.getElementById('joke_form');

let currentLength = 0;

const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/jokes');
xhr.send();
xhr.responseType = 'json';
xhr.onload = () => {
    const jokes = xhr.response;
    
};
