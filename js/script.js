$(document).ready(function () {
    //click to remove item.
    $("#grocery-list").on("click", "li", function () {
        let groceryItem = $(this).text();
        let index = itemList.indexOf(groceryItem);
        if (groceryItem == itemList[index]) {
            itemList.splice(index, 1);
            $(this).remove();
            saveList();
        }
    });
    //hides add button and shows form.
    $("#btn-add-item").on("click", function () {
        $("#fm-add-item").show();
        $("#btn-add-item").hide();
    });
    //appends input item to the grocery list.
    let itemForm = document.querySelector("form");
    itemForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let stringIn = document.getElementById("item").value;
        if (stringIn == "") { //no blank items in our list
            alert("You didn't enter an item.\n Please enter an item before clicking Add.");
        } else {
            let newItem = stringIn.charAt(0).toUpperCase() + stringIn.slice(1);
            let node = document.createElement("li");
            let nodeText = document.createTextNode(newItem);
            console.log("Adding " + newItem);
            node.appendChild(nodeText);
            document.getElementById("grocery-list").appendChild(node);
            itemList.push(newItem);
            saveList();
            let form = document.getElementById("fm-add-item");
            form.reset();
            $("#fm-add-item").hide();
            $("#btn-add-item").show();
        }
    });
    itemList = [];
    $("#fm-add-item").hide();
    let retrievedData = localStorage.getItem("groceryItems");
    console.log(retrievedData);
    //creates array if one doesn't already exist.
    if (retrievedData == null) {
        $("#grocery-list").children().each(function () {
            let $thisItem = $(this).text();
            itemList.push($thisItem);
        });
        saveList();
    } else { //clears list and creates new from storage.
        itemList = JSON.parse(retrievedData);
        $("#grocery-list").empty();
        for (i = 0; i < itemList.length; i++) {
            let myItem = itemList[i];
            let node = document.createElement("li");
            let nodeText = document.createTextNode(myItem);
            node.appendChild(nodeText);
            document.getElementById("grocery-list").appendChild(node);
        }
    }
});
//Saves list to storage.
function saveList() {
    console.log("Changes made. Storing list.")
    console.log(itemList);
    localStorage.setItem("groceryItems", JSON.stringify(itemList));
}