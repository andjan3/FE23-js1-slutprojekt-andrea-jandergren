/* Final project - Javascript 1, FE 23. Andréa Jandergren.

The displayError function creates elements and adds to the DOM if 404 errors occurs.
For other errors, an element is created and displayed. Then called in fetchMovies.

updateMainHeading is called to remove main heading.

 */
import { updateMainHeading } from "./displayMovie.js";

export function displayError(error) {
    const divContainer = document.querySelector('.container-div');
    const h1El = document.createElement('h1');

    if(error === 404){ 
         h1El.innerText = `No results found. Check if your spelling is correct and try again!`;
         updateMainHeading('')
    }
    else{ 
        h1El.innerText = `Something went wrong. Try again later!`;
        updateMainHeading('');
    }
    divContainer.append(h1El);

}