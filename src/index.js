/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import _, { isArray } from 'lodash';
import './style.css';

const itemContainer = document.querySelector('.item-container');
const addItemInput = document.getElementById('add-item');
const priceInput = document.getElementById('price');
const addBtn = document.getElementById('add-btn');
const clearAllBtn = document.getElementById('clear-all-btn');
const totalPrice = document.getElementById('total-price');
let storeItems = JSON.parse(localStorage.getItem('Tasks')) || [];
const errorMessage = document.getElementById('error-message');
const itemHeader = document.getElementById('items-header');
const titleContainer = document.querySelector('.total-container');

const storeLocalstorage = (storeItems) => {
  localStorage.setItem('Tasks', JSON.stringify(storeItems));
};

function removeItem(index) {
  storeItems.splice(index, 1);
  storeLocalstorage(storeItems);
  showItems();
}

const totalSum = (storeItems) => {
  let total = 0;
  storeItems.forEach((item) => {
    total += parseFloat(item.price);
  });
  return total;
};

const readOnly = (itemLists, priceLists) => {
  itemLists.forEach((itemList) => {
    itemList.readOnly = true;
  });

  priceLists.forEach((priceList) => {
    priceList.readOnly = true;
  });
};

const addTitle = (storeItems) => {
  if (storeItems.length > 0) {
    titleContainer.classList.add('show-screen');
    itemHeader.classList.add('show-screen');
  } else {
    titleContainer.classList.remove('show-screen');
    itemHeader.classList.remove('show-screen');
  }
};

const showItems = () => {
  itemContainer.innerHTML = '';
  addTitle(storeItems);
  storeItems.forEach((item, index) => {
    itemContainer.innerHTML += `<div class="item-wrapper d-flex justify-content-between flex-column text-center  row">
    <div class="item d-flex justify-content-around">
        <input type="text" value="${item.description}" class="item-list">
        <input class="price" type="text" value="${item.price} Kyats">

    </div>
    <div class="button-container d-flex justify-content-center mt-4">
        <button class="btn btn-primary me-2 edit-btn">Edit</button>
        <button class="btn btn-primary remove-btn">Delete</button>
    </div>
    </div>`;
  });

  const removeReadonly = (currentItem, currentValue) => {
    currentItem.readOnly = false;
    currentValue.readOnly = false;
  };

  const updateValues = (items, itemValue, priceValue, index) => {
    const updatedItems = [...items];
    updatedItems[index].description = itemValue;
    updatedItems[index].price = priceValue;
    return updatedItems;
  };
  const editBtns = document.querySelectorAll('.edit-btn');
  editBtns.forEach((editBtn, index) => {
    editBtn.addEventListener('click', (e) => {
      e.target.textContent = 'Update';
      const newItem = e.target.parentNode.parentNode.firstChild.nextSibling.querySelector('input');
      const newPrice = e.target.parentNode.parentNode.firstChild.nextSibling.querySelector('.price');
      const newItemValue = newItem.value.trim();
      const newPriceValue = newPrice.value.trim();
      removeReadonly(newItem, newPrice);
      storeItems = updateValues(storeItems, newItemValue, newPriceValue, index);
    });
  });

  const removeBtns = document.querySelectorAll('.remove-btn');
  removeBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      removeItem(index);
    });
  });

  const itemLists = document.querySelectorAll('.item-list');
  const priceLists = document.querySelectorAll('.price');
  readOnly(itemLists, priceLists);

  const totalValue = totalSum(storeItems);
  totalPrice.textContent = `${totalValue} Kyats`;
};

clearAllBtn.addEventListener('click', (event) => {
  storeItems = [];
  showItems();
});

const addItem = () => {
  const itemValue = addItemInput.value.trim();
  const priceValue = priceInput.value.trim();
  if (itemValue !== '' && priceValue !== '') {
    addItemInput.style.borderColor = '';
    priceInput.style.borderColor = '';
    errorMessage.innerText = '';
    const item = {
      description: itemValue,
      price: priceValue,
    };
    storeItems.push(item);
    localStorage.setItem('Tasks', JSON.stringify(storeItems));
    showItems();
    addItemInput.value = '';
    priceInput.value = '';
  } else {
    errorMessage.innerText = 'Add both items and Price';
    addItemInput.style.borderColor = 'red';
    priceInput.style.borderColor = 'red';
  }
};

addBtn.addEventListener('click', addItem);
document.addEventListener('DOMContentLoaded', showItems);
