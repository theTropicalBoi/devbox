const movieFormEl = document.getElementById("movieForm");
const movieListEl = document.getElementById("movieList");
const filterTypeEl = document.getElementById("filterType");
const filterGenreEl = document.getElementById("filterGenre");
const filterPlatformEl = document.getElementById("filterPlatform");


/* This function work perfectly. */
async function addMovie (movie) {
  const url = 'http://localhost:3000/movies';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(movie)
  });
  if (response.ok === true) {
    console.log("Server response to POST METHOD is OK.")
  }
}

/* TODO - Just need to add the display Movies Function. */
movieFormEl.addEventListener("submit", function(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const year = document.getElementById("year").value;
  const type = document.getElementById("type").value;
  const genre = document.getElementById("genre").value;
  const platform = document.getElementById("platform").value;
  const watched = document.getElementById("watched").checked ? true:false;

  const newMovie = { 'title':title, 'year':year, 'type':type, 'genre':genre, 'platform':platform, 'watched':watched };

  addMovie(newMovie);
  console.log("New Movie added: ", newMovie.title)
  movieForm.reset();
  displayMovies();
});


async function fetchMovie () {
  const url = 'http://localhost:3000/movies';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error(error, "Impossible to fetch movies.");
  }
}


function displayMovies() {
  fetchMovie()
    .then((data) => {
      console.log(data.length, " movies have been fetched correctly");
      movieListEl.innerHTML = data.map(movie => `
        <div class="movie">
          <h2>${movie.title} (${movie.year})</h2>
          <p>${movie.type}</p>
          <p>Genre: ${movie.genre}</p>
          <p>Platform: ${movie.platform}</p>
          <p>Watched: ${movie.watched ? 'Yes' : 'No'}</p>
        </div>
      `).join('');
    })
    .catch((error) => {
      console.error("Movie haven't been fetch: ", error);
    });
}

displayMovies();
