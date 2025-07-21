// Initialize Three.js background
        function initThreeBackground() {
            const canvas = document.getElementById('canvas-bg');
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            
            // Create particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 5000;
            
            const posArray = new Float32Array(particlesCount * 3);
            const colorArray = new Float32Array(particlesCount * 3);
            
            for (let i = 0; i < particlesCount * 3; i += 3) {
                // Position
                posArray[i] = (Math.random() - 0.5) * 50;
                posArray[i + 1] = (Math.random() - 0.5) * 50;
                posArray[i + 2] = (Math.random() - 0.5) * 50;
                
                // Color
                colorArray[i] = Math.random() * 0.3 + 0.5; // R
                colorArray[i + 1] = Math.random() * 0.5 + 0.2; // G
                colorArray[i + 2] = Math.random() * 0.8 + 0.2; // B
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
            
            // Material
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.1,
                vertexColors: true,
                transparent: true,
                opacity: 0.8
            });
            
            const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particlesMesh);
            
            camera.position.z = 5;
            
            // Mouse movement effect
            let mouseX = 0;
            let mouseY = 0;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = (e.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            });
            
            // Animation
            function animate() {
                requestAnimationFrame(animate);
                
                // Rotate particles
                particlesMesh.rotation.x += 0.001;
                particlesMesh.rotation.y += 0.001;
                
                // Move camera based on mouse position
                camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
                camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
                camera.lookAt(scene.position);
                
                renderer.render(scene, camera);
            }
            
            // Handle window resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
            
            animate();
        }
        
        // Initialize GSAP animations
        function initAnimations() {
            // Register ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);
            
            // Animate sections on scroll
            gsap.utils.toArray('section').forEach(section => {
                gsap.from(section, {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                });
            });
            
            // Animate project cards
            gsap.utils.toArray('.project-card').forEach((card, i) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    delay: i * 0.2,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                });
            });
            
            // Animate skills cards
            gsap.utils.toArray('.skill-card').forEach((card, i) => {
                gsap.from(card, {
                    opacity: 0,
                    x: i % 2 === 0 ? -50 : 50,
                    duration: 0.8,
                    delay: i * 0.2,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                });
            });
        }
        
        // Initialize Typed.js
        function initTyped() {
            const typed = new Typed('.typed-text', {
                strings: [
                    'I create immersive web experiences',
                    'I build responsive web applications',
                    'I design intuitive user interfaces',
                    'I solve complex digital challenges'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                loop: true,
                showCursor: true,
                cursorChar: '|',
                smartBackspace: true
            });
        }
        
        // Theme toggle
        function initThemeToggle() {
            const toggleBtn = document.querySelector('.theme-toggle');
            const icon = toggleBtn.querySelector('i');
            
            toggleBtn.addEventListener('click', () => {
                document.body.classList.toggle('light-theme');
                
                if (document.body.classList.contains('light-theme')) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            });
        }
        
        // Easter egg
        function initEasterEgg() {
            const easterEgg = document.querySelector('.easter-egg');
            
            easterEgg.addEventListener('click', () => {
                gsap.to('body', {
                    background: 'linear-gradient(135deg, #ff6b6b, #5a189a)',
                    duration: 1
                });
                
                const particles = document.querySelectorAll('.orbit-icon');
                particles.forEach(particle => {
                    gsap.to(particle, {
                        scale: 1.5,
                        duration: 0.5,
                        yoyo: true,
                        repeat: 3
                    });
                });
                
                // Show message
                const message = document.createElement('div');
                message.textContent = 'Thanks for exploring!';
                message.style.position = 'fixed';
                message.style.top = '50%';
                message.style.left = '50%';
                message.style.transform = 'translate(-50%, -50%)';
                message.style.fontSize = '3rem';
                message.style.color = 'white';
                message.style.zIndex = '1000';
                message.style.textShadow = '0 0 10px rgba(255,255,255,0.5)';
                document.body.appendChild(message);
                
                setTimeout(() => {
                    document.body.removeChild(message);
                }, 3000);
            });
        }
        
        // Contact Form Submission
        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('form-status');

        // Voice note elements
        const voiceNote = document.querySelector('.voice-note');
        let mediaRecorder;
        let audioChunks = [];
        let audioBlob = null;

        function showAnimatedSuccess(message) {
            // Remove existing message if any
            const oldMsg = document.getElementById('animated-success');
            if (oldMsg) oldMsg.remove();
            const msg = document.createElement('div');
            msg.id = 'animated-success';
            msg.textContent = message;
            msg.style.position = 'fixed';
            msg.style.top = '50%';
            msg.style.left = '50%';
            msg.style.transform = 'translate(-50%, -50%) scale(0.8)';
            msg.style.background = 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)';
            msg.style.color = '#222';
            msg.style.fontWeight = 'bold';
            msg.style.fontSize = '2rem';
            msg.style.padding = '24px 48px';
            msg.style.borderRadius = '16px';
            msg.style.boxShadow = '0 4px 32px rgba(0,0,0,0.18)';
            msg.style.zIndex = 9999;
            msg.style.opacity = '0';
            msg.style.transition = 'opacity 0.4s, transform 0.4s';
            document.body.appendChild(msg);
            setTimeout(() => {
                msg.style.opacity = '1';
                msg.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);
            setTimeout(() => {
                msg.style.opacity = '0';
                msg.style.transform = 'translate(-50%, -50%) scale(1.2)';
                setTimeout(() => msg.remove(), 400);
            }, 1800);
        }

        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const subject = document.getElementById('subject').value.trim();
                const message = document.getElementById('message').value.trim();

                if (!name || !email || !subject || !message) {
                    formStatus.textContent = 'Please fill in all fields.';
                    formStatus.style.color = 'red';
                    return;
                }

                formStatus.textContent = 'Sending...';
                formStatus.style.color = '#333';
                setTimeout(() => {
                    formStatus.textContent = 'Thank you for reaching out! Your message has been sent.';
                    formStatus.style.color = 'green';
                    contactForm.reset();
                    showAnimatedSuccess('Form sent successfully!');
                }, 1200);
            });
        }

        if (voiceNote) {
            let isRecording = false;
            const micIcon = voiceNote.querySelector('i');
            const spanText = voiceNote.querySelector('span');
            let audioURL = null;
            let audioPlayer = null;
            let sendBtn = null;

            voiceNote.addEventListener('click', async () => {
                if (!isRecording) {
                    // Start recording
                    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                        try {
                            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                            mediaRecorder = new MediaRecorder(stream);
                            audioChunks = [];
                            mediaRecorder.ondataavailable = event => {
                                if (event.data.size > 0) {
                                    audioChunks.push(event.data);
                                }
                            };
                            mediaRecorder.onstop = () => {
                                audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                                audioURL = URL.createObjectURL(audioBlob);
                                // Remove previous player if exists
                                if (audioPlayer) audioPlayer.remove();
                                audioPlayer = document.createElement('audio');
                                audioPlayer.controls = true;
                                audioPlayer.src = audioURL;
                                voiceNote.appendChild(audioPlayer);
                                spanText.textContent = 'Voice note recorded! Click mic to record again or send.';
                                // Add send button if not exists
                                if (!sendBtn) {
                                    sendBtn = document.createElement('button');
                                    sendBtn.textContent = 'Send Voice Note';
                                    sendBtn.style.marginLeft = '10px';
                                    sendBtn.className = 'btn btn-primary';
                                    sendBtn.onclick = function(ev) {
                                        ev.preventDefault();
                                        showAnimatedSuccess('Voice message sent successfully!');
                                        if (audioPlayer) audioPlayer.remove();
                                        sendBtn.remove();
                                        spanText.textContent = 'Or send a voice note';
                                    };
                                    voiceNote.appendChild(sendBtn);
                                }
                            };
                            mediaRecorder.start();
                            isRecording = true;
                            micIcon.classList.remove('fa-microphone-alt');
                            micIcon.classList.add('fa-stop');
                            spanText.textContent = 'Recording... Click to stop.';
                        } catch (err) {
                            formStatus.textContent = 'Microphone access denied.';
                            formStatus.style.color = 'red';
                        }
                    }
                } else {
                    // Stop recording
                    mediaRecorder.stop();
                    isRecording = false;
                    micIcon.classList.remove('fa-stop');
                    micIcon.classList.add('fa-microphone-alt');
                }
            });
        }
        
        // Initialize everything
        document.addEventListener('DOMContentLoaded', () => {
            initThreeBackground();
            initAnimations();
            initTyped();
            initThemeToggle();
            initEasterEgg();
            
            // Smooth scrolling for navigation
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });