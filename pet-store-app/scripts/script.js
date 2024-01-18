// Mobile touchstart callback function
const startTouchHover = function (event) {
  if (event.target.id === "start") {
    event.target.classList.add("touch-hover-effect");
  }
};

const endTouchHover = function (event) {
  event.target.classList.remove("touch-hover-effect");
};

// "click" event handler general callback function
const handleClicks = function (event) {
  if (event.target.id === "start") {
    console.log("hello");
    document.querySelector(".intro-title-section").style.display = "none";
    // }
  }
  console.log("hello");
};

// Mobile event listener solution to no hover on button touches
document.addEventListener("touchstart", startTouchHover);

document.addEventListener("touchend", endTouchHover);

// "click" event handler

document.getElementById("start").addEventListener("click", handleClicks);
