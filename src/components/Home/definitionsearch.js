import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';

//Renders a search input field and button. 
//It allows users to enter a word to search for its definition.
export default function DefinitionSearch() {
  const [word, setWord] = useState('');
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const formStyle = {
    display: 'flex',
    alignItems: 'center',
    background: 'none', 
    borderRadius: '4px',
    boxShadow: 'none', 
  };

  const inputStyle = {
    border: 'none',
    outline: 'none',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    marginRight: '4px',
    width: '400px', 
    height: '45px',// Adjust the width as needed
    backgroundColor: '#f5f5f5', // Set the background color
  };

  const buttonStyle = {
    border: 'none',
    outline: 'none',
    padding: '8px',
    backgroundColor: 'orange',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '2px',
    cursor: 'pointer',
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/home/' + word);
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSearch}>
        <input
          style={inputStyle}
          placeholder="Search"
          type="text"
          onChange={(e) => {
            setWord(e.target.value);
          }}
        />
        <button style={buttonStyle}>Search</button>
      </form>
    </div>
  );
}
