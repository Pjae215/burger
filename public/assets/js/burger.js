// Functions for handlebars

$(document).ready(function() {

// Add a new burger.
    $("#addburger").on("click", function(event) {
        event.preventDefault();
        
        //Input will be trimmed and changed to uppercase
        var newBurger = {
            burger_name: $("#newburger").val().trim().toUpperCase(),
            devoured: 0
        };

        // Send the POST request.
        $.ajax("/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("You created a burger");
            // Reload the page to get the updated burger list.
            location.reload();
        });
    });
//Devour a burger
$(".eatbutton").on("click", function(event) {
    event.preventDefault();

    var id = $(this).data("id");
    var devouredState = {
        devoured: 1
    };

    // Send the PUT request.
    $.ajax("/burgers/" + id, {
        type: "PUT",
        data: devouredState
    }).then(function() {
        console.log("You ate that burger");
        location.reload();
    });
});
//Remove devoured burger
    $(".remove").on("click", function(event) {
        event.preventDefault();

        var id = $(this).data("id");

        // Send the DELETE request.
        $.ajax({
            type: "DELETE",
            url: "/burgers/" + id
        }).then(function() {
            console.log("You removed this burger ", id);
            // Reload the page to get the updated list
            location.reload();
        });
    });

});