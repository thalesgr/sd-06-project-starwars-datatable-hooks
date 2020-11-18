import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import StarWarsServeApi from '../services/StarWarsService';

function StarWarsProvider({ children }) {
  const [headers, setHeaders] = useState([]);
  const [planets, setPlanets] = useState([]);

  const getPlanetsApi = async () => {
    const planetsFromApi = await StarWarsServeApi();
    setPlanets(planetsFromApi.results);
    setHeaders(Object.keys(planetsFromApi.results[0])
      .filter((header) => header !== 'residents'));
  };

  return (
    <StarWarsContext.Provider value={ { headers, planets, getPlanetsApi } }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default StarWarsProvider;
