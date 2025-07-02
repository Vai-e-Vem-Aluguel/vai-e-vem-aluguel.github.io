// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Configuration object for your links
    const linksConfig = {
        instagram: {
            url: 'https://www.instagram.com/vaievemaluguel'
        },
        whatsapp: {
            url: 'https://api.whatsapp.com/send?1=pt_BR&phone=5596981260219'
        },
        cart: {
            url: 'https://vaievemaluguel.estoquenow.site/'
        },
        maps: {
            url: 'https://maps.app.goo.gl/cEhfeAdRETH73ErL9?g_st=ic'
        }
    };

    // Initialize the application
    initApp();

    function initApp() {
        setupLinks();
        setupAnimations();
        setupHoverEffects();
        addLoadingAnimation();
    }

    function setupLinks() {
        // Get all link cards
        const linkCards = document.querySelectorAll('.link-card');
        
        linkCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                
                const linkType = this.id.replace('-link', '');
                const config = linksConfig[linkType];
                
                if (config) {
                    // Add click animation
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                    
                    // Show loading state
                    showLoadingState(this);
                    
                    // Open link after a short delay for better UX
                    setTimeout(() => {
                        window.open(config.url, '_blank');
                        hideLoadingState(this);
                    }, 300);
                }
            });
        });
    }

    function setupAnimations() {
        // Add entrance animations to link cards
        const linkCards = document.querySelectorAll('.link-card');
        
        linkCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });

        // Add bee interaction
        const bee = document.querySelector('.bee');
        if (bee) {
            bee.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            bee.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    }

    function setupHoverEffects() {
        // Add ripple effect to link cards
        const linkCards = document.querySelectorAll('.link-card');
        
        linkCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                createRippleEffect(this);
            });
        });
    }

    function createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            width: 100px;
            height: 100px;
            top: 50%;
            left: 50%;
            margin-left: -50px;
            margin-top: -50px;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    function showLoadingState(element) {
        const icon = element.querySelector('.link-icon i');
        const originalIcon = icon.className;
        
        // Replace icon with loading spinner
        icon.className = 'fas fa-spinner fa-spin';
        
        // Store original icon to restore later
        element.dataset.originalIcon = originalIcon;
    }

    function hideLoadingState(element) {
        const icon = element.querySelector('.link-icon i');
        const originalIcon = element.dataset.originalIcon;
        
        if (originalIcon) {
            icon.className = originalIcon;
        }
    }

    function addLoadingAnimation() {
        // Add CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add some interactive features
    addInteractiveFeatures();
});

function addInteractiveFeatures() {
    // Add parallax effect to floating bees
    window.addEventListener('mousemove', function(e) {
        const bees = document.querySelectorAll('.floating-bee');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        bees.forEach((bee, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            bee.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const linkCards = document.querySelectorAll('.link-card');
        const currentFocus = document.activeElement;
        let currentIndex = -1;
        
        // Find current focused element
        linkCards.forEach((card, index) => {
            if (card === currentFocus) {
                currentIndex = index;
            }
        });
        
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (currentIndex < linkCards.length - 1) {
                    linkCards[currentIndex + 1].focus();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (currentIndex > 0) {
                    linkCards[currentIndex - 1].focus();
                }
                break;
            case 'Enter':
            case ' ':
                if (currentFocus.classList.contains('link-card')) {
                    e.preventDefault();
                    currentFocus.click();
                }
                break;
        }
    });

    // Make link cards focusable
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.setAttribute('tabindex', '0');
    });
}

// Add some utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add error handling for broken links
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'A') {
        showNotification('Link não disponível no momento. Tente novamente mais tarde.', 'error');
    }
});

// Add performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll and resize events
const optimizedScroll = debounce(function() {
    // Scroll handling code here
}, 16);

const optimizedResize = debounce(function() {
    // Resize handling code here
}, 250);

window.addEventListener('scroll', optimizedScroll);
window.addEventListener('resize', optimizedResize); 