import React from 'react';
import { CiCircleCheck, CiDeliveryTruck, CiCalendar } from "react-icons/ci";
import { FiShield } from "react-icons/fi";
import { LuCreditCard } from "react-icons/lu";

const Topbar = () => {
  const steps = [
    { label: "Postcode", icon: <CiCircleCheck className="text-lg" />, selected: true, chose: false },
    { label: "Waste Type", icon: <CiCircleCheck className="text-lg" />, selected: true, chose: false },
    { label: "Select Skip", icon: <CiDeliveryTruck className="text-lg" />, selected: false, chose: true },
    { label: "Permit Check", icon: <FiShield className="text-lg" />, selected: false, chose: false },
    { label: "Choose Date", icon: <CiCalendar className="text-lg" />, selected: false, chose: false },
    { label: "Payment", icon: <LuCreditCard className="text-lg" />, selected: false, chose: false },
  ];

  return (
    <div className="bg-[#1f2936] py-4 px-2">
      <div className="overflow-x-auto w-full">
        <div className="flex justify-center min-w-max gap-4 px-2 mx-auto">
          {steps.map((step, index) => {
            const isActive = step.selected;
            const isChosen = step.chose;

            const iconBgColor = isActive
              ? 'bg-green-500'
              : isChosen
              ? 'bg-orange-500'
              : 'bg-[#4b5562]';

            const labelColor = isActive
              ? 'text-green-500'
              : isChosen
              ? 'text-orange-500'
              : 'text-white';

            return (
              <div key={index} className="flex items-center">
                <div className="flex items-center gap-2 px-2 py-2 text-sm font-medium">
                  <div className={`p-2 rounded-lg ${iconBgColor}`}>
                    {step.icon}
                  </div>
                  <span className={labelColor}>{step.label}</span>
                </div>

                {index !== steps.length - 1 && (
                  <div className="w-6 h-1 bg-white mx-2 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
