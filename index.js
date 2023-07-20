const button = document.getElementById("btn-contact");

button.addEventListener("click", async() => {
  const firstName = document.getElementById("inputFirstName").value;
  const lastName = document.getElementById("inputLastName").value;
  const email = document.getElementById("inputEmail").value;
  const message = document.getElementById("message").value;


  if (firstName.length > 0 || lastName.length > 0 || email.length > 0 || message.length > 0) {
    try {
      let fd= new FormData();
      fd.append('name', firstName+" "+lastName);
      fd.append('email', email);
      fd.append('msg', message);
      fd.append('completed', false);
      const fetchResponse = await fetch('https://www.grupverse.com/companywebsitemsg',{method:'POST',body:fd,});

      if (!fetchResponse.ok) {
        throw new Error('Error sending message');
      }

      Swal.fire(
        'Successful!',
        'Your email has been received.',
        'success'
      )
    } catch (err) {
      console.log(err);
      Swal.fire(
        'Error',
        'Something Went Wrong, Please try again later',
        'error'
      )
    }
  }
});



// Ritu Lahkar writing below

function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.querySelector(".header-menu-toggle");

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
  slideClass: 'slidex',
  activeSlideClass: 'activeslide',
  defaultActiveSlide: 2,
  defaultPortion: getDefaultPortion(),
  focusScale: 1.2,
  containerWidth: getContainerWidth(),
  containerHeight: getDefaultSlideSize().x * 1.2,
});
