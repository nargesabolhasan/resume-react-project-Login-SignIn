import { React, useState, useEffect, useRef, memo } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modals from '../Modal/Modal';
import ShowPassword from '../ShowPassword/ShowPassword';
import { Formik } from 'formik';



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
            password: '',
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
                    password: '',
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
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: ""
                }}
                validate={values => {
                    const errors = {};
                    if (!values.email)  {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (values.password.length < 6) {
                        errors.password = 'password have to be at least 6 characters';
                    }
                    if (values.firstName.length < 6) {
                        errors.firstName = 'first Name have to be at least 6 characters';
                    }
                    if (values.lastName.length < 6) {
                        errors.lastName = 'last Name have to be at least 6 characters';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);

                    setUser(prev => ({
                        ...prev,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        password: values.password
                    }))
                    console.log(user)
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <Form
                        ref={form}
                        className='text-end '
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <div className="d-flex flex-row justify-content-center">
                            <Form.Group className="mb-3 me-1 col-6" >
                                <Form.Control
                                    className="text-end inputs"
                                    id="lastName-input"
                                    type="text"
                                    name="lastName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}
                                    placeholder="نام خانوادگی"
                                    required
                                />
                            </Form.Group>
                            <p className="error">
                                {errors.lastName && touched.lastName && errors.lastName}
                            </p>
                            <Form.Group className="mb-3 col-6" >
                                <Form.Control
                                    className="text-end inputs"
                                    id="firstName-input"
                                    type="text"
                                    name="firstName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName}
                                    placeholder="نام "
                                    required
                                />
                            </Form.Group>
                            <p className="error">
                                {errors.firstName && touched.firstName && errors.firstName}
                            </p>
                        </div>
                        <Form.Group className="mb-3" >
                            <Form.Control
                                className="text-end inputs"
                                id="email-input"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="email"
                                placeholder="پست الکترونیک"
                                value={values.email}
                                required
                            />
                        </Form.Group>
                        <p className="error">
                            {errors.email && touched.email && errors.email}
                        </p>
                        <ShowPassword
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p className="error">
                            {errors.password && touched.password && errors.password}
                        </p>
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

                )}
            </Formik>
            < Modals
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


