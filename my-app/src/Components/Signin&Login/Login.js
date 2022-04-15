import { React, useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ShowPassword from "../ShowPassword/ShowPassword";
import { useFormik } from "formik";
import { isAuthenticatedContext } from "../Context/AuthContext";
import higherOrederComponent from "../HOC/WithFetch";
import { jsonURL } from "../ConstanatURL/ConstURL";
import Modals from "../Modal/Modal";

const Login = ({url}) => {
  const { addToUser } = useContext(isAuthenticatedContext);
  //**state for modal **//
  const [show, setShow] = useState(false);
  //**state for text of modal **//
  const [modalText, setModalText] = useState("");
  //**state for style of modal **//
  const [modalStyle, setModalStyle] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      url.forEach((item) => {
        if (item.password === values.password && item.email === values.email) {
          addToUser(item);
        } else {
          handleShow("رمز یا ایمیل اشتباه است", "failer");
        }
      });
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "این بخش الزامی است";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "ایمیل نا معتبر است";
      }
      if (values.password.length < 8) {
        errors.password = "رمز حداقل 8 کاراکتر باشد";
      }
      return errors;
    },
  });

  //----close modal-------
  const handleClose = () => {
    setShow(false);
  };
  //-----show & close modal-------
  const handleShow = (text, style) => {
    setShow(true);
    setModalText(text);
    setModalStyle(style);
  };

  return (
    <div className="col-8 mx-auto" style={{ height: "85vh" }}>
      <h1 className="text-center">خوش آمدید</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
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
        <p className="error" style={{ direction: "rtl" }}>
          {formik.errors.email}
        </p>
        <ShowPassword
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <p className="error" style={{ direction: "rtl" }}>
          {formik.errors.password}
        </p>

        <Button className="forget ">فراموش کردید؟</Button>
        <Button className="col-12 buttons" variant="primary" type="submit">
          ورود
        </Button>
      </Form>

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

export default higherOrederComponent(Login, jsonURL);
