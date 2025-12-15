// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (html.getAttribute('data-theme') === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Initialize icon
updateThemeIcon();

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Typing Animation for Hero Roles
const typedRolesElement = document.getElementById('typed-roles');
if (typedRolesElement) {
    const roles = [
        "4th Year CSE Student",
        "AI Researcher",
        "Developer",
        "Problem Solver",
        "Tech Enthusiast"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeRoles() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedRolesElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedRolesElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(typeRoles, typingSpeed);
    }

    // Start typing after a short delay
    setTimeout(typeRoles, 500);
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ==========================================
// Profile Image Flip Gallery
// ==========================================
const profileFlipper = document.getElementById('profile-flipper');
if (profileFlipper) {
    const flipCard = profileFlipper.querySelector('.profile-flip-card');
    const frontImg = document.getElementById('front-img');
    const backImg = document.getElementById('back-img');

    // Array of images (starting with dp5, then cycling through all)
    const profileImages = [
        'img/dp5.jpg',
        'img/dp.jpg',
        'img/dp1.jpg',
        'img/dp2.jpg',
        'img/dp3.jpg',
        'img/dp4.jpg'
    ];

    let currentImageIndex = 0;
    let isFlipped = false;

    // Preload all images
    profileImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    profileFlipper.addEventListener('click', () => {
        isFlipped = !isFlipped;

        // Toggle flip animation
        if (isFlipped) {
            flipCard.classList.add('flipped');
        } else {
            flipCard.classList.remove('flipped');
        }

        // After half the animation, update the hidden side's image
        setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % profileImages.length;
            const nextIndex = (currentImageIndex + 1) % profileImages.length;

            if (isFlipped) {
                // Front is hidden, update front image for next flip
                frontImg.src = profileImages[nextIndex];
            } else {
                // Back is hidden, update back image for next flip
                backImg.src = profileImages[nextIndex];
            }
        }, 400); // Half of the 0.8s animation duration
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Custom Cursor (Desktop only)
const cursor = document.getElementById('cursor-follower');
if (cursor && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Enlarge cursor on hover over interactive elements
    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(212, 165, 165, 0.2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

// GSAP Animations (if GSAP is loaded)
if (typeof gsap !== 'undefined') {
    // Hero Section Animation
    gsap.from('.hero-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.hero-description', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.4,
        ease: 'power3.out'
    });

    gsap.from('.hero-buttons', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.6,
        ease: 'power3.out'
    });

    // Scroll Trigger Animations
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animate sections on scroll
        gsap.utils.toArray('section').forEach(section => {
            gsap.from(section.children, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            });
        });

        // ✨ Research Interests Pills - Staggered Entrance Animation
        const researchInterests = document.querySelector('.research-interests');
        const interestPills = document.querySelectorAll('.interest-pill');

        if (researchInterests && interestPills.length > 0) {
            // Set initial state for pills
            gsap.set(interestPills, {
                opacity: 0,
                y: 30,
                scale: 0.8,
                rotationX: -15
            });

            // Animate Research Interests heading
            gsap.from('.research-interests h3', {
                scrollTrigger: {
                    trigger: researchInterests,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                x: -30,
                duration: 0.6,
                ease: 'power3.out'
            });

            // Staggered pills animation
            gsap.to(interestPills, {
                scrollTrigger: {
                    trigger: researchInterests,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                duration: 0.7,
                stagger: {
                    each: 0.12,
                    from: 'start',
                    ease: 'power2.out'
                },
                ease: 'back.out(1.7)'
            });

            // 🎯 Magnetic Hover Effect for Pills
            interestPills.forEach(pill => {
                pill.addEventListener('mousemove', (e) => {
                    const rect = pill.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    gsap.to(pill, {
                        x: x * 0.3,
                        y: y * 0.3,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                pill.addEventListener('mouseleave', () => {
                    gsap.to(pill, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: 'elastic.out(1, 0.3)'
                    });
                });

                // Pulse animation on click
                pill.addEventListener('click', () => {
                    gsap.to(pill, {
                        scale: 0.95,
                        duration: 0.1,
                        yoyo: true,
                        repeat: 1,
                        ease: 'power2.inOut'
                    });
                });
            });
        }
    }
}

// Three.js Background (if Three.js is loaded)
if (typeof THREE !== 'undefined') {
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas && heroCanvas.offsetWidth > 0) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, heroCanvas.offsetWidth / heroCanvas.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(heroCanvas.offsetWidth, heroCanvas.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        heroCanvas.appendChild(renderer.domElement);

        // Create particles
        const geometry = new THREE.BufferGeometry();
        const particlesCount = 100;
        const positions = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            color: 0xd4a5a5,
            size: 0.05,
            transparent: true,
            opacity: 0.6
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        camera.position.z = 5;

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            particles.rotation.y += 0.001;
            particles.rotation.x += 0.0005;
            renderer.render(scene, camera);
        }
        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            if (heroCanvas.offsetWidth > 0) {
                camera.aspect = heroCanvas.offsetWidth / heroCanvas.offsetHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(heroCanvas.offsetWidth, heroCanvas.offsetHeight);
            }
        });
    }
}

// Form Submission (prevent default)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! This is a demo portfolio, so the form is not actually submitting.');
    });
}

