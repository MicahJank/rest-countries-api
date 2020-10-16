import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Input, Dropdown, Loader, Dimmer, Segment} from 'semantic-ui-react';
import styled from 'styled-components';

import Card from './Card.js';
import { NavLink, useHistory } from 'react-router-dom';


const Container = styled.section`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 90%;

    div {
        margin: 25px 0;
    }

    .top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: hsl(0, 0%, 52%);
        margin-bottom: 0;

        .search {
            display: flex;
            align-items: center;
            margin-bottom: 0;
        }
        .search input {
            height: 58px;
            padding-left: 60px !important;
            &::placeholder {
                color: hsl(0, 0%, 52%);
            }
        }

        .search i {
            font-size: 1.3rem;
            left: 10px !important;
        }

        .filter {
            height: 58px;
            display: flex;
            align-items: center;
            width: 220px;

           .divider.default.text {
                color: hsl(0, 0%, 52%);
           }

           i {
               top: 19px !important;
           }
        }
    }

    .search {
        width: 35%;
        height: 40px;
    }
    .filter {
        width: 20%;
        height: 20px;

        div {
            margin: 0;
        }
    }

    .cards {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 0;

        .dimmable {
            left: 47%;
        }

        a {
            width: 20%;
            margin: 20px 1px 40px 0;
            color: black;
        }

        .card {
            

            div {
                padding-left: 25px;
            }

            .header {
                font-size: 1.2rem;
                font-weight: 800;
                margin-top: 10px;
            }

            .image {
                margin-top: 0;
                padding: 0;
            }

            .description {
                margin: 0;
                margin-bottom: 30px;
            }

            p {
                margin-bottom: 5px;
            }
        }

      
    }
`;
const CardsContainer = () => {

    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [timeoutID, setTimeoutID] = useState(0);

    const history = useHistory();

    const [currentRegion, setCurrentRegion] = useState('');
    const [regions, setRegions] = useState([
        {
            key: 'Africa',
            text: 'Africa',
            value: 'Africa'
        },
        {
            key: 'Americas',
            text: 'Americas',
            value: 'Americas'
        },
        {
            key: 'Asia',
            text: 'Asia',
            value: 'Asia'
        },
        {
            key: 'Europe',
            text: 'Europe',
            value: 'Europe'
        },
        {
            key: 'Oceania',
            text: 'Oceania',
            value: 'Oceania'
        },
    ])


    // useEffect watches search and currentRegion for updates which we can then fire off the correct function as a result - if there is no search or region
    // then the user must be searching for all countries
    // current using multiple requests to make this happen, i think it would be better to use 1 request and filter the data we get back for the search by country name and region
    useEffect(() => {
        if (!search && !currentRegion) {
            axios.get(`https://restcountries.eu/rest/v2/all`)
                .then(res => {
                    setCountries(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                })
        } else if(search) {
            clearTimeout(timeoutID);
            const newTimeoutId = setTimeout(() => searchCountry(search), 1000);
            setTimeoutID(newTimeoutId);
        } else if (currentRegion) {
            searchRegion(currentRegion);
        }
    }, [search, currentRegion])

    const searchCountry = (country) => {
        setLoading(true);
        axios.get(`https://restcountries.eu/rest/v2/name/${country}`)
            .then(res => {
                // if the user is filtering by regions we need to take it into consideration when searching and only search in those regions
                if (currentRegion) {
                    const filteredCountries = res.data.filter(country => country.region === currentRegion)
                    setCountries(filteredCountries);
                } else {
                    setCountries(res.data);
                }
                setLoading(false);
            })
            .catch(err => {
                setCountries([])
                setLoading(false);
            })
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const searchRegion = (regionName) => {
        setLoading(true);
        axios.get(`https://restcountries.eu/rest/v2/region/${regionName}`)
            .then(res => {
                setCountries(res.data);
                setLoading(false);
            })
            .catch(err => {
                setCountries([])
                setLoading(false);
            })
    } 

    const handleDropDownChange = (e, { value }) => {
        setCurrentRegion(value);
    }



    
    return (
        <Container>
            <div className='top'>
                <Input  onChange={handleChange} value={search} className="search" icon='search' iconPosition='left' placeholder='Search for a country...' />
                <Dropdown className="filter" clearable placeholder='Filter by Region' selection value={currentRegion} options={regions} onChange={handleDropDownChange} />
            </div>
            {/* since i am making a call to the api when the component loads - if there is nothing in the countries state a loader will be visible */}
            <div className='cards'>
                { loading ? (
                    <Dimmer.Dimmable>
                        <Dimmer active inverted>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>
                    </Dimmer.Dimmable>
                ) :
                countries.length ? countries.map(country => {
                    return (
                        <NavLink to={`/country/${country.alpha2Code}`}>
                            <Card countryData={country} />
                        </NavLink>
                    )
                }) : (
                    <h1>Couldn't find any countries!</h1>
                )}
            </div>
        </Container>
    )
}

export default CardsContainer;