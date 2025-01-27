import React from "react";

const newsItems = [
  {
    category: "Engineering - Construction",
    image: "/placeholder.svg?height=200&width=300",
    title:
      "Tarmat Limited has assigned Civil Works order to RDB Infrastructure & Power Limited for Taxiway 'M' Phase-1 on Airside at Chhatrapati Shivaji Maharaj International Airport, Mumbai",
  },
  {
    category: "IT - Software",
    image: "/placeholder.svg?height=200&width=300",
    title:
      "LTIMindtree Limited has announced the appointment of Mr. Venugopal Lambu as an Additional Director designated as CEO Designate & Managing Director",
  },
  {
    category: "Finance - Investment",
    image: "/placeholder.svg?height=200&width=300",
    title:
      "DAM Capital Advisors Limited's Total Income stood at Rs 104 crores for the quarter (up 132% y-o-y) & Profit after tax (PAT) stood at Rs 40.2 crores",
  },
  {
    category: "IT - Software",
    image: "/placeholder.svg?height=200&width=300",
    title:
      "Intellect Design Arena Limited reported total income of Rs 624.8 crores, down by 4.5% (YoY) & profit after tax of Rs 70.7 crores in Q3 FY24",
  },
  {
    category: "IT - Software",
    image: "/placeholder.svg?height=200&width=300",
    title:
      "Mistral Solutions Limited, subsidiary of Axis Technologies Limited announced an advanced Digital Signal Processing",
  },
];

export function NewsAndUpdates() {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">News and Updates</h2>
        <a href="#" className="text-blue-600 hover:underline text-sm">
          View All
        </a>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="min-w-[280px] max-w-[280px] bg-white border-spacing-2 shadow-xl rounded-lg flex-shrink-0"
          >
            <img
              src={item.image || "/placeholder.svg"}
              alt=""
              className="w-full h-[140px] object-cover rounded-t-lg"
            />
            <div className="p-4">
              <div className="text-xs text-gray-600 mb-2">{item.category}</div>
              <h3 className="text-sm leading-tight line-clamp-3">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}