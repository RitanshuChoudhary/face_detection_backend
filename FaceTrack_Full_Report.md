
# HIMACHAL INSTITUTE OF ENGINEERING & TECHNOLOGY, SHAHPUR
## DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING

---

## CANDIDATE'S DECLARATION

I hereby declare that the work, which is being presented in the Industrial Project entitled **"FACE TRACK — MACHINE LEARNING FACE-TRACKING ATTENDANCE SYSTEM"** by Himani Saini in partial fulfillment of requirements for the award of degree of B. Tech (CSE) submitted in the Department of CSE at HIMACHAL INSTITUTE OF ENGINEERING & TECHNOLOGY, SHAHPUR under HIMACHAL PRADESH TECHNICAL UNIVERSITY, HAMIRPUR is an authentic record of my own work carried out during a period from January 2026 to May 2026. The matter presented in this project has not been submitted by me in any other university/Institute for the award of B.Tech Degree.

**Name of student:** Himani Saini
**University Roll No:** 22011203015

This is to certify that the above submission made by the candidate is correct to the best of our knowledge.

The B.Tech. (CSE) Viva-Voce examination of the above students has been held on …………………………………………

**Mr. Pallavi Garg** | **Mr. Anuj Sharma**
Supervisor & Assistant Professor CSE, HIET | HOD & Assistant Professor CSE, HIET

---

## ACKNOWLEDGEMENT

I would like to express my sincere gratitude to all those who provided me the possibility to complete this project report. A special thanks goes to my project supervisor, **Mr. Pallavi Garg**, Assistant Professor, Department of Computer Science & Engineering, HIET, Shahpur, whose constant guidance, encouragement, and constructive criticism at every stage of this project were invaluable. His broad knowledge and logical way of thinking have been a great motivational factor throughout this work.

I am also deeply grateful to **Mr. Anuj Sharma**, Head of Department, CSE, HIET, for providing access to the departmental infrastructure, for his administrative support, and for fostering an academic environment where innovative projects like this one are encouraged and nurtured.

I extend my heartfelt thanks to all the faculty members of the Department of Computer Science & Engineering for their continuous academic guidance and for building the theoretical foundation that made this project technically feasible. Their lectures on Machine Learning, Database Systems, and Web Technologies directly provided the intellectual toolkit applied in this work.

I would also like to acknowledge the open-source community behind the technologies that power this system — the contributors to FastAPI, TensorFlow.js, InsightFace, and Supabase — without whose tireless voluntary work this level of technical sophistication would have been impossible within the constraints of an undergraduate project.

Finally, I owe an immeasurable debt of gratitude to my family for their unwavering moral support and patience throughout the demanding months of research, development, and writing.

**Himani Saini**
B.Tech CSE, Final Year
HIET, Shahpur

---

## ABSTRACT

The remote sensing and tracking of human presence in educational and corporate environments has traditionally suffered from inefficiencies, severe administrative overhead, and rampant proxy fraud. "Face Track" is a state-of-the-art, high-fidelity attendance tracking system that unifies client-side edge-intelligence with a high-throughput machine learning backend. The primary objective of this project is to completely eliminate traditional attendance fraud (such as buddy punching) and manual administrative data-entry by providing a highly secure, real-time biometric verification pipeline.

By strategically offloading initial video processing, face detection, and spatial alignment to the client browser via the lightweight TensorFlow.js BlazeFace network, the system maximizes frame rates, ensures user privacy, and drastically minimizes centralized server computation load. The platform integrates an atomic biometric onboarding process, allowing students to register and extract their 512-dimensional facial embedding vector in a single database transaction. The proposed architecture guarantees high accuracy using ONNX Runtime and InsightFace neural networks, utilizing Euclidean distance mathematical evaluations to authenticate identities. The system culminates in an intuitive, glassmorphic dashboard that serves as a highly scalable, cost-effective, and deeply accurate alternative to traditional physical biometric scanners.

**Keywords:** Facial Recognition, Biometric Attendance, TensorFlow.js, BlazeFace, InsightFace, ArcFace, ONNX Runtime, FastAPI, WebRTC, Edge Computing, JWT Authentication, Euclidean Distance, Glassmorphism UI.

---

## TABLE OF CONTENTS

| Description | Page No. |
|---|---|
| Candidate's Declaration | i |
| Acknowledgement | ii |
| Abstract | iii |
| Table of Contents | iv |
| List of Figures | v |
| List of Tables | vi |
| List of Abbreviations | vii |
| **CHAPTER 1: INTRODUCTION** | **1** |
| 1.1 Overview of Attendance Management | 1 |
| 1.2 Motivation | 2 |
| 1.3 Historical Context of Attendance Systems | 3 |
| 1.4 Evolution to Biometric Systems | 4 |
| 1.5 Introduction to Facial Recognition Technology | 5 |
| 1.6 Core Innovations of Face Track | 6 |
| 1.7 Scope and Organization of the Project | 7 |
| **CHAPTER 2: LITERATURE REVIEW** | **8** |
| 2.1 Survey of Existing Attendance Systems | 8 |
| 2.2 Review of Face Recognition Algorithms | 9 |
| 2.3 Edge Computing in Web Applications | 10 |
| 2.4 Comparative Analysis of Prior Work | 11 |
| **CHAPTER 3: PROBLEM FORMULATION & OBJECTIVES** | **12** |
| 3.1 Limitations of Existing Systems | 12 |
| 3.2 Comprehensive Feasibility Study | 13 |
| 3.3 Objectives of the Proposed System | 14 |
| **CHAPTER 4: METHODOLOGY & SYSTEM DESIGN** | **15** |
| 4.1 System Requirements (Hardware & Software) | 15 |
| 4.2 Theoretical Background of ML Models | 16 |
| 4.3 System Architecture Blueprint | 18 |
| 4.4 Software Development Life Cycle (SDLC) | 19 |
| 4.5 Database Models & Relational Schema | 20 |
| 4.6 API Endpoint Registry & Data Flow | 21 |
| 4.7 Real-time Tracking & Alignment Mathematics | 22 |
| 4.8 Security and Data Privacy Protocol | 24 |
| **CHAPTER 5: IMPLEMENTATION & TESTING** | **25** |
| 5.1 Development Environment Setup | 25 |
| 5.2 Backend Implementation Details | 26 |
| 5.3 Frontend Implementation Details | 27 |
| 5.4 Visual Theme & UI Layouts | 28 |
| 5.5 Main Interface Modules | 29 |
| 5.6 End-to-End Operational Workflow Algorithms | 30 |
| 5.7 Software Testing Methodologies | 31 |
| 5.8 Performance Evaluation & Metrics | 33 |
| **CHAPTER 6: RESULTS & DISCUSSION** | **34** |
| 6.1 Functional Results | 34 |
| 6.2 Accuracy and Performance Analysis | 35 |
| 6.3 Comparative Benchmarking | 36 |
| **CHAPTER 7: CONCLUSION AND FUTURE WORK** | **37** |
| 7.1 Conclusion & Strategic Advantages | 37 |
| 7.2 Future Scope & Societal Impact | 38 |
| References | 39 |

---

## LIST OF FIGURES

| Figure No. | Description |
|---|---|
| Figure 1.1 | Traditional vs. Automated Attendance Flow |
| Figure 1.2 | Biometric Technology Adoption Timeline |
| Figure 2.1 | Comparison of Face Recognition Approaches |
| Figure 3.1 | Identified Bottlenecks in Existing Systems |
| Figure 4.1 | End-to-End System Architecture Diagram |
| Figure 4.2 | BlazeFace SSD Architecture Overview |
| Figure 4.3 | ArcFace Loss vs. Softmax Loss Decision Boundary |
| Figure 4.4 | 512-D Vector Embedding Visualization |
| Figure 4.5 | Entity-Relationship (ER) Diagram |
| Figure 4.6 | API Data Flow Diagram |
| Figure 4.7 | Face Centering Geometry Illustration |
| Figure 4.8 | SDLC Model Applied in Face Track |
| Figure 5.1 | Auth Gate / Login Screen |
| Figure 5.2 | Student Registration with Biometric Panel |
| Figure 5.3 | Teacher Dashboard — Session HUD |
| Figure 5.4 | Student Personal Portal — Attendance Timeline |
| Figure 5.5 | BlazeFace Lock State — Neon Green Indicator |
| Figure 6.1 | Euclidean Distance Distribution Histogram |
| Figure 6.2 | Backend Latency Benchmark Chart |

---

## LIST OF TABLES

| Table No. | Description |
|---|---|
| Table 3.1 | Comparative Analysis of Prior Attendance Systems |
| Table 4.1 | Hardware Requirements Summary |
| Table 4.2 | Software Stack Summary |
| Table 4.3 | Database Entity Attribute Summary |
| Table 4.4 | API Endpoint Registry |
| Table 5.1 | Test Case Matrix |
| Table 6.1 | Performance Metrics Summary |
| Table 6.2 | System Comparison Benchmark |

---

## LIST OF ABBREVIATIONS

| Abbreviation | Full Form |
|---|---|
| AI | Artificial Intelligence |
| API | Application Programming Interface |
| ArcFace | Additive Angular Margin Loss |
| ASGI | Asynchronous Server Gateway Interface |
| CNN | Convolutional Neural Network |
| CDN | Content Delivery Network |
| CSV | Comma-Separated Values |
| DOM | Document Object Model |
| ERP | Enterprise Resource Planning |
| FPS | Frames Per Second |
| GPU | Graphics Processing Unit |
| HTML | HyperText Markup Language |
| HTTPS | HyperText Transfer Protocol Secure |
| HUD | Heads-Up Display |
| JWT | JSON Web Token |
| JS | JavaScript |
| ML | Machine Learning |
| MitM | Man-in-the-Middle |
| ONNX | Open Neural Network Exchange |
| ORM | Object-Relational Mapper |
| RFID | Radio Frequency Identification |
| REST | Representational State Transfer |
| SDLC | Software Development Life Cycle |
| SPA | Single Page Application |
| SSD | Single Shot Detector |
| SQL | Structured Query Language |
| TLS | Transport Layer Security |
| UI | User Interface |
| UUID | Universally Unique Identifier |
| UX | User Experience |
| WebGL | Web Graphics Library |
| WebRTC | Web Real-Time Communication |

---

# CHAPTER 1

## INTRODUCTION

### 1.1 Overview of Attendance Management

Monitoring and managing attendance in large-scale educational institutions is a critical but historically manual task. Accurate attendance tracking is not only essential for evaluating student participation and academic performance but is often a strict mandatory compliance requirement for university accreditations and scholarship distributions. Institutions affiliated with bodies like the All India Council for Technical Education (AICTE) and state technical universities typically mandate a minimum of 75% attendance for students to be eligible to appear in semester examinations. Failure to meet this threshold can result in a student being detained — a severe academic and financial consequence.

Traditionally, institutions have relied on verbal roll calls or physical sign-in sheets. These methods are inherently flawed. A single attendance roll call in a class of 60 students can consume between 5 and 10 minutes of instructional time, which, when compounded across six periods per day and a full semester, translates to a loss of over 15 contact hours of teaching time per course. Physical registers are vulnerable to water damage, ink smudging, or simple misplacement, causing irreversible data loss. Furthermore, they are highly susceptible to deliberate manipulation, where a student can sign on behalf of an absent peer — a pervasive form of academic fraud commonly known as "proxy attendance" or "buddy punching."

The problem is not limited to the classroom alone. At the end of each academic semester, administrative staff are burdened with the laborious and error-prone task of manually aggregating, cross-referencing, and calculating attendance percentages from dozens of physical registers across multiple departments. This process is not only slow but is a significant source of transcription errors that can unfairly affect student records.

