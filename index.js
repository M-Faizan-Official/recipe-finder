const searchForm = document.querySelector("#searchForm");
const mealInput = document.querySelector("#mealInput");
const resultsRef = document.querySelector("#results");

async function searchMeal(query) {
    resultsRef.innerHTML = "Searching...";

    
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );


    const data = await response.json();

    if (!data.meals) {
        resultsRef.innerHTML = "<p>No recipes found. Try a different search.</p>";
        return;
    }

   
    const mealsHTML = data.meals.map((meal) => {
        return `
            <article>
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="300">
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Area:</strong> ${meal.strArea}</p>
                <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
            </article>
        `;
    });


    resultsRef.innerHTML = mealsHTML.join("");
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const query = mealInput.value.trim();
    if (!query) return; 

    searchMeal(query);
});