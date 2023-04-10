import React, {useEffect, useState} from 'react';
import {Button, DatePicker, DatePickerProps, Input, InputNumber} from "antd";
import Paper from "@/interface/ui/paper";
import dayjs, {Dayjs} from "dayjs";
import ru_dayjs from 'dayjs/locale/ru'
import ru_picker from 'antd/es/date-picker/locale/ru_RU'
import IconCalendar from '@/assets/icons/icon-calendar.svg'
import {useActionCreators, useAppDispatch} from "@/libs/hooks";
import {validateNumbers} from "@/libs/utils/validator";
import {hotelsActions} from "@/store/hotels";


dayjs.locale(ru_dayjs)

const AsideFilters = () => {
    const {setHotelsFilters} = useActionCreators(hotelsActions)
    const [location, setLocation] = useState<string>('Москва')
    const [date, setDate] = useState<Dayjs | null>(dayjs)
    const [days, setDays] = useState<number>(1)
    
    useEffect(() => {
        loadHotels()
    }, [])
    
    const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value)
    }
    
    const handleChangeDate: DatePickerProps['onChange'] = (date) => {
        setDate(date);
    }
    
    const handleChangeDay = (value: number) => {
        setDays(value)
    }
    
    const loadHotels = () => {
        const params = {
            location: location?.toLowerCase(),
            checkIn: dayjs(date).format('YYYY-MM-DD'),
            checkOut: dayjs(new Date).add(Number(days), 'day').format('YYYY-MM-DD'),
            days: days
        }
        setHotelsFilters(params)
    }
    
    
    return (
        <Paper className={'flex flex-col items-start p-8 gap-8 w-full'}>
            <div className={'flex flex-col gap-4 w-full'}>
                <div className={'input-with-label'}>
                    <span className={'weight-500'}> Локация </span>
                    <Input placeholder="Локация"
                           value={location}
                           onChange={handleChangeLocation}
                    />
                </div>
                
                <div className={'input-with-label'}>
                    <span className={'weight-500'}> Дата заселения </span>
                    <DatePicker
                        value={date}
                        onChange={handleChangeDate}
                        suffixIcon={<IconCalendar/>}
                        clearIcon={false}
                        showToday={false}
                        locale={ru_picker}
                        format={'DD.MM.YYYY'}
                    />
                </div>
                
                <div className={'input-with-label'}>
                    <span className={'weight-500'}> Количество дней </span>
                    <InputNumber
                        min={1}
                        defaultValue={3}
                        value={days}
                        onChange={handleChangeDay}
                        onKeyPress={validateNumbers}
                        onBlur={() => !days && setDays(1)}
                    />
                </div>
                
                <Button
                    className={'btn-main'}
                    htmlType="submit"
                    onClick={loadHotels}
                >
                    Найти
                </Button>
            </div>
        </Paper>
    );
};

export default AsideFilters;