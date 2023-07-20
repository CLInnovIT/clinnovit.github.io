function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    const menuToggle = document.querySelector(".menu-toggle");
  
    if (navLinks.style.display === "none") {
      navLinks.style.display = "flex";
      menuToggle.classList.add("open");
    } else {
      navLinks.style.display = "none";
      menuToggle.classList.remove("open");
    }
  }
  

  // Helper function to get the container width based on screen size
  function getContainerWidth() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) {
        return 2000; // Desktop container width
    } else if (screenWidth >= 768) {
        return screenWidth; // Tablet container width
    } else {
        return screenWidth; // Mobile container width
    }
}

// Helper function to get the container height based on screen size
function getContainerHeight() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) {
        return 400; // Desktop container height
    } else if (screenWidth >= 768) {
        return 300; // Tablet container height
    } else {
        return 200; // Mobile container height
    }
}

// Helper function to get the default slide size based on screen size
function getDefaultSlideSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) {
        return { x: 400, y: 200 }; // Desktop slide size
    } else if (screenWidth >= 768) {
        return { x: 300, y: 150 }; // Tablet slide size
    } else {
        return { x: 150, y: 100 }; // Mobile slide size
    }
}

// Helper function to get the default portion based on screen size
function getDefaultPortion() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) {
        return 0.6; // Desktop default portion
    } else if (screenWidth >= 768) {
        return 0.3; // Tablet default portion
    } else {
        return 0.2; // Mobile default portion
    }
}

setupSlideshow({
    defaultSize: getDefaultSlideSize(),
    containerID: 'sliderContainer',
    slideClass: 'slide',
    activeSlideClass: 'activeslide',
    defaultActiveSlide: 2,
    defaultPortion: getDefaultPortion(),
    focusScale: 1.2,
    containerWidth: getContainerWidth(),
    containerHeight: getDefaultSlideSize().x*1.2,
});

// let  sn = new Slider(document.querySelector('.circular-slider-1'), 100, 15, 600, 2500);

// const circularSlider = setupCircularSlider('ccontainer', 'cslide', 100, { x: 300, y: 300 }, 1000);
// circularSlider.autoRotate(3, 0, 1, 2000);



function onYesButtonClick(event, popup) {
    console.log('Yes button clicked!');
    // Perform additional actions or close the popup if needed
    document.body.removeChild(popup);
  }
  
  function onNoButtonClick(event, popup) {
    console.log('No button clicked!');
    // Perform additional actions or close the popup if needed
    document.body.removeChild(popup);
  }
  
  const popup = notifywith2but(
    'Do you want to proceed?',
    onYesButtonClick,
    onNoButtonClick,
    'Agree',
    'Disagree',
    'https://example.com'
  );