/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle')
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== SCROLL REVEAL ANIMATION ====================*/ 
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    //reset: true /* Animations repeat */
})


sr.reveal(`.nav`)
sr.reveal(`.home__img,.home__data,.home__scroll`)
sr.reveal(`.home__data h1,.home__social`, {delay:300, origin:'bottom', interval:50})
sr.reveal(`.home__data a`, {delay:300, origin:'left', interval:800})



sr.reveal(`.about`)
sr.reveal(`.about__description`, {delay:300, origin:'bottom', interval:50})
sr.reveal(`.about__buttons, .about__img`, {delay:300, origin:'left', interval:800})


sr.reveal(`.experiences`)
sr.reveal(`.experiences__title`, {origin:'left', interval:400})
sr.reveal(`.experiences__subtitle,.experiences__list`, {delay:800 ,origin:'bottom', interval:160})

sr.reveal(`.awards`)
sr.reveal(`.awards__container`, {origin:'left'})


sr.reveal(`.skills`)
sr.reveal(`.skills__blob`, {origin:'top',interval: 300})
sr.reveal(`.skills__name`, {origin:'bottom',interval: 300})


sr.reveal(`.certification`)




sr.reveal(`.contact`, {interval:200})

/*==================== ACCORDION experiences ====================*/
const experiencesContent = document.getElementsByClassName('experiences__content'),
      experiencesHeader = document.querySelectorAll('.experiences__header')

function toggleexperiences(){
    let itemClass = this.parentNode.className

    for(i = 0; i< experiencesContent.length; i++){
        experiencesContent[i].className = 'experiences__content experiences__close'
    }
    if(itemClass === 'experiences__content experiences__close'){
        this.parentNode.className = 'experiences__content experiences__open'
    }
}

experiencesHeader.forEach((el) =>{
    el.addEventListener('click',toggleexperiences)
})

/*==================== Certification TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab=>{
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('certification__active')
        })
        target.classList.add('certification__active')

        tabs.forEach(tab =>{
            tab.classList.remove('certification__active')
        })
        tab.classList.add('certification__active')
    })
})

/*==================== Portfolio MODAL ====================*/
const modalViews = document.querySelectorAll('.portfolio__modal'),
      modalBtns = document.querySelectorAll('.portfolio__button'),
      modalCloses = document.querySelectorAll('.portfolio__modal-close')


let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}


modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', ()=> {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () =>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal')
        })
    })
})

/*==================== Project Image Carousel ====================*/

        // Initialize all carousels on the page
        document.addEventListener('DOMContentLoaded', function() {
            // Find all carousel containers on the page
            const carouselContainers = document.querySelectorAll('.carousel-container');
            
            // Initialize each carousel separately
            carouselContainers.forEach((container, containerIndex) => {
                initCarousel(container, containerIndex);
            });
            
            // Function to initialize a single carousel
            function initCarousel(container, containerIndex) {
                // Get carousel elements
                const carouselSlide = container.querySelector('.carousel-slide');
                const images = carouselSlide.querySelectorAll('img');
                
                // Skip initialization if no images found
                if (images.length === 0) return;
                
                // Add buttons
                const prevBtn = document.createElement('button');
                prevBtn.classList.add('carousel-btn', 'prev-btn');
                prevBtn.innerHTML = '❮';
                container.appendChild(prevBtn);
                
                const nextBtn = document.createElement('button');
                nextBtn.classList.add('carousel-btn', 'next-btn');
                nextBtn.innerHTML = '❯';
                container.appendChild(nextBtn);
                
                // Add dots container
                const dotsContainer = document.createElement('div');
                dotsContainer.classList.add('dots-container');
                container.appendChild(dotsContainer);
                
                // Set up initial state
                let counter = 0;
                const size = images[0].clientWidth;
                
                // Create dot indicators
                images.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (index === 0) dot.classList.add('active');
                    
                    dot.addEventListener('click', () => {
                        counter = index;
                        updateCarousel();
                    });
                    
                    dotsContainer.appendChild(dot);
                });
                
                // Update carousel position and active dot
                function updateCarousel() {
                    carouselSlide.style.transition = 'transform 0.5s ease';
                    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
                    
                    // Update active dot
                    const dots = dotsContainer.querySelectorAll('.dot');
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === counter % images.length);
                    });
                }
                
                // Next button event
                nextBtn.addEventListener('click', () => {
                    if (counter >= images.length - 1) {
                        // Loop back to first slide
                        counter = 0;
                    } else {
                        counter++;
                    }
                    updateCarousel();
                });
                
                // Previous button event
                prevBtn.addEventListener('click', () => {
                    if (counter <= 0) {
                        // Loop to last slide
                        counter = images.length - 1;
                    } else {
                        counter--;
                    }
                    updateCarousel();
                });
                
                // Auto-slide functionality
                let slideInterval = setInterval(autoSlide, 5000);
                
                function autoSlide() {
                    if (counter >= images.length - 1) {
                        counter = 0;
                    } else {
                        counter++;
                    }
                    updateCarousel();
                }
                
                // Pause auto-slide on hover
                container.addEventListener('mouseenter', () => {
                    clearInterval(slideInterval);
                });
                
                // Resume auto-slide on mouse leave
                container.addEventListener('mouseleave', () => {
                    slideInterval = setInterval(autoSlide, 5000);
                });
                
                // Handle window resize to adjust slide sizes
                window.addEventListener('resize', () => {
                    const newSize = images[0].clientWidth;
                    carouselSlide.style.transition = 'none';
                    carouselSlide.style.transform = `translateX(${-newSize * counter}px)`;
                });
            }
        });



/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)




/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 

function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')

    const removeButton = document.getElementById('remove-button');
    if(this.scrollY >= 10) removeButton.classList.add('remove-button'); else removeButton.classList.remove('remove-button')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/ 

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== SWIPER (AWARDS) ====================*/
let swiperAwards = new Swiper(".awards__container", {
    spaceBetween: 24,
    slidesPerView: 'auto',
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable:true,
    },
    breakpoints: {
        576: {
            slidesPerView:1,
        },
        670: {
            slidesPerView:1,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 28,
        },
        883: {
            slidesPerView: 3,
            spaceBetween: 28,
        }
    },
});



