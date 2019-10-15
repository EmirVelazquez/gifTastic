//Master function that will execute only after the DOM has loaded
$(document).ready(function () {
    //Global Variables
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //This array holds the original buttons
    var buttonArray = ["puppy", "kitty", "parrot", "eagle", "lion", "wolf", "elephant", "badger", "racoon", "shark"];
    //This variable holds the user submitted search
    var userSearch = "racoon";
    //This is my API key from GHIPY Developers
    var myApi = "3u7HQLGRJoAsC5pVcaCb93cYkBN01PM8";
    //This is the queryURL we are using, in this case it is GHIPY API
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + myApi + "&q=" + userSearch + "&limit=10";

    //This is the ajax call to the queryURL, will get data from GIPHY API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response.data[0].url);

    });








    //Functions
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //This function goes through the buttonArray, creates new buttons inside buttonholder nav, adds text to the button
    function populateButtons() {
        //This line declares a for loop and runs through the array, if true then code block executes
        for (var i = 0; i < buttonArray.length; i++) {
            //This line creates a new button and puts it inside newButton variable
            var newButton = $("<button>");
            //This line adds a bootstrap class to the button for looks
            newButton.addClass("btn btn-outline-warning");
            //This line places the word inside the button
            newButton.text(buttonArray[i]);
            //This line appends a new button inside the buttonHolder nav
            $("#buttonHolder").append(newButton);
        }


    }

    //Need to make a function that will display the gifs when the user clicks the button

    //Need to make a function that will pause and play the gif after the user clicks on it

    //This function takes the users input on the search bar and puts it into the buttonArray, calls the populateButtons function
    function submitSearch() {
        $("#submitSearch").click(function () {
            buttonArray = [];
            var input = $("#searchBar").val().toLowerCase().trim();
            buttonArray.push(input);
            $("#searchBar").val("");
            populateButtons();
            console.log(buttonArray);
        });
    }












    //Main Process
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //This will call the populateButtons function
    populateButtons();

    //This will call the submitSearch function
    submitSearch();

    //Testing
    console.log(buttonArray);











});
