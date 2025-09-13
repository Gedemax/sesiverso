// Main JavaScript file for Sesiverso website
// Handles emergency modal, navigation, analytics, and accessibility features

(function() {
    'use strict';

    // DOM elements
    const emergencyBtn = document.getElementById('emergency-btn');
    const emergencyModal = document.getElementById('emergency-modal');
    const closeEmergencyBtn = document.getElementById('close-emergency');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Emergency help functionality
    let helpClickCount = 0;
    
    function openEmergencyModal() {
        if (emergencyModal) {
            emergencyModal.style.display = 'flex';
            emergencyModal.focus();
            document.body.style.overflow = 'hidden';
            
            // Track help button clicks (anonymously)
            helpClickCount++;
            localStorage.setItem('helpClickCount', helpClickCount.toString());
            
            // Log for analytics (no personal data)
            console.log('Help button clicked - Count:', helpClickCount);
        }
    }
    
    function closeEmergencyModal() {
        if (emergencyModal) {
            emergencyModal.style.display = 'none';
            document.body.style.overflow = '';
            emergencyBtn.focus(); // Return focus to button
        }
    }
    
    // Emergency modal event listeners
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', openEmergencyModal);
    }
    
    if (closeEmergencyBtn) {
        closeEmergencyBtn.addEventListener('click', closeEmergencyModal);
    }
    
    // Close modal when clicking outside
    if (emergencyModal) {
        emergencyModal.addEventListener('click', function(e) {
            if (e.target === emergencyModal) {
                closeEmergencyModal();
            }
        });
    }
    
    // Keyboard navigation for emergency modal
    document.addEventListener('keydown', function(e) {
        if (emergencyModal && emergencyModal.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeEmergencyModal();
            }
            
            // Trap focus within modal
            const focusableElements = emergencyModal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    });
    
    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isActive = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', !isActive);
            
            // Update icon
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (isActive) {
                    icon.className = 'fas fa-bars';
                } else {
                    icon.className = 'fas fa-times';
                }
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update focus for accessibility
                target.focus();
                if (document.activeElement !== target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            }
        });
    });
    
    // Initialize help click counter from localStorage
    const savedCount = localStorage.getItem('helpClickCount');
    if (savedCount) {
        helpClickCount = parseInt(savedCount, 10) || 0;
    }
    
    // Form validation helpers
    window.validateForm = function(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            const errorElement = form.querySelector(`#${field.id}-error`);
            
            if (!field.value.trim()) {
                field.classList.add('error');
                field.setAttribute('aria-invalid', 'true');
                if (errorElement) {
                    errorElement.textContent = 'Este campo é obrigatório';
                    errorElement.style.display = 'block';
                }
                isValid = false;
            } else {
                field.classList.remove('error');
                field.setAttribute('aria-invalid', 'false');
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
                
                // Email validation
                if (field.type === 'email' && field.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        field.classList.add('error');
                        field.setAttribute('aria-invalid', 'true');
                        if (errorElement) {
                            errorElement.textContent = 'Por favor, insira um email válido';
                            errorElement.style.display = 'block';
                        }
                        isValid = false;
                    }
                }
            }
        });
        
        return isValid;
    };
    
    // Survey functionality
    window.SurveyManager = {
        responses: [],
        
        init: function() {
            const surveyForms = document.querySelectorAll('.survey-form');
            surveyForms.forEach(form => {
                form.addEventListener('submit', this.handleSurveySubmit.bind(this));
            });
        },
        
        handleSurveySubmit: function(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const response = {
                timestamp: new Date().toISOString(),
                responses: {}
            };
            
            // Collect form data
            for (let [key, value] of formData.entries()) {
                response.responses[key] = value;
            }
            
            this.responses.push(response);
            this.saveResponses();
            
            // Show success message
            this.showSuccessMessage(form);
            
            // Reset form
            form.reset();
        },
        
        saveResponses: function() {
            try {
                localStorage.setItem('surveyResponses', JSON.stringify(this.responses));
            } catch (e) {
                console.error('Erro ao salvar respostas:', e);
            }
        },
        
        loadResponses: function() {
            try {
                const saved = localStorage.getItem('surveyResponses');
                if (saved) {
                    this.responses = JSON.parse(saved);
                }
            } catch (e) {
                console.error('Erro ao carregar respostas:', e);
                this.responses = [];
            }
        },
        
        exportToCSV: function() {
            if (this.responses.length === 0) {
                alert('Nenhuma resposta disponível para exportar.');
                return;
            }
            
            // Criar cabeçalhos CSV
            const headers = ['Timestamp'];
            const firstResponse = this.responses[0];
            if (firstResponse.responses) {
                headers.push(...Object.keys(firstResponse.responses));
            }
            
            // Criar linhas CSV
            const csvLines = [headers.join(',')];
            
            this.responses.forEach(response => {
                const row = [response.timestamp];
                if (response.responses) {
                    headers.slice(1).forEach(header => {
                        row.push(response.responses[header] || '');
                    });
                }
                csvLines.push(row.join(','));
            });
            
            // Download do arquivo
            const csvContent = csvLines.join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `survey_results_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        
        showSuccessMessage: function(form) {
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.innerHTML = `
                <div style="background-color: var(--success); color: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                    <i class="fas fa-check-circle"></i>
                    Obrigado! Sua resposta foi registrada com sucesso.
                </div>
            `;
            
            form.parentNode.insertBefore(successDiv, form);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successDiv.remove();
            }, 5000);
        }
    };
    
    // Accessibility helpers
    window.AccessibilityHelper = {
        init: function() {
            this.addSkipLink();
            this.improveFormAccessibility();
            this.handleReducedMotion();
        },
        
        addSkipLink: function() {
            const skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.className = 'skip-link';
            skipLink.textContent = 'Pular para o conteúdo principal';
            document.body.insertBefore(skipLink, document.body.firstChild);
        },
        
        improveFormAccessibility: function() {
            // Add error containers for form fields
            const formFields = document.querySelectorAll('input, textarea, select');
            formFields.forEach(field => {
                if (!field.id) {
                    field.id = 'field_' + Math.random().toString(36).substr(2, 9);
                }
                
                const existingError = document.querySelector(`#${field.id}-error`);
                if (!existingError) {
                    const errorElement = document.createElement('div');
                    errorElement.id = `${field.id}-error`;
                    errorElement.className = 'field-error';
                    errorElement.setAttribute('role', 'alert');
                    errorElement.style.display = 'none';
                    errorElement.style.color = 'var(--error)';
                    errorElement.style.fontSize = '0.875rem';
                    errorElement.style.marginTop = '0.25rem';
                    
                    field.parentNode.insertBefore(errorElement, field.nextSibling);
                    field.setAttribute('aria-describedby', errorElement.id);
                }
            });
        },
        
        handleReducedMotion: function() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                // Disable animations for users who prefer reduced motion
                document.documentElement.style.setProperty('--transition', 'none');
            }
        }
    };
    
    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Load saved survey responses
        if (window.SurveyManager) {
            window.SurveyManager.loadResponses();
            window.SurveyManager.init();
        }
        
        // Initialize accessibility helpers
        if (window.AccessibilityHelper) {
            window.AccessibilityHelper.init();
        }
        
        // Add export button for survey results if we're on the interventions page
        if (window.location.pathname.includes('intervencoes.html')) {
            const exportBtn = document.getElementById('export-survey');
            if (exportBtn && window.SurveyManager) {
                exportBtn.addEventListener('click', function() {
                    window.SurveyManager.exportToCSV();
                });
            }
        }
        
        console.log('Sesiverso website initialized successfully');
        console.log('Emergency help clicks recorded:', helpClickCount);
    });
    
    // Service Worker registration for offline support
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').then(function(registration) {
                console.log('SW registered: ', registration);
            }).catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
        });
    }
    
})();