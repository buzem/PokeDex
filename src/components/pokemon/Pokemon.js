
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'



const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};

function Pokemon(props) {
  const [ name, setName ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const [ types, setTypes ] = useState([]);
  const [ description, setDescription ] = useState('');
  const [ statTitleWidth, setStatTitleWidth ] = useState(3);
  const [ statBarWidth, setStatBarWidth ] = useState(9);
  const [ stats, setStats ] = useState({hp: '',attack: '',defense: '',speed: '',specialAttack: '',specialDefense: ''});
  const [ height, setHeight ] = useState('');
  const [ weight, setWeight ] = useState('');
  const [ eggGroups, setEggGroups ] = useState('');
  const [ catchRate, setCatchRate ] = useState('');
  const [ abilities, setAbilities ] = useState('');
  const [ genderRatioMale, setGenderRatioMale ] = useState('');
  const [ genderRatioFemale, setGenderRatioFemale ] =useState('');
  const [ evs, setEvs ] = useState('');
  const [ hatchSteps, setHatchSteps ] = useState('');
  const [ themeColor, setThemeColor ] = useState('#EF5350');
  const location = useLocation();


  async function fetchdata1(props) {
    const res = await axios('https://pokeapi.co/api/v2/pokemon/'+props.match.params.pokemonIndex);
    const resdata=res.data
    setName(resdata.name)
    setImageUrl(resdata.sprites.front_default)
    let  { hp, attack, defense, speed, specialAttack, specialDefense } = '';
    resdata.stats.map(stat => {
      switch (stat.stat.name) {
        case 'hp':
          hp = stat['base_stat'];
          break;
        case 'attack':
          attack = stat['base_stat'];
          break;
        case 'defense':
          defense = stat['base_stat'];
          break;
        case 'speed':
          speed = stat['base_stat'];
          break;
        case 'special-attack':
          specialAttack = stat['base_stat'];
          break;
        case 'special-defense':
          specialDefense = stat['base_stat'];
          break;
        default:
          break;
      }
    });

    setStats({ hp, attack, defense, speed, specialAttack, specialDefense })
    setHeight(Math.round((resdata.height * 0.328084 + 0.00001) * 100) / 100)
    setWeight(Math.round((resdata.weight * 0.220462 + 0.00001) * 100) / 100)
    setTypes(resdata.types.map(type => {return type.type.name}))
    
    setStats((stats) => {
      console.log(stats); 
      return stats;
    });    
    setTypes((types) => {
      console.log(types); 
      return types;
    });   
    
    setThemeColor(`${TYPE_COLORS[types[types.length - 1]]}`);

    setAbilities(resdata.abilities
    .map(ability => {
      return ability.ability.name
        .toLowerCase()
        .split('-')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    })
    .join(', '))
    setEvs(resdata.stats
      .filter(stat => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map(stat => {
        return `${stat.effort} ${stat.stat.name
          .toLowerCase()
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')}`;
      })
      .join(', '))
 
  }
  
  async function fetchdata2(){
    await axios.get(`https://pokeapi.co/api/v2/pokemon-species/`+props.match.params.pokemonIndex).then(res => {
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name === 'en') {
          setDescription(flavor.flavor_text);
          return;
        }
      });
      setGenderRatioFemale ( 12.5 * res.data['gender_rate']);
      setGenderRatioMale (12.5 * (8 - res.data['gender_rate']));
      setCatchRate(Math.round((100 / 255) * res.data['capture_rate']));
      setEggGroups( res.data['egg_groups']
        .map(group => {
          return group.name
            .toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        })
        .join(', '));

     setHatchSteps( 255 * (res.data['hatch_counter'] + 1))
 
    });
  }

  useEffect(() => {
    fetchdata1(props)
    fetchdata2()

 
    
  }, [location.pathname]);



    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h4>{name
                    .toLowerCase()
                    .split(' ')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')}</h4>
              </div>
              <div className="col-7">
                <div className="float-right">
                {types.map(type => (
                    <span
                      key={type}
                      className="badge badge-pill mr-1"
                      style={{
                        backgroundColor: `#${TYPE_COLORS[type]}`,
                        color: 'white'
                      }}
                    >
                      {type
                        .toLowerCase()
                        .split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div className=" col-md-3 ">
                <img
                  src={imageUrl}
                  className="card-img-top rounded mx-auto mt-2"
                />
              </div>
              <div className="col-md-9">
                
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${statTitleWidth}`}>
                    HP
                  </div>
                  <div className={`col-12 col-md-${statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${stats.hp}%`,
                          backgroundColor: `#${themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{stats.hp}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${statTitleWidth}`}>
                    Attack
                  </div>
                  <div className={`col-12 col-md-${statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${stats.attack}%`,
                          backgroundColor: `#${themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${statTitleWidth}`}>
                    Defense
                  </div>
                  <div className={`col-12 col-md-${statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${stats.defense}%`,
                          backgroundColor: `#${themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${statTitleWidth}`}>
                    Speed
                  </div>
                  <div className={`col-12 col-md-${statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${stats.speed}%`,
                          backgroundColor: `#${themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${statTitleWidth}`}>
                    Sp Atk
                  </div>
                  <div className={`col-12 col-md-${statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${stats.specialAttack}%`,
                          backgroundColor: `#${themeColor}`
                        }}
                        aria-valuenow={stats.specialAttack}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${statTitleWidth}`}>
                    Sp Def
                  </div>
                  <div className={`col-12 col-md-${statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${stats.specialDefense}%`,
                          backgroundColor: `#${themeColor}`
                        }}
                        aria-valuenow={stats.specialDefense}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{stats.specialDefense}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">
                <p className="">{description}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="card-body">
            <h5 className="card-title text-center">Profile</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-6">
                    <h6 className="float-right">Height:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{height} ft.</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Weight:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{weight} lbs</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Catch Rate:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{catchRate}%</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Gender Ratio:</h6>
                  </div>
                  <div className="col-6">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${genderRatioFemale}%`,
                          backgroundColor: '#c2185b'
                        }}
                        aria-valuenow="15"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{genderRatioFemale}</small>
                      </div>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${genderRatioMale}%`,
                          backgroundColor: '#1976d2'
                        }}
                        aria-valuenow="30"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{genderRatioMale}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-6">
                    <h6 className="float-right">Egg Groups:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{eggGroups} </h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Hatch Steps:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{hatchSteps}</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">Abilities:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{abilities}</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">EVs:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{evs}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-muted">
            Data From{' '}
            <a href="https://pokeapi.co/" target="_blank" className="card-link">
              PokeAPI.co
            </a>
          </div>
        </div>
      </div>
    );
  }
  export default Pokemon