/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
const navBar = document.querySelector("nav.navbar__menu")
const sections = document.querySelectorAll("section");
let ulItems = document.getElementById("navbar__list");
let menuLinks = document.getElementsByClassName("menu__link");
const landingConts = document.getElementsByClassName("landing__container");
let navTimer;
/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
//add navBar hiding timer
function hideNavBar() {
    navTimer = setTimeout(function() { navBar.style.display = "none"; }, 6000);
}
//add class collapsed
let collapse = () => {
    for (const landingCont of landingConts) {
        landingCont.addEventListener("click", function(event) {
            event.preventDefault();
            if (event.target.tagName.toUpperCase() === "H2") {
                let divElements = landingCont.children;
                for (const divElement of divElements) {
                    if (divElement.tagName.toUpperCase() !== "H2") {
                        divElement.classList.toggle("collapsed")
                    }
                }

            }
        })
    }

};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function setNavList() {
    const fragment = document.createDocumentFragment();
    const navIconHtml = document.createElement("li");
    navIconHtml.innerHTML = `<a class="icon" id="barMenu"href=""><i class="fa fa-bars"></i> </a>`
    fragment.appendChild(navIconHtml);
    for (const section of sections) {
        const listItemHtml = document.createElement("li");
        let sectionName = section.getAttribute("data-nav");
        let sectionId = section.getAttribute("id");
        listItemHtml.innerHTML = `<a class="menu__link" href="#${sectionId}">${sectionName}</a>`;
        fragment.appendChild(listItemHtml);
    }
    ulItems.appendChild(fragment);
    document.querySelector(".menu__link").classList.add("item-active-class")

}
// Add class 'active' to section when near top of viewport

function toggleActiveClass() {
    navBar.style.display = "block";
    clearTimeout(navTimer)
    const config = { threshold: 0.5 }
    let observer = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add("your-active-class");
                let selectedSectionId = entry.target.getAttribute("id");

                for (const menuLink of menuLinks) {
                    let ref = menuLink.getAttribute("href");
                    if ("#" + selectedSectionId === ref) {
                        menuLink.classList.add("item-active-class")
                    } else {
                        menuLink.classList.remove("item-active-class")
                    }
                }
                observer.unobserve(entry.target);

            } else {
                entry.target.classList.remove("your-active-class");
            }
        }
    }, config);
    for (const section of sections) {
        observer.observe(section);
    }
    hideNavBar();
}
// Scroll to anchor ID using scrollTO event
function scrollToSection(event) {
    for (const menuLink of menuLinks) {
        event.preventDefault();
    }

    if (event.target.classList.contains("menu__link")) {
        let sectionTargetId = event.target.getAttribute("href");
        let sectionTarget = document.querySelector(sectionTargetId);
        sectionTarget.scrollIntoView({ behavior: "smooth", block: "center" });
        navBar.classList.remove("responsive");
    } else {
        navBar.classList.toggle("responsive");
    }
}
/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 
setNavList();
// Scroll to section on link click
ulItems.addEventListener('click', scrollToSection);
// Set sections as active
window.addEventListener('scroll', toggleActiveClass);
// make sections collapsable
collapse();