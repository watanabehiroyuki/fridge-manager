// -- render/renderFridgeItemSort.js

function renderFridgeItemSortCategory() {
  const sortCategory = document.getElementById('fridgeItemsSortCategory');
  if (!sortCategory) return;

  const fridgeItems = document.querySelectorAll('.m-fridge-detail-form');
  if (!fridgeItems.length) return;

  const sortChecked = sortCategory.querySelectorAll('input[type="checkbox"]:checked');
  const checkArray = Array.from(sortChecked).map((check) => check.value);

  fridgeItems.forEach((fridgeItem) => {
    const fridgeItemCategory = fridgeItem.querySelector('select[name="fridgeItemCategory"]').value;
    if(checkArray.includes(fridgeItemCategory)){
      fridgeItem.classList.remove('is-hidden');
    } else if(checkArray.includes('全て')) {
      fridgeItem.classList.remove('is-hidden');
    } else {
      fridgeItem.classList.add('is-hidden');
    }
  })
}


function renderFridgeItemSortLimit() {
  const sortLimit = document.getElementById('fridgeItemsSortLimit');
  if (!sortLimit) return;

  const sortChecked = sortLimit.querySelector('input[type="radio"]:checked')?.value;
  if (!sortChecked) return;

  const fridgeList = document.getElementById('fridgeItemsList');
  if (!fridgeList) return;

  const fridgeItems = fridgeList.querySelectorAll('.m-fridge-detail-form');
  if (!fridgeItems.length) return;

  const array = Array.from(fridgeItems);
  const newArray = array.map((fridgeItem) => {
    const date = fridgeItem.querySelector('input[name="fridgeItemExpirationDate"]').value;
    return { date:date, i:fridgeItem };
  });

  if (sortChecked === "降順"){
    newArray.sort((a, b) => new Date(b.date) - new Date(a.date))
  } else if (sortChecked === "昇順") {
    newArray.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  newArray.forEach((item) => fridgeList.appendChild(item.i));
}

export { renderFridgeItemSortCategory }
export { renderFridgeItemSortLimit }




