// Main JavaScript functionality

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(102, 126, 234, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                navbar.style.backdropFilter = 'none';
            }
        }
    });

    // Initialize page-specific functionality
    initializePageFeatures();
});

// Page-specific initialization
function initializePageFeatures() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('alumni-connect.html')) {
        initializeAlumniConnect();
    } else if (currentPage.includes('internships.html')) {
        initializeInternships();
    } else if (currentPage.includes('courses.html')) {
        initializeCourses();
    } else if (currentPage.includes('roadmap.html')) {
        initializeRoadmap();
    } else if (currentPage.includes('top-alumni.html')) {
        initializeTopAlumni();
    }
}

// Alumni Connect page functionality
function initializeAlumniConnect() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const alumniCards = document.querySelectorAll('.alumni-card');
    const searchInput = document.querySelector('.search-input');

    // Filter functionality
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            filterAlumniCards(filter, alumniCards);
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchAlumniCards(searchTerm, alumniCards);
        });
    }

    // Connect button functionality
    document.querySelectorAll('.btn-connect').forEach(button => {
        button.addEventListener('click', function() {
            // Check if user is logged in
            if (!isUserLoggedIn()) {
                openAuthModal();
                return;
            }
            
            // Handle connect functionality
            handleConnect(this);
        });
    });

    // Message button functionality
    document.querySelectorAll('.btn-message').forEach(button => {
        button.addEventListener('click', function() {
            if (!isUserLoggedIn()) {
                openAuthModal();
                return;
            }
            
            // Handle message functionality
            handleMessage(this);
        });
    });
}

// Internships page functionality
function initializeInternships() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const internshipCards = document.querySelectorAll('.internship-card');
    const searchInput = document.querySelector('.search-input');

    // Filter functionality
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            filterInternshipCards(filter, internshipCards);
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchInternshipCards(searchTerm, internshipCards);
        });
    }

    // Apply button functionality
    document.querySelectorAll('.btn-apply').forEach(button => {
        button.addEventListener('click', function() {
            if (!isUserLoggedIn()) {
                openAuthModal();
                return;
            }
            
            handleApply(this);
        });
    });

    // Save button functionality
    document.querySelectorAll('.btn-save').forEach(button => {
        button.addEventListener('click', function() {
            if (!isUserLoggedIn()) {
                openAuthModal();
                return;
            }
            
            handleSave(this);
        });
    });
}

// Courses page functionality
function initializeCourses() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const courseCards = document.querySelectorAll('.course-card');
    const searchInput = document.querySelector('.search-input');

    // Filter functionality
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            filterCourseCards(filter, courseCards);
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchCourseCards(searchTerm, courseCards);
        });
    }

    // Enroll button functionality
    document.querySelectorAll('.btn-enroll').forEach(button => {
        button.addEventListener('click', function() {
            if (!isUserLoggedIn()) {
                openAuthModal();
                return;
            }
            
            handleEnroll(this);
        });
    });

    // Preview button functionality
    document.querySelectorAll('.btn-preview').forEach(button => {
        button.addEventListener('click', function() {
            handlePreview(this);
        });
    });
}

// Roadmap page functionality
function initializeRoadmap() {
    // Initialize search functionality
    const searchInput = document.getElementById('roadmapSearch');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const careerPaths = document.querySelectorAll('.path-card');
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchRoadmapPaths(searchTerm, careerPaths);
        });
    }
    
    // Filter functionality
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterRoadmapPaths(filter, careerPaths);
        });
    });
    
    console.log('Roadmap page initialized');
}

// Search roadmap paths
function searchRoadmapPaths(searchTerm, paths) {
    if (!searchTerm.trim()) {
        // Show all paths if search is empty
        paths.forEach(path => {
            path.style.display = 'block';
        });
        return;
    }
    
    paths.forEach(path => {
        const title = path.querySelector('h3').textContent.toLowerCase();
        const description = path.querySelector('p').textContent.toLowerCase();
        const keywords = path.getAttribute('data-keywords') || '';
        
        if (title.includes(searchTerm) || 
            description.includes(searchTerm) || 
            keywords.includes(searchTerm)) {
            path.style.display = 'block';
        } else {
            path.style.display = 'none';
        }
    });
}

