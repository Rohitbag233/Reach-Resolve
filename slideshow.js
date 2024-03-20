document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlidePosition();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlidePosition();
    }

    function updateSlidePosition() {
      slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
      });

      // Show or hide the slide titles based on the current slide
      const slideTitles = document.querySelectorAll('.slide-title');
      slideTitles.forEach((title, index) => {
        title.style.display = index === currentSlide ? 'block' : 'none';
      });
    }

    // Automatically switch slides every 5 seconds
    setInterval(nextSlide, 5000);
});

document.addEventListener("mousemove", parallax);

function parallax(event) {
    document.querySelectorAll(".parallax-img").forEach((img, index) => {
        const depth = index + 1; // Increase depth for each image
        const x = (window.innerWidth - event.pageX * depth) / 90;
        const y = (window.innerHeight - event.pageY * depth) / 90;

        img.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}



  let slideIndex = 0;

  function showSlides() {
    const slides = document.querySelectorAll('.slide-2');
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlides, 5000); // Change image every 2 seconds
  }

  showSlides();

  function prevSlide() {
    slideIndex--;
    if (slideIndex < 1) { slideIndex = slides.length; }
    showSlides();
  }

  function nextSlide() {
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    showSlides();
  }

  const circleContainer = document.querySelector('.circle');
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  function triggerAnimation() {
    if (isInViewport(circleContainer)) {
      const progressBars = document.querySelectorAll('[role="progressbar"]');
      progressBars.forEach(bar => bar.style.animationPlayState = 'running');
      window.removeEventListener('scroll', triggerAnimation);
    }
  }
  window.addEventListener('scroll', triggerAnimation);
  triggerAnimation();