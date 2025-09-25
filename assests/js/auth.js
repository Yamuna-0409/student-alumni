// Authentication functionality

// Modal functions
function openAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Tab switching functionality
function switchTab(tabName) {
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Add active class to clicked tab
    const activeTab = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Hide all forms
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => form.classList.remove('active'));
    
    // Show selected form
    const activeForm = document.getElementById(tabName + 'Form');
    if (activeForm) {
        activeForm.classList.add('active');
    }
}

// Form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateName(name) {
    return name.trim().length >= 2;
}

// Form submission handlers
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister();
        });
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAuthModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAuthModal();
        }
    });
});

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Validate inputs
    if (!validateEmail(email)) {
        showFormError('loginForm', 'Please enter a valid email address.');
        return;
    }
    
    if (password.length < 6) {
        showFormError('loginForm', 'Password must be at least 6 characters long.');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('#loginForm .btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In a real app, this would make an API call
        if (email === 'demo@example.com' && password === 'password') {
            showNotification('Login successful!', 'success');
            closeAuthModal();
            // Update UI to show logged in state
            updateLoginState(true);
        } else {
            showFormError('loginForm', 'Invalid email or password.');
        }
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function handleRegister() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const userType = document.getElementById('userType').value;
    
    // Validate inputs
    if (!validateName(name)) {
        showFormError('registerForm', 'Please enter a valid name (at least 2 characters).');
        return;
    }
    
    if (!validateEmail(email)) {
        showFormError('registerForm', 'Please enter a valid email address.');
        return;
    }
    
    if (!validatePassword(password)) {
        showFormError('registerForm', 'Password must be at least 8 characters with uppercase, lowercase, and number.');
        return;
    }
    
    if (password !== confirmPassword) {
        showFormError('registerForm', 'Passwords do not match.');
        return;
    }
    
    if (!userType) {
        showFormError('registerForm', 'Please select whether you are a student or alumni.');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('#registerForm .btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating account...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // In a real app, this would make an API call
        showNotification('Account created successfully!', 'success');
        closeAuthModal();
        // Update UI to show logged in state
        updateLoginState(true);
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function showFormError(formId, message) {
    // Remove existing error messages
    const existingError = document.querySelector(`#${formId} .form-error`);
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.9rem;
        margin-top: 0.5rem;
        padding: 0.5rem;
        background: #fdf2f2;
        border: 1px solid #fecaca;
        border-radius: 5px;
    `;
    
    // Add error message to form
    const form = document.getElementById(formId);
    const submitBtn = form.querySelector('.btn-primary');
    submitBtn.parentNode.insertBefore(errorDiv, submitBtn);
}

function updateLoginState(isLoggedIn) {
    const authButtons = document.querySelectorAll('.auth-btn');
    
    if (isLoggedIn) {
        authButtons.forEach(button => {
            button.textContent = 'Dashboard';
            button.onclick = function() {
                // In a real app, this would navigate to dashboard
                showNotification('Dashboard coming soon!', 'info');
            };
        });
        
        // Show user-specific content
        showUserContent();
    } else {
        authButtons.forEach(button => {
            button.textContent = 'Login/Register';
            button.onclick = openAuthModal;
        });
        
        // Hide user-specific content
        hideUserContent();
    }
}

function showUserContent() {
    // In a real app, this would show user-specific content
    console.log('Showing user content');
}

function hideUserContent() {
    // In a real app, this would hide user-specific content
    console.log('Hiding user content');
}

// Social login functions (for future implementation)
function loginWithGoogle() {
    showNotification('Google login coming soon!', 'info');
}

function loginWithLinkedIn() {
    showNotification('LinkedIn login coming soon!', 'info');
}

function loginWithGitHub() {
    showNotification('GitHub login coming soon!', 'info');
}

// Password visibility toggle
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
}

// Remember me functionality
function handleRememberMe() {
    const rememberMe = document.getElementById('rememberMe');
    if (rememberMe && rememberMe.checked) {
        // In a real app, this would set a persistent cookie
        console.log('Remember me enabled');
    }
}

// Forgot password functionality
function handleForgotPassword() {
    const email = document.getElementById('loginEmail').value;
    
    if (!email) {
        showFormError('loginForm', 'Please enter your email address first.');
        return;
    }
    
    if (!validateEmail(email)) {
        showFormError('loginForm', 'Please enter a valid email address.');
        return;
    }
    
    showNotification('Password reset email sent!', 'success');
}

// Logout functionality
function logout() {
    // In a real app, this would clear authentication tokens
    updateLoginState(false);
    showNotification('Logged out successfully!', 'info');
}

// Check if user is logged in (for demo purposes)
function isUserLoggedIn() {
    // In a real app, this would check authentication status
    return false;
}

// Auto-fill demo credentials
function fillDemoCredentials() {
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    
    if (loginEmail && loginPassword) {
        loginEmail.value = 'demo@example.com';
        loginPassword.value = 'password';
    }
}

// Add demo credentials button to login form
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const demoBtn = document.createElement('button');
        demoBtn.type = 'button';
        demoBtn.textContent = 'Use Demo Credentials';
        demoBtn.className = 'btn-secondary';
        demoBtn.style.cssText = `
            width: 100%;
            margin-top: 1rem;
            padding: 0.5rem;
            font-size: 0.9rem;
        `;
        demoBtn.onclick = fillDemoCredentials;
        
        const submitBtn = loginForm.querySelector('.btn-primary');
        submitBtn.parentNode.insertBefore(demoBtn, submitBtn.nextSibling);
    }
});