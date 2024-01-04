/* Final project - Javascript 1, FE 23. Andréa Jandergren.

- The first function (getPersonElement) creates, adds to the DOM and returns the following elements for a person:
*Name
*Department he is known for
*Picture
If no image is available in the API, the specific image (noImage) is displayed, otherwise the current image is displayed.

- The second function (displayPerson) loops through each person and creates elements with it
 "getPersonElement" function.
 A list is also created with the person's career/experience as follows:
 *Media type, either TV show or movie
 *Title of the media type

 */

function getPersonElement(person) {
  const divEl = document.createElement('div');
  const divElImg = document.createElement('div');
  const nameEl = document.createElement('h1');
  const infoDotsEl = document.createElement('small');
  const knownForEl = document.createElement('h2');
  const imgEl = document.createElement('img');
  const headingEl = document.createElement('h3');
  const ulEl = document.createElement('ul');
  const divContainer = document.querySelector('.container-div');

  nameEl.id = 'nameHeadingEl';
  knownForEl.classList.add('knownForEl')
  imgEl.classList.add("imgEl");
  
  const personName = person.original_name;
  const knownFor = person.known_for_department;
  const personImg = person.profile_path;
  
  nameEl.innerText = personName;
  infoDotsEl.innerHTML = '&#x26AC; &#x26AC; &#x26AC; '
  knownForEl.innerText = `Known for: ${knownFor}`;
  headingEl.innerText = 'Career';
    
  if (personImg === null) {
    const imgUnAvailable = 'img/noImage.png';
    imgEl.src = imgUnAvailable;
  
  } 

  else {
    const imgUrl = `https://image.tmdb.org/t/p/w500/${personImg}`;
    imgEl.src = imgUrl;
  }
  
  divEl.classList.add("divCard");
  divElImg.classList.add("divElImg");
  divEl.append(infoDotsEl, nameEl, knownForEl, headingEl, ulEl);
  divElImg.append(imgEl)
  divElImg.appendChild(divEl);
  divContainer.append(divElImg);
  return divElImg;

}
  
export function displayPerson (movie) {
  const divContainer = document.querySelector('.container-div');
  const personArray = movie.results;
  
  for (const person of personArray) {
    const personContainer = getPersonElement(person);
    const careerArray = person.known_for;
     
   for (const career of careerArray) {
     const liEl = document.createElement('li');
     personContainer.querySelector('ul').appendChild(liEl);

      const mediaType = career.media_type
      const tvTitle = career.original_name
      const movieTitle = career.original_title
      liEl.innerText = `${mediaType}: ${movieTitle || tvTitle}`;
       
    }
  
    divContainer.appendChild(personContainer);
  }
}
  