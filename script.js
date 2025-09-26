    // --- PRELOADER ---
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            preloader.classList.add('loaded');
        });

        // --- LUCIDE ICONS INITIALIZATION ---
        lucide.createIcons();

        // --- MOBILE MENU TOGGLE ---
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu on link click
        document.querySelectorAll('#mobile-menu a[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // --- HEADER APPEARANCE ON SCROLL ---
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('py-2');
                header.classList.remove('py-4');
            } else {
                header.classList.remove('py-2');
                header.classList.add('py-4');
            }
        });

        // --- SCROLL REVEAL ANIMATIONS ---
        function revealSections() {
            const reveals = document.querySelectorAll('.reveal');
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const elementVisible = 100;

                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add('active');
                }
            }

            const skillBars = document.querySelectorAll('.skill-bar');
             for (let i = 0; i < skillBars.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = skillBars[i].getBoundingClientRect().top;
                const elementVisible = 50;

                if (elementTop < windowHeight - elementVisible) {
                    skillBars[i].classList.add('active');
                }
            }
        }
        window.addEventListener('scroll', revealSections);
        revealSections(); // Initial check on page load

        // --- 3D TILT EFFECT FOR PROJECT CARDS ---
        const projectCards = document.querySelectorAll('.project-card-container');
        projectCards.forEach(cardContainer => {
            const card = cardContainer.querySelector('.project-card');
            cardContainer.addEventListener('mousemove', (e) => {
                let rect = cardContainer.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;
                let midCardWidth = rect.width / 2;
                let midCardHeight = rect.height / 2;
                let angleY = -(x - midCardWidth) / 8;
                let angleX = (y - midCardHeight) / 8;
                card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
            });
            cardContainer.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
        
        // --- TESTIMONIAL SLIDER ---
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        const prevTestimonialBtn = document.getElementById('prev-testimonial');
        const nextTestimonialBtn = document.getElementById('next-testimonial');
        let currentTestimonialIndex = 0;
        let testimonialInterval = setInterval(showNextTestimonial, 5000);

        function showTestimonial(index) {
            testimonialItems.forEach((item, i) => {
                item.classList.add('opacity-0', 'absolute');
                item.style.transform = 'translateX(-100%)';
                if (i === index) {
                    item.classList.remove('opacity-0');
                    item.style.transform = 'translateX(0)';
                }
            });
        }
        
        function showNextTestimonial() {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
            showTestimonial(currentTestimonialIndex);
        }

        function resetInterval() {
             clearInterval(testimonialInterval);
             testimonialInterval = setInterval(showNextTestimonial, 5000);
        }

        nextTestimonialBtn.addEventListener('click', () => {
            showNextTestimonial();
            resetInterval();
        });
        
        prevTestimonialBtn.addEventListener('click', () => {
            currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentTestimonialIndex);
            resetInterval();
        });

        showTestimonial(0); // Show the first testimonial initially

        // --- PARTICLE.JS FOR HERO BACKGROUND ---
        const canvas = document.getElementById('particle-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            let particlesArray;
            let mouse = { x: null, y: null, radius: (canvas.height/120) * (canvas.width/120) };

            window.addEventListener('mousemove', function(event) {
                mouse.x = event.x;
                mouse.y = event.y;
            });
            
            class Particle {
                constructor(x, y, directionX, directionY, size, color) {
                    this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color;
                }
                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                    ctx.fillStyle = 'rgba(20, 184, 166, 0.2)';
                    ctx.fill();
                }
                update() {
                    if (this.x > canvas.width || this.x < 0) { this.directionX = -this.directionX; }
                    if (this.y > canvas.height || this.y < 0) { this.directionY = -this.directionY; }
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx*dx + dy*dy);
                    if (distance < mouse.radius + this.size){
                        if (mouse.x < this.x && this.x < canvas.width - this.size * 10) { this.x += 3; }
                        if (mouse.x > this.x && this.x > this.size * 10) { this.x -= 3; }
                        if (mouse.y < this.y && this.y < canvas.height - this.size * 10) { this.y += 3; }
                        if (mouse.y > this.y && this.y > this.size * 10) { this.y -= 3; }
                    }
                    this.x += this.directionX;
                    this.y += this.directionY;
                    this.draw();
                }
            }

            function init() {
                particlesArray = [];
                let numberOfParticles = (canvas.height * canvas.width) / 9000;
                for (let i = 0; i < numberOfParticles; i++) {
                    let size = (Math.random() * 2) + 1;
                    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                    let directionX = (Math.random() * .5) - 0.25;
                    let directionY = (Math.random() * .5) - 0.25;
                    particlesArray.push(new Particle(x, y, directionX, directionY, size));
                }
            }

            function animate() {
                requestAnimationFrame(animate);
                ctx.clearRect(0,0,innerWidth, innerHeight);
                for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); }
                connect();
            }
            
            function connect(){
                let opacityValue = 1;
                for (let a = 0; a < particlesArray.length; a++) {
                    for (let b = a; b < particlesArray.length; b++) {
                        let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                        if (distance < (canvas.width/7) * (canvas.height/7)) {
                            opacityValue = 1 - (distance/20000);
                            ctx.strokeStyle = `rgba(20, 184, 166, ${opacityValue * 0.1})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }
            
            window.addEventListener('resize', function(){
                canvas.width = innerWidth;
                canvas.height = innerHeight;
                mouse.radius = ((canvas.height/80) * (canvas.height/80));
                init();
            });
            
            window.addEventListener('mouseout', function(){ mouse.x = undefined; mouse.y = undefined; })

            init();
            animate();
        }