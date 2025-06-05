# Skip Selection Page Redesign – We Want Waste

This is a complete redesign of the "Select Skip" page for We Want Waste. The goal was to improve the UI/UX, mobile responsiveness, and maintain clean, scalable React code while keeping the original functionality intact.

## 🚀 Live Demo (Sandbox Link)
[👉 View Live on Vercel](https://wewantwaste-mu.vercel.app)  

## 📸 Preview

![Redesigned Skip Selection Page](./waster-e.png)

---

## 🛠 Tech Stack

- **Next.js** – Framework for React
- **React** – Component-based UI
- **Tailwind CSS** – Utility-first styling
- **Axios** – API data fetching
- **React Icons** – For badges/icons

---

## 📋 Features

- ✅ Fully redesigned card layout for skip options  
- ✅ Responsive across mobile, tablet, and desktop  
- ✅ Accessibility-friendly UI (color contrast, labels, spacing)  
- ✅ Step indicator for current progress  
- ✅ Highlight for skips allowed on roads  
- ✅ API integration using:  
  [`https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft`](https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft)

---

## 💡 Improvements Over Original

- Clean, bold UI with strong hierarchy  
- Sticky bottom bar on mobile (if implemented)  
- UX-friendly button placement  
- Responsive grid layout  
- Real-time visual feedback on selection  
- Centralized data handling via `fetchDetails` service

---

## 🧪 How to Run Locally

```bash
git clone https://github.com/Teddaudi/wewantwaste.git
cd skip-redesign
npm install
npm run dev
