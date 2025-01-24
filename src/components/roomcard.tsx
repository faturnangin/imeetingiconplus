'use client';

import React from 'react';
import CircleChart from './circlechart';
import HorizontalBarChart from './horizontalchart';

interface TotalConsumption {
  name: string;
  totalPackage: string;
  totalPrice: string;
}

interface DetailSummary {
  roomName: string;
  capacity: string;
  averageOccupancyPerMonth: string;
  totalConsumption: TotalConsumption[];
}

interface ApiData {
  createdAt: string;
  period: string;
  data: {
    officeName: string;
    detailSummary: DetailSummary[];
  }[];
}

interface RoomSummaryContainerProps {
  data: ApiData[];
}

const RoomSummaryContainer: React.FC<RoomSummaryContainerProps> = ({ data }) => {
  // Transform data to match previous structure
  const officesData = data.flatMap(item => 
    item.data.map(office => ({
      officeName: office.officeName,
      rooms: office.detailSummary
    }))
  );

  if (officesData.length === 0) {
    return <div>No data available for selected period</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {officesData.map((office, officeIndex) => (
        <div key={officeIndex} className="flex flex-col gap-4">
          <div className="flex gap-3 px-[6px] py-[6px]">
            <img src="/lightning.svg" alt="" />
            <span className="text-[#868E96] text-base font-bold">{office.officeName}</span>
          </div>
          <div className="flex flex-col gap-4">
            {office.rooms.map((roomData, roomIndex) => {
              const occupancyPercentage = (parseInt(roomData.averageOccupancyPerMonth) / parseInt(roomData.capacity)) * 100;

              return (
                <div 
                  key={roomIndex} 
                  className="flex min-w-[230px] flex-col p-3 bg-[#F2F2F2] rounded-[8px] gap-[10px]"
                >
                  <span className="text-sm font-normal text-[#4E4E4E]">{roomData.roomName}</span>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[11px]">Persentase Pemakaian</span>
                      <span className="text-xl font-bold text-black">{occupancyPercentage.toFixed(2)}%</span>
                    </div>
                    <CircleChart percentage={occupancyPercentage} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px]">Nominal Konsumsi</span>
                    <span className="text-xl font-bold text-black">
                      Rp {roomData.totalConsumption.reduce((total, item) => 
                        total + parseInt(item.totalPrice), 0).toLocaleString()}
                    </span>
                    {roomData.totalConsumption.map((consumption, consumptionIndex) => (
                      <div key={consumptionIndex} className="flex items-center gap-[21px]">
                        <span className="text-[10px] w-16 font-medium">{consumption.name}</span>
                        <HorizontalBarChart 
                          label={parseInt(consumption.totalPackage)} 
                          value={parseInt(consumption.totalPackage)} 
                          maxValue={500} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomSummaryContainer;