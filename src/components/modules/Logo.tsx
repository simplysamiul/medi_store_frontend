import Link from 'next/link';
import React from 'react';
import { FaBriefcaseMedical } from 'react-icons/fa';

const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2 ml-4">
            <div className="flex items-center space-x-2">
                <span className="text-[#137FEC] text-3xl"><FaBriefcaseMedical /></span>
                <span className="text-lg font-bold">MediStore</span>
            </div>
        </Link>
    );
};

export default Logo;