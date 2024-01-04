/* Final project - Javascript 1, FE 23. Andréa Jandergren.

Uses The Movie Database (TMDB) API- https://developer.themoviedb.org/docs/getting-started

- The first event listener (formEl) fetches the user's search input and choice of either a person or a movie. 
If the user selects a person, the image, name, department they are known for, and a list of their career are
fetched from the API and displayed in the browser. 
If the user chooses a movie, the image, title, release date, and description are fetched from the API and 
displayed in the browser.

- The second event listener (ulEl) is linked to the links in the menu. 
If the user selects "top ten movies," ten top-rated movies are displayed. 
If "most popular movies" is chosen, the ten most popular movies are displayed.

- The third event listener (formElement) is related to "trending movies" on the index page. 
If "daily" is chosen, 8 trending movies from today are displayed in the image carousel. 
If "weekly" is chosen, 8 trending movies from this week are displayed in the image carousel.

The default setting in the image carousel is "daily."

*/

import { fetchMovies, fetchTrendingMovies } from "./modules/fetchMovies.js";
import {  displayRankedMovies, displayMovies, updateMainHeading,} from "./modules/displayMovie.js"
import { displayPerson } from "./modules/displayPerson.js";
import { displayTrendingMovies } from "./modules/displayTrendingMovies.js";

const formEl = document.querySelector('form');
const formElement = document.getElementById('form-trending-movies');
const ulEl= document.querySelector('ul')

formEl.addEventListener('submit', (event)=>{
  event.preventDefault();
  const userInput = document.querySelector("#user-input").value;
  const term = document.querySelector('input[name="radio-button"]:checked').value;

  if(term === 'movie'){
    fetchMovies(term, userInput, displayMovies); 
    updateMainHeading('Movies')
  }
             
  else if(term === 'person'){
    fetchMovies(term, userInput, displayPerson); 
    updateMainHeading('Person')
      
  }

  const clearUserInput = document.querySelector('#user-input');
  clearUserInput.value = ""; 

}); 

ulEl.addEventListener('click', (event)=>{
  event.preventDefault();
    
  if(event.target.id === 'top-ten-movies'){
    const term = event.target.getAttribute('data-value');
    fetchMovies(term, null, displayRankedMovies);
    updateMainHeading('Top ten movies')
  }
   
  else if(event.target.id === 'most-popular-movies'){
    const term = event.target.getAttribute('data-value');
    fetchMovies(term, null, displayRankedMovies);
    updateMainHeading('Most popular movies')
  }

})

formElement.addEventListener('change', (event)=>{
  event.preventDefault();
  if (event.target.id === 'upcoming-daily' || event.target.id === 'upcoming-weekly' ){
    const input = event.target.getAttribute('data-value');
    fetchTrendingMovies(input, displayTrendingMovies)
  }

 const clearFirstCarouselSlide = document.querySelector('.row');
 clearFirstCarouselSlide.innerHTML = "";

 const clearText = document.querySelectorAll('.row')[1];
 const clearRemainingSlides = document.querySelector('.carousel-item');
  if (clearRemainingSlides) {
   const carouselItems = document.querySelectorAll('.carousel-item');
    
    if (carouselItems.length > 1) {
     carouselItems[1].remove();
     clearText.remove();
       
    }

   carouselItems[0].classList.add('carousel-item-active', 'active'); 
  }
})

const input = 'day';
fetchTrendingMovies(input, displayTrendingMovies)

