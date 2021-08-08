"use strict"

// fetch('https://pricey-diagnostic-cent.glitch.me/movies').then(response => {
//     response.json().then( movies => {
//         console.log(movies)
//     });
// });

const url = "https://pricey-diagnostic-cent.glitch.me/movies"

function AJAX(url, method = "GET", data){

    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    return fetch(url, options)
        .then(res => res.json())
        .catch(err => err)
}


function addMovieFromAPI(){
    fetch("http://www.omdbapi.com/?apikey="+ MovieAPI +"&t="+ $("#movie").val())
        .then(res => res.json()
            .then(res => {
                console.log(res)


                const newMovie = {
                plot:res.Plot,
                poster:res.Poster,
                title:res.Title,
                actor:res.Actors,
                director:res.Director,
                genre:res.Genre,
                year:res.Year,
                rating:res.Ratings[1].Value
            }
            // console.log(res.Ratings)
            addMovieTwo(newMovie)

            }))

}





function getAllMovies(){
    AJAX(url).then(responseData => {console.log(responseData)
        var html = "";
        $('.card-deck').empty();
        responseData.forEach(function (movie){
            html =`<div>
                <div class="card">
                    <div class="card-header">
                        Title: ${movie.title}
                        
                    </div>
                   
                    <div class="card-body">

                        <img src= '${movie.poster}'height="400"></li>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Description: ${movie.plot}</li>
                        <li class="list-group-item">Actors: ${movie.actor}</li>
                        <li class="list-group-item">Genre: ${movie.genre}</li>
                        <li class="list-group-item">Director: ${movie.director}</li>
                        <li class="list-group-item">Year: ${movie.year}</li>
                        <li class="list-group-item">Rating: ${movie.rating}</li>
                        <button data-id="${movie.id}" id="button1" class="editButton">edit</button>
                        <button data-id="${movie.id}" id="button2" class="delete_button">delete</button>
                         
                    </ul>
                </div>
            </div>`
            $('.card-deck').append(html)
        })
        addEventListeners()
    });
}
getAllMovies()





function addEventListeners(){

    $('.editButton').click(function(e) {
        e.preventDefault()
        $('#editModal').modal('show')

        const movieIdToEdit = $(this).attr("data-id");

        $('#saveChanges').unbind()
        $('#saveChanges').click(function(){
            editMovie(movieIdToEdit)
            getAllMovies()
            $('#editModal').modal('hide')
        })

    });

    $('.addButton').click(function(e) {
        e.preventDefault()
        $('#addModal').modal('show')


    });
    $('#addMovie').unbind()
    $('#addMovie').click(function(){
        addMovie()
        getAllMovies()
        $('#addModal').modal('hide')
    })


    $('.delete_button').click(function() {
        const movieIdToDelete = $(this).attr("data-id");
        deleteMovie(movieIdToDelete)
    });

    $('#buttonMovie').click(function(e){
        e.preventDefault()
        addMovieFromAPI()
        getAllMovies()
    })

}




// console.log(getAllMovies());

// function getOneMovie(movieID){
//     AJAX(`${url}/${movieID}`).then(responseData => console.log(responseData));
// }
// getOneMovie(2);



function deleteMovie(movieID){
    AJAX(`${url}/${movieID}`,"delete").then(getAllMovies);
}

function addMovieTwo(MovieFromAPI){
    AJAX(`${url}`, "POST", MovieFromAPI)
        .then(responseData => console.log(responseData))
}



// function addMovie() {
//     AJAX(`${url}`, "POST", {
//         plot:$('#addPlot').val(),
//         poster:$('#addPoster').val(),
//         title:$('#addTitle').val(),
//         actor:$('#addActor').val(),
//         director:$('#addDirector').val(),
//         genre:$('#addGenre').val(),
//         year:$('#addYear').val(),
//         rating:$('#addRating').val(),
//
//     })
//         .then(responseData => console.log(responseData))
// }


function editMovie(movieID) {
    AJAX(`${url}/${movieID}`, "PATCH", {
        plot:$('#plot').val(),
        title:$('#title').val(),
        poster:$('#imagePoster').val(),
        actor:$('#actor').val(),
        director:$('#director').val(),
        genre:$('#genre').val(),
        year:$('#year').val(),
        rating:$('#rating').val(),


    })
        .then(responseData => console.log(responseData))
}
editMovie()