import React from "react";

interface CircleChartProps {
  percentage: number; // Persentase nilai (0-100)
}

const CircleChart: React.FC<CircleChartProps> = ({ percentage }) => {
  const radius = 50; // Jari-jari lingkaran
  const circumference = 2 * Math.PI * radius; // Keliling lingkaran
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg
        className="w-11 h-11"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lingkaran Background */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#e5e7eb" // Tailwind gray-200
          strokeWidth="20"
        />
        {/* Lingkaran Foreground */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#3b82f6" // Tailwind blue-500
          strokeWidth="20"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)" // Memulai dari atas
        />
      </svg>
    </div>
  );
};

export default CircleChart;
