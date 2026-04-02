/**
 * app.js - E-Commerce UX Redesign Case Study
 * Handles interactive elements, mock cart state, and the progressive checkout flow.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCheckoutFlow();
  initAutoFill();
  initProductInteractions();
});

// --- Checkout Flow Logic ---
function initCheckoutFlow() {
  const steps = document.querySelectorAll('.step');
  const formSections = document.querySelectorAll('.form-section');
  const nextBtns = document.querySelectorAll('.btn-next');
  const prevBtns = document.querySelectorAll('.btn-prev');
  const progressBar = document.getElementById('progress-bar');
  
  if (!steps.length || !formSections.length) return;

  let currentStep = 0;

  function updateSteps() {
    steps.forEach((step, index) => {
      // Manage active state
      if (index === currentStep) {
        step.classList.add('active');
        step.classList.remove('completed');
      } else if (index < currentStep) {
        step.classList.remove('active');
        step.classList.add('completed');
      } else {
        step.classList.remove('active', 'completed');
      }
    });

    // Toggle form sections
    formSections.forEach((section, index) => {
      if (index === currentStep) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    // Update progress bar width based on 3 steps (0, 50%, 100%)
    if (progressBar) {
      const percentage = (currentStep / (steps.length - 1)) * 100;
      progressBar.style.width = `${percentage}%`;
    }
    
    // Scroll to top of form smoothly on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Next buttons
  nextBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Basic validation simulation for current step
      const currentForm = formSections[currentStep];
      const inputs = currentForm.querySelectorAll('input[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'var(--error)';
        } else {
          input.style.borderColor = 'var(--border-color)';
        }
      });

      if (isValid && currentStep < steps.length - 1) {
        currentStep++;
        updateSteps();
      } else if (isValid && currentStep === steps.length - 1) {
        // Complete checkout
        const btnText = btn.querySelector('span') || btn;
        btnText.textContent = 'Processing...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
          alert('Order Placed! Thank you for reviewing the UX Redesign Case Study.');
          window.location.href = 'index.html';
        }, 1500);
      }
    });
  });

  // Previous buttons
  prevBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentStep > 0) {
        currentStep--;
        updateSteps();
      }
    });
  });
  
  // Clean validation borders on input
  formSections.forEach(section => {
    const inputs = section.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.style.borderColor = '';
      });
    });
  });

  // Initialize
  updateSteps();
}

// --- Auto-fill Simulation ---
function initAutoFill() {
  const autofillBtn = document.getElementById('simulate-autofill');
  if (!autofillBtn) return;

  autofillBtn.addEventListener('click', (e) => {
    e.preventDefault();
    autofillBtn.innerHTML = '<i data-lucide="loader" class="lucide pulse-bg"></i> Filling...';
    
    setTimeout(() => {
      document.getElementById('email').value = 'user@example.com';
      document.getElementById('fname').value = 'Jane';
      document.getElementById('lname').value = 'Doe';
      document.getElementById('address').value = '123 UX Way';
      document.getElementById('city').value = 'Design City';
      document.getElementById('zip').value = '90210';
      
      // Update icon back to normal
      autofillBtn.innerHTML = '<i data-lucide="zap" class="lucide"></i> Auto-fill profile (Simulate)';
      
      // Trigger color reset
      document.querySelectorAll('input').forEach(input => input.style.borderColor = 'var(--success)');
      setTimeout(() => {
         document.querySelectorAll('input').forEach(input => input.style.borderColor = '');
      }, 1000);
    }, 600);
  });

  // Card formatting simulation
  const cardInput = document.getElementById('card-number');
  if (cardInput) {
    cardInput.addEventListener('input', function (e) {
      let target = e.target;
      let val = target.value.replace(/\D/g, ''); // Remove non-digits
      if (val.length > 0) {
        val = val.match(/.{1,4}/g).join(' '); // Add space every 4 digits
      }
      target.value = val;
    });
  }
}

// --- Product Page Interactions ---
function initProductInteractions() {
  // Thumbnail gallery switching
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.querySelector('.main-image');
  
  if (thumbnails.length && mainImage) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // Remove active from all
        thumbnails.forEach(t => t.classList.remove('active'));
        // Add to clicked
        thumb.classList.add('active');
        // Update main image source (in a real app)
        // mainImage.src = thumb.src; 
        
        // Quick fade effect
        mainImage.style.opacity = 0;
        setTimeout(() => {
          mainImage.style.opacity = 1;
        }, 150);
      });
    });
  }
}
