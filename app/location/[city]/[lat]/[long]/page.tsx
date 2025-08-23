import CalloutCard from "@/components/CalloutCard";
import HumidityChart from "@/components/HumidityChart";
import InformationPanel from "@/components/InformationPanel";
import RainChart from "@/components/RainChart";
import StatCard from "@/components/StatCard";
import TempChart from "@/components/TempChart";
import cleanData from "@/lib/cleanData";

export const revalidate = 60;

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  }
}

const WeatherPage = async ({ params: { city, lat, long } }: Props) => {

  // Directly fetch from Open-Meteo instead of using Apollo/StepZen
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(
    lat
  )}&longitude=${encodeURIComponent(
    long
  )}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,precipitation_probability,rain,showers,snowfall,snow_depth,windgusts_10m,uv_index,uv_index_clear_sky&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max&current_weather=true&timezone=GMT`;

  const weatherRes = await fetch(url, { next: { revalidate: 60 } });
  if (!weatherRes.ok) {
    console.error("Open-Meteo fetch failed", weatherRes.status, weatherRes.statusText);
    throw new Error("Failed to fetch weather data");
  }
  const results: Root = await weatherRes.json();

  const dataToSend = cleanData(results, city)

  const res = await fetch(`${process.env.BASE_URL}/api/getWeatherSummary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      weatherData: dataToSend
    })
  })

  const GPTdata = await res.json()
  const { content } = GPTdata

  return (
    <div className="flex flex-col min-h-screen md:flex-row">

      <InformationPanel city={city} lat={lat} long={long} results={results} />

      <div className="flex-1 p-5 lg:p-10">
        <div className="lg:p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold"> Today&apos;s Overview </h2>
            <p className="text-sm text-gray-400">
              Last Updated at:{" "}
              {new Date(results.current_weather.time).toLocaleDateString()} ({results.timezone})
            </p>
          </div>

          <div className="m-2 mb-10">
            <CalloutCard message={content} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">

            <StatCard title="Max Temperature" metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°`} color="yellow" />

            <StatCard title="Min Temperature" metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°`} color="green" />

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">

            <div className="flex flex-col">

              <StatCard title="UV Index" metric={`${results.daily.uv_index_max[0].toFixed(1)}°`} color="rose" />

              { Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard message="The UV is high today, be sure to wear SPF!" warning />
              ) }

            </div>

            <div className="flex flex-col xl:flex-row xl:space-x-3 space-y-3 xl:space-y-0">

              <StatCard title="Wind Speed" metric={`${results.current_weather.windspeed.toFixed(1)} m/s`} color="cyan" />

              <StatCard title="Wind Direction" metric={`${results.current_weather.winddirection.toFixed(1)}°`} color="violet" />

            </div>

          </div>

        </div>
        <hr className="mb-5" />

        <div className="space-y-6">

          <TempChart results={results} />

          <RainChart results={results} />

          <HumidityChart results={results} />
          
        </div>
      </div>


    </div>
  )
}

export default WeatherPage