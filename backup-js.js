'use strict';

const API_URL = "https://functional-innate-weight.glitch.me/movies"

//allows to console to verify information
fetch(API_URL).then(resp => resp.json()).then(data => {
    console.log(data)
}).catch(err => console.error(err));

