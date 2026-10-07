# Personal Assistant Workspace

A modern, responsive AI Assistant workspace built with React 19, TypeScript, Vite, and Tailwind CSS v4. Designed with clean UI patterns, fluid responsive layouts across all device form factors (mobile, tablet, desktop), multi-model AI configuration, and light/dark theme switching.

---

## ✨ Features

- 🤖 **AI Assistant Workspace**: Live conversation interface with step-by-step reasoning details, source attribution, and inline code snippet blocks.
- ⚡ **Multi-Model Selector**: Dynamically switch between AI models like GPT-4o, Claude 3.5 Sonnet, Gemini Pro, and DeepSeek R1.
- 🛠️ **Capability Toggles**: Quick controls for **Code Mode**, **Web Search**, and **Deep Reasoning**.
- 📱 **Fully Responsive Layout**: Mobile-first fluid design supporting touch targets, Collapsible offcanvas navigation drawer, and dynamic viewports.
- 🌗 **Theme Provider**: Dark and Light mode options powered by CSS variable tokens.
- 🔐 **Authentication Flow**: Google OAuth sign-in modal and custom user profile nav.
- 📂 **Chat Thread Management**: Categorized chat history (Today, Yesterday, Previous 7 Days) with quick actions.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: Custom Shadcn/Radix primitives & [Lucide Icons](https://lucide.dev/)
- **Typography**: Inter Variable Font

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── layout/       # AppHeader, AppSidebar, UserNav, ThemeToggle
│   ├── ui/           # Reusable UI primitives (Button, Avatar, DropdownMenu, etc.)
│   └── theme-provider.tsx
├── features/
│   ├── assistant/    # Workspace, Input bar, Message items, Model selector, Code blocks
│   └── auth/         # Auth modal & Google OAuth components
├── hooks/            # Custom React hooks
├── lib/              # Utility helper functions
├── App.tsx           # Main App component
└── main.tsx          # App entry point
```

---

## 📄 License

MIT License. Built for productivity and seamless AI workflow integration.
