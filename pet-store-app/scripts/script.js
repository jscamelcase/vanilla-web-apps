//Mobile touchstart callback function
const startTouchHover = function (event) {
  if (event.target.id === "start") {
    event.target.classList.add("touch-hover-effect");
  }
};

const endTouchHover = function (event) {
  event.target.classList.remove("touch-hover-effect");
};

// Mobile solution to no hover on button touches
document.addEventListener("touchstart", startTouchHover);

document.addEventListener("touchend", endTouchHover);
