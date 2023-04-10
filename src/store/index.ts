import {combineReducers, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {all} from "redux-saga/effects";
import {hotelsReducer} from "@/store/hotels";
import {userReducer} from "@/store/user";
import {hotelsSaga} from "@/store/hotels/hotels.saga";


const saga = createSagaMiddleware();

function* rootSaga() {
    yield all([hotelsSaga()]);
}

const rootReducer = combineReducers({
    hotelsReducer,
    userReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: [saga],
    devTools: process.env.NODE_ENV !== "production",
});

saga.run(rootSaga);


export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;
