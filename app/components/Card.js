"use client";
import React, { useEffect, useState } from 'react';
import { fetchDetails } from './services/api';

const Card = () => {
    const [cardData, setData] = useState([]);
    const [selectedSkipId, setSelectedSkipId] = useState(null);
    const [loading, setLoading] = useState(true);

    const skipSelected = (item) => {
        if (selectedSkipId === item.id) {
            setSelectedSkipId(null);
        } else {
            setSelectedSkipId(item.id);
        }
    };

    useEffect(() => {
        fetchDetails()
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);
    if (typeof window === 'undefined') return null;

    return (
        <div className="my-4 px-4">
            {/* Header Section */}
            <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Choose Your Skip Size</h1>
                <p className="text-sm sm:text-base text-gray-400">Select the skip size that best suits your needs</p>
            </div>

            {/* Loading Indicator */}
            {loading ? (
                <div className="text-center text-white font-semibold py-12">Loading skip options...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {cardData.map((skip) => (
                        <div key={skip.id} className="bg-[#1e293b] text-white rounded-lg overflow-hidden shadow-md flex flex-col mx-2">
                            {/* Top Badge */}
                            <div className="flex justify-between items-center p-2">
                                {skip.allowed_on_road && (
                                    <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                                        ★ ALLOWED ON ROADS
                                    </span>
                                )}
                            </div>

                            {/* Image */}
                            <div className="w-full h-36 bg-gray-700 overflow-hidden flex justify-center items-center">
                                <img
                                    src="https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg"
                                    alt="Skip"
                                    className="h-full object-cover"
                                />
                            </div>

                            {/* Info Section */}
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-base sm:text-lg">{skip.size} YARD SKIP</h3>
                                    <span className="text-orange-400 font-bold text-sm sm:text-base">
                                        £{(skip.price_before_vat + skip.vat).toFixed(2)}
                                        <span className="text-xs ml-1">Inc. VAT</span>
                                    </span>
                                </div>

                                <p className="text-xs sm:text-sm mb-1">
                                    <strong>Hire Period:</strong> {skip.hire_period_days} days
                                </p>
                                <p className="text-xs sm:text-sm mb-1">
                                    <strong>Heavy Waste:</strong> {skip.allows_heavy_waste ? 'Yes' : 'No'}
                                </p>
                                <p className="text-xs sm:text-sm mb-3">
                                    <strong>On Road:</strong> {skip.allowed_on_road ? 'Yes' : 'No'}
                                </p>

                                {/* Button */}
                                <button
                                    onClick={() => skipSelected(skip)}
                                    className={`cursor-pointer mt-auto font-semibold py-2 rounded text-sm sm:text-base transition ${selectedSkipId === skip.id
                                            ? 'bg-green-500 text-white'
                                            : 'bg-orange-500 hover:bg-orange-600 text-white'
                                        }`}
                                >
                                    {selectedSkipId === skip.id ? "SELECTED" : "SELECT THIS SKIP"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Card;
