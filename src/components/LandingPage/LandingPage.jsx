import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome to the Blind Bag Market!');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">

          <p>
          A place to trade blind bag/surprise toys to complete your collections faster!
          </p>

          <p>
            To get started, simply Register/Login then add the toys you are ready to trade and begin browsing the market!
            When you find the toy you are interested in, select "trade" and add the toy you are willing to trade to get it.
            If your offer is accepted, you will then be able to view contact details and arrage the trade!
          </p>
        </div>
        {/* <div className="grid-col grid-col_4">
          <RegisterForm /> */}

          <center>
            {/* <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button> */}
          </center> 
         {/* </div> */}
      </div>
    </div>
  );
}

export default LandingPage;
