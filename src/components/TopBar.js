import React from 'react';
import { Label, Icon } from 'semantic-ui-react';

import styled from 'styled-components';

const Container = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    padding: 20px 5%;
    font-family: 'Nunito Sans', sans-serif;
    box-shadow: 2px -1px 9px 1px rgba(153,153,153,0.3);


    
    h1 {
        font-family: 'Nunito Sans', sans-serif;
    }

    .ui.label {
        background: none;
        font-size: 1.1rem;
        color: black;
        font-weight: 700;
    }

    .theme {
        display: flex;
    }
`;

const TopBar = () => {

    return (
        <Container>
            <h1>Where in the world?</h1>
            <div className="theme">
                <Label><Icon name='moon outline' />Dark Mode</Label>
            </div>
        </Container>
    )
}

export default TopBar;