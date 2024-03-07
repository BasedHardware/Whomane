# Project Setup and Configuration Instructions

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To get the project up and running on your local machine, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/BasedSocialCo/whomane.git
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn
    # or
    pnpm install
    # or
    bun install
    ```

3. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Environment Variables

The project requires several environment variables to be set for proper operation. These include Firebase configuration for Firestore, Leap AI, and Facecheck API keys.

### Setting Up Firebase

The first few environment variables are for Firebase configuration. Follow these steps to obtain your Firebase project configuration:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project or select an existing one.
3. Navigate to Project settings > General.
4. Under the "Your apps" section, add a new web app or select an existing one.
5. Copy the Firebase SDK snippet configuration. It will look something like this:

    ```js
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MEASUREMENT_ID"
    };
    ```

6. Populate your `.env.local` file with these values:

    ```
    NEXT_PUBLIC_API_KEY=YOUR_API_KEY
    NEXT_PUBLIC_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
    NEXT_PUBLIC_PROJECT_ID=YOUR_PROJECT_ID
    NEXT_PUBLIC_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
    NEXT_PUBLIC_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
    NEXT_PUBLIC_APP_ID=YOUR_APP_ID
    NEXT_PUBLIC_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
    ```

### Leap AI (optional)

The `NEXT_PUBLIC_LEAP_API_KEY` check out https://www.tryleap.ai/ to get an API key. This is only needed if you want to research or ask questions about the people you scan.

### Obtaining Facecheck API Key

Note: you'll have to pay in btc to get credits for this API

To get the Facecheck API key:

1. Visit the Facecheck API documentation or registration page. (https://facecheck.id/Face-Search/API)
2. Sign up or log in to your account.
3. Navigate to your API dashboard.
4. Generate or copy your existing API token.
5. Add this token to your environment file:

    ```
    NEXT_PUBLIC_FACECHECK_APITOKEN=YOUR_FACECHECK_APITOKEN
    ```
# Deploying the API and frontend
You'll need to deploy this to vercel or similar, because the API endpoint that is used by the Raspberry Pi to process the image is contained within this next.js project `(/api/facecheck)`

## 1.. Sign Up or Log In to Vercel

If you haven't already, you'll need to create an account on Vercel. You can sign up using your email or GitHub, GitLab, or Bitbucket account, which makes it easier to deploy projects hosted on these services.

## 2. Install Vercel CLI (Optional)

While you can deploy using the Vercel web interface, installing the Vercel CLI provides more flexibility and control. Install it globally using npm or yarn:

```sh
npm i -g vercel
```

## 3. Deploying Your Project
There are two main ways to deploy: using the Vercel CLI or directly through the Vercel Dashboard.

### Using the Vercel CLI:
Open your terminal and navigate to your project directory.
Run vercel to initiate the deployment. If you're not logged in, the CLI will prompt you to authenticate.
Follow the CLI prompts to set up your project. The CLI will automatically detect the type of project and suggest settings. You can override these as needed.
Once configured, Vercel will deploy your project, and you'll receive a URL to access your live site.

### Using the Vercel Dashboard:
Log in to the Vercel Dashboard.
Click on the "New Project" button.
You can either import a project from Git or upload your project files directly if it's not hosted on a Git provider.
Select your project or repository, configure your project settings as needed, and then deploy.
Vercel will process your project and provide a URL to access your live site.
css

## Questions
Ask in the Discord if you get stuck, we're here to help :)


