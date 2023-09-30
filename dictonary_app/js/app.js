const form = document.querySelector('form');
const result = document.querySelector('.result');

form.addEventListener('click', (e)=>{
    e.preventDefault();
    getwordinfo(form.elements[0].value);
});

const getwordinfo = async (word) =>{
    try {
    result.innerHTML = "Fetching Data....";
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    console.log(data);
    
    let definations = data[0].meanings[0].definitions[0];
     result.innerHTML = `

     <h2><strong>Word: </strong>${data[0].word}</h2>
     <p class="partofspeech"><strong>PartOfSpeech: </strong>${data[0].meanings[0].partOfSpeech}</p>
     <p><strong>Meaning: </strong>${definations.definition === undefined ? "Not Found" : definations.definition}</p>
     <p><strong>Example: </strong>${definations.example === undefined ? "Not Found" : definations.example}</p>
     <p><strong>Antonyms: </strong></p>
     `;

     //fetching antonyms
     if(definations.antonyms.length === 0){
        result.innerHTML += `<span>Not Found</span>`
     } 
     
     else{

         for(let i=0; i<definations.antonyms.length; i++){
            result.innerHTML += `<li>${definations.antonyms[i]}</li>`
         }
     } 
    
     //fetching synonyms
     if(definations.synonyms.length === 0){
        result.innerHTML +=  `<p><strong>Synonyms: </strong>Not Found</p>`;
     } else {
        result.innerHTML += `<p><strong>Synonyms: </strong></p>`;
        result.innerHTML += `<ul>`
        for(let i=0; i<definations.synonyms.length; i++){
            result.innerHTML += `<li>${definations.synonyms[i]}</li>`
        }
        
        result.innerHTML += `</ul>`;
     }
         
     

     //adding read more button
     result.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank ">Read More</a></div>`;

    } 
    catch (error) {
        result.innerHTML = `<p>Sorry: The Word Could Not Be Found</p>`;
    }

//fetching synonyms


    
}