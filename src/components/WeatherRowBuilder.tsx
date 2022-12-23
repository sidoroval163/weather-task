import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components/macro';

import { conditionTranslator } from '../helpers/utils';
import { EveningOrDay, NightOrMorning } from '../models/IWeather';

interface Props {
  background: string;
}
const WeatherIcon = styled.div`
  width: 48px;
  height: 48px;
  margin-right: 11px;
  background: ${(p: Props) => `url(${p.background}) no-repeat center`};
  background-size: 100%;
`;
const StyledCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PicAndDescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const WeatherRowBuilder: React.FC<{ part: EveningOrDay | NightOrMorning; description: string }> = ({
  part,
  description,
}) => {
  return (
    <Row>
      <StyledCol span={6} order={1}>
        {description} {part.temp_min}° ... {part.temp_max}°<br /> Средняя температура {part.temp_avg}°
      </StyledCol>
      <StyledCol span={6} order={2}>
        <PicAndDescriptionContainer>
          <WeatherIcon background={`https://yastatic.net/weather/i/icons/funky/dark/${part.icon}.svg`} />
          {conditionTranslator(part.condition)}
        </PicAndDescriptionContainer>
      </StyledCol>
      <StyledCol span={3} order={3}>
        {part.pressure_mm}
      </StyledCol>
      <StyledCol span={3} order={4}>
        {part.humidity}%
      </StyledCol>
      <StyledCol span={3} order={5}>
        {part.wind_speed}
      </StyledCol>
      <StyledCol span={3} order={6}>
        {part.feels_like}°
      </StyledCol>
    </Row>
  );
};
