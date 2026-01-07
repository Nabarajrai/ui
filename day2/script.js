const action = document.querySelector(".action");
const courselContainer = document.querySelector(".carousel");
const slide = document.querySelector(".images");
const images = document.querySelectorAll(".images img");
const spanContainer = document.querySelector(".span");

let currentIndex = 0;

for (let i = 0; i < images.length; i++) {
  const span = document.createElement("span");
  span.classList.add("dot");
  if (i === 0) span.classList.add("active");
  span.addEventListener("click", () => gotoSlide(i));
  spanContainer.appendChild(span);
}
const dots = document.querySelectorAll(".dot");
const gotoSlide = (index) => {
  currentIndex = index;
  renderSlides();
};

const autoSlide = () => {
  currentIndex = (currentIndex + 1) % images.length;
  renderSlides();
};
setInterval(autoSlide, 3000);

const renderSlides = () => {
  slide.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", currentIndex === index);
  });
};

renderSlides();

action.addEventListener("click", (e) => {
  const btn = e.target;

  if (btn.dataset.action === undefined) return;
  if (btn.dataset.action === "next") {
    currentIndex = (currentIndex + 1) % images.length;
    renderSlides();
  } else {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    renderSlides();
  }

  console.log(btn.dataset.action);
});
