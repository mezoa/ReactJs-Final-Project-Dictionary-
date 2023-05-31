import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import NotFound from '../CustomNav/notFound';
import DefinitionSearch from './definitionsearch';
import CustomNav from '../CustomNav/customnav';
import '../../index.css'; // Import the custom CSS file

//fetches and displays the definition of a word from a dictionary API based on the provided search parameter
//It handles different HTTP response statuses and error scenarios, updates state variables accordingly, and allows for programmatic navigation.
export default function Definition() {
  const [word, setWord] = useState([]);
  const [notFound, setNotFound] = useState(false);
  let { search } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + search;
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        } else if (response.status === 401) {
          navigate('/login');
        } else if (response.status === 500) {
          setError(true);
        }

        if (!response.ok) {
          setError(true);
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then((data) => {
        setWord(data[0].meanings);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [search, navigate]); 

  //Error Handling and allows redirection to the Home Page by Clicking the link
  if (notFound || error) {
    return (
      <>
        <CustomNav />
        <div className="not-found-container">
          <NotFound />
          <Link to="/" className="not-found-link">
            Back to Home Page
          </Link>
        </div>
      </>
    );
  }

  // Render the definition of a word 
  // Frontend Functionality 
  return (
    <>
      <CustomNav />
      <div className="definition-container">
        {word ? (
          <>
            <h1 className="definition-title">Here is a Definition:</h1>
            <h2 className="search-word">{search.charAt(0).toUpperCase() + search.slice(1)}</h2>
            <div className="definitions-list">
              {word.map((meaning) => (
                <div key={uuidv4()} className="definition-item">
                  <p className="part-of-speech">{meaning.partOfSpeech}:</p>
                  <p className="definition-text">{meaning.definitions[0].definition}</p>
                </div>
              ))}
            </div>
            <div className="search-again-container">
              <p className="search-again-text">Search Again:</p>
              <DefinitionSearch />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
