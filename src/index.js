import $, { event } from 'jquery';
import { display } from './displayCard';
import { loadingImage } from './lazy';
import './style/style.css';
let counter = 1;
let searchValue = '';


$('.more-page').on('click', () => {
    console.log('ahi estamos');
    counter++;
    console.log(counter); 
    mainContent(counter, `${URL}/?page=${counter}&name=${encodeURIComponent(searchValue)}`);
    return counter;
});
const URL = `https://rickandmortyapi.com/api/character`;


function mainContent(counter, url){

    console.log("yes");
    console.log(counter);
    const urlText = `${URL}/?page=${counter}&name=${searchValue}`;
    
    $.getScript("displayCard.js", display);
    $.ajax({
        url: url ? url : urlText,
        success: ( data )=>{
            location.hash = 'characters';
            console.log(data.results[18].image);
            data.results.forEach((character) => {
                $(".container-characters").append(`
                <article class="card-character" data-id="${character.id}">
                <figure class="container-img">
                <img data-url="${character.image}" alt="">
                <figcaption>Name: <span>${character.name}</span></figcaption>
                </figure>
                <div class="character-info">
                <p class="status">Status: <span>${character.status}</span></p>
                <p class="specie">Species: <span>${character.species}</span></p>
                <p class="gender">Gender: <span>${character.gender}</span></p>
                </div>
                </article>
                `);
                
                const container = document.querySelector(`.card-character[data-id='${character.id}']`);
                container.style.cursor = 'pointer';
                loadingImage(container);
            });
            $('.card-character').on('click', function() {
                const id = $(this).data("id");
                console.log(id);
                display(id);
            });
        }
    })
    //loadingImage(container);
    // otra forma con delegacion de eventos.
    /*$('.container-characters').on('click', ".card-character", (event)=>{
        console.log('funciono');
        const id = $(event.currentTarget).data("id");
        console.log(id);
    });
    */

    console.log('Todo cargo correctamente');
    console.log($('.container-characters').get(0))
}
console.log($('#search'));

$('#btn-search').on('click keypress', (e) => {
    if (e.type === 'click' || e.keyCode === 13) {
        e.preventDefault();
        counter = 1;
        console.log('enviamos form');
        $('.container-characters').html('');
        searchValue = $('#search').val();
        console.log(searchValue);
        console.log(`${URL}/?page=${counter}&name=${encodeURIComponent(searchValue)}`);
        mainContent(counter, `${URL}/?page=${counter}&name=${encodeURIComponent(searchValue)}`)
    }
});

$('#search').on('keydown', (e)=> {
    if (e.keyCode === 13) {
        e.preventDefault();
        $('#btn-search').click();
    }
});


$(document).ready(mainContent(counter, `${URL}/?page=${counter}&name=${searchValue}`));