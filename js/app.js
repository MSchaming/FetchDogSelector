const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

//****Universal Fetch function */

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)  
        .then(res => res.json())
        .catch(error => console.log("Problem Detected", error));

}



Promise.all([
    fetchData('https://dog.ceo/api/breeds/list'),
    fetchData('https://dog.ceo/api/breeds/image/random')
])
.then(data => {
    const breedList = data[0].message;
    const randomImage = data[1].message;

    generateOptions(breedList);
    generateImage(randomImage);

})


// //*****Breed Name Fetch for Select Menu */

// fetchData('https://dog.ceo/api/breeds/list')
// // .then(response => response.json())
// .then(data => generateOptions(data.message));


// //*****Img Fetch */

// fetchData('https://dog.ceo/api/breeds/image/random')
// // .then(response => response.json())//returns response object
// .then(data => generateImage(data.message)); //do something with response- print


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}


function generateOptions(data) {
    const options = data.map( item =>
        `<option value="${item}">${item}</option>`
    ).join(''); //to remove , placed by .map
    select.innerHTML = options;
}


function generateImage (data) {
    const html = `
    <img src='${data}' alt>
    <p>Click to view your images of ${select.value}s </p>
    `;

    card.innerHTML = html;
    console.log(data);
}


//*****function to select random imag if user clicks in card box */

function fetchBreedImage() {
    const breed = select.value;
    const img = card.querySelector('img');
    const p = card.querySelector('p');

    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(data => {
            img.src = data.message;
            img.alt = breed;
            p.textContent = `Click to view more ${breed}s`
        });
}


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);
form.addEventListener('submit', postData);




// ------------------------------------------
//  POST DATA
// ------------------------------------------


function postData(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    const config = {
        method: 'POST',
        headers: {
            'Content-Type' :  'application/json'
        },
        body: JSON.stringify({name, comment})
    }



    fetch('https://jsonplaceholder.typicode.com/comments', config)
        .then(checkStatus)
        .then(res => res.json())
        .then(data => console.log(data));
 
}