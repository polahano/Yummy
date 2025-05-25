//* Home
loopArray("https://www.themealdb.com/api/json/v1/1/search.php?s=", "meals");

let cards = "";
let mealsCardsElements = "";
let clickedCardName = "";
let clickedMealObject = "";

async function getData(url, arrName) {
  let response = await fetch(url);
  let data = await response.json();
  let arr = data[arrName];
  if (arr[0].idIngredient) {
    arr = data[arrName].slice(0, 20);
  }
  return arr;
}

async function loopArray(url, arrName) {
  let arr = await getData(url, arrName);
  //www.themealdb.com/api/json/v1/1/lookup.php?i=52772
  for (element of arr) {
    console.log(element);

    await display(element)
  }

  navigate(arr);

}


async function display(element) {
  if (element.idMeal) {
    let recipeImage = await element.strMealThumb;
    let recipeName = await element.strMeal;
    addCardInDOM(recipeImage, recipeName, null, "meal")
  } else if (element.idIngredient) {
    let ingredientName = element.strIngredient;
    let ingredientDesc = element.strDescription;
    addCardInDOM("", ingredientName, ingredientDesc, "ingredient")
  } else if (element.idCategory) {
    let categoryImage = await element.strCategoryThumb;
    let categoryName = await element.strCategory;
    let categoryDesc = await element.strCategoryDescription;
    addCardInDOM(categoryImage, categoryName, categoryDesc, "category")
  } else if (element.strArea) {
    let areaName = await element.strArea;
    addCardInDOM(null, areaName, "", "area");
  }
}


function addCardInDOM(image, name, description, elementType) {
  cards = document.querySelector(".visible .cards-container");
  let card = "";

  let mealCard = `<div class="card col-6 col-md-3">
            <div
              class="card-content bg-danger rounded-2 position-relative overflow-hidden"
            >
              <img
                src="${image}"
                alt=""
                class="card-img w-100"
              />
              <div
                class="card-layer rounded-2 position-absolute start-0 top-100 text-black d-flex justify-content-center align-items-center w-100 fs-1"
              >
                <p>${name}</p>
              </div>
            </div>
          </div>`

  let categoryCard = `<div class="card col-6 col-md-3">
            <div
              class="card-content bg-danger rounded-2 position-relative overflow-hidden"
            >
              <img
                src="${image}"
                alt=""
                class="card-img w-100"
              />
              <div
                class="card-layer rounded-2 position-absolute start-0 top-100 text-black d-flex flex-column justify-content-center align-items-center w-100 fs-1"
              >
                <p>${name}</p>
                <p class="fs-6 px-3" style="overflow: hidden;">${description}</p>
              </div>
            </div>
          </div>`

  let areaCard = `<div class="card col-6 col-md-4">
            <div
              class="card-content bg-danger rounded-2 d-flex justify-content-center align-items-center gap-2 py-2"
            >
            <i class="fa-solid fa-globe fs-1"></i>
                <p class="fs-1">${name}</p>
            </div>
          </div>`

  let ingredientCard = `<div class="card col-6 col-md-3">
            <div
              class="card-content bg-danger rounded-2 d-flex flex-column align-items-center p-3 overflow-hidden" style="height: 200px"
            >
                <i class="fa-solid fa-globe fs-1"></i>
                <p class="fs-3">${name}</p>
                <p class="fs-6" style="line-height: 18px; max-height: 54px; overflow: hidden;">${description}</p>
            </div>
          </div>`

  switch (elementType) {
    case "meal":
      card = mealCard;
      break;
    case "ingredient":
      card = ingredientCard;
      break;
    case "category":
      card = categoryCard;
      break;
    case "area":
      card = areaCard;
      break;
  }

  cards.innerHTML += card;
}




//* NavBar ******************************************************

let menuBtn = document.getElementById("show-menu");
let verticalNav = document.querySelector(".vertical-nav");
function closeMenu() {
  verticalNav.style.transform = "translateX(-80%)";
  menuBtn.classList.replace("fa-close", "fa-bars");
}

menuBtn.addEventListener("click", function () {
  console.log(verticalNav.style.transform);

  if (verticalNav.style.transform == "translateX(0%)") {
    closeMenu();
  } else {
    menuBtn.classList.replace("fa-bars", "fa-close");
    verticalNav.style.transform = "translateX(0%)";
  }
})




//* Search***********************************************
document.querySelector("#search-section").addEventListener("click", function () {
  document.querySelector(".visible").classList.toggle("visible");
  document.querySelector("section.search").classList.toggle("visible");
  closeMenu()
})

