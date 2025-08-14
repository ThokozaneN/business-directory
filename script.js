document.addEventListener('DOMContentLoaded', function() {
    //Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    //Scroll effect for navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    //Modal functionality
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const ctaRegisterBtn = document.getElementById('ctaRegisterBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeModals = document.querySelectorAll('.close-modal');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(loginModal);
    });
    
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(registerModal);
    });
    
    ctaRegisterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(registerModal);
    });
    
    closeModals.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    switchToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });
    
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });
    
    //Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    //Demo message after registration
    const registerForm = document.getElementById('registerForm');
    const demoMessage = document.getElementById('demoMessage');
    const continueBtn = document.getElementById('continueToDashboard');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            closeModal(registerModal);
            openModal(demoMessage);
        });
    }
    
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            closeModal(demoMessage);
            document.getElementById('dashboard').classList.add('active');
        });
    }
    
    //Business detail page functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    const businessDetailPage = document.getElementById('businessDetailPage');
    const backButton = document.getElementById('backButton');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            businessDetailPage.classList.add('active');
        });
    });
    
    if (backButton) {
        backButton.addEventListener('click', function() {
            businessDetailPage.classList.remove('active');
        });
    }
    
    //Initialize Google Maps
    function initMap() {
        //Main map
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -28.4793, lng: 24.6727 }, 
            zoom: 5,
            styles: [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#444444"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#6C63FF"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ]
        });
        
        //Add some markers for demo
        const cities = [
            { lat: -26.2041, lng: 28.0473, name: "Johannesburg" },
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
                icon: {
                    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                }
            });
        });
        
        //Mini map for business detail
        if (document.getElementById('miniMap')) {
            const miniMap = new google.maps.Map(document.getElementById('miniMap'), {
                center: { lat: -26.2675, lng: 27.8585 },
                zoom: 14,
                disableDefaultUI: true
            });
            
            new google.maps.Marker({
                position: { lat: -26.2675, lng: 27.8585 },
                map: miniMap,
                title: "Mama's Kitchen"
            });
        }
    }
    
    window.initMap = initMap;
    
    //Initialize Charts on Dashboard
    function initCharts() {
        const viewsCtx = document.getElementById('viewsChart');
        const engagementCtx = document.getElementById('engagementChart');
        
        if (viewsCtx) {
            new Chart(viewsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Profile Views',
                        data: [65, 59, 80, 81, 56, 95],
                        backgroundColor: 'rgba(108, 99, 255, 0.2)',
                        borderColor: 'rgba(108, 99, 255, 1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
        
        if (engagementCtx) {
            new Chart(engagementCtx, {
                type: 'bar',
                data: {
                    labels: ['Website Clicks', 'Phone Calls', 'Messages', 'Direction Requests'],
                    datasets: [{
                        label: 'Engagement',
                        data: [45, 30, 15, 10],
                        backgroundColor: [
                            'rgba(108, 99, 255, 0.7)',
                            'rgba(255, 101, 101, 0.7)',
                            'rgba(72, 187, 120, 0.7)',
                            'rgba(237, 137, 54, 0.7)'
                        ],
                        borderColor: [
                            'rgba(108, 99, 255, 1)',
                            'rgba(255, 101, 101, 1)',
                            'rgba(72, 187, 120, 1)',
                            'rgba(237, 137, 54, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }
    
    //Initialize charts when dashboard is opened
    const dashboard = document.getElementById('dashboard');
    if (dashboard) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (dashboard.classList.contains('active')) {
                        initCharts();
                    }
                }
            });
        });
        
        observer.observe(dashboard, {
            attributes: true
        });
    }
    
    //Thumbnail gallery interaction
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');
    
    if (thumbnails.length && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                mainImage.src = imgSrc;
                
                // Add active class to clicked thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    //Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.business-card, .freelancer-card, .category-card, .testimonial-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
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