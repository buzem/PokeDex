import PokemonCard from './PokemonCard';
import Loading from '../layout/Loading';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function PokemonList(){
  const [ pokemons, setPokemons ] = useState([]);
  const [ itemsCountPerPage, setItemsCountPerPage] = useState(20);
  const [ activePage, setActivePage ] = useState(1);


  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios(`https://pokeapi.co/api/v2/pokemon?limit=800`);
      setPokemons(response.data['results']);
    };
    fetchPokemons();
  }, []);

    return (
      <div>
        {pokemons ? (
          <div className="row">
            {pokemons.map(pokemon => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }

export default PokemonList;


