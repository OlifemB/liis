import React, {useEffect, useState} from 'react';
import IconArrowSeparator from "@/assets/icons/icon-arrowSeparator.svg";
import Paper from "@/interface/ui/paper";
import {useActionCreators, useAppSelector} from "@/libs/hooks";
import {hotelsActions, IHotel,} from "@/store/hotels";
import dayjs from "dayjs";
import MainCarousel from "@/interface/components/main-carousel";
import Spinner from "@/interface/ui/spinner";
import HotelListItem from "@/interface/components/hotel-list-item";


const MainContent = () => {
    const hotels = useAppSelector(state => state.hotelsReducer)
    const {getHotelsFetch} = useActionCreators(hotelsActions)
    const date = new Date(hotels.list.filters.checkIn)
    
    useEffect(() => {
        if (hotels.list.filters.location)
            getHotelsFetch(hotels.list.filters)
    }, [hotels.list.filters])
    
    return (
        <Paper className={'flex flex-col py-12 px-8 gap-6'}>
            <div className={'flex flex-row justify-between items-center gap-4 w-full'}>
                <div className={'flex flex-row justify-between items-center gap-5'}>
                    <h2 className="header1"> Отели </h2>
                    <div className={'font-bold'}>
                        <IconArrowSeparator/>
                    </div>
                    <h2 className="header1"> Москва</h2>
                </div>
                <div className={'text-date c-primary'}>{dayjs().format('D MMMM YYYY')}</div>
            </div>
            
            <div className={'overflow-hidden'}>
                <MainCarousel/>
            </div>
            
            <div className={'flex flex-col gap-3'}>
                <div className={'text1'}>
                    Добавлено в Избранное: <b className={'c-primary'}>{hotels.favorites.data.length}</b> отеля
                </div>
                
                <div className={'flex flex-col'}>
                    {hotels.list.data && !hotels.list.isLoading && hotels.list.data.map((item: IHotel) =>
                        <HotelListItem
                            key={`hotel-item-${item.hotelId}`}
                            hotel={item}
                            date={date}
                            days={hotels.list.filters.days}
                            isLike={hotels.favorites.data.some(({hotelId}) => hotelId === item.hotelId)}
                            isFull
                        />
                    )}
                    {hotels.list.isLoading && <Spinner/>}
                </div>
            </div>
        </Paper>
    );
}

export default MainContent;