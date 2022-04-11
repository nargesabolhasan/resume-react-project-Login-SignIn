import React from 'react';

const TabsList = (props) => {
  const {children}=props
  return (
    <ul className='tabs__list'>
      {children}
    </ul>
  );
};

export default TabsList;