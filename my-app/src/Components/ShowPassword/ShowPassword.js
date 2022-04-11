import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { React, useState, memo } from 'react';


const ShowPassword = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  //
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const { value, onChange,onBlur } = props
  return (
    <Form.Group className="mb-3 d-flex flex-row " >
      <Form.Control
        name="password"
        className="text-end inputs"
        type={passwordShown ? "text" : "password"}
        value={value}
        placeholder="کلمه عبور"
        onChange={onChange}
        onBlur={onBlur}
        required
      />
      <span
        className="iconeHolder text-white p-2 border border-secondary fs-5"
        onClick={togglePassword}>
        {!passwordShown && <IoEyeOutline onClick={togglePassword} />}
        {passwordShown && <IoEyeOffOutline onClick={togglePassword} />}
      </span>

    </Form.Group>
  )
}

export default memo(ShowPassword)