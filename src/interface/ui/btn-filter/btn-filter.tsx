import React, {useEffect, useState} from 'react';
import ElArrowUp from '@/assets/icons/el-arrow-up.svg'
import ElArrowDown from '@/assets/icons/el-arrow-down.svg'
import style from './styles.module.scss'
import clsx from "clsx";


interface BtnFilterProps {
    id: string
    title: string
    handleClickBtnSort:Function
    sortDirection?: any
    sortKey?: any
}

const BtnFilter: React.FC<BtnFilterProps> = ({
    id,
    title,
    sortDirection,
    handleClickBtnSort,
    sortKey,
}) => {
    const [state, setState] = useState(0)
    const isSelect = id === sortKey
    
    

    
    return (
        <div
            className={clsx(style.root, isSelect && style.active)}
            onClick={()=>handleClickBtnSort(id)}
        >
            <div className={clsx(style.title, isSelect && style.active)}>
                {title}
            </div>
            
            <div className={style.arrows}>
                <ElArrowUp className={clsx(isSelect && sortDirection === 'asc' && style.active)}/>
                <ElArrowDown className={clsx(isSelect && sortDirection === 'desc' && style.active)}/>
            </div>
        </div>
    );
};

export default BtnFilter;