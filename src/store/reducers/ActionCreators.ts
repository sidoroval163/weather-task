import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IWeather } from '../../models/IWeather';

const reqInstance = axios.create({
  headers: {
    'X-Yandex-API-Key': `ace8c054-a106-45ff-a719-fcf0fc089e30`, // это секрет)
  },
});
export const fetchWeather = createAsyncThunk(
  'fetch/weather',
  async ({ latitude, longitude }: { latitude: number; longitude: number }, thunkAPI) => {
    try {
      const response = await reqInstance.get<IWeather>(
        `https://web-production-6f1f.up.railway.app/https://api.weather.yandex.ru/v2/forecast?lat=${latitude}&lon=${longitude}&lang=ru_RU`,
      );

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить погодку :(');
    }
  },
);
