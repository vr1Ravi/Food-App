const radomMeal = document.getElementById("meals");
const searchInput = document.getElementById("search-item");
const searchBtn = document.getElementById("search-reciepe");
// Getting the random meal from the API
const getRandomMeal = async () => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  const randomMealData = await res.json();
  // Calling the loadRandomMeal function
  // console.log(randomMealData.meals[0]);
  loadRandomMeal(randomMealData.meals[0]);
};

// Loading the random meal
async function loadRandomMeal(randomMealData) {
  const div = document.createElement("div");
  div.classList.add("meals");
  div.innerHTML = `        <div class="meal-box">
    <span class="random-recipe"> Random Meal</span>
    <img id="random-recipeImg" src= ${randomMealData.strMealThumb} alt="random-recipe" />

    <div class="meal-img">
      <img src="" alt="" />
    </div>
    <div class="meal-description">
      <h4>${randomMealData.strMeal}</h4>
      <button id= "btn" class="fav-btn">
        <i class="fas fa-heart"></i>
      </button>
    </div>
  </div>`;
  const btn = div.querySelector(".meal-description .fav-btn");

  radomMeal.append(div);
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeFromLs(randomMealData.idmeal);
      btn.classList.remove("active");
    } else {
      addMealToLs(randomMealData.idMeal);
      btn.classList.add("active");
    }
    const mealIds = getMealsFromLS();
    showFavMeals(mealIds);
    // getRandomMeal();
  });
}
// Calling the getRandomMeal function
getRandomMeal();

// Getting the meal by ID from the API
const getMealById = async (id) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=` + id
  );
  const mealByIdData = await res.json();
  return mealByIdData.meals[0];
};

// Getting the meal by search from the API
const getMealsBySearch = async (search) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
  );
  const mealBySearchData = await res.json();
  return mealBySearchData.meals;
};

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

function showFavMeals(mealids) {
  const favList = document.querySelector(".fav-meals");
  favList.innerHTML = ``;
  mealids.map(async (mealid) => {
    const meal = await getMealById(mealid);
    const li = document.createElement("li");
    li.innerHTML = `<img src= ${meal.strMealThumb} alt="" />
    <span>${meal.strMeal}</span> <button id = ${meal.idMeal} class ="clear">
    <i class="fa-solid fa-minus"></i></button>
    `;

    favList.appendChild(li);
  });

  setTimeout(() => {
    let btns = Array.from(favList.children);
    for (let i = 0; i < btns.length; i++) {
      btns[i] = btns[i].children[2];
    }
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", () => {
        const removeId = btns[i].id;
        removeFromLs(removeId);
        showFavMeals(getMealsFromLS());
      });
    }
  }, 1000);
}

const mealIds = getMealsFromLS();
showFavMeals(mealIds);

searchBtn.addEventListener("click", async () => {
  const searchItemValue = searchInput.value;
  searchInput.value = "";
  const meals = await getMealsBySearch(searchItemValue);
  if (meals !== null) {
    meals.map((meal) => {
      loadRandomMeal(meal);
    });
  } else {
    alert("No meal found");
  }
});
