import React, {useCallback, useState} from 'react';
import Paper from "@/interface/ui/paper";
import HotelListItem from "@/interface/components/hotel-list-item";
import BtnFilter from "@/interface/ui/btn-filter/btn-filter";
import { useAppSelector} from "@/libs/hooks";
import {IHotel} from "@/store/hotels";
import {useSort} from "@/libs/hooks";


export interface SortControlProps<T> {
    data: T[]
    sortOptions: any[]
    onSortChange(data: T[]): void
}

export default function AsideFavorites() {
    const filters = useAppSelector(state => state.hotelsReducer.list.filters)
    const {favorites} = useAppSelector(state => state.hotelsReducer)
    const hotels = useAppSelector(state => state.hotelsReducer)
    const [hotelsList, setHotelsList] = useState<IHotel[]>([])
    
    const handleSortChange = useCallback((data: IHotel[]) => {
        setHotelsList(data);
    }, [])
    
    const sortProps: SortControlProps<IHotel> = {
        data: favorites.data,
        onSortChange: handleSortChange,
        sortOptions: [{label: "Цена", value: "priceAvg"}, {label: "Рейтинг", value: "stars"}]
    }
    const {
        handleDirectionToggle,
        handleSortKeyChange,
        handleSetDirection,
        sortDirection,
        sortKey
    } = useSort(sortProps)
    
    
    const handleClickBtnSort = (id: string) => {
        const isCurrent = id === sortKey
        isCurrent ? handleDirectionToggle() : [handleSetDirection('asc'), handleSortKeyChange(id)]
    }
    
    return (
        <Paper className={'flex flex-col p-8 gap-8 w-full'}>
            <h4 className={'header2'}>Избранное</h4>
            
            <div className={'flex flex-col gap-4'}>
                <div className={'flex flex-row gap-2'}>
                    <BtnFilter
                        title={'Цена'}
                        id={'priceAvg'}
                        handleClickBtnSort={handleClickBtnSort}
                        sortDirection={sortDirection}
                        sortKey={sortKey}
                    />
                    
                    <BtnFilter
                        title={'Рейтинг'}
                        id={'stars'}
                        handleClickBtnSort={handleClickBtnSort}
                        sortDirection={sortDirection}
                        sortKey={sortKey}
                    />
                </div>
                
                
                <div className={'flex flex-col gap-3'}>
                    {hotelsList && hotelsList.map(hotel =>
                        <HotelListItem
                            key={`favorite-item-${hotel.hotelId}`}
                            hotel={hotel}
                            price={hotel.priceAvg}
                            days={hotel.days}
                            date={new Date(filters.checkIn)}
                            isLike={true}
                        />
                    )}
                </div>
            </div>
        
        
        </Paper>
    );
}