import React from "react";
import CityPicker from "@/components/CityPicker";
import { Card, Divider, Subtitle, Text } from "@tremor/react";

export default function Home() {
  // Gather envs on the server and log them for debugging
  const envs = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    STEPZEN_API_KEY: process.env.STEPZEN_API_KEY,
    API_URL: process.env.API_URL,
    BASE_URL: process.env.BASE_URL,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#394F68] to-[#183B7E] p-10 flex flex-col justify-center items-center">

      <Card className="max-w-4xl mx-auto bg-white rounded-2xl">

        <Text className="text-5xl font-bold text-center mb-10">Weather AI</Text>
        
        <Subtitle className="text-xl text-center">Powered by OpenAI</Subtitle>

        <Divider className="my-10 bg-gray-400" />

        <Card className="bg-gradient-to-br from-[#394F68] to-[#183B7E]">
          <CityPicker />
        </Card>

        {/* Environment overview (safe to display; secrets masked) */}
        <div className="mt-6">
          <Text className="text-lg font-semibold">Environment</Text>
          <div className="mt-3 grid grid-cols-1 gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">OPENAI_API_KEY</span>
              <span className="font-mono">{envs.OPENAI_API_KEY}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">STEPZEN_API_KEY</span>
              <span className="font-mono">{envs.STEPZEN_API_KEY}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API_URL</span>
              <span className="font-mono max-w-[70%]" title={envs.API_URL || undefined}>
                {envs.API_URL || "Not set"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">BASE_URL</span>
              <span className="font-mono max-w-[70%]" title={envs.BASE_URL || undefined}>
                {envs.BASE_URL || "Not set"}
              </span>
            </div>
          </div>
        </div>
      
      </Card>

    </div>
  )
}
