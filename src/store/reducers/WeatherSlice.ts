import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { isPositionAlreadyExist } from '../../helpers/utils';
import { IInput } from '../../models/IInput';
import { IPosition } from '../../models/IPosition';
import { ForecastsEntity, IWeather } from '../../models/IWeather';
import { fetchWeather } from './ActionCreators';

export interface WeatherState {
  position: IPosition | Record<string, null>;
  isLoading: boolean;
  forecasts: IWeather | Record<string, null>;
  errorText: string;
  isWeekdayFullInfoShow: boolean;
  currentShowedDay: ForecastsEntity | Record<string, null>;
  inputValue: string;
  positionsCollection: (IPosition & { name: string; undestroyable?: boolean })[];
  positionFromInputFields: IPosition | Record<string, null>;
  isPermissionGranted: boolean;
}

const initialState: WeatherState = {
  position: {},
  isLoading: true,
  forecasts: {},
  errorText: '',
  isWeekdayFullInfoShow: false,
  currentShowedDay: {},
  inputValue: '',
  positionsCollection: [],
  positionFromInputFields: { latitude: null, longitude: null },
  isPermissionGranted: false,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    updateCurrentShowedDay: (state, action: PayloadAction<string>) => {
      if (state.forecasts.forecasts) {
        state.currentShowedDay = state.forecasts.forecasts?.filter(function filter(elem) {
          return elem.date === action.payload;
        })[0];
        state.isWeekdayFullInfoShow = true;
      }
    },
    setPermisson: (state) => {
      state.isPermissionGranted = true;
    },
    closeFulDayCard: (state) => {
      state.isWeekdayFullInfoShow = false;
    },
    changeInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    createDefaultPosition: (state, action: PayloadAction<IPosition>) => {
      const [defaultPositionPresent = undefined] = state.positionsCollection.filter(
        (position) => position.undestroyable,
      );
      if (!defaultPositionPresent) {
        state.positionsCollection.push({
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          name: 'DefaultPosition',
          undestroyable: true,
        });
      }
      const isLatitudeSame = defaultPositionPresent
        ? defaultPositionPresent.latitude === action.payload.latitude
        : false;
      const isLongitudeSame = defaultPositionPresent
        ? defaultPositionPresent.longitude === action.payload.longitude
        : false;
      if (isLatitudeSame && isLongitudeSame) {
        const positionIndex = state.positionsCollection.findIndex((position) => position.undestroyable);
        state.positionsCollection[positionIndex] = {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          name: 'DefaultPosition',
          undestroyable: true,
        };
      }
    },
    saveCurrentGeoposition: (state) => {
      if (
        state.position.latitude &&
        state.position.longitude &&
        isPositionAlreadyExist(state.positionsCollection, state.position, state.inputValue)
      ) {
        state.positionsCollection.push({
          latitude: state.position.latitude,
          longitude: state.position.longitude,
          name: state.inputValue,
        });
        state.inputValue = '';
      } else {
        state.errorText = 'Геопозиция с данными Широтой/Долготой или именем уже сохранена';
      }
    },
    removeGeoposition: (state, action: PayloadAction<string>) => {
      state.positionsCollection = state.positionsCollection.filter((item) => item.name !== action.payload);
    },
    closeError: (state) => {
      state.errorText = '';
    },
    createError: (state, action: PayloadAction<string>) => {
      state.errorText = action.payload;
    },
    changeInputLatitudeValue: (state, action: PayloadAction<number>) => {
      state.positionFromInputFields.latitude = action.payload;
    },
    changeInputLongitudeValue: (state, action: PayloadAction<number>) => {
      state.positionFromInputFields.longitude = action.payload;
    },
    changeInputNameValue: (state, action: PayloadAction<IInput>) => {
      const index = state.positionsCollection.findIndex((el) => el.name === action.payload.name);
      state.positionsCollection[index].name = action.payload.value;
    },
    emptyInputNameCheck: (state, action: PayloadAction<string>) => {
      if (action.payload === '') {
        const index = state.positionsCollection.findIndex((el) => el.name === action.payload);
        state.positionsCollection[index].name = `Безымянные координаты - ${index}`;
      }
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
  },
  extraReducers: {
    [fetchWeather.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchWeather.fulfilled.type]: (state, action: PayloadAction<IWeather>) => {
      state.isLoading = false;
      state.errorText = '';
      state.forecasts = action.payload;
      state.position = {
        ...state.position,
        latitude: action.payload.info.lat,
        longitude: action.payload.info.lon,
      };
    },
    [fetchWeather.rejected.type]: (state) => {
      state.isLoading = false;
      state.errorText = 'Произошла ошибка - попоробуйте повторить Ваш запрос';
    },
  },
});

export const weatherReducer = weatherSlice.reducer;
export const {
  saveCurrentGeoposition,
  closeError,
  updateCurrentShowedDay,
  closeFulDayCard,
  changeInputValue,
  changeInputLatitudeValue,
  changeInputLongitudeValue,
  createError,
  removeGeoposition,
  changeInputNameValue,
  emptyInputNameCheck,
  createDefaultPosition,
  startLoading,
  setPermisson,
} = weatherSlice.actions;
