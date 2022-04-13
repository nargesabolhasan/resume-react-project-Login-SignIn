import { React, useState, useEffect, useCallback, useContext } from 'react';
import TabsItem from './TabsItem';
import TabsList from './TabsList';
import TabsContent from './TabsContent';
import Signin from '../Signin&Login/Signin';
import Login from '../Signin&Login/Login';
import Modals from '../Modal/Modal';
import axios from "axios";
import { jsonURL } from "../ConstanatURL/ConstURL"
import { isAuthenticatedContext } from '../Context/AuthContext'

const Tabs = () => {


    const { addToUser ,OpenWelcome} = useContext(isAuthenticatedContext)
    //**state for tabs **// 
    const [data, setData] = useState([
        { id: 1, title: "ثبت نام" },
        { id: 2, title: "ورود " }
    ])
    //**state for signin **// 
    const [signin, setSignin] = useState([])
    //**state for login **//  
    const [login, setLogin] = useState([])
    //**state for selected TAb **// 
    const [selectedTAb, setselectedTAb] = useState(0)
    //**state for modal **//
    const [show, setShow] = useState(false);
    //**state for text of modal **//
    const [modalText, setModalText] = useState('');
    //**state for style of modal **//
    const [modalStyle, setModalStyle] = useState('');
    //**state for axios loading**//
    const [loading, setLoading] = useState(false);



    //----handleClick ------
    const handleClick = (index) => {
        setselectedTAb(index)
    }
    //----handle Login ------
    const handleLogin = (input) => {
        setLogin(input);
        checkUser()
    };
    //----check pass and email is valid------
    const checkUser = useCallback(() => {
        signin.forEach(item => {
            if (item.password === login.password && item.email === login.email) {
                addToUser(item);
                OpenWelcome(true);
            } else {
                handleShow("رمز یا ایمیل اشتباه است","failer")
            }
        })
    }, [login])

    //----useEffect-------
    useEffect(() => {
        checkUser()
    }, [login])

    //-----show & close modal-------
    const handleShow = (text, style) => {
        setShow(true)
        setModalText(text)
        setModalStyle(style)
    }
    //----handle Signin------
    useEffect(() => {
        setLoading(true);
        axios
            .get(jsonURL)
            .then((res) => setSignin(res.data))
            .catch((cth) => alert("url not found"))
            .finally(() => setLoading(false));
    }, []);
    //----close modal-------
    const handleClose = () => {
        setShow(false)
    };


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
                <Login parentCallback={handleLogin} />
            </TabsContent>
            <Modals
                handleShow={() => handleShow()}
                handleClose={() => handleClose()}
                show={show}
                bodyMassages={modalText}
                className={modalStyle}
            />
        </div>
    );
};

export default Tabs;