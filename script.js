function createRaindrop() {
  const raindrop = document.createElement("div");
  raindrop.classList.add("raindrop");
  const rainPositionX = Math.random() * window.innerWidth;
  const fallDuration = 1;

  raindrop.style.left = `${rainPositionX}px`;
  raindrop.style.animationDuration = `${fallDuration}s`;

  document.body.appendChild(raindrop);

  setTimeout(() => {
    raindrop.remove();
  }, fallDuration * 1000);
}

setInterval(createRaindrop, 100);
