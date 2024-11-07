# IELTS Academic Testing Tool Documentation

## Overview

The **IELTS Academic Testing Tool** is an online platform designed to simulate the IELTS (International English Language Testing System) academic exam. It features reading and writing sections with automated timing, secure authentication, and result tracking.

## Key Features

### 1. Authentication
- Google Account integration for secure user authentication
- Firebase Authentication backend
- User session management and profile display

### 2. Test Sections

#### Reading Section
- Multiple reading passages with associated questions
- Multiple choice and True/False/Not Given question types
- Timed sections with auto-submission
- Text highlighting functionality for reading comprehension
- Progress tracking between passages

#### Writing Section
- Two writing tasks
- Text area input for responses
- Timed writing section
- Auto-save functionality

### 2. Sharing
- Final URL can be shared
- Data stored on server
- Anyone with link can test answers

### 3. Security Features
- Fullscreen mode enforcement during the test
- Prevention of browser search/find functionality
- Blur effect on content when not in fullscreen
- Anti-copy/paste measures

### 4. User Interface
- Dark/Light mode toggle
- Progress indicators
- Timer display
- Responsive design
- Interactive navigation between sections

## Technical Implementation

### Frontend Technologies
- HTML5
- CSS3
- JavaScript
- jQuery
- Bootstrap
- PIXI.js (for animations)

### Backend Services
- Firebase Authentication
- Firebase Realtime Database
- Firebase Hosting

### Key Components

#### Authentication Flow

```javascript
// Initialize Firebase Authentication
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Handle auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    uid = user.uid;
    // Update UI with user info
  } else {
    // User is signed out
    // Redirect to sign in
  }
});
```

#### Timer Implementation

```javascript
function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  m = timeArray[0];
  s = checkSecond((timeArray[1] - 1));

  if (s == 0 && m == 0) {
    // Handle section completion
  }

  // Update timer display
  document.getElementById('timer').innerHTML = m + ":" + s;
  setTimeout(startTimer, 1000);
}
```

#### Security Measures

```javascript
// Prevent find/search functionality
window.addEventListener("keydown", function(e) {
  if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
    e.preventDefault();
  }
});

// Handle fullscreen changes
window.addEventListener('resize', (evt) => {
  if (window.innerHeight == screen.height) {
    // Enable content viewing
  } else {
    // Blur content
  }
});
```

## Database Structure

```
users/
└── uid/
    ├── answered/
    │   ├── reading: {...}
    │   └── writing: {...}
    └── resultpage: "HTML"

tests/
└── answers/
    ├── reading: {...}
    └── writing: {...}
```

## Usage Guidelines
- Users must sign in with a Google account
- Read instructions before starting the test
- Enter fullscreen mode when prompted
- Complete each section within the time limit
- Review results after completion
Login Screen
![image](https://github.com/AryanRai/AcademicTestingSoftware-/assets/31175254/4ffa10ea-123c-46fb-8991-49692db78442)

# Test

![Screenshot 2024-11-07 231131](https://github.com/user-attachments/assets/4e0c741f-a685-41c8-9616-cd4f0cf5257b)
![Screenshot 2024-11-07 231125](https://github.com/user-attachments/assets/453833b4-00bf-46a2-9047-48bc5edae307)
![Screenshot 2024-11-07 231118](https://github.com/user-attachments/assets/76dc3b36-3f6e-4a9c-8edc-3e58367f4277)
![Screenshot 2024-11-07 231110](https://github.com/user-attachments/assets/24540c83-0014-4ba9-81d2-ec987b61e7a0)
![Screenshot 2024-11-07 231046](https://github.com/user-attachments/assets/91d43e4b-c385-4b4c-80d2-207fcd46f525)

# Database Structure

![Screenshot 2024-11-07 231229](https://github.com/user-attachments/assets/4af7c7e1-b83b-4a23-b785-d5a54919cecb)
![Screenshot 2024-11-07 231214](https://github.com/user-attachments/assets/ff740a2c-3290-44e8-8521-fce46ef663c7)

# Results Screen
![image](https://github.com/user-attachments/assets/353312aa-baa1-4f33-917c-b9ef7565844d)