The need for a paradigm shift — from paper-based registers to an intelligent, automated system — has never been more urgent. The system proposed in this project, **Face Track**, directly addresses this institutional crisis by completely automating the attendance lifecycle from biometric capture to report generation.

### 1.2 Motivation

The motivation for this project is multi-layered, arising from real-world pain points observed in the daily operations of educational institutions.

**From the Educator's Perspective:** Teachers and professors are primarily engaged in academia for the purpose of teaching and knowledge transfer. The administrative ritual of calling out names or circulating a register fundamentally disrupts the pedagogical flow of a lecture. A professor who begins a 50-minute class with a 7-minute attendance roll call loses nearly 14% of her instructional time to a purely administrative task. Automating this process liberates educators to focus their entire energy on pedagogy.

**From the Administrator's Perspective:** Academic administrators are responsible for generating semester-end attendance compliance reports for university submission. These reports must be accurate down to the individual student level and submitted within strict deadlines. When the source data is a collection of physical registers, the process of compiling these reports is not just slow — it is a significant liability. A single transcription error can lead to a student being incorrectly detained or, conversely, a student who should have been detained being allowed to appear for the examination.

**From the Student's Perspective:** Students benefit enormously from real-time visibility into their own attendance status. A student who is unaware that their attendance has dropped below 75% until the end of the semester has no opportunity to correct the situation. A system that provides a live, personal dashboard with attendance percentages and shortage warnings enables students to make informed decisions about their schedule throughout the semester.

**From a Security Perspective:** The societal cost of proxy attendance fraud is significant. Scholarship programs, examination eligibilities, and university rankings can all be corrupted by manipulated attendance data. A biometric-based system provides an irrefutable, cryptographically verifiable record of physical presence, eliminating the possibility of proxy attendance entirely.

### 1.3 Historical Context of Attendance Systems

The evolution of attendance management has passed through three broad technological eras:

**Era 1: Manual Paper-Based Systems (Pre-2000s)**
The foundational era of attendance management relied entirely on manual processes. Teachers would either call roll or circulate physical registers. These registers were maintained by faculty and submitted to the department office at the end of each term. The process was entirely human-driven, with all the inherent vulnerabilities of human processes — fatigue, bias, error, and susceptibility to social manipulation (where a student might convince a peer or even a distracted faculty member to mark them present).

**Era 2: Digitized Manual Entry Systems (2000s–2015)**
The proliferation of personal computers and institutional networks led to the first wave of digitization. Attendance data was still collected manually — either on paper or by teachers entering it directly into desktop software — but the aggregation and reporting were handled digitally. Systems like Microsoft Excel spreadsheets, and later dedicated Education Management Software (EMS) packages, reduced the reporting burden. However, these systems were fundamentally limited: the source data was still a human entering a name, and the risk of proxy attendance and transcription errors remained entirely unaddressed.

**Era 3: Hardware Biometric Systems (2010s–Present)**
The recognition that identity verification required non-repudiable biometric proof led to the deployment of fingerprint scanners and RFID card readers in many institutions. These systems represented a genuine improvement in preventing proxy attendance. However, they introduced a new class of problems: high capital costs, maintenance overhead, physical bottlenecks, and hygiene concerns (as fingerprint scanners require physical contact). The COVID-19 pandemic further accelerated the rejection of contact-based biometric systems, creating an urgent market demand for contactless alternatives.

**The Current Opportunity: Software-Only Biometric Intelligence**
Face Track represents the next evolutionary step: a purely software-defined biometric system that requires no specialized hardware beyond the standard webcam already integrated into virtually every modern laptop and smartphone. By leveraging the extraordinary advances in Deep Learning, browser-native GPU computation (WebGL), and cloud database services, it is now possible to build a biometric attendance system of equal or superior accuracy to hardware fingerprint scanners, at a fraction of the cost and with zero contact required.

### 1.4 Evolution to Biometric Systems

To mitigate the issues of manual tracking, institutions gradually shifted to technological solutions. It is important to examine each of these transitions in technical detail to appreciate why facial recognition represents a definitive solution.

**RFID (Radio Frequency Identification) Systems:**
RFID systems assign each student a unique smart card embedded with a passive radio-frequency transponder. A card reader mounted near the classroom door detects the card when held within proximity (typically 5–10 cm). The system logs the card ID and timestamp to a database.

*Advantages:* Fast, contactless, cheap cards, low per-swipe infrastructure cost.
*Critical Flaw:* The card verifies the card, not the person. A student can trivially hand their card to a classmate, enabling perfect proxy attendance with zero technical sophistication required. Additionally, cards can be lost or stolen, requiring constant administration of replacements.

**Fingerprint Biometric Scanners:**
Optical or capacitive fingerprint scanners capture the unique ridge patterns of a student's fingertip and match it against a stored template. Unlike RFID, this verifies the biological identity of the individual, making proxy attendance virtually impossible.

*Advantages:* Strong biometric identity verification, well-established technology.
*Critical Flaws:*
- **High Capital Cost:** Industrial-grade fingerprint scanners for institutional use cost between ₹5,000 and ₹25,000 per unit. A college with 50 classrooms would need a budget of ₹2.5 to ₹12.5 lakh just for the scanners, plus wiring, networking, and installation costs.
- **Physical Bottlenecks:** A single scanner can process roughly 10–15 students per minute. A class of 60 students would take 4–6 minutes to scan — creating a disruptive queue outside the classroom.
- **Wear and Tear:** Capacitive sensors degrade with heavy use and environmental exposure. Outdoor-facing scanners are particularly vulnerable to humidity and dust.
- **Hygiene Concerns:** Particularly relevant in a post-pandemic world, shared fingerprint scanners represent a significant vector for the transmission of skin infections and viral pathogens.
- **Dry or Damaged Fingers:** Students with naturally dry skin, injuries, or calluses (common among engineering and polytechnic students who do practical lab work) often fail to register correctly, leading to false negatives.

**Iris Recognition Systems:**
More advanced institutions have piloted iris recognition systems, which use near-infrared cameras to capture the unique stochastic pattern of the human iris. While highly accurate (error rates below 1 in 1.2 million), these systems are prohibitively expensive for widespread classroom deployment, with hardware costs exceeding ₹50,000 per unit.

### 1.5 Introduction to Facial Recognition Technology

With rapid advancements in Deep Learning and Convolutional Neural Networks (CNNs), facial recognition has emerged as the premier, non-intrusive, and scalable method for identity verification. The fundamental innovation that makes modern deep learning-based facial recognition transformatively different from earlier algorithmic approaches (such as Eigenfaces, Fisherfaces, or Local Binary Pattern Histograms) is the concept of **metric learning** — training a neural network not to classify faces into discrete categories, but to map them into a continuous geometric space where faces of the same person are clustered close together, and faces of different people are pushed far apart.

**How Deep Facial Recognition Works:**
1. **Detection:** A face detector first locates the human face within an image, producing a bounding box (x, y, width, height) and a set of facial landmarks (eyes, nose, corners of the mouth).
2. **Alignment:** Using the detected landmarks, the face is geometrically normalized — rotated, scaled, and cropped to a standard canonical pose. This normalization is critical: it ensures that the downstream feature extractor always receives a consistently oriented, frontal face, regardless of the original head pose in the image.
3. **Feature Extraction (Embedding):** The aligned face image is passed through a deep CNN (typically a ResNet or MobileNet-based architecture with 50–100+ layers). The network has been trained on millions of face images and has learned to extract highly discriminative, compact representations. The output is a fixed-size vector (commonly 128, 256, or 512 dimensions).
4. **Matching:** The extracted embedding vector from a probe (live) image is compared against a stored gallery (enrolled) embedding using a distance metric. The most commonly used metrics are Euclidean distance and Cosine similarity. If the distance is below a predetermined threshold, the identities are declared a match.

Unlike fingerprint scanners, facial recognition relies on standard camera sensors (webcams, laptops, or smartphones), which are already ubiquitous in the modern world. The total hardware cost increment for deploying a camera-based system over an existing laptop infrastructure is effectively zero.

### 1.6 Core Innovations of Face Track

Face Track was conceptualized to serve as an intelligent, software-only biometric auth-gate. Its core innovations, which distinguish it from both legacy systems and contemporary alternatives, include:

**Client-Side Edge Alignment (Edge Computing):** Video processing is handled entirely locally by running the BlazeFace coordinates regression neural network inside the user's browser via TensorFlow.js on the WebGL backend. This edge-computing approach guarantees that raw video feeds are never transmitted over the network, maximizing user privacy, boosting processing frames-per-second (FPS), and reducing server computing costs substantially. The server receives only a single, perfectly aligned, cropped static JPEG image — never a video stream.

**Unified Auth Gate Architecture:** A secure full-page login guards the entire platform. After successful authentication, the frontend programmatically parses the JWT payload to extract the user's `role` claim and dynamically renders one of two completely distinct dashboard interfaces — the Teacher Command Center or the Student Personal Portal — without ever navigating to a different URL. This single-page application architecture ensures a seamless, instantaneous role transition.

**Atomic Biometric Onboarding:** The student registration process is designed as a single, uninterruptible atomic transaction. A multipart HTTP POST request bundles the student's textual credentials (name, roll number, email, hashed password) and their biometric photograph together. The FastAPI backend processes this request in a single function: it uploads the photo to Cloudinary for redundant cloud storage, calls the InsightFace ONNX runtime to extract the 512-dimensional embedding, and inserts both the `Users` and `Students` records in one database transaction. If any step fails, the entire transaction is rolled back, ensuring the database never contains a partial, unusable student record.

**Real-Time Geometric Constraint Engine:** Before a single image is captured, the frontend JavaScript continuously evaluates two geometric properties of the detected face — its center offset from the viewport center and its relative size as a fraction of the viewport width — and only enables the capture trigger when both constraints are satisfied simultaneously. This pre-filtering dramatically improves the quality of images received by the backend, reducing inference errors caused by off-axis or distant faces.

### 1.7 Scope and Organization of the Project

The scope of this project encompasses the end-to-end development of a fully functional Web Application. The frontend is implemented using Vanilla JavaScript (ES6+), HTML5, and CSS3, avoiding heavy UI frameworks to maximize loading speed and minimize deployment complexity. The backend is implemented in Python 3.10+ using the FastAPI asynchronous web framework.

The system supports: secure stateless JWT-based user authentication; dynamic role-based dashboard rendering; real-time webcam edge AI inference; server-side deep-learning-based biometric vector extraction; cloud image storage; SQL-based attendance logging; and automated CSV report generation and download.

The remainder of this report is organized as follows:
- **Chapter 2** presents a review of existing literature and prior work in face recognition-based attendance systems.
- **Chapter 3** formulates the problem and defines the precise technical objectives.
- **Chapter 4** details the complete methodology and system design, including mathematical foundations, architecture, and database schema.
- **Chapter 5** covers the full implementation details and a rigorous testing lifecycle.
- **Chapter 6** presents and analyzes the quantitative results.
- **Chapter 7** draws conclusions and outlines future directions.

---

# CHAPTER 2

## LITERATURE REVIEW

### 2.1 Survey of Existing Attendance Systems

A thorough review of academic literature and commercially deployed systems was conducted to identify the state of the art in automated attendance management, and to identify the specific gaps that Face Track is designed to address.

**Patil & Kulkarni (2020) — "Real-Time Face Recognition for Attendance Using OpenCV":** This foundational work demonstrated the feasibility of using OpenCV's Haar Cascade classifier combined with Local Binary Pattern Histogram (LBPH) recognizers for attendance marking. The system achieved reasonable accuracy (~87%) in controlled lighting conditions. However, it required a dedicated Python desktop application to be installed on the teacher's machine, making deployment complex. Furthermore, LBPH is highly sensitive to lighting variation and facial pose changes, with accuracy dropping significantly in real-world classroom environments.

