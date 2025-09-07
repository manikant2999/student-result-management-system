// script.js - Enhanced Modern SRMS
// --- Seed Data ---
const seed = () => {
    // Force clear and reseed data
    localStorage.removeItem('users');
    localStorage.removeItem('students');
    localStorage.removeItem('subjects');
    localStorage.removeItem('results');
    
    localStorage.setItem('users', JSON.stringify([
        { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User' },
        { id: 2, username: 'ajay', password: 'teacher123', role: 'teacher', subject: 'JAVA', name: 'Dr. Ajay Chakravathy' },
        { id: 3, username: 'pulkit', password: 'teacher123', role: 'teacher', subject: 'PHP', name: 'Mr. Pulkit Raj Saxena' },
        { id: 4, username: 'vartika', password: 'teacher123', role: 'teacher', subject: 'MY SQL', name: 'Ms. Vartika Gupta' },
        { id: 5, username: 'bhavna', password: 'teacher123', role: 'teacher', subject: 'Artificial Intelligence', name: 'Ms. Bhavna Sharma' },
        { id: 6, username: 'neha', password: 'teacher123', role: 'teacher', subject: 'Business Intelligence', name: 'Ms. Neha Singh' },
        { id: 7, username: 'suruchi', password: 'student123', role: 'student', studentId: 101, name: 'Suruchi Kumari' },
        { id: 8, username: 'neha', password: 'student123', role: 'student', studentId: 102, name: 'Neha Kumari' },
        { id: 9, username: 'sunita', password: 'student123', role: 'student', studentId: 103, name: 'Sunita Kumari' },
        { id: 10, username: 'arti', password: 'student123', role: 'student', studentId: 104, name: 'Arti Kumari' },
        { id: 11, username: 'sakshi', password: 'student123', role: 'student', studentId: 105, name: 'Sakshi Kumari' }
    ]));
    localStorage.setItem('teachers', JSON.stringify([
        { id: 1, name: 'Dr. Ajay Chakravathy', subject: 'JAVA', email: 'ajay@example.com', phone: '+91 9876543210' },
        { id: 2, name: 'Mr. Pulkit Raj Saxena', subject: 'PHP', email: 'pulkit@example.com', phone: '+91 8765432109' },
        { id: 3, name: 'Ms. Vartika Gupta', subject: 'MY SQL', email: 'vartika@example.com', phone: '+91 7654321098' },
        { id: 4, name: 'Ms. Bhavna Sharma', subject: 'Artificial Intelligence', email: 'bhavna@example.com', phone: '+91 6543210987' },
        { id: 5, name: 'Ms. Neha Singh', subject: 'Business Intelligence', email: 'neha@example.com', phone: '+91 5432109876' }
    ]));
    localStorage.setItem('students', JSON.stringify([
        { id: 101, name: 'Suruchi Kumari', roll: 'A01', class: 'BCA', section: 'A', email: 'suruchi@example.com', phone: '+91 8709601912' },
        { id: 102, name: 'Neha Kumari', roll: 'A02', class: 'BCA', section: 'A', email: 'neha@example.com', phone: '+91 9876543210' },
        { id: 103, name: 'Sunita Kumari', roll: 'A03', class: 'BCA', section: 'A', email: 'sunita@example.com', phone: '+91 8765432109' },
        { id: 104, name: 'Arti Kumari', roll: 'A04', class: 'BCA', section: 'B', email: 'arti@example.com', phone: '+91 7654321098' },
        { id: 105, name: 'Sakshi Kumari', roll: 'A05', class: 'BCA', section: 'B', email: 'sakshi@example.com', phone: '+91 6543210987' }
    ]));
    
    localStorage.setItem('subjects', JSON.stringify([
        { id: 1, name: 'JAVA', class: 'BCA', code: 'java101' },
        { id: 2, name: 'PHP', class: 'BCA', code: 'php101' },
        { id: 3, name: 'My SQL', class: 'BCA', code: 'mysql101' },
        { id: 4, name: 'Artificial Intelligence', class: 'BCA', code: 'ai101' },
        { id: 5, name: 'Business Intelligence', class: 'BCA', code: 'bi101' }
    ]));
    
    localStorage.setItem('results', JSON.stringify([
        { studentId: 101, exam: 'Term 1', marks: { 'JAVA': 88, 'PHP': 92, 'My SQL': 85, 'Artificial Intelligence': 78, 'Business Intelligence': 82 } },
        { studentId: 102, exam: 'Term 1', marks: { 'JAVA': 76, 'PHP': 81, 'My SQL': 79, 'Artificial Intelligence': 85, 'Business Intelligence': 77 } },
        { studentId: 103, exam: 'Term 1', marks: { 'JAVA': 94, 'PHP': 89, 'My SQL': 91, 'Artificial Intelligence': 88, 'Business Intelligence': 86 } },
        { studentId: 104, exam: 'Term 1', marks: { 'JAVA': 82, 'PHP': 87, 'My SQL': 83, 'Artificial Intelligence': 90, 'Business Intelligence': 85 } },
        { studentId: 101, exam: 'Mid Term', marks: { 'JAVA': 85, 'PHP': 88, 'My SQL': 82, 'Artificial Intelligence': 80, 'Business Intelligence': 84 } },
        { studentId: 102, exam: 'Mid Term', marks: { 'JAVA': 78, 'PHP': 83, 'My SQL': 81, 'Artificial Intelligence': 87, 'Business Intelligence': 79 } }
    ]));
    
    console.log('Data seeded successfully');
    console.log('Students:', getData('students'));
    console.log('Subjects:', getData('subjects'));
    console.log('Results:', getData('results'));
};

// --- Utility Functions ---
const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const getCurrentUser = () => JSON.parse(sessionStorage.getItem('currentUser'));
const setCurrentUser = (user) => sessionStorage.setItem('currentUser', JSON.stringify(user));
const logout = () => { 
    sessionStorage.removeItem('currentUser'); 
    hideUserMenu();
    renderLogin(); 
};

// --- Enhanced Notification System ---
function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${getNotificationIcon(type)} me-2"></i>
            <span>${message}</span>
            <button class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    container.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// --- Enhanced Confirmation Modal ---
function showConfirmModal(message, callback) {
    document.getElementById('confirm-message').textContent = message;
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    document.getElementById('confirm-action').onclick = () => {
        callback();
        modal.hide();
    };
    modal.show();
}

// --- GPA/Grade Calculation ---
function calculateGPA(marks) {
    let total = 0, count = 0;
    for (let sub in marks) {
        total += marks[sub];
        count++;
    }
    let avg = total / count;
    let grade = avg >= 90 ? 'A+' : avg >= 80 ? 'A' : avg >= 70 ? 'B' : avg >= 60 ? 'C' : avg >= 50 ? 'D' : 'F';
    return { gpa: (avg/10).toFixed(2), grade, percentage: avg.toFixed(1) };
}

// --- Enhanced Navigation ---
function setNav(role) {
    const nav = document.getElementById('nav-links');
    let html = '';
    if (role === 'admin') {
        html += '<li class="nav-item"><a class="nav-link" href="#dashboard"><i class="fas fa-tachometer-alt me-1"></i>Dashboard</a></li>';
        html += '<li class="nav-item"><a class="nav-link" href="#students"><i class="fas fa-user-graduate me-1"></i>Students</a></li>';
        html += '<li class="nav-item"><a class="nav-link" href="#subjects"><i class="fas fa-book me-1"></i>Subjects</a></li>';
    } else if (role === 'teacher') {
        html += '<li class="nav-item"><a class="nav-link" href="#dashboard"><i class="fas fa-tachometer-alt me-1"></i>Dashboard</a></li>';
        html += '<li class="nav-item"><a class="nav-link" href="#marks"><i class="fas fa-edit me-1"></i>Marks Entry</a></li>';
    } else if (role === 'student') {
        html += '<li class="nav-item"><a class="nav-link" href="#dashboard"><i class="fas fa-tachometer-alt me-1"></i>Dashboard</a></li>';
        html += '<li class="nav-item"><a class="nav-link" href="#results"><i class="fas fa-chart-line me-1"></i>My Results</a></li>';
    }
    html += '<li class="nav-item"><a class="nav-link" href="#analytics"><i class="fas fa-analytics me-1"></i>Analytics</a></li>';
    html += '<li class="nav-item"><a class="nav-link" href="#" id="logout-link"><i class="fas fa-sign-out-alt me-1"></i>Logout</a></li>';
    nav.innerHTML = html;
    
    // Set up event listeners
    document.getElementById('logout-link').onclick = (e) => {
        e.preventDefault();
        showConfirmModal('Are you sure you want to logout?', logout);
    };
    
    // Show user menu
    showUserMenu();
}

function showUserMenu() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('user-menu').style.display = 'flex';
        document.getElementById('current-user-name').textContent = user.name || user.username;
    }
}

