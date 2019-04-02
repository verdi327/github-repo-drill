'use strict';

// lookup the api
// setup the event handler

function watchForm(){
  $('form#github-search').on('submit', function(event) {
    event.preventDefault();
    const username = $('#username').val();
    event.target.reset();
    console.log(username);
  });
}

function main() {
  watchForm();
}

$(main);