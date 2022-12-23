import React from 'react';
import styled from 'styled-components/macro';

import { GeolocationSaver } from './GeolocationSaver';
import { NewGeolocation } from './NewGeolocation';

const Wrapper = styled.div`
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  padding: 20px 24px 20px 24px;
  background: #fff;
  border-radius: 12px;
  width: fit-content;
  height: fit-content;
  color: black;
`;

export function GeolocationSettings() {
  return (
    <Wrapper>
      <NewGeolocation />
      <GeolocationSaver />
    </Wrapper>
  );
}
