// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress bar
    initializeProgressBar();
    
    // Theme toggle functionality
    initializeThemeToggle();
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks2 = document.querySelector('.nav-links');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    
    // Function to open mobile menu
    function openMobileMenu() {
        mobileNavMenu.classList.add('active');
        mobileNavOverlay.classList.add('active');
        navToggle.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
        mobileNavMenu.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (mobileNavMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close mobile menu
    mobileNavClose.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking overlay
    mobileNavOverlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const isNavClick = e.target.closest('.nav-container');
            const isMobileMenuClick = e.target.closest('.mobile-nav-menu');
            
            if (!isNavClick && !isMobileMenuClick && mobileNavMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });
    
    // Handle mobile nav link clicks
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-sublink');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // If it's a section link, handle smooth scrolling
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    closeMobileMenu();
                    
                    // Add small delay for menu close animation
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 150);
                }
            } else if (href === '#') {
                // Handle home link
                e.preventDefault();
                closeMobileMenu();
                
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }, 150);
            } else {
                // For external links, just close the menu
                closeMobileMenu();
            }
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNavMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all project cards and timeline items
    const animateElements = document.querySelectorAll('.project-card, .timeline-item');
    animateElements.forEach(el => observer.observe(el));

    // Play button functionality for audio tracks
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isPlaying = this.textContent === '⏸';
            
            // Stop all other playing tracks
            playButtons.forEach(btn => {
                btn.textContent = '▶';
                btn.style.background = 'var(--primary)';
            });
            
            if (!isPlaying) {
                this.textContent = '⏸';
                this.style.background = 'var(--secondary)';
                
                // Here you would integrate with actual audio playback
                // For now, we'll simulate with a timeout
                setTimeout(() => {
                    this.textContent = '▶';
                    this.style.background = 'var(--primary)';
                }, 3000);
            }
        });
    });

    // Interactive demo text animation
    const demoTexts = document.querySelectorAll('.demo-text');
    demoTexts.forEach((text, index) => {
        text.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.color = 'var(--secondary)';
        });
        
        text.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.color = 'var(--primary)';
        });
    });

    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const floatingElements = document.querySelectorAll('.element');
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Dynamic background particles (optional enhancement)
    createBackgroundParticles();

    // Initialize floating elements
    initializeFloatingElements();

    // Bresland-style interactions
    initializeBreslandFeatures();

    // Mobile-specific enhancements for Deep Sleepers card
    initializeMobileOptimizations();
});

