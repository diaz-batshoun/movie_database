//this is the api url
const API_URL = "https://functional-innate-weight.glitch.me/movies"


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
            let html = `<div class="row">
        <div class="card" style="width: 18rem;">
            <h3 class="movieTitle text-center">${index.title.toUpperCase()}</h3>
            <img id="moviePoster" src="${index.poster}" class="card-img-top" alt="tropic">
            <div class="card-body">
                <p class="movieDescription">${index.plot}</p>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#movieModal"
                        style="float: left">
                    Edit
                </button>
                <button class="btn btn-outline-primary my-2 my-sm-0" style="float: right" type="submit">delete</button>
            </div>
        </div>
                <!-- Modal -->
                <div class="modal fade" id="movieModal" tabindex="-1" aria-labelledby="movieModalLabel"
                     aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="movieModalLabel">Edit</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <label for="addTitle">Movie Title</label>
                                    <input type="text" class="form-control" id="addTitle" placeholder="Title of Movie">
                                    <label for="addPoster">Poster Url</label>
                                    <input type="text" class="form-control" id="addPoster" placeholder="https://">
                                    <label for="addGenre">Genre</label>
                                    <input type="text" class="form-control" id="addGenre" placeholder="Genre of Movie">
                                    <label for="addDirector">Director</label>
                                    <input type="text" class="form-control" id="addDirector" placeholder="Director of Movie">
                                    <label for="addYear">Year</label>
                                    <input type="text" class="form-control" id="addYear" placeholder="Year of Movie">
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>


    </div>
`

            $('#movieCards').append(html);
        }
    }).catch(err => console.error(err));
}
//function called
getMovies();

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
let editedMovie = {
    actors: '',
    director: '',
    genre: '',
    id: 0,
    plot: '',
    poster:'',
    rating: '',
    title: '',
    year: ''

}
//object editedMovie will be put into function
// editMovie = (editedMovie);


// creates new movie object, will be a click event to input value
let createdMovie = {
    id: 0,
    poster:'',
    rating: '',
    title: '',

}
//object createdMovie will put into function to create new movie
createMovie(createdMovie);

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
deleteMovie(3);

