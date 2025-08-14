document.addEventListener('DOMContentLoaded', function() {
    //Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    //Navbar Scroll Effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });
    
    //Modal Functionality
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const ctaRegisterBtn = document.getElementById('ctaRegisterBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeModals = document.querySelectorAll('.close-modal');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    
    //Modal Helper Functions
    function openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    //Modal Event Listeners
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(loginModal);
        });
    }
    
    if (registerBtn && registerModal) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(registerModal);
        });
    }
    
    if (ctaRegisterBtn && registerModal) {
        ctaRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(registerModal);
        });
    }
    
    closeModals.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    if (switchToRegister && loginModal && registerModal) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(loginModal);
            openModal(registerModal);
        });
    }
    
    if (switchToLogin && registerModal && loginModal) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(registerModal);
            openModal(loginModal);
        });
    }
    
    //Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    //Demo Message After Registration
    const registerForm = document.getElementById('registerForm');
    const demoMessage = document.getElementById('demoMessage');
    const continueBtn = document.getElementById('continueToDashboard');
    
    if (registerForm && demoMessage) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            closeModal(registerModal);
            openModal(demoMessage);
        });
    }
    
    if (continueBtn && demoMessage) {
        continueBtn.addEventListener('click', function() {
            closeModal(demoMessage);
            document.getElementById('dashboard').classList.add('active');
        });
    }
    
    //Business Detail Navigation
    const viewButtons = document.querySelectorAll('.business-card .view-btn');
    const businessDetailPage = document.getElementById('businessDetailPage');
    const backButton = document.getElementById('backButton');
    
    if (viewButtons.length && businessDetailPage) {
        viewButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                //Get business ID from parent card
                const businessCard = this.closest('.business-card');
                if (businessCard) {
                    const businessId = businessCard.dataset.businessId;
                    if (businessId) {
                        //In a real site, I would load the specific business data here
                        console.log('Viewing business:', businessId);
                        businessDetailPage.classList.add('active');
                        window.scrollTo(0, 0);
                    }
                }
            });
        });
    }
    
    if (backButton && businessDetailPage) {
        backButton.addEventListener('click', function() {
            businessDetailPage.classList.remove('active');
        });
    }
    
    //Dashboard Navigation
    const dashboardLinks = document.querySelectorAll('[data-dashboard-link]');
    dashboardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('dashboard').classList.add('active');
        });
    });
    
    //Initialize Google Maps
    function initMap() {
        //Check if map element exists
        const mapElement = document.getElementById('map');
        if (!mapElement) return;
        
        //Center on South Africa
        const map = new google.maps.Map(mapElement, {
            center: { lat: -28.4793, lng: 24.6727 },
            zoom: 5,
            styles: [
                { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#444444" }] },
                { featureType: "landscape", elementType: "all", stylers: [{ color: "#f2f2f2" }] },
                { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
                { featureType: "road", elementType: "all", stylers: [{ saturation: -100 }, { lightness: 45 }] },
                { featureType: "road.highway", elementType: "all", stylers: [{ visibility: "simplified" }] },
                { featureType: "road.arterial", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
                { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] },
                { featureType: "water", elementType: "all", stylers: [{ color: "#6C63FF" }, { visibility: "on" }] }
            ]
        });
        
        //Sample markers for major cities & my home province
        const cities = [
            { lat: -26.2041, lng: 28.0473, name: "Johannesburg" },
            { lat: -26.3058, lng: 29.1210, name: "Mpumalanga" },
            { lat: -33.9249, lng: 18.4241, name: "Cape Town" },
            { lat: -29.8587, lng: 31.0218, name: "Durban" },
            { lat: -25.7479, lng: 28.2293, name: "Pretoria" },
            { lat: -33.9608, lng: 25.6022, name: "Port Elizabeth" }
        ];
        
        cities.forEach(city => {
            new google.maps.Marker({
                position: city,
                map: map,
                title: city.name,
                icon: { url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png" }
            });
        });
    }
    
    //Only initialize map if API is loaded
    if (typeof google !== 'undefined') {
        window.initMap = initMap;
    }
    
    //Animation on scroll for business cards
    function animateOnScroll() {
        const elements = document.querySelectorAll('.business-card, .freelancer-card, .category-card, .testimonial-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }
    
    //Run animations after page load
    setTimeout(animateOnScroll, 500);
});