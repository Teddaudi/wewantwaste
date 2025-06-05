"use client";
import React, { useEffect, useState } from 'react';
import { fetchDetails } from './services/api';

const Card = () => {
    const [cardData, setData] = useState([]);
    const [selectedSkips, setSelectedSkips] = useState([]);
    const [loading, setLoading] = useState(true);

    const toggleSkipSelection = (item) => {
        setSelectedSkips((prev) => {
            const exists = prev.find(skip => skip.id === item.id);
            return exists ? prev.filter(s => s.id !== item.id) : [...prev, item];
        });
    };

    useEffect(() => {
        fetchDetails()
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="my-4 px-4">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Choose Your Skip Size</h1>
                <p className="text-sm sm:text-base text-gray-400">Select the skip size that best suits your needs</p>
            </div>

            {loading ? (
                <div className="text-center text-white font-semibold py-12">Loading skip options...</div>
            ) : (
                <div className="flex gap-4">
                    {/* Main Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6 flex-grow">
                        {cardData.map((skip) => {
                            const isSelected = selectedSkips.find(s => s.id === skip.id);

                            return (
                                <div key={skip.id} className="bg-[#1e293b] text-white rounded-lg overflow-hidden shadow-md flex flex-col">
                                    <div className="flex justify-between items-center p-2">
                                        {skip.allowed_on_road && (
                                            <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                                                ★ ALLOWED ON ROADS
                                            </span>
                                        )}
                                    </div>

                                    <div className="w-full h-36 bg-gray-700 overflow-hidden flex justify-center items-center group cursor-pointer">
                                        <img
                                            src="https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg"
                                            alt="Skip"
                                            className="h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                                        />
                                    </div>

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

                                        <button
                                            onClick={() => toggleSkipSelection(skip)}
                                            className={`cursor-pointer mt-auto font-semibold py-2 rounded text-sm sm:text-base transition ${isSelected
                                                ? 'bg-green-500 text-white'
                                                : 'bg-orange-500 hover:bg-orange-600 text-white'
                                                }`}
                                        >
                                            {isSelected ? "SELECTED" : "SELECT THIS SKIP"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Sidebar */}
                    {selectedSkips.length > 0 && (
                        <div className="fixed bottom-0 left-0 right-0 bg-[#111827] text-white px-4 py-3 border-t border-gray-800 shadow-md z-50">
                            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="text-center sm:text-left text-xs text-gray-400 mb-2 sm:mb-0">
                                    Imagery and information shown throughout this website may not reflect the exact shape or size specification,
                                    colours may vary, options and/or accessories may be featured at additional cost.
                                </div>

                                {/* Display skip info */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full sm:w-auto gap-4">
                                    <div className="text-sm sm:text-base font-medium">
                                        {selectedSkips[0]?.size} Yard Skip
                                    </div>
                                    <div className="text-orange-400 font-bold text-lg sm:ml-4">
                                        £{(selectedSkips[0]?.price_before_vat + selectedSkips[0]?.vat).toFixed(2)}{" "}
                                        <span className="text-sm font-normal text-white">
                                            {selectedSkips[0]?.hire_period_days} days
                                        </span>
                                    </div>

                                    <div className="flex gap-2 sm:ml-6 w-full sm:w-auto">
                                        <button
                                            className="flex-1 sm:flex-none bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
                                            onClick={() => setSelectedSkips([])}
                                        >
                                            Back
                                        </button>
                                        <button
                                            className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded cursor-pointer"
                                            onClick={() => alert("Continue to next step")}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}



                </div>
            )}
        </div>
    );
};

export default Card;