// Filter roadmap paths
function filterRoadmapPaths(filter, paths) {
    paths.forEach(path => {
        const pathType = path.getAttribute('data-path');
        
        if (filter === 'all' || pathType === filter) {
            path.style.display = 'block';
        } else {
            path.style.display = 'none';
        }
    });
}

// Global search function for roadmap
function searchRoadmaps() {
    const searchInput = document.getElementById('roadmapSearch');
    const careerPaths = document.querySelectorAll('.path-card');
    
    if (searchInput) {
        const searchTerm = searchInput.value.toLowerCase();
        searchRoadmapPaths(searchTerm, careerPaths);
    }
}

// Top Alumni page functionality
function initializeTopAlumni() {
    // Add any top alumni-specific functionality here
    console.log('Top Alumni page initialized');
}

// Filter functions
function filterAlumniCards(filter, cards) {
    cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterInternshipCards(filter, cards) {
    cards.forEach(card => {
        const type = card.getAttribute('data-type');
        const location = card.getAttribute('data-location');
        
        if (filter === 'all' || 
            (filter === 'paid' && type === 'paid') ||
            (filter === 'remote' && location === 'remote') ||
            (filter === 'summer' && card.textContent.toLowerCase().includes('summer')) ||
            (filter === 'part-time' && card.textContent.toLowerCase().includes('part-time')) ||
            (filter === 'full-time' && card.textContent.toLowerCase().includes('full-time'))) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterCourseCards(filter, cards) {
    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const isFree = card.getAttribute('data-free') === 'true';
        
        if (filter === 'all' || 
            (filter === 'free' && isFree) ||
            category === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Search functions
function searchAlumniCards(searchTerm, cards) {
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchInternshipCards(searchTerm, cards) {
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchCourseCards(searchTerm, cards) {
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Action handlers
function handleConnect(button) {
    const alumniName = button.closest('.alumni-card').querySelector('.alumni-name').textContent;
    showNotification(`Connection request sent to ${alumniName}!`, 'success');
    button.textContent = 'Pending';
    button.disabled = true;
    button.style.background = '#ccc';
}

function handleMessage(button) {
    const alumniName = button.closest('.alumni-card').querySelector('.alumni-name').textContent;
    showNotification(`Opening message to ${alumniName}...`, 'info');
    // In a real app, this would open a messaging interface
}

function handleApply(button) {
    const internshipTitle = button.closest('.internship-card').querySelector('.internship-title').textContent;
    showNotification(`Application submitted for ${internshipTitle}!`, 'success');
    button.textContent = 'Applied';
    button.disabled = true;
    button.style.background = '#27ae60';
}

function handleSave(button) {
    const internshipTitle = button.closest('.internship-card').querySelector('.internship-title').textContent;
    showNotification(`Saved ${internshipTitle} to your favorites!`, 'success');
    button.textContent = 'Saved';
    button.style.background = '#f39c12';
}

function handleEnroll(button) {
    const courseTitle = button.closest('.course-card').querySelector('.course-title').textContent;
    showNotification(`Enrolled in ${courseTitle}!`, 'success');
    button.textContent = 'Enrolled';
    button.disabled = true;
    button.style.background = '#27ae60';
}

function handlePreview(button) {
    const courseTitle = button.closest('.course-card').querySelector('.course-title').textContent;
    showNotification(`Opening preview for ${courseTitle}...`, 'info');
    // In a real app, this would open a course preview
}

// Utility functions
function isUserLoggedIn() {
    // In a real app, this would check authentication status
    return false; // For demo purposes, always return false
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        case 'warning':
            notification.style.background = '#f39c12';
            break;
        default:
            notification.style.background = '#3498db';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const notificationCSS = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

// Add notification CSS to head
const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);