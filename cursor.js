/* ========================================
   STAR BURST CURSOR EFFECT

   Every time the left mouse button is pressed,
   a small burst of stars pops out from the cursor.

   This file is loaded at the end of each page with:

   <script src="cursor.js"></script>
======================================== */


/*
The characters used for the stars.
One is picked at random for each star.
*/

const starShapes = ["✦", "✧", "★", "☆", "✰"];

/* How many stars appear on each click */
const starCount = 12;


/*
Some visitors ask their computer to reduce motion.
If so, we skip the animation.
*/

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");


/*
pointerdown fires the moment a mouse button is pressed
(or a finger touches the screen).

event.button === 0 means the LEFT mouse button.
*/

document.addEventListener("pointerdown", function (event) {

  if (event.button !== 0 || reduceMotion.matches) {
    return;
  }

  for (let i = 0; i < starCount; i++) {
    createStar(event.clientX, event.clientY);
  }
});


/* ========================================
   CREATE ONE STAR
======================================== */

function createStar(x, y) {

  /* <span> holding a single star character */
  const star = document.createElement("span");

  star.className = "click-star";
  star.textContent = starShapes[Math.floor(Math.random() * starShapes.length)];

  /* Place the star exactly where the mouse was pressed */
  star.style.left = x + "px";
  star.style.top = y + "px";
  star.style.fontSize = randomBetween(14, 26) + "px";

  document.body.appendChild(star);


  /*
  Pick a random direction and distance.

  Math.cos and Math.sin turn an angle into
  an x and y movement.
  */

  const angle = Math.random() * Math.PI * 2;
  const distance = randomBetween(40, 110);

  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;

  /* How much the star falls at the end, like gravity */
  const fall = randomBetween(20, 50);

  const spin = randomBetween(-180, 180);


  /*
  animate() plays an animation from one
  keyframe to the next.

  translate(-50%, -50%) keeps the star
  centered on the cursor.
  */

  const animation = star.animate(
    [
      {
        transform: "translate(-50%, -50%) scale(0.5) rotate(0deg)",
        opacity: 1
      },
      {
        transform: `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) scale(1) rotate(${spin / 2}deg)`,
        opacity: 1,
        offset: 0.6
      },
      {
        transform: `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY + fall}px)) scale(0.6) rotate(${spin}deg)`,
        opacity: 0
      }
    ],
    {
      duration: randomBetween(600, 1000),
      easing: "cubic-bezier(0.2, 0.8, 0.3, 1)"
    }
  );


  /* Remove the star from the page once it has faded */
  animation.onfinish = function () {
    star.remove();
  };
}


/* A random number between min and max */

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}
