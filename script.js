document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const animations = document.querySelectorAll('.animation');

    navItems.forEach((item, index) => {
        item.addEventListener('mouseover', () => {
            animations.forEach(animation => animation.style.width = '0');
            item.querySelector('.animation').style.width = '100%';
        });
        item.addEventListener('mouseout', () => 
            item.querySelector('.animation').style.width = '0');
        });
    });

    const setActive = () => {
        const sections = document.querySelectorAll('section');
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href*=' + sectionId + ']').parentNode.classList.add('active');
            } else {
                document.querySelector('.nav-link[href*=' + sectionId + ']').parentNode.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', setActive);
    const observerOptions = {
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about')) {
                    entry.target.classList.add('text-animate');
                } else if (entry.target.classList.contains('image-container')) {
                    entry.target.classList.add('image-animate');
                } else if (entry.target.classList.contains('skill')) {
                    entry.target.classList.add('animate');
                } else if (entry.target.classList.contains('project-image')) {
                    entry.target.classList.add('animate-left');
                } else if (entry.target.classList.contains('project-description')) {
                    entry.target.classList.add('animate-right');
                }
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    document.querySelectorAll('.image-container, .about, .skill').forEach(element => {
        observer.observe(element);
    });