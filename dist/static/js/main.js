// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll for Anchor Links
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

// Form Validation (for contact page)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = '전송 중...';
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            message: formData.get('message')
        };
        
        // Validation
        if (!data.name || !data.email || !data.company || !data.message) {
            alert('모든 필수 항목을 입력해주세요.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('올바른 이메일 주소를 입력해주세요.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            return;
        }
        
        try {
            // Send email using Formspree
            const response = await fetch('https://formspree.io/f/xdkodkvg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    company: data.company,
                    phone: data.phone,
                    service: data.service,
                    message: data.message,
                    _replyto: data.email,
                    _subject: `[아그와헬스] ${data.company} - ${data.name}님의 상담 신청`
                })
            });
            
            if (response.ok) {
                alert('✅ 문의가 성공적으로 접수되었습니다!\n\n24시간 내에 gyoungmin.ko@agua-health.com으로 연락드리겠습니다.');
                contactForm.reset();
            } else {
                throw new Error('전송 실패');
            }
        } catch (error) {
            // Fallback to mailto
            const subject = encodeURIComponent(`[상담신청] ${data.company} - ${data.name}`);
            const body = encodeURIComponent(`
이름: ${data.name}
회사명: ${data.company}
이메일: ${data.email}
연락처: ${data.phone}
관심 서비스: ${data.service}

상담 내용:
${data.message}
            `);
            
            window.location.href = `mailto:gyoungmin.ko@agua-health.com?subject=${subject}&body=${body}`;
            alert('📧 이메일 클라이언트가 열립니다.\n\n또는 gyoungmin.ko@agua-health.com으로 직접 연락 주세요.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.service-card, .insight-card, .process-step, .trust-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
