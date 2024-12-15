"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Round 1",
    accuracy: 78,
    engagement: 85,
  },
  {
    name: "Round 2",
    accuracy: 82,
    engagement: 88,
  },
  {
    name: "Round 3",
    accuracy: 86,
    engagement: 90,
  },
  {
    name: "Round 4",
    accuracy: 84,
    engagement: 87,
  },
  {
    name: "Round 5",
    accuracy: 89,
    engagement: 92,
  },
  {
    name: "Round 6",
    accuracy: 92,
    engagement: 94,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Bar
          dataKey="accuracy"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary opacity-70"
        />
        <Bar
          dataKey="engagement"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}