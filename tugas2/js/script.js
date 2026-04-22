// Toggle menu hamburger\nconst btnHamburger = document.querySelector('.hamburger');\nconst menuNav = document.querySelector('.nav-menu');

btnHamburger.addEventListener('click', () => {\n    btnHamburger.classList.toggle('active');\n    menuNav.classList.toggle('active');\n});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {\n    btnHamburger.classList.remove('active');\n    menuNav.classList.remove('active');\n}));

// Smooth scrolling for navigation links
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

// Fungsi WhatsApp dari modal produk\n// No 6282280570558
const WHATSAPP_PHONE = '6282280570558';

function openWhatsApp(productName, price) {
    const message = `Halo! Saya ingin pesan ${productName} ${price}. Silakan konfirmasi ketersediaan dan ongkirnya. Terima kasih! ☕`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Product cards klik buka modal - DEBUG: console.log
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
        console.log('Product card clicked:', card.getAttribute('data-modal'));
        e.stopPropagation();
        const modalId = card.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Tombol produk juga ke WA
document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.product-card');
        const productName = card.getAttribute('data-product');
        const price = card.getAttribute('data-price');
        if (productName && price) {
            openWhatsApp(productName, price);
        }
    });
});

// Buy btn modal juga WA
document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        // Extract from closest product card via data-modal matching or h3
        const productName = modal.querySelector('h3').textContent;
        const priceElement = modal.querySelector('p strong');
        const price = priceElement ? priceElement.textContent : '';
        openWhatsApp(productName, price);
    });
});

// Close modal
const modals = document.querySelectorAll('.modal');
const closes = document.querySelectorAll('.close');
closes.forEach(close => {
    close.addEventListener('click', () => {
        modals.forEach(modal => modal.style.display = 'none');
        document.body.style.overflow = 'auto';
    });
});
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        modals.forEach(modal => modal.style.display = 'none');
        document.body.style.overflow = 'auto';
    }
});


// Form contact
const contactForm = document.getElementById('contactForm');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const messageField = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validation
    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const message = messageField.value.trim();
    
    if (name === '' || email === '' || message === '') {
        showAlert('Semua field harus diisi!', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Format email tidak valid!', 'error');
        return;
    }
    
    // Simulate form submission
    showAlert('Pesan berhasil dikirim! Terima kasih.', 'success');
    
    // Reset form
    contactForm.reset();
});

// Show alert function
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        ${message}
        <button class="alert-close">&times;</button>
    `;
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        ${type === 'success' ? 'background: #4CAF50;' : 'background: #f44336;'}
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 4000);
    
    // Close on click
    alert.querySelector('.alert-close').addEventListener('click', () => {
        alert.remove();
    });
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0,0,0,0.95)';
    } else {
        navbar.style.background = 'rgba(0,0,0,0.9)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all sections and product cards
document.querySelectorAll('section, .product-card, .service-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Buy buttons functionality already handled above in WhatsApp integration


// Preloader (optional)
window.addEventListener('load', () => {
    // Fade out preloader if exists
});

// Add some interactive hover effects for product cards
document.querySelectorAll('.product-card').forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});
