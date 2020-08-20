import React, { useState } from 'react';
import Navigation from './Navigation';
import About from './About';
import Contact from './Contact';
import Resume from './Resume';
import Projects from './Projects';
import 'bootstrap/dist/css/bootstrap.min.css';

function Portfolio() {
  const [currentPage, handlePageChange] = useState('About');



  const renderPage = () => {
    
    switch(currentPage) {
      case 'About': 
      return (<About></About>)

      case 'Portfolio': 
      return (<Projects></Projects>)

      case 'Contact': 
      return (<Contact></Contact>)

      case 'Resume':
        return (<Resume></Resume>)

      default: 
      return(<About></About>)
    }

  };

  return (
    <div>
      <Navigation currentPage={currentPage} handlePageChange={handlePageChange} />
      <div>
        {
          // Render the component returned by 'renderPage()'
          renderPage()
        }
      </div>
    </div>
  );
}

export default Portfolio;
