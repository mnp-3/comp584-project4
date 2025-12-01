//API endpoint
const URL = `https://api.nasa.gov/planetary/apod?api_key=${"lcfcVu5uyL6VvfD9h9ncokndIth1LVv1IyXe1cyF"}&count=1`;

document.getElementById("button").addEventListener("click", fetchApod);

//APOD fetch function
async function fetchApod() {
  let apod = null; //store APOD objects 

  // fetch an image
  while (!apod || apod.media_type !== "image") {
    const res = await fetch(URL);         //request to APOD API
    const data = await res.json();        //convert response to JSON
    apod = data[0];                       //array return
  }

  //Grab references from HTML elements
  const img = document.getElementById("apod-image");
  const title = document.getElementById("apod-title");
  const date = document.getElementById("apod-date");
  const desc = document.getElementById("apod-desc");

  // Display picture and content
  img.style.display = "block"; 
  img.src = apod.url;
  title.textContent = apod.title;
  date.textContent = `Picture of the Day on: ${apod.date}`;
  desc.textContent = apod.explanation;

  // Animate each element
  animateIn(img, 0);
  animateIn(title, 150);
  animateIn(date, 250);
  animateIn(desc, 350);
}

//load APOD
fetchApod();

//Popmotion animation function
function animateIn(el, delay) {
  const { tween, easing } = window.popmotion; 
  /*pull popmotion tween and easing
  tween - creates sooth animation between two values https://popmotion.io/api/tween/
  easing - affect the speed of playback across the duration of the animation https://popmotion.io/api/easing/
  */
  tween({
    from: { opacity: 0, y: 100 },   // starts hidden and 100px lower
    to: { opacity: 1, y: 0 },       // ends full visible and in position
    duration: 1000,                 //animation lasts 1 second
    ease: easing.easeIn,            //eases In
    delay: delay                    //delay so aelements appear one after another
  }).start(v => {                   //animation loop
    el.style.opacity = v.opacity;   //updates elements opacity
    el.style.transform = `translateY(${v.y}px)`; //updates elements position using CSS transform
  });
}
