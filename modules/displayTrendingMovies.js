/* Final project - Javascript 1, FE 23. Andréa Jandergren.
 
- The first function (displayTrendingMovies) takes the first 8 items (movies) of the array from the API-respons.
The function then loops through the first four movies and creates elements with getTrendingImgElement
and getTrendingTextElement. Then the remaining four films are looped through and create the respective elements.
Element:
*Picture
*Title
*Date of publication

- The second function (getTrendingImgElement) creates and returns image elements.
- Third function (getTrendingTextElement) creates and returns movie title and release year.

 */
export function displayTrendingMovies(movie) {
  const topRatedMoviesArray = _.toArray(movie.results).slice(0, 8);

  const divCarouselRow = document.querySelector('.row');
  const divCarouselContainer = document.querySelector('.carousel-inner');
  const divCarouselItemActive = document.querySelector('.carousel-item');
  const divCarouselItem = document.createElement('div');
  const divItemRow = document.createElement('div');
  const textContainerEl = document.createElement('div');
  const textContainerElement = document.createElement('div');

  divCarouselItem.classList.add('carousel-item');
  divItemRow.classList.add('row');
  textContainerEl.classList.add('row');
  textContainerElement.classList.add('row');

  divCarouselItem.appendChild(divItemRow);
  divCarouselItemActive.appendChild(textContainerEl);
  divCarouselContainer.appendChild(divCarouselItem);

  for (const movie of topRatedMoviesArray) {
    if (topRatedMoviesArray.indexOf(movie) < 4) {
      const divInner = getTrendingImgElement(movie);
      divCarouselRow.appendChild(divInner);

      const textContainerElement = getTrendingTextElement(movie);
      divInner.appendChild(textContainerElement);

    } else if (topRatedMoviesArray.indexOf(movie) > 3) {
      const divInner = getTrendingImgElement(movie);
      divItemRow.appendChild(divInner);

      const textContainerElement = getTrendingTextElement(movie);
      divInner.appendChild(textContainerElement);
    }
  }
}

function getTrendingImgElement(movie) {
  const divInner = document.createElement('div');
  const imgEl = document.createElement('img');

  divInner.classList.add('col', 'position-relative');
  imgEl.classList.add('d-block', 'w-100');

  const movieImg = movie.poster_path;
  imgEl.src = `https://image.tmdb.org/t/p/w500/${movieImg}`;

  divInner.appendChild(imgEl);
  return divInner;
}

function getTrendingTextElement(movie) {
  const textContainerElement = document.createElement('div');
  const titleElement = document.createElement('h5');
  const releaseDateEl = document.createElement('h6');
  textContainerElement.classList.add('col');

  titleElement.innerText = movie.original_title;
  releaseDateEl.innerText = `Release date: ${movie.release_date}`;

  textContainerElement.append(titleElement, releaseDateEl);

  return textContainerElement;
}
