import React from 'react';
import CustomNav from '../CustomNav/customnav';
import { userData } from '../../helper';
import DefinitionSearch from './definitionsearch';

//Home Page
//Mostly Contains the Frontend functionality
const Home = () => {
  //Variable Declaration to Display the Username
  const { username } = userData();

  //Uses CustomNav and Definition Search Components and importing the packages
  return (
    <div className="container bottom-border">
      <CustomNav />
      <div className="header">
        <h2 className="newspaper-title">DICTIONARY</h2>
        <p className="newspaper-subtitle">Welcome, {username}!</p>
      </div>
      <DefinitionSearch />
      <p className="caption" style={{ marginTop: '60px' }}>
        Find definitions, synonyms, and more!
      </p>
      <div className="captions-container">
        <div className="caption-column">
          <p className="caption-text">
            In Partial Fulfillment to Application Development and Emerging Technologies (ITE18)
          </p>
        </div>
        <div className="caption-column">
          <p className="caption-text">
          A reference work with a list of words from one or more languages, normally ordered alphabetically, explaining each word's meaning, and sometimes containing information on its etymology, pronunciation, usage, translations, and other data.
          </p>
        </div>
        <div className="caption-column right">
          <p className="caption-text">
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;Submitted to: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Mr. Johndee Molina <br />
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;Submitted by: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Meo Angelo Alcantara
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
