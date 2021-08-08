console.log("hello")



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


function testMovieAPI(movieTitle){
    fetch("http://www.omdbapi.com/?apikey="+ MovieAPI +"&t="+ movieTitle).then(res => res.json().then(res => console.log(res)))
}

$("#buttonMovie").click(function (e){
    e.preventDefault()
    testMovieAPI($("#movie").val());
})

