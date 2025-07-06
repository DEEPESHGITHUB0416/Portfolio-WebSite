document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    
    if (!musicToggle || !bgMusic) return;
    
    // Check for saved music preference
    const musicPlaying = localStorage.getItem('musicPlaying') === 'true';
    
    if (musicPlaying) {
        bgMusic.play();
        musicToggle.classList.add('playing');
    }
    
    // Music toggle event
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            this.classList.add('playing');
            localStorage.setItem('musicPlaying', 'true');
        } else {
            bgMusic.pause();
            this.classList.remove('playing');
            localStorage.setItem('musicPlaying', 'false');
        }
    });
    
    // Enable audio on first interaction (to bypass browser autoplay restrictions)
    function enableAudio() {
        document.removeEventListener('click', enableAudio);
        document.removeEventListener('keydown', enableAudio);
        
        // Try to play audio
        const promise = bgMusic.play();
        
        if (promise !== undefined) {
            promise.catch(error => {
                // Autoplay was prevented
                console.log('Autoplay prevented:', error);
            });
        }
    }
    
    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
});