import { redirect } from 'next/navigation';

const AdminDashboard = () => {
    return redirect("/admin-dashboard/all-users");
};

export default AdminDashboard;