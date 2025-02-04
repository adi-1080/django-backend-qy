import React from 'react'
import { X } from 'lucide-react'

function AlertModal({ closeModal }) {
  return (
    <div className="fixed inset-0 flex bg-black bg-opacity-50 items-center justify-center z-[1000]" style={{ margin: 0}}>
        <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-lg font-semibold">Set Alert</h2>
            <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-gray-200"
            >
            <X size={18} />
            </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4">
            {/* Symbols */}
            <div>
            <label className="block text-sm font-medium">Symbols</label>
            <input
                type="text"
                value="RELIANCE, 1D, Heikin Ashi, Regular trading"
                disabled
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
            />
            </div>

            {/* Condition */}
            <div>
            <label className="block text-sm font-medium">Condition</label>
            <select className="w-full px-4 py-2 border rounded-lg">
                <option>Price</option>
                <option>Volume</option>
            </select>
            </div>

            {/* Trigger */}
            <div>
            <label className="block text-sm font-medium">Trigger</label>
            <div className="flex gap-2 mt-1">
                {["Only Once", "Once Per Bar", "Once Per Bar Close", "Once Per Minute"].map(
                (trigger, index) => (
                    <button
                    key={index}
                    className="px-3 py-1 border rounded-lg hover:bg-gray-200"
                    >
                    {trigger}
                    </button>
                )
                )}
            </div>
            </div>

            {/* Expiration */}
            <div>
            <label className="block text-sm font-medium">Expiration</label>
            <input
                type="datetime-local"
                value="2025-03-04T21:32"
                className="w-full px-4 py-2 border rounded-lg"
            />
            </div>

            {/* Alert Name */}
            <div>
            <label className="block text-sm font-medium">Alert Name</label>
            <input
                type="text"
                placeholder="Add a custom name"
                className="w-full px-4 py-2 border rounded-lg"
            />
            </div>

            {/* Message */}
            <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
                value="RELIANCE, 1D, Heikin Ashi Crossing"
                className="w-full px-4 py-2 border rounded-lg"
            ></textarea>
            </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
            <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 mr-2"
            >
            Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save
            </button>
        </div>
        </div>
    </div>
  );
};

export default AlertModal