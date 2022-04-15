import { React, useState, useEffect, useCallback, useContext } from 'react';
import TabsItem from './TabsItem';
import TabsList from './TabsList';
import TabsContent from './TabsContent';
import Signin from '../Signin&Login/Signin';
import Login from '../Signin&Login/Login';

const Tabs = () => {

    //**state for tabs **// 
    const [data, setData] = useState([
        { id: 1, title: "ثبت نام" },
        { id: 2, title: "ورود " }
    ])
    
    //**state for selected TAb **// 
    const [selectedTAb, setselectedTAb] = useState(0)
    //----handleClick ------
    const handleClick = (index) => {
        setselectedTAb(index)
    }

    return (
        <div>
            <TabsList>
                {data.map((item, index) => (
                    <TabsItem
                        className={selectedTAb === index ? 'activeTab' : ''}
                        handleClick={() => handleClick(index)}
                        key={item.id}
                    >{item.title}</TabsItem>
                ))}
            </TabsList>
            <TabsContent tabId='0' activeTab={selectedTAb}>
                <Signin />
            </TabsContent>
            <TabsContent tabId='1' activeTab={selectedTAb}>
                <Login />
            </TabsContent>
        </div>
    );
};

export default Tabs;