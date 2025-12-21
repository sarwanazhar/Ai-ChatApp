
# AI Chat Application

> **Created by Sarwan Azhar**  
> **GitHub Repository**: https://github.com/sarwanazhar/chatappfrontend

A modern, feature-rich AI chat application built with React Native and Expo, designed to provide seamless conversational experiences with an AI assistant. This project is open source and freely available for anyone to use, modify, and distribute.

## 📱 Overview

This is a full-featured mobile chat application that allows users to communicate with an AI assistant through an intuitive and beautifully designed interface. The app features user authentication, real-time message streaming, chat history management, and a responsive design optimized for both mobile and tablet devices.

## ✨ Features

### 🔐 Authentication & Security
- **Secure Login/Register**: Email-based authentication with password protection
- **JWT Token Management**: Automatic token storage and retrieval using AsyncStorage
- **Protected Routes**: Route protection ensuring only authenticated users can access chat features
- **Auto-login**: Persistent session management across app restarts
- **Cross-platform**: Works on Android, iOS, and Web (Note: iOS not tested due to lack of macOS device)

### 💬 Chat Interface
- **Real-time Streaming**: AI responses streamed in real-time for natural conversation flow
- **Message History**: Complete chat history with timestamps and user/AI message differentiation
- **Multiple Chats**: Create and manage multiple conversation threads
- **Beautiful UI**: Modern gradient designs with smooth animations
- **Responsive Design**: Optimized for various screen sizes (mobile and tablet)

### 🎨 User Experience
- **Loading States**: Smooth loading screens with fade animations
- **Empty States**: Helpful empty state messages when no conversations exist
- **Sidebar Navigation**: Slide-out menu for easy chat management
- **Logout Functionality**: Secure logout with session cleanup
- **Keyboard Handling**: Automatic keyboard avoidance for optimal typing experience

## 🛠️ Technology Stack

### Core Framework
- **React Native 0.81.5**: Cross-platform mobile development
- **Expo 54.0.29**: Development and build toolchain
- **Expo Router 6.0.19**: File-based routing system
- **TypeScript 5.9.2**: Type-safe development

### Navigation & UI
- **React Navigation**: Native navigation solutions
  - `@react-navigation/native` (v7.1.8)
  - `@react-navigation/bottom-tabs` (v7.4.0)
  - `@react-navigation/elements` (v2.6.3)
- **React Native Gesture Handler**: Touch and gesture handling
- **React Native Reanimated**: Smooth animations and interactions
- **React Native Safe Area Context**: Safe area handling for different devices
- **React Native Screens**: Native screen components

### Styling & Icons
- **Expo Linear Gradient**: Beautiful gradient backgrounds
- **Lucide React Native**: Modern icon library
- **Expo Symbols**: Symbol assets
- **React Native SVG**: SVG rendering capabilities
- **Expo Image**: Optimized image handling

### State & Storage
- **React 19.1.0**: Latest React version with concurrent features
- **AsyncStorage**: Persistent local data storage
- **Axios**: HTTP client for API communication

### Development Tools
- **ESLint**: Code linting and quality
- **TypeScript**: Type checking and IntelliSense
- **Expo Haptics**: Haptic feedback
- **Expo Status Bar**: Status bar management
- **Expo System UI**: System UI styling
- **Expo Web Browser**: External link handling

## 📁 Project Structure

