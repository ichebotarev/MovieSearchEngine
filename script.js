//Initial Values

const API_KEY = '1e713ae620e2668a4da754d59d9885a6'
const url = 'https://api.themoviedb.org/3/search/movie?api_key=1e713ae620e2668a4da754d59d9885a6'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/'

//Selecting the Items from the DOM
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');
const imgElement = document.querySelector('img');


/*        <div id=movies-searchable>
            <div class='movie'>
                <section class="section">
                    <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/u1Q3XY8KA5N1pPLD9BceUsLxCLU.jpg" alt="" data-movie-id="24657">

                    <img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/pHVfGXtLLGksO3DD8dzLvUFXLRZ.jpg" alt="" data-movie-id="606245">

                </section>
                <div class="content"><p id="content-close">X</p> </div>
            </div>
        </div>
*/


function movieSection(movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {
            return `<img src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id}/>`;
        }
    });

}

function createMovieContainer(movies) {

    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = `  <section class="section">
    ${movieSection(movies)}
    </section>


    <div class="content content-display"> <p id="content-close"></p> </div>`;

    movieElement.innerHTML = movieTemplate;
    return movieElement;


}

function renderSearchMovies(data) {
    movieSearchable.innerHTML = "";

    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
    console.log('Data: ', data)
}

buttonElement.onclick = function(event) {
    event.preventDefault();
    const value = inputElement.value;
    const newUrl = url + '&query=' + value;

    fetch(newUrl)
        .then((res) => res.json())
        .then(renderSearchMovies)

    //data results[] 

    .catch((error) => { console.log('Error: ', error) });
    inputElement.value = '';
    console.log('Value:', value);

}

//EVENT DELEGATION
document.onclick = function() {

    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
        console.log('Hello there you clikced');
        const movieId = target.dataset.movieId;
        console.log('Movie ID: ', movieId);
        const section = event.target.parentElement; //section
        const content = section.nextElementSibling; //content
        //content.classList.add('content-display');

    }



    if (target.id === 'content-close') {
        const content = target.parentElement;
        // content.classList.remove('content-display');
    }

}