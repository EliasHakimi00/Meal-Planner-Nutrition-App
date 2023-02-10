// jQuery
$(document).ready(function () {


  // # Define Global Varables:
  // ## Array of objects, storing each item's nutritional data:
  var nutritionLog;


  // # Named Functions:
  // ## Function for AJAX request (api.api-ninjas.com):
  function nutrition(location, input) {
    // Convert input to "Abc":
    input = input.trim();
    var nInput = input[0].toUpperCase() + input.slice(1);

    // Detect if data is already collected:
    for (i = 0; i < nutritionLog.length; i++) {
      if (nutritionLog[i].name === nInput) {
        nutritionPrint(location, nutritionLog[i]);
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
      // Detect invalid response from API:
      if (!$.trim(response)) {
        nutritionPrint(location, nutritionLog[0])
        return
      } else {

        // Add response to a temporary variable nItem:
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

        // Add the temporary variable to the Nutrition Log, and download to local storage:
        nutritionLog.push(nItem);
        nutritionLogString = JSON.stringify(nutritionLog);
        localStorage.setItem("nutritionLog", nutritionLogString);

        // Return nutritional information of the ingredient:
        nutritionPrint(location, nItem)
        return
      }
    });
  }


  // ## Function to detect and load nutritionLog data saved to local storage:
  function nutritionLogLoad() {
    // Detect data saved to local storage:
    if (localStorage.getItem("nutritionLog") !== null) {
      nutritionLog = JSON.parse(localStorage.getItem("nutritionLog"));
    } else {
      // Preload ingredient not found error message to nutritionLog:
      var nutritionError = "Error";
      nutritionLog = [
        {
          name: nutritionError,
          calories: nutritionError,
          carbohydrates: nutritionError,
          cholesterol: nutritionError,
          serving_size: nutritionError,
          fat: nutritionError,
          fat_saturated: nutritionError,
          fiber: nutritionError,
          potassium: nutritionError,
          protein: nutritionError,
          sodium: nutritionError,
          sugar: nutritionError,
        }
      ]
    }
  }

  // ## Function to print paragraph to document:
  function nutritionPrint (location, obj) {
    var nutritionList = $(`
      <h2>` + obj.name + `</h2>
      <p>
        per 100mg
        <br>
        <br> Calories: ` + obj.calories + `
        <br> Carbohydrates: ` + obj.carbohydrates + `
        <br> Cholesterol: ` + obj.cholesterol + `
        <br> Fat: ` + obj.fat + `
        <br> of which saturates: ` + obj.fat_saturated + `
        <br> Fiber: ` + obj.fiber + `
        <br> Potassium: ` + obj.potassium + `
        <br> Protein: ` + obj.protein + `
        <br> Sodium: ` + obj.sodium + `
        <br> Sugar: ` + obj.sugar + `
      </p>
    `);
    location.empty();
    location.append(nutritionList);
  }


  // Initialise webpage:
  nutritionLogLoad();


  // Buttons:
  $(".btn").on("click", async function(event) {
    event.preventDefault();

    // nutrition("Output <div>", "Ingredient");
    nutrition($("#output"), $("#searchBar").val().trim());
  })


});