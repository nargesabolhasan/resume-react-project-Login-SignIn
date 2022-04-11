import { React, useState, useEffect, useRef,memo } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modals from '../Modal/Modal';
import ShowPassword from '../ShowPassword/ShowPassword';


const Signin = ({ parentCallback }) => {
    //..........declared ref..........//
    const selectInput2 = useRef(null);
    //..........declared ref..........//
    const form = useRef(null);
    //**state for validation form **//
    const [city, setCity] = useState({});
    //**state for selected city **//
    const [cityState, setCityState] = useState([]);
    //**state for validation form **//
    const [validated, setValidated] = useState(false);
    //**state for modal **//
    const [show, setShow] = useState(false);
    //**state for select tag  **//
    const [showTag, setShowTag] = useState(false);
    //**state for inputs **//
    const [user, setUser] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            pasword: '',
            education: '',
            locOfEducation: '',
            city: '',
            locOfBirth: ''
        }
    )
    //-----show & clouse modal-------
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false)
        // window.location.reload(false);
    };
    //------handleSubmit------
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setShowTag(false)
            handleShow()
            parentCallback(user)
            setUser(
                {
                    firstName: '',
                    lastName: '',
                    email: '',
                    pasword: '',
                    education: '',
                    locOfEducation: '',
                    city: '',
                    locOfBirth: ''
                }
            )
        }
        setValidated(true);
    };
    //--------fetch----------
    useEffect(() => {
        fetch("./iranstates.json")
            .then((response) => response.json())
            .then(data => setCity(data))
    }, [])
    //------change options of select tag-----------
    const selectCityState = (e) => {
        let cityList = e.target;
        let stateOfCity = selectInput2.current
        let selectedCity = cityList.options[cityList.selectedIndex].index;
        while (stateOfCity.options.length) {
            stateOfCity.remove(0);
        }
        let stateOfSelectedCity = Object.values(city)[selectedCity];
        if (stateOfSelectedCity) {
            setCityState(stateOfSelectedCity)
        }
    }
    //------open select tag-----------
    const openSelectTag = () => {
        setShowTag(true)
    }
    return (
        <div className="col-8 mx-auto">
            <h1 className="text-center">رایگان ثبت نام کنید  </h1>
            <Form
                ref={form}
                className='text-end '
                noValidate
                validated={validated}
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="d-flex flex-row justify-content-center">
                    <Form.Group className="mb-3 me-1 col-6" >
                        <Form.Control
                            className="text-end inputs"
                            type="text"
                            placeholder="نام خانوادگی"
                            value={user.lastName}
                            onChange={(e) => setUser(prev => ({ ...prev, lastName: e.target.value }))}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 col-6" >
                        <Form.Control
                            className="text-end inputs"
                            type="text"
                            placeholder="نام "
                            value={user.firstName}
                            onChange={(e) => setUser(prev => ({ ...prev, firstName: e.target.value }))}
                            required
                        />
                    </Form.Group>
                </div>
                <Form.Group className="mb-3" >
                    <Form.Control
                        className="text-end inputs"
                        type="email"
                        placeholder="پست الکترونیک"
                        value={user.email}
                        onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                        required
                    />
                </Form.Group>
                <ShowPassword
                    value={user.pasword}
                    onChange={(e) => setUser(prev => ({ ...prev, pasword: e.target.value }))
                    } />
                <Form.Group className="mb-3 " >
                    <Form.Label className="text-white fs-5">استان</Form.Label>
                    <Form.Select
                        className="text-end inputs"
                        required
                        onChange={(e) => {
                            selectCityState(e)
                            setUser(prev => ({ ...prev, city: e.target.value }))
                        }
                        }
                    >
                        <option defaultValue></option>
                        {Object.keys(city).map((item, i) => {
                            return <option key={i}>{item}</option>
                        })}
                    </Form.Select >
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label className="text-white fs-5">(ابتدا استان انتخاب شود)شهرستان</Form.Label>
                    <Form.Select
                        ref={selectInput2}
                        className="text-end inputs"
                        onChange={(e) => setUser(prev => ({ ...prev, education: e.target.value }))} >
                        <option defaultValue></option>
                        {cityState.map((item, index) => (
                            <option key={index}>{item}</option>
                        ))}
                    </Form.Select >
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label className="text-white fs-5">محل تولد</Form.Label>
                    <Form.Select
                        className="text-end inputs"
                        onChange={(e) => setUser(prev => ({ ...prev, locOfBirth: e.target.value }))}
                        required
                    >
                        <option defaultValue ></option>
                        {Object.keys(city).map((item, i) => {
                            return <option key={i}>{item}</option>
                        })}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label className="text-white fs-5">مدرک تحصیلی</Form.Label>
                    <Form.Select
                        className="text-end inputs"
                        onChange={(e) => {
                            openSelectTag()
                            setUser(prev => ({ ...prev, education: e.target.value }))
                        }
                        } >
                        <option></option>
                        <option>دیپلم</option>
                        <option> کارشناسی پیوسته </option>
                        <option>کارشناسی ناپیوسته </option>
                        <option> کارشناسی ارشد </option>
                        <option>دکتری </option>
                    </Form.Select>
                </Form.Group>
                {showTag && <Form.Group className="mb-3" >
                    <Form.Label className="text-white fs-5">محل تحصیل</Form.Label>
                    <Form.Select
                        className="text-end inputs"
                        onChange={(e) => setUser(prev => ({ ...prev, locOfEducation: e.target.value }))}
                        required>
                        <option defaultValue></option>
                        {Object.keys(city).map((item, i) => {
                            return <option className="inputs" key={i}>{item}</option>
                        })}
                    </Form.Select>
                </Form.Group>}
                <Button className="col-12 buttons" variant="primary" type="submit">
                    ثبت نام
                </Button>
            </Form>
            <Modals
                handleShow={() => handleShow()}
                handleClose={() => handleClose()}
                show={show}
                className="succsess"
                massages="موفقیت"
                bodyMassages="عملیات با موفقیت انجام شد"
            />
        </div>
    )
}

export default memo(Signin)