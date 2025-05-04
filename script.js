// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');

    // Function to change active section
    function setActiveSection(sectionId) {
        // Remove active class from all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all nav items
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to target section
        const targetSection = document.getElementById(`${sectionId}-content`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Add active class to clicked nav item
        const targetNavItem = document.querySelector(`.nav-item[href="#${sectionId}"]`);
        if (targetNavItem) {
            targetNavItem.classList.add('active');
        }
    }

    // Add click event listeners to nav items
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1); // Remove the # character
            setActiveSection(sectionId);
            
            // If on mobile, scroll to top of content area
            if (window.innerWidth <= 768) {
                document.querySelector('.content').scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set default active section based on URL hash or default to 'games'
    const initialSection = window.location.hash ? window.location.hash.substring(1) : 'games';
    setActiveSection(initialSection);

    // Game card interaction with video autoplay
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        const video = card.querySelector('video');
        
        // Play video on hover
        card.addEventListener('mouseenter', function() {
            if (video && video.paused) {
                video.play().catch(e => {
                    console.log('Video play failed:', e);
                });
            }
        });
        
        // Pause video when not hovering
        card.addEventListener('mouseleave', function() {
            if (video && !video.paused) {
                video.pause();
                video.currentTime = 0; // Reset to beginning
            }
        });
        
        // Add click event to game cards
        card.addEventListener('click', function() {
            const gameTitle = this.querySelector('.game-title').textContent;
            console.log(`Clicked on game: ${gameTitle}`);
            // In a real implementation, you could navigate to a game details page
            // window.location.href = `game-details.html?game=${gameTitle.toLowerCase().replace(/\s+/g, '-')}`;
        });
    });

    // Smooth scroll for the content area
    const content = document.querySelector('.content');
    if (content) {
        content.style.scrollBehavior = 'smooth';
    }

    // Handle window resize events
    window.addEventListener('resize', function() {
        // Add any responsive adjustments here if needed
    });

    // No need for parallax effect with the new list design
    // Instead, add some subtle hover animation
    if (content) {
        content.addEventListener('scroll', function() {
            // Add any scroll effects if needed
        });
    }

    // Initialize section after a short delay to ensure smooth transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});