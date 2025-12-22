/**
 * ESYPTO ENTERPRISE JAVASCRIPT
 * Modern Business Directory Platform
 * Interactive Components & Utilities
 */

// Global namespace
window.EsyptoJS = {
  version: '2.0.0',
  components: {},
  utils: {},
  config: {
    animationDuration: 300,
    debounceDelay: 300,
    apiEndpoint: '/api/v1/',
    theme: localStorage.getItem('esypto-theme') || 'light'
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  EsyptoJS.init();
});

/**
 * Main Initialization
 */
EsyptoJS.init = function() {
  console.log('🚀 Esypto Enterprise JS v' + this.version + ' initialized');
  
  // Initialize core components
  this.components.navigation = new NavigationComponent();
  this.components.modals = new ModalComponent();
  this.components.forms = new FormComponent();
  this.components.search = new SearchComponent();
  this.components.animations = new AnimationComponent();
  this.components.theme = new ThemeComponent();
  this.components.toast = new ToastComponent();
  
  // Initialize utilities
  this.utils.lazyLoading = new LazyLoadingUtil();
  this.utils.analytics = new AnalyticsUtil();
  
  // Set initial theme
  this.components.theme.setTheme(this.config.theme);
  
  // Global error handling
  this.setupErrorHandling();
  
  // Performance monitoring
  this.monitorPerformance();
};

/**
 * Navigation Component
 */
function NavigationComponent() {
  this.init();
}

NavigationComponent.prototype = {
  init: function() {
    this.setupMobileToggle();
    this.setupDropdowns();
    this.setupSmoothScroll();
    this.setupActiveStates();
  },

  setupMobileToggle: function() {
    const toggle = document.querySelector('.navbar-toggle');
    const nav = document.querySelector('.navbar-nav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isActive = nav.classList.contains('active');
      
      nav.classList.toggle('active');
      toggle.setAttribute('aria-expanded', !isActive);
      
      // Animate icon
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar')) {
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        const icon = toggle.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  },

  setupDropdowns: function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.nav-link');
      const menu = dropdown.querySelector('.dropdown-menu');
      
      if (!trigger || !menu) return;
      
      let timeout;
      
      // Mouse events
      dropdown.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        menu.style.display = 'block';
        setTimeout(() => menu.classList.add('show'), 10);
      });
      
      dropdown.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
          menu.classList.remove('show');
          setTimeout(() => menu.style.display = 'none', 200);
        }, 100);
      });
      
      // Keyboard navigation
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }
      });
    });
  },

  setupSmoothScroll: function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without jumping
          history.pushState(null, null, href);
        }
      });
    });
  },

  setupActiveStates: function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === currentPath || currentPath.startsWith(href + '/'))) {
        link.classList.add('active');
      }
    });
  }
};

/**
 * Modal Component
 */
function ModalComponent() {
  this.activeModal = null;
  this.init();
}

ModalComponent.prototype = {
  init: function() {
    this.setupTriggers();
    this.setupKeyboardHandling();
  },

  setupTriggers: function() {
    // Modal triggers
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-modal-target]');
      if (trigger) {
        e.preventDefault();
        const targetId = trigger.getAttribute('data-modal-target');
        this.open(targetId);
      }
      
      // Close buttons
      const closeBtn = e.target.closest('[data-modal-close]');
      if (closeBtn) {
        e.preventDefault();
        this.close();
      }
      
      // Backdrop click
      if (e.target.classList.contains('modal-backdrop')) {
        this.close();
      }
    });
  },

  setupKeyboardHandling: function() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.close();
      }
      
      // Trap focus within modal
      if (this.activeModal && e.key === 'Tab') {
        this.trapFocus(e);
      }
    });
  },

  open: function(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    this.activeModal = modal;
    
    // Store previously focused element
    this.previouslyFocused = document.activeElement;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus first focusable element
    const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
    
    // Trigger custom event
    modal.dispatchEvent(new CustomEvent('modal:opened', { detail: { modalId } }));
  },

  close: function() {
    if (!this.activeModal) return;
    
    const modal = this.activeModal;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Restore focus
    if (this.previouslyFocused) {
      this.previouslyFocused.focus();
    }
    
    // Trigger custom event
    modal.dispatchEvent(new CustomEvent('modal:closed'));
    
    this.activeModal = null;
    this.previouslyFocused = null;
  },

  trapFocus: function(e) {
    const focusableElements = this.activeModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
};

