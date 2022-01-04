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

          <h4>
          A place to trade blind bag/surprise toys to complete your collections faster. 
          <p></p>
          </h4>
          <p>
          <h3>Getting started is easy!</h3>
      <p></p>
            <li>Simply Register/Login</li> 
            <li>Add the toys you are ready to trade and begin browsing the market!</li>
            <li>You can browse all toys or search by name or zip code.</li>
            <li>When you find the toy you are interested in, click "trade" and add the toy you are willing to trade to get it.</li>
            
      <p></p>
      <p></p>

      <h3>After you request the trade</h3>
        <li>The owner of the toy will have the option to accept or decline the trade.</li>
        <li>If your trade is accepted, you will be able to view the owners info and arrage the trade.</li>
        <li>If the offer is declined, both toys will be returned to the available toy list and you will have the option to trade with someone else.</li>
        <li>If you change your mind and no longer wish to trade, you can delete your offer at any time. </li>
        
        <p></p>
        <h3>Have Fun and Happy Browsing!</h3>
          </p>
        </div>
          <div className="grid-col grid-col_4">
          <RegisterForm />
          <center>
          <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button> 
          </center> 
        
         </div>
      </div>
    </div>
  );
}

export default LandingPage;
