const searchbox = document.querySelector(".searchbox");
const searchbtn = document.querySelector(".searchbtn");
const recipe_app = document.querySelector(".recipe-app");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn")


const fetchrecipes = async (query) => {
    recipe_app.innerHTML = "<h2>Fetching Recipes...</h2>"
    try {
        
   
    const data = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response = await data.json();

    recipe_app.innerHTML = "";
    response.meals.forEach(meal => {
        const recipediv = document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea} </span>Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipes";
        recipediv.appendChild(button);

        // adding event lestner to recipe button
        button.addEventListener('click', ()=>{
            openRecipePopup(meal);
        })
        recipe_app.appendChild(recipediv);
    
        
    });
}
    catch (error) {
        recipe_app.innerHTML = "<h2>Type Error In Fetching Recipes</h2>" 
    }
}

const fetchIngredents = (meal) =>{
   
    let IngredentList = "";
    for(let i = 1; i<=20; i++){
        const ingradent = meal[`strIngredient${i}`];
        if(ingradent){
            const measur = meal[`strMeasure${i}`];
            IngredentList += `<li>${measur} ${ingradent}</li>`
        }
        else{
            break;
        }
    }
    return IngredentList;
}

const openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredents:</h3>
        <ul class="IngredientList">${fetchIngredents(meal)}</ul>
        <div>
            <h3>Instructions: </h3>
            <p class="Instructions">${meal.strInstructions}</p>
        </div>
    `
   
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click',  ()=>{
    recipeDetailsContent.parentElement.style.display = "none";
})

searchbtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchbox.value.trim();
    if (!searchInput) {
        recipe_app.innerHTML = `"<h3>Type The Mail In The Search Box.</h3>"`;
        return;
    }
    fetchrecipes(searchInput);
   
});

