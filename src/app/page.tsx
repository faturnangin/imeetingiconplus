"use client"
import React, { useState, useEffect } from 'react';
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Settings, LoaderCircle } from "lucide-react"
import RoomSummaryContainer from "@/components/roomcard"
interface ApiData {
  createdAt: string;
  period: string;
  data: {
    officeName: string;
    detailSummary: any[];
  }[];
}
export default function Home() {
  const [periods, setPeriods] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [apiData, setApiData] = useState<ApiData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/summaryBookings');
        const data: ApiData[] = await response.json();
        
        // Use Array.from to convert Set to array
        const uniquePeriods = Array.from(new Set(data.map(item => item.period)));
        
        setPeriods(uniquePeriods);
        setApiData(data);
        
        if (uniquePeriods.length > 0) {
          setSelectedPeriod(uniquePeriods[0]);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = selectedPeriod 
    ? apiData.filter(item => item.period === selectedPeriod)
    : [];

  if (isLoading) {
    return <div className='h-screen w-screen flex items-center justify-center'>
      <LoaderCircle size={32} className='animate-spin text-blue-500' />
      Loading...
      </div>;
  }
  return (
    <>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="mt-[68px] gap-3 border-b border-[#ECF0F2] py-3 px-5 flex items-center">
            <Settings size={32}/>
            <span className="text-[#343A40] font-bold text-[18px]">DASHBOARD</span>
        </div>
        <div className="w-full h-full flex flex-1 flex-col gap-4 p-5">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[#4E4E4E]">Periode</span>
            <Select 
              value={selectedPeriod || undefined}
              onValueChange={(value) => setSelectedPeriod(value)}
            >
              <SelectTrigger className="bg-[#ECF9FF] text-xs w-[240px] h-[34px]">
                <SelectValue placeholder="Pilih Periode" />
              </SelectTrigger>
              <SelectContent>
                {periods.map((period) => (
                  <SelectItem key={period} className="text-xs" value={period}>
                    {period}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="flex flex-col w-full justify-center items-start gap-4">
              <RoomSummaryContainer data={filteredData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </>
  )
}
