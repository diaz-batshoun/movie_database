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
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                        style="float: left">
                    Launch demo modal
                </button>
                <button class="btn btn-outline-primary my-2 my-sm-0" style="float: right" type="submit">delete</button>
            </div>
        </div>
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <label for="addMovie">Movie Title</label>
                                    <input type="movie" class="form-control" id="addMovie" placeholder="Title of Movie">
                                    <label for="addMovie">Star Rating: </label>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox1"
                                               value="option1">
                                        <label class="form-check-label" for="inlineCheckbox1">1</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox2"
                                               value="option2">
                                        <label class="form-check-label" for="inlineCheckbox2">2</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3"
                                               value="option3">
                                        <label class="form-check-label" for="inlineCheckbox3">3</label>
                                    </div>
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

