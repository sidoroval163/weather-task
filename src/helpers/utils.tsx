import { IPosition } from '../models/IPosition';

export const getMinutesAndHours = (utcDate: string): string => {
  const date = new Date(utcDate);
  return `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`}`;
};
const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
const month = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];
const currentDate = new Date();
export const getMonthAndDayWord = (date: string): string => {
  const newDate = new Date(date);
  return `${newDate.getDate()} ${month[newDate.getMonth()]}`;
};
export const getWeekday = (utcDate: string): string => {
  const date = new Date(utcDate);
  if (currentDate.getDay() !== date.getDay()) {
    return days[date.getDay()];
  }
  return 'Сегодня';
};
export const isPositionAlreadyExist = (
  positionsArray: IPosition[],
  newPosition: IPosition | Record<string, null>,
  inputValue: string,
): boolean => {
  if (
    !positionsArray.some((e) => e.latitude === newPosition.latitude) &&
    !positionsArray.some((e) => e.longitude === newPosition.longitude) &&
    !positionsArray.some((e) => e.name === inputValue)
  ) {
    return true;
  }
  return false;
};

export const isGeodataValid = (position: IPosition | Record<string, null>): boolean => {
  if (
    /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(String(position.latitude)) &&
    /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(
      String(position.longitude),
    )
  ) {
    return true;
  }
  return false;
};

export const conditionTranslator = (condition: string): string | undefined => {
  switch (condition) {
    case 'clear':
      return 'ясно';
    case 'partly-cloudy':
      return 'переменная облачность';
    case 'cloudy':
      return 'облачно';
    case 'overcast':
      return 'пасмурно';
    case 'drizzle':
      return 'моросит';
    case 'light-rain':
      return 'легкий дождь';
    case 'rain ':
      return 'дождь';
    case 'moderate-rain':
      return 'умеренный дождь';
    case 'heavy-rain':
      return 'сильный дождь';
    case 'continuous-heavy-rain':
      return 'непрерывный сильный дождь';
    case 'showers':
      return 'ливневый дождь';
    case 'wet-snow':
      return 'мокрый снег';
    case 'light-snow':
      return 'легкий снег';
    case 'snow':
      return 'снег';
    case 'snow-showers':
      return 'снегопад';
    case 'hail':
      return 'град';
    case 'thunderstorm':
      return 'гроза';
    case 'thunderstorm-with-rain':
      return 'гроза с дождем';
    case 'thunderstorm-with-hail ':
      return 'гроза с градом';
    default:
      break;
  }
};
