/* ==========================================================================
   FACE TRACK — FRONTEND CONTROLLER (TENSORFLOW.JS HUD ENGINE)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // ─── DOM SELECTORS ──────────────────────────────────────────────────────────
  
  // Navigation Tabs & Wrappers
  const authGateScreen = document.getElementById('auth-gate-screen');
  const appWorkspace = document.getElementById('app-workspace');
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const viewTitle = document.getElementById('current-view-title');
  const viewSubtitle = document.getElementById('current-view-subtitle');
  
  // Sidebar Tabs by Role
  const navBtnDashboard = document.getElementById('nav-btn-dashboard');
  const navBtnAttendance = document.getElementById('nav-btn-attendance');
  const navBtnRegister = document.getElementById('nav-btn-register');
  const navBtnReports = document.getElementById('nav-btn-reports');
  const navBtnStudentHub = document.getElementById('nav-btn-student-hub');
  const navBtnConfig = document.getElementById('nav-btn-config');
  
  // Status Badges
  const tfStatusLed = document.getElementById('tf-status-led');
  const tfStatusText = document.getElementById('tf-status-text');
  const apiStatusLed = document.getElementById('api-status-led');
  const apiStatusText = document.getElementById('api-status-text');
  
  // Profile Bar
  const userEmailDisplay = document.getElementById('user-email');
  const logoutBtn = document.getElementById('logout-btn');
  
  // ==========================================================================
  // AUTH GATE SCREEN DOM SELECTORS
  // ==========================================================================
  const authSwitchLogin = document.getElementById('auth-switch-login');
  const authSwitchSignup = document.getElementById('auth-switch-signup');
  const authLoginForm = document.getElementById('auth-login-form');
  const authSignupForm = document.getElementById('auth-signup-form');
  
  // Login Form
  const loginRole = document.getElementById('login-role');
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');
  
  // Signup Form
  const signupRole = document.getElementById('signup-role');
  const signupName = document.getElementById('signup-name');
  const signupEmail = document.getElementById('signup-email');
  const signupPassword = document.getElementById('signup-password');
  const signupStudentFields = document.getElementById('signup-student-fields');
  const signupRoll = document.getElementById('signup-roll');
  const signupClass = document.getElementById('signup-class');
  
  // Signup Biometrics Camera
  const signupVideo = document.getElementById('signup-video');
  const signupOverlay = document.getElementById('signup-overlay');
  const signupCameraMessage = document.getElementById('signup-camera-message');
  const signupCameraLaser = document.getElementById('signup-camera-laser');
  const signupHudReticle = document.getElementById('signup-hud-reticle');
  const signupAlignmentStatus = document.getElementById('signup-alignment-status');
  const signupStartCamBtn = document.getElementById('signup-start-cam-btn');
  const signupSubmitBtn = document.getElementById('signup-submit-btn');

  // ==========================================================================
  // TEACHER DASHBOARD DOM SELECTORS
  // ==========================================================================
  const statTotalStudents = document.getElementById('stat-total-students');
  const statMarkedToday = document.getElementById('stat-marked-today');
  const statActiveSession = document.getElementById('stat-active-session');
  const statSessionDetails = document.getElementById('stat-session-details');
  const dashSelectClass = document.getElementById('dash-select-class');
  const dashSelectSubject = document.getElementById('dash-select-subject');
  const dashStartSessionBtn = document.getElementById('dash-start-session-btn');
  const dashEndSessionBtn = document.getElementById('dash-end-session-btn');
  const recentScansTimeline = document.getElementById('recent-scans-timeline');
  
  // ==========================================================================
  // TEACHER ATTENDANCE SCANNER DOM SELECTORS
  // ==========================================================================
  const webcamVideo = document.getElementById('webcam-video');
  const webcamOverlay = document.getElementById('webcam-overlay');
  const cameraMessage = document.getElementById('camera-message');
  const cameraLaser = document.getElementById('camera-laser');
  const cameraFpsCounter = document.getElementById('camera-fps-counter');
  const hudReticle = document.getElementById('hud-reticle');
  const toggleAutodetect = document.getElementById('toggle-autodetect');
  const toggleLandmarks = document.getElementById('toggle-landmarks');
  const manualSnapBtn = document.getElementById('manual-snap-btn');
  
  const scanInfoClassroom = document.getElementById('scan-info-classroom');
  const scanInfoSubject = document.getElementById('scan-info-subject');
  const scanResultPanel = document.getElementById('scan-result-panel');
  const scanCountExpected = document.getElementById('scan-count-expected');
  const scanCountPresent = document.getElementById('scan-count-present');
  const scanCountId = document.getElementById('scan-count-id');
  
  // ==========================================================================
  // TEACHER REGISTER STUDENT DOM SELECTORS
  // ==========================================================================
  const studentRegForm = document.getElementById('student-reg-form');
  const regName = document.getElementById('reg-name');
  const regRoll = document.getElementById('reg-roll');
  const regEmail = document.getElementById('reg-email');
  const regSelectClass = document.getElementById('reg-select-class');
  const regVideo = document.getElementById('reg-video');
  const regOverlay = document.getElementById('reg-overlay');
  const regCameraMessage = document.getElementById('reg-camera-message');
  const regCameraLaser = document.getElementById('reg-camera-laser');
  const regHudReticle = document.getElementById('reg-hud-reticle');
  const regAlignmentStatus = document.getElementById('reg-alignment-status');
  const regStartCamBtn = document.getElementById('reg-start-cam-btn');
  const regSubmitBtn = document.getElementById('reg-submit-btn');
  
  // ==========================================================================
  // TEACHER REPORTS DOM SELECTORS
  // ==========================================================================
  const reportSelectClass = document.getElementById('report-select-class');
  const reportSelectSession = document.getElementById('report-select-session');
  const reportLoadBtn = document.getElementById('report-load-btn');
  const reportExportCsv = document.getElementById('report-export-csv');
  const reportEmptyState = document.getElementById('report-empty-state');
  const reportAttendanceTable = document.getElementById('report-attendance-table');
  const reportTableBody = document.getElementById('report-table-body');
  const reportSheetTitle = document.getElementById('report-sheet-title');
  
  // ==========================================================================
  // STUDENT PORTAL HUB DOM SELECTORS
  // ==========================================================================
  const studentStatRatio = document.getElementById('student-stat-ratio');
  const studentStatRatioLabel = document.getElementById('student-stat-ratio-label');
  const studentStatPresent = document.getElementById('student-stat-present');
  const studentStatAbsent = document.getElementById('student-stat-absent');
  const studentStatClass = document.getElementById('student-stat-class');
  
  const studentWebcamVideo = document.getElementById('student-webcam-video');
  const studentWebcamOverlay = document.getElementById('student-webcam-overlay');
  const studentCameraMessage = document.getElementById('student-camera-message');
  const studentCameraLaser = document.getElementById('student-camera-laser');
  const studentFpsCounter = document.getElementById('student-fps-counter');
  const studentHudReticle = document.getElementById('student-hud-reticle');
  const studentStartCamBtn = document.getElementById('student-start-cam-btn');
  const studentSnapBtn = document.getElementById('student-snap-btn');
  
  const studentLeaveBtn = document.getElementById('student-leave-btn');
  const studentHistoryTimeline = document.getElementById('student-history-timeline');

  // ==========================================================================
  // CORE PARAMETERS & SHARINGS DOM SELECTORS
  // ==========================================================================
  const cfgApiUrl = document.getElementById('cfg-api-url');
  const cfgSaveUrlBtn = document.getElementById('cfg-save-url-btn');
  const cfgAdminEmail = document.getElementById('cfg-admin-email');
  const cfgAdminPass = document.getElementById('cfg-admin-pass');
  const cfgLoginBtn = document.getElementById('cfg-login-btn');
  const authLoggedInState = document.getElementById('auth-logged-in-state');
  const authLoggedOutState = document.getElementById('auth-logged-out-state');
  const authTokenExpiry = document.getElementById('auth-token-expiry');
  const cfgSeedBtn = document.getElementById('cfg-seed-btn');
  const cfgWebglStatus = document.getElementById('cfg-webgl-status');
  
  const appToast = document.getElementById('app-toast');
  const toastIcon = document.getElementById('toast-icon');
  const toastMessage = document.getElementById('toast-message');

  // ─── SYSTEM STATE VARIABLES ──────────────────────────────────────────
  
  let API_BASE_URL = localStorage.getItem('face_track_api_url') || 'http://localhost:8000';
  let JWT_TOKEN = localStorage.getItem('face_track_jwt_token') || null;
  let USER_ROLE = localStorage.getItem('face_track_user_role') || null;
  
  let blazefaceModel = null;
  let isTfLoaded = false;
  
  let activeTab = 'dashboard';
  let currentSession = null;
  
  // Camera Streams & Loops
  let attendanceStream = null;
  let registrationStream = null;
  let signupStream = null;
  let studentStream = null;
  
  let attendanceLoopId = null;
  let registrationLoopId = null;
  let signupLoopId = null;
  let studentLoopId = null;
  
  // Tracking Smoothing Helpers
  let lastFrameTime = performance.now();
  let fpsHistory = [];
  let stableFaceDuration = 0;
  let isUploadingFace = false;
  let lastMarkedFaceId = null;
  let faceLeavesCooldown = 0;

  // Initialize display
  cfgApiUrl.value = API_BASE_URL;

  // ─── INITIALIZATION FLOW ───────────────────────────────────────────
  
  async function init() {
    // 1. Setup switch forms gates
    setupAuthGateListeners();

    // 2. Setup sidebar routing tabs click listeners
    setupTabNavigation();
    
    // 3. Connect API connectivity LED
    await checkApiConnection();
    
    // 4. Load TensorFlow.js Model CDN
    await loadBlazefaceModel();
    
    // 5. Query active session token redirectors
    if (JWT_TOKEN) {
      const isValid = await verifyAuthToken();
      if (isValid) {
        routeToWorkspace();
      } else {
        clearAuth();
        showAuthScreen();
      }
    } else {
      showAuthScreen();
    }
    
    // 6. Config section overrides bind
    setupConfigListeners();
  }

  // ─── AUTH SCREEN SYSTEM ROUTINGS ─────────────────────────────

  function showAuthScreen() {
    authGateScreen.style.display = 'flex';
    appWorkspace.style.display = 'none';
    stopAllWebcams();
    loadPublicClassrooms(); // Fetch classroom dropdowns dynamically
  }

  async function loadPublicClassrooms() {
    signupClass.innerHTML = '<option value="">Loading Classes...</option>';
    try {
      const res = await fetch(`${API_BASE_URL}/admin/classes`);
      if (res.ok) {
        const classes = await res.json();
        signupClass.innerHTML = '<option value="">Choose Class...</option>';
        classes.forEach(c => {
          const label = `${c.class_name} - Section ${c.section || 'A'}`;
          signupClass.add(new Option(label, c.id));
        });
      }
    } catch (e) {
      console.warn("Public classes loading failed:", e);
      signupClass.innerHTML = '<option value="">Failed loading classes</option>';
    }
  }

  function routeToWorkspace() {
    authGateScreen.style.display = 'none';
    appWorkspace.style.display = 'grid';
    stopAllWebcams();

    // Programmatically render navigation bar items based on active role
    if (USER_ROLE === 'student') {
      navBtnDashboard.style.display = 'none';
      navBtnAttendance.style.display = 'none';
      navBtnRegister.style.display = 'none';
      navBtnReports.style.display = 'none';
      
      navBtnStudentHub.style.display = 'flex';
      navBtnConfig.style.display = 'flex';
      
      // Auto active student hub tab
      switchTab('student-hub');
    } else {
      // Teacher or Admin
      navBtnDashboard.style.display = 'flex';
      navBtnAttendance.style.display = 'flex';
      navBtnRegister.style.display = 'flex';
      navBtnReports.style.display = 'flex';
      
      navBtnStudentHub.style.display = 'none';
      navBtnConfig.style.display = 'flex';
      
      switchTab('dashboard');
    }
  }

  function setupAuthGateListeners() {
    // Sliding Tab toggles
    authSwitchLogin.addEventListener('click', () => {
      authSwitchLogin.classList.add('active');
      authSwitchSignup.classList.remove('active');
      authLoginForm.classList.add('active');
      authSignupForm.classList.remove('active');
      stopAllWebcams();
    });

    authSwitchSignup.addEventListener('click', () => {
      authSwitchSignup.classList.add('active');
      authSwitchLogin.classList.remove('active');
      authSignupForm.classList.add('active');
      authLoginForm.classList.remove('active');
      stopAllWebcams();
      
      // Select signup role callback trigger to toggle biometrics
      signupRole.dispatchEvent(new Event('change'));
    });

    // Dynamic Signup role selector changes inputs layout
    signupRole.addEventListener('change', () => {
      if (signupRole.value === 'student') {
        signupStudentFields.style.display = 'flex';
        signupSubmitBtn.innerHTML = '<span class="material-icons-round">person_add</span><span>Submit Biometric Enrollment</span>';
      } else {
        signupStudentFields.style.display = 'none';
        signupSubmitBtn.innerHTML = '<span class="material-icons-round">person_add</span><span>Register Teacher Account</span>';
        stopAllWebcams();
      }
    });

    // Signup Biometric Camera Launcher
    signupStartCamBtn.addEventListener('click', async () => {
      signupCameraMessage.style.opacity = '1';
      signupCameraMessage.innerHTML = `
        <span class="material-icons-round spin">sync</span>
        <p>Initializing camera capture...</p>
      `;
      
      signupStream = await startWebcam(signupVideo, (err) => {
        signupCameraMessage.innerHTML = `
          <span class="material-icons-round">videocam_off</span>
          <p>Biometrics camera start failed.</p>
        `;
      });

      if (signupStream) {
        signupCameraMessage.style.opacity = '0';
        signupCameraLaser.classList.add('active');
        
        signupVideo.onloadedmetadata = () => {
          startTrackingLoop(signupVideo, signupOverlay, 'signup');
        };
      }
    });

    // Sign In Submission Form Action
    authLoginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginEmail.value.trim();
      const password = loginPassword.value.trim();
      const role = loginRole.value;

      if (!email || !password) {
        showToast('Fill in both credentials fields.', 'error');
        return;
      }

      showToast('Authorizing authentication credentials...', 'info');
      try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        const data = await res.json();
        if (res.ok) {
          JWT_TOKEN = data.access_token;
          USER_ROLE = data.role;
          localStorage.setItem('face_track_jwt_token', JWT_TOKEN);
          localStorage.setItem('face_track_user_role', USER_ROLE);
          
          userEmailDisplay.textContent = data.full_name || email;
          logoutBtn.style.display = 'flex';
          
          updateAuthUI(true);
          showToast(`Logged in successfully as ${data.role}!`, 'success');
          routeToWorkspace();
        } else {
          showToast(data.detail || 'Invalid email or password.', 'error');
        }
      } catch (err) {
        console.error(err);
        showToast('Connection to server gateway failed.', 'error');
      }
    });

    // Sign Up Submission Form Action
    authSignupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const role = signupRole.value;
      const name = signupName.value.trim();
      const email = signupEmail.value.trim();
      const password = signupPassword.value.trim();

      if (!name || !email || !password) {
        showToast('Please fill all mandatory fields.', 'error');
        return;
      }

      if (role === 'teacher') {
        // Simple Teacher Sign Up via JSON Register
        showToast('Creating Teacher account...', 'info');
        try {
          const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, full_name: name, role: 'teacher' })
          });
          if (res.ok) {
            showToast('Teacher Account registered! Access via Sign In.', 'success');
            authLoginForm.reset();
            loginEmail.value = email;
            loginPassword.value = password;
            loginRole.value = 'teacher';
            authSwitchLogin.click(); // Slide back to Sign In
          } else {
            const data = await res.json();
            showToast(data.detail || 'Sign up failed.', 'error');
          }
        } catch (err) {
          showToast('Connection timed out.', 'error');
        }
      } else {
        // Student Biometric Multipart Sign Up Onboarding
        const roll = signupRoll.value.trim();
        const classId = signupClass.value;

        if (!roll || !classId) {
          showToast('Roll number and class classroom are mandatory for students.', 'error');
          return;
        }

        if (!signupStream) {
          showToast('Please initialize camera and capture your face coordinates.', 'error');
          return;
        }

        isUploadingFace = true;
        signupSubmitBtn.setAttribute('disabled', 'true');
        showToast('Registering details and uploading Face ID snapshot...', 'info');

        // Capture snapshot frame blob
        const imageBlob = await captureVideoFrameToBlob(signupVideo);
        if (!imageBlob) {
          isUploadingFace = false;
          signupSubmitBtn.removeAttribute('disabled');
          return;
        }

        triggerShutterFlash(signupVideo);

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('full_name', name);
        formData.append('roll_number', roll);
        formData.append('class_id', parseInt(classId));
        formData.append('phone', '+910000000000');
        formData.append('file', imageBlob, 'student_face.jpg');

        try {
          const res = await fetch(`${API_BASE_URL}/students/register-with-face`, {
            method: 'POST',
            body: formData
          });
          const data = await res.json();
          if (res.ok) {
            showToast('Biometric Onboarding complete! Log in now.', 'success');
            stopAllWebcams();
            authLoginForm.reset();
            loginEmail.value = email;
            loginPassword.value = password;
            loginRole.value = 'student';
            authSwitchLogin.click();
          } else {
            showToast(data.detail || 'Face registration failed.', 'error');
            signupSubmitBtn.removeAttribute('disabled');
          }
        } catch (err) {
          console.error(err);
          showToast('Biometric capture upload timeout.', 'error');
          signupSubmitBtn.removeAttribute('disabled');
        } finally {
          isUploadingFace = false;
        }
      }
    });
  }

  // ─── TAB NAVIGATION LAYOUT ─────────────────────────────────────
  
  function setupTabNavigation() {
    navButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const targetTab = btn.getAttribute('data-tab');
        if (targetTab === activeTab) return;
        switchTab(targetTab);
      });
    });
    
    // Logout trigger
    logoutBtn.addEventListener('click', () => {
      clearAuth();
      showAuthScreen();
      showToast('Successfully logged out of portal.', 'info');
    });
  }

  async function switchTab(targetTab) {
    stopAllWebcams();
    
    // Update active nav button
    navButtons.forEach(b => {
      if (b.getAttribute('data-tab') === targetTab) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    
    // Switch panels
    tabPanels.forEach(panel => {
      panel.classList.remove('active');
    });
    
    const activePanel = document.getElementById(`tab-${targetTab}`);
    if (activePanel) activePanel.classList.add('active');
    activeTab = targetTab;
    
    updateViewHeader(targetTab);
    
    // Tab dynamic loaders
    if (targetTab === 'dashboard') {
      await bootstrapDashboard();
    } else if (targetTab === 'attendance') {
      initializeAttendanceScannerView();
    } else if (targetTab === 'register') {
      initializeRegistrationView();
    } else if (targetTab === 'reports') {
      initializeReportsView();
    } else if (targetTab === 'student-hub') {
      await initializeStudentHubView();
    }
  }

  function updateViewHeader(tab) {
    const subtitles = {
      dashboard: 'Class statistics and active session launchers',
      attendance: 'Interactive camera viewport tracking face reticle markers',
      register: 'Enroll student legal details and register Face ID weights',
      reports: 'Search classroom attendance session history sheets',
      'student-hub': 'Mark daily self-attendance and audit past metrics logs',
      config: 'Configure backend FastAPI endpoint directories'
    };
    
    const titles = {
      dashboard: 'System Dashboard',
      attendance: 'Live Attendance Marker HUD',
      register: 'Biometric Onboarding Portal',
      reports: 'Attendance Sheets Analytics',
      'student-hub': 'Student Biometric Hub',
      config: 'Core Configuration parameters'
    };
    
    viewTitle.textContent = titles[tab] || 'HUD Dashboard';
    viewSubtitle.textContent = subtitles[tab] || 'Overview';
  }

  // ─── API CONNECTIVITY AND MODELS ─────────────────────────────
  
  async function checkApiConnection() {
    apiStatusLed.className = 'status-indicator led-yellow led-pulse';
    apiStatusText.textContent = 'Checking server...';
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (res.ok) {
        apiStatusLed.className = 'status-indicator led-green';
        apiStatusText.textContent = 'Connected';
        return true;
      }
    } catch (e) {
      try {
        const res = await fetch(`${API_BASE_URL}/`);
        if (res.ok) {
          apiStatusLed.className = 'status-indicator led-green';
          apiStatusText.textContent = 'Connected (Root)';
          return true;
        }
      } catch (err) {}
    }
    
    apiStatusLed.className = 'status-indicator led-red';
    apiStatusText.textContent = 'Server Offline';
    return false;
  }
  
  async function loadBlazefaceModel() {
    tfStatusLed.className = 'status-indicator led-yellow led-pulse';
    tfStatusText.textContent = 'Loading Engine...';
    
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        cfgWebglStatus.textContent = 'WebGL Accelerated';
        cfgWebglStatus.className = 'cfg-stat-val text-green';
      } else {
        cfgWebglStatus.textContent = 'CPU Core Fallback';
        cfgWebglStatus.className = 'cfg-stat-val text-red';
      }
    } catch (e) {}

    const checkInterval = setInterval(async () => {
      if (window.tf && window.blazeface) {
        clearInterval(checkInterval);
        try {
          await tf.ready();
          blazefaceModel = await blazeface.load({ maxFaces: 1, scoreThreshold: 0.85 });
          isTfLoaded = true;
          tfStatusLed.className = 'status-indicator led-green';
          tfStatusText.textContent = 'BlazeFace Ready';
          
          // Trigger loops if view already open
          if (activeTab === 'attendance' && attendanceStream) {
            startTrackingLoop(webcamVideo, webcamOverlay, 'attendance');
          } else if (activeTab === 'register' && registrationStream) {
            startTrackingLoop(regVideo, regOverlay, 'register');
          } else if (activeTab === 'student-hub' && studentStream) {
            startTrackingLoop(studentWebcamVideo, studentWebcamOverlay, 'student-hub');
          }
        } catch (e) {
          console.error(e);
          tfStatusLed.className = 'status-indicator led-red';
          tfStatusText.textContent = 'Engine error';
        }
      }
    }, 100);
  }

  async function verifyAuthToken() {
    if (!JWT_TOKEN) return false;
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
      });
      if (res.ok) {
        const user = await res.json();
        userEmailDisplay.textContent = user.full_name || user.email;
        logoutBtn.style.display = 'flex';
        return true;
      }
    } catch (e) {}
    return false;
  }

  function clearAuth() {
    JWT_TOKEN = null;
    USER_ROLE = null;
    localStorage.removeItem('face_track_jwt_token');
    localStorage.removeItem('face_track_user_role');
    userEmailDisplay.textContent = 'Not Authenticated';
    logoutBtn.style.display = 'none';
    updateAuthUI(false);
  }

  function updateAuthUI(isLoggedIn) {
    if (isLoggedIn) {
      authLoggedInState.style.display = 'flex';
      authLoggedOutState.style.display = 'none';
      authTokenExpiry.textContent = `Active Role Claim: ${USER_ROLE.toUpperCase()} - Complete access credentials active.`;
    } else {
      authLoggedInState.style.display = 'none';
      authLoggedOutState.style.display = 'flex';
    }
  }

  // ─── TEACHER DASHBOARD METADATA LOADERS ───────────────────────
  
  async function bootstrapDashboard() {
    if (!JWT_TOKEN) return;
    try {
      // 1. Fetch Students
      const studentsRes = await fetch(`${API_BASE_URL}/students/`, {
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
      });
      if (studentsRes.ok) {
        const list = await studentsRes.json();
        statTotalStudents.textContent = list.length;
      }
      
      // 2. Fetch Active Session
      const sessionsRes = await fetch(`${API_BASE_URL}/attendance/sessions?active_only=true`, {
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
      });
      if (sessionsRes.ok) {
        const sessions = await sessionsRes.json();
        if (sessions.length > 0) {
          currentSession = sessions[0];
          statActiveSession.textContent = `Session ID #${currentSession.id}`;
          statActiveSession.className = 'stat-value text-cyan';
          statSessionDetails.textContent = `Classroom: ${currentSession.class_id} • Running`;
          dashStartSessionBtn.style.display = 'none';
          dashEndSessionBtn.style.display = 'inline-flex';
        } else {
          currentSession = null;
          statActiveSession.textContent = 'Inactive';
          statActiveSession.className = 'stat-value';
          statSessionDetails.textContent = 'No classes running';
          dashStartSessionBtn.style.display = 'inline-flex';
          dashEndSessionBtn.style.display = 'none';
        }
      }

      await loadMetadataDropdowns();
      
      if (currentSession) {
        await refreshSessionScans(currentSession.id);
      } else {
        recentScansTimeline.innerHTML = `
          <div class="timeline-empty">
            <span class="material-icons-round">sensors_off</span>
            <p>Start a session launcher first.</p>
          </div>
        `;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function loadMetadataDropdowns() {
    dashSelectClass.innerHTML = '<option value="">Select Classroom...</option>';
    dashSelectSubject.innerHTML = '<option value="">Select Subject...</option>';
    regSelectClass.innerHTML = '<option value="">Select Class...</option>';
    reportSelectClass.innerHTML = '<option value="">Select Class...</option>';

    try {
      const classesRes = await fetch(`${API_BASE_URL}/admin/classes`);
      const subjectsRes = await fetch(`${API_BASE_URL}/admin/subjects`, {
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
      });
      
      if (classesRes.ok) {
        const classes = await classesRes.json();
        classes.forEach(c => {
          const label = `${c.class_name} - Section ${c.section || 'A'}`;
          dashSelectClass.add(new Option(label, c.id));
          regSelectClass.add(new Option(label, c.id));
          reportSelectClass.add(new Option(label, c.id));
        });
      }
      
      if (subjectsRes.ok) {
        const subjects = await subjectsRes.json();
        subjects.forEach(s => {
          dashSelectSubject.add(new Option(`${s.subject_name} (${s.subject_code})`, s.id));
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  dashStartSessionBtn.addEventListener('click', async () => {
    const classId = dashSelectClass.value;
    const subjectId = dashSelectSubject.value;
    
    if (!classId || !subjectId) {
      showToast('Select Class and Subject before starting launcher.', 'error');
      return;
    }
    
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/start-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JWT_TOKEN}`
        },
        body: JSON.stringify({
          class_id: parseInt(classId),
          subject_id: parseInt(subjectId)
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        showToast('Scanning Session started successfully!', 'success');
        await bootstrapDashboard();
      } else {
        showToast(data.detail || 'Start Session failed.', 'error');
      }
    } catch (e) {
      showToast('Server connection failed.', 'error');
    }
  });

  dashEndSessionBtn.addEventListener('click', async () => {
    if (!currentSession) return;
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/end-session/${currentSession.id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
      });
      if (res.ok) {
        showToast('Active session terminated.', 'info');
        currentSession = null;
        await bootstrapDashboard();
      }
    } catch (e) {
      showToast('Connection failed.', 'error');
    }
  });

  async function refreshSessionScans(sessionId) {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/reports/session/${sessionId}`, {
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
      });
      if (res.ok) {
        const report = await res.json();
        statMarkedToday.textContent = report.present_count;
        
        const presentRecords = report.records
          .filter(r => r.status === 'present')
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        if (presentRecords.length === 0) {
          recentScansTimeline.innerHTML = `
            <div class="timeline-empty">
              <span class="material-icons-round">visibility_off</span>
              <p>No scans recorded in this session yet.</p>
            </div>
          `;
          return;
        }
        
        recentScansTimeline.innerHTML = '';
        presentRecords.slice(0, 10).forEach(r => {
          const time = r.timestamp ? new Date(r.timestamp).toLocaleTimeString() : 'Recent';
          const item = document.createElement('div');
          item.className = 'timeline-item';
          item.innerHTML = `
            <div class="timeline-item-avatar">
              <span class="material-icons-round">done</span>
            </div>
            <div class="timeline-item-info">
              <div class="timeline-student-name">${r.full_name}</div>
              <div class="timeline-student-meta">Roll: ${r.roll_number} • Conf: ${(r.confidence * 100).toFixed(0)}%</div>
              <div class="timeline-timestamp">${time}</div>
            </div>
          `;
          recentScansTimeline.appendChild(item);
        });
      }
    } catch (e) {}
  }

  // ─── WEBCAM CAPTURING CORE FUNCTIONS ─────────────────────────
  
  async function startWebcam(videoEl, errorCallback) {
    const constraints = {
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user'
      },
      audio: false
    };
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoEl.srcObject = stream;
      return stream;
    } catch (e) {
      console.error(e);
      if (errorCallback) errorCallback(e);
      return null;
    }
  }

  function stopAllWebcams() {
    [attendanceStream, registrationStream, signupStream, studentStream].forEach(stream => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    });
    
    attendanceStream = null;
    registrationStream = null;
    signupStream = null;
    studentStream = null;
    
    [attendanceLoopId, registrationLoopId, signupLoopId, studentLoopId].forEach(loopId => {
      if (loopId) cancelAnimationFrame(loopId);
    });
    
    attendanceLoopId = null;
    registrationLoopId = null;
    signupLoopId = null;
    studentLoopId = null;
  }

  // ─── TEACHER MARK ATTENDANCE VIEWPORT ────────────────────────
  
  async function initializeAttendanceScannerView() {
    if (!currentSession) {
      scanInfoClassroom.textContent = 'No Active Session';
      scanInfoSubject.textContent = 'Start a session from the Dashboard first';
      cameraMessage.innerHTML = `
        <span class="material-icons-round">lock</span>
        <p>Awaiting session initialization...</p>
      `;
      return;
    }

    scanInfoClassroom.textContent = `Running Classroom Session`;
    scanInfoSubject.textContent = `Session ID #${currentSession.id} is actively monitoring`;
    scanCountId.textContent = currentSession.id;
    
    await refreshScannerDetails();
    
    cameraMessage.style.opacity = '1';
    cameraMessage.innerHTML = `
      <span class="material-icons-round spin">sync</span>
      <p>Initializing camera capture stream...</p>
    `;
    
    attendanceStream = await startWebcam(webcamVideo, () => {
      cameraMessage.innerHTML = `
        <span class="material-icons-round">videocam_off</span>
        <p>Camera hardware capture failed.</p>
      `;
    });
    
    if (attendanceStream) {
      cameraMessage.style.opacity = '0';
      cameraLaser.classList.add('active');
      manualSnapBtn.removeAttribute('disabled');
      
      webcamVideo.onloadedmetadata = () => {
        startTrackingLoop(webcamVideo, webcamOverlay, 'attendance');
      };
    }
  }

  async function refreshScannerDetails() {
    if (!currentSession) return;
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/reports/session/${currentSession.id}`, {
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
      });
      if (res.ok) {
        const report = await res.json();
        scanCountExpected.textContent = report.total_students;
        scanCountPresent.textContent = report.present_count;
      }
    } catch (e) {}
  }

  // ─── TENSORFLOW.JS BLAZEFACE COORDINATES TRACKING LOOP ────────────
  
  function startTrackingLoop(videoEl, canvasEl, viewType) {
    const glWidth = videoEl.videoWidth || 640;
    const glHeight = videoEl.videoHeight || 480;
    canvasEl.width = glWidth;
    canvasEl.height = glHeight;
    
    const ctx = canvasEl.getContext('2d');
    stableFaceDuration = 0;
    
    async function track() {
      if (videoEl.paused || videoEl.ended) return;
      
      const now = performance.now();
      const fps = 1000 / (now - lastFrameTime);
      lastFrameTime = now;
      fpsHistory.push(fps);
      if (fpsHistory.length > 30) fpsHistory.shift();
      const avgFps = fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length;
      
      if (viewType === 'attendance') {
        cameraFpsCounter.textContent = `FPS: ${avgFps.toFixed(0)}`;
      } else if (viewType === 'student-hub') {
        studentFpsCounter.textContent = `FPS: ${avgFps.toFixed(0)}`;
      }
      
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      
      if (isTfLoaded && blazefaceModel) {
        try {
          const predictions = await blazefaceModel.estimateFaces(videoEl, false);
          
          if (predictions.length > 0) {
            const pred = predictions[0];
            const start = pred.topLeft;
            const end = pred.bottomRight;
            const size = [end[0] - start[0], end[1] - start[1]];
            
            // Draw visual landmarks
            const showLandmarks = (viewType !== 'student-hub') ? toggleLandmarks.checked : true;
            if (showLandmarks) {
              drawHighTechFaceHUD(ctx, start, size, pred.landmarks);
            }
            
            // Core centered calculations
            checkFaceAlignmentMath(pred, canvasEl.width, canvasEl.height, viewType);
          } else {
            stableFaceDuration = 0;
            hudReticle.className = 'hud-center-reticle';
            regHudReticle.className = 'hud-center-reticle';
            signupHudReticle.className = 'hud-center-reticle';
            studentHudReticle.className = 'hud-center-reticle';
            
            if (viewType === 'signup') {
              signupAlignmentStatus.textContent = 'Awaiting biometric target...';
              signupAlignmentStatus.className = 'face-alignment-banner banner-yellow';
              signupSubmitBtn.setAttribute('disabled', 'true');
            } else if (viewType === 'register') {
              regAlignmentStatus.textContent = 'Biometric scanner idle';
              regAlignmentStatus.className = 'face-alignment-banner banner-yellow';
              regSubmitBtn.setAttribute('disabled', 'true');
            } else if (viewType === 'student-hub') {
              studentSnapBtn.setAttribute('disabled', 'true');
            } else if (viewType === 'attendance') {
              if (faceLeavesCooldown > 0) faceLeavesCooldown -= 16;
            }
          }
        } catch (err) {
          console.error(err);
        }
      }
      
      // Request recursion frame
      if (viewType === 'attendance' && attendanceStream) {
        attendanceLoopId = requestAnimationFrame(track);
      } else if (viewType === 'register' && registrationStream) {
        registrationLoopId = requestAnimationFrame(track);
      } else if (viewType === 'signup' && signupStream) {
        signupLoopId = requestAnimationFrame(track);
      } else if (viewType === 'student-hub' && studentStream) {
        studentLoopId = requestAnimationFrame(track);
      }
    }
    
    track();
  }

  function drawHighTechFaceHUD(ctx, start, size, landmarks) {
    const [x, y] = start;
    const [w, h] = size;
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 12;
    ctx.shadowColor = 'rgba(0, 240, 255, 0.6)';
    
    const cornerLength = Math.min(w, h) * 0.22;
    
    // TL
    ctx.beginPath();
    ctx.moveTo(x + cornerLength, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + cornerLength);
    ctx.stroke();
    
    // TR
    ctx.beginPath();
    ctx.moveTo(x + w - cornerLength, y);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w, y + cornerLength);
    ctx.stroke();
    
    // BL
    ctx.beginPath();
    ctx.moveTo(x, y + h - cornerLength);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x + cornerLength, y + h);
    ctx.stroke();
    
    // BR
    ctx.beginPath();
    ctx.moveTo(x + w - cornerLength, y + h);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x + w, y + h - cornerLength);
    ctx.stroke();
    
    // Draw dot landmarks
    ctx.fillStyle = '#00ff88';
    ctx.shadowColor = 'rgba(0, 255, 136, 0.8)';
    ctx.shadowBlur = 8;
    landmarks.forEach(p => {
      ctx.beginPath();
      ctx.arc(p[0], p[1], 4.5, 0, 2 * Math.PI);
      ctx.fill();
    });
    ctx.shadowBlur = 0;
  }

  function checkFaceAlignmentMath(prediction, canvasWidth, canvasHeight, viewType) {
    const start = prediction.topLeft;
    const end = prediction.bottomRight;
    
    const fx = start[0] + (end[0] - start[0]) / 2;
    const fy = start[1] + (end[1] - start[1]) / 2;
    
    const cx = canvasWidth / 2;
    const cy = canvasHeight / 2;
    
    const dist = Math.sqrt(Math.pow(fx - cx, 2) + Math.pow(fy - cy, 2));
    const faceWidth = end[0] - start[0];
    const idealSize = faceWidth > (canvasWidth * 0.26);
    
    const isCentered = dist < 70 && idealSize;
    
    if (isCentered) {
      stableFaceDuration += 16.6;
      
      // Highlight Reticles
      if (viewType === 'attendance') {
        hudReticle.className = 'hud-center-reticle tracking';
        if (toggleAutodetect.checked && stableFaceDuration > 1200 && !isUploadingFace && faceLeavesCooldown <= 0) {
          triggerAttendanceSnap();
        }
      } else if (viewType === 'register') {
        regHudReticle.className = 'hud-center-reticle tracking';
        regAlignmentStatus.textContent = 'BIOMETRIC LOCK: Ready to enroll!';
        regAlignmentStatus.className = 'face-alignment-banner banner-green';
        regSubmitBtn.removeAttribute('disabled');
      } else if (viewType === 'signup') {
        signupHudReticle.className = 'hud-center-reticle tracking';
        signupAlignmentStatus.textContent = 'BIOMETRIC LOCK: Face fully aligned!';
        signupAlignmentStatus.className = 'face-alignment-banner banner-green';
        signupSubmitBtn.removeAttribute('disabled');
      } else if (viewType === 'student-hub') {
        studentHudReticle.className = 'hud-center-reticle tracking';
        studentSnapBtn.removeAttribute('disabled');
      }
    } else {
      stableFaceDuration = 0;
      if (viewType === 'attendance') {
        hudReticle.className = 'hud-center-reticle';
      } else if (viewType === 'register') {
        regHudReticle.className = 'hud-center-reticle';
        regAlignmentStatus.textContent = 'Biometric mismatch: Center face inside crosshairs';
        regAlignmentStatus.className = 'face-alignment-banner banner-yellow';
        regSubmitBtn.setAttribute('disabled', 'true');
      } else if (viewType === 'signup') {
        signupHudReticle.className = 'hud-center-reticle';
        signupAlignmentStatus.textContent = 'Biometric mismatch: Align face inside crosshairs';
        signupAlignmentStatus.className = 'face-alignment-banner banner-yellow';
        signupSubmitBtn.setAttribute('disabled', 'true');
      } else if (viewType === 'student-hub') {
        studentHudReticle.className = 'hud-center-reticle';
        studentSnapBtn.setAttribute('disabled', 'true');
      }
    }
  }

  // ─── CAPTURES & SHUTTERS DISPATCHERS ─────────────────────────
  
  async function triggerAttendanceSnap() {
    if (isUploadingFace || !currentSession) return;
    
    isUploadingFace = true;
    showToast('Biometric snapshot capturing...', 'info');
    
    const imageBlob = await captureVideoFrameToBlob(webcamVideo);
    if (!imageBlob) {
      isUploadingFace = false;
      return;
    }
    
    triggerShutterFlash(webcamVideo);
    
    const formData = new FormData();
    formData.append('file', imageBlob, 'snap.jpg');
    
    scanResultPanel.innerHTML = `
      <div class="result-placeholder">
        <span class="material-icons-round spin">sync</span>
        <h4>Recognizing...</h4>
        <p>Comparing embeddings with DB. Hold still...</p>
      </div>
    `;
    
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/mark-face?session_id=${currentSession.id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
        body: formData
      });
      const data = await res.json();
      
      if (res.ok) {
        if (data.matched) {
          renderMarkSuccess(data);
          showToast(`Marked: ${data.full_name}`, 'success');
          lastMarkedFaceId = data.student_id;
          faceLeavesCooldown = 3800;
          await refreshScannerDetails();
        } else {
          renderMarkFail(data.message || 'Face not recognized');
          showToast(data.message || 'No match found.', 'error');
          faceLeavesCooldown = 2000;
        }
      } else {
        renderMarkFail(data.detail || 'Gateway error.');
        showToast(data.detail || 'Mark face error.', 'error');
        faceLeavesCooldown = 2000;
      }
    } catch (e) {
      renderMarkFail('Connection to server gateway timeout.');
      showToast('Attendance dispatch failed.', 'error');
      faceLeavesCooldown = 3000;
    } finally {
      isUploadingFace = false;
      stableFaceDuration = 0;
    }
  }

  function renderMarkSuccess(result) {
    const time = new Date().toLocaleTimeString();
    scanResultPanel.innerHTML = `
      <div class="scan-success-hud">
        <div class="success-avatar">
          <span class="material-icons-round">verified_user</span>
        </div>
        <div class="success-details">
          <h4>${result.full_name}</h4>
          <p>Roll No: ${result.roll_number}</p>
          <span class="success-badge">${result.duplicate ? 'Duplicate Bypass' : 'Success Marked'}</span>
        </div>
        <div class="success-timestamp">${time}</div>
      </div>
    `;
  }

  function renderMarkFail(reason) {
    scanResultPanel.innerHTML = `
      <div class="scan-fail-hud">
        <div class="fail-avatar">
          <span class="material-icons-round">gpp_bad</span>
        </div>
        <div class="fail-details">
          <h4>Match Failure</h4>
          <p>${reason}</p>
          <span class="success-badge" style="background:rgba(255, 59, 48, 0.1); color:var(--accent-red)">DENIED</span>
        </div>
      </div>
    `;
  }

  function triggerShutterFlash(videoEl) {
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = '#ffffff';
    flash.style.zIndex = '10';
    flash.style.opacity = '0.85';
    flash.style.transition = 'opacity 0.25s ease-out';
    
    videoEl.parentElement.appendChild(flash);
    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 250);
    }, 50);
  }

  async function captureVideoFrameToBlob(videoEl) {
    return new Promise((resolve) => {
      const snapCanvas = document.createElement('canvas');
      snapCanvas.width = videoEl.videoWidth || 640;
      snapCanvas.height = videoEl.videoHeight || 480;
      
      const ctx = snapCanvas.getContext('2d');
      ctx.translate(snapCanvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoEl, 0, 0, snapCanvas.width, snapCanvas.height);
      
      snapCanvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.9);
    });
  }

  manualSnapBtn.addEventListener('click', triggerAttendanceSnap);

  // ─── TEACHER REGISTER STUDENT VIEWS ─────────────────────────
  
  async function initializeRegistrationView() {
    studentRegForm.reset();
    regSubmitBtn.setAttribute('disabled', 'true');
    regAlignmentStatus.textContent = 'Biometric Stream Offline';
    regAlignmentStatus.className = 'face-alignment-banner banner-yellow';
    
    regCameraMessage.style.opacity = '1';
    regCameraMessage.innerHTML = `
      <span class="material-icons-round">videocam_off</span>
      <p>Initialize Biometrics camera to start capturing face landmarks.</p>
    `;
    
    await loadMetadataDropdowns();
  }

  regStartCamBtn.addEventListener('click', async () => {
    regCameraMessage.style.opacity = '1';
    regCameraMessage.innerHTML = `
      <span class="material-icons-round spin">sync</span>
      <p>Starting capture stream...</p>
    `;
    
    registrationStream = await startWebcam(regVideo, () => {
      regCameraMessage.innerHTML = `
        <span class="material-icons-round">videocam_off</span>
        <p>Biometric camera initialization failed.</p>
      `;
    });
    
    if (registrationStream) {
      regCameraMessage.style.opacity = '0';
      regCameraLaser.classList.add('active');
      
      regVideo.onloadedmetadata = () => {
        startTrackingLoop(regVideo, regOverlay, 'register');
      };
    }
  });

  regSubmitBtn.addEventListener('click', async () => {
    const name = regName.value.trim();
    const roll = regRoll.value.trim();
    const email = regEmail.value.trim();
    const classId = regSelectClass.value;
    
    if (!name || !roll || !email || !classId) {
      showToast('Please fill all mandatory personal details.', 'error');
      return;
    }
    
    if (!registrationStream) {
      showToast('Start biometric camera scanner first.', 'error');
      return;
    }
    
    isUploadingFace = true;
    regSubmitBtn.setAttribute('disabled', 'true');
    showToast('Enrolling student and extracting facial embedding...', 'info');
    
    const imageBlob = await captureVideoFrameToBlob(regVideo);
    if (!imageBlob) {
      isUploadingFace = false;
      regSubmitBtn.removeAttribute('disabled');
      return;
    }
    
    triggerShutterFlash(regVideo);
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', 'Pass@1234');
    formData.append('full_name', name);
    formData.append('roll_number', roll);
    formData.append('class_id', parseInt(classId));
    formData.append('phone', '+919999999999');
    formData.append('file', imageBlob, 'face.jpg');
    
    try {
      const res = await fetch(`${API_BASE_URL}/students/register-with-face`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
        body: formData
      });
      
      if (res.ok) {
        showToast('Student successfully enrolled with Face ID!', 'success');
        studentRegForm.reset();
        stopAllWebcams();
        regCameraMessage.style.opacity = '1';
        regCameraMessage.innerHTML = `
          <span class="material-icons-round text-green" style="font-size: 54px;">check_circle</span>
          <p style="color:var(--accent-green); font-weight:700;">REGISTRATION COMPLETED</p>
        `;
        regAlignmentStatus.textContent = 'Enrolled successfully!';
        regAlignmentStatus.className = 'face-alignment-banner banner-green';
      } else {
        const data = await res.json();
        showToast(data.detail || 'Registration failed.', 'error');
        regSubmitBtn.removeAttribute('disabled');
      }
    } catch (e) {
      showToast('Gateway upload timeout.', 'error');
      regSubmitBtn.removeAttribute('disabled');
    } finally {
      isUploadingFace = false;
    }
  });

  // ─── TEACHER REPORTS PANELS ───────────────────────────────
  
  async function initializeReportsView() {
    reportSelectSession.innerHTML = '<option value="">Select Classroom first...</option>';
    reportSelectSession.setAttribute('disabled', 'true');
    reportLoadBtn.setAttribute('disabled', 'true');
    reportExportCsv.setAttribute('disabled', 'true');
    
    reportAttendanceTable.style.display = 'none';
    reportEmptyState.style.display = 'flex';
    
    await loadMetadataDropdowns();
  }

  reportSelectClass.addEventListener('change', async () => {
    const classId = reportSelectClass.value;
    if (!classId) {
      reportSelectSession.innerHTML = '<option value="">Select Classroom first...</option>';
      reportSelectSession.setAttribute('disabled', 'true');
      reportLoadBtn.setAttribute('disabled', 'true');
      return;
    }
    
    reportSelectSession.innerHTML = '<option value="">Loading classroom sessions history...</option>';
    reportSelectSession.removeAttribute('disabled');
    
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/sessions?class_id=${classId}`, {
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
      });
      if (res.ok) {
        const sessions = await res.json();
        if (sessions.length === 0) {
          reportSelectSession.innerHTML = '<option value="">No sessions found</option>';
          reportSelectSession.setAttribute('disabled', 'true');
          reportLoadBtn.setAttribute('disabled', 'true');
          return;
        }
        
        reportSelectSession.innerHTML = '<option value="">Select Session ID / Date...</option>';
        sessions.forEach(s => {
          const dateStr = new Date(s.started_at || s.date).toLocaleString();
          const label = `Session #${s.id} — ${dateStr} (${s.is_active ? 'ACTIVE' : 'CLOSED'})`;
          reportSelectSession.add(new Option(label, s.id));
        });
        reportSelectSession.removeAttribute('disabled');
      }
    } catch (e) {
      showToast('Failed loading classroom sessions history.', 'error');
    }
  });

  reportSelectSession.addEventListener('change', () => {
    if (reportSelectSession.value) {
      reportLoadBtn.removeAttribute('disabled');
    } else {
      reportLoadBtn.setAttribute('disabled', 'true');
    }
  });

  reportLoadBtn.addEventListener('click', async () => {
    const sessionId = reportSelectSession.value;
    if (!sessionId) return;
    
    showToast('Fetching class attendance sheets...', 'info');
    reportLoadBtn.setAttribute('disabled', 'true');
    
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/reports/session/${sessionId}`, {
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
      });
      const data = await res.json();
      
      if (res.ok) {
        reportSheetTitle.textContent = `Attendance Sheet — Session #${sessionId} (${data.records.length} Students)`;
        reportTableBody.innerHTML = '';
        
        if (data.records.length === 0) {
          reportAttendanceTable.style.display = 'none';
          reportEmptyState.style.display = 'flex';
          reportExportCsv.setAttribute('disabled', 'true');
          return;
        }
        
        data.records.forEach(r => {
          const time = r.timestamp ? new Date(r.timestamp).toLocaleTimeString() : '—';
          const method = r.marked_manually ? 'MANUAL' : (r.confidence ? `BIOMETRIC (${(r.confidence * 100).toFixed(0)}%)` : '—');
          
          let statusBadge = '';
          if (r.status === 'present') {
            statusBadge = '<span class="report-status-badge badge-present">Present</span>';
          } else if (r.status === 'leave') {
            statusBadge = '<span class="report-status-badge badge-leave">Leave</span>';
          } else {
            statusBadge = '<span class="report-status-badge badge-absent">Absent</span>';
          }
          
          const row = document.createElement('tr');
          row.innerHTML = `
            <td><code>${r.roll_number}</code></td>
            <td><strong>${r.full_name}</strong></td>
            <td>${statusBadge}</td>
            <td>${time}</td>
            <td><small>${method}</small></td>
          `;
          reportTableBody.appendChild(row);
        });
        
        reportEmptyState.style.display = 'none';
        reportAttendanceTable.style.display = 'table';
        reportExportCsv.removeAttribute('disabled');
      } else {
        showToast(data.detail || 'Error loading report.', 'error');
      }
    } catch (e) {
      showToast('Network error loading reports.', 'error');
    } finally {
      reportLoadBtn.removeAttribute('disabled');
    }
  });

  reportExportCsv.addEventListener('click', () => {
    const sessionId = reportSelectSession.value;
    if (!sessionId) return;
    
    showToast('Downloading CSV spreadsheet...', 'info');
    fetch(`${API_BASE_URL}/attendance/export/${sessionId}?format=csv`, {
      headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
    })
    .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `session_${sessionId}_attendance.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(() => showToast('CSV download failed.', 'error'));
  });

  // ==========================================================================
  // STUDENT PORTAL HUB CONTROL LOGICS
  // ==========================================================================
  
  async function initializeStudentHubView() {
    // 1. Fetch Student attendance metrics
    showToast('Syncing student metrics dashboard...', 'info');
    studentStatRatio.textContent = '0.0%';
    studentStatPresent.textContent = '0';
    studentStatAbsent.textContent = '0';
    
    studentCameraMessage.style.opacity = '1';
    studentCameraMessage.innerHTML = `
      <span class="material-icons-round">videocam_off</span>
      <p>Click 'Initialize Face ID' to launch camera scanner.</p>
    `;
    studentSnapBtn.setAttribute('disabled', 'true');

    try {
      const statsRes = await fetch(`${API_BASE_URL}/students/me/attendance`, {
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
      });
      if (statsRes.ok) {
        const stats = await statsRes.json();
        studentStatRatio.textContent = `${stats.attendance_percentage.toFixed(1)}%`;
        studentStatPresent.textContent = stats.present_count;
        studentStatAbsent.textContent = stats.absent_count;
        studentStatClass.textContent = `Roll Number: ${stats.roll_number}`;
        
        // Coloring average badge
        if (stats.attendance_percentage >= 75) {
          studentStatRatioLabel.textContent = 'Good Standing (>75%)';
          studentStatRatioLabel.className = 'stat-trend trend-green';
        } else {
          studentStatRatioLabel.textContent = 'Shortage Warning (<75%)';
          studentStatRatioLabel.className = 'stat-trend text-red';
        }
      }
    } catch (e) {
      console.error("Student stats query failed:", e);
    }

    // 2. Fetch past log timeline history entries
    await refreshStudentTimeline();
  }

  async function refreshStudentTimeline() {
    studentHistoryTimeline.innerHTML = '<div class="timeline-empty"><span class="material-icons-round spin">sync</span><p>Fetching historical logs...</p></div>';
    try {
      const res = await fetch(`${API_BASE_URL}/students/me/history`, {
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
      });
      if (res.ok) {
        const historyList = await res.json();
        if (historyList.length === 0) {
          studentHistoryTimeline.innerHTML = '<div class="timeline-empty"><span class="material-icons-round">visibility_off</span><p>No past logged days found.</p></div>';
          return;
        }

        studentHistoryTimeline.innerHTML = '';
        historyList.forEach(r => {
          const dateStr = r.date ? new Date(r.date).toLocaleDateString() : 'Today';
          const timeStr = r.timestamp ? new Date(r.timestamp).toLocaleTimeString() : '—';
          
          let icon = 'dangerous';
          let statusText = 'Absent';
          let borderClass = 'red-glow';
          
          if (r.status === 'present') {
            icon = 'check_circle';
            statusText = 'Present';
            borderClass = 'green-glow';
          } else if (r.status === 'leave') {
            icon = 'calendar_today';
            statusText = 'Leave Approved';
            borderClass = 'yellow-glow';
          }

          const item = document.createElement('div');
          item.className = `timeline-item ${borderClass}`;
          item.style.borderLeft = `3px solid ${r.status === 'present' ? 'var(--accent-green)' : (r.status === 'leave' ? 'var(--accent-yellow)' : 'var(--accent-red)')}`;
          item.innerHTML = `
            <div class="timeline-item-avatar" style="color:inherit; background:rgba(255,255,255,0.02)">
              <span class="material-icons-round">${icon}</span>
            </div>
            <div class="timeline-item-info">
              <div class="timeline-student-name">${r.subject_name} (${statusText})</div>
              <div class="timeline-student-meta">Class session on ${dateStr} • ${timeStr}</div>
            </div>
          `;
          studentHistoryTimeline.appendChild(item);
        });
      }
    } catch (e) {
      studentHistoryTimeline.innerHTML = '<div class="timeline-empty"><span class="material-icons-round text-red">error</span><p>Failed syncing history list.</p></div>';
    }
  }

  // Student portal Webcam Launcher
  studentStartCamBtn.addEventListener('click', async () => {
    studentCameraMessage.style.opacity = '1';
    studentCameraMessage.innerHTML = `
      <span class="material-icons-round spin">sync</span>
      <p>Opening scanner camera...</p>
    `;
    
    studentStream = await startWebcam(studentWebcamVideo, () => {
      studentCameraMessage.innerHTML = `
        <span class="material-icons-round">videocam_off</span>
        <p>Biometric webcam start failed.</p>
      `;
    });

    if (studentStream) {
      studentCameraMessage.style.opacity = '0';
      studentCameraLaser.classList.add('active');
      
      studentWebcamVideo.onloadedmetadata = () => {
        startTrackingLoop(studentWebcamVideo, studentWebcamOverlay, 'student-hub');
      };
    }
  });

  // Student self-marks Present
  studentSnapBtn.addEventListener('click', async () => {
    if (!studentStream || isUploadingFace) return;
    
    isUploadingFace = true;
    studentSnapBtn.setAttribute('disabled', 'true');
    showToast('Executing client-side face snap...', 'info');

    const imageBlob = await captureVideoFrameToBlob(studentWebcamVideo);
    if (!imageBlob) {
      isUploadingFace = false;
      studentSnapBtn.removeAttribute('disabled');
      return;
    }

    triggerShutterFlash(studentWebcamVideo);
    
    const formData = new FormData();
    formData.append('status', 'present');
    formData.append('file', imageBlob, 'selfmark.jpg');

    try {
      const res = await fetch(`${API_BASE_URL}/attendance/student-self-mark`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Attendance successfully marked Present!', 'success');
        stopAllWebcams();
        
        studentCameraMessage.style.opacity = '1';
        studentCameraMessage.innerHTML = `
          <span class="material-icons-round text-green" style="font-size: 54px;">check_circle</span>
          <p style="color:var(--accent-green); font-weight:700;">MARKED PRESENT</p>
        `;
        
        // Refresh dashboard metrics
        await initializeStudentHubView();
      } else {
        showToast(data.detail || 'Self marking check failed.', 'error');
        studentSnapBtn.removeAttribute('disabled');
      }
    } catch (e) {
      showToast('Dispatch upload timed out.', 'error');
      studentSnapBtn.removeAttribute('disabled');
    } finally {
      isUploadingFace = false;
    }
  });

  // Student applies Leave
  studentLeaveBtn.addEventListener('click', async () => {
    if (!confirm("Are you sure you want to apply leave for today? This registers your status as Excused (Leave).")) return;
    
    showToast('Submitting leave application...', 'info');
    
    const formData = new FormData();
    formData.append('status', 'leave');
    
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/student-self-mark`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${JWT_TOKEN}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Leave request submitted and excused!', 'success');
        await initializeStudentHubView();
      } else {
        showToast(data.detail || 'Applying leave failed.', 'error');
      }
    } catch (e) {
      showToast('Connection to server timed out.', 'error');
    }
  });

  // ─── SYSTEM CONFIG CONTROLS ──────────────────────────────────
  
  function setupConfigListeners() {
    cfgSaveUrlBtn.addEventListener('click', async () => {
      const targetUrl = cfgApiUrl.value.trim();
      if (!targetUrl) return;
      
      API_BASE_URL = targetUrl;
      localStorage.setItem('face_track_api_url', API_BASE_URL);
      showToast('API Gateway address updated.', 'success');
      
      const ok = await checkApiConnection();
      if (ok && JWT_TOKEN) {
        routeToWorkspace();
      }
    });
    
    cfgLoginBtn.addEventListener('click', async () => {
      const email = cfgAdminEmail.value.trim();
      const pass = cfgAdminPass.value.trim();
      if (!email || !pass) {
        showToast('Fill in email and password credentials.', 'error');
        return;
      }
      await handleLogin(email, pass);
    });
    
    cfgSeedBtn.addEventListener('click', async () => {
      if (!confirm("Seed classrooms default data (Classes 1-10)?")) return;
      showToast('Executing seed operations...', 'info');
      try {
        const res = await fetch(`${API_BASE_URL}/admin/seed`, { method: 'POST' });
        const data = await res.json();
        if (res.ok) {
          showToast('Database successfully seeded!', 'success');
          cfgAdminEmail.value = data.admin_email || 'admin@facetrack.app';
          cfgAdminPass.value = data.admin_password || 'admin123';
        } else {
          showToast(data.detail || 'Seeding already complete or failed.', 'warning');
        }
      } catch (e) {
        showToast('Gateway connection failed.', 'error');
      }
    });
  }

  // ─── TOAST UTILITIES ──────────────────────────────────────────
  
  function showToast(message, type = 'info') {
    toastMessage.textContent = message;
    if (type === 'success') {
      appToast.className = 'toast-notification active toast-success';
      toastIcon.textContent = 'verified';
    } else if (type === 'error') {
      appToast.className = 'toast-notification active toast-error';
      toastIcon.textContent = 'gpp_bad';
    } else {
      appToast.className = 'toast-notification active';
      toastIcon.textContent = 'info';
    }
    
    setTimeout(() => {
      appToast.classList.remove('active');
    }, 3800);
  }

  init();
});
