import { Button, Modal } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

import './App.css';
import { CurrentPlace } from './components/CurrentPlace';
import { FullDayCard } from './components/FullDayCard';
import { GeolocationSettings } from './components/GeolocationSettings';
import { SevenDaysForecast } from './components/SevenDaysForecast';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchWeather } from './store/reducers/ActionCreators';
import {
  closeError,
  createDefaultPosition,
  createError,
  setPermisson,
  startLoading,
} from './store/reducers/WeatherSlice';

const StyledRow = styled.div`
  display: flex;
`;
const StyledButton = styled(Button)`
  margin-top: 25px;
`;

function App() {
  const dispatch = useAppDispatch();
  const { isWeekdayFullInfoShow, errorText, isPermissionGranted } = useAppSelector((state) => state.weatherReducer);

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          if (location) {
            dispatch(setPermisson());
            const { latitude, longitude } = location.coords;
            dispatch(fetchWeather({ latitude, longitude })).finally(() => {
              dispatch(createDefaultPosition({ latitude, longitude }));
            });
          }
        },
        (error) => {
          if (error.PERMISSION_DENIED) {
            dispatch(startLoading());
            dispatch(
              createError(
                'Предлагаем Вам предоставить приложению доступ к геопозиции браузера и после этого нажать на кнопку',
              ),
            );
          }
        },
      );
    }
  }, [dispatch]);

  const locationTry = () => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          if (location) {
            dispatch(setPermisson());
            const { latitude, longitude } = location.coords;
            dispatch(fetchWeather({ latitude, longitude })).finally(() => {
              dispatch(createDefaultPosition({ latitude, longitude }));
            });
          }
        },
        (error) => {
          if (error.PERMISSION_DENIED) {
            dispatch(
              createError(
                'Предлагаем Вам предоставить приложению доступ к геопозиции браузера и после этого нажать на кнопку',
              ),
            );
          }
        },
      );
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <StyledRow>
            <CurrentPlace />
            <GeolocationSettings />
          </StyledRow>
          {!isPermissionGranted && (
            <StyledButton type="primary" onClick={() => locationTry()}>
              Нажмите сюда если вы разрешили браузеру доступ к геопозиции
            </StyledButton>
          )}

          {!isWeekdayFullInfoShow && <SevenDaysForecast />}
          {isWeekdayFullInfoShow && <FullDayCard />}
        </header>
      </div>
      <Modal footer={null} title="Внимание!" open={!!errorText} onCancel={() => dispatch(closeError())}>
        {errorText}
      </Modal>
    </>
  );
}

export default App;