function hideUserMenu() {
    document.getElementById('user-menu').style.display = 'none';
}

// --- Enhanced Render Functions ---
function renderLogin() {
    setNav(null);
    document.getElementById('main-content').innerHTML = `
    <div class="login-container">
        <div class="row justify-content-center w-100">
            <div class="col-md-6 col-lg-5">
                <div class="card login-card">
                    <div class="card-body">
                        <div class="text-center mb-4">
                            <i class="fas fa-graduation-cap fa-3x text-primary mb-3"></i>
                            <h2 class="fw-bold">Welcome to SRMS</h2>
                            <p class="text-muted">Student Result Management System</p>
                        </div>
                        <form id="login-form">
                            <div class="mb-3">
                                <label class="form-label">Username</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    <input type="text" class="form-control" id="login-username" required placeholder="Enter username">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                    <input type="password" class="form-control" id="login-password" required placeholder="Enter password">
                                    <button class="btn btn-outline-secondary" type="button" onclick="togglePassword()">
                                        <i class="fas fa-eye" id="password-toggle"></i>
                                    </button>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary w-100 mb-3">
                                <i class="fas fa-sign-in-alt me-2"></i>Login
                            </button>
                        </form>
                        <div class="text-center">
                            <small class="text-muted">Demo Credentials:</small><br>
                            <small>Admin: admin/admin123 | Teacher: ajay/teacher123 | Student: suruchi/student123</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    document.getElementById('login-form').onsubmit = login;
}

function togglePassword() {
    const passwordInput = document.getElementById('login-password');
    const toggleIcon = document.getElementById('password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fas fa-eye';
    }
}

function renderDashboard() {
    const user = getCurrentUser();
    console.log('Rendering dashboard for user:', user);
    
    setNav(user.role);
    let html = '<div class="row">';
    
    if (user.role === 'admin') {
        const students = getData('students');
        const results = getData('results');
        const subjects = getData('subjects');
        
        console.log('Admin dashboard data:', { students, results, subjects });
        html += `
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="card text-bg-primary h-100">
                <div class="card-body d-flex align-items-center">
                    <div class="flex-grow-1">
                        <h5 class="card-title"><i class="fas fa-user-graduate me-2"></i>Total Students</h5>
                        <p class="display-6 mb-0">${students.length}</p>
                    </div>
                    <div class="fs-1 opacity-50">
                        <i class="fas fa-users"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="card text-bg-success h-100">
                <div class="card-body d-flex align-items-center">
                    <div class="flex-grow-1">
                        <h5 class="card-title"><i class="fas fa-chart-line me-2"></i>Results Published</h5>
                        <p class="display-6 mb-0">${results.length}</p>
                    </div>
                    <div class="fs-1 opacity-50">
                        <i class="fas fa-clipboard-check"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="card text-bg-info h-100">
                <div class="card-body d-flex align-items-center">
                    <div class="flex-grow-1">
                        <h5 class="card-title"><i class="fas fa-book me-2"></i>Subjects</h5>
                        <p class="display-6 mb-0">${subjects.length}</p>
                    </div>
                    <div class="fs-1 opacity-50">
                        <i class="fas fa-books"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="card text-bg-warning h-100">
                <div class="card-body d-flex align-items-center">
                    <div class="flex-grow-1">
                        <h5 class="card-title"><i class="fas fa-award me-2"></i>Classes</h5>
                        <p class="display-6 mb-0">2</p>
                    </div>
                    <div class="fs-1 opacity-50">
                        <i class="fas fa-school"></i>
                    </div>
                </div>
            </div>
        </div>
        `;
    } else if (user.role === 'teacher') {
        const students = getData('students');
        const subjects = getData('subjects');
        html += `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card text-bg-primary h-100">
                <div class="card-body text-center">
                    <i class="fas fa-users fa-3x mb-3"></i>
                    <h5 class="card-title">Students</h5>
                    <p class="display-6">${students.length}</p>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card text-bg-success h-100">
                <div class="card-body text-center">
                    <i class="fas fa-book fa-3x mb-3"></i>
                    <h5 class="card-title">My Subject</h5>
                    <p class="lead">${user.subject}</p>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card text-bg-info h-100">
                <div class="card-body text-center">
                    <i class="fas fa-clipboard-list fa-3x mb-3"></i>
                    <h5 class="card-title">Total Subjects</h5>
                    <p class="display-6">${subjects.length}</p>
                </div>
            </div>
        </div>
        `;
    } else if (user.role === 'student') {
        const results = getData('results').filter(r => r.studentId === user.studentId);
        const student = getData('students').find(s => s.id === user.studentId);
        html += `
        <div class="col-12 mb-4">
            <div class="card text-bg-primary">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-8">
                            <h2 class="mb-2">Welcome back, ${student ? student.name : user.name}!</h2>
                            <p class="lead mb-0">Check your latest results and academic progress</p>
                        </div>
                        <div class="col-md-4 text-end">
                            <i class="fas fa-user-graduate fa-4x opacity-50"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6 mb-4">
            <div class="card text-bg-success h-100">
                <div class="card-body text-center">
                    <i class="fas fa-chart-line fa-3x mb-3"></i>
                    <h5 class="card-title">My Results</h5>
                    <p class="display-6">${results.length}</p>
                    <small>Published Exams</small>
                </div>
            </div>
        </div>
        <div class="col-md-6 mb-4">
            <div class="card text-bg-info h-100">
                <div class="card-body text-center">
                    <i class="fas fa-graduation-cap fa-3x mb-3"></i>
                    <h5 class="card-title">Class</h5>
                    <p class="display-6">${student ? student.class : 'N/A'}</p>
                    <small>Current Grade</small>
                </div>
            </div>
        </div>
        `;
    }
    html += '</div>';
    
    // Add quick actions section
    html += `
    <div class="row mt-4">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title"><i class="fas fa-bolt me-2"></i>Quick Actions</h5>
                    <div class="row">`;
    
    if (user.role === 'admin') {
        html += `
                        <div class="col-md-3 mb-2">
                            <button class="btn btn-outline-primary w-100" onclick="location.hash='#students'">
                                <i class="fas fa-plus me-2"></i>Add Student
                            </button>
                        </div>
                        <div class="col-md-3 mb-2">
                            <button class="btn btn-outline-success w-100" onclick="location.hash='#subjects'">
                                <i class="fas fa-book me-2"></i>Manage Subjects
                            </button>
                        </div>
                        <div class="col-md-3 mb-2">
                            <button class="btn btn-outline-info w-100" onclick="location.hash='#analytics'">
                                <i class="fas fa-chart-bar me-2"></i>View Analytics
                            </button>
                        </div>
                        <div class="col-md-3 mb-2">
                            <button class="btn btn-outline-warning w-100" onclick="exportData()">
                                <i class="fas fa-download me-2"></i>Export Data
                            </button>
                        </div>`;
    } else if (user.role === 'teacher') {
        html += `
                        <div class="col-md-4 mb-2">
                            <button class="btn btn-outline-primary w-100" onclick="location.hash='#marks'">
                                <i class="fas fa-edit me-2"></i>Enter Marks
                            </button>
                        </div>
                        <div class="col-md-4 mb-2">
                            <button class="btn btn-outline-success w-100" onclick="location.hash='#analytics'">
                                <i class="fas fa-chart-line me-2"></i>View Performance
                            </button>
                        </div>
                        <div class="col-md-4 mb-2">
                            <button class="btn btn-outline-info w-100" onclick="exportClassData()">
                                <i class="fas fa-file-excel me-2"></i>Export Results
                            </button>
                        </div>`;
    } else if (user.role === 'student') {
        html += `
                        <div class="col-md-4 mb-2">
                            <button class="btn btn-outline-primary w-100" onclick="location.hash='#results'">
                                <i class="fas fa-eye me-2"></i>View Results
                            </button>
                        </div>
                        <div class="col-md-4 mb-2">
                            <button class="btn btn-outline-success w-100" onclick="location.hash='#analytics'">
                                <i class="fas fa-chart-pie me-2"></i>My Analytics
                            </button>
                        </div>
                        <div class="col-md-4 mb-2">
                            <button class="btn btn-outline-info w-100" onclick="downloadAllReports()">
                                <i class="fas fa-download me-2"></i>Download Reports
                            </button>
                        </div>`;
    }
    
    html += `
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    
    console.log('Dashboard HTML generated:', html);
    document.getElementById('main-content').innerHTML = html;
    console.log('Dashboard rendered successfully');
}

