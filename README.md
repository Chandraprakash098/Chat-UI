# Chat Application

This project is a responsive chat interface using React, Redux, and TypeScript for the front-end, with a Node.js mock API for predefined AI responses.

## Project Structure

```
chat-app/
├── client/      # Front-end React application
├── server/      # Back-end Node.js server
└── README.md
```

## Running the Project

### Front-end (React + Redux + TypeScript)

1. Navigate to the `client` directory and install typescript template and redux toolkit , if want to use tailwind then install tailwind:
   ```
   cd client
   npx create-react-app . --template typescript
   npm install @reduxjs/toolkit react-redux axios
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. Start the development server:
   ```
   npm start
   ```
.

### Back-end (Node.js Mock API)

1. Navigate to the `server` directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm init -y
   npm install express cors body-parser
   npm install -D typescript @types/node @types/express @types/cors ts-node-dev
   npx tsc --init
   ```
   and must add scripts in package.json file present in server
   
   "scripts": {
    "start": "node dist/index.js",
    "build": "tsc",
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
  },
  

4. Build the TypeScript code:
   ```
   npm run build
   ```

5. Start the server:
   ```
   npm start
   ```

The server will be running at `http://localhost:3001`.

## Approach and Challenges

### Approach

1. **Front-end**:
   - Used Create React App with TypeScript template for quick setup.
   - Implemented Redux for state management, focusing on a simple chat message store.
   - Created reusable components for chat bubbles and the main chat interface.
   - Used Tailwind CSS for styling to ensure responsiveness and a clean design.

2. **Back-end**:
   - Implemented a simple Express server with TypeScript.
   - Created a mock API endpoint that returns predefined responses based on user input.
   - Used CORS to allow cross-origin requests from the front-end.

### Challenges

1. **TypeScript Integration**: Ensuring proper type definitions across the application, especially with Redux.
2. **Asynchronous Operations**: Handling API calls and updating the Redux store asynchronously.
3. **Responsive Design**: Ensuring the chat interface looks good on both desktop and mobile devices.

## Future Improvements

1. Implement user authentication.
2. Add real-time messaging capabilities using WebSockets.
3. Enhance the AI responses with a more sophisticated natural language processing model.
4. Implement message persistence using a database.
