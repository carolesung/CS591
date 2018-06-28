var imgContainer;

var keyWord;
var tmp;
// Call Open Weather Map's API and retrieve weather information regarding city entered
function getWeather() {
    keyWord = document.getElementById("city").value;

    var weatherApiKey = "4fa332758e87cdec01fc85c7f83b5483";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + keyWord +
        "&units=imperial&appid=" + weatherApiKey;
    var Request = new XMLHttpRequest();
    Request.open('GET', queryURL);
    Request.onload = function () {
        var data = JSON.parse(Request.responseText);
        tmp = data["main"]["temp"]


    }
    Request.send();
    getRecipes();
}
// Calling Spoonacular API for recipe title and images
var id; // recipe id
var mashapeKey = 'gxWg7qlVaEmshNrjf4N8tnlehvgNp1C2q20jsnsS9QBde99BIz';
var recipeName;
var recipeImg;
var recipeLink;

function getRecipes() {
    if (tmp > 74){
        keyWord = "Summer"
    } else if(tmp > 58){
        keyWord = "Spring"
    } else if(tmp > 47){
        keyWord = "Fall"
    } else{
        keyWord = "Winter"
    }
    var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?instructionsRequired=true&limitLicense=false&number=18&offset=0&query=" + keyWord;
    var Request = new XMLHttpRequest();
    Request.open('GET', queryURL);
    Request.setRequestHeader("X-Mashape-Key",mashapeKey)
    Request.onload = function () {
        var recipes = JSON.parse(Request.responseText);
        var i;
        console.log(recipes)
        for (i = 0; i < 18; i++) {
            id = recipes["results"][String(i)]["id"]
            console.log(id)
            recipeName = recipes["results"][String(i)]["title"]
            recipeImg = recipes["results"][String(i)]["image"]
            getURL(i,id)
            renderHTML(i, recipeName, recipeImg);
        }

    }
    Request.send();
}
function getURL(i,id) {
    var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + String(id) + "/information?includeNutrition=false";
    var Request = new XMLHttpRequest();
    Request.open('GET', queryURL);
    Request.setRequestHeader("X-Mashape-Key",mashapeKey)
    Request.onload = function () {
        var recipes = JSON.parse(Request.responseText);
        recipeLink = recipes["spoonacularSourceUrl"]
        console.log(recipes)
        renderHTMLURL(i,recipeLink);

    }
    Request.send();
}


function renderHTML(i,name,img) {
    imgContainer = document.getElementById(String(i))
    imgContainer.src = "https://spoonacular.com/recipeImages/"+img;
    var titleContainer = document.getElementById("h"+String(i))
    titleContainer.innerHTML = name
}
function renderHTMLURL(i,url){
    console.log(url)
    var linkContainer = document.getElementById("url"+String(i))
    linkContainer.href = url
}