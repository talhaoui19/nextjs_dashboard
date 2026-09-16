"use client";

import { MoreIcon } from "@/app/icons";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function DashboardStatus() {
  const pieData = [
    { name: "ملحس", value: 22, fill: "#FE6F67" },
    { name: "أوامر أطفال", value: 27, fill: "#C7D0FF" },
    { name: "الحب ذكاء", value: 10, fill: "#202C6B" },
    { name: "حسابات أخرى", value: 25, fill: "#354AB5" },
  ];

  const barData = [
    { month: "جانفي", value: 2100 },
    { month: "فيفري", value: 1800 },
    { month: "مارس", value: 900 },
    { month: "أفريل", value: 2200 },
    { month: "ماي", value: 2100 },
    { month: "جوان", value: 2300 },
    { month: "جويلية", value: 1500 },
    { month: "أوت", value: 2200 },
    { month: "سبتمبر", value: 2800 },
    { month: "أكتوبر", value: 2400 },
    { month: "نوفمبر", value: 1100 },
    { month: "ديسمبر", value: 2800 },
  ];

  const tableData = [
    { label: "ملابس", requests: 22, amount: "2,742.00" },
    { label: "ادوات اطفال ", requests: 27, amount: "2,742.00" },
    { label: "العاب ذكاء", requests: 10, amount: "2,742.00" },
    { label: "حسابات أخرى", requests: 25, amount: "2,742.00" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 items-stretch">
      <div className="bg-white rounded-xl p-4 flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">تحليلات الإيرادات</h2>
          <MoreIcon />
        </div>

        <div className="flex-1 mt-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ right: 20, left: 0 }}
              barSize={30}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FE6F67" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FE6F67" />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#D9D9D9"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                textAnchor="center"
                height={50}
                tick={{ fill: "#6B7280", fontSize: 11 }}
              />

              <YAxis
                tick={{ fill: "#6B7280", fontSize: 11 }}
                tickFormatter={(value) => `${value} دج`}
                textAnchor="start"
              />

              <Bar
                dataKey="value"
                fill="url(#colorValue)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">المبيعات حسب مصدر الحركة</h2>
          <MoreIcon />
        </div>

        <div className="flex justify-center my-8">
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              ></Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {tableData.map((item, idx) => (
          <div key={idx} className="grid grid-cols-3 items-center p-3">
            <div className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5"
                style={{ backgroundColor: pieData[idx]?.fill }}
              />

              <span className="text-sm font-medium">{item.label}</span>
            </div>

            <span className="text-xs font-medium text-end">
              {item.requests}
            </span>

            <span className="text-sm font-medium text-end">
              {item.amount} دج
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
