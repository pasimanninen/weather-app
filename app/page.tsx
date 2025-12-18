import styles from './page.module.css'
import { format } from 'date-fns'

async function getData() {
  const city = 'Jyväskylä';
  const api_key = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
  const weatherRequest = await fetch(url);
  const weatherInfo = await weatherRequest.json();

  if (!weatherRequest.ok) {
    throw new Error('Failed to fetch data');
  }

  return { weatherInfo, city };
}

export default async function Home() {
  const data = await getData();
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>{data.city}</h1>
        <p>{format(new Date(), 'dd.MM.yyyy HH:mm')}</p>
        <p>{Math.round(data.weatherInfo.main.temp)}°C</p>
        <p>{data.weatherInfo.weather[0].description}</p>
        <img
          src={`https://openweathermap.org/img/wn/${data.weatherInfo.weather[0].icon}@2x.png`}
          alt={data.weatherInfo.weather[0].description}
        />
      </div>
    </main>
  );
}