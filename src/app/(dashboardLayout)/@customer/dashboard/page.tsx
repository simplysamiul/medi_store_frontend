import { redirect } from 'next/navigation';

const CustomerDashboard = () => {
    return redirect("/dashboard/ordered-medicine");
};

export default CustomerDashboard;