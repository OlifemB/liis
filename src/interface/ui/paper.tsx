import React from 'react';
import clsx from "clsx";


interface PaperProps {
    children: React.ReactNode | React.ReactNode[]
    style?: React.CSSProperties
    className?: string
}

const Paper: React.FC<PaperProps> = ({children, style, className, ...props}) => {
    return (
        <div {...props} className={clsx('paper', className)} style={style}>
            {children}
        </div>
    );
};

export default Paper;