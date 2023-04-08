let $moviesDisplay = document.querySelector("#moviesDisplay");
let $btnPrevious = document.querySelector("#btnPrevious");
let $btnNext = document.querySelector("#btnNext");
let $btnFirstPage = document.querySelector("#btnFirstPage");
let $btnLastPage = document.querySelector("#btnLastPage");
let $currentPage = document.querySelector("#currentPage");

let currentPage = 1;

const getMovies = async () => {
  try {
    let resMovies = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=1b56e23f6b4c00afff1adb45fae112b8&language=es-MX&page=${currentPage}`);
    console.log(resMovies.data);
    let movies = resMovies.data.results;

    let $fragment = document.createDocumentFragment();

    // Primero borra los datos que estén dentro de $moviesDisplay
    // Así cuando se cambia de página se borra lo que ya estaba cargado

    $moviesDisplay.innerHTML = "";

    // Agregar indicador de página actual al HTML
    $currentPage.innerHTML = `Página #${currentPage}`;

    movies.forEach((movie) => {
      let $movie = document.createElement("div");
      $movie.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "my-3");
      $movie.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}"/>
      <p>${movie.title}</p>
      `;
      $fragment.appendChild($movie);
    });

    $moviesDisplay.appendChild($fragment);
  } catch (err) {
    console.log(err);
  }
};

document.addEventListener("click", (e) => {
  if (e.target.matches("#btnPrevious")) {
    if (currentPage > 1) {
      currentPage--;
      getMovies();
    }
  }

  if (e.target.matches("#btnNext")) {
    if (currentPage < 500) {
      currentPage++;
      getMovies();
    }
  }

  if (e.target.matches("#btnFirstPage")) {
    currentPage = 1;
    getMovies();
  }

  if (e.target.matches("#btnLastPage")) {
    currentPage = 500;
    getMovies();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  getMovies();
});
