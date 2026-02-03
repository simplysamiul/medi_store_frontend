import { Navbar } from '@/components/layouts/navbar1';
import React from 'react';

const CommonLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default CommonLayout;