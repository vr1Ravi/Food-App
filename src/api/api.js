const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
      console.log(this);
    }, delay);
  };
};

const apiCall = async (term) => {
  try {
    const response = await fetch(
      `www.themealdb.com/api/json/v1/1/search.php?s=${term}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const getMealsByName = debounce(apiCall, 3000);
