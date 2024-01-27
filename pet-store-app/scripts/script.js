//Import data
import { menuList, shoppingCart } from "../data/data.js";

const displayCart = function () {
  const modalContainer = document.querySelector(".cart-modal-container");
  modalContainer.innerHTML = "";
  const cartHeading = document.createElement("h3");
  cartHeading.classList.add("cart-heading");
  cartHeading.textContent = "Shopping Cart";
  const itemTitle = document.createElement("p");
  itemTitle.textContent = "Item";
  const itemPrice = document.createElement("p");
  itemPrice.textContent = "Price";
  const itemQuantity = document.createElement("p");
  itemQuantity.textContent = "Qty";
  const itemTotal = document.createElement("p");
  itemTotal.textContent = "Total";
  const cartListContainer = document.createElement("div");
  cartListContainer.classList.add("cart-list-container");
  cartListContainer.append(itemTitle, itemPrice, itemQuantity, itemTotal);
  shoppingCart.forEach((item) => {
    const cartItemContainer = document.createElement("div");
    const cartItemName = document.createElement("p");
    cartItemName.textContent = item.name;
    const cartItemPrice = document.createElement("p");
    cartItemPrice.textContent = `$${item.price}`;
    const cartItemQuantity = document.createElement("p");
    cartItemQuantity.textContent = item.quantity;
    const cartItemTotal = document.createElement("p");
    cartItemTotal.classList.add("cart-item-total");
    cartItemTotal.textContent =
      "$" + Number(item.quantity) * Number(item.price);
    cartListContainer.append(
      cartItemName,
      cartItemPrice,
      cartItemQuantity,
      cartItemTotal
    );
  });
  const cartTotal = Array.from(
    cartListContainer.querySelectorAll(".cart-item-total")
  ).map((item) => {
    console.log(item.textContent);
    return Number(item.textContent);
  });

  console.log(cartTotal);

  const cartTotalFromArray = cartTotal.reduce((total, num) => {
    return total + num.price;
  }, 0);

  modalContainer.append(cartHeading, cartListContainer);
};

const addToCart = function (event) {
  //Grab the product id from the button html id
  const cartItemId = event.target.id.substr(15);
  //Retrive the matching details of the product from the menu data
  const cartItemDetails = menuList.filter(
    (detail) => detail.productId === cartItemId
  )[0];
  //Unpack the relevent items
  const { name, price } = cartItemDetails;
  //Take the quanity from order screen
  const cartQuantity = Number(document.querySelector(".order-input").value);
  //Retire the item section from the shopping cart if it exists
  const existingCartItem = shoppingCart.filter(
    (item) => item.productId === cartItemId
  )[0];
  // check whether the cart items exists and act accordingly
  if (existingCartItem) {
    existingCartItem.quantity += cartQuantity;
    console.log(shoppingCart);
  } else {
    const newCartEntry = {
      productId: cartItemId,
      quantity: cartQuantity,
      name: name,
      price: price,
    };
    shoppingCart.push(newCartEntry);
    console.log(shoppingCart);
  }
  // set the value of the quantity input field bacl to empty
  document.querySelector(".order-input").value = null;
};
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
  //Clear the order-pop from any prior order
  addOrderSection.innerHTML = "";
  // Match the click event target to the product and retrives the product information
  const itemId = event.target.dataset.item;
  const productDetails = menuList.filter((product) =>
    product.productId.includes(itemId)
  )[0];
  // unpack the product info to put on pop-up
  const { name, price, image } = productDetails;
  // Create elements for order pop-up
  const orderContainer = document.createElement("div");
  orderContainer.classList.add("order-container");
  const orderContainerClose = document.createElement("img");
  orderContainerClose.src = "../images/close-button.svg";
  orderContainerClose.classList.add("order-close");
  orderContainerClose.id = "order-close";
  orderContainerClose.addEventListener("click", (event) => {
    event.stopPropagation();
    document.querySelector(".order-modal-container").style.display = "none";
    document.querySelector(".menu-page").style.filter = "none";
  });
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
  orderInputLabel.textContent = "Enter Quantity";
  const orderInput = document.createElement("input");
  orderInput.type = "number";
  orderInput.classList.add("order-input");
  const orderButtonContainer = document.createElement("div");
  orderButtonContainer.classList.add("order-btn-container");
  const orderButton = document.createElement("button");
  orderButton.classList.add("order-btn");
  orderButton.id = `order-add-cart-${itemId}`;
  orderButton.addEventListener("click", addToCart);
  orderButton.textContent = "Add to Cart";
  const checkOutButton = document.createElement("button");
  checkOutButton.classList.add("order-btn-checkout");
  checkOutButton.id = `check-out-${itemId}`;
  checkOutButton.textContent = "Checkout";
  checkOutButton.addEventListener("click", displayCart);
  //Add product info to relevant elements
  orderName.textContent = `${name}`;
  orderImg.src = `${image}`;
  orderPrice.textContent = `$${price}`;
  //Compose various created elements to be appended to html
  orderInputContainer.append(orderInputLabel, orderInput);
  orderButtonContainer.append(orderButton, checkOutButton);
  orderContainer.append(
    orderContainerClose,
    orderName,
    orderImg,
    orderPrice,
    orderInputContainer,
    orderButtonContainer
  );
  //Append composed elements to HTML document
  addOrderSection.append(orderContainer);
  //Blur the menu page background
  document.querySelector(".menu-page").style.filter = "blur(10px)";
  document.querySelector(".order-modal-container").style.display = "block";
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
  event.stopPropagation();
  if (event.target.dataset.item) {
    generateAddOrder(event);
  }
};

// start button "click" event handler
document.getElementById("start").addEventListener("click", handleStart);

// General Document Wide Event Listener
document.addEventListener("click", handleClicks);
