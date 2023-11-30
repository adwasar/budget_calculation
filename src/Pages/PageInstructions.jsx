import { NavLink } from 'react-router-dom';

function PageInstructions() {
  return (
    <>
      <div className="container">
        <div className="s-60"></div>
        <h2>Login</h2>
        <div className="s-20"></div>
        <ol>
          <li>
            Click{' '}
            <NavLink className="text-decoration-underline" to="/log-in">
              here
            </NavLink>{' '}
            or on <strong>Log in</strong> on tab on the navigation panel to login.
          </li>
          <li>Enter login and password</li>
        </ol>
        <div className="s-40"></div>
        <h2>Fill info</h2>
        <div className="s-20"></div>
        <ol>
          <li>
            Go to the <strong>Budget</strong> page
          </li>
          <li>Set date is require</li>
          <li>Set currency (UAH is default value)</li>
          <li>
            Fill your <strong>Expenses</strong> and <strong>Income</strong> inputs (optional)
          </li>
          <li>
            Click <strong>Confirm</strong> to record data
          </li>
        </ol>
        <p>
          If you record several times with one date, you take only the last record, other records
          with same date will be rewrited
        </p>
        <div className="s-40"></div>
        <h2>Get own statistics</h2>
        <ol>
          <li>
            Go to the <strong>Statistics</strong> page
          </li>
        </ol>
        <p>You can see your records sorted by date</p>
        <p>
          Default currency for records is UAH but you can change it by click on the language
          selector
        </p>
        <p>
          You can delete your record for rewrite it by pass the <strong>delete button</strong>
        </p>
      </div>
    </>
  );
}

export default PageInstructions;
