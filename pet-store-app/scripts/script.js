//Import data
import { menuList } from "../data/data.js";

// Mobile touchstart callback function
const startTouchHover = function (event) {
  if (event.target.id === "start") {
    event.target.classList.add("touch-hover-effect");
  }
};

const endTouchHover = function (event) {
  event.target.classList.remove("touch-hover-effect");
};

const addQuantity = function (event) {
  console.log("Button Working");
};

/* Generate Menu List */
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
    menuItemButtonImg.addEventListener("click", addQuantity);
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
    menuItemImage.src = `${image}`;
    menuItemDescription.textContent = `${shortDescription}`;
    menuItemIngredients.textContent = `${ingredients.join(", ")}`;
    menuItemPrice.textContent = `$${price}`;
    menuItemButtonImg.dataset.item = `${productId}`;
    /*compose each element together in the right order ahead of appending to the HTML menu section*/
    menuItemDesContainer.append(
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

// "click" event handler general callback function
const handleClicks = function (event) {
  if (event.target.id === "start") {
    console.log("hello");
    document.querySelector(".intro-container").style.display = "none";
    generateMenu();
  }
};

// Mobile event listener solution to no hover on button touches
document.addEventListener("touchstart", startTouchHover);

document.addEventListener("touchend", endTouchHover);

// "click" event handler

document.getElementById("start").addEventListener("click", handleClicks);
