import FooterSection from '@/components/layouts/FooterSection';
import { Navbar } from '@/components/layouts/navbar1';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
            <FooterSection />
        </>
    );
};

export default CommonLayout;