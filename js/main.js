$(document).ready(function () {
  getData().then(function () {
    $("#myscreen").fadeOut(3000);
  });
});

let leftValue;
function openBar() {
  $("#side-bar").animate(
    {
      left: "0px",
    },
    500
  );
  $("#bar-icon").html("<i class='fa-2x fa-solid fa-xmark'></i>");

  for (let i = 0; i < 5; i++) {
    $("#side-bar-list li")
      .eq(i)
      .animate(
        {
          opacity: "1",
          left: "0px",
          top: "0px",
        },
        (i + 5) * 100
      );
  }
}

function closeBar(time = 500) {
  leftValue = $("#side-bar-list").outerWidth(true);
  console.log(leftValue);
  $("#side-bar").animate(
    {
      left: -leftValue,
    },
    500
  );

  $("#bar-icon").html("<i class='fa-2x fa-solid fa-bars'></i>");
}
closeBar(0);
$("#side-bar-list li").css({
  top: "100%",
  left: "50%",
  overflow: "hidden",
});

$("#bar-icon").click(function () {
  if ($("#side-bar").css("left") == -leftValue + "px") {
    openBar();
  } else {
    (async function () {
      closeBar();
      $("#side-bar-list li").css({
        opacity: "0",
        top: "100%",
        left: "100%",
        overflow: "hidden",
      });
    })();
  }
});

// ===============================================================================
// ===============================================================================
// ===============================================================================
// ===============================================================================
// ===============================================================================
// ===============================================================================

let mainPage = document.getElementById("myRow");
let items = Array.from(document.querySelectorAll(".item"));
let searchPage = document.getElementById("searchMealPage");

async function getData() {
  let myReq = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let myData = await myReq.json();
  myData = myData.meals;
  display(myData);
}

function display(myData) {
if(myData.length > 20){
    myData = myData.slice(0,20)
}
  let temp = "";
  if (myData.lenght != 0) {
    myData.forEach((element) => {
      let { idMeal, strMeal, strMealThumb } = element;
      temp += `
                <div class="col-lg-3 col-md-4 gold">
                    <div idMeal = ${idMeal} onclick="displayMeal('${idMeal}')" class="item position-relative" onmouseover="hover()">
                    <div class="item-abs" >
                        <h1 class="ps-2">${strMeal}</h1>
                    </div>
                    <img src="${strMealThumb}" class="w-100 h-100 rounded-3" alt="">
                    </div>
                    
                </div>
            `;
    });
    mainPage.innerHTML = temp;
  }
}

function hover() {
  $(".item").hover(
    function () {
      $($(this).children(".item-abs")).css({
        height: "100%",
        opacity: "1 ",
        transition: "all 0.5s",
      });
    },
    function () {
      $($(this).children(".item-abs")).css({
        height: "0%",
        opacity: "0",
        transition: "all 0.5s",
      });
    }
  );
}

//================================================================================
//=================================                  =============================
//=================================   Search Name    =============================
//=================================                  =============================
//================================================================================

$("#searchMealPage").click(function () {
  closeBar();
  content.innerHTML = " ";
  $("#myRow").html(" ");
  $("#mySearchRow").css({
    display: "flex",
  });
});

async function getDataByName(name) {
  $("#myscreen").fadeIn(200);
  let req = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let dataSearchByName = await req.json();

  dataSearchByName = dataSearchByName.meals;
  // display(dataSearchByName)
  dataSearchByName ? display(dataSearchByName) : display([]);
  $("#myscreen").fadeOut(1000);
}

async function getDataByLetter(letter) {
  $("#myscreen").fadeIn(200);

  let req = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`
  );
  let dataSearchByletter = await req.json();
  dataSearchByletter = dataSearchByletter.meals;
  // display(dataSearchByletter)
  dataSearchByletter ? display(dataSearchByletter) : display([]);
  $("#myscreen").fadeOut(1000);
}

function notShowSearch() {
  $("#mySearchRow").css({
    display: "none",
  });
}

//================================================================================
//=================================                  =============================
//=================================   Categories     =============================
//=================================                  =============================
//================================================================================

function hoverCategory() {
  $(".item-category").hover(
    function () {
      $($(this).children(".item-abs-category")).css({
        height: "100%",
        opacity: "1 ",
        transition: "all 0.5s",
      });
    },
    function () {
      $($(this).children(".item-abs-category")).css({
        height: "0%",
        opacity: "0",
        transition: "all 0.5s",
      });
    }
  );
}

let categoryPage = document.getElementById("categoriesPage");
$("#categoriesPage").click(function () {
  notShowSearch();
  content.innerHTML = " ";

  closeBar();
  getCategories();
});

async function getCategories() {
  $("#myscreen").fadeIn(200);
  let req = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let dataCategories = await req.json();
  dataCategories = dataCategories.categories;
  displayCategories(dataCategories);
  console.log(dataCategories);
  $("#myscreen").fadeOut(1000);
}

function displayCategories(myData) {
  let temp = "";
  if (myData.lenght != 0) {
    myData.forEach((element) => {
      let {
        idCategory,
        strCategory,
        strCategoryThumb,
        strCategoryDescription,
      } = element;
      temp += `
                <div class="col-lg-3 col-md-4 gold ">
                    <div idCategory = ${idCategory} onclick="ShowMealsOfCategory('${strCategory}')" class="item-category position-relative" onmouseover="hoverCategory()">
                    <div class="item-abs-category" >
                        <h3 class="text-center">${strCategory}</h3>
                        <p class="ps-2 pb-2">${strCategoryDescription}</p>
                    </div>
                    <img src="${strCategoryThumb}" class="w-100 h-100 rounded-3" alt="">
                    </div>
                    
                </div>
            `;
    });
    myRow.innerHTML = temp;
  }
}

async function ShowMealsOfCategory(categoryName) {
  $("#myscreen").fadeIn(200);

  let req = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );
  let mealsCategory = await req.json();
  mealsCategory = mealsCategory.meals;
  console.log(mealsCategory);
  display(mealsCategory);
  $("#myscreen").fadeOut(1000);
}

//================================================================================
//====================================               =============================
//====================================     Areas     =============================
//====================================               =============================
//================================================================================

let areasPage = document.getElementById("areasPage");
$("#areasPage").click(function () {
  notShowSearch();
  content.innerHTML = " ";

  closeBar();
  getAreas();
});

async function getAreas() {
  $("#myscreen").fadeIn(200);

  let req = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let areas = await req.json();
  areas = areas.meals;
  console.log(areas);
  displayAreas(areas);
  $("#myscreen").fadeOut(1000);
}

function displayAreas(myData) {
  let temp = "";
  if (myData.lenght != 0) {
    myData.forEach((element) => {
      let { strArea } = element;
      temp += `
                  <div class="col-lg-3 col-md-4 gold text-center" onclick="getMealsForArea('${strArea}')">
                      <div  class="item position-relative" >
                        <i class="fa-solid text-white  fa-house-laptop fa-4x"></i>
                      </div>
                      <h2 class="text-white pt-2">${strArea}</h2>
                      
                  </div>
              `;
    });
    mainPage.innerHTML = temp;
  }
}

async function getMealsForArea(areaName) {
  $("#myscreen").fadeIn(200);

  let req = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
  );
  let mealsOfArea = await req.json();
  mealsOfArea = mealsOfArea.meals;
  display(mealsOfArea);
  $("#myscreen").fadeOut(1000);
}

//================================================================================
//====================================               =============================
//====================================  ingredients  =============================
//====================================               =============================
//================================================================================

let ingredientsPage = document.getElementById("ingredientsPage");
$("#ingredientsPage").click(function () {
  notShowSearch();
  content.innerHTML = " ";

  closeBar();
  getIngredients();
});

async function getIngredients() {
  $("#myscreen").fadeIn(200);

  let req = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let ingredients = await req.json();
  ingredients = ingredients.meals.slice(0, 20);
  displayIngredients(ingredients);
  $("#myscreen").fadeOut(1000);
}

function displayIngredients(myData) {
  let temp = "";
  if (myData.lenght != 0) {
    myData.forEach((element) => {
      let { strIngredient, strDescription } = element;
      let strArray = strDescription.split(" ");
      strArray = strArray.slice(0, 20);
      strDescription = strArray.join(" ");
      temp += `
                  <div class="col-lg-3 col-md-4 gold text-center" onclick="getMealsForIngredient('${strIngredient}')" >
                      <div  class="item position-relative" >
                      <i class="fa-solid text-white fa-drumstick-bite fa-4x"></i>
                      </div>
                      <h4 class="text-white pt-2">${strIngredient}</h4>
                      <p class="text-white">${strDescription}</p>
                      
                  </div>
              `;
    });
    myRow.innerHTML = temp;
  }
}

async function getMealsForIngredient(IngredientName) {
  $("#myscreen").fadeIn(200);

  let req = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${IngredientName}`
  );
  let mealsOfIngredient = await req.json();
  mealsOfIngredient = mealsOfIngredient.meals;
  console.log(mealsOfIngredient);
  display(mealsOfIngredient);
  $("#myscreen").fadeOut(1000);
}

//================================================================================
//====================================               =============================
//====================================  Display Meal =============================
//====================================               =============================
//================================================================================

async function displayMeal(id) {
    notShowSearch()
  $("#myscreen").fadeIn(200);

  let req = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let meal = await req.json();
  meal = meal.meals;
  meal = meal[0];

  let {
    strInstructions,
    strArea,
    strCategory,
    strMeal,
    strMealThumb,
    strSource,
    strTags,
    strYoutube,
  } = meal;
  console.log(strTags);

  let {
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
    strIngredient16,
    strIngredient17,
    strIngredient18,
    strIngredient19,
    strIngredient20,
  } = meal;

  let arrayIngredient = [
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
    strIngredient11,
    strIngredient12,
    strIngredient13,
    strIngredient14,
    strIngredient15,
    strIngredient16,
    strIngredient17,
    strIngredient18,
    strIngredient19,
    strIngredient20,
  ];

  let recipeData = [];

  let {
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
    strMeasure11,
    strMeasure12,
    strMeasure13,
    strMeasure14,
    strMeasure15,
    strMeasure16,
    strMeasure17,
    strMeasure18,
    strMeasure19,
    strMeasure20,
  } = meal;
  let arrayMeasure = [
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
    strMeasure11,
    strMeasure12,
    strMeasure13,
    strMeasure14,
    strMeasure15,
    strMeasure16,
    strMeasure17,
    strMeasure18,
    strMeasure19,
    strMeasure20,
  ];

  for (let i = 0; i < arrayIngredient.length; i++) {
    if (arrayIngredient[i] != "") {
      let name = arrayMeasure[i] + " " + arrayIngredient[i];
      recipeData.push(name);
    }
  }

  let recipies = "";
  recipeData.forEach((el) => {
    recipies += `
        <li style="background-color: #CFF4FC;color: black;" class=" d-inline-block p-2 mb-3 me-3 rounded-4">${el} </li>
        `;
  });

  if (strTags != null) {
    strTags = strTags.split(",");
  } else {
    strTags = [];
  }
  let tags = "";
  strTags.forEach((el) => {
    tags += `
    <li style="background-color: #F8D7DA;color: black;" class=" d-inline-block p-2 mb-3 me-3 rounded-4">${el}</li>
    `;
  });

  let myShow = `
    <div class="col-md-4 text-white">
                <img src="${strMealThumb}" class="w-100 rounded-4" alt="">
                <h1>${strMeal}</h1>
            </div>
            <div class="col-md-8 text-white">
                <h1>Instractions</h1>
                <p>${strInstructions}</p>
                <h2>Area : ${strArea}</h2>
                <h2>Category : ${strCategory}</h2>
                <h2>Recipes  : </h2>
                <ul class="list-unstyled" id="recipeList">
                    
                </ul>
                <h2>Tags  : </h2>
                <ul class="list-unstyled" id="tagsList" >
                     
                </ul>
                <a class="nav-link d-inline-block me-3 text-white" href="${strSource}"><button class="btn text-white " style="background-color: #198754;">Source</button></a>
                <a class="nav-link d-inline-block me-3 text-white" href="${strYoutube}"><button class="btn text-white " style="background-color: #BB2D3B;">Youtube</button></a>
                
            </div>
    `;

  myRow.innerHTML = myShow;
  document.getElementById("recipeList").innerHTML = recipies;
  document.getElementById("tagsList").innerHTML = tags;

  $("#myscreen").fadeOut(1000);
}

//================================================================================
//==================================               ===============================
//==================================     Form      ===============================
//==================================               ===============================
//================================================================================

let formPage = document.getElementById("contactPage");
let content = document.getElementById("formContent");

