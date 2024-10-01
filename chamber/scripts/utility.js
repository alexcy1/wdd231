// Hero Image
document.addEventListener('DOMContentLoaded', function () {
    function adjustHeroElements() {
        const heroImage = document.querySelector('.home-hero-image, .hero-image');
        const heroTextOverlay = document.querySelector('.card-img-overlay');

        if (window.innerWidth < 576) {
            heroImage.style.marginLeft = '12.1px'; 
            heroTextOverlay.style.marginLeft = '12.1px'; 

        } else if (window.innerWidth < 992) {
            heroImage.style.marginLeft = '12.1px';
            heroTextOverlay.style.marginLeft = '12.1px';

        } else {
            heroImage.style.marginLeft = '0'; // Reset margin for larger screens
            heroTextOverlay.style.marginLeft = '0'; // Reset text overlay margin for larger screens
        }

        // Set overlay background width to match the hero image
        heroTextOverlay.style.width = `${heroImage.clientWidth}px`; 
        heroTextOverlay.style.background = 'rgba(0, 0, 0, 0.4)'; 
    }

    // Adjust on load
    adjustHeroElements();

    // Adjust on window resize
    window.addEventListener('resize', adjustHeroElements);
});
