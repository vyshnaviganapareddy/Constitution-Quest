document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Theme toggle logic
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
        }
    });

    const images = document.querySelectorAll('.game-item img');

    images.forEach(image => {
        image.addEventListener('click', () => {
            // Create and show overlay
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            body.appendChild(overlay);
            setTimeout(() => overlay.classList.add('show'), 0);

            // Clone the image and enlarge it
            const clonedImage = image.cloneNode(true);
            clonedImage.classList.add('enlarge-image');
            body.appendChild(clonedImage);

            // Add fade-out effect to image and overlay
            setTimeout(() => {
                clonedImage.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = 'movie-details.html'; // Redirect to the details page
                }, 700); // Time for fade-out effect
            }, 500); // Initial delay before starting the fade-out
        });
    });
});


