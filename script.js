const items = [...document.querySelectorAll(".gallery-item")];
const filters = document.querySelectorAll(".filter");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const caption = document.getElementById("caption");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visibleItems = items;
let currentIndex = 0;

// Filter images by category
filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.dataset.category;

    items.forEach(item => {
      const matches =
        category === "all" ||
        item.dataset.category === category;

      item.classList.toggle("hide", !matches);
    });

    visibleItems = items.filter(
      item => !item.classList.contains("hide")
    );
  });
});

// Open image preview
function openLightbox(index) {
  currentIndex = index;
  showImage();

  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  closeBtn.focus();
}

// Display selected image
function showImage() {
  const item = visibleItems[currentIndex];
  const img = item.querySelector("img");
  const title = item.querySelector("h3").textContent;
  const category = item.querySelector("p").textContent;

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  caption.textContent = `${title} — ${category}`;
}

// Click any gallery image
items.forEach(item => {
  item.addEventListener("click", () => {
    const index = visibleItems.indexOf(item);
    if (index !== -1) openLightbox(index);
  });
});

// Next image
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showImage();
});

// Previous image
prevBtn.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + visibleItems.length) %
    visibleItems.length;

  showImage();
});

// Close preview
function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeLightbox);

// Close by clicking outside the image
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

// Keyboard controls
document.addEventListener("keydown", event => {
  if (lightbox.hidden) return;

  if (event.key === "Escape") closeLightbox();

  if (event.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    showImage();
  }

  if (event.key === "ArrowLeft") {
    currentIndex =
      (currentIndex - 1 + visibleItems.length) %
      visibleItems.length;

    showImage();
  }
});