/**
 * Form Component
 */
function FormComponent() {
  this.init();
}

FormComponent.prototype = {
  init: function() {
    this.setupValidation();
    this.setupFileUploads();
    this.setupFormSubmission();
  },

  setupValidation: function() {
    const forms = document.querySelectorAll('[data-validate]');
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, select, textarea');
      
      inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', EsyptoJS.utils.debounce(() => {
          if (input.classList.contains('is-invalid')) {
            this.validateField(input);
          }
        }, 500));
      });
      
      // Form submission validation
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });
    });
  },

  validateField: function(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    let isValid = true;
    let message = '';
    
    // Required validation
    if (required && !value) {
      isValid = false;
      message = 'This field is required';
    }
    
    // Type-specific validation
    if (value && !isValid !== false) {
      switch (type) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
          }
          break;
          
        case 'tel':
          const phoneRegex = /^[\+]?[\d\s\-\(\)]{7,15}$/;
          if (!phoneRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid phone number';
          }
          break;
          
        case 'url':
          try {
            new URL(value);
          } catch {
            isValid = false;
            message = 'Please enter a valid URL';
          }
          break;
          
        case 'password':
          if (value.length < 8) {
            isValid = false;
            message = 'Password must be at least 8 characters long';
          }
          break;
      }
    }
    
    // Custom validation patterns
    const pattern = field.getAttribute('pattern');
    if (pattern && value && !new RegExp(pattern).test(value)) {
      isValid = false;
      message = field.getAttribute('data-pattern-message') || 'Invalid format';
    }
    
    // Update field state
    this.updateFieldState(field, isValid, message);
    
    return isValid;
  },

  validateForm: function(form) {
    const fields = form.querySelectorAll('input, select, textarea');
    let isFormValid = true;
    
    fields.forEach(field => {
      if (!this.validateField(field)) {
        isFormValid = false;
      }
    });
    
    return isFormValid;
  },

  updateFieldState: function(field, isValid, message) {
    const formGroup = field.closest('.form-group');
    
    // Update field classes
    field.classList.toggle('is-valid', isValid);
    field.classList.toggle('is-invalid', !isValid);
    
    // Update feedback message
    if (formGroup) {
      let feedback = formGroup.querySelector('.invalid-feedback, .valid-feedback');
      
      if (!feedback) {
        feedback = document.createElement('div');
        formGroup.appendChild(feedback);
      }
      
      feedback.className = isValid ? 'valid-feedback' : 'invalid-feedback';
      feedback.textContent = message;
    }
  },

  setupFileUploads: function() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
      const wrapper = document.createElement('div');
      wrapper.className = 'file-upload-wrapper';
      
      input.parentNode.insertBefore(wrapper, input);
      wrapper.appendChild(input);
      
      // Create custom upload area
      const uploadArea = document.createElement('div');
      uploadArea.className = 'file-upload-area';
      uploadArea.innerHTML = `
        <div class="file-upload-icon">
          <i class="fas fa-cloud-upload-alt"></i>
        </div>
        <div class="file-upload-text">
          <p>Drop files here or <span class="file-upload-browse">browse</span></p>
          <small>Supported formats: JPG, PNG, GIF (max 5MB)</small>
        </div>
      `;
      
      wrapper.appendChild(uploadArea);
      
      // Handle drag and drop
      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
      });
      
      uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
      });
      
      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          input.files = files;
          this.handleFileSelection(input, files[0]);
        }
      });
      
      // Handle click to browse
      uploadArea.addEventListener('click', () => input.click());
      
      // Handle file selection
      input.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          this.handleFileSelection(input, e.target.files[0]);
        }
      });
    });
  },

  handleFileSelection: function(input, file) {
    const wrapper = input.closest('.file-upload-wrapper');
    const uploadArea = wrapper.querySelector('.file-upload-area');
    
    // Validate file
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
    if (file.size > maxSize) {
      EsyptoJS.components.toast.show('File size must be less than 5MB', 'error');
      return;
    }
    
    if (!allowedTypes.includes(file.type)) {
      EsyptoJS.components.toast.show('Please select a valid image file', 'error');
      return;
    }
    
    // Show preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadArea.innerHTML = `
          <div class="file-preview">
            <img src="${e.target.result}" alt="Preview" class="file-preview-image">
            <div class="file-preview-info">
              <p class="file-name">${file.name}</p>
              <p class="file-size">${this.formatFileSize(file.size)}</p>
            </div>
            <button type="button" class="file-remove-btn" onclick="this.closest('.file-upload-wrapper').querySelector('input').value=''; this.closest('.file-upload-area').innerHTML=this.closest('.file-upload-wrapper').dataset.originalContent;">
              <i class="fas fa-times"></i>
            </button>
          </div>
        `;
      };
      reader.readAsDataURL(file);
    }
  },

  formatFileSize: function(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  setupFormSubmission: function() {
    const forms = document.querySelectorAll('form[data-ajax]');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitForm(form);
      });
    });
  },

  submitForm: function(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.classList.add('btn-loading');
    submitBtn.disabled = true;
    
    const formData = new FormData(form);
    const url = form.action || window.location.href;
    
    fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': formData.get('csrfmiddlewaretoken')
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        EsyptoJS.components.toast.show(data.message || 'Form submitted successfully', 'success');
        if (data.redirect) {
          setTimeout(() => window.location.href = data.redirect, 1000);
        }
      } else {
        EsyptoJS.components.toast.show(data.message || 'An error occurred', 'error');
        
        // Show field errors
        if (data.errors) {
          Object.keys(data.errors).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field) {
              this.updateFieldState(field, false, data.errors[fieldName][0]);
            }
          });
        }
      }
    })
    .catch(error => {
      console.error('Form submission error:', error);
      EsyptoJS.components.toast.show('Network error. Please try again.', 'error');
    })
    .finally(() => {
      // Reset button state
      submitBtn.classList.remove('btn-loading');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    });
  }
};

/**
 * Search Component
 */
function SearchComponent() {
  this.init();
}

SearchComponent.prototype = {
  init: function() {
    this.setupSearchInputs();
    this.setupFilters();
  },

  setupSearchInputs: function() {
    const searchInputs = document.querySelectorAll('[data-search]');
    
    searchInputs.forEach(input => {
      const target = input.getAttribute('data-search');
      const items = document.querySelectorAll(target);
      
      input.addEventListener('input', EsyptoJS.utils.debounce((e) => {
        this.performSearch(e.target.value, items);
      }, EsyptoJS.config.debounceDelay));
    });
  },

  performSearch: function(query, items) {
    const searchTerm = query.toLowerCase().trim();
    let visibleCount = 0;
    
    items.forEach(item => {
      const searchableText = this.getSearchableText(item);
      const isMatch = searchableText.includes(searchTerm);
      
      item.style.display = isMatch ? '' : 'none';
      if (isMatch) visibleCount++;
    });
    
    // Update results count
    const counter = document.querySelector('[data-results-count]');
    if (counter) {
      counter.textContent = `${visibleCount} results found`;
    }
    
    // Show no results message
    this.toggleNoResults(visibleCount === 0);
  },

  getSearchableText: function(element) {
    // Get text content from specific elements or entire element
    const searchableElements = element.querySelectorAll('[data-searchable]');
    if (searchableElements.length > 0) {
      return Array.from(searchableElements)
        .map(el => el.textContent)
        .join(' ')
        .toLowerCase();
    }
    return element.textContent.toLowerCase();
  },

  setupFilters: function() {
    const filterSelects = document.querySelectorAll('[data-filter]');
    
    filterSelects.forEach(select => {
      select.addEventListener('change', (e) => {
        this.applyFilters();
      });
    });
  },

  applyFilters: function() {
    const filters = {};
    const filterSelects = document.querySelectorAll('[data-filter]');
    
    // Collect all filter values
    filterSelects.forEach(select => {
      const filterType = select.getAttribute('data-filter');
      const value = select.value;
      if (value) {
        filters[filterType] = value;
      }
    });
    
    // Apply filters to items
    const items = document.querySelectorAll('[data-filterable]');
    let visibleCount = 0;
    
    items.forEach(item => {
      let isVisible = true;
      
      Object.keys(filters).forEach(filterType => {
        const itemValue = item.getAttribute(`data-${filterType}`);
        if (itemValue && itemValue !== filters[filterType]) {
          isVisible = false;
        }
      });
      
      item.style.display = isVisible ? '' : 'none';
      if (isVisible) visibleCount++;
    });
    
    // Update results count
    const counter = document.querySelector('[data-results-count]');
    if (counter) {
      counter.textContent = `${visibleCount} results found`;
    }
    
    this.toggleNoResults(visibleCount === 0);
  },

  toggleNoResults: function(show) {
    let noResultsEl = document.querySelector('.no-results');
    
    if (show && !noResultsEl) {
      noResultsEl = document.createElement('div');
      noResultsEl.className = 'no-results text-center py-8';
      noResultsEl.innerHTML = `
        <div class="text-neutral-400 mb-4">
          <i class="fas fa-search text-4xl"></i>
        </div>
        <h3 class="text-lg font-semibold text-neutral-600 mb-2">No results found</h3>
        <p class="text-neutral-500">Try adjusting your search or filter criteria</p>
      `;
      
      const container = document.querySelector('[data-search-container]') || document.querySelector('.business-grid');
      if (container) {
        container.appendChild(noResultsEl);
      }
    } else if (!show && noResultsEl) {
      noResultsEl.remove();
    }
  }
};

/**
 * Animation Component
 */
function AnimationComponent() {
  this.observer = null;
  this.init();
}

AnimationComponent.prototype = {
  init: function() {
    this.setupScrollAnimations();
    this.setupHoverEffects();
  },

  setupScrollAnimations: function() {
    if (!window.IntersectionObserver) return;
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animation = element.getAttribute('data-animate');
          
          if (animation) {
            element.classList.add(`animate-${animation}`);
            this.observer.unobserve(element);
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all elements with data-animate
    document.querySelectorAll('[data-animate]').forEach(el => {
      this.observer.observe(el);
    });
  },

  setupHoverEffects: function() {
    // Card hover effects
    document.querySelectorAll('.card-interactive').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  }
};

/**
 * Theme Component
 */
function ThemeComponent() {
  this.currentTheme = 'light';
  this.init();
}

ThemeComponent.prototype = {
  init: function() {
    this.setupThemeToggle();
    this.detectSystemTheme();
  },

  setupThemeToggle: function() {
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    
    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    });
  },

  detectSystemTheme: function() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setTheme('dark');
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('esypto-theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  },

  setTheme: function(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('esypto-theme', theme);
    
    // Update toggle buttons
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    toggles.forEach(toggle => {
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
    });
  },

  toggleTheme: function() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
};

/**
 * Toast Component
 */
function ToastComponent() {
  this.container = null;
  this.init();
}

ToastComponent.prototype = {
  init: function() {
    this.createContainer();
  },

  createContainer: function() {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    this.container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(this.container);
  },

  show: function(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} animate-slide-in-right`;
    toast.style.cssText = `
      pointer-events: auto;
      margin-bottom: 10px;
      min-width: 300px;
      box-shadow: var(--shadow-lg);
    `;
    
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
      <div class="alert-icon">
        <i class="fas ${icons[type] || icons.info}"></i>
      </div>
      <div class="alert-content">
        <div class="alert-message">${message}</div>
      </div>
      <button class="alert-close" onclick="this.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    this.container.appendChild(toast);
    
    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        if (toast.parentElement) {
          toast.style.opacity = '0';
          toast.style.transform = 'translateX(100%)';
          setTimeout(() => toast.remove(), 300);
        }
      }, duration);
    }
    
    return toast;
  }
};

