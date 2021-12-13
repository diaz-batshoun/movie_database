//this is the api url
const API_URL = "https://spiced-bird-magnolia.glitch.me/movies"

//  $('#addBtn')  for submit button on adding movies modal.
//  $('#movieInput') user input of movie title
//  $('#editBtn') to submit when movie is edited
//  $('#addPoster') for user input of image url
//  $('#addYear')   for user input of year of movie
//  $('#addGenre')  for user input of genre of movie
//  $('#addDirector')   for user input of director
//  $('#addTitle')  for user input of title of movie
let deleteMovie = (id) => {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${API_URL}/${id}`, options).then(resp => resp.json()).catch(err => console.error(err))
}

// let editMovie = (movie) => {
//     let options = {
//         method: 'PATCH', //using patch to be able to edit few items without changing everything
//         headers: {
//
//             'Content-Type': 'application/json',
//         },
//
//         body: JSON.stringify(movie)
//     }
//
//
//     return fetch(`${API_URL}/${movie.id}`, options).then(resp => resp.json()).catch(err => console.error(err));
// }

//this is for reference we can delete
// fetch(API_URL).then(resp => resp.json()).then(data => {
//     console.log(data)
// }).catch(err => console.error(err));

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
                 <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#movieModal"
                style="float: left" id="modalBtn">
            Edit Movie
        </button>
               
                <button class="btn btn-outline-primary my-2 my-sm-0" id="delete" style="float: right" type="submit">delete</button>
            </div>
        </div>
            
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
                            <input type="text" class="form-control" id="addTitle${index.id}" placeholder="Title of Movie">
                            <label for="addPoster">Poster Url</label>
                            <input type="text" class="form-control" id="addPoster${index.id}" placeholder="https://">
                            <label for="addPlot">Plot</label>
                            <input type="text" class="form-control" id="addPlot${index.id}" placeholder="Plot of Movie">
<!--                            <label for="addID">ID</label>-->
<!--                            <input type="text" class="form-control" id="addID" placerholder="ID">-->
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="editBtn" data-id="${index.id}" data-dismiss="modal">Save changes</button>
                    </div>
                </div>
            </div>
        </div>   
</div>`
            $("#modalBtn").click(function(){
                $("#movieModal").modal();
            });


            $('#movieCards').append(html);
            $(`#delete${index.id}`).click(function(e) {
                e.preventDefault()
                deleteMovie(`${index.id}`)
            })

            $(`#editBtn${index.id}`).click(function(e) {
                e.preventDefault()
                $(`#editBtn${ele.id}`).attr('disabled');
                //console.log($(`#addTitle${this.id}`).val())
                let userTitle = $(`#addTitle${index.id}`).val()
                let userPlot = $(`#addPlot${index.id}`).val()
                let userPoster = $(`#addPoster${index.id}`).val()
                var editID = $(this).data('id')
                console.log(editID)
                let editedMovie = {
                    //id: $('#addID${index.id}').val(),
                    plot: userPlot,
                    poster: userPoster,
                    //rating: '',
                    title: userTitle,
                };
                // if ($(`#addPlot`).val() === '') {
                //     return false;
                // }else {
                //     editedMovie = {plot: $(`#addPlot`).val()};
                // }


                let options = {
                    method: 'PATCH', //using patch to be able to edit few items without changing everything
                    headers: {

                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify(editedMovie)
                }


                return fetch(`${API_URL}/${index.id}`, options).then(resp => resp.json()).catch(err => console.error(err));

            })

        }
    }).catch(err => console.error(err));

}
// timeout function removes removes loading class and gets movies
setTimeout(function () {

    getMovies();
}, 3000);

$(document).ajaxStart(function(){
    // Show image container
    $(".loading").show();
});
$(document).ajaxComplete(function(){
    // Hide image container
    $(".loading").hide();
});


//function to edit movies




//will make into click event to input value in object
// $(`#editBtn`).click(event => {
//     event.preventDefault();
//     console.log($('#addTitle').value);
// let editedMovie = {
//     director: '',
//     genre: '',
//     id: 0,
//     plot: '',
//     poster:'',
//     rating: '',
//     title: $(`#addTitle${index.id}`).val(),
//     year: ''
//
// };
//
// })
//object editedMovie will be put into function
// editMovie = (editedMovie);






//function to create movie
// let createMovie = (movie) => {
//     let options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(movie)
//     }
//     return fetch(API_URL, options).then(resp => resp.json()).catch(err => console.error(err));
// }
//
// // creates new movie object, click event to input value
// $('#addBtn').click(function (event) {
// event.preventDefault()
//
//     let createdMovie = {
//         rating: $('.rating[type=radio]:checked').val(),
//         title: $('#movieInput').val(),
//
//     }
//
//     createMovie(createdMovie);
//
// });
// $(`#editBtn`).click(function(e) {
//     e.preventDefault()
//
//     let editedMovie = {
//          id: $('#addID').val(),
//         // plot: $(`#addPlot`).val(),
//         // poster: $(`#addPoster`).val(),
//         // //rating: '',
//         // title: $(`#addTitle`).val(),
//     };
//     if ($(`#addPlot`).val() === '') {
//         return false;
//     }else {
//         editedMovie = {plot: $(`#addPlot`).val()};
//     }
//
//     let options = {
//         method: 'PATCH', //using patch to be able to edit few items without changing everything
//         headers: {
//
//             'Content-Type': 'application/json',
//         },
//
//         body: JSON.stringify(editedMovie)
//     }
//
//
//     return fetch(`${API_URL}/${editedMovie.id}`, options).then(resp => resp.json()).catch(err => console.error(err));
//
// })