// --- Student Management (Admin) ---
function renderStudents() {
    const students = getData('students');
    let html = `
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2><i class="fas fa-user-graduate me-2"></i>Student Management</h2>
        <button class="btn btn-success" onclick="showStudentModal()">
            <i class="fas fa-plus me-2"></i>Add Student
        </button>
    </div>`;
    
    html += `
    <div class="card mb-4">
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-md-6">
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-search"></i></span>
                        <input class="form-control" id="student-search" placeholder="Search by name or roll..." oninput="filterStudents()">
                    </div>
                </div>
                <div class="col-md-6">
                    <select class="form-select" id="class-filter" onchange="filterStudents()">
                        <option value="">All Classes</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                    </select>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Roll No.</th>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Section</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="students-tbody">`;
    
    for (let s of students) {
        html += `
        <tr>
            <td><span class="badge bg-primary">${s.roll}</span></td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="avatar-sm me-2">
                        <i class="fas fa-user-circle fa-2x text-muted"></i>
                    </div>
                    <div>
                        <div class="fw-semibold">${s.name}</div>
                        <small class="text-muted">ID: ${s.id}</small>
                    </div>
                </div>
            </td>
            <td>${s.class}</td>
            <td>${s.section}</td>
            <td>${s.email || 'N/A'}</td>
            <td>${s.phone || 'N/A'}</td>
            <td>
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-outline-primary" onclick="showStudentModal(${s.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-info" onclick="viewStudentDetails(${s.id})" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="confirmDeleteStudent(${s.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>`;
    }
    
    html += `
                    </tbody>
                </table>
            </div>
        </div>
    </div>`;
    html += studentModalHTML();
    document.getElementById('main-content').innerHTML = html;
}

