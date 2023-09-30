const accessKey = '1tz0n0yTs0_1lVlEgey2FZrwVpmz9lz5L6dMdVZPQ7I';
const form = document.querySelector('form');
const input = document.querySelector('.search-input');
const images = document.querySelector('.images-container');
const loadMorebtn = document.querySelector('.loadMorebtn');

let page = 1;   
// function to fetch images using unsplash Api
const fetchImages = async (query, pageNo) => {
    try {
    if(pageNo === 1){
        images.innerHTML = '';

    }


        const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if(data.results.length > 0){
        
        
        data.results.forEach(photo => {
            // crate images
            const imageElement = document.createElement('div');
            imageElement.classList.add('imageDiv');
            imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;
    
            // overlay creating
            const overlayElement = document.createElement('div');
            overlayElement.classList.add('overlay');
    
            //crete overlay text
            const overlayText = document.createElement('h3');
            overlayText.innerText = `${photo.alt_description}`;
    
            overlayElement.appendChild(overlayText);
            imageElement.appendChild(overlayElement);
            images.appendChild(imageElement);
        });

        if(data.total_pages === pageNo){
            loadMorebtn.style.display = "none";
        } else{
            loadMorebtn.style.display = "block";
        }
    } else{
        images.innerHTML = `<h2>No Image Found..</h2>`;
        if(loadMorebtn.style.display = "block"){
            loadMorebtn.style.display = "none";
        }
    }
    }
 catch (error) {
    images.innerHTML = `<h2>Failed to fatch images Please try again later..</h2>`;
            
}

} 

// Adding enventlistner from search form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = input.value.trim();
    if(inputText !== ''){
        page = 1;
        fetchImages(inputText, page);
    } else {
        images.innerHTML = `<h2>Please Enter a Search Query..</h2>`
        if(loadMorebtn.style.display = "block"){
            loadMorebtn.style.display = "none";
        }
    }
});

// Adding enventlistner to load more button to fetch more images
loadMorebtn.addEventListener('click', ()  =>{
    fetchImages(input.value.trim(), ++page);
});