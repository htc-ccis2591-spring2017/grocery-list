$(function () {
    'use strict';
    let grocery_list = []; // Global Array for grocery list
    let list_data = sessionStorage.getItem("list"); // Global Array for JSON data.
    if (list_data == null) {
        grocery_list = [];
    } else {
        grocery_list = $.parseJSON(list_data);
        load_list()
    }

    hide_form();

    // Updates the grocery list array, and adds the new item.
    function update_list(add_item) {
        for (let i = 0; i < $("#grocery-list li").length; i++) {
            grocery_list.push($("#grocery-list li").eq(i).text());
        }
        grocery_list.push(add_item);
    }

    // Add item to list 
    function load_list() {
        $("#grocery-list li").remove() // clear default list
        for (let i = 0; i < grocery_list.length; i++) {
            $("#grocery-list").append('<li>' + grocery_list[i] + '</li>');
        }
        grocery_list = []; // Once the list is loaded, clear out the grocery list. 
    }

    // Hide inputs for form on load
    function hide_form() {
        $("#fm-add-item input").hide();
    }

    // Remove items from list when clicked

    $("#grocery-list li").click(function () {
        $(this).remove();
    })

    // When 'Add Item' Button is clicked, hide button, show the form.
    $("#btn-add-item").click(function () {
        $("#fm-add-item input").show();
        $("#btn-add-item").hide();
    })

    // When 'Add' button on form is clicked, add item to list and hide form.
    $("#add").click(function () {
        let textbox = $("#item");
        update_list(textbox.val());
        sessionStorage.setItem("list", JSON.stringify(grocery_list));
    })

});