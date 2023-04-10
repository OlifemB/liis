import {call, CallEffect, put, PutEffect, takeEvery} from 'redux-saga/effects';
import {hotelsActions, IHotelFilters} from "@/store/hotels";
import axios from "axios";
import {PayloadAction} from "@reduxjs/toolkit";


interface IFetchHotelsSaga {
    query: string,
    checkIn: string,
    checkOut: string
    limit?: number
    lang?: string
    location?: string
    waitForResult?: boolean
    currency?: string
}

export const fetchHotelsSaga = async (params: IFetchHotelsSaga) => {
    const headers = {'Content-Type': 'application/json, text/plain, */*'}
    //const signature = md5( `${API_TOKEN}:${API_MARKER}:${Object.values(params).toString().replaceAll(',', ':')}`)
    const {data} = await axios.get('http://engine.hotellook.com/api/v2/cache.json', {params, headers})
    return data
}

function* workGetHotelsFetch({payload}: PayloadAction<IFetchHotelsSaga>)
    : Generator<CallEffect<IFetchHotelsSaga> | PutEffect<{ payload: IHotelFilters, type: string }>, void, IFetchHotelsSaga> {
    try {
        const response = yield call(fetchHotelsSaga, {
            location: payload.location,
            currency: 'rub',
            lang: 'ru',
            checkIn: payload.checkIn,
            checkOut: payload.checkOut,
            limit: 100,
        })
        
        yield put(hotelsActions.getHotelsSuccess(response));
    } catch (error) {
        yield put(hotelsActions.getHotelsReject('Error'));
    }
}

export function* hotelsSaga() {
    yield takeEvery('hotels/getHotelsFetch', workGetHotelsFetch)
}