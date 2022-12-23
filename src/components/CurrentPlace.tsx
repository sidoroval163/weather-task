import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { Space, Spin } from 'antd';
import React from 'react';
import styled from 'styled-components/macro';

import { conditionTranslator, getMinutesAndHours } from '../helpers/utils';
import { useAppSelector } from '../hooks/redux';
import { AtmPressureSvg, HumiditySvg, WindSvg } from '../svg/icons';

interface Props {
  background: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 24px 20px 24px;
  background: #fff;
  border-radius: 12px;
  min-width: 650px;
  min-height: 200px;
  width: fit-content;
  height: fit-content;
  color: black;
`;
const TerrainAndTimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;
const TerrainAndTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Terrain = styled.div``;

const Time = styled.div``;
const LongitudeAndLatitude = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 30px;
`;
const Parameter = styled.div`
  text-align: left;
`;
const WeatherAndFeeling = styled.div`
  display: flex;
`;
const WeatherData = styled.div`
  font-size: 48px;
  &::after {
    content: '°';
    font-weight: 500;
  }
`;
const WeatherIcon = styled.div`
  width: 48px;
  height: 48px;
  margin-right: 11px;
  background: ${(p: Props) => `url(${p.background}) no-repeat center`};
  background-size: 100%;
`;
const WeatherFeeling = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 16px;
`;
const InlineDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;
const Loader = styled(Space)`
  min-width: 650px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function WindIcon(props: Partial<CustomIconComponentProps>) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Icon component={WindSvg} {...props} />;
}
function HumidityIcon(props: Partial<CustomIconComponentProps>) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Icon component={HumiditySvg} {...props} />;
}
function AtmPressureIcon(props: Partial<CustomIconComponentProps>) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Icon component={AtmPressureSvg} {...props} />;
}
export function CurrentPlace() {
  const { geo_object, now_dt, fact } = useAppSelector((state) => state.weatherReducer.forecasts);
  const { latitude, longitude } = useAppSelector((state) => state.weatherReducer.position);
  const { isLoading } = useAppSelector((state) => state.weatherReducer);
  return (
    <Wrapper>
      {(!latitude && !longitude) || isLoading ? (
        <Loader size="middle">
          <Spin size="large" />
        </Loader>
      ) : (
        <>
          <TerrainAndTimeWrapper>
            <TerrainAndTime>
              <Terrain>
                {geo_object?.district && <span>{geo_object?.district.name}&nbsp;</span>}
                {geo_object?.locality && <span>{geo_object?.locality.name}&nbsp;</span>}
                {geo_object?.country && <span>{geo_object?.country.name}&nbsp;</span>}
              </Terrain>
              {now_dt && <Time>Сейчас {getMinutesAndHours(now_dt)}.</Time>}
            </TerrainAndTime>
            <LongitudeAndLatitude>
              <Parameter>Широта: {latitude}</Parameter>
              <Parameter>Долгота: {longitude}</Parameter>
            </LongitudeAndLatitude>
          </TerrainAndTimeWrapper>
          <WeatherAndFeeling>
            <WeatherData>{fact?.temp}</WeatherData>
            {fact?.icon && (
              <WeatherIcon background={`https://yastatic.net/weather/i/icons/funky/dark/${fact.icon}.svg`} />
            )}
            <WeatherFeeling>
              {fact?.condition && <Parameter>{conditionTranslator(fact.condition)}</Parameter>}
              <Parameter>Ощущается как {fact?.feels_like}°</Parameter>
            </WeatherFeeling>
          </WeatherAndFeeling>
          <WeatherAndFeeling>
            <InlineDiv>
              <WindIcon style={{ width: '24px' }} /> {fact?.wind_speed} М/c
            </InlineDiv>
            <InlineDiv>
              <HumidityIcon style={{ width: '24px' }} /> {fact?.humidity} %
            </InlineDiv>
            <InlineDiv>
              <AtmPressureIcon style={{ width: '24px' }} /> {fact?.pressure_mm} мм рт. ст.
            </InlineDiv>
          </WeatherAndFeeling>
        </>
      )}
    </Wrapper>
  );
}
