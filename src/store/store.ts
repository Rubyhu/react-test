import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appReducer } from './slices/appSlice'
import { authReducer } from './slices/authSlice'
import { userReducer } from './slices/userSlice'
import { authApi } from './api/authApi'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware)
  },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
