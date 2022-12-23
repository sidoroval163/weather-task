import { CloseOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components/macro';

import { getMonthAndDayWord } from '../helpers/utils';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { closeFulDayCard } from '../store/reducers/WeatherSlice';
import { WeatherRowBuilder } from './WeatherRowBuilder';

const StyledCard = styled(Card)`
  margin: 0 6px 0 6px;
  width: 800px;
`;
const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 20px;
  margin-bottom: 12px;
`;
const CloseOutlinedStyled = styled(CloseOutlined)`
  cursor: pointer;
  transition: 1s linear;
  &:hover {
    transform: scale(1.5);
  }
`;

export function FullDayCard() {
  const { currentShowedDay } = useAppSelector((state) => state.weatherReducer);
  const dispatch = useAppDispatch();
  return (
    <>
      <h3>Прогноз на выбранный день </h3>
      <StyledCard>
        <CloseButtonContainer>
          <CloseOutlinedStyled onClick={() => dispatch(closeFulDayCard())} />
        </CloseButtonContainer>
        <Row>
          {currentShowedDay.date && (
            <Col span={12} order={4}>
              <p>{getMonthAndDayWord(currentShowedDay.date)}</p>
            </Col>
          )}
          <Col span={3} order={4}>
            Давление, мм рт. ст.
          </Col>
          <Col span={3} order={4}>
            Влажность
          </Col>
          <Col span={3} order={4}>
            Ветер, м/с
          </Col>
          <Col span={3} order={4}>
            Ощущается как
          </Col>
        </Row>
        {currentShowedDay.parts?.morning && (
          <WeatherRowBuilder part={currentShowedDay.parts?.morning} description="Утром" />
        )}
        {currentShowedDay.parts?.day && <WeatherRowBuilder part={currentShowedDay.parts?.day} description="Днём" />}
        {currentShowedDay.parts?.evening && (
          <WeatherRowBuilder part={currentShowedDay.parts?.evening} description="Вечером" />
        )}
        {currentShowedDay.parts?.night && (
          <WeatherRowBuilder part={currentShowedDay.parts?.night} description="Ночью" />
        )}
      </StyledCard>
    </>
  );
}
