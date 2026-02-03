import AuthFooter from '@/components/auth/authFooter';
import AuthHeader from '@/components/auth/authHeader';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AuthHeader />
            {children}
            <AuthFooter />
        </>
    );
};

export default layout;