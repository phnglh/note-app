# React Firebase Note App

A modern, minimalist note-taking app powered by **Next.js** and **Firebase**.

✅ **Features**:
- ✍️ Add, update, and remove notes
- 🔒 Secure user authentication via Firebase Auth
- ☁️ Real-time note syncing with Firestore
- 🚀 Deployable on Firebase Hosting
- 📱 Fully responsive for mobile and desktop

---

## Getting Started

This project is a [Next.js](https://nextjs.org) application initialized with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit `http://localhost:3000` in your browser to see the app.

### 3. Firebase Setup

1. Navigate to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project.
3. Register a Web App and copy the Firebase configuration.
4. Paste the configuration into `firebaseConfig.ts` or `.env.local`.
5. Enable **Firebase Authentication** and **Firestore Database** in the console.

---

## Learn More

Explore the following resources for deeper insights:

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
