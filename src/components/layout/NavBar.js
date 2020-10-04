import styled from 'styled-components';
import Pokemon from '../pokemon/Pokemon';
import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { hashString } from 'react-hash-string'
import { useLocation } from 'react-router-dom'


function hash(s,modulus) {
  let h =Math.abs(hashString(s))
  return ((h % modulus)+1).toString() ;
}




const Branding = styled.a`
  -moz-user-select: none;
  -website-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
`;


function NavBar () {
  const [ hoverNavBar, setHoverNavBar] = useState(false);
  const history = useHistory()
  let newDate = new Date()
  const [ day, setDay]=useState(newDate.getDate())
  const [ month, setMonth]=useState(newDate.getMonth() + 1)
  const [ year, setYear]=useState(newDate.getFullYear())
  const [ hashPokeindex, setHashPokeIndex]=useState(hash(day+"-"+month+"-"+year,800))

  const location = useLocation();
  console.log(location.pathname);
  
  function getPokemonofToday() {
    history.push('/pokemon/'+hashPokeindex)
    window.location.reload()
  }


  const handler= () => {
    window.scrollY <= 0
      ? setHoverNavBar( false ) : setHoverNavBar(true);
  }


  useEffect(() => {
    window.addEventListener('scroll', handler, true);

    return () => { window.removeEventListener('scroll', handler, true); }
  }, [] );


    return (
      <nav
        className="navbar navbar-expand-md navbar-dark bg-dark fixed-top"
        style={
         hoverNavBar
            ? {
                boxShadow:
                  '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                backgroundColor: '#ef5350 !important'
              }
            : { backgroundColor: 'transparent !important' }
        }
      >

        <Branding
          href="#"
          className="navbar-brand col-sm-3 col-md-10 mr-0 align-items-center"
        >
          
          PokeDex
        </Branding>

       <Button className="float-right" onClick={getPokemonofToday}>Pokemon of Today </Button> 
        

       
      

      </nav>
    );
  }

export default NavBar;