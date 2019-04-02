'use strict';

// lookup the api
// setup the event handler
let store = [];

class Repo {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}

function getRepo(username) {
  const apiUrl = `https://api.github.com/users/${username}/repos`;
  const options = {
    headers: new Headers({
      'Accept': 'application/vnd.github.v3+json'})
  };

  fetch(apiUrl, options)
    .then(response => response.json())
    .then(jsonData => {
      const repos = jsonData.map(repo => new Repo(repo.name, repo.html_url));
      store = [].concat(repos);
      render();
    });
}

function buildRepoHtml(repo) {
  return `
    <li><a href='${repo.url}' target='_blank'>${repo.name}</a></li>
  `;
}

function render() {
  const repoTemplate = store.map(buildRepoHtml);
  $('.js-search-results').html(repoTemplate);
}

function watchForm(){
  $('form#github-search').on('submit', function(event) {
    event.preventDefault();
    const username = $('#username').val();
    event.target.reset();
    getRepo(username);
  });
}

function main() {
  watchForm();
}

$(main);