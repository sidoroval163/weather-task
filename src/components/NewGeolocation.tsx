import { Button, Input } from 'antd';
import React from 'react';

import { isGeodataValid } from '../helpers/utils';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchWeather } from '../store/reducers/ActionCreators';
import { changeInputLatitudeValue, changeInputLongitudeValue, createError } from '../store/reducers/WeatherSlice';

export function NewGeolocation() {
  const { positionFromInputFields } = useAppSelector((state) => state.weatherReducer);
  const { latitude, longitude } = useAppSelector((state) => state.weatherReducer.positionFromInputFields);
  const dispatch = useAppDispatch();
  const tryToRequestWeather = () => {
    if (isGeodataValid(positionFromInputFields) && latitude && longitude) {
      dispatch(fetchWeather({ latitude, longitude })).catch((e) => {
        dispatch(createError((e as Error).message));
      });
    } else {
      dispatch(createError('Введите валидные значения геопозиции'));
    }
  };
  return (
    <>
      <Input
        onChange={(e) => {
          dispatch(changeInputLatitudeValue(Number(e.target.value)));
        }}
        placeholder="Введите широту"
      />
      <Input
        onChange={(e) => {
          dispatch(changeInputLongitudeValue(Number(e.target.value)));
        }}
        placeholder="Введите долготу"
      />
      <Button
        onClick={() => {
          tryToRequestWeather();
        }}
        type="primary"
        disabled={!positionFromInputFields.latitude || !positionFromInputFields.longitude}
      >
        Запросить погоду по данной геопозиции
      </Button>
    </>
  );
}