document.querySelector("#search-by-name").addEventListener("input", async function () {
  cards.innerHTML = "";
  let x = document.querySelector("#search-by-name").value;
  await loopArray(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`, "meals");
  if (x == "") {
    cards.innerHTML = "";
  }
})

document.querySelector("#search-by-first-letter").addEventListener("input", async function () {
  cards.innerHTML = "";
  let x = document.querySelector("#search-by-first-letter").value;
  await loopArray(`https://www.themealdb.com/api/json/v1/1/search.php?f=${x}`, "meals");
  if (x == "") {
    cards.innerHTML = "";
  }
})



//* Categories ********************* */
document.querySelector("#categories-section").addEventListener("click", async function () {
  cards.innerHTML = "";
  document.querySelector(".visible").classList.toggle("visible");
  document.querySelector("section.categories").classList.toggle("visible");
  await loopArray(`https://www.themealdb.com/api/json/v1/1/categories.php`, "categories");
  closeMenu();
})

//* Areas ********************* */
document.querySelector("#areas-section").addEventListener("click", async function () {
  cards.innerHTML = "";
  document.querySelector(".visible").classList.toggle("visible");
  document.querySelector("section.areas").classList.toggle("visible");
  await loopArray(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`, "meals");
  closeMenu();
})

//* Ingredients ********************* */
document.querySelector("#ingredients-section").addEventListener("click", async function () {
  cards.innerHTML = "";
  document.querySelector(".visible").classList.toggle("visible");
  document.querySelector("section.ingredients").classList.toggle("visible");
  await loopArray(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`, "meals");
  closeMenu();
})

//* Contact ********************* */
document.querySelector("#contact-section").addEventListener("click", async function () {
  document.querySelector(".visible").classList.toggle("visible");
  document.querySelector("section.contact").classList.toggle("visible");
  closeMenu();
})


//** Clicking card to show recipe details ********************************* */

function openDetailsPage(meal) {

  let ingredientsElements = "";
  let t = meal.strTags
  let tagsArr = "";
  let tagsElements = "";
  if (meal.strTags) {
    tagsArr = t.split(',');
    console.log(tagsArr);

    tagsArr.forEach(function (tag) {
      tagsElements += `<p class="bg-danger-subtle rounded-2 p-2 text-black d-inline-block">${tag}</p>`
    })
  } else {
    tagsElements += `<p class="p-2 d-inline-block">No Tags!</p>`
  }


  for (let i = 1; i <= 20; i++) {
    let m = `strIngredient${i}`
    let m1 = `strMeasure${i}`

    if (meal[m] != "") {
      let ingredient = `${meal[m1]} - ${meal[m]}`
      ingredientsElements += `<p class="bg-primary-subtle rounded-2 p-2 text-black d-inline-block">${ingredient}</p>`
    }
  }

  let detailsPage = `<div class="container mt-4 text-white">
        <div class="row">
          <div class="col-4 d-flex flex-column align-items-center">
            <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-2" />
            <h1>${meal.strMeal}</h1>
          </div>
          <div class="col-8">
            <h2>Instruction</h2>
            <p>${meal.strInstructions}</p>
            <h2>Area: <span>${meal.strArea}</span></h2>
            <h2>Category: <span>${meal.strCategory}</span></h2>
            <h2>Recipies:</h2>
            <div class="recipes d-flex gap-2 flex-wrap">${ingredientsElements}</div>
            <h2>Tags:</h2>
            <div class="tags d-flex gap-2 flex-wrap">${tagsElements}</div>
            <br/>
            <a href="${meal.strSource}" target="_blank" class="btn btn-danger">Source</a>
            <a href="${meal.strYoutube}" target="_blank" class="btn btn-success">Youtube</a>
          </div>
        </div>
      </div>`

  document.querySelector(".visible").classList.toggle("visible");
  document.querySelector("section.recipe-details").classList.toggle("visible");
  document.querySelector("section.recipe-details").innerHTML = detailsPage;
  document.querySelector(".vertical-nav").style.transform = "translateX(-80%)";

}


//*** go to meals from categories */

function navigate(arr) {

  // **** go to details page
  cardsElements = document.querySelectorAll(".card");
  let cardsArr = Array.from(cardsElements);
  cardsArr.forEach(function (elem) {
    elem.addEventListener("click", function (arg) {
      clickedCardName = arg.currentTarget.querySelector(".card-content p").innerHTML;

      arr.forEach(async function (obj) {
        if (clickedCardName == obj.strMeal) {
          let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${obj.idMeal}`)
          let data = await response.json()
          let mealArrById = data["meals"];
          clickedMealObject = mealArrById[0];
          openDetailsPage(clickedMealObject);
        } else if (clickedCardName == obj.strIngredient) {
          document.querySelector("section.ingredients").classList.toggle("visible");
          document.querySelector("section.home").classList.toggle("visible");
          loopArray(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${clickedCardName}`, "meals")
        } else if (clickedCardName == obj.strCategory) {
          document.querySelector("section.categories").classList.toggle("visible");
          document.querySelector("section.home").classList.toggle("visible");
          loopArray(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${clickedCardName}`, "meals")
        } else if (clickedCardName == obj.strArea) {
          document.querySelector("section.areas").classList.toggle("visible");
          document.querySelector("section.home").classList.toggle("visible");
          loopArray(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${clickedCardName}`, "meals")
        }
      })
    })
  })
}

