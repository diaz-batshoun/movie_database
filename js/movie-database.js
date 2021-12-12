//this is the api url
const API_URL = "https://functional-innate-weight.glitch.me/movies"

//  $('#addBtn')  for submit button on adding movies modal.
//  $('#movieInput') user input of movie title
//  $('#editBtn') to submit when movie is edited
//  $('#addPoster') for user input of image url
//  $('#addYear')   for user input of year of movie
//  $('#addGenre')  for user input of genre of movie
//  $('#addDirector')   for user input of director
//  $('#addTitle')  for user input of title of movie


//this is for reference we can delete
fetch(API_URL).then(resp => resp.json()).then(data => {
    console.log(data)
}).catch(err => console.error(err));

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

<!--                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#movieModal"-->
<!--                        style="float: left">-->
<!--                    Edit-->
<!--                </button>-->
<!--                <button class="btn btn-outline-primary my-2 my-sm-0" id="delete" style="float: right" type="submit">delete</button>-->
            </div>
        </div>
                <!-- Modal -->

<!--                <div class="modal fade" id="movieModal" tabindex="-1" aria-labelledby="movieModalLabel"-->
<!--      aria-hidden="true">-->
<!--                    <div class="modal-dialog">-->
<!--                        <div class="modal-content">-->
<!--                            <div class="modal-header">-->

<!--                                <h5 class="modal-title" id="movieModalLabel">Edit</h5>-->
<!--                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
<!--                                    <span aria-hidden="true">&times;</span>-->
<!--                                </button>-->
<!--                            </div>-->
<!--                            <div class="modal-body">-->
<!--                                <form>-->

<!--                                    <label for="addTitle">Movie Title</label>-->
<!--                                    <input type="text" class="form-control" id="addTitle" placeholder="Title of Movie">-->
<!--                                    <label for="addPoster">Poster Url</label>-->
<!--                                    <input type="text" class="form-control" id="addPoster" placeholder="https://">-->
<!--                                    <label for="addGenre">Genre</label>-->
<!--                                    <input type="text" class="form-control" id="addGenre" placeholder="Genre of Movie">-->
<!--                                    <label for="addDirector">Director</label>-->
<!--                                    <input type="text" class="form-control" id="addDirector" placeholder="Director of Movie">-->
<!--                                    <label for="addYear">Year</label>-->
<!--                                    <input type="text" class="form-control" id="addYear" placeholder="Year of Movie">-->
<!--                                </form>-->
<!--                            </div>-->
<!--                            <div class="modal-footer">-->
<!--                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>-->
<!--                                <button type="button" class="btn btn-primary" id="editBtn">Save changes</button>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
</div>`
            $('#movieCards').append(html);
        }
    }).catch(err => console.error(err));
}
// timeout function removes removes loading class and gets movies
setTimeout(function () {
$('.loading').css('display', 'none');
    getMovies();
}, 3000);


//function to edit movies

let editMovie = (movie) => {
    let options = {
        method: 'PATCH', //using patch to be able to edit few items without changing everything
        headers: {

            'Content-Type': 'application/json',
        },

        body: JSON.stringify(movie)
    }

    return fetch(`${API_URL}/${movie.id}`, options).then(resp => resp.json()).catch(err => console.error(err));
}

//will make into click event to input value in object
$('#editBtn').click(event => {
    event.preventDefault();
    console.log($('#addTitle').value);
// let editedMovie = {
//     actors: $('#addTitle').val() ,
//     director: '',
//     genre: '',
//     id: 0,
//     plot: '',
//     poster:'',
//     rating: '',
//     title: '',
//     year: ''
//
// };

})
//object editedMovie will be put into function
// editMovie = (editedMovie);






//function to create movie
let createMovie = (movie) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    }
    return fetch(API_URL, options).then(resp => resp.json()).catch(err => console.error(err));
}

// creates new movie object, click event to input value
$('#addBtn').click(function (event) {
event.preventDefault()

    let createdMovie = {
        id: 0,
        poster: '',
        rating: $('.rating[type=radio]:checked').val(),
        title: $('#movieInput').val()

    }

    createMovie(createdMovie);
    location.reload()
});


//function to delete movie
let deleteMovie = (id) => {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${API_URL}/${id}`, options).then(resp => resp.json()).catch(err => console.error(err))
}

//delete function called, will be in click event
// deleteMovie(7)



