import { React, useState, useEffect, useRef, memo } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modals from '../Modal/Modal';
import ShowPassword from '../ShowPassword/ShowPassword';
import { Formik } from 'formik';
import axios from "axios";



const Signin = ({ parentCallback }) => {
    const iranstatesURL = "./iranstates.json"
    const jsonURL = "http://localhost:3002/users"

    //..........declared ref..........//
    const selectInput2 = useRef(null);
    //..........declared ref..........//
    const form = useRef(null);
    //**state for validation form **//
    const [city, setCity] = useState({});
    //**state for selected city **//
    const [cityState, setCityState] = useState([]);
    //**state for modal **//
    const [show, setShow] = useState(false);
    //**state for select tag  **//
    const [showTag, setShowTag] = useState(false);
    //**state for inputs **//
    const [user, setUser] = useState({})
    //**state for axios loading**//
    const [loading, setLoading] = useState(false);
    //-----show & clouse modal-------

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    //------handleSubmit------
    const handleSubmit = () => {
        setShowTag(false)
        handleShow()
        // parentCallback(user)
        //axios:
        setLoading(true);
        axios.post(jsonURL, user)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(setLoading(false))
    };
    //--------fetch----------
    useEffect(() => {
        fetch(iranstatesURL)
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

    return (
        <div className="col-8 mx-auto">
            <h1 className="text-center">رایگان ثبت نام کنید </h1>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    education: user.education,
                    locOfEducation: user.education,
                    city: user.city,
                    state: user.state,
                    locOfBirth: user.locOfBirth
                }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (values.password.length < 8) {
                        errors.password = 'password have to be at least 8 characters';
                    }
                    if (values.firstName.length < 3) {
                        errors.firstName = 'first Name have to be at least 3 characters';
                    }
                    if (values.lastName.length < 3) {
                        errors.lastName = 'last Name have to be at least 3 characters';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        handleSubmit()
                        setSubmitting(false);
                        resetForm({})
                        setUser(values)
                    }, 400);
                }}
            >
                {({
                    isValid,
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
                        <>
                            <Form.Group className="mb-3 " >
                                <Form.Label className="text-white fs-5">استان</Form.Label>
                                <>
                                    <Form.Select
                                        className="text-end inputs"
                                        id="city-input"
                                        name="city"
                                        onChange={e => {
                                            handleChange(e);
                                            selectCityState(e)
                                        }}
                                        onBlur={handleBlur}
                                        value={values.city}
                                        required
                                    >
                                        <option></option>
                                        {Object.keys(city)?.map((item, i) => {
                                            return <option key={i}>{item}</option>
                                        })}
                                    </Form.Select >
                                </>
                            </Form.Group>
                        </>
                        <>
                            <Form.Group className="mb-3" >
                                <Form.Label className="text-white fs-5">(ابتدا استان انتخاب شود)شهرستان</Form.Label>
                                <Form.Select
                                    required
                                    value={values.state}
                                    id="state-input"
                                    name="state"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    ref={selectInput2}
                                    className="text-end inputs"
                                >
                                    <option></option>
                                    {cityState.map((item, index) => (
                                        <option key={index}>{item}</option>
                                    ))}
                                </Form.Select >
                            </Form.Group>
                        </>
                        <>
                            <Form.Group className="mb-3" >
                                <Form.Label className="text-white fs-5">محل تولد</Form.Label>
                                <Form.Select
                                    required
                                    value={values.locOfBirth}
                                    id="locOfBirth-input"
                                    name="locOfBirth"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="text-end inputs"
                                >
                                    <option></option>
                                    {Object.keys(city)?.map((item, i) => {
                                        return <option key={i}>{item}</option>
                                    })}
                                </Form.Select >
                            </Form.Group>
                        </>

                        <Form.Group className="mb-3" >
                            <Form.Label className="text-white fs-5">مدرک تحصیلی</Form.Label>
                            <Form.Select
                                value={values.education}
                                id="education-input"
                                name="education"
                                onChange={e => {
                                    handleChange(e);
                                    setShowTag(true)
                                }}
                                onBlur={handleBlur}
                                className="text-end inputs"
                            >
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
                                value={values.locOfEducation}
                                required
                                id="locOfEducation-input"
                                name="locOfEducation"
                                onChange={handleChange}
                                onBlur={handleBlur}

                            >
                                <option></option>
                                {Object.keys(city).map((item, i) => {
                                    return <option className="inputs" key={i}>{item}</option>
                                })}
                            </Form.Select>
                        </Form.Group>}
                        <Button
                            className="col-12 buttons"
                            variant="primary"
                            type="submit"
                            disabled={!isValid}>
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


