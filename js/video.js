// Video-specific JavaScript functionality
// Handles video player, transcript toggle, and video-related interactions

(function() {
    'use strict';

    // Video page specific functionality
    if (window.location.pathname.includes('video.html')) {
        
        // Transcript toggle functionality
        const toggleTranscriptBtn = document.getElementById('toggle-transcript');
        const transcriptContent = document.getElementById('transcript-content');
        
        if (toggleTranscriptBtn && transcriptContent) {
            toggleTranscriptBtn.addEventListener('click', function() {
                const isHidden = transcriptContent.style.display === 'none';
                const icon = this.querySelector('i');
                const text = this.querySelector('span');
                
                if (isHidden) {
                    transcriptContent.style.display = 'block';
                    this.setAttribute('aria-expanded', 'true');
                    if (icon) icon.className = 'fas fa-eye';
                    if (text) text.textContent = 'Ocultar Transcrição';
                } else {
                    transcriptContent.style.display = 'none';
                    this.setAttribute('aria-expanded', 'false');
                    if (icon) icon.className = 'fas fa-eye-slash';
                    if (text) text.textContent = 'Mostrar Transcrição';
                }
            });
        }
        
        // Video player setup (when VIDEO_URL is replaced)
        const videoPlayer = document.getElementById('video-player');
        if (videoPlayer) {
            // Check if we have a real video URL vs placeholder
            const iframe = videoPlayer.querySelector('iframe');
            if (iframe && iframe.src && !iframe.src.includes('{{VIDEO_URL}}')) {
                // Video is loaded, add additional functionality
                setupVideoPlayer(iframe);
            }
        }
        
        // Transcript search functionality
        addTranscriptSearch();
        
        // Timestamp click navigation (if video is embedded)
        setupTimestampNavigation();
    }
    
    function setupVideoPlayer(iframe) {
        // Add play/pause keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Space bar to play/pause (when not focused on form elements)
            if (e.code === 'Space' && !['INPUT', 'TEXTAREA', 'BUTTON'].includes(e.target.tagName)) {
                e.preventDefault();
                // Send message to iframe (YouTube API)
                iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
        });
        
        console.log('Video player initialized');
    }
    
    function addTranscriptSearch() {
        const transcriptSection = document.querySelector('.transcript-section');
        if (!transcriptSection) return;
        
        // Create search input
        const searchContainer = document.createElement('div');
        searchContainer.className = 'transcript-search';
        searchContainer.innerHTML = `
            <div style="margin-bottom: 1rem;">
                <label for="transcript-search-input" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">
                    Buscar na transcrição:
                </label>
                <div style="position: relative; max-width: 400px;">
                    <input 
                        type="text" 
                        id="transcript-search-input"
                        placeholder="Digite para buscar..."
                        style="width: 100%; padding: 0.75rem 2.5rem 0.75rem 1rem; border: 2px solid #E5E7EB; border-radius: 0.5rem; font-size: 1rem;"
                    />
                    <i class="fas fa-search" style="position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); color: #6B7280;" aria-hidden="true"></i>
                </div>
                <div id="search-results" style="margin-top: 0.5rem; font-size: 0.875rem; color: #6B7280;"></div>
            </div>
        `;
        
        // Insert search before transcript controls
        const transcriptControls = transcriptSection.querySelector('.transcript-controls');
        if (transcriptControls) {
            transcriptSection.insertBefore(searchContainer, transcriptControls);
        }
        
        // Search functionality
        const searchInput = document.getElementById('transcript-search-input');
        const searchResults = document.getElementById('search-results');
        const transcriptItems = document.querySelectorAll('.transcript-item .text');
        
        if (searchInput && transcriptItems.length > 0) {
            let searchTimeout;
            
            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimeout);
                const query = this.value.toLowerCase().trim();
                
                // Clear previous highlights
                transcriptItems.forEach(item => {
                    item.innerHTML = item.textContent;
                });
                
                if (query.length < 2) {
                    searchResults.textContent = '';
                    return;
                }
                
                searchTimeout = setTimeout(() => {
                    let matchCount = 0;
                    
                    transcriptItems.forEach(item => {
                        const text = item.textContent.toLowerCase();
                        if (text.includes(query)) {
                            matchCount++;
                            
                            // Highlight matches
                            const highlightedText = item.textContent.replace(
                                new RegExp(`(${escapeRegExp(this.value)})`, 'gi'),
                                '<mark style="background-color: #FEF3C7; padding: 0.125rem 0.25rem; border-radius: 0.25rem;">$1</mark>'
                            );
                            item.innerHTML = highlightedText;
                        }
                    });
                    
                    if (matchCount > 0) {
                        searchResults.textContent = `Encontrados ${matchCount} resultado(s)`;
                        searchResults.style.color = '#059669';
                    } else {
                        searchResults.textContent = 'Nenhum resultado encontrado';
                        searchResults.style.color = '#DC2626';
                    }
                }, 300);
            });
        }
    }
    
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    function setupTimestampNavigation() {
        const timestamps = document.querySelectorAll('.timestamp');
        
        timestamps.forEach(timestamp => {
            timestamp.style.cursor = 'pointer';
            timestamp.style.textDecoration = 'underline';
            timestamp.title = 'Clique para ir para este momento no vídeo';
            
            timestamp.addEventListener('click', function() {
                const timeText = this.textContent.match(/\[(\d{2}):(\d{2})\]/);
                if (timeText) {
                    const minutes = parseInt(timeText[1], 10);
                    const seconds = parseInt(timeText[2], 10);
                    const totalSeconds = minutes * 60 + seconds;
                    
                    // Try to navigate to video time (YouTube API)
                    const iframe = document.querySelector('.video-embed iframe');
                    if (iframe && iframe.src && !iframe.src.includes('{{VIDEO_URL}}')) {
                        const message = JSON.stringify({
                            event: 'command',
                            func: 'seekTo',
                            args: [totalSeconds, true]
                        });
                        iframe.contentWindow.postMessage(message, '*');
                        
                        // Scroll to video
                        iframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
        });
    }
    
    // YouTube API message handling
    window.addEventListener('message', function(event) {
        if (event.origin !== 'https://www.youtube.com') return;
        
        try {
            const data = JSON.parse(event.data);
            // Handle YouTube player events if needed
            console.log('YouTube player event:', data);
        } catch (e) {
            // Ignore invalid messages
        }
    });
    
    // Video accessibility enhancements
    document.addEventListener('DOMContentLoaded', function() {
        const videoContainer = document.querySelector('.video-embed');
        if (videoContainer) {
            const iframe = videoContainer.querySelector('iframe');
            if (iframe) {
                // Ensure proper ARIA labels
                if (!iframe.getAttribute('aria-label')) {
                    iframe.setAttribute('aria-label', 'Vídeo da apresentação do projeto sobre influenciadores e saúde mental');
                }
                
                // Add skip button for screen readers
                const skipButton = document.createElement('button');
                skipButton.textContent = 'Pular vídeo e ir para a transcrição';
                skipButton.className = 'skip-video-btn';
                skipButton.style.cssText = `
                    position: absolute;
                    left: -9999px;
                    background: var(--primary-blue);
                    color: white;
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 0.25rem;
                    font-size: 0.875rem;
                    z-index: 1000;
                `;
                
                skipButton.addEventListener('focus', function() {
                    this.style.left = '1rem';
                    this.style.top = '1rem';
                });
                
                skipButton.addEventListener('blur', function() {
                    this.style.left = '-9999px';
                });
                
                skipButton.addEventListener('click', function() {
                    const transcriptSection = document.querySelector('.transcript-section');
                    if (transcriptSection) {
                        transcriptSection.scrollIntoView({ behavior: 'smooth' });
                        transcriptSection.focus();
                    }
                });
                
                videoContainer.style.position = 'relative';
                videoContainer.appendChild(skipButton);
            }
        }
    });
    
})();