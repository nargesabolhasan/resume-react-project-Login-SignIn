import { React, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowPassword from '../ShowPassword/ShowPassword';
import { useFormik } from 'formik';

const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    //
    return (
        <div className="col-8 mx-auto">
            <h1 className="text-center">خوش آمدید</h1>
            <Form onSubmit={formik.handleSubmit} >
                <Form.Group className="mb-3" >
                    <Form.Control
                        id="email"
                        name="email"
                        className="text-end inputs"
                        type="email"
                        placeholder="پست الکترونیک"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        required
                    />
                </Form.Group>
                <ShowPassword
                    value={formik.values.password}
                    onChange={formik.handleChange} />

                <Button className="forget ">فراموش کردید؟</Button>
                <Button className="col-12 buttons" variant="primary" type="submit">
                    ورود
                </Button>
            </Form>
        </div>
    );
}

export default Login