import { Link, useNavigate } from "react-router-dom";
import registerImage from "../../assets/images/Register-photo.png";
import {
  BsPersonFill,
  BsEnvelopeCheck,
  BsLockFill,
  BsFillTelephoneFill,
  BsGlobe,
} from "react-icons/bs";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import axios from "../../api/axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name Must Be More than 3 Characters")
      .max(15, "Name Must Be Less than 15 Characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Email Must Be a Valid"),
    phone: Yup.string()
      .required("Phone Number is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone Number Must Be a Valid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password Must Be More Than 6 Characters")
      .max(15, "Password Must Be Less Than 15 Characters"),
    age: Yup.number()
      .required("Age is required")
      .integer("Age should be an integer number")
      .moreThan(9, "Your age should be more than 9 year's old"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      age: "",
    },
    validationSchema: validate,
    onSubmit: function (values) {
      sendRegisterData(values);
    },
  });

  async function sendRegisterData(obj) {
    setLoader(true);
    try {
      const { data } = await axios.post("/users/signUp", obj);
      setLoader(false);
      if (data.msg === "done") {
        toast.success("Congratulations", {
          duration: 3000,
          className: "text-success px-5 fw-bolder my-3",
        });
        navigate("/login");
      }
    } catch (error) {
      setLoader(false);
      toast.error(error.response.data.msg, {
        duration: 3000,
        className: " text-danger px-5 fw-bolder my-3",
      });
    }
  }

  return (
    <div className="container">
      <div className="bg-white rounded shadow my-5 p-4">
        <div className="row align-items-center gx-3">
          <div className="col-md-6 bg-white shadow rounded p-4">
            <h1>Sign Up</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex align-items-center justify-content-center mb-3">
                <BsPersonFill className="me-3" />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.name && formik.touched.name && (
                <small className="text-danger text-center ">
                  {formik.errors.name}
                </small>
              )}
              <div className="d-flex align-items-center justify-content-center mb-3">
                <BsEnvelopeCheck className="me-3" />
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <small className="text-danger text-center ">
                  {formik.errors.email}
                </small>
              )}

              <div className="d-flex align-items-center justify-content-center mb-3">
                <BsLockFill className="me-3" />
                <div className="w-100 position-relative">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    className="form-control"
                    placeholder="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div
                    className="position-absolute top-50 end-0 translate-middle-y"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </div>
                </div>
              </div>
              {formik.errors.password && formik.touched.password && (
                <small className="text-danger text-center ">
                  {formik.errors.password}
                </small>
              )}

              <div className="d-flex align-items-center justify-content-center mb-3">
                <BsFillTelephoneFill className="me-3" />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.phone && formik.touched.phone && (
                <small className="text-danger text-center ">
                  {formik.errors.phone}
                </small>
              )}

              <div className="d-flex align-items-center justify-content-center mb-3">
                <BsGlobe className="me-3" />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Age"
                  id="age"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.age && formik.touched.age && (
                <small className="text-danger text-center ">
                  {formik.errors.age}
                </small>
              )}

              {loader ? (
                <button
                  type="button"
                  className="btn btn-outline-danger opacity-75 fw-bolder px-4"
                >
                  <span
                    className="spinner-border spinner-border-sm "
                    role="status"
                    aria-hidden="true"
                  ></span>
                </button>
              ) : (
                <button
                  disabled={!formik.isValid}
                  type="submit"
                  className="btn btn-danger opacity-75 mt-3"
                >
                  Sign Up
                </button>
              )}

              <div className="d-flex mt-3">
                <p className="me-3">Have an Account?</p>
                <Link to="/login">Sign In</Link>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div>
              <img src={registerImage} alt="Register" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
