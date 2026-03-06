// ===================================
// Page Loader
// ===================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('page-loader');
        if (loader) loader.classList.add('hidden');
    }, 1300);
});

// ===================================
// Custom Cursor
// ===================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
        requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = document.querySelectorAll('a, button, .project-card, .service-card, .cert-card, .social-link, .btn');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
}

// ===================================
// Typing Effect
// ===================================
const typingText = document.querySelector('.typing-text');
const phrases = ['Full Stack Developer', 'Django Expert', 'Backend Developer', 'API Architect'];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 45 : 90);
    }
}
document.addEventListener('DOMContentLoaded', typeEffect);

// ===================================
// Debounce Utility
// ===================================
function debounce(fn, delay) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.querySelector('.navbar');
const handleNavbarScroll = debounce(() => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
}, 10);
window.addEventListener('scroll', handleNavbarScroll, { passive: true });

// ===================================
// Smooth Scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===================================
// Intersection Observer — Scroll Reveals
// ===================================
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };

// General reveal observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
});

// Legacy .reveal support
const legacyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            legacyObserver.unobserve(entry.target);
        }
    });
}, observerOptions);
document.querySelectorAll('.skills-category, .service-card, .project-card, .achievement-card, .timeline-item').forEach(el => {
    el.classList.add('reveal');
    legacyObserver.observe(el);
});

// ===================================
// Progress Bar Animation (Intersection Observer)
// ===================================
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            bar.classList.add('animated');
            progressObserver.unobserve(bar);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.progress-fill').forEach(bar => progressObserver.observe(bar));

// ===================================
// Stats Counter (Intersection Observer)
// ===================================
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            if (!stat.classList.contains('animated')) {
                stat.classList.add('animated');
                const target = parseInt(stat.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + '+';
                    }
                }, 30);
                statsObserver.unobserve(stat);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => statsObserver.observe(stat));

// ===================================
// Back to Top Button
// ===================================
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', debounce(() => {
    backToTopBtn.classList.toggle('show', window.scrollY > 300);
}, 50), { passive: true });

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===================================
// Navbar Active Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) link.classList.add('active');
            });
        }
    });
}, { threshold: 0.35 });

sections.forEach(section => sectionObserver.observe(section));

// ===================================
// Navbar Mobile Toggle
// ===================================
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    });
});

// ===================================
// Contact Form
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.textContent;
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'var(--color-primary-dark)';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 3000);
        contactForm.reset();
    });
}

// ===================================
// Certificate Modal
// ===================================
function showCertificate(imagePath) {
    const modal = new bootstrap.Modal(document.getElementById('certificateModal'));
    document.getElementById('certificateImage').src = imagePath;
    modal.show();
}

// ===================================
// Tilt effect on cards (subtle)
// ===================================
document.querySelectorAll('.service-card, .achievement-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-14px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
        setTimeout(() => card.style.transition = '', 500);
    });
});

// ===================================
// 🌗 Dark / Light Mode Toggle
// ===================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(mode) {
    if (mode === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.className = 'fas fa-sun';
    } else {
        document.body.classList.remove('light-mode');
        themeIcon.className = 'fas fa-moon';
    }
}

// Load saved preference
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-mode');
    const newTheme = isLight ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
    showToast(newTheme === 'light' ? '☀️ Light mode on' : '🌙 Dark mode on', 'info');
});

// ===================================
// 🌐 Language Switcher EN / AR
// ===================================
const langToggle = document.getElementById('langToggle');
const langEnSpan = document.querySelector('.lang-en');
const langArSpan = document.querySelector('.lang-ar');

let currentLang = localStorage.getItem('lang') || 'en';

const navTexts = {
    en: ['About','Technical Skills','Soft Skills','Experience','Services','Projects','Certifications','Contact'],
    ar: ['عني','المهارات التقنية','المهارات الشخصية','الخبرة','الخدمات','المشاريع','الشهادات','تواصل معي']
};

const typingPhrases = {
    en: ['Full Stack Developer', 'Django Expert', 'Backend Developer', 'API Architect'],
    ar: ['مطور ويب متكامل', 'خبير Django', 'مطور خلفية', 'مهندس واجهات برمجية']
};

function applyLang(lang) {
    currentLang = lang;
    const isAr = lang === 'ar';

    // 1. Toggle Bootstrap RTL CSS
    const ltrCSS = document.getElementById('bootstrap-ltr');
    const rtlCSS = document.getElementById('bootstrap-rtl');
    if (rtlCSS) {
        ltrCSS.disabled = isAr;
        rtlCSS.disabled = !isAr;
    }

    // 2. Set dir on <html>
    document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);

    // 3. Toggle body class
    document.body.classList.toggle('rtl', isAr);

    // 4. Update lang indicator
    langEnSpan.classList.toggle('active', !isAr);
    langArSpan.classList.toggle('active', isAr);

    // 5. Translate ALL [data-en][data-ar] elements (text content)
    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
        const text = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
        if (text !== null) el.textContent = text;
    });

    // 6. Translate elements with HTML content (data-en-html / data-ar-html)
    document.querySelectorAll('[data-en-html][data-ar-html]').forEach(el => {
        el.innerHTML = isAr ? el.getAttribute('data-ar-html') : el.getAttribute('data-en-html');
    });

    // 7. Update footer tagline (has icon inside)
    const footerTagline = document.querySelector('.footer-tagline');
    if (footerTagline) {
        footerTagline.innerHTML = isAr
            ? 'صُنع بـ <i class="fas fa-heart"></i> باستخدام Django وBootstrap'
            : 'Built with <i class="fas fa-heart"></i> using Django &amp; Bootstrap';
    }

    // 8. Update nav links
    const navLinkEls = document.querySelectorAll('.navbar-nav .nav-link');
    navTexts[lang].forEach((text, i) => {
        if (navLinkEls[i]) navLinkEls[i].textContent = text;
    });

    // 9. Update typing phrases
    phrases.length = 0;
    typingPhrases[lang].forEach(p => phrases.push(p));

    // 10. Update input placeholders
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const msgInput = document.getElementById('message');
    if (nameInput) nameInput.placeholder = isAr ? 'أدخل اسمك' : 'Your name';
    if (emailInput) emailInput.placeholder = isAr ? 'بريدك الإلكتروني' : 'your@email.com';
    if (msgInput) msgInput.placeholder = isAr ? 'اكتب رسالتك هنا...' : 'Write your message here...';

    // 11. Update page title
    document.title = isAr ? 'محمد سيد | مطور ويب متكامل' : 'Mohamed Sayed | Full Stack Developer';

    localStorage.setItem('lang', lang);
}

// Load saved lang on start
applyLang(currentLang);

langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    applyLang(newLang);
    showToast(newLang === 'ar' ? '🌐 تم التبديل للعربية' : '🌐 Switched to English', 'info');
});

// ===================================
// 🌌 Particle Background
// ===================================
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.8 + 0.4;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.pulse = Math.random() * Math.PI * 2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.pulse += 0.02;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            const alpha = this.opacity + Math.sin(this.pulse) * 0.1;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(75, 227, 161, ${Math.max(0, alpha)})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    // Draw connecting lines between close particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(75, 227, 161, ${0.06 * (1 - dist/120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawConnections();
        particles.forEach(p => { p.update(); p.draw(); });
        animFrame = requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', debounce(() => {
        resizeCanvas();
        initParticles();
    }, 300));
}

// ===================================
// 🗂️ Project Filter Tabs
// ===================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ===================================
// 🔔 Toast Notification System
// ===================================
function showToast(message, type = 'success', duration = 3500) {
    const container = document.getElementById('toast-container');
    const icons = { success: 'fa-check', error: 'fa-times', info: 'fa-info' };

    const toast = document.createElement('div');
    toast.className = `toast-msg toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas ${icons[type] || icons.info}"></i></div>
        <span>${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        <div class="toast-progress"></div>
    `;
    container.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
        toast.classList.add('hide');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, duration);
}

// Update contact form to use toast
const contactFormNew = document.getElementById('contactForm');
if (contactFormNew) {
    // Remove old listeners by cloning
    const newForm = contactFormNew.cloneNode(true);
    contactFormNew.parentNode.replaceChild(newForm, contactFormNew);

    newForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const btn = newForm.querySelector('.btn-submit');
        const originalText = btn.textContent;

        btn.textContent = currentLang === 'ar' ? '⏳ جاري الإرسال...' : '⏳ Sending...';
        btn.disabled = true;

        setTimeout(() => {
            showToast(
                currentLang === 'ar' ? `شكراً ${name}! تم إرسال رسالتك بنجاح ✓` : `Thanks ${name}! Your message was sent ✓`,
                'success'
            );
            btn.textContent = originalText;
            btn.disabled = false;
            newForm.reset();
        }, 1000);
    });
}

// ===================================
// 📊 Scroll Progress Bar
// ===================================
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
}, { passive: true });
