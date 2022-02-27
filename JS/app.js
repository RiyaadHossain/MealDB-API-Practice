const mealContainer = document.getElementById("meal-container");
const inputMeal = document.getElementById("input-meal");
const errorMsg = document.getElementById("error-msg");

const searchMeal = () => {
  const inputValue = inputMeal.value;
  if (inputValue === "") {
    mealContainer.textContent = "";
    inputMeal.value = "";
    errorMsg.innerHTML = `😣 Please Enter a valid Input 😔`;
  } else {
    spinner("block");
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
    inputMeal.value = "";
    mealContainer.textContent = "";
    errorMsg.innerHTML = "";
    fetch(url)
      .then((res) => res.json())
      .then((json) => printMeal(json.meals));
  }
};

const printMeal = (data) => {
  if (!data) {
    errorMsg.innerHTML = `😥 No Result Found! 😓`;
    spinner("none");
  } else {
    data?.forEach((element) => {
      const div = document.createElement("div");
      div.className = "col";
      div.innerHTML = `
        <div class="card h-100">
          <img src="${element.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h4 class="card-title">${element.strMeal}</h4>
            <h6 class="card-text">${element.strCategory}</h6>
            <button onclick="singleItem(${element.idMeal})" class="btn btn-primary">See Details</button>
          </div>
        </div>
        `;

      mealContainer.appendChild(div);
      spinner("none");
    });
  }
};

const singleItem = (meal) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
    .then((res) => res.json())
    .then((json) => printSingle(json.meals[0]));
};

const printSingle = (singleItem) => {
  console.log(singleItem);

  mealContainer.innerHTML = `
  <div class="card mx-auto" style="width: 18rem;">
    <img src="${singleItem.strMealThumb}" class="card-img-top img-fluid" alt="...">
    <div class="card-body">
      <h4 class="card-title">${singleItem.strMeal}</h4>
      <h6 class="card-text">Category: ${singleItem.strCategory}</h6>
      <h6 class="card-text">Origin: ${singleItem.strArea}</h6>
      <h6 class="card-text">Tag: ${singleItem.strTags}</h6>
      <a href="${singleItem.strYoutube}" class="btn btn-primary">Watch Video</a>
    </div>
  </div>
  `;
};

// Spinner On/Off Function
const spinner = (style) => {
  document.getElementById("spinner").style.display = style;
};
