import React from 'react';

const TabsItem = (props) => {
    const { handleClick, children, className } = props
    return (
        <li
            className={`tabs__item ${className}`}
            onClick={handleClick}
        >
            {children}
        </li>
    );
};

export default TabsItem;
