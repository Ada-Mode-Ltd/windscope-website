const header = document.querySelector('body header')
const isDarkBackground = header.hasAttribute('data-dark') ? true : false;
const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
let lastScroll = 0;
 
const navScroll = () => {
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    header.classList.remove(scrollUp);
    if (isDarkBackground) {
      header.setAttribute('data-dark', 'true');
    }
    return;
  } else {
    header.removeAttribute('data-dark')
  }
 
  if (currentScroll > lastScroll && !header.classList.contains(scrollDown)) {
    // down
    header.classList.remove(scrollUp);
    header.classList.add(scrollDown);
  } else if (
    currentScroll < lastScroll &&
    header.classList.contains(scrollDown)
  ) {
    // up
    header.classList.remove(scrollDown);
    header.classList.add(scrollUp);
  }

  lastScroll = currentScroll;
});
}

export default navScroll;