// Background particles system
function createBackgroundParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const opacity = Math.random() * 0.3 + 0.1;
    const duration = Math.random() * 20 + 10;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(99, 102, 241, ${opacity}) 0%, transparent 70%);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: float-particle ${duration}s linear infinite;
    `;

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
        createParticle(container); // Create new particle
    }, duration * 1000);
}

// Add particle animation keyframes
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
    
    @keyframes animate-in {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: animate-in 0.6s ease-out forwards;
    }
    
    .project-card, .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .project-card.animate-in, .timeline-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Mobile navigation styles */
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(15, 15, 35, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--border);
            flex-direction: column;
            padding: var(--spacing-md);
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }
        
        .nav-links.active {
            transform: translateY(0);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(particleStyle);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    const body = document.body;
    body.style.animation = 'rainbow 2s ease-in-out';
    
    const message = document.createElement('div');
    message.textContent = '🎉 You found the secret! Extra creative energy unlocked! 🎉';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: white;
        padding: var(--spacing-lg);
        border-radius: var(--radius-lg);
        font-weight: 600;
        z-index: 1000;
        animation: bounce-in 0.5s ease-out;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        body.style.animation = '';
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 3000);
}

// Add easter egg styles
const easterEggStyle = document.createElement('style');
easterEggStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes bounce-in {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(easterEggStyle);

// Bresland-style interactions
function initializeBreslandFeatures() {
    // Interactive sonnet refresh
    const refreshLine = document.querySelector('.sonnet-line.refresh');
    if (refreshLine) {
        refreshLine.addEventListener('click', function() {
            const sonnetLines = document.querySelectorAll('.sonnet-line:not(.refresh)');
            sonnetLines.forEach(line => {
                line.style.opacity = '0.3';
                line.style.transform = 'translateX(-10px)';
            });
            
            setTimeout(() => {
                const shakespeareanLines = [
                    "When forty winters shall besiege thy brow",
                    "Shall I compare thee to a summer's day?",
                    "Two households, both alike in dignity",
                    "The whirligig of time brings in his revenges",
                    "But thy eternal summer shall not fade",
                    "And dig deep trenches in thy beauty's field",
                    "Rough winds do shake the darling buds of May",
                    "From fairest creatures we desire increase"
                ];
                
                sonnetLines.forEach((line, index) => {
                    const randomLine = shakespeareanLines[Math.floor(Math.random() * shakespeareanLines.length)];
                    line.textContent = randomLine;
                    line.style.opacity = '1';
                    line.style.transform = 'translateX(0)';
                });
            }, 300);
        });
    }

    // Album art play interactions
    const albumArts = document.querySelectorAll('.album-art');
    albumArts.forEach(art => {
        art.addEventListener('click', function() {
            const playOverlay = this.querySelector('.play-overlay');
            const isPlaying = playOverlay.textContent === '⏸';
            
            // Reset all other album arts
            albumArts.forEach(otherArt => {
                const otherOverlay = otherArt.querySelector('.play-overlay');
                otherOverlay.textContent = '▶';
                otherArt.style.transform = 'scale(1)';
            });
            
            if (!isPlaying) {
                playOverlay.textContent = '⏸';
                this.style.transform = 'scale(1.05)';
                
                // Simulate playback
                setTimeout(() => {
                    playOverlay.textContent = '▶';
                    this.style.transform = 'scale(1)';
                }, 3000);
            }
        });
    });

    // 3D text rotation on hover
    const rotatingTexts = document.querySelectorAll('.rotating-text');
    rotatingTexts.forEach(text => {
        text.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'rotateX(25deg) rotateY(25deg) scale(1.1)';
        });
        
        text.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    });

    // Waveform animation on hover
    const waveforms = document.querySelectorAll('.waveform');
    waveforms.forEach(waveform => {
        const waveBars = waveform.querySelectorAll('.wave-bar');
        
        waveform.addEventListener('mouseenter', function() {
            waveBars.forEach((bar, index) => {
                bar.style.animationDuration = '0.5s';
                bar.style.background = 'var(--secondary)';
            });
        });
        
        waveform.addEventListener('mouseleave', function() {
            waveBars.forEach((bar, index) => {
                bar.style.animationDuration = '1.5s';
                bar.style.background = 'var(--primary)';
            });
        });
    });
}

// Remove theme toggle functionality - dark mode only
function initializeThemeToggle() {
    // Dark mode is now the only mode - no toggle needed
    // Remove any light mode classes if they exist
    document.documentElement.classList.remove('light-mode');
    
    // Hide the theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.style.display = 'none';
    }
}

// Progress Bar Functionality
function initializeProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    
    if (!progressBar) return;
    
    // Update progress bar on scroll
    function updateProgressBar() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + '%';
        
        // Add glow effect when scrolling
        if (scrolled > 0) {
            progressBar.classList.add('active');
        } else {
            progressBar.classList.remove('active');
        }
    }
    
    // Add scroll event listener with throttling
    let ticking = false;
    function requestUpdateProgressBar() {
        if (!ticking) {
            requestAnimationFrame(updateProgressBar);
            ticking = true;
            setTimeout(() => ticking = false, 16); // ~60fps
        }
    }
    
    window.addEventListener('scroll', requestUpdateProgressBar);
    
    // Initialize progress bar
    updateProgressBar();
}

// Enhanced Floating Elements Animation
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Add mouseover interaction
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5) rotate(20deg)';
            this.style.opacity = '0.8';
            this.style.zIndex = '10';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.opacity = '';
            this.style.zIndex = '';
        });
        
        // Add random movement
        setInterval(() => {
            if (!element.matches(':hover')) {
                const randomX = (Math.random() - 0.5) * 20;
                const randomY = (Math.random() - 0.5) * 20;
                element.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }
        }, 3000 + (index * 1000));
    });
}

// Mobile-specific enhancements for Deep Sleepers card
function initializeMobileOptimizations() {
    // Touch feedback for streaming links on mobile
    const streamingLinks = document.querySelectorAll('.streaming-link');
    
    streamingLinks.forEach(link => {
        // Add touch feedback
        link.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        link.addEventListener('touchend', function(e) {
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = 'all 0.2s ease';
            }, 100);
        });
        
        // Prevent double-tap zoom on streaming links
        link.addEventListener('touchend', function(e) {
            e.preventDefault();
            // Use a small delay to distinguish from scroll
            setTimeout(() => {
                window.open(this.href, '_blank');
            }, 50);
        });
    });
    
    // Optimize image loading for mobile
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(img => {
        // Add loading optimization
        img.setAttribute('loading', 'lazy');
        
        // Add error handling for missing images
        img.addEventListener('error', function() {
            this.style.background = 'var(--surface)';
            this.style.minHeight = '200px';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.innerHTML = '<span style="color: var(--text-muted); font-size: 0.8rem;">Image not available</span>';
        });
    });
    
    // Mobile-specific viewport height adjustment
    function setMobileViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set initial viewport height
    setMobileViewportHeight();
    
    // Update on orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(setMobileViewportHeight, 100);
    });
    
    // Update on resize
    window.addEventListener('resize', setMobileViewportHeight);
    
    // Close mobile navigation when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinksContainer.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Close navigation when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const isNavClick = e.target.closest('.nav-container');
            if (!isNavClick && navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
}
