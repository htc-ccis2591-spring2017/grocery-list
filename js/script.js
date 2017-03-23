$(function() {
  const $groceryList = $(`#grocery-list`);
  const $btnAddItem = $(`#btn-add-item`);
  const $addItemButton = $(`#btn-add-item button`);
  const $fmAddItem = $(`#fm-add-item`);
  const $item = $(`#item`);
  const $add = $(`#add`);

  $fmAddItem.hide();

  let data = localStorage.getItem(`groceries`);
  console.log(data);
  if (data != null) {
    $groceryList.empty();
    let saveData = JSON.parse(data);
    for (x of saveData) {
      $groceryList.append(`<li>${x}</li>`);
    }
    localStorage.setItem(`groceries`, data);
    console.log(data);
  }
  removeItem();

  $addItemButton.css(`cursor`, `pointer`).click(function() {
    $fmAddItem.show();
    $btnAddItem.hide();
  });

  $add.css(`cursor`, `pointer`).click(function(e) {
    e.preventDefault();
    $btnAddItem.show();
    $fmAddItem.hide();
    $groceryList.append(`<li>` + $item.val() + `</li>`);
    $item.val(``);
    storeList();
    removeItem();
  });

  function removeItem() {
    $groceryList.children().css(`cursor`, `pointer`).click(function() {
      $(this).remove();
      storeList();
    });
  };

  function storeList() {
    let listArray = [];
    $groceryList.children().each(function() {
      listArray.push($(this).text())
      console.log(listArray);
    });

    let listString = JSON.stringify(listArray);
    localStorage.setItem(`groceries`, listString);
  }

});
