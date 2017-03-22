/*jslint browser: true*/
/*global $, jQuery, alert*/
//This will add the item in the textbox to the list
$(document).ready(function() {

    //If there is no stored data, pull from the list in the HTML
    let storedData = localStorage.getItem("groceryList");
    if (storedData == null)
        $("#grocery-list").children().each(function() {
            let $thisItem = $(this).text();
            itemList.push($thisItem);
        });
    //Otherwise, use the stored data
    else {
        itemList = JSON.parse(storedData);
        $("#grocery-list").empty();
        for (i = 0; i < itemList.length; i++) {
            let jsonObjectAdd = itemList[i];
            let listItem = document.createElement("li");
            let listText = document.createTextNode(jsonObjectAdd);
            listItem.appendChild(listText);
            document.getElementById("grocery-list").appendChild(listItem);
        }
    }

    //form submit

    $("#fm-add-item").submit(function() {
        let toAdd = $("#item").val();
        $("#grocery-list").append('<li>' + toAdd + '</li>');
        $("#fm-add-item").hide();
        $("#btn-add-item").show();
        //make your list
        event.preventDefault();
        createList();
    });

    //add item button click

    $("#btn-add-item").click(function() {
        $("#fm-add-item").show();
        $("#btn-add-item").hide();
    });


    //this will get the li item in the ul to remove it

    function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement;
    }

    var ul = document.getElementById('grocery-list');
    ul.onclick = function(event) {
        let target = getEventTarget(event);
        $(target).remove();
        createList();
    };

    //Make the list every time the form is submitted to we can save it 

    function createList() {
        let listToSave = [];
        listToSave = document.getElementById("grocery-list").getElementsByTagName("li")
        let newList = []
        for (i = 0; i < listToSave.length; i++) {
            newList.push($(listToSave[i]).text());
        }
        //save to local storage
        localStorage.setItem("groceryList", JSON.stringify(newList));

    };

});