function filterStudents() {
    const searchVal = document.getElementById('student-search').value.toLowerCase();
    const classFilter = document.getElementById('class-filter').value;
    const students = getData('students');
    let html = '';
    
    for (let s of students) {
        const matchesSearch = s.name.toLowerCase().includes(searchVal) || s.roll.toLowerCase().includes(searchVal);
        const matchesClass = !classFilter || s.class === classFilter;
        
        if (matchesSearch && matchesClass) {
            html += `
            <tr>
                <td><span class="badge bg-primary">${s.roll}</span></td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="avatar-sm me-2">
                            <i class="fas fa-user-circle fa-2x text-muted"></i>
                        </div>
                        <div>
                            <div class="fw-semibold">${s.name}</div>
                            <small class="text-muted">ID: ${s.id}</small>
                        </div>
                    </div>
                </td>
                <td>${s.class}</td>
                <td>${s.section}</td>
                <td>${s.email || 'N/A'}</td>
                <td>${s.phone || 'N/A'}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-outline-primary" onclick="showStudentModal(${s.id})" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-info" onclick="viewStudentDetails(${s.id})" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="confirmDeleteStudent(${s.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }
    }
    document.getElementById('students-tbody').innerHTML = html;
}

function studentModalHTML() {
    return `
    <div class="modal fade" id="studentModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <form id="student-form">
                    <div class="modal-header">
                        <h5 class="modal-title" id="studentModalLabel">
                            <i class="fas fa-user-graduate me-2"></i>Student Details
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" id="student-id">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Roll Number</label>
                                <input type="text" class="form-control" id="student-roll" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Full Name</label>
                                <input type="text" class="form-control" id="student-name" required>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Class</label>
                                <select class="form-select" id="student-class" required>
                                    <option value="">Select Class</option>
                                    <option value="10">Class 10</option>
                                    <option value="11">Class 11</option>
                                    <option value="12">Class 12</option>
                                </select>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Section</label>
                                <select class="form-select" id="student-section" required>
                                    <option value="">Select Section</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label class="form-label">Phone</label>
                                <input type="tel" class="form-control" id="student-phone">
                            </div>
                            <div class="col-md-12 mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" id="student-email">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save me-2"></i>Save Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>`;
}

function showStudentModal(id) {
    const modal = new bootstrap.Modal(document.getElementById('studentModal'));
    document.getElementById('studentModalLabel').innerHTML = id ? 
        '<i class="fas fa-edit me-2"></i>Edit Student' : 
        '<i class="fas fa-plus me-2"></i>Add New Student';
    
    if (id) {
        const s = getData('students').find(x => x.id === id);
        if (s) {
            document.getElementById('student-id').value = s.id;
            document.getElementById('student-roll').value = s.roll;
            document.getElementById('student-name').value = s.name;
            document.getElementById('student-class').value = s.class;
            document.getElementById('student-section').value = s.section;
            document.getElementById('student-email').value = s.email || '';
            document.getElementById('student-phone').value = s.phone || '';
        }
    } else {
        document.getElementById('student-form').reset();
        document.getElementById('student-id').value = '';
    }
    
    document.getElementById('student-form').onsubmit = saveStudent;
    modal.show();
}

function saveStudent(e) {
    e.preventDefault();
    
    // Get form values and trim whitespace
    const id = document.getElementById('student-id').value;
    const roll = document.getElementById('student-roll').value.trim();
    const name = document.getElementById('student-name').value.trim();
    const cls = document.getElementById('student-class').value.trim();
    const section = document.getElementById('student-section').value.trim();
    const email = document.getElementById('student-email').value.trim();
    const phone = document.getElementById('student-phone').value.trim();
    
    // Validate required fields
    if (!roll || !name || !cls || !section || !email || !phone) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    let students = getData('students');
    
    if (id) {
        students = students.map(s => s.id == id ? { 
            ...s, roll, name, class: cls, section, email, phone 
        } : s);
        showNotification('Student updated successfully!', 'success');
    } else {
        const newId = Math.max(0, ...students.map(s => s.id)) + 1;
        students.push({ 
            id: newId, roll, name, class: cls, section, email, phone 
        });
        showNotification('Student added successfully!', 'success');
    }
    
    setData('students', students);
    const modal = bootstrap.Modal.getInstance(document.getElementById('studentModal'));
    modal.hide();
    // Reset form after hiding modal
    setTimeout(() => {
        document.getElementById('student-form').reset();
        document.getElementById('student-id').value = '';
    }, 300);
    renderStudents();
}

function confirmDeleteStudent(id) {
    const student = getData('students').find(s => s.id === id);
    showConfirmModal(`Are you sure you want to delete ${student.name}?`, () => deleteStudent(id));
}

function deleteStudent(id) {
    let students = getData('students');
    students = students.filter(s => s.id !== id);
    setData('students', students);
    showNotification('Student deleted successfully!', 'success');
    renderStudents();
}

// --- Subject Management (Admin) ---
function renderSubjects() {
    const subjects = getData('subjects');
    let html = `
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2><i class="fas fa-book me-2"></i>Subject Management</h2>
        <button class="btn btn-success" onclick="showSubjectModal()">
            <i class="fas fa-plus me-2"></i>Add Subject
        </button>
    </div>`;
    
    html += `
    <div class="card">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Subject Code</th>
                            <th>Subject Name</th>
                            <th>Class</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>`;
    
    for (let s of subjects) {
        html += `
        <tr>
            <td><span class="badge bg-secondary">${s.code}</span></td>
            <td>
                <div class="d-flex align-items-center">
                    <i class="fas fa-book-open me-2 text-primary"></i>
                    <div>
                        <div class="fw-semibold">${s.name}</div>
                        <small class="text-muted">ID: ${s.id}</small>
                    </div>
                </div>
            </td>
            <td><span class="badge bg-info">Class ${s.class}</span></td>
            <td>
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-outline-primary" onclick="showSubjectModal(${s.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="confirmDeleteSubject(${s.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>`;
    }
    
    html += `
                    </tbody>
                </table>
            </div>
        </div>
    </div>`;
    html += subjectModalHTML();
    document.getElementById('main-content').innerHTML = html;
}

function subjectModalHTML() {
    return `
    <div class="modal fade" id="subjectModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id="subject-form">
                    <div class="modal-header">
                        <h5 class="modal-title" id="subjectModalLabel">
                            <i class="fas fa-book me-2"></i>Subject Details
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" id="subject-id">
                        <div class="mb-3">
                            <label class="form-label">Subject Code</label>
                            <input type="text" class="form-control" id="subject-code" required placeholder="e.g., MATH101">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Subject Name</label>
                            <input type="text" class="form-control" id="subject-name" required placeholder="e.g., Mathematics">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Class</label>
                            <select class="form-select" id="subject-class" required>
                                <option value="">Select Class</option>
                                <option value="10">Class 10</option>
                                <option value="11">Class 11</option>
                                <option value="12">Class 12</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save me-2"></i>Save Subject
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>`;
}

function showSubjectModal(id) {
    const modal = new bootstrap.Modal(document.getElementById('subjectModal'));
    document.getElementById('subjectModalLabel').innerHTML = id ? 
        '<i class="fas fa-edit me-2"></i>Edit Subject' : 
        '<i class="fas fa-plus me-2"></i>Add New Subject';
    
    if (id) {
        const s = getData('subjects').find(x => x.id === id);
        if (s) {
            document.getElementById('subject-id').value = s.id;
            document.getElementById('subject-code').value = s.code;
            document.getElementById('subject-name').value = s.name;
            document.getElementById('subject-class').value = s.class;
        }
    } else {
        document.getElementById('subject-form').reset();
        document.getElementById('subject-id').value = '';
    }
    
    document.getElementById('subject-form').onsubmit = saveSubject;
    modal.show();
}

function saveSubject(e) {
    e.preventDefault();
    
    // Get form values and trim whitespace
    const id = document.getElementById('subject-id').value;
    const code = document.getElementById('subject-code').value.trim();
    const name = document.getElementById('subject-name').value.trim();
    const cls = document.getElementById('subject-class').value.trim();
    
    // Validate required fields
    if (!code || !name || !cls) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    let subjects = getData('subjects');
    
    if (id) {
        subjects = subjects.map(s => s.id == id ? { 
            ...s, code, name, class: cls 
        } : s);
        showNotification('Subject updated successfully!', 'success');
    } else {
        const newId = Math.max(0, ...subjects.map(s => s.id)) + 1;
        subjects.push({ 
            id: newId, code, name, class: cls 
        });
        showNotification('Subject added successfully!', 'success');
    }
    
    setData('subjects', subjects);
    const modal = bootstrap.Modal.getInstance(document.getElementById('subjectModal'));
    modal.hide();
    // Reset form after hiding modal
    setTimeout(() => {
        document.getElementById('subject-form').reset();
        document.getElementById('subject-id').value = '';
    }, 300);
    renderSubjects();
}

function confirmDeleteSubject(id) {
    const subject = getData('subjects').find(s => s.id === id);
    showConfirmModal(`Are you sure you want to delete ${subject.name}?`, () => deleteSubject(id));
}

function deleteSubject(id) {
    let subjects = getData('subjects');
    subjects = subjects.filter(s => s.id !== id);
    setData('subjects', subjects);
    showNotification('Subject deleted successfully!', 'success');
    renderSubjects();
}

// --- Marks Entry (Teacher) ---
function renderMarksEntry() {
    const user = getCurrentUser();
    const students = getData('students');
    const subjects = getData('subjects').filter(s => s.name === user.subject);
    
    let html = `
    <div class="mb-4">
        <h2><i class="fas fa-edit me-2"></i>Marks Entry - ${user.subject}</h2>
        <p class="text-muted">Enter marks for students in your subject</p>
    </div>`;
    
    html += `
    <div class="card">
        <div class="card-body">
            <form id="marks-form">
                <div class="row mb-4">
                    <div class="col-md-4">
                        <label class="form-label">Exam/Test Name</label>
                        <input type="text" class="form-control" id="marks-exam" value="Term 1" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Maximum Marks</label>
                        <input type="number" class="form-control" id="max-marks" value="100" min="1" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Date</label>
                        <input type="date" class="form-control" id="exam-date" value="${new Date().toISOString().split('T')[0]}">
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Roll No.</th>
                                <th>Student Name</th>
                                <th>Class</th>
                                <th>Section</th>
                                <th>Marks Obtained</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>`;
    
    for (let s of students) {
        const currentMark = getStudentMark(s.id, user.subject);
        html += `
        <tr>
            <td><span class="badge bg-primary">${s.roll}</span></td>
            <td>
                <div class="d-flex align-items-center">
                    <i class="fas fa-user-circle fa-2x text-muted me-2"></i>
                    <div>
                        <div class="fw-semibold">${s.name}</div>
                        <small class="text-muted">ID: ${s.id}</small>
                    </div>
                </div>
            </td>
            <td>${s.class}</td>
            <td>${s.section}</td>
            <td>
                <input type="number" 
                       min="0" 
                       max="100" 
                       class="form-control marks-input" 
                       name="marks-${s.id}" 
                       value="${currentMark}" 
                       oninput="calculateGradeForRow(this, ${s.id})">
            </td>
            <td>
                <span class="badge" id="grade-${s.id}">
                    ${currentMark ? getGradeFromMarks(currentMark) : '-'}
                </span>
            </td>
        </tr>`;
    }
    
    html += `
                        </tbody>
                    </table>
                </div>
                
                <div class="d-flex justify-content-between mt-4">
                    <button type="button" class="btn btn-outline-secondary" onclick="clearAllMarks()">
                        <i class="fas fa-eraser me-2"></i>Clear All
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save me-2"></i>Save All Marks
                    </button>
                </div>
            </form>
        </div>
    </div>`;
    
    document.getElementById('main-content').innerHTML = html;
    document.getElementById('marks-form').onsubmit = saveMarks;
}

function getStudentMark(studentId, subject) {
    const results = getData('results');
    const res = results.find(r => r.studentId === studentId && r.exam === 'Term 1');
    return res && res.marks[subject] !== undefined ? res.marks[subject] : '';
}

function getGradeFromMarks(marks) {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 50) return 'D';
    return 'F';
}

function calculateGradeForRow(input, studentId) {
    const marks = parseInt(input.value);
    const gradeElement = document.getElementById(`grade-${studentId}`);
    
    if (isNaN(marks) || marks === '') {
        gradeElement.textContent = '-';
        gradeElement.className = 'badge bg-secondary';
    } else {
        const grade = getGradeFromMarks(marks);
        gradeElement.textContent = grade;
        gradeElement.className = `badge bg-${getGradeBadgeColor(grade)}`;
    }
}

function getGradeBadgeColor(grade) {
    switch(grade) {
        case 'A+': return 'success';
        case 'A': return 'primary';
        case 'B': return 'info';
        case 'C': return 'warning';
        case 'D': return 'secondary';
        case 'F': return 'danger';
        default: return 'secondary';
    }
}

function clearAllMarks() {
    showConfirmModal('Are you sure you want to clear all marks?', () => {
        document.querySelectorAll('.marks-input').forEach(input => {
            input.value = '';
            calculateGradeForRow(input, input.name.split('-')[1]);
        });
        showNotification('All marks cleared!', 'info');
    });
}

function saveMarks(e) {
    e.preventDefault();
    const user = getCurrentUser();
    const students = getData('students');
    const results = getData('results');
    const exam = document.getElementById('marks-exam').value.trim();
    
    // Validate exam name
    if (!exam) {
        showNotification('Please enter an exam name.', 'error');
        return;
    }
    
    let savedCount = 0;
    let invalidMarks = 0;
    
    for (let s of students) {
        const markInput = document.querySelector(`[name='marks-${s.id}']`);
        const mark = parseInt(markInput.value);
        
        if (!isNaN(mark)) {
            // Validate mark range
            if (mark < 0 || mark > 100) {
                invalidMarks++;
                continue;
            }
            
            let res = results.find(r => r.studentId === s.id && r.exam === exam);
            if (!res) {
                let marks = {};
                marks[user.subject] = mark;
                results.push({ studentId: s.id, exam, marks });
            } else {
                res.marks[user.subject] = mark;
            }
            savedCount++;
        }
    }
    
    if (invalidMarks > 0) {
        showNotification(`${invalidMarks} invalid marks (should be 0-100) were skipped.`, 'warning');
    }
    
    setData('results', results);
    showNotification(`Marks saved for ${savedCount} students!`, 'success');
    renderMarksEntry();
}

// --- Result View (Student) ---
function renderResults() {
    const user = getCurrentUser();
    console.log('Rendering results for user:', user);
    
    const results = getData('results').filter(r => r.studentId === user.studentId);
    const student = getData('students').find(s => s.id === user.studentId);
    
    console.log('Found results:', results);
    console.log('Found student:', student);
    
    let html = `
    <div class="mb-4" style="opacity: 1 !important; visibility: visible !important;">
        <h2><i class="fas fa-chart-line me-2"></i>My Results</h2>
        <p class="text-muted">View your academic performance and download reports</p>
    </div>`;
    
    if (results.length === 0) {
        html += `
        <div class="card" style="opacity: 1 !important; visibility: visible !important;">
            <div class="card-body text-center py-5">
                <i class="fas fa-inbox fa-4x text-muted mb-3"></i>
                <h4>No Results Published Yet</h4>
                <p class="text-muted">Your results will appear here once they are published by your teachers.</p>
            </div>
        </div>`;
    } else {
        for (let r of results) {
            const { gpa, grade, percentage } = calculateGPA(r.marks);
            html += `
            <div class="card mb-4" style="opacity: 1 !important; visibility: visible !important;">
                <div class="card-body">
                    <div class="row align-items-center mb-3">
                        <div class="col-md-8">
                            <h4 class="mb-1">
                                <i class="fas fa-file-alt me-2"></i>${r.exam}
                            </h4>
                            <p class="text-muted mb-0">Academic Performance Report</p>
                        </div>
                        <div class="col-md-4 text-end">
                            <button class="btn btn-outline-primary btn-sm me-2" onclick='downloadPDF(${JSON.stringify(r)})'>
                                <i class="fas fa-download me-1"></i>Download PDF
                            </button>
                            <span class="badge bg-${getGradeBadgeColor(grade)} fs-6">${grade}</span>
                        </div>
                    </div>
                    
                    <div class="row mb-4">
                        <div class="col-md-4">
                            <div class="text-center p-3 bg-light rounded">
                                <h5 class="mb-1">${percentage}%</h5>
                                <small class="text-muted">Overall Percentage</small>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="text-center p-3 bg-light rounded">
                                <h5 class="mb-1">${gpa}</h5>
                                <small class="text-muted">GPA</small>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="text-center p-3 bg-light rounded">
                                <h5 class="mb-1">${grade}</h5>
                                <small class="text-muted">Grade</small>
                            </div>
                        </div>
                    </div>
                    
                    <div class="table-responsive">
                        <table class="table table-borderless">
                            <thead class="table-light">
                                <tr>
                                    <th>Subject</th>
                                    <th>Marks Obtained</th>
                                    <th>Grade</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>`;
            
            for (let sub in r.marks) {
                const subjectGrade = getGradeFromMarks(r.marks[sub]);
                const status = r.marks[sub] >= 50 ? 'Pass' : 'Fail';
                html += `
                <tr>
                    <td>
                        <i class="fas fa-book-open me-2 text-primary"></i>
                        ${sub}
                    </td>
                    <td><strong>${r.marks[sub]}/100</strong></td>
                    <td><span class="badge bg-${getGradeBadgeColor(subjectGrade)}">${subjectGrade}</span></td>
                    <td><span class="badge bg-${status === 'Pass' ? 'success' : 'danger'}">${status}</span></td>
                </tr>`;
            }
            
            html += `
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`;
        }
    }
    
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = html;
    
    // Force immediate visibility
    mainContent.style.opacity = '1';
    mainContent.style.visibility = 'visible';
    mainContent.style.display = 'block';
    
    // Force visibility for all children
    const allElements = mainContent.querySelectorAll('*');
    allElements.forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
        el.style.animation = 'none';
    });
    
    console.log('Results rendered and forced visible');
}

