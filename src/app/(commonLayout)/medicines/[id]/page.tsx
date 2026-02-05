import MedicineDetails from "@/components/modules/MedicineDetails";


const MedicineDetailsPage = async ({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params;
    return (
        <div>
            <MedicineDetails medicineId={id} />
        </div>
    );
};

export default MedicineDetailsPage;