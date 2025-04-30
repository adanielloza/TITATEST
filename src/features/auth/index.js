// src/features/auth/index.js

// Presentational & container components
export { default as Login }     from './components/LoginContainer'
export { default as SignOut }   from './components/SignOut'

// Route-guard
export { default as AuthRoute } from './routes/AuthRoute'

// (Optional) If you still need AuthPage elsewhere:
// export { default as AuthPage } from './AuthPage'

// Service helpers
export * from './services/authService'