// --- PDF Generation ---
function downloadPDF(result) {
    // Check if jsPDF is loaded
    if (typeof window.jspdf === 'undefined') {
        showNotification('PDF export library not loaded. Please refresh the page and try again.', 'error');
        return;
    }
    
    const user = getCurrentUser();
    const students = getData('students');
    const student = students.find(s => s.id === user.studentId);
    
    if (!student) {
        showNotification('Student data not found.', 'error');
        return;
    }
    
    const { gpa, grade, percentage } = calculateGPA(result.marks);

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('Student Marksheet', 105, 20, { align: 'center' });
    
    // School/Institution name
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('Student Result Management System', 105, 30, { align: 'center' });
    
    // Student Details
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Student Information:', 20, 50);
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.text(`Name: ${student.name}`, 20, 60);
    doc.text(`Roll Number: ${student.roll}`, 20, 70);
    doc.text(`Class: ${student.class}`, 20, 80);
    doc.text(`Section: ${student.section}`, 120, 80);
    doc.text(`Exam: ${result.exam}`, 20, 90);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 120, 90);
    
    // Marks Table
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Subject-wise Marks:', 20, 110);
    
    let y = 125;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Subject', 20, y);
    doc.text('Marks Obtained', 80, y);
    doc.text('Grade', 130, y);
    doc.text('Status', 160, y);
    
    y += 5;
    doc.line(20, y, 190, y); // Horizontal line
    y += 10;
    
    doc.setFont(undefined, 'normal');
    for (let sub in result.marks) {
        const subjectGrade = getGradeFromMarks(result.marks[sub]);
        const status = result.marks[sub] >= 50 ? 'Pass' : 'Fail';
        
        doc.text(sub, 20, y);
        doc.text(`${result.marks[sub]}/100`, 80, y);
        doc.text(subjectGrade, 130, y);
        doc.text(status, 160, y);
        y += 10;
    }
    
    // Summary
    y += 10;
    doc.line(20, y, 190, y);
    y += 15;
    
    doc.setFont(undefined, 'bold');
    doc.text('Summary:', 20, y);
    y += 10;
    
    doc.setFont(undefined, 'normal');
    doc.text(`Overall Percentage: ${percentage}%`, 20, y);
    doc.text(`GPA: ${gpa}`, 20, y + 10);
    doc.text(`Grade: ${grade}`, 20, y + 20);
    
    // Footer
    doc.setFontSize(8);
    doc.text('This is a computer-generated document and does not require a signature.', 105, 280, { align: 'center' });
    
    doc.save(`${student.name}_${result.exam}_Marksheet.pdf`);
    showNotification('Marksheet downloaded successfully!', 'success');
}