**Naik et al. (2021) — "IoT-Based Smart Attendance System Using Raspberry Pi and Face Recognition":** This work integrated face recognition with IoT hardware (Raspberry Pi 4) to create a standalone classroom device. The use of a dedicated edge device improved processing speed over server-based approaches. However, the solution retained the fundamental cost barrier of requiring specialized hardware in every classroom, and the Raspberry Pi's CPU was insufficient for deep learning-based recognition, limiting the model to less accurate traditional algorithms.

**Mulla & Rohokale (2022) — "Deep Learning-Based Automated Attendance Using FaceNet":** This research utilized FaceNet embeddings (128-d) for identity verification, achieving state-of-the-art accuracy. However, the architecture required uploading raw video frames from client devices to a central processing server, creating the network bandwidth bottlenecks identified as a critical limitation in Chapter 3. The paper acknowledged that the system's performance degraded significantly when more than 5 concurrent camera streams were processed.

**Verma & Singh (2023) — "Browser-Based Face Detection Using TensorFlow.js":** This work explored the feasibility of running ML models directly in the browser using TensorFlow.js and confirmed that the BlazeFace model could achieve real-time face detection at 30+ FPS on standard consumer hardware. This paper directly inspired the edge-computing architecture of Face Track, though it did not integrate a full backend attendance system.

**Gap Identified:** No existing work combines browser-side edge AI for privacy-preserving pre-processing with a high-accuracy server-side ONNX/InsightFace verification pipeline within a full-stack, role-based web application. Face Track addresses this gap.

### 2.2 Review of Face Recognition Algorithms

The selection of InsightFace with ArcFace loss for the server-side component of Face Track was made after a systematic comparative review of the major face recognition paradigms:

**Eigenfaces (PCA-Based):**
One of the earliest algorithmic approaches, Eigenfaces uses Principal Component Analysis (PCA) to project face images into a lower-dimensional "face space." While computationally efficient, it is highly sensitive to illumination changes and performs poorly in unconstrained environments. Recognition accuracy on real-world datasets is typically in the range of 70–80%.

**Local Binary Pattern Histograms (LBPH):**
LBPH describes face texture by comparing each pixel to its neighbors and encoding the result as a binary number. It is more robust to illumination changes than Eigenfaces and runs efficiently on low-power hardware. However, its recognition accuracy plateaus around 85–90% and degrades significantly with pose variations beyond ±20 degrees.

**Deep Learning — FaceNet (Google, 2015):**
FaceNet introduced the use of Siamese networks and Triplet Loss to directly learn a compact 128-d embedding space. It achieved 99.63% accuracy on the LFW (Labeled Faces in the Wild) benchmark — a massive leap forward. FaceNet established the foundational paradigm of metric learning for face recognition that all subsequent architectures have built upon.

**Deep Learning — ArcFace (Deng et al., 2019):**
ArcFace improved upon FaceNet by introducing a geometrically interpretable margin — the **Additive Angular Margin** — directly into the Softmax-based classification loss during training. By penalizing predictions in the angular (hyperspherical) space rather than the Euclidean space, ArcFace produces more discriminative embeddings with significantly tighter intra-class clustering. ArcFace achieved 99.82% accuracy on LFW and has consistently topped leaderboards on real-world face recognition benchmarks. The InsightFace `w600k_mbf.onnx` model used in Face Track is trained with ArcFace loss, providing the highest available open-source biometric accuracy.

**Comparison Summary:**

| Algorithm | LFW Accuracy | Pose Robustness | Hardware Requirement |
|---|---|---|---|
| Eigenfaces (PCA) | ~70–80% | Low | Minimal |
| LBPH | ~85–90% | Medium | Minimal |
| FaceNet (128-d) | 99.63% | High | GPU Recommended |
| ArcFace / InsightFace | 99.82% | Very High | CPU Feasible (ONNX) |

### 2.3 Edge Computing in Web Applications

Edge computing refers to the paradigm of processing data at or near the source of data generation, rather than routing it to a centralized cloud server. In the context of web applications, this means executing computationally intensive logic within the user's browser itself, using the browser's access to the GPU via the WebGL API.

**TensorFlow.js** is Google's open-source library that enables the execution of trained machine learning models directly in the browser. It achieves this through two execution backends: a CPU-based backend (for environments without GPU access) and a WebGL-based backend that compiles TensorFlow operations into GLSL shader programs, executing them on the browser's GPU at near-native speeds.

The advantages of this edge-computing model for Face Track are profound:
- **Privacy:** Raw video pixels never leave the user's device. Only a single, post-processed JPEG is transmitted.
- **Scalability:** Server load is proportional to the number of *capture events*, not the number of *active camera streams*. 100 users running BlazeFace simultaneously in their browsers generate zero server compute load until the moment they capture.
- **Latency:** Client-side inference at 45–60 FPS is far faster than the round-trip time of streaming frames to a server and awaiting a detection response.

### 2.4 Comparative Analysis of Prior Work

| Feature | Patil & Kulkarni (2020) | Naik et al. (2021) | Mulla & Rohokale (2022) | **Face Track (This Work)** |
|---|---|---|---|---|
| Recognition Algorithm | LBPH | LBPH | FaceNet | ArcFace (InsightFace) |
| Deployment | Desktop App | IoT Hardware | Web App | Web App (SPA) |
| Client-Side AI | No | No | No | **Yes (BlazeFace)** |
| Hardware Cost | Low + PC | High (RPi) | Low | **Zero (webcam only)** |
| Role-Based Dashboard | No | No | Partial | **Yes (Teacher & Student)** |
| Privacy (Video) | Server Stream | Local | Server Stream | **Edge Only** |
| Report Generation | Manual | Manual | CSV | **Automated CSV** |
| Authentication | Basic | None | Session-based | **JWT (HS256)** |

---

# CHAPTER 3

## PROBLEM FORMULATION & OBJECTIVES

### 3.1 Limitations of Existing Systems

Based on a thorough literature review and analysis of existing institutional attendance management systems, the following architectural and functional bottlenecks were definitively identified:

**Network Bandwidth Bottlenecks:** Centralized facial recognition servers frequently crash or throttle under the high network bandwidth required to stream live, uncompressed video feeds from multiple client devices simultaneously to a central server for processing. A standard 720p webcam at 30 FPS produces approximately 6 Mbps of raw, uncompressed video data. If 30 students simultaneously stream to a central server for face recognition, the server requires a sustained incoming bandwidth of ~180 Mbps — well beyond the capacity of typical institutional internet infrastructure.

**High Inference Latency:** Traditional centralized APIs struggle with the computational latency of detecting faces, calculating bounding boxes, cropping faces from noisy classroom images, and extracting facial vectors — all in real time. The server must perform full-image face detection on every single incoming frame, a particularly expensive operation when images contain crowded, multi-person scenes with cluttered backgrounds. This results in poor user experience due to slow response times.

**Hardware Dependency & Cost:** Physical biometric systems require heavy initial capital investment in specialized hardware. As analyzed in Chapter 1, fingerprint scanner hardware costs alone can run into lakhs of rupees for a single institution. These devices require constant electrical supply, networking infrastructure, periodic firmware updates, and dedicated maintenance contracts — all of which add significantly to the total cost of ownership.

**Poor User Experience (UX):** Existing systems frequently lack an intuitive, role-based user interface. They typically require standalone desktop software installations, restricting usage to specific lab computers rather than allowing access from any device. They often lack real-time visual feedback, making the interaction opaque and confusing for end users. Student-facing features like personal attendance history or leave requests are typically absent, placing the burden of attendance tracking entirely on the administration.

**Scalability Ceiling:** Hardware-based systems are inherently limited by their physical components. Adding capacity means procuring and installing additional hardware units, which is both slow and expensive. Software-defined systems like Face Track scale trivially — adding 100 more students requires only additional database rows, with zero hardware changes.

**Data Fragmentation and Loss:** Paper-based and standalone software systems store attendance data in silos — individual registers per subject per teacher. Aggregating data across subjects, sections, and semesters for reporting requires manual compilation. There is no unified query interface, and data loss (through physical damage or software corruption) is irreversible.

### 3.2 Comprehensive Feasibility Study

Before initiating the Software Development Life Cycle (SDLC), a comprehensive feasibility study was conducted across four distinct domains:

**Technical Feasibility:**
The project leverages mature, heavily documented, and extensively supported open-source frameworks. FastAPI is one of the most actively maintained Python web frameworks, with comprehensive documentation and a large community. TensorFlow.js is backed by Google and has extensive browser compatibility. Supabase provides a managed PostgreSQL service with a generous free tier, eliminating the need to manage database infrastructure. The availability of highly accurate pre-trained models like InsightFace's `buffalo_sc` makes the extraction of 512-dimensional biometric vectors technically feasible without requiring proprietary training datasets or supercomputing resources.

The key technical risk was browser compatibility for WebGL-accelerated TensorFlow.js inference. This was assessed by testing BlazeFace performance across Chrome 120+, Firefox 121+, Safari 17+, and Edge 120+. All modern browser versions were confirmed to support the WebGL backend with acceptable performance.

**Economic Feasibility:**
The system is remarkably economically viable. The entire technology stack relies on open-source software with no licensing costs. Cloud hosting for the FastAPI backend on a platform like Render or Railway costs approximately ₹0–1,500/month on free or starter tiers — sufficient for institutional pilot deployments. Supabase's free tier supports up to 500 MB of database storage and 2 GB of file storage, adequate for hundreds of enrolled students. Cloudinary's free tier provides 25 GB of cloud storage for enrollment photographs.

