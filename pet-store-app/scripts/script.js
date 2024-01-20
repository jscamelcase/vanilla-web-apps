//Import data
import { menuList } from "../data/data.js";

/* Generate Menu List (lanuched by clicking start button) */
const generateMenu = function () {
  // Grab hold of menu items container to place each menu item inside the container after loop construction
  const menuPageItems = document.querySelector(
    ".menu-page-order-items-container"
  );
  for (let item of menuList) {
    /*Create a container on each round of the loop to place the different menu items in consideration of flexbox styling */
    const menuItemContainer = document.createElement("div");
    menuItemContainer.classList.add("menu-item");
    /* Create individual components of each menu item */
    const menuItemTitle = document.createElement("h3");
    menuItemTitle.classList.add("menu-title");
    const menuItemImage = document.createElement("img");
    menuItemImage.classList.add("menu-img");
    const menuItemDesContainer = document.createElement("div");
    menuItemDesContainer.classList.add("menu-description-container");
    const menuItemDescription = document.createElement("p");
    menuItemDescription.classList.add("menu-description");
    const menuItemIngredients = document.createElement("p");
    menuItemIngredients.classList.add("menu-ingredients");
    const menuItemPrice = document.createElement("p");
    menuItemPrice.classList.add("menu-price");
    const menuItemButtonImg = document.createElement("img");
    menuItemButtonImg.classList.add("menu-btn-img");
    menuItemButtonImg.src = "../images/addItem.svg";
    // menuItemButtonImg.addEventListener("click", addQuantity);
    /* Unpack each property from each object in the data array to go into each menu item section*/
    const {
      name,
      price,
      quantity,
      shortDescription,
      ingredients,
      productId,
      image,
    } = item;
    /* Add respective values to each created element*/
    menuItemTitle.textContent = `${name}`;
    menuItemImage.src = `${image}`;
    menuItemDescription.textContent = `${shortDescription}`;
    menuItemIngredients.textContent = `Ingredients: ${ingredients.join(", ")}.`;
    menuItemPrice.textContent = `$${price}`;
    menuItemButtonImg.dataset.item = `${productId}`;
    /*compose each element together in the right order ahead of appending to the HTML menu section*/
    menuItemDesContainer.append(
      menuItemTitle,
      menuItemDescription,
      menuItemIngredients,
      menuItemPrice
    );
    menuItemContainer.append(
      menuItemImage,
      menuItemDesContainer,
      menuItemButtonImg
    );
    // Append menu item container to menuPageItems for rendering
    menuPageItems.appendChild(menuItemContainer);
  }
};

//generates order pop-up when main menu add button is clicked

const generateAddOrder = function (event) {
  //Set where the section should be added
  const addOrderSection = document.querySelector(".order-modal-container");
  // Match the click event target to the product and retrives the product information
  const itemId = event.target.dataset.item;
  const productDetails = menuList.filter((product) =>
    product.productId.includes(itemId)
  )[0];
  console.log(typeof productDetails);
  // unpack the product info to put on pop-up
  const { name, price, image } = productDetails;
  // Create elements for order pop-up
  const orderContainer = document.createElement("div");
  orderContainer.classList.add("order-container");
  const orderName = document.createElement("h3");
  orderName.classList.add("order-name");
  const orderImg = document.createElement("img");
  orderImg.classList.add("order-img");
  const orderPrice = document.createElement("p");
  orderPrice.classList.add("order-price");
  const orderInputContainer = document.createElement("div");
  orderInputContainer.classList.add("order-input-container");
  const orderInputLabel = document.createElement("p");
  orderInputLabel.classList.add("order-input-label");
  orderInputLabel.textContent = "Pick Quantity";
  const orderInput = document.createElement("input");
  orderInput.type = "number";
  orderInput.classList.add("order-input");
  const orderButton = document.createElement("button");
  orderButton.textContent = "Add to Cart";
  //Add product info to relevant elements
  orderName.textContent = `${name}`;
  orderImg.src = `${image}`;
  orderPrice.textContent = `${price}`;
  //Compose various created elements to be appended to html
  orderInputContainer.append(orderInputLabel, orderInput);
  orderContainer.append(
    orderName,
    orderImg,
    orderPrice,
    orderInputContainer,
    orderButton
  );
  //Append composed elements to HTML document
  addOrderSection.append(orderContainer);
};

// "click" event handler for start button specifically
const handleStart = function (event) {
  console.log("hello");
  event.stopPropagation(); // stop bubbling and firing off the general document "click" event listener
  document.querySelector(".intro-container").style.display = "none";
  document.querySelector(".menu-page").style.display = "block";
  generateMenu();
};

// general document "click" handleing function

const handleClicks = function (event) {
  if (event.target.dataset.item) {
    generateAddOrder(event);
  }
};

// start button "click" event handler
document.getElementById("start").addEventListener("click", handleStart);

// General Document Wide Event Listener
document.addEventListener("click", handleClicks);
