import { NavLink } from 'react-router-dom';

function LoginMessage() {
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="s-100"></div>
        <div className="s-60"></div>
        <h4>
          Please{' '}
          <NavLink to="/log-in" className="text-decoration-underline">
            Log in
          </NavLink>
        </h4>
      </div>
    </>
  );
}

export default LoginMessage;
