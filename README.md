https://nexacv-ai.vercel.app/

🚀 Nexa CV: AI-Powered Resume Intelligence
Nexa CV is a high-performance web application designed to bridge the gap between job seekers and Applicant Tracking Systems (ATS). Using the Puter SDK for cloud-native storage and AI analysis, it transforms static PDFs into actionable career insights.


✨ Key Features
Instant PDF-to-Image Conversion: High-fidelity resume previews using pdf.js with dedicated Web Worker support.

AI-Driven Analysis: Deep-scan technology that evaluates resumes against industry standards for impact, brevity, and style.

Persistent UUID Routing: Every analysis is stored in the Puter KV Store, allowing users to share unique URLs of their results.

Modern UI/UX: Built with React, styled with Tailwind CSS, and brought to life with GSAP animations.

🛠️ Tech Stack
Frontend: React 19, Vite, TypeScript

Styling: Tailwind CSS (utility-first design)

Animations: GSAP (ScrollTrigger & Staggered effects)

Cloud Backend: Puter SDK (Key-Value Storage, Filesystem, and AI Chat)

Deployment: Netlify and  Vercel

📂 Project Structure

src/
├── components/      # Reusable UI elements (Navbar, fileUploader, summary)
├── lib/             # Puter SDK config, PDF conversion logic, and UUID utils
├── sections/           # Upload (Home) and Resume (Results) views
├── types/           # Strong TypeScript interfaces for Puter responses
└── App.tsx          # Main routing logic

🚀 Getting Started
1. Clone the repository

git clone https://github.com/st-darwin/AI-resume-analyzer.git

2. Install dependencies

npm install

3. Run locally

npm run dev

Architecture Highlights

The app utilizes a Zero-Server approach. All logic—from file uploading to AI processing—happens directly in the browser via the Puter SDK, ensuring low latency and high privacy.
-----------------------------------------------
Developed by Darwin ❤️ (Code with Darwin)
-----------------------------------------------


