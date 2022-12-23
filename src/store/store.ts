import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { getPersistConfig } from 'redux-deep-persist';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { weatherReducer } from './reducers/WeatherSlice';

const rootReducer = combineReducers({ weatherReducer });
const config = getPersistConfig({
  key: 'root',
  storage,
  blacklist: [
    'weatherReducer.isLoading',
    'weatherReducer.position',
    'weatherReducer.forecasts',
    'weatherReducer.errorText',
    'weatherReducer.isWeekdayFullInfoShow',
    'weatherReducer.currentShowedDay',
    'weatherReducer.inputValue',
    'weatherReducer.isPositionErrorShow',
    'weatherReducer.isCoordinatesErrorShow',
    'weatherReducer.positionFromInputFields',
    'weatherReducer.isPermissionGranted',
  ],
  rootReducer,
});
const persistedReducer = persistReducer(config, rootReducer);

export const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
