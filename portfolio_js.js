// Main JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Dark Mode Toggle
    initDarkMode();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Navbar scroll effect
    initNavbarScroll();
    
    // Back to top button
    initBackToTop();
    
    // Load dynamic content
    loadAboutContent();
    loadExperienceContent();
    loadProjectsContent();
    
    // Mobile menu close on link click
    initMobileMenu();
});

// Dark Mode Functionality
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.checked = true;
        if (themeToggleDesktop) themeToggleDesktop.checked = true;
    }
    
    // Theme toggle handlers
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Sync both toggles
        if (themeToggle) themeToggle.checked = newTheme === 'dark';
        if (themeToggleDesktop) themeToggleDesktop.checked = newTheme === 'dark';
    }
    
    if (themeToggle) themeToggle.addEventListener('change', toggleTheme);
    if (themeToggleDesktop) themeToggleDesktop.addEventListener('change', toggleTheme);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });
}

// navbar collapse item 
document.addEventListener('click', function(event) {
  const navbarCollapse = document.getElementById('navbarNav'); // The ID of your collapsible navbar div
  const navbarToggler = document.querySelector('.navbar-toggler'); // The hamburger icon button

  // Check if the navbar is currently open (Bootstrap adds 'show' class)
  if (navbarCollapse.classList.contains('show')) {
    // Check if the clicked element is *not* inside the navbarCollapse element
    // AND *not* the navbarToggler button itself.
    // This ensures:
    // 1. Clicks outside the opened menu close it.
    // 2. Clicks on the toggler (to close it) are handled by Bootstrap's default behavior,
    //    and this custom handler doesn't interfere.
    // 3. Clicks inside the opened menu do NOT close it (unless specifically desired for nav links).
    if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
      // Hide the navbar using Bootstrap's collapse method
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    }
  }
});

// Optional: Also collapse when a nav-link inside the navbar is clicked
// This is very common for single-page applications or when
// clicking an anchor link on the same page.
document.querySelectorAll('#navbarNav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    }
  });
});

// Load About Content
async function loadAboutContent() {
    try {
        const response = await fetch('portfolio_cv_json.json');
        const cvData = await response.json();
        
        const aboutContent = document.getElementById('about-content');
        aboutContent.innerHTML = renderAboutSection(cvData);
        
        // Re-initialize AOS for new content
        AOS.refresh();
    } catch (error) {
        console.error('Error loading CV data:', error);
        document.getElementById('about-content').innerHTML = `
            <div class="alert alert-warning text-center" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Unable to load CV data. Please check if the cv.json file exists.
            </div>
        `;
    }
}

// Load Experience Content
async function loadExperienceContent() {
    try {
        const response = await fetch('portfolio_experience_json.json');
        const experienceData = await response.json();
        
        const experienceContent = document.getElementById('experience');
        experienceContent.innerHTML = renderExperienceSection(experienceData);
        
        // Re-initialize AOS for new content
        AOS.refresh();
    } catch (error) {
        console.error('Error loading experience data:', error);
        document.getElementById('experience-content').innerHTML = `
            <div class="alert alert-warning text-center" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Unable to load experience data. Please check if the experience.json file exists.
            </div>
        `;
    }
}

// Load Projects Content
async function loadProjectsContent() {
    try {
        const response = await fetch('portfolio_projects_json.json');
        const projectsData = await response.json();
        
        const projectsContent = document.getElementById('projects');
        projectsContent.innerHTML = renderProjectsSection(projectsData);
        
        // Re-initialize AOS for new content
        AOS.refresh();
    } catch (error) {
        console.error('Error loading projects data:', error);
        document.getElementById('projects-content').innerHTML = `
            <div class="alert alert-warning text-center" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Unable to load projects data. Please check if the projects.json file exists.
            </div>
        `;
    }
}

