import { SunIcon } from "@heroicons/react/solid"

const loading = () => {
  return (
    <div className="bg-gradient-to-br from-[#394F68] to-[#183B7e] min-h-screen flex flex-col items-center justify-center text-slate-500">

        <SunIcon className="h-24 w-24 animate-bounce text-yellow-500" color="yellow" />

        <h1 className="text-6xl text-white font-bold text-center mb-10 animate-pulse"> Loading City Weather Information </h1>

        <h2 className="text-xl text-white font-bold text-center mb-10 animate-pulse"> Hold on, we are crunching the numbers & generating an AI Summary of the Weather! </h2>

    </div>
  )
}

export default loading