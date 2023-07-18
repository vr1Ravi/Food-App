const radomMeal = document.getElementById("randomimg");
const searchBtn = document.getElementById("search-reciepe");
const searchInput = document.getElementById("search-item");
const searchedMeals = document.querySelector(".searchedMeals");
const left = document.querySelector(".left");
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

// Getting the meal by ID from the API
const getMealById = async (id) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=` + id
  );
  const mealByIdData = await res.json();
  console.log(mealByIdData.meals[0]);
  loadMealById(mealByIdData.meals[0]);
};
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
  ul.innerHTML = `<h2><i class="fa-solid fa-arrow-right fa-fade"></i> Ingredients</h2>`;
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
}
// Getting the meal by search from the API
const getMealsBySearch = async (search) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
  );
  const mealBySearchData = await res.json();
  // console.log(mealBySearchData);
  return mealBySearchData.meals;
};
// Adding the event listener to the search button
searchBtn.addEventListener("click", async () => {
  searchItemValue = searchInput.value;
  searchedMeals.innerHTML = "";
  const meals = await getMealsBySearch(searchItemValue);

  if (meals !== null) {
    meals.map((meal) => {
      const div = document.createElement("div");
      div.classList.add("searchedMeal");
      div.innerHTML = ` <img
      class="meal-img"
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
        item.addEventListener("click", () => {
          getMealById(item.children[0].id);
        });
      });
    }, 1000);
  } else {
    alert("No meal found");
  }
});

// Function to remove the meal from the Local Storage
function removeFromLs(mealId) {
  const mealIds = getMealsFromLS();
  const filteredMealIds = mealIds.filter((id) => id !== mealId);
  localStorage.setItem("mealIds", JSON.stringify([...filteredMealIds]));
}
// Function to add the meal from the Local Storage
function addMealToLs(mealId) {
  const mealIds = getMealsFromLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

// Function to get the meal from the Local Storage
function getMealsFromLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}
