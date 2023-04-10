import {SortDirection} from "@/libs/hooks/useSort";


export interface IHotel {
    hotelId: string
    hotelName: string
    stars: number
    locationId: string
    location: {
        name: string
        country: string
        geo: {
            lon: number
            lat: number
        }
    }
    priceAvg: number
    priceForm: number
    price?:number
    days?:number
}


export interface IHotelFilters {
    checkIn: string
    checkOut: string
    days: number
    location: string
}

export interface IHotelsList {
    data: IHotel[]
    filters: IHotelFilters
    isLoading: boolean
}

// FAVORITES
export interface IHotelFavoritesSort {
    by: string | null
    dir: SortDirection | null
}

export interface IHotelFavorites {
    data: IHotel[],
    sort: IHotelFavoritesSort
}

//MAIN STATE
export interface IHotelsState {
    list: IHotelsList
    favorites: IHotelFavorites
}
