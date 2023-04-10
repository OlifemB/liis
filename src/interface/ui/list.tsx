import React from 'react';
import clsx from "clsx";


interface Props {
    children: React.ReactNode | React.ReactNode[]
    gap: number
    dir: 'row' | 'col'
}

const List: React.FC<Props> = ({children, gap, dir}) => {
    return (
        <div className={clsx(
            'flex',
            dir ? `flex-${dir}` : 'flex-col',
            gap && `gap-${gap}`,
        )}>
            {children}
        </div>
    );
};

export default List;