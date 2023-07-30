// Getting the elements from the DOM
const radomMeal = document.getElementById("randomimg");
const searchBtn = document.getElementById("search-reciepe");
const searchInput = document.getElementById("search-item");
const searchedMeals = document.querySelector(".searchedMeals");

let selectedMeal = "";

// Getting the random meal from the API
const getRandomMeal = async () => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  const randomMealData = await res.json();
  loadRandomMeal(randomMealData.meals[0]);
};

// Loading the random meal
async function loadRandomMeal(randomMealData) {
  const img = document.createElement("img");
  const para = document.createElement("p");
  para.classList.add("random-recipe-name");
  img.classList.add("random-recipeImg");
  img.src = randomMealData.strMealThumb;
  para.innerText = `${randomMealData.strMeal}`;
  radomMeal.append(img);
  radomMeal.append(para);
}
// Calling the getRandomMeal functions
getRandomMeal();

// Getting the meal by search from the API
const getMealsBySearch = async (search) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
  );
  const mealBySearchData = await res.json();
  return mealBySearchData.meals;
};
// Adding the event listener to the searched meal
searchBtn.addEventListener("click", async () => {
  searchItemValue = searchInput.value;
  searchedMeals.innerHTML = "";
  const meals = await getMealsBySearch(searchItemValue);

  if (meals !== null) {
    meals.map((meal) => {
      const div = document.createElement("div");
      div.classList.add("searchedMeal");
      div.innerHTML = ` <img
      class= "meal-img"
      id=${meal.idMeal}
      src= ${meal.strMealThumb}
      alt="not found"
    />
    <p>${meal.strMeal}</p>`;
      searchedMeals.append(div);
    });
    setTimeout(() => {
      selectedMeal = Array.from(
        searchedMeals.querySelectorAll(".searchedMeal")
      );
      console.log(selectedMeal);
      selectedMeal.map((item, idx) => {
        item.addEventListener("click", async () => {
          console.log(item.children[0].id);
          addMealToLs(item.children[0].id);
          window.location.href = "/recipe.html";
        });
      });
    }, 1000);
  } else {
    alert("No meal found");
  }
});

// Function to remove the meal from the Local Storage
function removeFromLs(mealId) {
  localStorage.removeItem("mealId");
}
// Function to add the meal from the Local Storage
function addMealToLs(mealId) {
  removeFromLs();
  localStorage.setItem("mealId", JSON.stringify(mealId));
}

// Function to get the meal from the Local Storage
function getMealsFromLS() {
  const mealId = JSON.parse(localStorage.getItem("mealId"));
  return mealId === null ? "Please SelectMeal" : mealId;
}
