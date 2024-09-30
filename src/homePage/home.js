import './home.css';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';

function Home() {

  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getSearchResults = async (event) => {
    if (event.keyCode === 13) {
      setLoading(true);
      const searchValue = inputRef.current.value;
      try {
        //const response = await fetch('http://localhost:5000/getEmployees?query='+searchValue);
        const response = await fetch('https://es-api-demo-a801ccce37e3.herokuapp.com/getEmployees?query='+searchValue);
        const data = await response.json();
        setLoading(false);
        navigate('/searchResults', { state: { results: data } });        
      } 
      catch (error) {
        setLoading(false); // Stop loading in case of an error
        console.error("Failed to fetch data:", error);
      }
      
    }
  }
  
  return (
    <div className="App">
      {loading ? (<LoadingSpinner/>) : (
        <div>
        <h1 className="mainHeader">ES Demo</h1>
        <div className="search-container">
          <input className="searchBar" placeholder='search employees here' type={'text'} ref={inputRef} onKeyDown={getSearchResults}></input>
        </div>
      </div>
      )}    
    </div>
  );
}

export default Home;
