// Get the custom cursor element
const cursor = document.querySelector('.custom-cursor');

// Add event listener to track mouse movement
document.addEventListener('mousemove', (e) => {
  // Position the custom cursor based on mouse position
  cursor.style.left = `${e.pageX - cursor.offsetWidth / 2}px`;
  cursor.style.top = `${e.pageY - cursor.offsetHeight / 2}px`;
});

// Optional: Add a slight hover effect for clickable elements
document.querySelectorAll('a, button').forEach((element) => {
  element.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)'; // Make the cursor larger when hovering over links
  });
  element.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)'; // Reset the size
  });
});


const timeline = gsap.timeline();

// Loader Entrance
timeline.to(".loader", {
    duration: 1.5,
    opacity: 1,
    ease: "power2.inOut"
});

// Loader Animation
timeline.to(".loader-clip-top", {
    delay: 0.5,
    clipPath: "inset(0 0 100% 0)",
    duration: 2,
    ease: "power4.inOut",
}, "-=0.5");

timeline.to(".loader-clip-bottom", {
    delay: 0.5,
    clipPath: "inset(100% 0 0 0)",
    duration: 2,
    ease: "power4.inOut",
}, "-=2");

timeline.to(".loader-clip-center", {
    delay: 0.5,
    clipPath: "inset(0 100% 0 0)",
    duration: 2,
    ease: "power4.inOut",
}, "-=2");

// Marquee Text Fade Out
timeline.to(".marquee span", {
    opacity: 0,
    duration: 1,
    ease: "power2.inOut",
}, "-=2");

// Loader Disappear
timeline.to(".loader", {
    delay: 1,
    opacity: 0,
    duration: 1.5,
    ease: "power2.inOut",
    onComplete: () => {
        document.querySelector(".loader").style.display = "none";
    }
});

// Content Reveal
timeline.to(".container", {
    opacity: 1,
    duration: 2,
    ease: "power2.inOut",
}, "-=1");
  // Select all elements with the fade-in class
  const fadeInElements = document.querySelectorAll('.fade-in');

// Create an Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Add visible class
            observer.unobserve(entry.target); // Stop observing after it's visible
        }
    });
});

// Observe each fade-in element
fadeInElements.forEach(element => {
    observer.observe(element);
});
  
// Carousel Logic
const slider = document.querySelector('.slider');
const cards = document.querySelectorAll('.Pricing-card');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
let activeIndex = 1; // Set to 1 to make the second card active

function updateCarousel() {
    const cardWidth = cards[0].offsetWidth;
    const containerWidth = slider.parentElement.offsetWidth;
    const offset = (containerWidth - cardWidth) / 1;

    cards.forEach((card, index) => {
        card.classList.toggle('Pricing-active', index === activeIndex);
    });
}

// Event listeners for carousel navigation
next.addEventListener('click', () => {
    if (activeIndex < cards.length - 1) {
        activeIndex++;
        updateCarousel();
    }
});

prev.addEventListener('click', () => {
    if (activeIndex > 0) {
        activeIndex--;
        updateCarousel();
    }
});

updateCarousel(); // Apply initial state on page load

// Gallery Logic
window.onload = function () {
    const gallery = document.querySelector(".gallery");
    const previewImage = document.querySelector(".preview-img img");

    // Mouse-based rotation with debounce for performance
    let lastMouseMove = 0;
    const mouseMoveHandler = (event) => {
        const now = Date.now();
        if (now - lastMouseMove > 10) { // Only process every 10ms
            const x = event.clientX;
            const y = event.clientY;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;

            const rotateX = 55 + percentY * 2;
            const rotateY = percentX * 2;

            gsap.to(gallery, {
                duration: 1,
                ease: "power2.out",
                rotateX: rotateX,
                rotateY: rotateY,
                overwrite: "auto",
            });
            lastMouseMove = now;
        }
    };
    document.addEventListener("mousemove", mouseMoveHandler);

    // Create gallery items using DocumentFragment for performance
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 30; i++) { // Create 30 items
        const item = document.createElement("div");
        item.className = "item";
        const img = document.createElement("img");
        img.src = "./Resources/img" + ((i % 15) + 1) + ".png";
        item.appendChild(img);
        fragment.appendChild(item);
    }
    gallery.appendChild(fragment); // Append all items at once

    const items = document.querySelectorAll(".item");
    const numberOfItems = items.length;
    const angleIncrement = 360 / numberOfItems;

    items.forEach((item, index) => {
        gsap.set(item, {
            rotationY: 90,
            rotationZ: index * angleIncrement - 90,
            transformOrigin: "50% 500px",
        });

        // Event listeners for mouseover and mouseout
        item.addEventListener("mouseover", function () {
            const imgInsideItem = item.querySelector("img");
            previewImage.src = imgInsideItem.src;
            gsap.to(item, {
                x: 10,
                z: 10,
                y: 10,
                ease: "power2.out",
                duration: 0.5,
            });
        });

        item.addEventListener("mouseout", function () {
            previewImage.src = "./Resources/img";
            gsap.to(item, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power2.out",
                duration: 0.5,
            });
        });
    });
};

