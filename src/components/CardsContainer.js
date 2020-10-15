import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Input, Dropdown, Loader, Dimmer, Segment} from 'semantic-ui-react';
import styled from 'styled-components';

import Card from './Card.js';


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

        .card {
            width: 20%;
            margin: 20px 1px 40px 0;

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


    // load inital countries when app first opens
    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                setCountries(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    
    return (
        <Container>
            <div className='top'>
                <Input className="search" icon='search' iconPosition='left' placeholder='Search for a country...' />
                <Dropdown className="filter" placeholder='Filter by Region' selection options={''} />
            </div>
            {/* since i am making a call to the api when the component loads - if there is nothing in the countries state a loader will be visible */}
            <div className='cards'>
                {countries.length ? countries.map(country => {
                    return (
                        <Card countryData={country} />
                    )
                }) : (
                <Dimmer.Dimmable>
                    <Dimmer active inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>
                </Dimmer.Dimmable>
                )}
            </div>
        </Container>
    )
}

export default CardsContainer;