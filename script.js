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
        alert("Hello")
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
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                            <a href = "#" class = "nutrition-btn">View Nutritional Content</a>
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







// jQuery
$(document).ready(function () {

    // # Define Global Varables:
    // ## Collect an array of objects from the API data, storing each searched item's nutritional information:
    var nutritionLog;
  
  
    // # Named Functions:
    // ## Function for AJAX request (api.api-ninjas.com):
    function nutrition(input) {
      // Convert input to "Abc":
      var nInput = input[0].toUpperCase() + input.slice(1);
  
      // Detect if data is already collected:
      for (i = 0; i < nutritionLog.length; i++) {
        if (nutritionLog[i].name === nInput) {
          nutritionPrint(nutritionLog[i]);
          return
        }
      }
  
      // Otherwise, AJAX request:
      $.ajax({
        url: "https://api.api-ninjas.com/v1/nutrition?query=" + nInput,
        method: "GET",
        headers:
          {
            "X-Api-Key": "IwhtCJGw12MHyUIULDa3uQ==XbFoMNPZvs2TKkfC"
          }
  
      }).then(function(response) {
        // Detect invalid response from API, print nutritionLog[0] error values:
        if (!$.trim(response)) {
          nutritionPrint("error")
          return
        } else {
  
          // Add response to a temporary variables nName and nItem:
          var nName = response[0].name.toString();
          nName[0].toUpperCase() + nName.slice(1)
  
          var nItem = {};
          nItem =
            {
              name: nName[0].toUpperCase() + nName.slice(1),
              calories: response[0].calories.toString() + "kcal",
              carbohydrates: response[0].carbohydrates_total_g.toString() + "g",
              cholesterol: response[0].cholesterol_mg.toString() + "mg",
              serving_size: response[0].serving_size_g.toString() + "g",
              fat: response[0].fat_total_g.toString() + "g",
              fat_saturated: response[0].fat_saturated_g.toString() + "g",
              fiber: response[0].fiber_g.toString() + "g",
              potassium: response[0].potassium_mg.toString() + "mg",
              protein: response[0].protein_g.toString() + "g",
              sodium: response[0].sodium_mg.toString() + "mg",
              sugar: response[0].sugar_g.toString() + "g"
            }
  
          // Add the temporary variables to the Nutrition Log array of objects, and download to local storage:
          nutritionLog.push(nItem);
          var nutritionLogString = JSON.stringify(nutritionLog);
          localStorage.setItem("nutritionLog", nutritionLogString);
  
          // Return the nutritional information of the ingredient:
          nutritionPrint(nItem)
          return
        }
      });
    }
  
    // ## Function to detect and load previous nutritionLog array of objects, saved to local storage:
    function nutritionLogLoad() {
      if (localStorage.getItem("nutritionLog") !== null) {
        nutritionLog = JSON.parse(localStorage.getItem("nutritionLog"));
      } else {
        // Otherwise define nutritionLog as an array of objects:
        nutritionLog = [{}]
      }
    }
  
    // ## Function to print nutritional information paragraph to document:
    function nutritionPrint (obj) {
      $("#nutritional-information").empty();
      if (obj === "error") {
        $("#nutritional-information").append(`
          <div class="p-0">
            <p class="text-center notFound p-0">Sorry, ingredient not found!</p>
          </div>
        `);
      } else {
        $("#nutritional-information").append(`
          <div style="margin:0 auto;">
            <h3 style="color:#2a607c">` +  obj.name + `</h3>
          </div>
  
          <div class="p-0">
            <p class="text-center p-0">
              <i> per 100g </i>
              <br>
              <br><b> Calories: </b>` + obj.calories + `
              <br><b> Carbohydrates: </b>` + obj.carbohydrates + `
              <br><b> Cholesterol: </b>` + obj.cholesterol + `
              <br><b> Fat: </b>` + obj.fat + `
              <br><i> of which saturates: </i>` + obj.fat_saturated + `
              <br><b> Fiber: </b>` + obj.fiber + `
              <br><b> Potassium: </b>` + obj.potassium + `
              <br><b> Protein: </b>` + obj.protein + `
              <br><b> Sodium: </b>` + obj.sodium + `
              <br><b> Sugar: </b>` + obj.sugar + `
            </p>
          </div>
        `);
      }
    }
  
  
    // Initialise webpage:
    nutritionLogLoad();
  
  
    // Buttons:
    $("#search-btn").on("click", function(event) {
      event.preventDefault();
      // nutrition(Ingredient);
      nutrition($("#search-input").val().trim());
      getMealList();
    })
  
  
  });