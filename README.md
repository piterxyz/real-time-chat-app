# Real-time Chat App
<p align="center">
  <img src="https://github.com/piterxyz/realtime-chat-app/blob/main/public/conversations-preview.png" />
  <img src="https://github.com/piterxyz/realtime-chat-app/blob/main/public/requests-preview.png" />
</p>

## About
Welcome to the Real-Time Chat App! This application allows users to engage in real-time conversations, create chat rooms, send messages, and enjoy a seamless chat experience. With features like replies, roles, and authentication, it provides a robust and secure platform for communication.

## Features
- **Groups:** Create groups to communicate with multiple users simultaneously.
- **Friend Requests:** Send and accept friend requests to connect with others on the platform.
- **Real-Time Messaging:** Enjoy instant communication with real-time message delivery.
- **Authentication:** Securely authenticate users to ensure the privacy and integrity of the chat system.
- **Responsive Web Design:** The app is designed to be responsive and accessible on various devices.

## Tech Stack
- **Next.js 13:** A powerful React framework for building server-rendered and statically generated web applications.
- **Pusher:** A cloud-based service that enables real-time bi-directional communication via WebSockets.
- **Tailwind CSS:** A utility-first CSS framework that allows for rapid and efficient UI development.
- **Prisma:** A modern database toolkit that simplifies database access and management.
- **NextAuth:** A complete authentication solution for Next.js applications, providing ready-to-use sign-in functionality.
- **TypeScript:** A typed superset of JavaScript that enhances code quality and developer productivity.
- **zustand:** A library for state management in React applications.
- **React Hook Form:** A library for managing form state and validation in React applications.
- **Radix UI & shadcn/ui:** Libraries for building accessible and composable UI components.

## Environment Variables
To run the Real-Time Chat App, ensure the following environment variables are set:
```
DATABASE_URL=your_database_connection_url
NEXTAUTH_SECRET=your_secret_key
NEXT_PUBLIC_PUSHER_APP_KEY=your_pusher_key
PUSHER_APP_ID=your_pusher_appid
PUSHER_SECRET=your_pusher_secret
```
Please make sure to replace `your_database_connection_url`, `your_secret_key`, `your_pusher_key`, `your_pusher_appid` and `your_pusher_secret` with the appropriate values provided by the respective services.

## Getting Started
Follow these steps to set up and run the Real-Time Chat App:
- Clone the repository: `git clone https://github.com/piterxyz/real-time-chat-app.git`
- Navigate to the project directory: `cd real-time-chat-app`
- Install dependencies: `npm install` or `yarn install`
- Set the environment variables in a `.env` file based on the provided template.
- Start the development server: `npm run dev` or `yarn dev`
- Open the application in your browser: `http://localhost:3000`

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/piterxyz/real-time-chat-app).
