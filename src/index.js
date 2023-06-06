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
const storeItems = JSON.parse(localStorage.getItem('Tasks')) || [];

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

const readOnly = (itemLists) => {
    itemLists.forEach((itemList) => {
      itemList.readOnly = true;
    });
};

const showItems = () => {
  itemContainer.innerHTML = '';
  storeItems.forEach((item, index) => {
    itemContainer.innerHTML += `<div class="item-wrapper d-flex justify-content-between flex-column text-center gy-3 row my-2">
    <div class="item d-flex justify-content-around">
        <input type="text" value="${item.description}" class="item-list">
        <span>${item.price} Kyats</span>
    </div>
    <div class="button-container d-flex justify-content-center">
        <button class="btn btn-primary me-2 edit-btn">Edit</button>
        <button class="btn btn-primary remove-btn">Delete</button>
    </div>
    </div>`;
  });
  const removeBtns = document.querySelectorAll('.remove-btn');
  removeBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      removeItem(index);
    });
  });

  const itemLists = document.querySelectorAll('.item-list');
  readOnly(itemLists);

  const totalValue = totalSum(storeItems);
  totalPrice.textContent = `${totalValue} Kyats`;
};

const addItem = () => {
  const itemValue = addItemInput.value.trim();
  const priceValue = priceInput.value.trim();
  if (itemValue !== '' && priceValue !== '') {
    const item = {
      description: itemValue,
      price: priceValue,
    };
    storeItems.push(item);
    localStorage.setItem('Tasks', JSON.stringify(storeItems));
    showItems();
    addItemInput.value = '';
    priceInput.value = '';
  }
};

addBtn.addEventListener('click', addItem);
document.addEventListener('DOMContentLoaded', showItems);
