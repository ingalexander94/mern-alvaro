import { Link } from "react-router-dom";
import "./activate.css";

export const Activate = () => {
  return (
    <>
    <section>
      <div className="auth_wrapper animate__animated animate__bounceIn">
        <h1>Activated account</h1>
        <div className="auth_content">
            <p>Your account has been successfully activated.</p>
            <Link to="/auth/login">Go to Login</Link>
        </div>
      </div>
    </section>
  </>
  )
}
