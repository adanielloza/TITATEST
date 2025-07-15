# TITA: Therapeutic Interactive Tool with Augmented Reality

**A mobile and web-based therapeutic system for children with ADHD**  
Developed by: Juan F. Aristizábal & Andrés Loza  
Affiliation: Universidad de Las Américas (UDLA) – Capstone Project  

---

## 🧠 Overview

TITA is a digital therapeutic solution designed to support clinical interventions for children with Attention Deficit Hyperactivity Disorder (ADHD). It combines a **mobile app** built in Unity with **augmented reality (AR)** activities, and a **web platform** for therapists to track and analyze cognitive performance in real-time.

The system offers interactive tasks that measure attention, memory, and pattern recognition. Therapists benefit from **automated metric recording**, **interactive dashboards**, and **secure clinical data management**, all integrated through **Firebase**.

---

## 🎯 Features

### Mobile App (Unity + Vuforia)
- 🧩 **AR-Based Cognitive Activities**: Observation, Selective Attention, and Memory
- 🧠 **Configurable Difficulty Levels**
- 📊 **Automatic Metric Logging**: Response time, accuracy, and completion

### Web Platform (React + Firebase)
- 👩‍⚕️ **Therapist Portal**: Secure login, patient management, session history
- 📈 **Interactive Dashboards**: Real-time data visualization
- 🔒 **Secure Data Storage**: Compliant with clinical ethics and privacy protocols

---
## 📸 Screenshots

| Web Platform (MindAR) | Mobile App (Activities in AR) |
|------------------------|-------------------------------|
| <img width="428" height="205" alt="image" src="https://github.com/user-attachments/assets/e9f6b810-b1f3-4afb-8354-4e866800e82e" /> |   <img width="120" height="253" alt="image" src="https://github.com/user-attachments/assets/4ce0fe7f-860a-4229-bf46-7904cd40dab0" /> |

## 🧱 System Architecture

TITA is composed of two synchronized components:

### 📱 Mobile App (Unity + Vuforia)
- Developed in **Unity** using **Vuforia** for Augmented Reality.
- Targets **Android** devices compatible with **ARCore**.
- Implements 3 cognitive AR activities (Observation, Patterns, Memory).
- Stores session metrics in Firebase Firestore.

### 🌐 Web Platform (React + Firebase)
- Built using **React** and hosted via Firebase.
- Secure login for therapists via **Firebase Authentication**.
- Real-time synchronization with the mobile app using Firestore.
- Data visualization through dashboards (charts, session logs).

### ☁️ Backend Services (Firebase)
- **Firestore DB** – stores patient data and activity metrics.
- **Authentication** – therapist login and access control.
- **Storage** – handles profile images and session screenshots.

<img width="432" height="162" alt="image" src="https://github.com/user-attachments/assets/b88471bf-f3bc-4bcf-aa43-a3918594515a" />

## 🧪 Quality & Testing

The project followed **ISO/IEC 25010** and **ISO/IEC/IEEE 29119** standards to ensure functionality and software quality.

### ✅ Functional Testing
- 📋 **81 functional test cases**
- ✅ **100% passed**
- Covered modules:
  - Secure authentication
  - AR activity logging
  - Dashboard visualization
  - Patient management

### 🔍 Web Platform Technical QA

- 🧪 **Unit Testing** with **Vitest**
  - **453 tests**
  - **91.08% coverage**
- 🧹 **Static Analysis** with **SonarQube**
  - **0 vulnerabilities**
  - **87.5% code coverage**
  - No duplicated code
- ⚙️ **Lighthouse Audit**
  - **Performance**: 80
  - **Accessibility**: 91
  - **Best Practices**: 93
  - **SEO**: 83
  - **Load Time**: **1.9 seconds**

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/09e6926c-cff4-46c9-92bf-5dc5a85efbea" width="400" alt="Lighthouse Scores"/>
      <br/>
      <sub><strong>Figure 1:</strong> Lighthouse performance results</sub>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/311bf3b2-f980-4b3a-90a8-dbf32a7f2a1b" width="450" alt="SonarQube Analysis"/>
      <br/>
      <sub><strong>Figure 2:</strong> SonarQube static analysis results</sub>
    </td>
  </tr>
</table>

### 📱 Mobile App Performance
- Evaluated with **Unity Profiler**
- Stable performance, no memory leaks or bottlenecks

<img width="426" height="172" alt="image" src="https://github.com/user-attachments/assets/b9266f6b-28f6-4380-adeb-c46794f33632" />

## 🚀 Getting Started

Follow the steps below to run the full system locally.

---

### 🔧 Prerequisites

Make sure you have the following installed and configured:

- 📱 **Android device** compatible with **ARCore**
- 💻 **Node.js** and **npm** for the web platform
- 🎮 **Unity** (recommended version) with **Vuforia Engine** installed

---
### 🌐 Web Platform Setup
```bash
# Clone the repository
git clone https://github.com/your-username/TITA.git
cd web

# Install dependencies
npm install

# Start development server
npm run dev
```
## 📌 Methodology

The project followed an **Agile Scrum methodology** over a 6-month period:

- 🕒 6 bi-weekly sprints
- ✅ Sprint-based planning, development, and testing
- 📦 Functional deliverables after each sprint
- 🔁 Iterative feedback from therapists and supervisors

---

## 🔐 Ethical & Privacy Considerations

- ✅ Confidentiality agreement signed with **FUVIME**
- 👨‍👩‍👧 Informed consent from guardians for all sessions
- 🔒 Data stored in Firebase with access control
- 🧠 AR activities designed to be safe, supervised, and avoid cognitive overload
- ❗ Session metrics are intended to support (not replace) clinical diagnosis

---

## 📚 References

- Alqithami, S. (2021). *A serious-gamification blueprint towards a normalized attention*. Brain Informatics, 8(6).
- Aikaterini, D. & Drigas, A. (2022). *Electronic, VR & AR Games for Intervention in ADHD*. Technium Social Sciences Journal, 28.
- Avila-Pesantez, D. et al. (2018). *Towards the improvement of ADHD children through augmented reality serious games*. IEEE EDUCON.

---

## 📄 License

This project was developed as part of an academic capstone and is intended for educational and clinical research purposes.  
For licensing or production use, please contact the authors.

---

## 📫 Contact

For questions, collaborations, or clinical partnerships:

- **Juan F. Aristizábal** – juan.aristizabal@udla.edu.ec  
- **Andrés Loza** – andres.loza.chacon@udla.edu.ec













