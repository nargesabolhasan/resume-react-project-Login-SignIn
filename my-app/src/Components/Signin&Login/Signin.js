import { React, useState, useEffect, useRef, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modals from '../Modal/Modal';
import ShowPassword from '../ShowPassword/ShowPassword';
import { Formik } from 'formik';
import axios from "axios";
import { jsonURL,iranstatesURL} from "../ConstanatURL/ConstURL"
import '../Tabs/TAB.css'

const Signin = () => {
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
    const handleSubmit = (userInfo) => {
        setShowTag(false)
        handleShow()
        //axios:
        setLoading(true);
        axios.post(jsonURL, userInfo)
            .then(function (response) {
                console.log(response.data);
            })
            .catch((cth) => alert("url not found"))
            .finally(setLoading(false))
    };
    //--------fetch----------
    useEffect(() => {
        axios.get(iranstatesURL)
        .then((res) => setCity(res.data))
    }, [])
   

    //------change options of select tag-----------
    const selectCityState = (e) => {
        let cityList = e.target;
        let stateOfCity = selectInput2.current
        let selectedCity = cityList.options[cityList.selectedIndex].index - 1;
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
                        errors.email = 'این بخش الزامی است';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'ایمیل نا معتبر است';
                    }
                    if (values.password.length < 8) {
                        errors.password = 'پسورد حداقل 8 کاراکتر باشد';
                    }
                    if (values.firstName.length < 3) {
                        errors.firstName = 'نام حداقل 3 حرف داشته باشد';
                    }
                    if (values.lastName.length < 3) {
                        errors.lastName = 'نام خانوادگی حداقل 3 حرف داشته باشد';
                    }
                    if (!values.city) {
                        errors.city = 'این بخش الزامی است ';
                    }
                    if (!values.state) {
                        errors.state = 'این بخش الزامی است';
                    }
                    if (!values.locOfBirth) {
                        errors.locOfBirth = 'این بخش الزامی است';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        handleSubmit(values)
                        setSubmitting(false);
                        resetForm({})
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
                            <Form.Group className="d-flex flex-column mb-3 me-1 col-6" >
                                <Form.Control
                                    className="text-end inputs col-12"
                                    id="lastName-input"
                                    type="text"
                                    name="lastName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}
                                    placeholder="نام خانوادگی"
                                    required
                                />
                                <p className="error col-12">
                                    {errors.lastName && touched.lastName && errors.lastName}
                                </p>
                            </Form.Group>

                            <Form.Group className="d-flex flex-column mb-3 me-1 col-6" >
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
                                <p className="error col-12">
                                    {errors.firstName && touched.firstName && errors.firstName}
                                </p>
                            </Form.Group>
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
                            <p className="error col-12">
                                {errors.city && touched.city && errors.city}
                            </p>
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
                            <p className="error col-12">
                                {errors.state && touched.state && errors.state}
                            </p>
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
                            <p className="error col-12">
                                {errors.locOfBirth && touched.locOfBirth && errors.locOfBirth}
                            </p>
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
                        <p className="error col-12">
                            {errors.locOfEducation && touched.locOfEducation && errors.locOfEducation}
                        </p>


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

export default Signin