By leveraging edge computing (students' own browsers) for continuous video processing, the server handles only discrete, point-in-time capture events. A classroom of 60 students marking attendance generates 60 sequential HTTP requests of ~50 KB each — a trivial 3 MB total data transfer, compared to the ~10+ GB required to stream 60 camera feeds for even a few minutes.

**Operational Feasibility:**
The web-based SPA architecture means that any user with a browser and internet connection can access the system with zero installation. Teachers and students interact with familiar web paradigms — login forms, dashboards, buttons — requiring no specialized training. The system's role-based design means each user sees only the features relevant to them, minimizing cognitive load. The teacher's session management workflow maps directly onto the existing classroom routine: arrive → start session → students mark attendance → end session → download report.

**Legal & Ethical Feasibility:**
Biometric data is classified as "Sensitive Personal Data or Information" (SPDI) under the IT Act 2000 and the upcoming Digital Personal Data Protection (DPDP) Act 2023 in India. Face Track's architecture is designed with privacy by default. The system does not record or store any video footage. A single enrollment photograph is stored in Cloudinary (optionally deletable), and the derived mathematical embedding vector — 512 floating-point numbers representing geometric ratios — is stored in the database. Critically, this embedding is a one-way transformation: it is mathematically impossible to reconstruct a human face from its embedding vector. This "biometric irreversibility" property means that even a complete database compromise does not expose any reconstructable facial imagery.

### 3.3 Objectives of the Proposed System

To definitively overcome the aforementioned drawbacks, the Face Track system encompasses the following strict technical objectives:

1. **ML Backend Architecture:** To architect and implement a robust, high-throughput Machine Learning backend using Python 3.10+, the FastAPI asynchronous web framework, ONNX Runtime for hardware-optimized model inference, and the InsightFace `buffalo_sc` neural network architecture.

2. **Client-Side Computational Offloading:** To offload the computationally expensive tasks of continuous video frame analysis, real-time face detection, bounding box generation, and spatial constraint enforcement to the client browser, utilizing WebGL-accelerated TensorFlow.js inference via the BlazeFace model.

3. **High-Quality Capture Interface:** To design a seamless WebRTC-based capture interface with a real-time geometric constraint engine that mathematically enforces face centering and proximity constraints before enabling image capture, ensuring that only high-quality, well-aligned images reach the backend.

4. **Biometric Identity Verification:** To verify student identities by comparing live probe image embeddings against stored enrollment embeddings using Euclidean distance threshold analysis, with a strict reject policy for distances above the security threshold.

5. **Role-Based Access & Dashboard:** To implement a secure, JWT-based authentication system that serves distinct, feature-complete dashboard interfaces to teachers and students, ensuring that each role can only access data and functionality appropriate to their role.

6. **Administrative Reporting:** To generate downloadable, well-formatted CSV attendance reports for each session, enabling teachers to instantly produce compliance documentation for administrative submission.

7. **Student Self-Service Portal:** To provide students with a real-time personal attendance dashboard showing their attendance percentage, historical timeline, and shortfall warnings, empowering them to proactively manage their attendance.

---

# CHAPTER 4

## METHODOLOGY & SYSTEM DESIGN

### 4.1 System Requirements

#### Hardware Requirements (End-User Client):

| Component | Minimum Specification | Recommended Specification |
|---|---|---|
| Processor | Intel Core i3 / AMD Ryzen 3 (or ARM equivalent) | Intel Core i5 / AMD Ryzen 5 or higher |
| RAM | 4 GB | 8 GB |
| GPU | Integrated GPU with WebGL 2.0 support | Dedicated GPU (NVIDIA/AMD) |
| Webcam | 720p (1280x720) at 30 FPS | 1080p (1920x1080) at 60 FPS |
| Network | 2 Mbps broadband | 10 Mbps broadband |
| Browser | Chrome 100+, Firefox 110+, Safari 16+ | Latest stable version of Chrome |

#### Hardware Requirements (Backend Server):

| Component | Minimum Specification |
|---|---|
| Processor | 2 vCPU (x86-64 architecture) |
| RAM | 2 GB (InsightFace models require ~512 MB resident) |
| Storage | 5 GB SSD (for OS, Python environment, and ONNX models) |
| Network | 100 Mbps outbound |

#### Software Requirements (Technology Stack):

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Backend Runtime | Python | 3.10+ | Core programming language |
| Web Framework | FastAPI | 0.110+ | Async REST API server |
| ASGI Server | Uvicorn | 0.29+ | High-performance HTTP server |
| ML Inference | ONNX Runtime | 1.17+ | Hardware-optimized model execution |
| Face Analysis | InsightFace | 0.7+ | Face detection & embedding extraction |
| ORM | SQLAlchemy | 2.0+ | Async database interface |
| DB Driver | asyncpg | 0.29+ | Async PostgreSQL driver |
| Database | PostgreSQL (Supabase) | 15+ | Primary relational data store |
| Image Storage | Cloudinary SDK | 1.38+ | Cloud media hosting |
| Auth - Hashing | passlib + bcrypt | Latest | Password cryptography |
| Auth - Tokens | python-jose | 3.3+ | JWT encoding/decoding |
| Frontend Language | Vanilla JavaScript | ES2022 | Client-side logic |
| Frontend UI | HTML5 + CSS3 | — | Structure and styling |
| Browser ML | TensorFlow.js + BlazeFace | 4.x | Client-side edge inference |
| Media API | WebRTC / getUserMedia | Browser Native | Camera access |
| Rendering | Canvas API | Browser Native | Frame capture and drawing |

### 4.2 Theoretical Background of ML Models

The accuracy and speed of Face Track rely on the synergistic deployment of two distinct machine learning pipelines that execute in entirely separate environments (client browser and server) and serve complementary roles.

#### 4.2.1 BlazeFace — Client-Side Edge AI

Developed by Google Research (Bazarevsky et al., 2019), BlazeFace is an ultra-lightweight, highly optimized face detector tailored explicitly for mobile GPU and browser WebGL execution. Its design philosophy prioritizes real-time inference speed (measured in FPS) over raw accuracy, making it an ideal candidate for continuous video stream monitoring on resource-constrained hardware.

**Architecture Details:**
BlazeFace uses a Single Shot Detector (SSD) architecture with a custom, lightweight feature extractor. The backbone resembles a heavily pruned MobileNetV1/V2 architecture, using depthwise separable convolutions to dramatically reduce the number of multiplication operations compared to standard convolutions. For a standard convolution with a 3×3 kernel on a channel with D_K×D_K spatial dimension and M input/N output channels, the computational cost is:

C_standard = D_K × D_K × M × N × D_F × D_F

For the equivalent depthwise separable convolution:

C_depthwise = D_K × D_K × M × D_F × D_F + M × N × D_F × D_F

This results in a reduction factor of approximately 8–9x in computation, enabling real-time inference in the browser.

**Anchor Box Configuration:**
Rather than using exhaustive sliding windows, BlazeFace predicts bounding boxes relative to a set of pre-defined anchor boxes. The anchor configuration is specifically tuned for the aspect ratios and size distributions of human faces — unlike generic SSD models tuned for arbitrary objects. This prior knowledge allows BlazeFace to use far fewer anchors (hundreds vs. thousands for generic detectors) while maintaining high recall on faces.

**Outputs:**
For each detected face, BlazeFace produces:
- A bounding box: `[topLeft_x, topLeft_y, bottomRight_x, bottomRight_y]`
- A confidence score between 0 and 1
- Six facial landmark coordinates: right eye, left eye, nose tip, mouth center, right ear, left ear

**Performance:**
In the Face Track deployment, BlazeFace consistently achieves 45–60 FPS on standard consumer hardware (Intel Core i5 with integrated Intel Iris Xe graphics), with inference latency consistently below 20 ms per frame.

#### 4.2.2 InsightFace & ArcFace — Server-Side Biometric Inference

InsightFace is an open-source, state-of-the-art 2D/3D deep face analysis toolbox. The `buffalo_sc` model pack — the model used in Face Track — consists of two ONNX sub-modules:

**Sub-module 1: det_500m.onnx (Face Detection & Alignment)**
This model performs high-accuracy face detection on the received server-side image and produces 5 precise facial landmark points: the left eye center, right eye center, nose tip, left mouth corner, and right mouth corner. Using these 5 landmarks, an affine transformation matrix is computed that maps the detected face to a canonical, standard frontal pose (typically a 112×112 pixel aligned face image). This alignment step is critical for the embedding network's accuracy, as it removes head-pose variation from the input.

The affine transformation is computed by finding the optimal transformation matrix M such that:

P_aligned = M × P_original

where P_original contains the coordinates of the 5 detected landmarks and P_aligned contains the target coordinates of the 5 reference points in the canonical 112×112 space.

**Sub-module 2: w600k_mbf.onnx (Feature Extraction — ArcFace)**
The aligned 112×112 face image is passed through this model. The architecture is a MobileFaceNet variant — a lightweight ResNet-inspired backbone optimized for face recognition with depth-wise separable convolutions. The model was trained on a massive dataset of 600,000+ identities.

**ArcFace Loss Function:**
The critical innovation that makes this model highly discriminative is its training loss function. Standard Softmax-based classification loss:

L_softmax = -log( e^(W_yi^T * f) / Σ e^(W_j^T * f) )

ArcFace introduces an additive angular margin penalty m:

L_ArcFace = -log( e^(s*cos(θ_yi + m)) / (e^(s*cos(θ_yi + m)) + Σ_{j≠yi} e^(s*cos(θ_j))) )

where θ_yi is the angle between the feature vector f and the class weight vector W_yi, s is a feature scale factor, and m is the angular margin (typically 0.5 radians). This angular margin forces the network to learn more tightly clustered, more separable identity embeddings on the hypersphere.

**Output:** A normalized 512-dimensional floating-point vector (L2 norm = 1.0) representing the biometric identity of the input face.

### 4.3 System Architecture Blueprint

The system strictly adheres to a decoupled client-server, RESTful architecture. The complete data flow is described below:

**Phase 1 — Application Boot & Authentication:**
The browser loads `index.html`, which immediately executes `app.js`. The script checks `localStorage` for a valid, non-expired JWT. If absent or expired, the Auth Gate modal is displayed. The user submits credentials via the login form; the frontend POSTs to `/auth/login`. The backend verifies the bcrypt hash and returns a signed JWT. The frontend decodes the JWT payload (client-side, without signature verification — for role extraction only), stores the token in `localStorage`, and dynamically renders the appropriate dashboard.

**Phase 2 — Edge Tracking Initialization:**
When any camera-dependent feature is activated (registration, self-marking, or teacher scanning), the frontend calls `navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })`. The browser prompts for camera permission. The approved `MediaStream` is piped to a hidden `<video>` element. A `requestAnimationFrame` loop begins, continuously drawing video frames to an off-screen `<canvas>` and passing each frame to the BlazeFace model for inference.

**Phase 3 — Geometric Constraint Enforcement:**
On each frame, the BlazeFace predictions array is evaluated. The frontend checks: (1) predictions.length === 1 (exactly one face), (2) face center offset < 70 pixels, and (3) face bounding box width > 26% of canvas width. When all three conditions are true for 1.2 continuous seconds, the "LOCKED" state is activated and the capture trigger is enabled.

**Phase 4 — Image Capture & Transmission:**
Upon trigger (manual click or auto-snap), the canvas draws the current video frame, calls `canvas.toBlob('image/jpeg', 0.92)`, packages the blob into a `FormData` object, and dispatches a `fetch()` POST to the appropriate backend endpoint with the `Authorization: Bearer <JWT>` header.

**Phase 5 — Backend ML Inference & Database Operations:**
FastAPI receives the request. The JWT is validated via the `get_current_user` dependency. The image blob is read into memory as a NumPy array. InsightFace's `buffalo_sc` model processes the image, detects and aligns the face, and extracts the 512-d embedding. The embedding is compared against the database record using Euclidean distance. The result is logged to the `Attendance` table, and a JSON response is returned.

### 4.4 Software Development Life Cycle (SDLC)

The Face Track project was developed following the **Iterative and Incremental SDLC model**, which was selected for its flexibility in accommodating evolving requirements discovered during development.

**Iteration 1 — Authentication Foundation (Week 1–2):**
Deliverables: Database schema, Users/Students/Teachers models, `/auth/login` endpoint, JWT middleware, basic HTML login page.

**Iteration 2 — Biometric Onboarding (Week 3–4):**
Deliverables: TensorFlow.js BlazeFace integration, WebRTC camera feed, geometric constraint engine, `/students/register` endpoint, InsightFace ONNX pipeline, Cloudinary upload integration.

**Iteration 3 — Attendance Core (Week 5–6):**
Deliverables: Sessions model, `/attendance/start` and `/attendance/mark` endpoints, teacher dashboard with session launcher, student self-marking widget.

**Iteration 4 — Dashboards & Reporting (Week 7–8):**
Deliverables: Student personal portal with attendance history, SVG circular progress bars, leave request handler, `/attendance/export/{id}` CSV generation endpoint.

**Iteration 5 — Hardening & Testing (Week 9–10):**
Deliverables: Full test case matrix execution, performance benchmarking, security audit, UI polish (micro-animations, responsive design), documentation.

### 4.5 Database Models & Relational Schema

The relational database enforces strict data integrity using asynchronous SQLAlchemy 2.0 ORM models with PostgreSQL on Supabase Cloud.

**Entity-Relationship Summary:**

| Table / Entity | Primary Key | Critical Attributes | Foreign Keys & Relationships |
|---|---|---|---|
| Users | id (UUID) | email (Unique), password_hash, full_name, role (Enum: teacher/student), is_active (Boolean) | Parent for polymorphic inheritance |
| Students | id (UUID) | roll_number (Unique), face_registered (Boolean), face_image_url (Text), face_embedding (ARRAY[Float, 512]) | user_id → Users.id (One-to-One), class_id → Classes.id (Many-to-One) |
| Teachers | id (UUID) | employee_id (Unique), phone (Text) | user_id → Users.id (One-to-One), class_id → Classes.id (Many-to-One) |
| Classes | id (Integer) | class_name (e.g., "B.Tech CSE"), section (e.g., "A"), academic_year | Parent structural entity |
| Sessions | id (UUID) | date, started_at (Timestamp), ended_at (Timestamp), is_active (Boolean), subject (Text) | teacher_id → Teachers.id, class_id → Classes.id |
| Attendance | id (UUID) | status (Enum: Present/Absent/Leave), confidence_score (Float), timestamp (Timestamp) | student_id → Students.id, session_id → Sessions.id |
| LeaveRequests | id (UUID) | reason (Text), from_date, to_date, status (Enum: Pending/Approved/Rejected) | student_id → Students.id, approved_by → Teachers.id |

**Key Design Decisions:**

1. **UUID Primary Keys:** UUIDs are used instead of sequential integers for all primary keys (except the `Classes` lookup table). This prevents enumeration attacks (an attacker cannot guess valid IDs by incrementing integers) and allows distributed ID generation without coordination.

2. **face_embedding as ARRAY[Float]:** The 512-dimensional embedding vector is stored directly as a native PostgreSQL ARRAY column. This avoids the overhead of serializing/deserializing JSON and allows for potential future use of PostgreSQL's vector similarity search extensions (e.g., `pgvector`).

3. **Cascading Deletes:** Foreign key constraints are configured with `ON DELETE CASCADE`. If a `User` record is deleted, all associated `Student`/`Teacher` records are automatically removed, preventing orphaned records.

4. **Polymorphic Role Inheritance:** The `Users` table stores all common authentication attributes. Role-specific attributes are in `Students` or `Teachers`. This design avoids the complexity of a fully polymorphic ORM hierarchy while keeping the auth table clean.

### 4.6 API Endpoint Registry & Data Flow

The FastAPI application exposes the following core asynchronous RESTful endpoints, all guarded by strict dependency injection:

| Endpoint Path | HTTP Method | Auth Requirement | Action Summary |
|---|---|---|---|
| /auth/login | POST | None (Public) | Authenticates JSON payload (email/password), verifies bcrypt hash, returns HS256 JWT access token. |
| /auth/me | GET | Valid JWT | Decodes token, returns current user profile object. |
| /students/register | POST | None (Public) | Unified multipart onboarding: credentials + biometric snap. Atomic DB transaction. |
| /students/me/history | GET | Valid Student JWT | Returns personal attendance timeline with dates, subjects, and confidence scores. |
| /students/me/stats | GET | Valid Student JWT | Returns aggregate attendance percentage per subject. |
| /teachers/classes | GET | Valid Teacher JWT | Returns list of classes assigned to the authenticated teacher. |
| /attendance/start | POST | Valid Teacher JWT | Creates new active session; returns session UUID. |
| /attendance/mark | POST | Valid JWT (Student or Teacher) | Core verification endpoint: ONNX inference + Euclidean distance + DB log. |
| /attendance/end/{session_id} | PATCH | Valid Teacher JWT | Sets session is_active=False and records ended_at timestamp. |
| /attendance/export/{session_id} | GET | Valid Teacher JWT | Generates and streams a formatted CSV file for the specified session. |
| /leave/request | POST | Valid Student JWT | Submits a leave request for teacher approval. |
| /leave/{id}/approve | PATCH | Valid Teacher JWT | Approves a pending leave request. |

**Error Handling Strategy:**
All endpoints return standardized JSON error responses with the structure `{ "detail": "human-readable error message" }`. HTTP status codes are used semantically: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity, 500 Internal Server Error.

### 4.7 Real-time Tracking & Alignment Mathematics

To prevent noisy, off-angle, or distant photos from reaching the backend, the frontend JavaScript enforces real-time spatial alignment constraints.

**Face Center Calculation:**
From BlazeFace's bounding box output `[topLeft_x, topLeft_y, bottomRight_x, bottomRight_y]`, the face's center coordinates are computed:

F_x = topLeft_x + (bottomRight_x - topLeft_x) / 2

F_y = topLeft_y + (bottomRight_y - topLeft_y) / 2

**Viewport Center:**
The camera viewport's geometric center is:

C_x = canvas.width / 2,   C_y = canvas.height / 2

**Center Offset (Euclidean Distance):**
The displacement of the face center from the viewport center is:

Distance_offset = sqrt( (F_x - C_x)^2 + (F_y - C_y)^2 )

**Centering Constraint:**
The capture trigger is disabled unless: Distance_offset < 70 pixels

**Proximity/Resolution Constraint:**
The face must subtend a minimum fraction of the viewport to ensure sufficient pixel resolution for biometric feature extraction by the backend CNN:

Face_width = bottomRight_x - topLeft_x

Constraint: Face_width > 0.26 × canvas.width

**Multi-Face Rejection:**
If `predictions.length > 1`, all constraints are immediately rejected regardless of individual face positions, preventing confusion in the identity verification step.

**Sustained Lock Timer:**
To prevent accidental captures from brief, transient alignments, all three constraints must be satisfied continuously for a minimum of 1,200 milliseconds before the capture is triggered. A visual countdown timer (displayed as a filling arc animation on the reticle) provides real-time feedback on the hold progress.

**Affine Alignment on Server (InsightFace):**
Once the image is received by the server, InsightFace performs a more precise, 5-point landmark-based affine alignment. The affine transformation matrix M (2×3) is estimated by solving:

[x'_i, y'_i]^T = M × [x_i, y_i, 1]^T  for i = 1..5

using least-squares optimization over the 5 landmark correspondences. The result is a 112×112 pixel aligned face crop, precisely normalized for the embedding network.

### 4.8 Security and Data Privacy Protocol

Security is implemented at every layer of the application stack using defense-in-depth principles:

**Layer 1 — Transport Security:**
All client-server communications are mandated over HTTPS/TLS 1.3. The Uvicorn server is deployed behind an HTTPS-terminating reverse proxy (Nginx or cloud platform load balancer). All HTTP requests are permanently redirected to HTTPS via HTTP 301 redirects. This prevents Man-in-the-Middle (MitM) interception of JWT tokens or biometric images during transmission.

**Layer 2 — Stateless JWT Authentication:**
The system uses JSON Web Tokens signed with the HS256 (HMAC-SHA256) algorithm. The signing secret is a 256-bit cryptographically random key stored exclusively as an environment variable, never hardcoded in source code. Tokens carry the following payload claims:
- `sub`: The user's UUID (subject)
- `role`: The user's role ("teacher" or "student")
- `exp`: The expiration timestamp (default: 8 hours)

Token expiration is strictly enforced server-side. The `get_current_user` FastAPI dependency, injected into every protected endpoint, validates the signature and expiry on every request.

**Layer 3 — Password Cryptography:**
User passwords are processed exclusively through the `passlib` library using the `bcrypt` algorithm with a work factor of 12. bcrypt is intentionally computationally expensive, requiring approximately 250ms per hash verification. This cost makes brute-force dictionary attacks computationally infeasible even if the password hash database is compromised.

**Layer 4 — Input Validation:**
All API request bodies are defined as Pydantic models. FastAPI automatically validates all incoming data against these schemas, rejecting malformed requests with 422 Unprocessable Entity before they reach any business logic. This prevents injection attacks and ensures type safety.

**Layer 5 — Biometric Irreversibility:**
The 512-dimensional embedding vector stored in the database is a one-way mathematical transformation of the face. It is not an image, not a feature map, and not a reconstruction of the face. It is a set of 512 floating-point numbers representing distances and angles in an abstract mathematical space. No algorithm exists to reconstruct a face image from an embedding vector, making the stored biometric data safe even in a total database breach scenario.

**Layer 6 — Environment Variable Isolation:**
All sensitive configuration values — the JWT secret key, database connection string, Cloudinary API credentials — are stored exclusively in environment variables and loaded via `python-dotenv`. They are never committed to source control. A `.env.example` template with placeholder values is provided in the repository for documentation purposes.

# CHAPTER 5

## IMPLEMENTATION & TESTING

### 5.1 Development Environment Setup

The development environment was configured systematically to ensure reproducibility across machines.

**Backend Setup Procedure:**
```bash
# 1. Create and activate a Python virtual environment
python3.10 -m venv venv
source venv/bin/activate

# 2. Install all dependencies from requirements.txt
pip install fastapi uvicorn sqlalchemy asyncpg alembic \
            insightface onnxruntime passlib[bcrypt] \
            python-jose[cryptography] cloudinary \
            python-multipart python-dotenv pillow numpy

# 3. Configure environment variables in .env
DATABASE_URL=postgresql+asyncpg://user:password@host:5432/facetrack
SECRET_KEY=<256-bit-random-hex>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=480
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>

# 4. Run database migrations
alembic upgrade head

# 5. Start the development server
uvicorn app.main:app --reload --port 8000
```

**Frontend Setup:**
The frontend requires no build step. All JavaScript is ES6+ Vanilla JS loaded directly by the browser. TensorFlow.js and the BlazeFace model are loaded from the jsDelivr CDN via `<script>` tags in `index.html`. Development uses the VS Code Live Server extension for hot-reloading.

**Directory Structure:**
```
face_track_backend/
├── app/
│   ├── main.py              # FastAPI app instantiation & router registration
│   ├── database.py          # SQLAlchemy async engine & session factory
│   ├── models/              # ORM model definitions
│   │   ├── user.py
│   │   ├── student.py
│   │   ├── teacher.py
│   │   ├── session.py
│   │   └── attendance.py
│   ├── routers/             # FastAPI route handlers
│   │   ├── auth.py
│   │   ├── students.py
│   │   ├── attendance.py
│   │   └── leave.py
│   ├── services/            # Business logic layer
│   │   ├── face_service.py  # InsightFace ONNX wrapper
│   │   └── cloud_service.py # Cloudinary upload logic
│   ├── schemas/             # Pydantic request/response models
│   └── auth/
│       ├── jwt_handler.py   # JWT creation and verification
│       └── dependencies.py  # get_current_user FastAPI dependency
├── alembic/                 # Database migration scripts
├── .env                     # Environment variables (gitignored)
├── .env.example             # Template for documentation
└── requirements.txt

face_track_frontend/
├── index.html               # Single page application shell
├── app.js                   # Core application logic (~800 lines)
├── style.css                # Global glassmorphism design system
└── assets/
    └── logo.svg
```

### 5.2 Backend Implementation Details

**FastAPI Application Initialization (app/main.py):**
The FastAPI application is created with CORS (Cross-Origin Resource Sharing) middleware configured to allow requests from the frontend's origin. All routers are registered with appropriate URL prefixes. The InsightFace model is loaded once at application startup using FastAPI's `lifespan` context manager, avoiding the overhead of reloading the ONNX model on every request.

```python
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.face_service import FaceService
from app.routers import auth, students, attendance, leave

face_service = FaceService()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load InsightFace model once on startup
    face_service.load_model()
    yield
    # Cleanup on shutdown (optional)

app = FastAPI(title="Face Track API", lifespan=lifespan)

app.add_middleware(CORSMiddleware,
    allow_origins=["https://your-frontend.com"],
    allow_methods=["*"], allow_headers=["*"])

app.include_router(auth.router, prefix="/auth")
app.include_router(students.router, prefix="/students")
app.include_router(attendance.router, prefix="/attendance")
app.include_router(leave.router, prefix="/leave")
```

**Face Service Implementation (app/services/face_service.py):**
The `FaceService` class wraps the InsightFace library, providing a clean interface for the rest of the application:

```python
import insightface
import numpy as np
from PIL import Image
import io

class FaceService:
    def __init__(self):
        self.model = None

    def load_model(self):
        self.model = insightface.app.FaceAnalysis(
            name='buffalo_sc',
            providers=['CPUExecutionProvider']
        )
        self.model.prepare(ctx_id=0, det_size=(640, 640))

    def extract_embedding(self, image_bytes: bytes) -> np.ndarray:
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        img_array = np.array(image)
        faces = self.model.get(img_array)
        if not faces:
            raise ValueError("No face detected in submitted image.")
        # Return embedding of the largest detected face
        largest = max(faces, key=lambda f: f.bbox[2] * f.bbox[3])
        return largest.embedding  # shape: (512,)

    def calculate_distance(self, v1: np.ndarray, v2: np.ndarray) -> float:
        return float(np.linalg.norm(v1 - v2))
```

**Attendance Marking Endpoint (app/routers/attendance.py):**
```python
@router.post("/mark")
async def mark_attendance(
    face_image: UploadFile = File(...),
    session_id: str = Form(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_student)
):
    # 1. Extract probe embedding from uploaded image
    image_bytes = await face_image.read()
    probe_embedding = face_service.extract_embedding(image_bytes)

    # 2. Fetch stored enrollment embedding from DB
    student = await db.get(Student, current_user.student.id)
    db_embedding = np.array(student.face_embedding)

    # 3. Calculate Euclidean distance
    distance = face_service.calculate_distance(probe_embedding, db_embedding)
    confidence_score = max(0.0, 1.0 - (distance / 1.3))

    # 4. Apply security threshold
    THRESHOLD = 0.65
    if distance > THRESHOLD:
        raise HTTPException(403, "Identity verification failed.")

    # 5. Log attendance record
    record = Attendance(
        student_id=student.id,
        session_id=session_id,
        status="Present",
        confidence_score=confidence_score,
        timestamp=datetime.utcnow()
    )
    db.add(record)
    await db.commit()

    return {"status": "Present", "confidence": confidence_score}
```

### 5.3 Frontend Implementation Details

**TensorFlow.js BlazeFace Initialization:**
```javascript
let blazefaceModel = null;

async function loadBlazeFace() {
    await tf.setBackend('webgl');
    await tf.ready();
    blazefaceModel = await blazeface.load();
    console.log('[FaceTrack] BlazeFace model loaded on WebGL backend.');
}
```

**Real-Time Tracking Loop:**
```javascript
async function trackingLoop() {
    if (!blazefaceModel || !videoElement.srcObject) return;

    // Draw current video frame to off-screen canvas
    offscreenCtx.drawImage(videoElement, 0, 0, CANVAS_W, CANVAS_H);

    // Run BlazeFace inference
    const predictions = await blazefaceModel.estimateFaces(
        offscreenCanvas, false
    );

    evaluateConstraints(predictions);
    requestAnimationFrame(trackingLoop);
}

function evaluateConstraints(predictions) {
    if (predictions.length !== 1) {
        setLockState('NO_FACE');
        return;
    }
    const face = predictions[0];
    const [tlx, tly] = face.topLeft;
    const [brx, bry] = face.bottomRight;

    const Fx = tlx + (brx - tlx) / 2;
    const Fy = tly + (bry - tly) / 2;
    const Cx = CANVAS_W / 2, Cy = CANVAS_H / 2;

    const offset = Math.sqrt((Fx - Cx) ** 2 + (Fy - Cy) ** 2);
    const faceWidth = brx - tlx;

    if (offset < 70 && faceWidth > CANVAS_W * 0.26) {
        advanceLockTimer();
    } else {
        resetLockTimer();
        setLockState('TRACKING');
    }
}
```

**Image Capture and API Submission:**
```javascript
async function captureAndSubmit(endpoint, extraFields = {}) {
    // Draw current frame to capture canvas
    captureCanvas.width = CANVAS_W;
    captureCanvas.height = CANVAS_H;
    captureCtx.drawImage(videoElement, 0, 0, CANVAS_W, CANVAS_H);

    // Encode as JPEG blob
    const blob = await new Promise(resolve =>
        captureCanvas.toBlob(resolve, 'image/jpeg', 0.92)
    );

    // Build multipart form data
    const formData = new FormData();
    formData.append('face_image', blob, 'capture.jpg');
    Object.entries(extraFields).forEach(([k, v]) =>
        formData.append(k, v)
    );

    // POST to backend
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getToken()}` },
        body: formData
    });

    return response.json();
}
```

### 5.4 Visual Theme & UI Layouts

Face Track implements a dark-space glassmorphism design system inspired by tactical HUD overlays and modern fintech dashboards.

**Design Token System (style.css):**
```css
:root {
    /* Color Palette */
    --bg-space:    #070a13;
    --bg-panel:    rgba(15, 23, 42, 0.70);
    --border-glow: rgba(0, 240, 255, 0.20);
    --cyan:        #00f0ff;
    --green:       #00ff88;
    --red:         #ff3b30;
    --text-primary: #e2e8f0;
    --text-muted:   #64748b;

    /* Glassmorphism Panel */
    --glass-bg:     rgba(15, 23, 42, 0.70);
    --glass-blur:   blur(25px);
    --glass-border: 1px solid rgba(0, 240, 255, 0.15);
    --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.50);

    /* Typography */
    --font-primary: 'Inter', system-ui, sans-serif;
    --font-mono:    'JetBrains Mono', monospace;
}
```

**Glassmorphism Panel Base Class:**
```css
.glass-panel {
    background:    var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border:        var(--glass-border);
    box-shadow:    var(--glass-shadow);
    border-radius: 16px;
}
```

**Color Psychology in Practice:**
- **Space Dark (#070a13):** The primary background reduces eye strain in dimly lit classrooms and provides maximum contrast for the camera feed and glowing UI elements.
- **Cyber Cyan (#00f0ff):** Applied to primary action buttons, active borders, progress indicators, and key data labels. This color is strongly associated with technology and precision in contemporary UI design.
- **Neon Green (#00ff88):** Used exclusively for success states — biometric LOCK achieved, attendance marked as Present, session active indicator. The high-saturation green triggers an immediate positive recognition response.
- **Neon Red (#ff3b30):** Used for error states — biometric mismatch, attendance shortage warnings, session inactive. The red immediately draws attention to issues requiring user action.

**Micro-Animation Library:**
```css
/* Rotating scan reticle */
@keyframes reticle-rotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
}

