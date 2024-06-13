document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  let slideIndex = 0;
  const circleContainer = document.querySelector('.circle');
  const hiddenElements = document.querySelectorAll('.hidden');
  const threshold = 400;
  let lastScrollTop = 0;

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

    const slideTitles = document.querySelectorAll('.slide-title');
    slideTitles.forEach((title, index) => {
      title.style.display = index === currentSlide ? 'block' : 'none';
    });
  }

  function showSlides() {
    const slides = document.querySelectorAll('.slide-2');
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = 'block';
    setTimeout(showSlides, 5000); // Change image every 5 seconds
  }

  function parallax(event) {
    document.querySelectorAll(".parallax-img").forEach((img, index) => {
      const depth = index + 1; 
      const x = (window.innerWidth - event.pageX * depth) / 90;
      const y = (window.innerHeight - event.pageY * depth) / 90;

      img.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  }

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

  function observeCallback(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  }

  const observer = new IntersectionObserver(observeCallback);
  hiddenElements.forEach((el) => {
    observer.observe(el);
  });

  setInterval(nextSlide, 5000); // Automatically switch slides every 5 seconds
  showSlides(); // Automatically switch slides for slide-2
  document.querySelector('.prev').addEventListener('click', prevSlide);
  document.querySelector('.next').addEventListener('click', nextSlide);
  document.addEventListener('mousemove', parallax); // Parallax effect

  // Scroll to top button
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Show scroll-to-top button when scrolling down
  document.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset;
    if (currentScrollTop > threshold && lastScrollTop < currentScrollTop) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
    lastScrollTop = currentScrollTop;
  });

  // Scroll to top when user clicks on the button
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
