/* Final project - Javascript 1, FE 23. Andréa Jandergren.

- The first function (getMovieElement) creates, adds to the DOM and returns the following elements for a movie:
*Title
*Date of publication
*Description
*Picture
If no image is available in the API, the specific image (noImage) is displayed, otherwise the current image is displayed.
If the description of each individual movie exceeds 40 words, the excess words will be excluded.
As there is no description, this is shown to the user.

- The second function (displayRankedMovies) takes the first ten movies out of the array. Then loops through each
movie and creates elements using the "getMovieElement" function.

- The third function (display) shows all movies that match the user's input. The function loops through
 each movie and creates elements using the "getMovieElement" function
 
 */
function getMovieElement(movie, includeOverview = true) {
  const titleEl = document.createElement('h1');
  const releaseDateEl = document.createElement('h2');
  const divEl = document.createElement('div');
  const divElImg = document.createElement('div');
  const infoDots = document.createElement('small');
  const imgEl = document.createElement('img');
  const divContainer = document.querySelector('.container-div');
    
  divElImg.classList.add("divElImg");
  titleEl.id = 'nameHeadingEl';
  imgEl.classList.add("imgEl");
  releaseDateEl.id = 'releaseDateHeadingEl';
  
  const movieTitle = movie.original_title;
  const movieImg = movie.poster_path;
  const imgUrl = movieImg ? `https://image.tmdb.org/t/p/w500/${movieImg}` : 'img/noImage.png';
  
  const releaseDate = movie.release_date;
  infoDots.innerHTML = '&#x26AC; &#x26AC; &#x26AC; '
  titleEl.innerHTML = movieTitle;
  imgEl.src = imgUrl;
  releaseDateEl.innerText = releaseDate ? `Release date: ${releaseDate}` : 'Release date: not available';
   
  divEl.append(infoDots, titleEl, releaseDateEl);
  divElImg.append(imgEl)
  divEl.classList.add("divCard");
  divElImg.appendChild(divEl);
  divContainer.append(divElImg);
 
  if (includeOverview) {
    const overviewEl = document.createElement('p');
    const words = movie.overview ? movie.overview.split(' ') : [];
  
    const maxWords = 40;
    overviewEl.innerText = words.length > 0 ? words.slice(0, maxWords).join(' ') + '...' : 'Overview: not available';
  
    divEl.append(overviewEl);
  }
  
  
    return divElImg;
  }
  
  export function displayRankedMovies(movie) {
    const topRatedMoviesArray = _.toArray(movie.results).slice(0, 10);
    
    for (const movieItem of topRatedMoviesArray) {
      getMovieElement(movieItem, false); 
    }
  }
  
  export function displayMovies(movie) {
    const movieArray = movie.results;
  
    for (const movieItem of movieArray) {
      getMovieElement(movieItem);
    }
    
  }

  const mainHeading = document.getElementById('mainHeading');
  const trendingHeading = document.getElementById('trending-movie-heading')
  const trendingMoviesForm = document.getElementById('trending-movies-form-container')
  
  export function updateMainHeading(headingText) {
    if (mainHeading) {
      mainHeading.innerText = headingText;
      trendingHeading.innerHTML= '';
      trendingMoviesForm.innerHTML = '';
    }
  }
  