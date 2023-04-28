import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SocialBar } from "components/socialbar/SocialBar";
import { loginUser } from "store/auth";
import Select from "components/select/Select";
import TextInput from "components/textinput/TextInput";
import PasswordInput from "components/passwordInput/PasswordInput";
import TextError from "components/texterror/TextError";
import "./login.css";

export const Login = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.ui);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "", 
      role: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("The email is not valid")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          "^(?=.*[A-Z])(?=.*[!.@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$",
          "Must Contain minime 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      role: Yup.string()
        .length(24, "Must Contain 24 Characters")
        .required("Role is required"),
    }),
    validateOnMount:true,
    onSubmit: (user) => {
      dispatch(loginUser(user));
    },
  });

  return (
    <>
      <section>
        <div className="auth_wrapper animate__animated animate__bounceIn">
          <h1>Sign in </h1>
          <div className="auth_form">
            <SocialBar />
            <div className="separator">
              <div></div>
              <span>or</span>
              <div></div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <TextInput text="email" icon="fa-at">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                  value={formik.values.email}
                  onChange={formik.handleChange}
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
              <Select
                value={formik.values.role}
                onInputChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextError formik={formik} value="role" />
              <button formMethod="POST" type="submit" disabled={!formik.isValid || isLoading}>
                login {isLoading && <i className="fas fa-spinner fa-spin"></i>}
              </button>
            </form>
          </div>
          <p>
            Need an account ? <Link to="/auth/register"> Register </Link>
          </p>
          <Link className="link_recovery" to="/auth/forgot">
            Forgot password? 
          </Link>
        </div>
      </section>
    </>
  );
};
