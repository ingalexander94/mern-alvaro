import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPasswordUser } from "store/auth";
import { SocialBar } from "components/socialbar/SocialBar";
import TextInput from "components/textinput/TextInput";
import Select from "components/select/Select";
import TextError from "components/texterror/TextError";

export const Forgot = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.ui);

  const formik = useFormik({
    initialValues: {
      email: "",
      role: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("The email is not valid")
        .required("Email is required"),
      role: Yup.string()
        .length(24, "Must Contain 24 Characters")
        .required("Role is required"),
    }),
    validateOnMount: true,
    onSubmit: (user) => {
      dispatch(forgotPasswordUser(user));
    },
  });

  return (
    <>
      <section>
        <div className="auth_wrapper animate__animated animate__bounceIn">
          <h1>Recovery password</h1>
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
                  autoComplete="off"
                  name="email"
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  required
                />
              </TextInput>
              <TextError formik={formik} value="email" />
              <Select
                onBlur={formik.handleBlur}
                value={formik.values.role}
                onInputChange={formik.handleChange}
              />
              <TextError formik={formik} value="role" />
              <button type="submit"  formMethod="POST" disabled={!formik.isValid || isLoading}>
                recovery {isLoading && <i className="fas fa-spinner fa-spin"></i>}
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
