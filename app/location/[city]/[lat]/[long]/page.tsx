import { getClient } from "@/apollo-client";
import fetchWeatherQuery from "@/grapghql/queries/fetchWeatherQueries";

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  }
}

const WeatherPage = async ({ params: { city, lat, long } }: Props) => {

  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: 'GMT',
    }
  })
  
  const results: Root = data.myQuery;

  return (
    <div>
      WeatherPage: {city} {lat} {long}
    </div>
  )
}

export default WeatherPage