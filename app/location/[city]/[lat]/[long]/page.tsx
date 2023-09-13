import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import InformationPanel from "@/components/InformationPanel";
import StatCard from "@/components/StatCard";
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
    <div className="flex flex-col min-h-screen md:flex-row">

      <InformationPanel city={city} lat={lat} long={long} results={results} />

      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold"> Today's Overview </h2>
            <p className="text-smm text-gray-400">
              Last Updated at:{" "}
              {new Date(results.current_weather.time).toLocaleDateString()} ({results.timezone})
            </p>
          </div>

          <div className="m-2 mb-10">
            <CalloutCard message="This is where GPT summary will appear" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">

            <StatCard title="Max Temperature" metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°`} color="yellow" />

            <StatCard title="Min Temperature" metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°`} color="green" />

          </div>

          <div className="pb-5 m-2">

            <StatCard title="UV Index" metric={`${results.daily.uv_index_max[0].toFixed(1)}°`} color="rose" />

            { Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
              <CalloutCard message="The UV is high today, be sure to wear SPF!" warning />
            ) }

          </div>

          <div className="flex space-x-3 m-2">

            <StatCard title="Wind Speed" metric={`${results.current_weather.windspeed.toFixed(1)} m/s`} color="cyan" />

            <StatCard title="Wind Direction" metric={`${results.current_weather.winddirection.toFixed(1)}°`} color="violet" />

          </div>


        </div>
      </div>

      <hr className="mb-5" />

      <div className="space-y-3">
          
      </div>

    </div>
  )
}

export default WeatherPage