import React from "react";

interface HorizontalBarChartProps {
  label: number; // Label angka di samping bar
  value: number; // Nilai bar
  maxValue: number; // Nilai maksimum untuk mengukur panjang bar
  color?: string; // Warna bar, default biru
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  label,
  value,
  maxValue,
  color = "bg-blue-500", // Default warna Tailwind biru
}) => {
  // Menghitung lebar bar dalam proporsi maxValue
  const barWidth = (value / maxValue) * 100;

  return (
    <div className="flex flex-col items-start">
      {/* Label */}
      <span className="text-lg font-medium">{label}</span>
      {/* Bar */}
      <div className="flex-1 h-4 bg-gray-200 rounded">
        <div
          className={`${color} h-2 rounded`}
          style={{ width: `${barWidth}px` }}
        ></div>
      </div>
    </div>
  );
};

export default HorizontalBarChart;
