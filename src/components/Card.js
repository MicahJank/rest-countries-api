import React from 'react';
import { Card as SemanticCard, Image} from 'semantic-ui-react';

const Card = () => {

    return (
        <SemanticCard>
            <Image wrapped ui={false} />
            <SemanticCard.Header>Name</SemanticCard.Header>
            <SemanticCard.Description>
                <p><b>Population:</b> </p>
                <p><b>Region:</b> </p>
                <p><b>Capital:</b> </p>
            </SemanticCard.Description>
        </SemanticCard>
    )
}

export default Card;