```
chat/
├── app/                    # Main application screens and routing
│   ├── _layout.tsx        # Root layout with authentication guard
│   ├── index.tsx          # Main chat interface
│   ├── login.tsx          # User login screen
│   └── register.tsx       # User registration screen
├── components/            # Reusable UI components
│   ├── chat/              # Chat-specific components
│   │   ├── ChatInput.tsx  # Message input component
│   │   ├── ChatMessages.tsx # Message list component
│   │   ├── Sidebar.tsx    # Chat history sidebar
│   │   └── header.tsx     # Chat header component
│   ├── LoadingScreen.tsx  # Loading animation component
│   └── Message.tsx        # Individual message component
├── libs/                  # Core utilities and providers
│   └── authprovider.tsx   # Authentication context and logic
├── api/                   # API communication layer
│   ├── auth.ts           # Authentication API calls
│   ├── chat.ts           # Chat management API calls
│   ├── client.ts         # Axios client configuration
│   └── streamMessages.ts # Real-time message streaming
├── types/                 # TypeScript type definitions
│   ├── auth.ts           # Authentication types
│   └── chat.ts           # Chat and message types
├── assets/               # Static assets (images, icons)
├── .expo/               # Expo configuration
├── .vscode/             # VS Code settings
└── node_modules/        # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- Expo CLI installed globally
- Android Studio (for Android development) - **Recommended for testing**
- iOS Simulator (for iOS development) - **Note: Not tested by author**
- Expo Go app (for testing on physical devices)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sarwanazhar/chatappfrontend
   cd chatappfrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if using pnpm
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on different platforms**
   ```bash
   # iOS Simulator (Not tested by author)
   npm run ios
   
   # Android Emulator
   npm run android
   
   # Web Browser
   npm run web
   
   # Expo Go (scan QR code)
   npm start
   ```

### Development Commands

```bash
# Start development server
npm start

# Run on specific platforms
npm run android    # Android emulator
npm run ios        # iOS simulator (Not tested)
npm run web        # Web browser

# Linting
npm run lint       # Check code quality

# Reset project (creates blank app directory)
npm run reset-project
```

## 📱 Routes & Navigation

### Public Routes (Unauthenticated)
- **`/login`**: User login screen with email/password authentication
- **`/register`**: User registration screen for creating new accounts

### Protected Routes (Authenticated)
- **`/`** or **`/index`**: Main chat interface with message history and AI interaction

### Route Protection
The app uses Expo Router's built-in protection with `<Stack.Protected>` guards:
- Unauthenticated users are automatically redirected to login
- Authenticated users cannot access login/register pages
- Smooth transitions between auth states with loading screens

## 🔧 API Integration

### Backend Connection
The app connects to a Node.js/Express backend hosted at:
```
https://chatappbackend-tjis.onrender.com
```

### API Endpoints

#### Authentication
- `POST /auth/register`: Register new user account
- `POST /auth/login`: Authenticate existing user

#### Chat Management
- `POST /chat/create`: Create a new chat session
- `GET /chat/getall`: Retrieve all user chats
- `POST /chat/message`: Send message and stream AI response

### API Features
- **JWT Authentication**: Bearer token authentication for all protected routes
- **Request Interceptors**: Automatic token injection for authenticated requests
- **Server-Sent Events**: Real-time message streaming using SSE protocol
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🎨 Component Architecture

### Authentication Flow
```
AuthProvider (Context)
├── Login Screen
│   ├── Email/Password Input
│   ├── Validation
│   └── API Integration
└── Register Screen
    ├── User Registration
    ├── Form Validation
    └── Success Handling
```

### Chat Interface
```
Main Chat Screen
├── Chat Header
│   ├── Title Display
│   └── Menu Button
├── Chat Messages
│   ├── Message List (FlatList)
│   ├── User/AI Message Bubbles
│   └── Empty State Handling
├── Chat Input
│   ├── Text Input
│   ├── Send Button
│   └── Keyboard Handling
└── Sidebar
    ├── Chat History
    ├── New Chat Button
    ├── User Profile
    └── Logout Option
