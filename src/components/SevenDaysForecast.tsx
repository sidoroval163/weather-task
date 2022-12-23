import React from 'react';
import styled from 'styled-components/macro';

import { useAppSelector } from '../hooks/redux';
import { DayCard } from './DayCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export function SevenDaysForecast() {
  const { forecasts } = useAppSelector((state) => state.weatherReducer.forecasts);
  return (
    <>
      <h3>Прогноз на 7 дней</h3>
      <Wrapper>
        {forecasts?.map((el) => (
          <DayCard key={el.date} forecast={el} />
        ))}
      </Wrapper>
    </>
  );
}
