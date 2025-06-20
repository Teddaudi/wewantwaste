"use client";
import React, { useEffect, useState } from 'react';
import { fetchDetails } from './services/api';
import { TbWeight } from "react-icons/tb";
import { GiHazardSign } from "react-icons/gi";


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
                                            <span className="text-orange-400 font-bold text-sm sm:text-base leading-tight">
                                                £{(skip.price_before_vat + skip.vat).toFixed(2)}
                                                <span className="block text-xs text-gray-500 font-medium">Inc. VAT</span>
                                            </span>

                                        </div>

                                        <p className="text-xs sm:text-sm mb-1">
                                            <strong>Hire Period:</strong> {skip.hire_period_days} days
                                        </p>
                                        {
                                            skip.allows_heavy_waste ? (<div className="w-fit text-xs sm:text-sm border border-green-400 flex items-center gap-1 my-2 px-2 py-1 rounded-lg text-center">
                                                <TbWeight className="text-green-400" />
                                                <div className="text-green-400">Heavy Waste OK</div>
                                            </div>) : (<div className="w-fit text-xs sm:text-sm border border-yellow-500 flex items-center gap-1 my-2 px-2 py-1 rounded text-center">
                                                <GiHazardSign className="text-yellow-500" />
                                                <div className="text-yellow-500">PERMIT REQUIRED</div>
                                            </div>)

                                        }


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

                    {/* Bottombar */}
                    {selectedSkips.length > 0 && (
                        <div className="fixed bottom-0 left-0 right-0 bg-[#111827] text-white px-4 py-4 border-t border-gray-800 shadow-md z-50">
                            <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                {/* Disclaimer Text */}
                                <div className="text-xs text-gray-400 text-center sm:text-left">
                                    Imagery and information shown throughout this website may not reflect the exact shape or size specification,
                                    colours may vary, options and/or accessories may be featured at additional cost.
                                </div>

                                {/* Skip Info & Actions */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
                                    <div className="text-sm sm:text-base font-medium text-center sm:text-left">
                                        {selectedSkips[0]?.size} Yard Skip
                                    </div>
                                    <div className="text-orange-400 font-bold text-lg text-center sm:text-left">
                                        £{(selectedSkips[0]?.price_before_vat + selectedSkips[0]?.vat).toFixed(2)}{" "}
                                        <div className="text-sm font-normal text-white">
                                            {selectedSkips[0]?.hire_period_days} days
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                        <button
                                            className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
                                            onClick={() => setSelectedSkips([])}
                                        >
                                            Back
                                        </button>
                                        <button
                                            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
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
