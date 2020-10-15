import React from 'react';
import { Card as SemanticCard, Image} from 'semantic-ui-react';

const Card = ({ countryData }) => {

    return (
        <SemanticCard>
            <Image wrapped ui={false} src={countryData.flag} />
            <SemanticCard.Header>{countryData.name}</SemanticCard.Header>
            <SemanticCard.Description>
                <p><b>Population:</b> {countryData.population} </p>
                <p><b>Region:</b> {countryData.region} </p>
                <p><b>Capital:</b> {countryData.capital} </p>
            </SemanticCard.Description>
        </SemanticCard>
    )
}

export default Card;