function showForm() {

    document.getElementById("myRow").innerHTML = " ";
  notShowSearch();
  closeBar();
  content.innerHTML = `
  <form action="" class="text-white ">
                <div class="row g-4 text-white w-75 m-auto " id="">
                    <div class="py-5 my-5">

                    </div>
                    <div class="col-md-6">

                        <input id="nameInput" type="text" placeholder="Enter Your Name" class=" w-100 m-auto form-control ">
                        <div id="nameAlert" class="alert alert-danger w-100 m-auto mt-2 d-none">Wrong Name</div>
                        </div>
                    <div class="col-md-6">

                        <input id="emailInput" type="email" placeholder="Enter Your Email" class=" w-100 m-auto form-control ">
                        <div id="emailAlert" class="alert alert-danger w-100 m-auto mt-2 d-none">this email is not valid</div>

                    </div>
                    <div class="col-md-6">

                        <input id="phoneInput" type="text" placeholder="Enter Your Phone" class=" w-100 m-auto form-control ">
                        <div id="phoneAlert" class="alert alert-danger w-100 m-auto mt-2 d-none">this phone is not valid</div>

                        </div>
                    <div class="col-md-6">

                        <input type="number" placeholder="Enter Your Age" class=" w-100 m-auto form-control " id="ageInput">
                        <div id="ageAlert" class="alert alert-danger w-100 m-auto mt-2 d-none">this age is not valid</div>
                    
                        </div>
                    <div class="col-md-6">

                        <input id="passwordInput" type="password" placeholder="Enter Your password" class=" w-100 m-auto form-control ">
                        <div id="passwordAlert" class="alert alert-danger w-100 m-auto mt-2 d-none">this password is not valid</div>

                        </div>
                    <div class="col-md-6">

                        <input id="rePasswordInput"  type="password" placeholder="Enter Your re Password" class=" w-100 m-auto form-control ">
                        <div id="rePasswordAlert" class="alert alert-danger w-100 m-auto mt-2 d-none">this Repassword is Wrong</div>

                        </div>
                    <div class="text-center">

                        <button id="myButton" disabled class="btn btn-outline-danger">Submit</button>
                    </div>

                </div>
            </form>
  `

  let validNam = false;
  let validAge = false;
  let validEmail = false;
  let validPhone = false;
  let validPassword = false;
  let validRePassword = false;

  let regaexName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/  ;
  let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  let regexAge = /^(\d?[1-9]|[1-9]0)$/;
  let regexPhone= /^01[0125][0-9]{8}$/
  let regexPassword = /^[a-zA-Z0-9!@#$%^&*]{8,24}$/



  let nameInput = document.getElementById("nameInput");
  nameInput.addEventListener("keyup", function () {
    if (regaexName.test(nameInput.value)) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
        validName= true;
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
        validName = false;
    }
    enableButton(validAge ,validEmail ,validName ,validPassword ,validPhone ,validRePassword)
  });


  let emailInput = document.getElementById("emailInput");
  emailInput.addEventListener("keyup", function () {
    if (regexEmail.test(emailInput.value)) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
        validEmail= true;
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
        validEmail = false;
    }
    enableButton(validAge ,validEmail ,validName ,validPassword ,validPhone ,validRePassword)
  });


  let phoneInput = document.getElementById("phoneInput");
  phoneInput.addEventListener("keyup", function () {
    if (regexPhone.test(phoneInput.value)) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
        validPhone= true;
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
        validPhone = false;
    }
    enableButton(validAge ,validEmail ,validName ,validPassword ,validPhone ,validRePassword)
  });




  let ageInput = document.getElementById("ageInput");
  ageInput.addEventListener("keyup", function () {
    if (regexAge.test(ageInput.value)) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
        validAge= true;
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
        validAge = false;
    }
    enableButton(validAge ,validEmail ,validName ,validPassword ,validPhone ,validRePassword)
  });

let mypassword;

  let passwordInput = document.getElementById("passwordInput");
  passwordInput.addEventListener("keyup", function () {

    if (regexPassword.test(passwordInput.value)) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
        validPassword= true;
        mypassword = passwordInput.value;
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
        validPassword = false;
    }
    enableButton(validAge ,validEmail ,validName ,validPassword ,validPhone ,validRePassword)
  });

  let rePasswordInput = document.getElementById("rePasswordInput");
  rePasswordInput.addEventListener("keyup", function () {

    if (regexPassword.test(rePasswordInput.value) && rePasswordInput.value == mypassword) {
      document
        .getElementById("rePasswordAlert")
        .classList.replace("d-block", "d-none");
        validRePassword= true;
    } else {
      document
        .getElementById("rePasswordAlert")
        .classList.replace("d-none", "d-block");
        validRePassword = false;
    }
    enableButton(validAge ,validEmail ,validName ,validPassword ,validPhone ,validRePassword)
  });

  if(validAge && validEmail && validName && validPassword && validPhone && validRePassword){
    console.log(true);
  }

  let myButton = document.getElementById("myButton")
  function enableButton(validAge ,validEmail ,validName ,validPassword ,validPhone ,validRePassword){
    if(validAge && validEmail && validName && validPassword && validPhone && validRePassword){
        myButton.removeAttribute("disabled")
      }
      else{
        myButton.setAttribute("disabled","")
      }

  }

}
