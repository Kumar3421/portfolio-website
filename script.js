/* ============================================
   KUMAR SHANTANU — PORTFOLIO SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Particle Background ----
  initParticles();

  // ---- Navbar Scroll Effect ----
  initNavbar();

  // ---- Typewriter Effect ----
  initTypewriter();

  // ---- Scroll Reveal ----
  initScrollReveal();

  // ---- Mobile Menu ----
  initMobileMenu();

  // ---- Smooth Scroll ----
  initSmoothScroll();

  // ---- Active Nav Highlight ----
  initActiveNav();
});

// ============================================
// PARTICLES
// ============================================
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height, particles;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100, 255, 218, ${this.opacity})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    const count = Math.min(Math.floor((width * height) / 12000), 120);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const opacity = (1 - dist / 150) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(100, 255, 218, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    if (window.DISABLE_ANIMATIONS) return;
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }

  init();
  animate();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(init, 200);
  });
}

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

// ============================================
// TYPEWRITER
// ============================================
function initTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;

  const texts = [
    'Software Engineer',
    'Java Developer',
    'Spring Boot Expert',
    'Salesforce Professional',
    'AI/ML Enthusiast',
    'Cloud Computing Learner',
    'Problem Solver'
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 1200);
}

// ============================================
// SCROLL REVEAL
// ============================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.glass-card, .timeline-item, .section-title, .project-card, .skill-chart-card, .achievement-card'
  );

  revealElements.forEach((el, index) => {
    if (!el.classList.contains('about-card')) {
      el.classList.add('reveal');
      // Staggered reveal delay
      el.style.transitionDelay = `${(index % 3) * 0.15}s`;
    }
  });

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // --- Magnetic Effect ---
  const magneticElements = document.querySelectorAll('.glass-card, .btn, .nav-link, .hero-image-ring, .tech-orb');
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const multiplier = el.classList.contains('tech-orb') ? 0.3 : 0.15;
      el.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px) scale(1.05)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // --- Background Parallax ---
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Progress Bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) progressBar.style.width = scrolled + '%';

    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
      const speed = 0.05 + (index * 0.02);
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ============================================
// ACTIVE NAV HIGHLIGHT
// ============================================
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('data-section') === id);
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

// ==========================================
// Skills Doughnut Charts Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '55%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    borderWidth: 2,
    borderColor: '#0a0e1a',
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 2500,
      easing: 'easeOutQuart'
    },
    hover: {
      mode: 'nearest',
      intersect: true,
      animationDuration: 400
    }
  };

  const colors = ['#00f0ff', '#a600ff', '#ff007f', '#00ff66'];

  // Programming
  new Chart(document.getElementById('chart-programming'), {
    type: 'doughnut',
    data: {
      labels: ['MySQL', 'Core Java', 'Python Programming', 'Spring Boot'],
      datasets: [{
        data: [4, 4, 3, 4],
        backgroundColor: colors,
        hoverOffset: 15
      }]
    },
    options: chartOptions
  });

  // Cloud Technologies
  new Chart(document.getElementById('chart-cloud'), {
    type: 'doughnut',
    data: {
      labels: ['Google Cloud', 'AWS', 'Salesforce', 'ServiceNow'],
      datasets: [{
        data: [3, 1, 3, 1],
        backgroundColor: colors,
        hoverOffset: 15
      }]
    },
    options: chartOptions
  });

  // Framework/Libraries
  new Chart(document.getElementById('chart-frameworks'), {
    type: 'doughnut',
    data: {
      labels: ['JQuery', 'Spring', 'JDBC', 'REST APIs'],
      datasets: [{
        data: [1, 1, 2, 1],
        backgroundColor: colors,
        hoverOffset: 15
      }]
    },
    options: chartOptions
  });

  // DevOps
  new Chart(document.getElementById('chart-devops'), {
    type: 'doughnut',
    data: {
      labels: ['Git/Github', 'Copado', 'Postman'],
      datasets: [{
        data: [2, 1, 1],
        backgroundColor: colors.slice(0, 3),
        hoverOffset: 15
      }]
    },
    options: chartOptions
  });

  // Technical Tools
  new Chart(document.getElementById('chart-tools'), {
    type: 'doughnut',
    data: {
      labels: ['IntelliJ IDEA', 'VS Code', 'Jupyter Notebook'],
      datasets: [{
        data: [3, 6, 3],
        backgroundColor: colors.slice(0, 3),
        hoverOffset: 15
      }]
    },
    options: chartOptions
  });
});

// ============================================
// SETTINGS & THEME TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const settingsBtn = document.getElementById('settings-toggle');
  const settingsModal = document.getElementById('settings-modal');
  const themeToggle = document.getElementById('theme-toggle');
  const animToggle = document.getElementById('animation-toggle');

  if (!settingsBtn || !settingsModal) return;

  // Toggle modal
  settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsModal.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!settingsModal.contains(e.target) && !settingsBtn.contains(e.target)) {
      settingsModal.classList.remove('active');
    }
  });

  // --- THEME LOGIC ---
  const currentTheme = localStorage.getItem('theme') || 'dark';
  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.classList.add('active');
  }

  const updateThemeAria = (isActive) => {
    themeToggle.setAttribute('aria-checked', isActive);
  };

  const toggleTheme = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      themeToggle.classList.remove('active');
      updateThemeAria(false);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeToggle.classList.add('active');
      updateThemeAria(true);
    }
  };

  themeToggle.addEventListener('click', toggleTheme);
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });

  // Init Aria
  updateThemeAria(themeToggle.classList.contains('active'));

  // --- ANIMATION LOGIC ---
  const animationsEnabled = localStorage.getItem('animations') !== 'false';
  if (!animationsEnabled) {
    animToggle.classList.remove('active');
    document.documentElement.setAttribute('data-animations', 'false');
    window.DISABLE_ANIMATIONS = true;
  } else {
    window.DISABLE_ANIMATIONS = false;
  }

  const updateAnimAria = (isActive) => {
    animToggle.setAttribute('aria-checked', isActive);
  };

  const toggleAnimations = () => {
    const isActive = animToggle.classList.contains('active');
    if (isActive) {
      animToggle.classList.remove('active');
      localStorage.setItem('animations', 'false');
      document.documentElement.setAttribute('data-animations', 'false');
      window.DISABLE_ANIMATIONS = true;
      updateAnimAria(false);
      alert('Animations disabled. Refresh the page to fully apply.');
    } else {
      animToggle.classList.add('active');
      localStorage.setItem('animations', 'true');
      document.documentElement.removeAttribute('data-animations');
      window.DISABLE_ANIMATIONS = false;
      updateAnimAria(true);
      alert('Animations enabled. Refresh the page to fully apply.');
    }
  };

  animToggle.addEventListener('click', toggleAnimations);
  animToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleAnimations();
    }
  });

  // Init Aria
  updateAnimAria(animToggle.classList.contains('active'));
});
