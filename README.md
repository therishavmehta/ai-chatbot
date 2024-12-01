# Introduction
This project is a chatbot application integrated with OpenAI's GPT API. The chatbot can interact with users, process and respond to messages, and allows for dynamic configuration settings to control parameters such as temperature, max tokens, and penalties.

Features:
OpenAI GPT Integration: The core functionality of the chatbot leverages OpenAI's GPT API for generating responses based on user input.
Dynamic Configuration: Users can adjust settings such as temperature, max tokens, and penalties in real time.
Persisted Settings: User configurations are stored in IndexedDB for persistence, ensuring that preferences are maintained across sessions.
API Key Management: Secure handling and storage of the OpenAI API key for accessing GPT services.
Contextual Chat: The chatbot can maintain context across conversations by remembering user preferences and previous interactions.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features:
- OpenAI GPT Integration: Interact with OpenAI's GPT-3 or GPT-4 API to generate responses based on user input.
- Dynamic Configuration: Real-time adjustment of settings such as temperature, max tokens, and penalties.
- Persistent Settings: Store user configurations in IndexedDB for persistence across sessions.
- Virtualization: Virtualize the chat message list using virtuoso for optimal performance when handling large amounts of data.
- API Key Management: Secure handling and storage of the OpenAI API key.
- Contextual Chat: Maintain context across conversations with stored user preferences and prior interactions.

Tech Stack:
- Frontend: React, TypeScript
- State Management: Context API for managing global chat state
- UI: Vercel UI components, including buttons, sliders, and toasts
- Storage: IndexedDB for persistent storage
- Virtualization: virtuoso for efficient rendering of large lists
- API: OpenAI GPT API

## Setup Instructions
Prerequisites:
- Node.js (version >= 14.x)
- OpenAI API Key


### Key Components:
- Chatbox.tsx
The main chat interface that renders messages from the chat history. Virtualization is applied to ensure efficient rendering of large message lists using the react-window library.

- ChatParameters.tsx
A settings panel where users can adjust configuration parameters such as temperature, max tokens, and penalties. It also includes an input for managing the API key.

- ChatContext.tsx
A React Context component for managing the global chat state, such as conversation history and user-configured settings.

- API Routes (pages/api/openai.ts)
Handles requests to OpenAI's API, sending user input and returning the generated response. It also streams data for live responses.

- ThemedToast.tsx
A UI component to show success or error notifications when configurations are saved or an action fails.


## Getting Started

First, run the development server:

```bash
npm install

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Please ensure to get an openAI API key to see the demo of the project.

