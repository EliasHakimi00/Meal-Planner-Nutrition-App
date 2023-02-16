const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const searchInput = document.querySelector("#search-input");
const typingText = "Enter an ingredient";

// event listeners
// searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

$("#search-input").keypress(function(event) {
    if (event.keyCode === 13) {
        $("#search-btn").click();
    }
});

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn btn btn-outline-dark btn-floating m-1" role="button">Get Recipe</a>
                            <a href = "#" class = "nutrition-btn btn btn-outline-dark btn-floating m-1" role="button"><i class="fa-regular fa-heart"></i></a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}



// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}
// Get nutritional info of the meal



// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

// Add ins

// Start of API 2 JS
// const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
var query;

searchButton.addEventListener("click", function() {
query = searchInput.value;
$(document).ready(function() {
    $.ajax({
      method: "GET",
      url: "https://api.api-ninjas.com/v1/nutrition?query=" + query,
      headers: { "X-Api-Key": "SIId2R42qMuDhuW0nZZ5XmE4xjxBBGmi30DYLuQJ" },
      contentType: "application/json",
      success: function(result) {
        var html = "";
        for (var i = 0; i < result.length; i++) {
          html +=
            "<p>Item Name: " +
            result[i].name +
            "<br>Serving Size: " +
            result[i].serving_size_g +
            "<br>Calories: " +
            result[i].calories +
            "<br>Total Fat (g): " +
            result[i].fat_total_g +
            "<br>Total  Saturated Fat (g): " +
            result[i].fat_saturated_g +
            "<br>Total Protein (g): " +
            result[i].protein_g +
            "<br>Sodium (mg): " +
            result[i].sodium_mg +
            "<br>Potassium (mg): " +
            result[i].potassium_mg +
            "<br>Cholesterol (mg): " +
            result[i].cholesterol_mg +
            "<br>Total Carbohydrates (g): " +
            result[i].carbohydrates_total_g +
            "<br>Fibre (g): " +
            result[i].fiber_g +
            "<br>Sugar (g): " +
            result[i].sugar_g +
            "</p>";
        }
        $("#result").html(html);
      },
      error: function ajaxError(jqXHR) {
        console.error("Error: ", jqXHR.responseText);
        $("#result").html("<p>Error retrieving data</p>");
      }
    });
  });
})

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
};
// End of API 2 JS