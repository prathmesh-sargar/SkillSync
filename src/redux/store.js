import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice.js'
import jobSlice from './jobSlice.js'
import compnaySlice from './companySlice.js'
import applicantSlice from './applicants.js'
import appReducer from './storeSlices.js'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
    auth:authSlice,
    jobs:jobSlice,
    company:compnaySlice,
    applications:applicantSlice,
    app: appReducer

   
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;