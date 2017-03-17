/*  CCIS 2591 - JavaScript
    Grocery List Assignment
    Cheryl Davis
*/

$(document).ready(function(){
  itemList = [];
  $("#fm-add-item").hide();
  let retrievedData = localStorage.getItem("groceryItems");
  console.log(retrievedData);
  if (retrievedData == null) { //create array of list items if none found in localstorage
    $("#grocery-list").children().each(function(){
      let $thisItem = $(this).text();
      itemList.push($thisItem);
    });
      saveList();
      console.log("Created itemList from html");
  }
  else { //remove existing children of #grocery-list & create new from localStorage list
    console.log("Creating htlm list from localStorage");
    itemList = JSON.parse(retrievedData);
    $("#grocery-list").empty();
    for (i = 0; i < itemList.length; i++){
      let myItem = itemList[i];
      let node = document.createElement("li");
      let nodeText = document.createTextNode(myItem);
      node.appendChild(nodeText);
      document.getElementById("grocery-list").appendChild(node);
    }
  }
//shows form when Add Item clicked & hides Add Item button
  $("#btn-add-item").on("click",function(){
    $("#fm-add-item").show();
    $("#btn-add-item").hide();
  });
  //removes an item from array & list when item is clicked
    $("#grocery-list").on("click", "li", function(){
      let clickedItem = $(this).text();
      let index = itemList.indexOf(clickedItem);
      console.log("Removing " + clickedItem);
      if (clickedItem == itemList[index]) {
        itemList.splice(index, 1);
        $(this).remove();
        saveList();
      }
    });
//event handler-responds to form Add button, submitting a new item to list
  let itemForm = document.querySelector("form");
  itemForm.addEventListener("submit", function(event){
    event.preventDefault();
    let stringIn = document.getElementById("item").value;
    if (stringIn == ""){ //no blank items in our list
        alert("You didn't enter an item.\n Please enter an item before clicking Add.");
    }
    else{
      let newItem = stringIn.charAt(0).toUpperCase() + stringIn.slice(1);
      let node = document.createElement("li");
      let nodeText = document.createTextNode(newItem);
      console.log("Adding " + newItem);
      node.appendChild(nodeText);
      document.getElementById("grocery-list").appendChild(node);
      itemList.push(newItem);
      saveList();
      let form = document.getElementById("fm-add-item");
      form.reset(); //clear input field of text
      $("#fm-add-item").hide();
      $("#btn-add-item").show();
    }
  });
});//end program
//function to save list to localStorage
function saveList(){
  console.log("Changes made. Storing list.")
  console.log(itemList);
  localStorage.setItem("groceryItems", JSON.stringify(itemList));
}
