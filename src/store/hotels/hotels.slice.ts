import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IHotel, IHotelFavoritesSort, IHotelFilters, IHotelsState} from "@/store/hotels/hotels.types";


const hotelsState: IHotelsState = {
    list: {
        data: [],
        isLoading: true,
        filters: {
            location: '',
            checkIn: '',
            checkOut: '',
            days: 1,
        },
    },
    favorites: {
        data: [],
        sort: {
            by: null,
            dir: null
        }
    },
}

export const hotelsSlice = createSlice({
    name: 'hotels',
    initialState: hotelsState,
    reducers: {
        addFavoritesItem: (state, action: PayloadAction<IHotel>) => {
            state.favorites.data = [...state.favorites.data, {...action.payload}]
        },
        removeFavoritesItem: (state, action: PayloadAction<IHotel>) => {
            state.favorites.data.splice(state.favorites.data.findIndex(({hotelId}) => hotelId === action.payload.hotelId), 1)
        },
        getHotelsFetch: (state) => {
            state.list.isLoading = true;
        },
        getHotelsSuccess: (state, action) => {
            state.list.data = action.payload;
            state.list.isLoading = false;
        },
        getHotelsReject: (state, action) => {
            state.list.isLoading = false;
        },
        setHotelsFilters: (state, action: PayloadAction<IHotelFilters>) => {
            state.list.filters = action.payload
        },
        setFavoritesSort: (state, action: PayloadAction<IHotelFavoritesSort>) => {
            state.favorites.sort = action.payload
        }
    }
})
export const {
    addFavoritesItem,
    removeFavoritesItem,
    getHotelsFetch,
    getHotelsSuccess,
    getHotelsReject,
    setHotelsFilters,
    setFavoritesSort
} = hotelsSlice.actions
export const hotelsActions = hotelsSlice.actions
export const hotelsReducer = hotelsSlice.reducer