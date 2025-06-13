// P5.js Footer Animation - "creative" + "coder" = "c rode"

// Wait for DOM to be ready and P5.js to load
document.addEventListener('DOMContentLoaded', function() {
  // Check if P5.js is loaded
  if (typeof p5 === 'undefined') {
    console.error('P5.js not loaded');
    return;
  }
  
  // Initialize the sketch
  new p5(footerSketch, 'p5-container');
});

function footerSketch(p) {
  let canvas;
  let animationState = 'approaching'; // 'approaching', 'colliding', 'formed', 'reset'
  let timer = 0;
  let resetTimer = 0;

  // Text objects
  let creativeText = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    size: 32,
    opacity: 255,
    visible: true
  };

  let coderText = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    size: 32,
    opacity: 255,
    visible: true
  };

  let resultText = {
    x: 0,
    y: 0,
    size: 36,
    opacity: 0,
    visible: false
  };

  // Particle system for collision effect
  let particles = [];

  // Animation timing
  const APPROACH_DURATION = 180; // 3 seconds at 60fps
  const COLLISION_DURATION = 60;  // 1 second
  const DISPLAY_DURATION = 120;   // 2 seconds
  const RESET_DURATION = 60;      // 1 second

  p.setup = function() {
    // Create canvas and attach to container
    const container = document.getElementById('p5-container');
    if (!container) {
      console.error('P5 container not found!');
      return;
    }
    
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    console.log('Creating P5 canvas:', containerWidth, 'x', containerHeight);
    
    canvas = p.createCanvas(containerWidth, containerHeight);
    
    // Initialize positions
    resetAnimation();
    
    console.log('P5 animation initialized');
    
    // Handle window resize
    window.addEventListener('resize', () => {
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;
      p.resizeCanvas(newWidth, newHeight);
      resetAnimation();
    });
  }

  p.draw = function() {
    // Clear background with the footer background color
    p.background(15, 15, 15); // Dark background to match the theme
    
    // Debug: draw a border to see if canvas is working
    p.stroke(100, 150, 255);
    p.strokeWeight(2);
    p.noFill();
    p.rect(1, 1, p.width - 2, p.height - 2);
    
    timer++;
    
    // Update animation based on state
    switch(animationState) {
      case 'approaching':
        updateApproaching();
        break;
      case 'colliding':
        updateColliding();
        break;
      case 'formed':
        updateFormed();
        break;
      case 'reset':
        updateReset();
        break;
    }
    
    // Draw everything
    drawTexts();
    drawParticles();
  }

  function updateApproaching() {
    // Move texts towards center with overlap
    const progress = timer / APPROACH_DURATION;
    const easing = easeInOutCubic(progress);
    
    creativeText.x = p.lerp(creativeText.x, creativeText.targetX, easing * 0.02);
    creativeText.y = p.lerp(creativeText.y, creativeText.targetY, easing * 0.02);
    
    coderText.x = p.lerp(coderText.x, coderText.targetX, easing * 0.02);
    coderText.y = p.lerp(coderText.y, coderText.targetY, easing * 0.02);
    
    // Check if collision should start - when texts are close enough to overlap
    const distance = p.dist(creativeText.x, creativeText.y, coderText.x, coderText.y);
    const approximateTextWidth = creativeText.size * 4; // Approximate width based on font size
    if (distance < approximateTextWidth || timer >= APPROACH_DURATION) {
      animationState = 'colliding';
      timer = 0;
      createCollisionParticles();
    }
  }

  function updateColliding() {
    // Continue moving texts slightly past each other for overlap effect
    const overlapProgress = timer / (COLLISION_DURATION * 0.3); // First 30% for overlap
    if (overlapProgress < 1) {
      // Continue moving past each other slightly
      creativeText.x = p.lerp(creativeText.x, creativeText.targetX + 15, 0.1);
      coderText.x = p.lerp(coderText.x, coderText.targetX - 15, 0.1);
    }
    
    // Fade out original texts
    const fadeProgress = timer / COLLISION_DURATION;
    creativeText.opacity = p.lerp(255, 0, fadeProgress);
    coderText.opacity = p.lerp(255, 0, fadeProgress);
    
    // Update particles
    updateParticles();
    
    if (timer >= COLLISION_DURATION) {
      animationState = 'formed';
      timer = 0;
      creativeText.visible = false;
      coderText.visible = false;
      resultText.visible = true;
    }
  }

  function updateFormed() {
    // Fade in result text
    const fadeProgress = p.min(timer / 30, 1); // Fast fade in
    resultText.opacity = p.lerp(0, 255, fadeProgress);
    
    // Update any remaining particles
    updateParticles();
    
    if (timer >= DISPLAY_DURATION) {
      animationState = 'reset';
      timer = 0;
      resetTimer = 0;
    }
  }

  function updateReset() {
    resetTimer++;
    
    // Fade out result
    const fadeProgress = resetTimer / RESET_DURATION;
    resultText.opacity = p.lerp(255, 0, fadeProgress);
    
    if (resetTimer >= RESET_DURATION) {
      resetAnimation();
    }
  }

  function drawTexts() {
    p.push();
    
    // Set font properties
    p.textAlign(p.CENTER, p.CENTER);
    p.textFont('Inter, sans-serif');
    
    // Draw "creative" text
    if (creativeText.visible) {
      p.fill(255, 255, 255, creativeText.opacity);
      p.textSize(creativeText.size);
      p.text('creative', creativeText.x, creativeText.y);
    }
    
    // Draw "coder" text
    if (coderText.visible) {
      p.fill(255, 255, 255, coderText.opacity);
      p.textSize(coderText.size);
      p.text('coder', coderText.x, coderText.y);
    }
    
    // Draw result text
    if (resultText.visible) {
      p.fill(100, 150, 255, resultText.opacity); // Blue accent color
      p.textSize(resultText.size);
      p.textStyle(p.BOLD);
      p.text('c rode', resultText.x, resultText.y);
    }
    
    p.pop();
  }

  function createCollisionParticles() {
    // Create particles at the actual collision point between the texts
    const collisionX = (creativeText.x + coderText.x) / 2;
    const collisionY = (creativeText.y + coderText.y) / 2;
    
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: collisionX + p.random(-10, 10), // Add some spread around collision point
        y: collisionY + p.random(-10, 10),
        vx: p.random(-4, 4),
        vy: p.random(-4, 4),
        life: 60,
        maxLife: 60,
        size: p.random(2, 8)
      });
    }
  }

  function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      let particle = particles[i];
      
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.98; // Friction
      particle.vy *= 0.98;
      particle.life--;
      
      if (particle.life <= 0) {
        particles.splice(i, 1);
      }
    }
  }

  function drawParticles() {
    p.push();
    
    for (let particle of particles) {
      const alpha = p.map(particle.life, 0, particle.maxLife, 0, 255);
      p.fill(100, 150, 255, alpha);
      p.noStroke();
      p.ellipse(particle.x, particle.y, particle.size);
    }
    
    p.pop();
  }

  function resetAnimation() {
    timer = 0;
    resetTimer = 0;
    animationState = 'approaching';
    particles = [];
    
    // Reset text properties
    creativeText.visible = true;
    coderText.visible = true;
    resultText.visible = false;
    
    creativeText.opacity = 255;
    coderText.opacity = 255;
    resultText.opacity = 0;
    
    // Set initial positions (off-screen) and targets that will overlap
    creativeText.x = p.width * 0.15;
    creativeText.y = p.height / 2;
    creativeText.targetX = p.width * 0.52; // Moved closer to center for overlap
    creativeText.targetY = p.height / 2;
    
    coderText.x = p.width * 0.85;
    coderText.y = p.height / 2;
    coderText.targetX = p.width * 0.48; // Moved closer to center for overlap
    coderText.targetY = p.height / 2;
    
    resultText.x = p.width / 2;
    resultText.y = p.height / 2;
    
    // Adjust for mobile
    if (p.width < 768) {
      creativeText.size = 24;
      coderText.size = 24;
      resultText.size = 28;
      // Adjust overlap positions for smaller text
      creativeText.targetX = p.width * 0.53;
      coderText.targetX = p.width * 0.47;
    } else {
      creativeText.size = 32;
      coderText.size = 32;
      resultText.size = 36;
    }
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - p.pow(-2 * t + 2, 3) / 2;
  }

  // Auto-restart animation every 8 seconds
  setInterval(() => {
    if (animationState === 'formed' && timer > DISPLAY_DURATION - 30) {
      // Don't interrupt if we're about to reset naturally
      return;
    }
    resetAnimation();
  }, 8000);
}
