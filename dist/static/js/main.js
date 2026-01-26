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

// ===== Insights Page Filtering =====
const filterBtns = document.querySelectorAll('.filter-btn, .filter-btn-new');
const insightBoxes = document.querySelectorAll('.insight-box');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            
            // Filter insights
            insightBoxes.forEach(box => {
                if (category === 'all' || box.getAttribute('data-category') === category) {
                    box.style.display = 'flex';
                    setTimeout(() => {
                        box.style.opacity = '1';
                        box.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    box.style.opacity = '0';
                    box.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        box.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== Contact Modal =====
function openContactModal() {
    document.getElementById('contactModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactModal();
    }
});

// Close modal on ESC key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeContactModal();
    }
});

// Modal Contact Form Submission
const modalContactForm = document.getElementById('modalContactForm');
if (modalContactForm) {
    modalContactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = modalContactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = '전송 중...';
        
        const formData = new FormData(modalContactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company') || '',
            phone: formData.get('phone') || '',
            message: formData.get('message')
        };
        
        try {
            const response = await fetch('https://formspree.io/f/xrbblvyl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    company: data.company,
                    phone: data.phone,
                    message: data.message,
                    _replyto: data.email,
                    _subject: `[아그와헬스 Contact Us] ${data.name}님의 문의`
                })
            });
            
            const result = await response.json();
            
            if (response.ok) {
                alert('✅ 문의가 성공적으로 접수되었습니다!\n\ngyoungmin.ko@agua-health.com으로 메일이 발송되었습니다.\n빠른 시일 내에 연락드리겠습니다.');
                modalContactForm.reset();
                closeContactModal();
            } else {
                console.error('Formspree error:', result);
                alert('❌ 전송 중 오류가 발생했습니다.\n\n직접 gyoungmin.ko@agua-health.com으로 연락 주시거나,\n010-5435-2687로 전화 주세요.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('❌ 네트워크 오류가 발생했습니다.\n\n직접 gyoungmin.ko@agua-health.com으로 연락 주시거나,\n010-5435-2687로 전화 주세요.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value;
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = '처리 중...';
        
        try {
            const response = await fetch('https://formspree.io/f/xrbblvyl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    _subject: '[뉴스레터 구독] 새로운 구독자'
                })
            });
            
            if (response.ok) {
                alert('✅ 뉴스레터 구독이 완료되었습니다!\n\n매월 유익한 인사이트를 받아보실 수 있습니다.');
                newsletterForm.reset();
            } else {
                throw new Error('전송 실패');
            }
        } catch (error) {
            alert('❌ 구독 처리 중 오류가 발생했습니다.\n\ngyoungmin.ko@agua-health.com으로 직접 연락주세요.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}
