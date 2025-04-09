function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
          (window.innerWidth <= 768);
}

// Create animated dots with responsive sizing (ChatGPT)
const dotsContainer = document.getElementById('dots-container');
const numDots = 45;

function setResponsiveDots() {
  dotsContainer.innerHTML = '';
  const containerSize = Math.min(500, window.innerWidth * 0.9);
  
  for (let i = 0; i < numDots; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    
    const orbitRadius = containerSize * 0.2 + (Math.random() * containerSize * 0.2);
    
    const angle = (i / numDots) * Math.PI * 2;
    
    dot.style.cssText = `
      --orbit-radius: ${orbitRadius}px;
      opacity: ${0.3 + Math.random() * 0.7};
      animation: rotate ${8 + Math.random() * 12}s linear infinite;
      transform: translate(-50%, -50%) rotate(${angle}rad) translateX(${orbitRadius}px) rotate(-${angle}rad);
    `;
    
    dotsContainer.appendChild(dot);
  }
}

// Adjust on window resize
window.addEventListener('resize', setResponsiveDots);
setResponsiveDots();  //End of ChatGPT

// InstrDevice
function createDeviceInstructions() {
  const container = document.getElementById('device-specific-instructions');
  const isMobile = isMobileDevice();
  
  if (isMobile) {
    container.innerHTML = `
      <p style="margin-bottom: 15px;">You're probably on mobile</p>
      
      <div class="scroll-indicator">
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="pulse">
          <path d="M12 2v20M5 15l7 7 7-7"/>
        </svg>
        <p>Swipe up or down to scroll</p>
      </div>
      
      <div class="language-indicator">
        <div class="lang-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </div>
        <p>Select language in the top right corner</p>
      </div>
    `;
  } else {
    container.innerHTML = `
      <p style="margin-bottom: 15px;">You're probably on PC</p>
      
      <div class="scroll-indicator">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="pulse">
          <circle cx="12" cy="7" r="4"></circle>
          <path d="M12 11v8M8 15l4 4 4-4"></path>
        </svg>
        <p>Scroll wheel to navigate</p>
      </div>
      
      <div class="scroll-indicator">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M12 19V5M5 12l7-7 7 7"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M12 5v14M19 12l-7 7-7-7"></path>
        </svg>
        <p>Use arrow keys for navigation</p>
      </div>
      
      <div class="language-indicator">
        <div class="lang-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </div>
        <p>Select language in the top right corner</p>
      </div>
    `;
  }
}

function setupAudioAutoplay() {
  const audio = document.getElementById('background-audio');
  
  // Modified code from UNC.Izak.UK
  function playAudio() {
    audio.play().catch(e => {
      console.log("Audio playback failed:", e);
    });
  }
  
  return playAudio;
}

window.addEventListener('load', function() {
  createDeviceInstructions();
  const playAudio = setupAudioAutoplay(); //end of it basically
  
  // ButtonFunc
  const beginButton = document.getElementById('begin-button');
  const beginScreen = document.getElementById('begin-screen');
  const loadingScreen = document.getElementById('loading-screen');
  
  beginButton.addEventListener('click', function() {
    // FadeOButton
    beginScreen.style.opacity = '0';
    beginScreen.style.pointerEvents = 'none';
    
    // BeginAudio
    playAudio();
    
    setTimeout(() => {
      loadingScreen.style.opacity = '1';
      loadingScreen.style.pointerEvents = 'auto';
      
      // SequenceTiming
      startMainSequence();
    }, 1800); // ShiftWait
  });
  
  // Sequence Thingy
  function startMainSequence() {
    setTimeout(() => {
      // AnimateMessage
      const mainMessage = document.getElementById('main-message');
      mainMessage.style.animation = 'fadeOut 1.5s';
      
      // InstrScreen
      setTimeout(() => {
        const instructionsScreen = document.getElementById('instructions-screen');
        
        loadingScreen.style.opacity = '0';
        
        instructionsScreen.style.opacity = '1';
        
        // ProgressBar
        setTimeout(() => {
          const progressBar = document.getElementById('progress-bar');
          const progressLine = document.getElementById('progress-line');
          
          progressBar.style.opacity = '1';
          progressLine.style.width = '100%';
          
          // FadeRedirect
          setTimeout(() => {
            const overlay = document.getElementById('transition-overlay');
            overlay.style.opacity = '1';
            
            setTimeout(() => {
              window.location.href = 'https://izak.uk/';
            }, 1500);
          }, 4000); // Progress bar time
        }, 1000); // Delay before progress
      }, 1500); // Message tijd for fade out
    }, 5000); // Initial display time
  }
});