// Render About Section
function renderAboutSection(cvData) {
    return `
        <div class="row">
            <div class="col-lg-8 mx-auto" data-aos="fade-up">
                <div class="about-content">
                    <p class="lead text-center mb-4">${cvData.summary || 'Passionate developer with expertise in modern web technologies.'}</p>
                    
                    <div class="row mt-5">
                        <div class="col-md-6 mb-4" data-aos="fade-right" data-aos-delay="100">
                            <h4 class="mb-3"><i class="fas fa-user me-2 text-primary"></i>Personal Info</h4>
                            <ul class="list-unstyled">
                                <li><strong>Name:</strong> ${cvData.name || 'Adel Ibrahim'}</li>
                                <li><strong>Email:</strong> ${cvData.email || 'adelishaban99@gmail.com'}</li>
                                <li><strong>Phone:</strong> ${cvData.phone || '+20 112 922 0777'}</li>
                                <li><strong>Location:</strong> ${cvData.location || 'Cairo, Egypt'}</li>
                            </ul>
                        </div>
                        <div class="col-md-6 mb-4" data-aos="fade-left" data-aos-delay="200">
                            <h4 class="mb-3"><i class="fas fa-graduation-cap me-2 text-primary"></i>Education</h4>
                            ${cvData.education ? cvData.education.map(edu => `
                                <div class="mb-3">
                                    <h6 class="mb-1">${edu.degree}</h6>
                                    <p class="text-muted mb-1">${edu.institution}</p>
                                    <small class="text-muted">${edu.year}</small>
                                </div>
                            `).join('') : '<p class="text-muted">Education information not available.</p>'}
                        </div>
                    </div>
                    
                    ${cvData.skills ? `
                        <div class="skills-section mt-5" data-aos="fade-up" data-aos-delay="300">
                            <h4 class="text-center mb-4"><i class="fas fa-code me-2 text-primary"></i>Skills</h4>
                            <div class="row">
                                ${cvData.skills.map(skill => `
                                    <div class="col-md-3 col-sm-6 mb-3">
                                        <div class="skill-item">
                                            <h5>${skill.name}</h5>
                                            <p class="text-muted mb-0">${skill.level || 'Proficient'}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Render Experience Section
function renderExperienceSection(experienceData) {
    if (!experienceData.experiences || experienceData.experiences.length === 0) {
        return `
            <div class="alert alert-info text-center" role="alert">
                <i class="fas fa-info-circle me-2"></i>
                No experience data available. Please add your experience to the experience.json file.
            </div>
        `;
    }
    
    return `
        <div class="row">
            <div class="col-lg-10 mx-auto">
                <div class="timeline">
                    ${experienceData.experiences.map((exp, index) => `
                        <div class="timeline-item" data-aos="fade-up" data-aos-delay="${index * 100}">
                            <div class="timeline-date">${exp.startDate} - ${exp.endDate}</div>
                            <h3 class="timeline-title">${exp.title}</h3>
                            <div class="timeline-company">${exp.company}</div>
                            ${exp.achievements ? `
                                <ul class="mt-2">
                                    ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                                </ul>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Render Projects Section
function renderProjectsSection(projectsData) {
    if (!projectsData.projects || projectsData.projects.length === 0) {
        return `
            <div class="alert alert-info text-center" role="alert">
                <i class="fas fa-info-circle me-2"></i>
                No projects data available. Please add your projects to the projects.json file.
            </div>
        `;
    }
    
    return `
        <div class="row">
            ${projectsData.projects.map((project, index) => `
                <div class="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="card project-card h-100">
                        <div class="project-header">
                            <h3 class="project-title">${project.title}</h3>
                            <div class="tech-stack">
                                ${project.techStack.map(tech => `
                                    <span class="tech-tag">${tech}</span>
                                `).join('')}
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-text">                           
                            ${project.features ? `
                                <ul class="mt-2">
                                    ${project.features.map(features => `<li>${features}</li>`).join('')}
                                </ul>
                            ` : ''}</p>
                            ${project.liveUrl || project.githubUrl ? `
                                <div class="project-links mt-auto">
                                    ${project.liveUrl ? `
                                        <a href="${project.liveUrl}" class="btn btn-primary btn-sm me-2" target="_blank">
                                            <i class="fas fa-external-link-alt me-1"></i>Live Demo
                                        </a>
                                    ` : ''}
                                    ${project.githubUrl ? `
                                        <a href="${project.githubUrl}" class="btn btn-outline-primary btn-sm" target="_blank">
                                            <i class="fab fa-github me-1"></i>Code
                                        </a>
                                    ` : ''}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Utility Functions
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = `
        <div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.innerHTML = `
        <div class="alert alert-danger text-center" role="alert">
            <i class="fas fa-exclamation-triangle me-2"></i>
            ${message}
        </div>
    `;
}

// Typing Animation for Hero Section (Optional Enhancement)
function initTypingAnimation() {
    const textElement = document.querySelector('.hero-typing');
    if (!textElement) return;
    
    const texts = ['Full Stack Developer', 'Web Designer', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// Performance Optimization: Lazy Loading Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize additional features when needed
 initTypingAnimation();
// initLazyLoading();