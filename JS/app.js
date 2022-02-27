const mealContainer = document.getElementById('meal-container')
const inputMeal = document.getElementById("input-meal");

const searchMeal = () => {
  const inputValue = inputMeal.value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => printMeal(json.meals));
};

const printMeal = (data) => {
  data.forEach((element) => {
    console.log(element);
    const div = document.createElement("div");
    div.className = "col";
    div.innerHTML = `
        <div class="card h-100">
          <img src="${element.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h4 class="card-title">${element.strMeal}</h4>
            <h6 class="card-text">${element.strCategory}</h6>
            <button onclick="" class="btn btn-primary">See Details</button>
          </div>
        </div>
        `;
      mealContainer.appendChild(div)
  });
};
