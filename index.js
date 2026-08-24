const searchForm = document.querySelector("#searchForm");
const mealInput = document.querySelector("#mealInput");
const resultsRef = document.querySelector("#results");

// "async function" - this lets us use "await" inside, which pauses
// the function until the API actually responds (API calls take time,
// they don't return data instantly like a normal function would).
async function searchMeal(query) {
    resultsRef.innerHTML = "Searching...";

    // fetch() goes and asks the API for data.
    // We add the user's search term to the end of the URL.
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );

    // The API sends back raw data - .json() converts it into
    // a JavaScript object/array we can actually use.
    const data = await response.json();

    // TheMealDB returns { meals: [...] } if found, or { meals: null } if not.
    if (!data.meals) {
        resultsRef.innerHTML = "<p>No recipes found. Try a different search.</p>";
        return;
    }

    // data.meals is an ARRAY of recipe objects - this is exactly like
    // the "products" array you practiced with. We .map() over it
    // to turn each recipe object into a piece of HTML.
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

    // .map() gives us back an ARRAY of HTML strings (one per recipe).
    // .join("") glues them all into one single string so we can
    // drop them into the page in one go.
    resultsRef.innerHTML = mealsHTML.join("");
}

// This runs when the user clicks "Search" (or presses Enter in the input)
searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // stops the page from refreshing on submit

    const query = mealInput.value.trim();
    if (!query) return; // don't search on empty input

    searchMeal(query);
});