submit()

//** validation  ******** */
function submit() {

  let fullNameInput = document.querySelector("#full-name");
  let emailInput = document.querySelector("#email");
  let passwordInput = document.querySelector("#password");
  let confirmPasswordInput = document.querySelector("#confirm-password");
  let registerBtn = document.querySelector("#submitBtn")
  let emailValidated = false;
  let fullnameValidated = false;
  let phoneValidated = false;

  console.log(fullNameInput);

  fullNameInput.addEventListener("input", function () {
    validateFullname()
    register()
  })
  confirmPasswordInput.addEventListener("input", function () {
    validatePassword()
    register()
  })
  emailInput.addEventListener("input", function () {
    validateMail()
    register()
  })
  passwordInput.addEventListener("input", function () {
    validatePassword()
    register()
  })

  document.querySelector("#phone").addEventListener("input", function () {
    // /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/g
    let phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/ig;
    console.log(this);

    var phone = this.value;
    phoneValidated = phoneRegex.test(phone);

    if (phone) {
      if (phoneValidated) {
        this.classList.add("is-valid")
        this.classList.remove("is-invalid")
      } else {
        this.classList.add("is-invalid")
        this.classList.remove("is-valid")
      }
    } else {
      this.classList.remove("is-valid", "is-invalid");
    }
    register()
  })


  registerBtn.addEventListener("click", register)

  function register() {
    validateInputs()
    if (!(fullNameInput.value && passwordInput.value && confirmPasswordInput.value && emailInput.value)) {
      // alert("Please Enter all Inputs")

    }
    if (emailValidated && fullnameValidated && passwordValidated && phoneValidated) {
      registerBtn.removeAttribute("disabled")
    } else {
      registerBtn.setAttribute("disabled", "true")
    }


  }


  function validateInputs() {
    validateFullname()
    validateMail()
    validatePassword();
  }

  function validateFullname() {
    let fullnameRegex = /^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/ig;
    var fullname = fullNameInput.value;
    fullnameValidated = fullnameRegex.test(fullname);

    if (fullname) {
      if (fullnameValidated) {
        fullNameInput.classList.add("is-valid")
        fullNameInput.classList.remove("is-invalid")
      } else {
        fullNameInput.classList.add("is-invalid")
        fullNameInput.classList.remove("is-valid")
      }
    } else {
      fullNameInput.classList.remove("is-valid", "is-invalid");
    }
  }

  function validatePassword() {
    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;
    passwordValidated = password.length < 8 ? false : true;

    if (password) {
      if (passwordValidated) {
        passwordInput.classList.add("is-valid")
        passwordInput.classList.remove("is-invalid")
      } else {
        passwordInput.classList.add("is-invalid")
        passwordInput.classList.remove("is-valid")
      }
    } else {
      passwordInput.classList.remove("is-valid", "is-invalid");
    }
    if (confirmPassword) {
      if (passwordValidated && confirmPassword == password) {
        confirmPasswordInput.classList.add("is-valid")
        confirmPasswordInput.classList.remove("is-invalid")
      } else {
        confirmPasswordInput.classList.add("is-invalid")
        confirmPasswordInput.classList.remove("is-valid")
        passwordValidated = false;
      }
    } else {
      confirmPasswordInput.classList.remove("is-valid", "is-invalid");
    }
  }



  function validateMail() {
    var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig;
    var email = emailInput.value;
    emailValidated = emailRegex.test(email);

    if (email) {
      if (emailValidated) {
        emailInput.classList.add("is-valid")
        emailInput.classList.remove("is-invalid")
      } else {
        emailInput.classList.add("is-invalid")
        emailInput.classList.remove("is-valid")
      }
    } else {
      emailInput.classList.remove("is-valid", "is-invalid");
    }
  }
}
