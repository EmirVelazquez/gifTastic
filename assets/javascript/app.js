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
                //This line makes variable to place div inside (this will hold gif and rating)
                gifCard = $("<div>");
                //This line give the div a class= "card"
                gifCard.addClass("card");
                //This line places card inside container holding gifs
                $("#gifDisplay").append(gifCard);
                //This line places the gif inside a local variable (still Gif)
                gifStill = response.data[i].images.fixed_height_still.url;
                //This line places the gif inside a local variable (animated Gif)
                gifAnimated = response.data[i].images.fixed_height.url;
                //This line will make a local variable to hold the new image element that holds the displayed gifStill, data-state, data-still, data-animate
                gifContainer = $("<img>").attr("src", gifStill).addClass("gif").attr("data-state", "still").attr("data-still", gifStill).attr("data-animate", gifAnimated);
                //This line will append the gif inside the card       
                gifCard.append(gifContainer);
                //This line will make a new local variable to hold the new figcaption element that holds the rating
                ratingContainer = $("<figcaption>Rating: " + response.data[i].rating.toUpperCase() + "</figcaption>");
                //This line will display the rating after the gif
                gifCard.append(ratingContainer);
                //Test
                console.log(gifContainer);
            };
            //This on click event handler replaces data-still displayed gif to data-animate when user clicks on gif(similar to pause and play)
            $(".gif").on("click", function () {
                //This line makes a variable called state that holds the current data-state the gif has when it is clicked
                var state = $(this).attr("data-state");
                //This if statement says that if data-state inside of state variable is equal to "still" then run this code block
                if (state === "still") {
                    //Gets the source url gif and swaps it to the data-animate gif
                    $(this).attr("src", $(this).attr("data-animate"));
                    //This sets the data-state to animate, code block ends
                    $(this).attr("data-state", "animate");
                    //If state !== "still" then this code block runs
                } else {
                    //Gets the source url gif and swaps it to the data-still gif
                    $(this).attr("src", $(this).attr("data-still"));
                    //This sets the data-state to still, code block ends
                    $(this).attr("data-state", "still");
                }
            });
        });
    }





    //Main Process
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //This will call the populateButtons function
    populateButtons();

    //This click event listener is for all elements with the ID 'buttonId', will work for dynamically generated elements
    $(document).on("click", "#buttonId", displayButtonGifs);










});
