import { medicineService } from "@/services/medicine.service";
import { userService } from "@/services/user.service";
import ManageMedicineTable from "./ManageMedicineTable";


const ManageMedicine = async () => {
    const session = await userService.getSession();
    const userId = session.data?.user.id;
    let data;
    if (userId) {
        const result = await medicineService.getMedicines(userId as string);
        data = result?.data.data
    }
    return (
        <div>
            <ManageMedicineTable
                medicines={data}
            />
        </div>
    );
};

export default ManageMedicine;