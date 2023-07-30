// Description: This file contains the code for the recipe page

const left = document.querySelector(".left");

// Getting the meal by ID from the API
const getMealById = async (id) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=` + id
  );
  const mealByIdData = await res.json();
  console.log(mealByIdData.meals[0]);
  loadMealById(mealByIdData.meals[0]);
};
// Functiion to load the meal by ID and adding result to left div
function loadMealById(mealByIdData) {
  left.innerHTML = `<h1>${mealByIdData.strMeal}</h1>
      <div class="favMeal">
        <img
          class="meal-img"
          src=${mealByIdData.strMealThumb}
          alt="meal-img"
        />
        
      </div>
      <div class="mealIngredieantInfo">
        <p>
           ${mealByIdData.strInstructions}
        </p>
        <a href=${mealByIdData.strYoutube}>Watch Tutorial<i class="fa-brands fa-youtube"></i></a>
      </div>`;
  const mealIngredieantInfo = left.children[2];
  const ul = document.createElement("ul");
  ul.classList.add("ingredieantList");
  mealIngredieantInfo.prepend(ul);
  for (let i = 20; i > 0; i--) {
    if (mealByIdData[`strIngredient${i}`] !== "") {
      const li = document.createElement("li");
      li.innerHTML = `<i class="fa-solid fa-star-half-stroke fa-spin"></i>${
        mealByIdData[`strIngredient${i}`]
      } - ${mealByIdData[`strMeasure${i}`]}`;
      ul.append(li);
    }
  }
  const h2 = document.createElement("h2");
  h2.innerHTML = `<i class="fa-solid fa-arrow-right fa-fade"></i> Ingredients`;
  mealIngredieantInfo.prepend(h2);
}

// Function to get the meal from local storage
function getMealsFromLS() {
  const mealId = JSON.parse(localStorage.getItem("mealId"));
  return mealId === null ? "Please SelectMeal" : mealId;
}
const mealId = getMealsFromLS();
// Calling the function to get the meal by ID
getMealById(mealId);
