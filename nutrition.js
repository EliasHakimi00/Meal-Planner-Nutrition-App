// jQuery
$(document).ready(function () {


  // # Define Global Varables:
  // ## Array of objects, storing each item's nutritional data:
  var nutritionLog;


  // # Named Functions:
  // ## Function for AJAX request (api.api-ninjas.com):
  function nutrition(input) {
  
    // Convert input to "Abc":
    input = input.trim();
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
        nutritionPrint(nutritionLog[0])
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
        var nutritionLogString = JSON.stringify(nutritionLog);
        localStorage.setItem("nutritionLog", nutritionLogString);

        // Return nutritional information of the ingredient:
        nutritionPrint(nItem)
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
      var nutritionError = "Ingredient not found!";
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
        // <div class="modal-dialog modal-dialog-scrollable" role="document"></div>
  // ## Function to print paragraph to document:
  function nutritionPrint (obj) {
    $("#modal").empty();
    $("#modal").append(`
      <div class="modal fade" id="nutritionModal" tabindex="-1" role="dialog" aria-labelledby="nutritionModalTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header" style="margin:0 auto;">
              <h2 class="modal-title" id="nutritionModalTitle" style="color:#0097FF">` +  obj.name + `</h5>
            </div>

            <div class="modal-body">
              <p class="text-center">
                <i> per 100mg </i>
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
          </div>
        </div>
      </div>
    `);
    $("#nutritionModal").modal("toggle");
  }


  // Initialise webpage:
  nutritionLogLoad();


});