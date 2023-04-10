import React, {useState} from 'react';
import IconHouse from '@/assets/icons/icon-house.svg'
import IconHeartFill from '@/assets/icons/icon-heart-fill.svg'
import IconHeartOl from '@/assets/icons/icon-heart-ol.svg'
import {Rate} from "antd";
import dayjs from "dayjs";
import {useActionCreators, useAppDispatch} from "@/libs/hooks";
import {hotelsActions,} from "@/store/hotels";
import {IHotel} from "@/store/hotels/hotels.types";


interface HotelListItemProps {
    hotel: IHotel
    rating?: number
    price?: number
    date?: Date
    days?: number
    isLike?: boolean
    isFull?: boolean
}

export default function HotelListItem({hotel, date, days, isLike, isFull,price}: HotelListItemProps) {
    const {removeFavoritesItem,addFavoritesItem} = useActionCreators(hotelsActions)
    
    return (
        <div className={'flex flex-row gap-6 items-center py-4 hotel-list-item'}>
            {isFull &&
                <div className={'w-16 h-16 rounded-full flex items-center justify-center'}
                     style={{backgroundColor: '#F5F6F4'}}>
                    <IconHouse/>
                </div>
            }
            
            <div className={'flex flex-col flex-1'}>
                <div className={'flex flex-row justify-between'}>
                    <div className={'text1'}>{hotel.hotelName}</div>
                    <div className={'cursor-pointer'}
                    >
                        {isLike
                            ? <IconHeartFill onClick={() => removeFavoritesItem(hotel)}/>
                            : <IconHeartOl onClick={() => addFavoritesItem({...hotel, days})}/>
                        }
                    </div>
                </div>
                
                <div className={'text2'}>
                    {date && <span>{dayjs(date.toString()).format('D MMMM YYYY')} - {days} день</span>}
                </div>
                
                <div className={'flex flex-row justify-between items-end'}>
                    <Rate value={hotel.stars || 0} className={'c-yellow'} disabled/>
                    
                    <div className={'flex flex-row'}>
                        <span className={'text3 mr-2 inline-block'}>Price:</span>
                        <span className={'text-price inline-block'}>{price || hotel.priceAvg} ₽</span>
                    </div>
                </div>
            </div>
        </div>
    );
}