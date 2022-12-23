import { Button, Input, List } from 'antd';
import React from 'react';
import styled from 'styled-components/macro';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchWeather } from '../store/reducers/ActionCreators';
import {
  changeInputNameValue,
  changeInputValue,
  createError,
  emptyInputNameCheck,
  removeGeoposition,
  saveCurrentGeoposition,
} from '../store/reducers/WeatherSlice';

const Wrapper = styled.div`
  margin-top: 20px;
`;
export function GeolocationSaver() {
  const { inputValue, positionsCollection } = useAppSelector((state) => state.weatherReducer);
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <Input
        value={inputValue}
        onChange={(e) => {
          dispatch(changeInputValue(e.target.value));
        }}
        placeholder="Название геопозиции"
      />
      <Button
        onClick={() => {
          dispatch(saveCurrentGeoposition());
        }}
        type="primary"
        disabled={!inputValue}
      >
        Сохранить текущую геопозицию
      </Button>
      <List
        size="small"
        header={<div>Список сохраненных позиций</div>}
        bordered
        dataSource={positionsCollection}
        renderItem={(item) =>
          !item.undestroyable ? (
            <List.Item
              actions={[
                <a
                  onClick={() => {
                    dispatch(removeGeoposition(item.name));
                  }}
                  key="list-loadmore-remove"
                  aria-hidden="true"
                >
                  Удалить
                </a>,
                <a
                  onClick={() => {
                    dispatch(fetchWeather(item)).catch((e) => {
                      dispatch(createError((e as Error).message));
                    });
                  }}
                  key="list-loadmore-go"
                  aria-hidden="true"
                >
                  Перейти
                </a>,
              ]}
            >
              <Input
                value={item.name}
                onChange={(e) => {
                  const { value } = e.target;
                  const { name } = item;
                  dispatch(changeInputNameValue({ name, value }));
                }}
                onBlur={() => {
                  const { name } = item;
                  dispatch(emptyInputNameCheck(name));
                }}
              />
            </List.Item>
          ) : (
            <List.Item
              actions={[
                <a
                  onClick={() => {
                    dispatch(fetchWeather(item)).catch((e) => {
                      dispatch(createError((e as Error).message));
                    });
                  }}
                  key="list-loadmore-go"
                  aria-hidden="true"
                >
                  Перейти
                </a>,
              ]}
            >
              <Input
                value={item.name}
                onChange={(e) => {
                  const { value } = e.target;
                  const { name } = item;
                  dispatch(changeInputNameValue({ name, value }));
                }}
                onBlur={() => {
                  const { name } = item;
                  dispatch(emptyInputNameCheck(name));
                }}
              />
            </List.Item>
          )
        }
      />
    </Wrapper>
  );
}