/**
 * Lazy Loading Utility
 */
function LazyLoadingUtil() {
  this.observer = null;
  this.init();
}

LazyLoadingUtil.prototype = {
  init: function() {
    if (!window.IntersectionObserver) {
      // Fallback for older browsers
      this.loadAllImages();
      return;
    }
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px'
    });
    
    this.observeImages();
  },

  observeImages: function() {
    const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
    images.forEach(img => this.observer.observe(img));
  },

  loadImage: function(img) {
    const src = img.getAttribute('data-src') || img.src;
    
    if (src) {
      const newImg = new Image();
      newImg.onload = () => {
        img.src = src;
        img.classList.add('loaded');
        img.removeAttribute('data-src');
      };
      newImg.onerror = () => {
        img.classList.add('error');
      };
      newImg.src = src;
    }
  },

  loadAllImages: function() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => this.loadImage(img));
  }
};

/**
 * Analytics Utility
 */
function AnalyticsUtil() {
  this.init();
}

AnalyticsUtil.prototype = {
  init: function() {
    this.trackPageView();
    this.setupEventTracking();
  },

  trackPageView: function() {
    // Track page views (integrate with your analytics service)
    console.log('Page view tracked:', window.location.pathname);
  },

  setupEventTracking: function() {
    // Track button clicks
    document.addEventListener('click', (e) => {
      const button = e.target.closest('button, .btn');
      if (button) {
        this.trackEvent('button_click', {
          text: button.textContent.trim(),
          class: button.className
        });
      }
      
      // Track link clicks
      const link = e.target.closest('a');
      if (link && link.href) {
        this.trackEvent('link_click', {
          url: link.href,
          text: link.textContent.trim()
        });
      }
    });
    
    // Track form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target;
      this.trackEvent('form_submit', {
        action: form.action,
        method: form.method
      });
    });
  },

  trackEvent: function(eventName, properties = {}) {
    // Integrate with your analytics service (Google Analytics, Mixpanel, etc.)
    console.log('Event tracked:', eventName, properties);
    
    // Example Google Analytics 4 integration:
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', eventName, properties);
    // }
  }
};

