import {ChangeEvent, useEffect, useState} from 'react';


export type ListItem = { name: string; age: number; country: string };
export type SortDirection = "asc" | "desc";
export type ItemKey<T> = keyof T;
export type SortOption<T> = {
    label: T[ItemKey<T>];
    value: ItemKey<T>;
};

export interface SortProps<T> {
    data: T[];
    sortOptions: any[];
    
    onSortChange(data: T[]): void;
}

export function compareObjectsByKey<T>(key: keyof T, ascending = true) {
    return function innerSort(objectA: T, objectB: T) {
        const sortValue = objectA[key] > objectB[key] ? 1 : objectA[key] < objectB[key] ? -1 : 0;
        return ascending ? sortValue : -1 * sortValue;
    };
}

export function useSort<T>({data, onSortChange, sortOptions}: SortProps<T>) {
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const initialSortKey = sortOptions[0].value as ItemKey<T>;
    const [sortKey, setSortKey] = useState<ItemKey<T>>(initialSortKey);
    
    useEffect(() => {
        const sortedData = [...data];
        
        sortedData.sort(compareObjectsByKey(sortKey, sortDirection === 'asc'));
        
        if (onSortChange) {
            onSortChange(sortedData);
            
        }
    }, [data, onSortChange, sortDirection, sortKey]);
    
    const handleSortKeyChange = (param: string) => {
        const newSortKey = param as ItemKey<T>;
        if (sortKey !== newSortKey) {
            setSortKey(newSortKey);
        }
    };
    
    const handleDirectionToggle = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };
    
    const handleSetDirection = (dir: 'asc' | 'desc') => {
        setSortDirection(dir)
    }
    
    return {
        handleDirectionToggle,
        handleSortKeyChange,
        handleSetDirection,
        sortDirection,
        sortKey,
    };
}