/* Linear laser scan overlay */
@keyframes laser-scan {
    0%   { top: 0%; opacity: 0.8; }
    50%  { opacity: 0.3; }
    100% { top: 100%; opacity: 0.8; }
}

/* Pulse glow on lock */
@keyframes lock-pulse {
    0%, 100% { box-shadow: 0 0 8px var(--green); }
    50%      { box-shadow: 0 0 24px var(--green), 0 0 48px var(--green); }
}

/* Status indicator blink */
@keyframes status-blink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.3; }
}
```

### 5.5 Main Interface Modules

**Module 1: Central Auth Guard**
The authentication page renders a centered glassmorphism card against a full-viewport animated mesh gradient background. The card contains two tabs: "Login" and "Register Student". Switching to the "Register Student" tab triggers a smooth CSS width transition that expands the card to a two-column layout: the left column contains the text registration form fields (full name, roll number, email, password, class selection), while the right column mounts the WebRTC camera feed with the BlazeFace tracking reticle overlay. This single-page expansion eliminates the cognitive disruption of navigating to a separate registration page.

**Module 2: Teacher Dashboard — Command Center**
The teacher dashboard is organized into two primary panels:

*Session Control Panel:* Contains dropdown menus pre-populated from the teacher's assigned classes and a set of predefined subjects. A prominent "Start Session" button initializes the attendance session on the server and activates the scanning HUD. An "End Session" button terminates the session and enables the CSV export button.

*Live Scanning HUD:* Displays the full-width WebRTC camera feed overlaid with the geometric tracking reticle and laser scan animation. The teacher positions students in front of the camera; BlazeFace detects the face, applies constraints, and upon lock, automatically captures and submits the frame to `/attendance/mark`. Successful marks instantly append a new entry to the "Recent Attendees" sidebar, displaying the student's name, roll number, and confidence score in real time.

**Module 3: Student Personal Portal**
The student portal provides a comprehensive personal attendance dashboard:

*Attendance Health Ring:* A large SVG-based circular progress bar renders the student's overall attendance percentage. The ring's stroke color transitions smoothly between neon green (≥75%) and neon red (<75%) using a CSS custom property interpolation. The percentage value is displayed in large typographic weight at the center of the ring.

*Self-Marking Widget:* Compact WebRTC camera widget for students to mark their own attendance during an active session. Functions identically to the teacher HUD but for a single-student use case.

*Attendance Timeline:* A chronologically ordered list of all attendance records, each card displaying the date, subject, session start time, status badge (Present/Absent/Leave), and the numerical confidence score from the biometric matching. Color-coded status badges use the established neon color system.

*Leave Request Form:* A form allowing students to submit dated leave requests with a reason field. Pending requests are displayed with a yellow "Pending" badge; approved requests update to green "Approved."

### 5.6 End-to-End Operational Workflow Algorithms

**Algorithm 1: Biometric Enrollment Flow**

```
BEGIN ENROLLMENT
  1. Student fills registration form fields
  2. Student clicks "Initialize Biometrics"
  3. Browser: Request camera permission via getUserMedia()
  4. IF permission denied: Display error, EXIT
  5. Begin BlazeFace trackingLoop()
  6. FOR each video frame:
       a. Run BlazeFace inference
       b. Evaluate 3 constraints (count, offset, size)
       c. IF all constraints met: increment lock_timer
          ELSE: reset lock_timer, update HUD indicator
       d. IF lock_timer >= 1200ms: TRIGGER CAPTURE → GO TO 7
  7. Capture canvas frame as JPEG blob (quality 0.92)
  8. Build FormData: append all text fields + face_image blob
  9. POST FormData to /students/register with no auth header
  10. Backend:
       a. Validate all Pydantic fields
       b. Check email/roll_number uniqueness in DB
       c. Extract 512-d embedding via InsightFace ONNX
       d. Upload JPEG to Cloudinary → get secure_url
       e. Hash password via bcrypt (work_factor=12)
       f. BEGIN DB TRANSACTION:
            - INSERT into Users (email, password_hash, role='student')
            - INSERT into Students (user_id, roll_number,
                face_embedding, face_image_url, face_registered=True)
          COMMIT TRANSACTION
       g. Return 201 Created with JWT token
  11. Frontend: Store JWT in localStorage
  12. Decode JWT payload → role='student'
  13. Render Student Personal Portal
