import React from 'react';
import Link from "next/link";

function LogoutButton() {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded text-white text-center font-bold"
        >
            Sign Out
        </button>
    );
}

export default LogoutButton;
