import React from 'react';
import { Calendar } from 'lucide-react';

export function SectorNews() {
    const newsData = [
        {
            date: 'Tue, 28 Jan 2025',
            items: [
                {
                    title: 'Autoline Industries Secures Prestigious Order Worth Rs 30 Crores from Mahindra & Mahindra for Scorpio and XUV 3XO Components',
                    category: 'Auto Ancillary',
                },
                {
                    title: 'Bosch Limited reported total income of Rs 4654.7 crores, up by 6.7% (YoY) & net profit of Rs 458.1 crores, down by 11.5% (YoY) in Q3 FY 2025',
                    category: 'Auto Ancillary',
                },
                {
                    title: 'Colgate-Palmolive (India) Limited reported total income of Rs 1482.24 crores, up by 4.8% (YoY) & net profit of Rs 322.78 crores, down by 2.21% (YoY) in Q3 FY 2025',
                    category: 'Household & Personal Products',
                }
            ]
        },
        {
            date: 'Wed, 29 Jan 2025',
            items: [
                {
                    title: 'Tata Motors Unveils Next-Gen Electric SUV Concept at Auto Expo 2025',
                    category: 'Automobile',
                },
                {
                    title: 'Reliance Industries Reports 12% Growth in Net Profit for Q3 FY 2025',
                    category: 'Energy',
                },
                {
                    title: 'Infosys Signs $500 Million Deal with Global Banking Giant for Cloud Transformation',
                    category: 'Information Technology',
                }
            ]
        },
        {
            date: 'Thu, 30 Jan 2025',
            items: [
                {
                    title: 'Adani Ports Acquires 49% Stake in Sri Lanka’s Largest Container Terminal',
                    category: 'Logistics',
                },
                {
                    title: 'HDFC Bank’s Net Interest Income Rises 8.4% in Q3 FY 2025',
                    category: 'Banking',
                },
                {
                    title: 'Hindustan Unilever Reports Decline in Rural Sales Amid Inflation Woes',
                    category: 'Fast Moving Consumer Goods',
                }
            ]
        }
    ];
    

    return (
        <div className="bg-gray-50 px-4 py-3">
            {newsData.map((day, index) => (
                <div key={index} className="mb-4">
                    <div className="flex items-center mb-3">
                        <Calendar className="w-4 h-4 mr-2 opacity-60" />
                        <span className="text-sm text-gray-600">{day.date}</span>
                    </div>
                    <div className="space-y-3">
                        {day.items.map((item, idx) => (
                            <div key={idx} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                                <div className="flex-1">
                                    <h3 className="text-sm font-normal text-gray-900 mb-1.5 leading-tight">
                                        {item.title}
                                    </h3>
                                    <span className="text-sm text-gray-500">{item.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SectorNews;
