import React from 'react';
import { Label, Icon } from 'semantic-ui-react';

import styled from 'styled-components';

const Container = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    padding: 20px 0;

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