// --- Enhanced Analytics ---
function renderAnalytics() {
    console.log('Rendering analytics...');
    
    const students = getData('students');
    const results = getData('results');
    const subjects = getData('subjects');
    const user = getCurrentUser();
    
    console.log('Analytics data:', { students: students.length, results: results.length, subjects: subjects.length });
    
    let html = `
    <div class="mb-4" style="opacity: 1 !important; visibility: visible !important;">
        <h2><i class="fas fa-chart-bar me-2"></i>Analytics Dashboard</h2>
        <p class="text-muted">Comprehensive academic performance analysis</p>
    </div>`;
    
    // Statistics Cards
    html += `
    <div class="row mb-4" style="opacity: 1 !important; visibility: visible !important;">
        <div class="col-lg-3 col-md-6 mb-3">
            <div class="card text-bg-primary" style="opacity: 1 !important; visibility: visible !important;">
                <div class="card-body text-center">
                    <i class="fas fa-users fa-2x mb-2"></i>
                    <h5>Total Students</h5>
                    <h3>${students.length}</h3>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 mb-3">
            <div class="card text-bg-success" style="opacity: 1 !important; visibility: visible !important;">
                <div class="card-body text-center">
                    <i class="fas fa-chart-line fa-2x mb-2"></i>
                    <h5>Results Published</h5>
                    <h3>${results.length}</h3>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 mb-3">
            <div class="card text-bg-info" style="opacity: 1 !important; visibility: visible !important;">
                <div class="card-body text-center">
                    <i class="fas fa-book fa-2x mb-2"></i>
                    <h5>Active Subjects</h5>
                    <h3>${subjects.length}</h3>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 mb-3">
            <div class="card text-bg-warning" style="opacity: 1 !important; visibility: visible !important;">
                <div class="card-body text-center">
                    <i class="fas fa-percentage fa-2x mb-2"></i>
                    <h5>Average Score</h5>
                    <h3>${calculateOverallAverage().toFixed(1)}%</h3>
                </div>
            </div>
        </div>
    </div>`;
    
    // Charts Section
    html += `
    <div class="row" style="opacity: 1 !important; visibility: visible !important;">
        <div class="col-lg-8 mb-4">
            <div class="card" style="opacity: 1 !important; visibility: visible !important;">
                <div class="card-body">
                    <h5 class="card-title">
                        <i class="fas fa-chart-bar me-2"></i>Student Performance Overview
                    </h5>
                    <div style="position: relative; height: 400px; width: 100%;">
                        <canvas id="performanceChart" style="display: block; box-sizing: border-box; height: 400px; width: 100%;"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 mb-4">
            <div class="card" style="opacity: 1 !important; visibility: visible !important;">
                <div class="card-body">
                    <h5 class="card-title">
                        <i class="fas fa-chart-pie me-2"></i>Grade Distribution
                    </h5>
                    <div style="position: relative; height: 300px; width: 100%;">
                        <canvas id="gradeChart" style="display: block; box-sizing: border-box; height: 300px; width: 100%;"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    
    // Rankings and Subject Performance
    html += `
    <div class="row" style="opacity: 1 !important; visibility: visible !important;">
        <div class="col-lg-6 mb-4">
            <div class="card" style="opacity: 1 !important; visibility: visible !important;">
                <div class="card-body">
                    <h5 class="card-title">
                        <i class="fas fa-trophy me-2"></i>Top Performers
                    </h5>
                    <div id="top-performers"></div>
                </div>
            </div>
        </div>
        <div class="col-lg-6 mb-4">
            <div class="card" style="opacity: 1 !important; visibility: visible !important;">
                <div class="card-body">
                    <h5 class="card-title">
                        <i class="fas fa-chart-line me-2"></i>Subject-wise Performance
                    </h5>
                    <div id="subject-performance"></div>
                </div>
            </div>
        </div>
    </div>`;
    
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = html;
    
    // Force immediate visibility
    mainContent.style.opacity = '1';
    mainContent.style.visibility = 'visible';
    mainContent.style.display = 'block';
    
    // Force visibility for all children
    const allElements = mainContent.querySelectorAll('*');
    allElements.forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
        el.style.animation = 'none';
    });
    
    console.log('Analytics content rendered and forced visible');
    
    // Initialize charts and data with Chart.js validation
    waitForChartJS(() => {
        setTimeout(() => {
            console.log('Initializing analytics charts and data...');
            generateCharts();
            generateTopPerformers();
            generateSubjectPerformance();
            console.log('Analytics charts and data generation initiated');
        }, 300);
    });
}

// Chart.js validation and fallback
function waitForChartJS(callback, maxAttempts = 50) {
    let attempts = 0;
    
    function checkChart() {
        attempts++;
        
        if (typeof Chart !== 'undefined') {
            console.log('Chart.js loaded successfully');
            callback();
            return;
        }
        
        if (attempts >= maxAttempts) {
            console.error('Chart.js failed to load after', maxAttempts, 'attempts');
            showNotification('Chart library failed to load. Please refresh the page.', 'error');
            return;
        }
        
        setTimeout(checkChart, 100);
    }
    
    checkChart();
}

function calculateOverallAverage() {
    const results = getData('results');
    if (results.length === 0) return 0;
    
    let totalMarks = 0;
    let totalSubjects = 0;
    
    results.forEach(result => {
        Object.values(result.marks).forEach(mark => {
            totalMarks += mark;
            totalSubjects++;
        });
    });
    
    return totalSubjects > 0 ? totalMarks / totalSubjects : 0;
}

function generateCharts() {
    console.log('Starting chart generation...');
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js library not loaded');
        showNotification('Chart library not loaded. Please refresh the page.', 'error');
        return;
    }
    
    console.log('Chart.js library loaded successfully');
    
    // Wait a bit for DOM to be ready
    setTimeout(() => {
        // Check if canvas elements exist
        const performanceCanvas = document.getElementById('performanceChart');
        const gradeCanvas = document.getElementById('gradeChart');
        
        if (!performanceCanvas || !gradeCanvas) {
            console.error('Chart canvas elements not found:', {
                performanceCanvas: !!performanceCanvas,
                gradeCanvas: !!gradeCanvas
            });
            return;
        }
        
        console.log('Canvas elements found, creating charts...');
        
        // Destroy existing charts if they exist
        if (window.performanceChartInstance) {
            window.performanceChartInstance.destroy();
        }
        if (window.gradeChartInstance) {
            window.gradeChartInstance.destroy();
        }
        
        // Performance Chart
        const students = getData('students');
        const results = getData('results');
        
        console.log('Chart data:', { students: students.length, results: results.length });
        
        let studentPerformance = students.map(student => {
            const studentResults = results.filter(r => r.studentId === student.id);
            let totalMarks = 0;
            let subjectCount = 0;
            
            studentResults.forEach(result => {
                Object.values(result.marks).forEach(mark => {
                    totalMarks += mark;
                    subjectCount++;
                });
            });
            
            return {
                name: student.name,
                average: subjectCount > 0 ? totalMarks / subjectCount : 0
            };
        });
        
        console.log('Student performance data:', studentPerformance);
        
        // Create Performance Chart
        try {
            const ctx1 = performanceCanvas.getContext('2d');
            window.performanceChartInstance = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: studentPerformance.map(x => x.name),
                    datasets: [{
                        label: 'Average Marks',
                        data: studentPerformance.map(x => x.average),
                        backgroundColor: 'rgba(99, 102, 241, 0.8)',
                        borderColor: 'rgba(99, 102, 241, 1)',
                        borderWidth: 1,
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            title: {
                                display: true,
                                text: 'Average Marks'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            title: {
                                display: true,
                                text: 'Students'
                            }
                        }
                    }
                }
            });
            console.log('Performance chart created successfully');
        } catch (error) {
            console.error('Error creating performance chart:', error);
        }
        
        // Grade Distribution Chart
        try {
            const gradeDistribution = calculateGradeDistribution();
            console.log('Grade distribution data:', gradeDistribution);
            
            const ctx2 = gradeCanvas.getContext('2d');
            window.gradeChartInstance = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(gradeDistribution),
                    datasets: [{
                        data: Object.values(gradeDistribution),
                        backgroundColor: [
                            '#10b981', '#6366f1', '#06b6d4', 
                            '#f59e0b', '#6b7280', '#ef4444'
                        ],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        }
                    }
                }
            });
            console.log('Grade distribution chart created successfully');
        } catch (error) {
            console.error('Error creating grade distribution chart:', error);
        }
        
        console.log('Charts created successfully');
        
    }, 200); // Wait 200ms for DOM to be ready
}

function calculateGradeDistribution() {
    const results = getData('results');
    const distribution = { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
    
    results.forEach(result => {
        Object.values(result.marks).forEach(mark => {
            const grade = getGradeFromMarks(mark);
            distribution[grade]++;
        });
    });
    
    return distribution;
}

function generateTopPerformers() {
    const students = getData('students');
    const results = getData('results');
    
    let performers = students.map(student => {
        const studentResults = results.filter(r => r.studentId === student.id);
        let totalMarks = 0;
        let subjectCount = 0;
        
        studentResults.forEach(result => {
            Object.values(result.marks).forEach(mark => {
                totalMarks += mark;
                subjectCount++;
            });
        });
        
        return {
            ...student,
            average: subjectCount > 0 ? totalMarks / subjectCount : 0
        };
    }).sort((a, b) => b.average - a.average).slice(0, 5);
    
    let html = '';
    performers.forEach((performer, index) => {
        const badgeClass = index === 0 ? 'bg-warning' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-danger' : 'bg-primary';
        const icon = index === 0 ? 'fas fa-crown' : index === 1 ? 'fas fa-medal' : index === 2 ? 'fas fa-award' : 'fas fa-star';
        
        html += `
        <div class="d-flex align-items-center justify-content-between mb-3 p-3 bg-light rounded">
            <div class="d-flex align-items-center">
                <span class="badge ${badgeClass} me-3">
                    <i class="${icon}"></i> ${index + 1}
                </span>
                <div>
                    <div class="fw-semibold">${performer.name}</div>
                    <small class="text-muted">${performer.roll} - Class ${performer.class}</small>
                </div>
            </div>
            <div class="text-end">
                <div class="fw-bold">${performer.average.toFixed(1)}%</div>
                <small class="text-muted">${getGradeFromMarks(performer.average)}</small>
            </div>
        </div>`;
    });
    
    document.getElementById('top-performers').innerHTML = html;
}

function generateSubjectPerformance() {
    const subjects = getData('subjects');
    const results = getData('results');
    
    let html = '';
    subjects.forEach(subject => {
        let totalMarks = 0;
        let count = 0;
        
        results.forEach(result => {
            if (result.marks[subject.name] !== undefined) {
                totalMarks += result.marks[subject.name];
                count++;
            }
        });
        
        const average = count > 0 ? totalMarks / count : 0;
        const percentage = average;
        
        html += `
        <div class="mb-3">
            <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="fw-semibold">${subject.name}</span>
                <span class="badge bg-${getGradeBadgeColor(getGradeFromMarks(average))}">${average.toFixed(1)}%</span>
            </div>
            <div class="progress">
                <div class="progress-bar bg-primary" style="width: ${percentage}%"></div>
            </div>
        </div>`;
    });
    
    document.getElementById('subject-performance').innerHTML = html;
}

// --- Additional Utility Functions ---
function exportData() {
    const data = {
        students: getData('students'),
        subjects: getData('subjects'),
        results: getData('results'),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SRMS_Data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully!', 'success');
}

function exportClassData() {
    const results = getData('results');
    const students = getData('students');
    
    let csvContent = 'Student Name,Roll No,Class,Section,Exam,Subject,Marks,Grade\n';
    
    results.forEach(result => {
        const student = students.find(s => s.id === result.studentId);
        if (student) {
            Object.entries(result.marks).forEach(([subject, marks]) => {
                const grade = getGradeFromMarks(marks);
                csvContent += `${student.name},${student.roll},${student.class},${student.section},${result.exam},${subject},${marks},${grade}\n`;
            });
        }
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Class_Results_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Class data exported successfully!', 'success');
}

function downloadAllReports() {
    const user = getCurrentUser();
    const results = getData('results').filter(r => r.studentId === user.studentId);
    
    if (results.length === 0) {

        showNotification('No results found to download!', 'warning');
        return;
    }
    
    results.forEach(result => {
        setTimeout(() => downloadPDF(result), 500);
    });
    
    showNotification(`Downloading ${results.length} report(s)...`, 'info');
}

// --- Routing ---
window.onhashchange = () => {
    route();
    // Force content visibility after hash change
    setTimeout(forceContentVisibility, 50);
    setTimeout(forceContentVisibility, 200);
};
function route() {
    const user = getCurrentUser();
    
    // If no user is logged in, always show login page
    if (!user) {
        hideUserMenu();
        return renderLogin();
    }
    
    // Show user menu for logged-in users
    showUserMenu();
    
    switch (location.hash) {
        case '#dashboard': renderDashboard(); break;
        case '#students': if (user.role === 'admin') renderStudents(); else renderDashboard(); break;
        case '#subjects': if (user.role === 'admin') renderSubjects(); else renderDashboard(); break;
        case '#marks': if (user.role === 'teacher') renderMarksEntry(); else renderDashboard(); break;
        case '#results': if (user.role === 'student') renderResults(); else renderDashboard(); break;
        case '#analytics': renderAnalytics(); break;
        default: renderDashboard();
    }
    
    // Force content visibility after routing
    setTimeout(forceContentVisibility, 50);
    setTimeout(forceContentVisibility, 200);
}

// --- Login ---
function login(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const users = getData('users');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        showNotification('Invalid credentials! Please try again.', 'error');
        return;
    }
    
    setCurrentUser(user);
    showNotification(`Welcome ${user.name || user.username}!`, 'success');
    location.hash = '#dashboard';
    route();
}

// --- Dark/Light Mode ---
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    
    const icon = document.querySelector('#theme-toggle i');
    if (isDark) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Force visibility function
function forceContentVisibility() {
    // Force visibility of main content
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.style.opacity = '1';
        mainContent.style.visibility = 'visible';
        mainContent.style.display = 'block';
        
        // Force visibility for all children
        const allElements = mainContent.querySelectorAll('*');
        allElements.forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
            el.style.transform = 'none';
            el.style.animation = 'none';
            el.style.animationDuration = '0.01ms';
            el.style.transitionDuration = '0.01ms';
        });
    }
    
    // Force visibility of all cards, rows, and columns
    const elements = document.querySelectorAll('.card, .row, .col-lg-3, .col-md-6, .col-lg-8, .col-lg-4, .col-lg-6, .mb-4');
    elements.forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
        el.style.animation = 'none';
        el.style.animationDuration = '0.01ms';
        el.style.transitionDuration = '0.01ms';
    });
    
    console.log('Content visibility forced');
}

// --- On Load ---
window.onload = () => {
    seed();
    
    // Initialize dark mode
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const themeToggle = document.querySelector('#theme-toggle i');
        if (themeToggle) themeToggle.className = 'fas fa-sun';
    }
    
    // Clear any existing hash to force proper routing
    if (!getCurrentUser()) {
        location.hash = '';
    }
    
    route();
    
    // Force content visibility immediately and after short delay
    forceContentVisibility();
    setTimeout(forceContentVisibility, 100);
    setTimeout(forceContentVisibility, 500);
    
    // Add modal reset functionality
    setupModalResets();
};

// Add modal reset functionality
function setupModalResets() {
    // Reset student modal form when hidden
    const studentModal = document.getElementById('studentModal');
    if (studentModal) {
        studentModal.addEventListener('hidden.bs.modal', function () {
            document.getElementById('student-form').reset();
            document.getElementById('student-id').value = '';
        });
    }
    
    // Reset subject modal form when hidden
    const subjectModal = document.getElementById('subjectModal');
    if (subjectModal) {
        subjectModal.addEventListener('hidden.bs.modal', function () {
            document.getElementById('subject-form').reset();
            document.getElementById('subject-id').value = '';
        });
    }
}
