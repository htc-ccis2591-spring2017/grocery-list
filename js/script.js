//Worked with Josh Hight on this assignment
 
$(document).ready(function () {
 
//Hide the form first
$("#fm-add-item").hide();
 
//Initiate the empty array
let itemList=[];
 
//Retrive the data from local storage
let retrivedValue = localStorage.getItem("itemList");
 
//Pull from the list in HTML
if (retrivedValue == null)
        $("#grocery-list").children().each(function() {
            let item = $(this).text();
            itemList.push(item);
        });
 
 
    else {
 
        itemList = JSON.parse(retrivedValue);
       
        $("#grocery-list").empty();
       
        for (i = 0; i < itemList.length; i++) {
            let addObject = itemList[i];
            let Item = document.createElement("li");
            let Text = document.createTextNode(addObject);
            Item.appendChild(Text);
            document.getElementById("grocery-list").appendChild(Item);
        }  
    };
 
//Create a function to remove list item when clicked - not sure how to do this
   
    
    
    
    
 
//Clicking the Add Item button to show/hide
    $("#btn-add-item").on("click", function () {
      
        //Hide Add Item button, show form
        $("#fm-add-item").show();
        $("#btn-add-item").hide();
    });  
 
//Clicking on the Add/Submit button to save data to local storage and list
 
    $("#add").on("click", function () {
      
        let txtBoxItem = $("#item").val();
        $("#grocery-list").append("<li>" + txtBoxItem + "</li>");
       
        
        //return false;
        saveToLocalStorage();
       
        //Hide form and show Add Item button
        $("#fm-add-item").hide();
        $("#btn-add-item").show();
       
        //Reset the form
        $("#fm-add-item")[0].reset();
        event.preventDefault();
    });  
    
//Make a function to save list to Local Storage
 
    function saveToLocalStorage() {
 
        let list = [];
        let saveList = [];
        //Add the li elements to the list
        list = document.getElementById("grocery-list").getElementsByTagName("li")
        //Make a loop to add all the li elements to the list
        for (i = 0; i < list.length; i++) {
            saveList.push($(list[i]).text());
        }
        //Save to LS
        localStorage.setItem("itemList", JSON.stringify(saveList));
    };
 
   
 
   
//**FOR TESTING PURPOSES** Console log to see what current storage variables are to test to see if things are working
var i;
 
console.log("local storage");
for (i = 0; i < localStorage.length; i++)   {
    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
}
 
console.log("session storage");
for (i = 0; i < sessionStorage.length; i++) {
    console.log(sessionStorage.key(i) + "=[" + sessionStorage.getItem(sessionStorage.key(i)) + "]");
}
   
 
 
   
});