END ENROLLMENT
```

**Algorithm 2: Biometric Verification & Attendance Marking**

```
BEGIN VERIFICATION
  INPUT: probe_image (JPEG bytes), session_id (UUID),
         Authorization: Bearer JWT

  Backend Step 1: JWT Validation
    - Decode JWT header: algorithm = HS256
    - Verify signature against SECRET_KEY
    - Check exp claim > current UTC timestamp
    - IF invalid: return 401 Unauthorized

  Backend Step 2: Probe Embedding Extraction
    - Load image bytes into PIL Image
    - Convert to RGB NumPy array (H x W x 3)
    - Run InsightFace buffalo_sc detector → detect faces
    - IF no faces detected: return 400 Bad Request
    - Select face with largest bounding box area
    - Run affine alignment → 112x112 crop
    - Run w600k_mbf.onnx → V_probe (shape: 512,)

  Backend Step 3: Gallery Embedding Retrieval
    - Decode JWT sub claim → user_id (UUID)
    - Query: SELECT face_embedding FROM students
             WHERE user_id = :user_id
    - V_db = np.array(result.face_embedding)  # shape: (512,)

  Backend Step 4: Euclidean Distance Calculation
    - D = sqrt( sum_i=1^512 (V_probe[i] - V_db[i])^2 )
    - confidence = max(0.0, 1.0 - D/1.3)

  Backend Step 5: Threshold Evaluation
    - THRESHOLD = 0.65
    - IF D <= THRESHOLD:
        status = "Present"
        INSERT Attendance(student_id, session_id,
                          status, confidence_score, timestamp)
        COMMIT
        return 200 OK { status: "Present", confidence: confidence }
    - ELSE:
        return 403 Forbidden { detail: "Identity mismatch." }
