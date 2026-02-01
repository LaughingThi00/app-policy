# App Policy Repository

This folder is designed to be a standalone Git repository to host Privacy Policies for your applications (starting with **Primerior**).

## Structure

- `/primerior-extension/privacy-policy.html`: The specific policy for the Primerior Chrome Extension.

## Setup Instructions

### 1. Initialize Git Repository

Open a terminal in this `app-policy` folder:

```bash
cd app-policy
git init
git add .
git commit -m "Initial commit: Add Primerior privacy policy"
```

### 2. Connect to GitHub

1.  Create a **new public repository** on GitHub (e.g., named `app-policy`).
2.  Link this local folder to it:

```bash
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/app-policy.git
git push -u origin main
```

_(Replace `<YOUR_USERNAME>` and the URL with your actual new repo URL)_

### 3. Enable Public Access (GitHub Pages)

1.  Go to your new repository on GitHub.
2.  Click **Settings** > **Pages** (in the left sidebar).
3.  Under **Build and deployment** > **Branch**, select `main` and ensure folder is `/(root)`.
4.  Click **Save**.

### 4. Get Your Link

Wait about 1-2 minutes. Your Privacy Policy will be live at:

```
https://<YOUR_USERNAME>.github.io/app-policy/primerior-extension/privacy-policy.html
```

Use **this link** to reply to the Chrome Web Store or update your Developer Dashboard.