// Download CV Button (non-functional)
const downloadBtn = document.querySelector('.download-cv-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('CV download feature coming soon!');
    });
}

console.log('Portfolio loaded successfully! 🚀');

// ==========================================
// ✨ EDUCATION JOURNEY ANIMATIONS
// ==========================================

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const journeyContainer = document.querySelector('.journey-container');
    const milestones = document.querySelectorAll('.milestone');
    const studentCharacter = document.getElementById('student-avatar');
    const roadProgress = document.querySelector('.road-progress');

    if (journeyContainer && milestones.length > 0) {
        // Set initial state for milestones
        gsap.set(milestones, {
            opacity: 0,
            y: 50,
            scale: 0.8
        });

        // Set initial state for road progress
        if (roadProgress) {
            gsap.set(roadProgress, { width: '0%' });
        }

        // Animate road progress on scroll
        if (roadProgress) {
            gsap.to(roadProgress, {
                scrollTrigger: {
                    trigger: journeyContainer,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                width: '75%',
                duration: 1.5,
                ease: 'power3.out'
            });
        }

        // Staggered milestones entrance
        gsap.to(milestones, {
            scrollTrigger: {
                trigger: journeyContainer,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: {
                each: 0.2,
                from: 'start'
            },
            ease: 'back.out(1.7)'
        });

        // Animate student character on scroll
        if (studentCharacter) {
            gsap.set(studentCharacter, { opacity: 0, scale: 0 });

            gsap.to(studentCharacter, {
                scrollTrigger: {
                    trigger: journeyContainer,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 1,
                scale: 1,
                duration: 0.6,
                delay: 1,
                ease: 'elastic.out(1, 0.5)'
            });
        }

        // Enhanced hover animations with GSAP
        milestones.forEach((milestone, index) => {
            const card = milestone.querySelector('.milestone-card');
            const marker = milestone.querySelector('.milestone-marker');

            milestone.addEventListener('mouseenter', () => {
                // Move student to this milestone (desktop only)
                if (studentCharacter && window.innerWidth > 900) {
                    const positions = ['12%', '37%', '62%', '87%'];
                    gsap.to(studentCharacter, {
                        left: positions[index] || '70%',
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                }

                // Enhanced card hover
                gsap.to(card, {
                    y: -10,
                    duration: 0.3,
                    ease: 'power2.out'
                });

                // Marker bounce
                gsap.to(marker, {
                    scale: 1.15,
                    duration: 0.3,
                    ease: 'back.out(2)'
                });
            });

            milestone.addEventListener('mouseleave', () => {
                // Return student to university (current stage)
                if (studentCharacter && window.innerWidth > 900) {
                    gsap.to(studentCharacter, {
                        left: '70%',
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                }

                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });

                gsap.to(marker, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
}

// ==========================================
// ✨ 3D FUTURISTIC EDUCATION SECTION
// ==========================================

// Custom Cursor for Education Section
const eduCursor = document.getElementById('edu-cursor');
const educationSection = document.querySelector('.education-section-3d');

if (eduCursor && educationSection) {
    let cursorX = 0, cursorY = 0;
    let targetX = 0, targetY = 0;

    // Smooth cursor following
    const animateCursor = () => {
        cursorX += (targetX - cursorX) * 0.15;
        cursorY += (targetY - cursorY) * 0.15;
        eduCursor.style.left = cursorX + 'px';
        eduCursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Track mouse in education section
    educationSection.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        eduCursor.style.display = 'block';
    });

    educationSection.addEventListener('mouseleave', () => {
        eduCursor.style.display = 'none';
    });

    // Custom cursor grows on hovering cards
    const orbitalCards = document.querySelectorAll('.orbital-card');
    orbitalCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            eduCursor.classList.add('cursor-hover');
            const ring = eduCursor.querySelector('.edu-cursor-ring');
            if (ring) {
                ring.style.width = '60px';
                ring.style.height = '60px';
                ring.style.borderColor = '#d4a5a5';
            }
        });
        card.addEventListener('mouseleave', () => {
            eduCursor.classList.remove('cursor-hover');
            const ring = eduCursor.querySelector('.edu-cursor-ring');
            if (ring) {
                ring.style.width = '40px';
                ring.style.height = '40px';
            }
        });
    });
}

// Three.js Particle Background for Education Section
if (typeof THREE !== 'undefined') {
    const eduCanvas = document.getElementById('edu-3d-canvas');
    if (eduCanvas && eduCanvas.parentElement) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, eduCanvas.parentElement.offsetWidth / eduCanvas.parentElement.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: eduCanvas, alpha: true, antialias: true });

        renderer.setSize(eduCanvas.parentElement.offsetWidth, eduCanvas.parentElement.offsetHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create orbiting particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 100;
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const radius = 3 + Math.random() * 2;
            positions[i * 3] = Math.cos(theta) * radius;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
            positions[i * 3 + 2] = Math.sin(theta) * radius;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            color: 0xd4a5a5,
            size: 0.05,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // Create orbital ring
        const ringGeometry = new THREE.TorusGeometry(4, 0.01, 8, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xd4a5a5,
            transparent: true,
            opacity: 0.3
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        scene.add(ring);

        camera.position.z = 6;

        let animationId;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            particles.rotation.y += 0.002;
            ring.rotation.z += 0.001;
            renderer.render(scene, camera);
        };

        // Only animate when section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                } else {
                    cancelAnimationFrame(animationId);
                }
            });
        }, { threshold: 0.1 });

        if (educationSection) {
            observer.observe(educationSection);
        }

        // Handle resize
        window.addEventListener('resize', () => {
            if (eduCanvas.parentElement) {
                renderer.setSize(eduCanvas.parentElement.offsetWidth, eduCanvas.parentElement.offsetHeight);
                camera.aspect = eduCanvas.parentElement.offsetWidth / eduCanvas.parentElement.offsetHeight;
                camera.updateProjectionMatrix();
            }
        });
    }
}

