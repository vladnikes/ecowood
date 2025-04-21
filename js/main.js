const links = document.querySelectorAll("nav a");
function setActiveLink() {
  links.forEach(link => {
    link.classList.remove("active");
    if (window.location.hash === link.getAttribute("href")) {
     link.classList.add("active");
    }
  });
}
window.addEventListener("hashchange", setActiveLink);
window.addEventListener("load", setActiveLink);