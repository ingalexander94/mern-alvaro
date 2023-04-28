import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { recoveryPasswordUser } from "store/auth";
import PasswordInput from "components/passwordInput/PasswordInput";
import TextError from "components/texterror/TextError";

export const Recovery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoading } = useSelector((state) => state.ui);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("New Password is required")
        .matches(
          "^(?=.*[A-Z])(?=.*[!.@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$",
          "Must Contain minime 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      confirmNewPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), null],
        "Passwords must match"
      ),
    }),
    validateOnMount: true,
    onSubmit: (user) => {
      dispatch(
        recoveryPasswordUser(user, searchParams.get("token"), () => {
          navigate("/auth/login");
        })
      );
    },
  });

  return (
    <>
      <section>
        <div className="auth_wrapper animate__animated animate__bounceIn">
          <h1>New password</h1>
          <div className="auth_form">
            <form onSubmit={formik.handleSubmit}>
              <PasswordInput
                name="newPassword"
                text="new password"
                value={formik.values.newPassword}
                onBlur={formik.handleBlur}
                onInputChange={formik.handleChange}
              />
              <TextError formik={formik} value="newPassword" />
              <PasswordInput
                name="confirmNewPassword"
                text="confirm new password"
                value={formik.values.confirmNewPassword}
                onBlur={formik.handleBlur}
                onInputChange={formik.handleChange}
              />
              <TextError formik={formik} value="confirmNewPassword" />
              <button type="submit" formMethod="POST" disabled={!formik.isValid ||isLoading}>
                save {isLoading && <i className="fas fa-spinner fa-spin"></i>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
