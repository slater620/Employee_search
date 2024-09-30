import './searchResults.css';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import home_icon from '../icons/home_icon.png';
import next_icon from '../icons/next_icon.png';
import back_icon from '../icons/back_icon.png';

function SearchResults() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state.results.hits;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = results.total.value;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.hits.slice(indexOfFirstItem, indexOfLastItem);

  const navToHomePage = () => {
    navigate('/');
  }

  const handlePrevious = () => {
    setCurrentPage(prevPage => prevPage - 1);
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    setCurrentPage(prevPage => prevPage + 1);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="search-results">
      <img src={home_icon} className="home-icon" onClick={navToHomePage}></img>
      <h1 className='search-header'>Search Results</h1>
      <div className='page-details'>
        <div>Total {totalItems} results</div>
        <div style={{'textAlign' : 'right'}}><i>Showing Page {currentPage} of {totalPages}</i></div>
      </div>
      <div className='results'>
        {currentItems.map((hit, index) => (
          <div key={index} className="result-item">
            <h3>{hit._source.FirstName} {hit._source.LastName}</h3>
            <p><b>Address:</b> {hit._source.Address}</p>
            <p><b>Age:</b> {hit._source.Age} &emsp;&emsp; <b>Gender:</b> {hit._source.Gender} &emsp;&emsp; <b>Marital Status:</b> {hit._source.MaritalStatus}</p>
            <p><b>Date of Joining:</b> {hit._source.DateOfJoining}</p>
            <p><b>Designation:</b> {hit._source.Designation}</p>
          </div>
        ))}
      </div>
      <div className="pagination-controls">
        {currentPage > 1 && (
          <img src={back_icon} onClick={handlePrevious}></img>
        )}
        {currentPage < totalPages && (
          <img src={next_icon} onClick={handleNext}></img>
        )}
      </div>
    </div>
  );
}
  
export default SearchResults;