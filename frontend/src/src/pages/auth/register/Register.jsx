import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { SocialBar } from "components/socialbar/SocialBar";
import { registerUser } from "store/auth";
import { showToast } from "utils/alerts";
import Select from "components/select/Select";
import TextInput from "components/textinput/TextInput";
import codes from "resources/codes.json";
import PasswordInput from "components/passwordInput/PasswordInput";
import TextError from "components/texterror/TextError";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.ui);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Fullname is required"),
      email: Yup.string()
        .email("The email is not valid")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          "^(?=.*[A-Z])(?=.*[!.@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$",
          "Must Contain minime 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
      role: Yup.string()
        .length(24, "Must Contain 24 Characters")
        .required("Role is required"),
    }),
    validateOnMount: true,
    onSubmit: (user) => {
      dispatch(
        registerUser(user, () => {
          showToast("success", codes["MA1105"]);
          navigate("/auth/login");
        })
      );
    },
  });

  return (
    <>
      <section>
        <div className="auth_wrapper animate__animated animate__bounceIn">
          <h1>Sign up</h1>
          <div className="auth_form">
            <SocialBar />
            <div className="separator">
              <div></div>
              <span>or</span>
              <div></div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <TextInput text="fullname" icon="fa-user">
                <input
                  id="fullname"
                  name="fullname"
                  onBlur={formik.handleBlur}
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  autoComplete="off"
                  required
                />
              </TextInput>
              <TextError formik={formik} value="fullname" />
              <TextInput text="email" icon="fa-at">
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="off"
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  required
                />
              </TextInput>
              <TextError formik={formik} value="email" />
              <PasswordInput
                name="password"
                text="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onInputChange={formik.handleChange}
              />
              <TextError formik={formik} value="password" />
              <PasswordInput
                name="confirmPassword"
                text="confirm password"
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                onInputChange={formik.handleChange}
              />
              <TextError formik={formik} value="confirmPassword" />
              <Select
                value={formik.values.role}
                onInputChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextError formik={formik} value="role" />
              <button formMethod="POST" type="submit"  disabled={!formik.isValid || isLoading}>
                create account{" "}
                {isLoading && <i className="fas fa-spinner fa-spin"></i>}
              </button>
            </form>
          </div>
          <p>
            Already have an account ? <Link to="/auth/login">Login</Link>
          </p>
        </div>
      </section>
    </>
  );
};
