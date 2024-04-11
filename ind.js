gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
    gsap.to(".sticky", {
        scrollTrigger: {
            trigger: ".sticky",
            start: "top top",
            end: () =>
                "+=" +
                (window.innerHeight +
                    document.querySelector(".website-content").offsetHeight * 0.5
                ),
            scrub: 1,
            pin: true,
        },
        y: 250,
        scale: 0.75,
        rotation: -15,
        ease: "power3.out"

    });

    gsap.fromTo(
        ".website-content", {
        x: -100,
        scale: 0.3,
        rotation: 15,
    },
        {
            scrollTrigger: {
                trigger: ".website-content",
                start: "top 200%",
                end: "top 50%",
                scrub: 1,
            },
            x: 0,
            scale: 1,
            rotation: 0,
            ease: "power3.out"
        }
    );
});

const wrapper = document.querySelector(".tracker");
const emoji = document.querySelector(".emoji");
const emojiFace = document.querySelector(".emoji-face");

const moveEvent = (e) => {
    const wrapperRect = wrapper.getBoundingClientRect();

    const relX = e.clientX - (wrapperRect.left + wrapperRect.width / 2);
    const relY = e.clientY - (wrapperRect.top + wrapperRect.height / 2);

    const emojiMaxD = 350;
    const emojiFaceD = 300;

    const emojidisX = (relX / wrapperRect.width) * emojiMaxD;
    const emojidisY = (relY / wrapperRect.height) * emojiMaxD;

    const emojiFaceDX = (relX / wrapperRect.width) * emojiFaceD;
    const emojiFaceDY = (relY / wrapperRect.height) * emojiFaceD;

    // Calculate mouth size based on mouse movement
    const mouthSize = Math.abs(relX) * 0.2; // Adjust this factor as needed
    // Check if mouth size reaches maximum
    // Change background color based on mouth movement direction
    if (relX < 0 && mouthSize >= 90) {
        emoji.style.backgroundColor = "#fc7eff"; // Change background color to blue for left side
    } else if (relX > 0 && mouthSize >= 90) {
        emoji.style.backgroundColor = "#b3eb16"; // Change background color to green for right side
    } else {
        emoji.style.backgroundColor = "#5546ff"; // Reset background color if not at max size or at center
    }
    gsap.to(emoji, {
        x: emojidisX,
        y: emojidisY,
        ease: "power3.out",
        duration: 0.35,
    });

    gsap.to(emojiFace, {
        x: emojiFaceDX,
        y: emojiFaceDY,
        ease: "power3.out",
        duration: 0.35,
    });

    gsap.to(".mouth", {
        width: mouthSize,
        height: mouthSize,
        ease: "power3.out",
        duration: 0.35,
    });
};


const leaveEvent = () => {
    gsap.to([emoji, emojiFace], {
        x: 0,
        y: 0,
        ease: "power3.out",
        duration: 1,
    });
};

wrapper.addEventListener("mousemove", moveEvent);
wrapper.addEventListener("mouseleave", leaveEvent);
