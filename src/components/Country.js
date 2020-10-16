import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import styled from 'styled-components';

const Container = styled.div`
    display: flex;

`;

const Country = () => {
    const [country, setCountry] = useState({});
    const [currencies, setCurrencies] = useState('');
    const [languages, setLanguages] = useState('');
    const { code } = useParams();


    useEffect(() => {
        axios.get(`https://restcountries.eu/rest/v2/alpha/${code}`)
            .then(res => {
                setCountry({...res.data, topLevelDomain: res.data.topLevelDomain.toString()});
                setCurrencies(() => getNames(res.data.currencies))
                setLanguages(() => getNames(res.data.languages))
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    function getNames(countryArray) {
        let stringed = '';
        countryArray.forEach((object, i) => {
            if (i === (countryArray.length - 1)) {
                stringed += `${object.name}`;    
            } else {
                stringed += `${object.name}, `;
            }
        })

        return stringed;
    }

    return (
        <Container>
            <div className="left">
                <button className="back"></button>
            </div>
            <img src={country.flag} alt={`Flag of ${country.name}`} />
            <div className="right">
                <h3>{country.name}</h3>
                <div className="information">
                    <div>
                        <p><b>Native Name:</b> {country.nativeName} </p>
                        <p><b>Population:</b> {country.population} </p>
                        <p><b>Region:</b> {country.region} </p>
                        <p><b>Sub Region:</b> {country.subregion} </p>
                        <p><b>Capital:</b> {country.capital} </p>
                    </div>
                    <div>
                        <p><b>Top Level Domain:</b> {country.topLevelDomain} </p>
                        <p><b>Currencies:</b> {currencies} </p>
                        <p><b>Languages:</b> {languages} </p>
                    </div>
                </div>
                <div className="border-countries"></div>
            </div>
        </Container>
    )
}

export default Country;