"use client"
import Campaigns from "@/component/Campaigns";
import RecentOrders from "@/component/Insights";
import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Home() {

  const [a, seta] = useState(1)
  const [Result, setResult] = useState([])
  const [resultForInsights, setResultForInsights] = useState([])
  useEffect(() => {
    function_ListApi()
    function_ListApi_ForCampaigns()
  }, [])



  const function_ListApi = useCallback(async () => {
    try {
      const result = await axios.get('https://mixo-fe-backend-task.vercel.app/campaigns')
      console.log("resultt", result)
      setResult(result.data)
    } catch (err) {
      console.log(err)
    }

  }, [])

  const function_ListApi_ForCampaigns = useCallback(async () => {
    try {
      const result = await axios.get('https://mixo-fe-backend-task.vercel.app/campaigns/insights')
      console.log("resultt", result)
      setResultForInsights(result.data)
    } catch (err) {
      console.log(err)
    }

  }, [])

  console.log("dsjsd", Result);



  return (
    <>
      <div>
        <RecentOrders
          Result={Result}
        />
        <Campaigns resultForInsights={resultForInsights} />
      </div>
    </>
  );
}
