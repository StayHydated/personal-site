//change bg color of nav on hover
const navHover = () => {
  const navBar = document.querySelector("nav");

  navBar.addEventListener("mouseover", () => {
    navBar.style.backgroundColor = "var(--gray--)";
    navBar.style.borderBottom = ".75px solid var(--white--)";
  }, false);

  navBar.addEventListener("mouseout", () => {
    if (window.pageYOffset == 0) {
      navBar.style.backgroundColor = "transparent";
      navBar.style.borderBottom = ".75px solid rgba(50, 56, 64, 0)"
    }
    else{
      let scrollPercent = window.pageYOffset/160;
      navBar.style.backgroundColor = `rgba(93, 103, 117, ${scrollPercent})`;
      navBar.style.borderBottom = `.75px solid rgba(236, 236, 237, ${scrollPercent})`;
    }
  }, false);
}

//change bg color and size of nav on scroll
function navScroll(){
  let scrollPercent = window.pageYOffset/160;
  const navBar = document.querySelector("nav");
  if (scrollPercent <= 1) {
    navBar.style.borderBottom = `.75px solid rgba(236, 236, 237, ${scrollPercent})`;
    navBar.style.height = `${10-scrollPercent*3}vh`;
    navBar.style.backgroundColor = `rgba(93, 103, 117, ${scrollPercent})`;
  }
  else{
    navBar.style.borderBottom = `.75px solid rgba(236, 236, 237, 1)`;
    navBar.style.height = `7vh`;
    navBar.style.backgroundColor = `rgba(93, 103, 117, 1)`;
  }
}


navHover();
window.onload = navScroll;
window.addEventListener("scroll", navScroll);
