import AuthFooter from '@/components/auth/authFooter';
import AuthHeader from '@/components/auth/authHeader';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto'>
            <AuthHeader />
            {children}
            <AuthFooter />
        </div>
    );
};

export default layout;