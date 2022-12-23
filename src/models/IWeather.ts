export interface IWeather {
  now: number;
  now_dt: string;
  info: Info;
  geo_object: GeoObject;
  yesterday: Yesterday;
  fact: Fact;
  forecasts?: ForecastsEntity[] | null;
}
export interface Info {
  n: boolean;
  geoid: number;
  url: string;
  lat: number;
  lon: number;
  tzinfo: Tzinfo;
  def_pressure_mm: number;
  def_pressure_pa: number;
  slug: string;
  zoom: number;
  nr: boolean;
  ns: boolean;
  nsr: boolean;
  p: boolean;
  f: boolean;
  _h: boolean;
}
export interface Tzinfo {
  name: string;
  abbr: string;
  dst: boolean;
  offset: number;
}
export interface GeoObject {
  district: DistrictOrLocalityOrProvinceOrCountry;
  locality: DistrictOrLocalityOrProvinceOrCountry;
  province: DistrictOrLocalityOrProvinceOrCountry;
  country: DistrictOrLocalityOrProvinceOrCountry;
}
export interface DistrictOrLocalityOrProvinceOrCountry {
  id: number;
  name: string;
}
export interface Yesterday {
  temp: number;
}
export interface Fact {
  obs_time: number;
  uptime: number;
  temp: number;
  feels_like: number;
  icon: string;
  condition: string;
  cloudness: number;
  prec_type: number;
  prec_prob: number;
  prec_strength: number;
  is_thunder: boolean;
  wind_speed: number;
  wind_dir: string;
  pressure_mm: number;
  pressure_pa: number;
  humidity: number;
  daytime: string;
  polar: boolean;
  season: string;
  source: string;
  accum_prec: AccumPrec;
  soil_moisture: number;
  soil_temp: number;
  uv_index: number;
  wind_gust: number;
}
export interface AccumPrec {
  1: number;
  3: number;
  7: number;
}
export interface ForecastsEntity {
  date: string;
  date_ts: number;
  week: number;
  sunrise: string;
  sunset: string;
  rise_begin: string;
  set_end: string;
  moon_code: number;
  moon_text: string;
  parts: Parts;
  hours?: (HoursEntity | null)[] | null;
  biomet?: Biomet | null;
}
export interface Parts {
  day: EveningOrDay;
  night: NightOrMorning;
  morning: NightOrMorning;
  evening: EveningOrDay;
  day_short: DayShort;
  night_short: NightShort;
}
export interface EveningOrDay {
  _source: string;
  temp_min: number;
  temp_avg: number;
  temp_max: number;
  wind_speed: number;
  wind_gust: number;
  wind_dir: string;
  pressure_mm: number;
  pressure_pa: number;
  humidity: number;
  soil_temp: number;
  soil_moisture: number;
  prec_mm: number;
  prec_prob: number;
  prec_period: number;
  cloudness: number;
  prec_type: number;
  prec_strength: number;
  icon: string;
  condition: string;
  uv_index?: number | null;
  feels_like: number;
  daytime: string;
  polar: boolean;
  fresh_snow_mm?: number | null;
}
export interface NightOrMorning {
  _source: string;
  temp_min: number;
  temp_avg: number;
  temp_max: number;
  wind_speed: number;
  wind_gust: number;
  wind_dir: string;
  pressure_mm: number;
  pressure_pa: number;
  humidity: number;
  soil_temp: number;
  soil_moisture: number;
  prec_mm: number;
  prec_prob: number;
  prec_period: number;
  cloudness: number;
  prec_type: number;
  prec_strength: number;
  icon: string;
  condition: string;
  uv_index?: number | null;
  feels_like: number;
  daytime: string;
  polar: boolean;
  fresh_snow_mm: number;
}
export interface DayShort {
  _source: string;
  temp: number;
  temp_min: number;
  wind_speed: number;
  wind_gust: number;
  wind_dir: string;
  pressure_mm: number;
  pressure_pa: number;
  humidity: number;
  soil_temp: number;
  soil_moisture: number;
  prec_mm: number;
  prec_prob: number;
  prec_period: number;
  cloudness: number;
  prec_type: number;
  prec_strength: number;
  icon: string;
  condition: string;
  uv_index?: number | null;
  feels_like: number;
  daytime: string;
  polar: boolean;
  fresh_snow_mm?: number | null;
}
export interface NightShort {
  _source: string;
  temp: number;
  wind_speed: number;
  wind_gust: number;
  wind_dir: string;
  pressure_mm: number;
  pressure_pa: number;
  humidity: number;
  soil_temp: number;
  soil_moisture: number;
  prec_mm: number;
  prec_prob: number;
  prec_period: number;
  cloudness: number;
  prec_type: number;
  prec_strength: number;
  icon: string;
  condition: string;
  uv_index?: number | null;
  feels_like: number;
  daytime: string;
  polar: boolean;
  fresh_snow_mm: number;
}
export interface HoursEntity {
  hour: string;
  hour_ts: number;
  temp: number;
  feels_like: number;
  icon: string;
  condition: string;
  cloudness: number;
  prec_type: number;
  prec_strength: number;
  is_thunder: boolean;
  wind_dir: string;
  wind_speed: number;
  wind_gust: number;
  pressure_mm: number;
  pressure_pa: number;
  humidity: number;
  uv_index: number;
  soil_temp: number;
  soil_moisture: number;
  prec_mm: number;
  prec_period: number;
  prec_prob: number;
}
export interface Biomet {
  index: number;
  condition: string;
}
