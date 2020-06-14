window.addEventListener("load", getData);



const btnMenu = document.querySelector(".menu-btn");
const btnExit = document.querySelector(".exit-btn");
const headerUl = document.getElementById("menu");

btnMenu.addEventListener("click", showNav);

function showNav() {
    headerUl.classList.add("shown");
    btnMenu.classList.add("hidden")
    btnMenu.classList.remove("shown");
    btnExit.classList.remove("hidden");
}

btnExit.addEventListener("click", closeMenu);

function closeMenu() {


    headerUl.classList.remove("shown");
    btnExit.classList.add("hidden");
    btnMenu.classList.remove("hidden");
    btnMenu.classList.remove("shown");
}




/***** Get Data from WP *****/


const link1 = "https://mymmd.dk/Ane/wp-json/wp/v2/artwork?per_page=100&_embed";




/***** fetch Data *****/

function getData() {

    fetch(link1)
        .then(function (response) {
            return response.json();
        })
        .then(showData);


}

function showData(artWorkArray) {
    artWorkArray.forEach(art => {

        renderLandingPage(art);

    });
    showSlides();

}




function renderLandingPage(LandingPageImageArray) {

    const template = document.querySelector(".landing").content;

    const copy = template.cloneNode(true);

    copy.querySelector(".current-bg").src = LandingPageImageArray.cover_image.guid
    copy.querySelector('.current-bg').id = LandingPageImageArray.id;

    document.querySelector(".bg-container").appendChild(copy);



    const dotsTemplate = document.querySelector(".circles-temp").content;

    const dotsCopy = dotsTemplate.cloneNode(true);

    dotsCopy.querySelector('.dot-title').textContent = LandingPageImageArray.art_name;
    dotsCopy.querySelector('.dot-title').id = LandingPageImageArray.id;
    dotsCopy.querySelector('.circle').id = LandingPageImageArray.id;
    dotsCopy.querySelector(".circle-wrapper").id = LandingPageImageArray.id;

    const a = dotsCopy.querySelector('a');
    dotsCopy.querySelector(".circle-wrapper").addEventListener("click", changeGalleryBg)

    if (a) {
        a.href += LandingPageImageArray.id;
        a.id = LandingPageImageArray.id;


    }
    document.querySelector(".circles-wrapper").appendChild(dotsCopy);


}

let slideIndex = 0;

function changeGalleryBg(e) {
    let slides = document.querySelectorAll(".test");
    slides.forEach((slide, index) => {
        if (slide.id === e.target.id) {
            slide.style.opacity = "1";

            console.log(index);
            slideIndex = index;

        } else {
            slide.style.opacity = "0";
        }

    })

    titleLinks = document.querySelectorAll(".title-link");
    titleLinks.forEach(link => {

        if (link.id === e.target.id) {
            link.style.visibility = "visible"

        } else {
            link.style.visibility = "hidden"

        }
    });

    dotsTitles = document.querySelectorAll(".dot-title");
    dotsTitles.forEach(title => {

        if (title.id === e.target.id) {

            title.style.opacity = "1";
        } else {
            title.style.opacity = "0";

        }
    });
    circles = document.querySelectorAll(".circle");
    circles.forEach(circle => {

        if (circle.id === e.target.id) {

            circle.style.background = "white";
        } else {
            circle.style.background = "none";
        }
    });
    console.log(e)

}





function showSlides(e) {

    let i;
    let slides = document.getElementsByClassName("test");
    for (i = 0; i < slides.length; i++) {

        slides[i].style.backgroundColor = "black";

        slides[i].style.opacity = "0";


    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }



    slides[slideIndex - 1].style.opacity = "1";
    titleLinks = document.querySelectorAll(".title-link");
    titleLinks.forEach(link => {

        if (link.id === slides[slideIndex - 1].id) {
            link.style.visibility = "visible"

        } else {
            link.style.visibility = "hidden"

        }
    });

    dotsTitles = document.querySelectorAll(".dot-title");
    dotsTitles.forEach(title => {

        if (title.id === slides[slideIndex - 1].id) {

            title.style.opacity = "1";


        } else {
            title.style.opacity = "0";



        }
    });

    circles = document.querySelectorAll(".circle");
    circles.forEach(circle => {

        if (circle.id === slides[slideIndex - 1].id) {

            circle.style.background = "white";
        } else {
            circle.style.background = "none";
        }
    });


    setTimeout(showSlides, 5000); // Change image every 5 seconds
};