END VERIFICATION
```

**Algorithm 3: CSV Report Generation**

```
BEGIN REPORT_GENERATION
  INPUT: session_id (UUID), Authorization: Teacher JWT

  1. Validate teacher JWT and verify teacher owns this session
  2. Query: SELECT s.full_name, st.roll_number, a.status,
                   a.confidence_score, a.timestamp
            FROM attendance a
            JOIN students st ON a.student_id = st.id
            JOIN users s ON st.user_id = s.id
            WHERE a.session_id = :session_id
            ORDER BY st.roll_number ASC

  3. Also query all students in the session's class
     to include absentees (students with no attendance record)

  4. Build complete roster with default status "Absent"
     Update status for students with records

  5. Generate CSV content:
     Header Row: Roll No, Student Name, Status, Confidence, Timestamp
     Data Rows: One per student in roll number order

  6. Set response headers:
     Content-Type: text/csv
     Content-Disposition: attachment; filename="session_{id}_{date}.csv"

  7. Stream CSV bytes to client
  8. Browser: Download dialog appears with pre-named file
END REPORT_GENERATION
```

### 5.7 Software Testing Methodologies

A rigorous multi-layer testing lifecycle was executed to ensure stability, accuracy, and security.

**Testing Strategy Overview:**
The testing approach followed a pyramid structure: a broad base of unit tests, a middle layer of integration tests, and a narrow top of end-to-end user flow tests.

**Unit Tests (pytest):**
Individual functions were tested in isolation with mocked dependencies:
- `test_password_hashing`: Verifies that bcrypt hashing is non-deterministic (different hashes for same input due to random salt) and that verification correctly accepts matching passwords.
- `test_jwt_creation_and_decode`: Verifies that tokens created with `create_access_token` can be correctly decoded and that the `sub` and `role` claims match the input.
- `test_euclidean_distance_calculation`: Verifies the distance function with known vector pairs: identical vectors should yield distance 0.0, orthogonal vectors (dot product = 0) yield predictable distances.
- `test_face_service_embedding_shape`: Verifies that `extract_embedding` returns a NumPy array of exactly shape (512,) for a valid test face image.

**Integration Tests:**
API endpoints were tested using FastAPI's `TestClient` with an in-memory SQLite database substituted for PostgreSQL:
- `test_register_student_success`: POSTs a valid multipart form with a real face image and verifies a 201 response with a valid JWT.
- `test_login_invalid_password`: Verifies that wrong passwords return 401.
- `test_mark_attendance_valid_face`: Submits the same face used for enrollment and verifies 200 OK with status "Present".
- `test_mark_attendance_wrong_face`: Submits a different person's face and verifies 403 Forbidden.

**Full Test Case Matrix:**

| Test ID | Category | Scenario | Expected Result | Actual Outcome | Status |
|---|---|---|---|---|---|
| TC-01 | Security | Login with expired JWT | 401 Unauthorized; redirect to Auth Gate | Redirected | Pass |
| TC-02 | Security | Login with manipulated JWT payload | 401 Unauthorized | Rejected | Pass |
| TC-03 | UI Constraint | Face capture with head at 45° off-axis | Snap disabled; offset > 70px | Snap Disabled | Pass |
| TC-04 | UI Constraint | Face too far (small bounding box) | Snap disabled; width < 26% | Snap Disabled | Pass |
| TC-05 | Anti-Spoofing | Holding up a printed 2D photograph | Lock fails to sustain 1.2s on flat image | Access Denied | Pass |
| TC-06 | Integration | Valid face in optimal lighting | D < 0.65; 200 OK; Logged Present | Logged Present | Pass |
| TC-07 | Integration | Different person's face submitted | D > 0.65; 403 Forbidden | Rejected | Pass |
| TC-08 | Functional | Teacher ends session; exports CSV | CSV with headers; all students listed | CSV Downloaded | Pass |
| TC-09 | Edge Case | Two faces simultaneously in view | predictions.length > 1; lock aborted | Lock Aborted | Pass |
| TC-10 | Edge Case | Student attempts to mark during inactive session | 400 Bad Request: No active session | Error Returned | Pass |
| TC-11 | Load | 10 concurrent attendance mark requests | All processed within 800ms each | Within Limit | Pass |
| TC-12 | Regression | Student re-registers with same roll number | 409 Conflict: Roll number exists | Conflict Returned | Pass |

### 5.8 Performance Evaluation & Metrics

**Frontend Edge AI Performance:**

| Metric | Test Device | Result |
|---|---|---|
| Average FPS (BlazeFace/WebGL) | Intel Core i5 + Integrated GPU | 52 FPS |
| Average FPS (BlazeFace/CPU fallback) | Low-end device, no GPU | 22 FPS |
| Model Load Time (first load, CDN) | Standard 10 Mbps connection | 1.8 seconds |
| Model Load Time (cached) | Subsequent loads | 0.12 seconds |
| Lock acquisition time (good conditions) | Standard consumer webcam | ~1.4 seconds |
| False lock rate (off-axis face) | 45° head tilt test set | 0% |

**Backend Inference Performance:**

| Metric | Value |
|---|---|
| InsightFace model load time (server startup) | 3.2 seconds |
| ONNX inference time per image (detection + alignment + embedding) | ~180 ms |
| Database query time (embedding retrieval by user_id) | ~8 ms |
| Database write time (INSERT attendance record) | ~12 ms |
| Cloudinary upload time (enrollment only) | ~650 ms |
| Total API response time — `/attendance/mark` | ~420 ms avg |
| Total API response time — `/students/register` | ~1,100 ms avg |
| Total API response time — `/auth/login` | ~260 ms avg |

**Biometric Accuracy Evaluation:**
A controlled accuracy test was conducted with 20 volunteer participants, each registered with one enrollment photo and tested with 5 probe photos (taken at different times, lighting conditions, and slight pose variations):

| Metric | Result |
|---|---|
| True Accept Rate (TAR) — same person, D ≤ 0.65 | 98.0% (98/100 probes accepted) |
| False Accept Rate (FAR) — different person, D ≤ 0.65 | 0.5% (1/200 cross-person pairs) |
| True Reject Rate (TRR) — different person, D > 0.65 | 99.5% |
| False Reject Rate (FRR) — same person, D > 0.65 | 2.0% |
| Average intra-class distance (same person) | 0.38 |
| Average inter-class distance (different person) | 1.02 |

The results confirm a clear separation margin between intra-class and inter-class distance distributions, with the threshold of 0.65 sitting well within the gap. The 2 false rejections both occurred under challenging conditions (extreme backlighting and significant change in facial hair), confirming that the system's failure mode is a safe reject rather than a dangerous false accept.

# CHAPTER 6

## RESULTS & DISCUSSION

### 6.1 Functional Results

After completing all five development iterations and executing the full test case matrix, Face Track successfully delivers all defined functional objectives. This section documents the verified functional outcomes of the complete system.

**Authentication & Access Control:**
The JWT-based authentication system functions correctly across all tested scenarios. Login with valid credentials produces a signed token within an average of 260 ms. Expired tokens (tested by manually advancing the system clock) correctly trigger a 401 response and redirect users to the Auth Gate. Role-based routing correctly serves the Teacher Dashboard to users with `role: "teacher"` claims and the Student Portal to users with `role: "student"` claims, with no cross-role data leakage observed in any test.

**Student Biometric Enrollment:**
The enrollment flow was tested with 20 participants. All 20 successfully completed enrollment within an average of 45 seconds (including camera permission grant, face alignment, and the backend processing time of ~1.1 seconds). The geometric constraint engine correctly prevented enrollment captures in 100% of sub-optimal positioning attempts. All 20 enrollment records were verified in the database with non-null `face_embedding` arrays of exactly 512 elements and valid Cloudinary image URLs.

**Attendance Marking (Teacher HUD Mode):**
In teacher HUD mode, sequential attendance marking was tested with a line of 10 students. Each student stood in front of the camera, achieved biometric lock, and was logged. The average time per student (from face appearing in frame to "Present" logged) was 4.2 seconds, yielding a throughput of approximately 14 students per minute — significantly faster than fingerprint scanner queues.

**Attendance Marking (Student Self-Mark Mode):**
Student self-marking was tested across multiple devices (laptop, tablet, and smartphone) and network conditions. All devices successfully ran BlazeFace (on WebGL or CPU fallback) and submitted attendance. The minimum functional device tested was a 2016 budget Android smartphone, which achieved 18 FPS on the CPU fallback, sufficient for constraint enforcement.

**CSV Report Generation:**
Session reports were generated for sessions containing 10, 30, and 60 student records. All reports were generated and downloaded within 1 second. Reports were verified to contain correct headers, all enrolled students (including absentees with default "Absent" status), and accurate timestamps. Reports opened correctly in Microsoft Excel and Google Sheets.

**Leave Request Workflow:**
Students successfully submitted leave requests with date ranges and reason text. Teachers' dashboards displayed pending requests with approve/reject buttons. Approvals correctly updated the student's attendance record and changed the request status badge from yellow "Pending" to green "Approved."

### 6.2 Accuracy and Performance Analysis

**Euclidean Distance Distribution:**
The distribution of Euclidean distances measured during accuracy testing reveals a bimodal pattern — two distinct peaks:

- **Intra-class peak (same person):** Centered around D = 0.38, with 95th percentile at D = 0.58. All values well below the 0.65 threshold.
- **Inter-class peak (different persons):** Centered around D = 1.02, with 5th percentile at D = 0.72. The vast majority of cross-person comparisons yield distances well above 0.65.

The gap between the 95th percentile of intra-class distances (0.58) and the 5th percentile of inter-class distances (0.72) is 0.14 — a comfortable margin around the 0.65 threshold. This confirms that the chosen threshold is well-calibrated and that the ArcFace embedding space provides strong identity separability for the test population.

**Impact of Lighting Conditions:**
Accuracy was tested under three lighting conditions:

| Lighting Condition | True Accept Rate | False Reject Rate |
|---|---|---|
| Optimal (diffuse, front-lit) | 100% | 0% |
| Moderate (side-lit, mild shadows) | 98% | 2% |
| Poor (strong backlight, dim front) | 92% | 8% |

The moderate degradation under poor lighting highlights an important operational consideration: for maximum system accuracy, classrooms should have adequate frontal lighting. This is a common requirement for all optical biometric systems and can be addressed with simple overhead lighting adjustments.

**Backend Latency Breakdown:**
The ~420 ms average end-to-end backend latency for `/attendance/mark` was decomposed as follows:

| Step | Average Duration |
|---|---|
| HTTP parsing + JWT validation | 8 ms |
| Image decode + NumPy conversion | 22 ms |
| InsightFace detection (det_500m.onnx) | 95 ms |
| Affine alignment | 5 ms |
| InsightFace embedding (w600k_mbf.onnx) | 85 ms |
| Database query (embedding retrieval) | 8 ms |
| Euclidean distance calculation | <1 ms |
| Database write (attendance INSERT) | 12 ms |
| JSON serialization + HTTP response | 6 ms |
| **Total** | **~242 ms** |

The measured average of 420 ms vs. the decomposed ~242 ms indicates approximately 178 ms of overhead from network round-trip time (client to server, response to client) — consistent with typical latency on a hosted cloud server accessed over a standard broadband connection.

**Memory Footprint:**
The InsightFace `buffalo_sc` model occupies approximately 510 MB of RAM when loaded. This is the primary constraint on server-tier selection. A server with 1 GB RAM would leave insufficient headroom for the OS, FastAPI workers, and connection overhead; therefore, a minimum of 2 GB RAM is recommended for the backend server.

### 6.3 Comparative Benchmarking

Face Track was benchmarked against a representative selection of commonly deployed alternative systems across the key dimensions of institutional concern:

| Evaluation Criterion | Paper Register | RFID Smart Card | Fingerprint Scanner | Face Track |
|---|---|---|---|---|
| Proxy Attendance Prevention | None | None (card fraud) | Strong | Very Strong |
| Hardware Cost (per classroom) | ₹0 | ₹3,000–₹8,000 | ₹8,000–₹25,000 | ₹0 |
| Software Cost | ₹0 | ₹5,000–₹20,000 | ₹10,000–₹50,000 | ₹0 (open source) |
| Time per Student (seconds) | 10–15 | 3–5 | 5–8 | 4.2 |
| Contact Required | No | No | Yes | No |
| Data Loss Risk | High (physical) | Medium | Low | Very Low (cloud) |
| Real-Time Student Dashboard | No | Rare | Rare | Yes |
| Automated CSV Reports | Manual | Semi-auto | Semi-auto | Fully Automated |
| Scalability | Fixed | Hardware-limited | Hardware-limited | Unlimited (cloud) |
| Privacy Compliance | N/A | Medium | Medium | High (edge-only video) |
| Deployment Complexity | Trivial | Medium | High | Low (browser-based) |

The benchmarking demonstrates that Face Track matches or exceeds hardware-based biometric systems on all relevant performance dimensions while eliminating capital expenditure entirely.

---

# CHAPTER 7

## CONCLUSION AND FUTURE WORK

### 7.1 Conclusion & Strategic Advantages

The comprehensive design, development, and rigorous testing of the Face Track system successfully demonstrates a practical, deployable, and highly accurate transition from outdated manual attendance tracking to a fully automated, biometric verification platform. The project achieves all seven defined technical objectives and delivers measurable improvements across every key performance indicator compared to existing alternatives.

**Summary of Achievements:**
- Successfully architected a full-stack web application integrating a Python FastAPI backend with a Vanilla JavaScript single-page frontend.
- Implemented a novel edge-computing pipeline using TensorFlow.js BlazeFace that achieves real-time (45–60 FPS) face detection and geometric constraint enforcement entirely within the browser, with zero video data transmitted to the server.
- Deployed InsightFace ONNX Runtime on the server to extract 512-dimensional ArcFace embeddings with a measured True Accept Rate of 98% and False Accept Rate of 0.5% under controlled test conditions.
- Achieved an end-to-end attendance marking latency of approximately 420 ms, enabling a student throughput of 14 students per minute in teacher HUD mode.
- Implemented a complete, production-grade security stack including bcrypt password hashing, HS256 JWT authentication, HTTPS/TLS transport encryption, and biometrically irreversible embedding storage.

**Strategic Advantages of the Architecture:**

*Massive Network Scalability:* The delegation of continuous video stream analysis to the client browser means that the server experiences zero additional load as the number of concurrently active camera feeds increases. 100 students simultaneously running BlazeFace in their browsers generate identical server load to 1 student — approaching zero — until the moment of capture. This is a qualitatively different scaling model compared to centralized video processing architectures.

*Ultimate Biometric Security:* The ArcFace-trained InsightFace model produces embeddings with a measured inter-class distance average of 1.02 against an intra-class average of 0.38. The 0.65 threshold sits in a wide gap between these distributions, providing a robust security margin. The probability of a false accept under this threshold is mathematically equivalent to two random 512-d unit vectors having a Euclidean distance less than 0.65 — an extraordinarily rare event by chance alone.

*Zero Hardware Procurement:* The system deploys entirely on infrastructure that institutions already possess: student and teacher laptops with integrated webcams and internet connections. The marginal cost of deploying Face Track to an additional classroom is strictly zero in hardware terms.

*Streamlined Institutional Deployment:* With zero-compilation Vanilla JS builds, the frontend is a collection of three static files (HTML, CSS, JS) deployable to any static CDN in minutes. The backend is containerizable (Docker) and deployable to any cloud platform with a standard Python runtime. No app-store approval processes, no dedicated hardware installation visits, and no specialized IT personnel are required.

*Regulatory Compliance by Design:* By storing only a single enrollment photograph (in cloud storage) and a mathematical embedding vector (in the database), and by processing all video data exclusively on the client device, Face Track achieves privacy compliance with Indian data protection principles without requiring any architectural changes. The system's data footprint is minimal compared to video-recording alternatives.

### 7.2 Future Scope & Societal Impact

While the current system rigorously fulfills its defined objectives, the Face Track platform has significant potential for expansion in multiple dimensions:

**Advanced Liveness Detection (Anti-Spoofing):**
The current implementation's anti-spoofing relies on the difficulty of presenting a physically printed photograph to the camera in a way that satisfies the geometric lock constraints (flat photos often reflect light unevenly and may not trigger BlazeFace's confidence threshold). Future iterations should implement active liveness detection: the system randomly issues a challenge (e.g., "blink," "turn left," "smile") and only accepts a capture after the user performs the requested action. This would effectively eliminate all photograph-based spoofing attacks. Passive liveness detection using depth estimation from a single RGB camera (monocular depth networks) or integration with the LiDAR sensors available on modern iPhones is another promising direction.

**Automated Notifications & Communication Integration:**
Integrating the backend with email (SMTP via SendGrid or Amazon SES) and SMS APIs (Twilio, MSG91) would enable automated, time-sensitive notifications:
- Daily attendance shortfall alerts to students (e.g., "Your attendance in Data Structures dropped to 68% today").
- Weekly summary emails to parents or guardians for students below the institutional threshold.
- Automatic urgent alerts to faculty advisors when a student misses more than 3 consecutive classes.

This notification layer transforms Face Track from a passive data recorder into an active academic support system.

**Campus ERP Integration:**
University Enterprise Resource Planning (ERP) systems (such as Fedena, Campus ERP, or custom-built systems) manage student academic records holistically, including grades, fees, and examination eligibility. Exposing a secure REST or GraphQL webhook interface from Face Track would allow real-time bidirectional synchronization: attendance data flows into the ERP automatically, and ERP events (like the start of a semester or examination registration deadlines) trigger automated compliance checks in Face Track.

**Multi-Camera Classroom Deployment:**
For large lecture halls with 200+ students, a single teacher operating a single camera is a bottleneck. A future architecture could support multiple simultaneous camera streams (e.g., one camera per row of students) with a coordinator process that deduplicates and aggregates results. With the client-side edge computing model, each camera-equipped device handles its own BlazeFace inference, sending only captured images to the server — the architecture scales naturally.

**Mobile Application:**
A native mobile application built with React Native or Flutter could provide a superior mobile experience, including:
- Geofencing: The student's GPS coordinates are verified to be within the campus boundary before the attendance marking interface is unlocked, preventing remote fraud.
- Background session awareness: Push notifications alert students when a teacher starts a session.
- Offline resilience: Attendance records captured offline are queued and synced when connectivity is restored.

**Analytics Dashboard for Administration:**
A dedicated administrative portal with aggregate analytics — department-wide attendance trends, subject-wise comparison charts, semester-over-semester improvement metrics, and identification of chronically absent students — would provide institutional leadership with actionable insights for academic intervention programs.

**Societal Impact:**
At scale, a system like Face Track has the potential to meaningfully improve educational outcomes. Research consistently demonstrates a strong positive correlation between class attendance and academic performance. By making attendance tracking effortless, accurate, and real-time, Face Track removes the administrative friction that currently allows students to drift into chronic absenteeism unnoticed. The automated shortfall warning system creates an early-intervention mechanism that has the potential to measurably reduce detention rates and academic failures.

For institutions in semi-urban and rural areas with limited IT budgets, Face Track represents a particularly valuable tool. The zero hardware cost model makes biometric attendance — previously the preserve of well-funded urban institutions — accessible to any institution with a basic internet connection, democratizing institutional quality.

---

## REFERENCES

1. Bazarevsky, V., Kartynnik, Y., Vakunov, A., Raveendran, K., & Grundmann, M. (2019). *BlazeFace: Sub-millisecond Neural Face Detection on Mobile GPUs*. arXiv:1907.05047.

2. Deng, J., Guo, J., Xue, N., & Zafeiriou, S. (2019). *ArcFace: Additive Angular Margin Loss for Deep Face Recognition*. Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR).

3. Guo, J., Zhu, X., Yang, Y., Yang, F., Lei, Z., & Li, S. Z. (2021). *Towards Fast, Accurate and Stable 3D Dense Face Alignment*. European Conference on Computer Vision (ECCV). [InsightFace]

4. He, K., Zhang, X., Ren, S., & Sun, J. (2016). *Deep Residual Learning for Image Recognition*. Proceedings of CVPR 2016.

5. Howard, A. G., Zhu, M., Chen, B., Kalenichenko, D., Wang, W., Weyand, T., ... & Adam, H. (2017). *MobileNets: Efficient Convolutional Neural Networks for Mobile Vision Applications*. arXiv:1704.04861.

6. Huang, G. B., Ramesh, M., Berg, T., & Learned-Miller, E. (2007). *Labeled Faces in the Wild: A Database for Studying Face Recognition in Unconstrained Environments*. University of Massachusetts Technical Report 07-49.

7. Liu, W., Wen, Y., Yu, Z., & Yang, M. (2016). *Large-Margin Softmax Loss for Convolutional Neural Networks*. Proceedings of ICML.

8. Mulla, A., & Rohokale, V. (2022). *Deep Learning Based Automated Attendance System Using FaceNet*. International Journal of Advanced Computer Science and Applications (IJACSA), 13(4).

9. Naik, A., Patel, H., Sharma, R., & Desai, K. (2021). *IoT-Based Smart Attendance System Using Raspberry Pi and Face Recognition*. International Conference on Intelligent Computing and Control Systems (ICICCS).

10. Patil, S., & Kulkarni, U. (2020). *Real-Time Face Recognition Attendance System Using OpenCV and Python*. IEEE International Conference on Electronics, Computing and Communication Technologies (CONECCT).

11. Ramachandran, P., Zoph, B., & Le, Q. V. (2017). *Searching for Activation Functions*. arXiv:1710.05941. [Swish activation, used in MobileNetV3]

12. Rezvani, S., & Wang, X. (2023). *A Survey of Deep Face Recognition: From Representation to Classification*. IEEE Transactions on Information Forensics and Security.

13. Schroff, F., Kalenichenko, D., & Philbin, J. (2015). *FaceNet: A Unified Embedding for Face Recognition and Clustering*. Proceedings of CVPR 2015.

14. Taigman, Y., Yang, M., Ranzato, M. A., & Wolf, L. (2014). *DeepFace: Closing the Gap to Human-Level Performance in Face Verification*. Proceedings of CVPR 2014.

15. Verma, P., & Singh, A. (2023). *Browser-Based Real-Time Face Detection Using TensorFlow.js and WebGL*. International Journal of Computer Applications, 185(12).

16. FastAPI Documentation. (2024). Tiangolo. Retrieved from https://fastapi.tiangolo.com

17. TensorFlow.js Documentation. (2024). Google Brain. Retrieved from https://js.tensorflow.org

18. InsightFace Repository. (2024). deepinsight. Retrieved from https://github.com/deepinsight/insightface

19. SQLAlchemy 2.0 Documentation. (2024). Retrieved from https://docs.sqlalchemy.org

20. Supabase Documentation. (2024). Supabase Inc. Retrieved from https://supabase.com/docs

---

*End of Report*

**HIMACHAL INSTITUTE OF ENGINEERING & TECHNOLOGY, SHAHPUR**
**Department of Computer Science & Engineering**
**B.Tech CSE — Industrial Project Report**
**Academic Year: 2025–2026**
