//const APIURL = 'https://api.themoviedb.org/3/movie/popular?api_key=37c10f2658655b7b6ec366bb9cd6a3c0&language=en-US&page=1';
const APIURL = 'https://api.themoviedb.org/3/discover/movie?api_key=37c10f2658655b7b6ec366bb9cd6a3c0&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
const IMGPATH = 'https://image.tmdb.org/t/p/w1280/'
const SEARCHAPI ='https://api.themoviedb.org/3/search/movie?api_key=37c10f2658655b7b6ec366bb9cd6a3c0&query='

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');



//get fav movies
getMovies(APIURL);
async function getMovies(url) {
    lastUrl = url;
    const resp = await fetch(url);
    const respData =await resp.json();

    console.log(respData);

    displayMovies(respData.results);

}

function displayMovies(movies){
    main.innerHTML = '';
    movies.forEach(movie => {
        const {poster_path, title, vote_average,} = movie;
        const movieEl = document.createElement('div')
        movieEl.innerHTML = `
            <div class="card mb-3 my-4" style="width: 18rem;">
                <img src="${IMGPATH + poster_path}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text ${getClassByRate(vote_average)}">Vote: ${vote_average}</p>
                    <a href="#" class="btn btn-success"><i class="fa fa-thumbs-up" aria-hidden="true"></i></a>
                </div>
            </div>
            
        `;       

        main.appendChild(movieEl);
    });

}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green';
    }
    else if(vote >= 5){
        return 'orange';
    }
    else{
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = '';
    }
});





