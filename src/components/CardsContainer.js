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

        .dimmable {
            left: 47%;
        }

        .card {
            width: 20%;
            margin: 20px 20px 40px;
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
            <div className='cards'>
                {countries.length ? countries.map(country => {
                    return (
                        <Card />
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