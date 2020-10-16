import React from 'react';
import { Route } from 'react-router-dom';
import CardsContainer from '../components/CardsContainer.js';
import Country from '../components/Country.js';


const Routing = () => {

    return (
        <>
            <Route exact path='/' component={CardsContainer} />
            <Route path='/country/:code' component={Country} />
        </>
    )
}

export default Routing;
