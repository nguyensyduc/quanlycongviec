import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import { generalPersistConfig } from "./reduxPersist";
import jobsSlice from "./jobsSlice";

const version = 22021401
const reducerPersist = persistReducer(
    generalPersistConfig({
        whiteList: ['user'],
        version: version
    }),
    userSlice,
    // jobsSlice
)

const store = configureStore({
    reducer: {
        // user: reducerPersist,
        user: userSlice,
        jobs: jobsSlice
    },
    // reducer: reducerPersist,
    middleware: (getDefaultMiddleware) => {
        const middlewares = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
        return middlewares
    },
})

export default store

// const persistor = persistStore(store)

// export { store, persistor }