// Team Section Logic
document.querySelectorAll('#team-section .team-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        const card = link.querySelector('.TeamCard');
        card.style.opacity = 1;
        card.style.transform = 'translateY(-10px)'; // Slight upward movement
    });

    link.addEventListener('mouseleave', () => {
        const card = link.querySelector('.TeamCard');
        card.style.opacity = 0;
        card.style.transform = 'translateY(0)'; // Reset position
    });
});

// Timeline Animation Visibility Logic


// FAQ Toggle Logic
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        // Close other open answers
        faqQuestions.forEach(item => {
            if (item !== question) {
                item.classList.remove('active');
                item.nextElementSibling.style.maxHeight = null;
            }
        });

        // Toggle active class and max height for clicked question
        question.classList.toggle('active');
        const answer = question.nextElementSibling;
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

const textTypewriter = "At CreativePulse, we blend creativity and technology to elevate brands. Our team specializes in web development, digital marketing, branding, and content creation, delivering tailored solutions for startups and established businesses. Let us drive your digital success.";
const speedTypewriter = 50; // Speed of typing effect
let indexTypewriter = 0;
const typewriterElement = document.getElementById('typewriter');
const words = textTypewriter.split(' '); // Split the text into individual words

// Function to type out each letter of the sentence with a delay
function typeLetter() {
    if (indexTypewriter < words.length) {
        const wordSpan = document.createElement('span'); // Create a span element for each word
        wordSpan.classList.add('word');
        wordSpan.textContent = words[indexTypewriter] + ' '; // Add the word and space
        typewriterElement.appendChild(wordSpan); // Append the word to the typewriter element
        indexTypewriter++;

        // Adjust the delay based on the length of the word
        setTimeout(typeLetter, speedTypewriter * words[indexTypewriter]?.length || speedTypewriter);
    }
}

// Call the function to start typing effect
typeLetter();


// Parallax Effect Logic (with throttle)
let lastMove = 0;
const spansSlow = document.querySelectorAll('.spanSlow');
const spansFast = document.querySelectorAll('.spanFast');
let width = window.innerWidth;

function handleMouseMove(e) {
    const now = Date.now();
    if (now - lastMove > 10) { // Only update every 10ms
        let normalizedPosition = e.pageX / (width / 2) - 1;
        let speedSlow = 100 * normalizedPosition;
        let speedFast = 200 * normalizedPosition;
        spansSlow.forEach((span) => span.style.transform = `translate(${speedSlow}px)`);
        spansFast.forEach((span) => span.style.transform = `translate(${speedFast}px)`);
        lastMove = now;
    }
}

function handleWindowResize() {
    width = window.innerWidth;
}

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', handleWindowResize);


// Add an event listener to the form for the 'submit' event
document.getElementById('contact-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Step 1: Get the form data
    const email = document.getElementById('email').value; // Get the email input value
    const message = document.getElementById('textarea').value; // Get the textarea input value

    console.log('Sending data:', { email, message }); // Debugging: log the data being sent

    // Step 2: Send data to the backend
    try {
        const response = await fetch('http://127.0.0.1:4000/api/contact', { // Use the full URL for backend
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json' // Inform the server we're sending JSON
            },
            body: JSON.stringify({ email, message }) // Convert the data to JSON
        });

        console.log('Response:', response); // Debugging: log the server response

        if (response.ok) {
            // Step 3: Handle successful submission
            alert('We got Your message!'); // Display a success message
            document.getElementById('contact-form').reset(); // Clear the form inputs
        } else {
            // Step 4: Handle errors returned by the server
            const errorData = await response.text(); // Read the error message from the response
            console.error('Server error:', errorData); // Log the error
            alert('There was an issue sending your message. Please try again.');
        }
    } catch (error) {
        // Step 5: Handle network or other unexpected errors
        console.error('Network error:', error); // Log the error for debugging
        alert('Error: ' + error.message);
    }
});
