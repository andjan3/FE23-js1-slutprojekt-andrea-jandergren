/* Final project - Javascript 1, FE 23. Andréa Jandergren.

-The first function (fetchMovies) fetches movies. If term (user's button choice) and userInput are present, 
the movieOrPerson URL is fetched. If only term is present, TopRatedMovie is fetched. 
It also removes the Hero image and carousel on the first page to display different movies/people instead. 
If an empty array is returned from the API, an error message is displayed.

-The second function (fetchTrendingMovies) fetches trending movies. 
If an empty array is returned from the API, an error message is displayed.


 */

import { displayError } from "./errorHandling.js"
import { updateMainHeading } from "./displayMovie.js";

const BAERER_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjdhOWUwZDAwYzJlZDgyNTA1ZWMwMDUwN2Q1OThmYSIsInN1YiI6IjY1ODAwNTRhMmY4ZDA5MDhkNWE3ZDY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dAB8HTsw78t0V16WTs12hFUby6i0JSWcLy-5vYVXoEs';

const baseUrl = "https://api.themoviedb.org/3/";
const queries = "language=en-US&page=1";

export async function fetchMovies(term, userInput, displayFunction) {
  const sectionElement = document.getElementById('section-hero');
  const carouselElement = document.getElementById('carouselExample');
  const divContainer = document.querySelector('.container-div');
  divContainer.innerHTML = '';

  if (sectionElement ||carouselElement ) {
   sectionElement.remove();
    carouselElement.remove();
  }

  let url;
  let movieOrPerson = `search/${term}?query=${userInput}&`;
  let topRatedMovies = `movie/${term}?`;

  if(term && userInput)  { 
    url = baseUrl + movieOrPerson + queries;
        
  } 
         
  else if (term) {
    url = baseUrl + topRatedMovies + queries;
       
  } 

  const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: `Bearer ${BAERER_KEY}`
  }
};
    
try{
  const response = await fetch(url, options)
  if(response.ok){
    const movie = await response.json();
    displayFunction(movie);  

    if (movie.results.length === 0) {
     const h1El = document.createElement('h1');
      updateMainHeading('')
      h1El.innerText = `No results found. Check if your spelling is correct and try again!`;
      divContainer.append(h1El)
              
    }
   }

   else if(response.status === 404){
    throw 404;
          
   }

   else{ 
    throw 'error';
   }

  }
  catch(error){
      displayError(error);
  }

}

export async function fetchTrendingMovies(input, displayFunction){
  let url;
  let trendingMovies = `trending/movie/${input}?`;
 
    
  if(input){
    url= baseUrl + trendingMovies + queries;
  }

  const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: `Bearer ${BAERER_KEY}`
    }
  };
  try{
    const response = await fetch(url, options)
    if(response.ok){
      const movie = await response.json();
      displayFunction(movie);  
                
      if (movie.results.length === 0) {
        const h1El = document.createElement('h1');
        updateMainHeading('')
        h1El.innerText = `No results found. Check if your spelling is correct and try again!`;
        divContainer.append(h1El)
                  
      }
    }
    
    else if(response.status === 404){
      throw 404;
              
    }
    else{ 
      throw 'error';
    }
  }
  catch(error){
    displayError(error);
  }
  
}