```

## 📊 TypeScript Types

### Authentication Types
```typescript
interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  userToken: string | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}
```

### Chat Types
```typescript
interface MessageType {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: MessageType[];
  updatedAt: Date;
}
```

## 🎯 Key Features Implementation

### Real-time Message Streaming
- Uses Server-Sent Events (SSE) for streaming AI responses
- Progressive message updates as tokens arrive
- "Thinking..." placeholder during initial response
- Automatic scrolling to latest messages

### State Management
- React Context API for authentication state
- Local component state for chat data
- AsyncStorage for persistent token storage
- Optimistic UI updates for better user experience

### Performance Optimizations
- FlatList for efficient message rendering
- Memoization of expensive computations
- Debounced API calls
- Optimized re-renders with proper dependency management

## 🔒 Security Features

- JWT token-based authentication
- Secure token storage with AsyncStorage
- HTTPS API communication
- Input validation on client side
- Protected route implementation
- Automatic token refresh handling

## 📱 Platform-Specific Features

### iOS
- Safe area handling
- iOS-specific animations
- Platform-optimized UI components
- **Note**: iOS functionality has not been tested by the author due to lack of macOS device

### Android
- Edge-to-edge display support
- Software keyboard layout mode configuration
- Predictive back gesture handling
- Adaptive icons

### Web
- Static site generation support
- Responsive web design
- Favicon and PWA capabilities

## 🎨 Design System

### Color Palette
- **Primary Background**: `#0f0f0f` (Dark Black)
- **Secondary Background**: `#1f2937` (Gray-800)
- **Message Bubbles**: `#374151` (Gray-700)
- **Gradients**: Blue (#3b82f6) to Purple (#9333ea)
- **Text**: White with gray variants for readability

### Typography
- Clean, readable font system
- Consistent spacing and sizing
- Accessibility-friendly contrast ratios

### Animations
- Smooth fade-in effects
- Native gesture animations
- Loading state transitions
- Message send/receive animations

## 🚀 Deployment

### Expo Application Services (EAS)
The project is configured for EAS Build and deployment:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

### Build Commands
```bash
# Build for development
eas build --profile development

# Build for preview
eas build --profile preview

# Build for production
eas build --profile production

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration flow
- [ ] User login flow
- [ ] Chat message sending
- [ ] Real-time message streaming
- [ ] Multiple chat management
- [ ] Sidebar functionality
- [ ] Logout functionality
- [ ] Loading states
- [ ] Error handling
- [ ] Responsive design (tablet/mobile)

## 🐛 Troubleshooting

### Common Issues

1. **Metro Bundler Issues**
   ```bash
   # Clear cache and restart
   npx expo start --clear
   ```

2. **iOS Simulator Not Loading**
   ```bash
   # Reset simulator
   Hardware -> Erase All Content and Settings
   ```

3. **Android Build Issues**
   ```bash
   # Clean Gradle cache
   cd android && ./gradlew clean
   ```

4. **API Connection Issues**
   - Verify backend server is running
   - Check network connectivity
   - Verify API endpoint URLs

## 📈 Performance Metrics

- **Bundle Size**: Optimized with Expo
- **Startup Time**: Fast loading with splash screen
- **Memory Usage**: Efficient component rendering
- **Network**: Optimized API calls with streaming

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License. Anyone is free to use, modify, and distribute this code for any purpose.

## 👨‍💻 About the Author

**Sarwan Azhar** - Full Stack Developer  
- GitHub: [@sarwanazhar](https://github.com/sarwanazhar)
- Project Repository: https://github.com/sarwanazhar/chatappfrontend

This project was developed as a learning experience and demonstration of React Native capabilities. The author does not have access to macOS/iOS devices, so iOS functionality has not been personally tested but should work based on Expo's cross-platform capabilities.

## 📞 Support

For issues and questions:
- Check the Expo documentation: https://docs.expo.dev/
- Visit Expo GitHub: https://github.com/expo/expo
- Join Expo Discord: https://chat.expo.dev/

## 🔮 Future Enhancements

- [ ] Push notifications
- [ ] Offline message queuing
- [ ] Message search functionality
- [ ] Chat export/sharing
- [ ] Voice input support
- [ ] Image message support
- [ ] Multi-language support
- [ ] Advanced AI model selection
- [ ] Chat analytics
- [ ] Custom themes

---

**Built with ❤️ by Sarwan Azhar using React Native and Expo**
