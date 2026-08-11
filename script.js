/* =========================================================
   FOOD HAVEN - COMPLETE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ================= MOBILE MENU ================= */

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", function () {
            navbar.classList.toggle("active");
        });

        // Menu link click करने पर mobile menu बंद
        const navLinks = navbar.querySelectorAll("a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navbar.classList.remove("active");
            });
        });
    }


    /* ================= CLOSE MENU ON OUTSIDE CLICK ================= */

    document.addEventListener("click", function (event) {

        if (!menuToggle || !navbar) {
            return;
        }

        const clickedInsideMenu =
            navbar.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            navbar.classList.remove("active");
        }
    });


    /* ================= ESC KEY ================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (navbar) {
                navbar.classList.remove("active");
            }

        }

    });


    /* ================= ACTIVE NAVIGATION ================= */

    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".navbar a");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        links.forEach(function (link) {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();


    /* ================= SCROLL REVEAL ================= */

    const revealElements = document.querySelectorAll(
        ".about-card, .menu-card, .special-card, .contact-card"
    );

    const observerOptions = {
        threshold: 0.12
    };

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        observerOptions
    );


    revealElements.forEach(function (element) {

        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        revealObserver.observe(element);

    });


    /* ================= ADD SHOW CLASS ================= */

    const style = document.createElement("style");

    style.textContent = `
        .about-card.show,
        .menu-card.show,
        .special-card.show,
        .contact-card.show {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        .navbar a.active {
            color: #d4af37 !important;
        }
    `;

    document.head.appendChild(style);


    /* ================= SMOOTH ANCHOR SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* ================= CURRENT YEAR ================= */

    const footerYear = document.querySelector(".footer-bottom p");

    if (footerYear) {

        const currentYear = new Date().getFullYear();

        footerYear.innerHTML =
            "© " + currentYear +
            " Food Haven. All Rights Reserved.";

    }


    /* ================= CONSOLE MESSAGE ================= */

    console.log(
        "%cFood Haven Website Loaded Successfully!",
        "color:#d4af37;font-size:16px;font-weight:bold;"
    );

});