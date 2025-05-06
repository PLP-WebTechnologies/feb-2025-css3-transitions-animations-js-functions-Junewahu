document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const partyButton = document.getElementById('partyButton');
  const bounceButton = document.getElementById('bounceButton');
  const spinButton = document.getElementById('spinButton');
  const partyImage = document.getElementById('partyImage');
  const preferenceStatus = document.getElementById('preferenceStatus');
  const animationStatus = document.getElementById('animationStatus');
  const themeSelect = document.getElementById('themeSelect');

  // Animation States
  let currentAnimation = '';
  let isAnimating = false;

  // Load saved preferences
  const savedTheme = localStorage.getItem('theme') || 'default';
  const savedAnimation = localStorage.getItem('animation') || '';

  // Apply saved theme
  document.body.setAttribute('data-theme', savedTheme);
  themeSelect.value = savedTheme;

  // Apply saved animation
  if (savedAnimation) {
    partyImage.classList.add(savedAnimation);
    currentAnimation = savedAnimation;
    isAnimating = true;
    updateAnimationStatus(savedAnimation);
  }

  // Theme Change Handler
  themeSelect.addEventListener('change', (e) => {
    const newTheme = e.target.value;
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    preferenceStatus.textContent = `Theme changed to: ${newTheme} 🎨`;
  });

  // Animation Button Handlers
  partyButton.addEventListener('click', () => toggleAnimation('dance'));
  bounceButton.addEventListener('click', () => toggleAnimation('bounce'));
  spinButton.addEventListener('click', () => toggleAnimation('spin'));

  // Animation Toggle Function
  function toggleAnimation(animationType) {
    if (currentAnimation === animationType) {
      // Stop animation
      partyImage.classList.remove(animationType);
      currentAnimation = '';
      isAnimating = false;
      localStorage.removeItem('animation');
      updateAnimationStatus('stopped');
    } else {
      // Remove any existing animation
      if (currentAnimation) {
        partyImage.classList.remove(currentAnimation);
      }
      // Add new animation
      partyImage.classList.add(animationType);
      currentAnimation = animationType;
      isAnimating = true;
      localStorage.setItem('animation', animationType);
      updateAnimationStatus(animationType);
    }
  }

  // Update Animation Status
  function updateAnimationStatus(animation) {
    const statusMessages = {
      dance: '💃 Dancing animation active!',
      bounce: '🏀 Bouncing animation active!',
      spin: '🎡 Spinning animation active!',
      stopped: 'Animation stopped'
    };
    animationStatus.textContent = statusMessages[animation] || '';
  }

  // Add hover effects to buttons
  const buttons = document.querySelectorAll('.glow-button');
  buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
      if (!isAnimating) {
        button.style.transform = 'scale(1.1)';
      }
    });
    button.addEventListener('mouseout', () => {
      if (!isAnimating) {
        button.style.transform = 'scale(1)';
      }
    });
  });
}); 