/**
 * Utility Functions
 */
EsyptoJS.utils.debounce = function(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

EsyptoJS.utils.throttle = function(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

EsyptoJS.utils.formatCurrency = function(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

EsyptoJS.utils.formatDate = function(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(new Date(date));
};

/**
 * Error Handling
 */
EsyptoJS.setupErrorHandling = function() {
  window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Send to error tracking service
  });
  
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Send to error tracking service
  });
};

/**
 * Performance Monitoring
 */
EsyptoJS.monitorPerformance = function() {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Performance:', {
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
          totalTime: perfData.loadEventEnd - perfData.fetchStart
        });
      }, 0);
    });
  }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EsyptoJS;
}
                });
            }
        });
    });
}

/**
 * Modal Component
 */
function initializeModals() {
    // Create modal backdrop if it doesn't exist
    let backdrop = document.querySelector('.modal-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: var(--z-modal-backdrop);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(backdrop);
    }
    
    // Handle modal triggers
    document.querySelectorAll('[data-toggle="modal"]').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const modal = document.querySelector(targetId);
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    // Handle modal close buttons
    document.querySelectorAll('[data-dismiss="modal"]').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal on backdrop click
    backdrop.addEventListener('click', function() {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal);
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

function openModal(modal) {
    const backdrop = document.querySelector('.modal-backdrop');
    
    modal.style.display = 'block';
    modal.classList.add('show');
    backdrop.style.opacity = '1';
    backdrop.style.visibility = 'visible';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus management for accessibility
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

function closeModal(modal) {
    const backdrop = document.querySelector('.modal-backdrop');
    
    modal.classList.remove('show');
    backdrop.style.opacity = '0';
    backdrop.style.visibility = 'hidden';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    
    // Restore body scroll
    document.body.style.overflow = '';
}

/**
 * Tooltip Component
 */
function initializeTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--neutral-900);
            color: white;
            padding: var(--space-2) var(--space-3);
            border-radius: var(--radius-md);
            font-size: var(--text-sm);
            white-space: nowrap;
            z-index: var(--z-tooltip);
            opacity: 0;
            visibility: hidden;
            transition: all var(--transition-fast);
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(tooltip);
        
        element.addEventListener('mouseenter', function() {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
        });
        
        element.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        });
    });
}

