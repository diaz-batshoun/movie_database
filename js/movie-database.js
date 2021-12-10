const API_URL = "https://functional-innate-weight.glitch.me/movies"

fetch(API_URL).then(resp => resp.json()).then(data => {
        console.log(data)
    }).catch(err => console.error(err));
