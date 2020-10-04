import Loading from 'react-loading';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import spinner from '../layout/spinner.gif';
import NavBar from '../layout/NavBar';



const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

const Card = styled.div`
  opacity: 0.95;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

function padLeadingZeros(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

function PokemonCard(props) {
  const [ name, setName ] = useState(props.name);
  const [ pokemonIndex, setPokemonIndex ] = useState(props.url.split('/')[props.url.split('/').length - 2]);
  const [ imageUrl, setImageUrl ] = useState('https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+padLeadingZeros(pokemonIndex,3)+'.png');
  const [ imageLoading, setImageLoading ] = useState(true);
  const [ toManyRequests, setToManyRequests ] = useState(false);



  useEffect(() => {
    setName(props.name);
    setPokemonIndex(props.url.split('/')[props.url.split('/').length - 2])
    setImageUrl('https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+padLeadingZeros(pokemonIndex,3)+'.png')
    setName((name) => {
      return name;
    });    
    setPokemonIndex((pokemonIndex) => {
      return pokemonIndex;
    });   


  }, [props]);



    return (
      <div className="col-md-3 col-sm-6 mb-5">

        <StyledLink to={`pokemon/${pokemonIndex}`}>
          <Card className="card">
            <h5 className="card-header">{pokemonIndex}</h5>
            {imageLoading ? (
              <img
                src={spinner}
                style={{ width: '5em', height: '5em' }}
                className="card-img-top rounded mx-auto d-block mt-2"
              />
            ) : null}
            <Sprite
              className="card-img-top rounded mx-auto mt-2"
              src={imageUrl}
              onLoad={() => setImageLoading(false)}
              onError={() => setToManyRequests(true)}
              style={
                toManyRequests
                  ? { display: 'none' }
                  : imageLoading
                  ? null
                  : { display: 'block' }
              }
            />
            {toManyRequests ? (
              <h6 className="mx-auto">
                <span className="badge badge-danger mt-2">
                  To Many Requests
                </span>
              </h6>
            ) : null}
            <div className="card-body mx-auto">
              <h6 className="card-title">
                {name
                  .toLowerCase()
                  .split(' ')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')}
              </h6>
            </div>
          </Card>
        </StyledLink>
      </div>
    );
  
}

export default PokemonCard;

  