/**
 * Form Validation
 */
function initializeFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^\+?\d{7,15}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }
    
    // URL validation
    if (field.type === 'url' && value) {
        try {
            new URL(value);
        } catch {
            isValid = false;
            errorMessage = 'Please enter a valid URL.';
        }
    }
    
    // Update field state
    if (isValid) {
        field.classList.remove('is-invalid');
        removeErrorMessage(field);
    } else {
        field.classList.add('is-invalid');
        showErrorMessage(field, errorMessage);
    }
    
    return isValid;
}

function showErrorMessage(field, message) {
    removeErrorMessage(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function removeErrorMessage(field) {
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Search and Filter Components
 */
function initializeSearchFilters() {
    const searchInput = document.querySelector('#search-input');
    const categoryFilter = document.querySelector('#category-filter');
    const businessCards = document.querySelectorAll('.business-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            filterBusinesses();
        }, 300));
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterBusinesses();
        });
    }
    
    function filterBusinesses() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedCategory = categoryFilter ? categoryFilter.value : '';
        
        businessCards.forEach(card => {
            const businessName = card.querySelector('.business-name')?.textContent.toLowerCase() || '';
            const businessCategory = card.dataset.category || '';
            const businessDescription = card.querySelector('.business-description')?.textContent.toLowerCase() || '';
            
            const matchesSearch = !searchTerm || 
                businessName.includes(searchTerm) || 
                businessDescription.includes(searchTerm);
            
            const matchesCategory = !selectedCategory || businessCategory === selectedCategory;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                card.classList.add('animate-fade-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('animate-fade-in');
            }
        });
        
        // Update results count
        const visibleCards = Array.from(businessCards).filter(card => 
            card.style.display !== 'none'
        );
        
        const resultsCount = document.querySelector('#results-count');
        if (resultsCount) {
            resultsCount.textContent = `${visibleCards.length} businesses found`;
        }
    }
}

/**
 * Image Lazy Loading
 */
function initializeImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('loading');
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

/**
 * Scroll Animations
 */
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.animate;
                    element.classList.add(`animate-${animation}`);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    }
}

/**
 * Utility Functions
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Theme Toggle (disabled - using base template implementation)
 */
function initializeThemeToggle() {
    // Disabled - theme toggle is handled in base template
    return;
    
    const themeToggle = document.querySelector('#theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

/**
 * Loading States
 */
function showLoading(element) {
    element.classList.add('loading');
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.style.pointerEvents = '';
}

/**
 * Toast Notifications
 */
function showToast(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="toast-icon fas fa-${getToastIcon(type)}"></i>
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 1px solid var(--neutral-200);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        padding: var(--space-4);
        z-index: var(--z-tooltip);
        transform: translateX(100%);
        transition: transform var(--transition-base);
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || icons.info;
}

// Export functions for global use
window.EsyptoJS = {
    showToast,
    showLoading,
    hideLoading,
    openModal,
    closeModal
};