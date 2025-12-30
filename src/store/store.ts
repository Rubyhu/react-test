import { configureStore } from '@reduxjs/toolkit'
// import { authApi } from './apii/authApi'
import { appReducer } from './slices/appSlice'
import { authReducer } from './slices/authSlice'
import { userReducer } from './slices/userSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    user: userReducer,
    // [authApi.reducerPath]: authApi.reducer,
  },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
