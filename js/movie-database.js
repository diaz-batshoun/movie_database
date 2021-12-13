//this is the api url
const API_URL = "https://spiced-bird-magnolia.glitch.me/movies"


//function to call all movie data
let getMovies = () => {
    fetch(API_URL).then(resp => resp.json()).then(data => {
        //makes new array
        let movieArray = data.map(movies => movies)
        $('#movieCards').html('');
        //for of loop to go through array
        for (let index of movieArray) {
            //cards
            let html = `<div class="row" >
        <div class="card" style=" width: 15rem; margin: 1em; ">
            <h3 class="movieTitle text-center">${index.title.toUpperCase()}</h3>
            <img id="moviePoster" src="${index.poster}" class="card-img-top" alt="tropic">
            <div class="card-body body">
                <p class="movieDescription">${index.plot}</p>
                 <button type="button" class="btn btn-primary edit-modal-btn" data-toggle="modal" data-id="${index.id}" data-target="#movieModal"
                style="float: left" id="modalBtn">
            Edit Movie
        </button>
               
                <button class="btn btn-outline-primary my-2 my-sm-0 delete-btn" id="delete" style="float: right" data-id="${index.id}" type="submit">delete</button>
            </div>
        </div>
            

</div>`


            $('#movieCards').append(html);

            //delete event referenced https://github.com/tisdale-vidaurri-movie-app/movie-app/blob/main/js/movie-app.js
            $(`.delete-btn`).click(function (e) {
                var deleteID = $(this).data('id');
                console.log(deleteID);
                e.preventDefault()
                let options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                return fetch(`${API_URL}/${deleteID}`, options).then(resp => resp.json()).then(getMovies).catch(err => console.error(err))
            })


            //edit click event.  When edit button is clicked data is fetched and the data properties are displayed in ID forms.
            $('.edit-modal-btn').click(function () {
                var editID = $(this).data('id');
                return fetch(`${API_URL}/${editID}`).then(resp => resp.json()).then(data => {
                    $('#addTitle').val(data.title)
                    $('#addPlot').val(data.plot)
                    $('#addPoster').val(data.poster)
                    $('#addID').val(data.id)
                }).catch(err => console.error(err));
            })
            //click event when user clicks on save changes.
            $(`#editBtn`).click(function (e) {
                e.preventDefault()

                let editID = $('#addID').val();
                console.log(editID)
                let editedMovie = {
                    plot: $(`#addPlot`).val(),
                    poster: $(`#addPoster`).val(),
                    title: $(`#addTitle`).val(),
                };

                let options = {
                    method: 'PATCH', //using patch to be able to edit few items without changing everything
                    headers: {

                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(editedMovie)
                }


                return fetch(`${API_URL}/${editID}`, options).then(resp => resp.json()).then(getMovies).catch(err => console.error(err));

            })

        }
    }).catch(err => console.error(err));

}
// timeout function removes removes loading class and gets movies
setTimeout(function () {
//
    getMovies();
}, 2000);

$(document).ajaxStart(function () {
    // Show image container
    $(".loading").show();
});
$(document).ajaxComplete(function () {
    // Hide image container
    $(".loading").hide();
});

// function to create movie
let createMovie = (movie) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    }
    return fetch(API_URL, options).then(resp => resp.json()).then(getMovies).catch(err => console.error(err));
}

// creates new movie object, click event to input value
$('#addBtn').click(function (event) {
    event.preventDefault()

    let createdMovie = {
        rating: $('.rating[type=radio]:checked').val(),
        title: $('#movieInput').val(),
        poster: 'img/movies.jpeg',
        plot: ""

    }

    createMovie(createdMovie);

});

