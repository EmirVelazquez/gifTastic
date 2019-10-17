/*Master function that will execute only after the DOM has loaded */
$(document).ready(function () {
    //Global Variables
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //This array holds the original buttons displayed when DOM loads
    var buttonArray = ["puppy", "kitty", "parrot", "eagle", "lion", "wolf", "elephant", "badger", "racoon", "shark"];

    //Functions
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //This function goes through the buttonArray, creates new buttons inside buttonholder nav, adds text to the button
    function populateButtons() {
        //This will empty the buttonHolder container in the html to prevent repeat buttons
        $("#buttonHolder").empty();

        //This line declares a for loop and runs through the array, if true then code block executes
        for (var i = 0; i < buttonArray.length; i++) {
            //This line creates a new button and puts it inside newButton variable
            var newButton = $("<button>");
            //This line adds a bootstrap class to the button just for style
            newButton.addClass("btn btn-outline-warning");
            //This line will ad an ID to the button
            newButton.attr("id", "buttonId");
            //This line will add a data-attribute to the button, will be used to pull the name from button to request API data
            newButton.attr("button-name", buttonArray[i]);
            //This line places the word inside the button
            newButton.text(buttonArray[i]);
            //This line appends a new button inside the buttonHolder nav
            $("#buttonHolder").append(newButton);
        }
    }


    //This event handler takes the users input on the text bar and puts it into the buttonArray, calls the populateButtons function
    $("#submitText").on("click", function (event) {
        //This line prevents the user from trying to submit the form, user can hit enter on keyboard or click button
        event.preventDefault();
        //This line takes the value from textbox, makaes it lower case, trims any spaces, and places in variable 'input'
        var input = $("#textBar").val().toLowerCase().trim();
        //This line will push the input into the existing buttonArray global variable
        buttonArray.push(input);
        //This line will empty the textbox so the user doesn't need to delete contents after every submission
        $("#textBar").val("");
        //This line will call the populateButtons function to display the new button added
        populateButtons();
        console.log(buttonArray);
    });

    /*This function will capture the button name from the data-attribute(button-name) added to the buttons
    then pull Data from GHIPY API and display it on the DOM*/
    function displayButtonGifs() {
        //This line is making a local var userRequest and placing the button name inside of said variable
        var userRequest = $(this).attr("button-name");
        //This is my API key from GHIPY Developers
        var myApi = "3u7HQLGRJoAsC5pVcaCb93cYkBN01PM8";
        //This is the queryURL we are using, in this case it is GHIPY API, I set a limit of 10 requested Gifs
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + myApi + "&q=" + userRequest + "&limit=10";

        //This line will clear the gifDisplay container each time user clicks new button to request gifs
        $("#gifDisplay").empty();

        //This is the ajax call to the queryURL, will get data from GIPHY API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            //This for loop will execute for the length of the data requested from GHIPY API which was limited to 10
            for (var i = 0; i < response.data.length; i++) {
                //This line will make a new local variable to hold the new figcaption element that holds the rating
                var ratingContainer = $("<figcaption>Rating: " + response.data[i].rating + "</figcaption>");
                //This line will display the rating after the gif
                $("#gifDisplay").append(ratingContainer);
                //This line places the first out of ten gifs inside a local variable
                var gifUrl = response.data[i].images.fixed_height.url;
                //This line will make a local variable to hold the new image element that holds the gif
                var gifContainer = $("<img>").attr("src", gifUrl);
                //This line will append inside of the HTML container id gifDisplay
                $("#gifDisplay").append(gifContainer);
                // emptyGifContainer();
            }
        });
    }

    //Need to make a function that will pause and play the gif after the user clicks on it







    //Main Process
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //This will call the populateButtons function
    populateButtons();

    //This click event listener is for all elements with the ID 'buttonId', will work for dynamically generated elements
    $(document).on("click", "#buttonId", displayButtonGifs);










});
