/* eslint-disable react/function-component-definition */
import { Card } from 'antd';
import React from 'react';
import styled from 'styled-components/macro';

import { conditionTranslator, getWeekday } from '../helpers/utils';
import { useAppDispatch } from '../hooks/redux';
import { ForecastsEntity } from '../models/IWeather';
import { updateCurrentShowedDay } from '../store/reducers/WeatherSlice';

interface Props {
  background: string;
}

const StyledCard = styled(Card)`
  margin: 0 6px 0 6px;
  width: 140px;
`;
const WeatherIcon = styled.div`
  width: 90px;
  height: 90px;
  background: ${(p: Props) => `url(${p.background}) no-repeat center`};
  background-size: 100%;
  margin: 0;
`;

export const DayCard: React.FC<{
  forecast: ForecastsEntity;
}> = ({ forecast }) => {
  const dispatch = useAppDispatch();
  const { parts, date } = forecast;
  return (
    <StyledCard hoverable onClick={() => dispatch(updateCurrentShowedDay(date))}>
      <WeatherIcon background={`https://yastatic.net/weather/i/icons/funky/dark/${parts.day_short.icon}.svg`} />
      <p>{getWeekday(date)}</p>
      <p>Днём: {parts.day.temp_avg}</p>
      <p>Ночью: {parts.night.temp_avg}</p>
      <p>{conditionTranslator(parts.day_short.condition)}</p>
    </StyledCard>
  );
};