// GSAP Animations for Orbital Cards
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const orbitalCards = document.querySelectorAll('.orbital-card');
    const orbitalContainer = document.getElementById('orbital-cards');
    const navDots = document.querySelectorAll('.nav-dot');

    if (orbitalCards.length > 0 && orbitalContainer) {
        // Set initial state
        gsap.set(orbitalCards, {
            opacity: 0,
            y: 80,
            rotateY: -15,
            scale: 0.9
        });

        // Staggered entrance
        gsap.to(orbitalCards, {
            scrollTrigger: {
                trigger: orbitalContainer,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Navigation dots click
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                navDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');

                // Highlight corresponding card
                orbitalCards.forEach((card, cardIndex) => {
                    if (cardIndex === index) {
                        gsap.to(card, {
                            scale: 1.08,
                            rotateY: 5,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                    } else {
                        gsap.to(card, {
                            scale: 0.95,
                            opacity: 0.6,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                    }
                });

                // Reset after 2 seconds
                setTimeout(() => {
                    orbitalCards.forEach(card => {
                        gsap.to(card, {
                            scale: 1,
                            opacity: 1,
                            rotateY: 0,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                    });
                }, 2000);
            });
        });
    }
}

// ==========================================
// ✨ SKILLS UNIVERSE - 3D FLIP CARDS
// ==========================================

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const skillCards = document.querySelectorAll('.skill-planet-card');
    const skillsContainer = document.querySelector('.skills-universe-container');

    if (skillCards.length > 0 && skillsContainer) {
        // Set initial state for cards
        gsap.set(skillCards, {
            opacity: 0,
            y: 80,
            scale: 0.9
        });

        // Staggered entrance animation
        gsap.to(skillCards, {
            scrollTrigger: {
                trigger: skillsContainer,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Animate orbit skills on hover - scale up
        skillCards.forEach(card => {
            const orbitSkills = card.querySelectorAll('.orbit-skill');

            card.addEventListener('mouseenter', () => {
                orbitSkills.forEach((skill, index) => {
                    gsap.to(skill, {
                        scale: 1.15,
                        duration: 0.4,
                        delay: index * 0.05,
                        ease: 'back.out(1.5)'
                    });
                });
            });

            card.addEventListener('mouseleave', () => {
                orbitSkills.forEach(skill => {
                    gsap.to(skill, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });
        });
    }

    // Skills tagline animation
    const skillsTagline = document.querySelector('.skills-tagline');
    if (skillsTagline) {
        gsap.from(skillsTagline, {
            scrollTrigger: {
                trigger: '.skills-section-universe',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power3.out'
        });
    }
}

