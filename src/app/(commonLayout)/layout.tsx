import FooterSection from '@/components/layouts/FooterSection';
import { Navbar } from '@/components/layouts/navbar1';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-11/12 lg:w-10/12 mx-auto'>
            <Navbar />
            {children}
            <FooterSection />
        </div>
    );
};

export default CommonLayout;