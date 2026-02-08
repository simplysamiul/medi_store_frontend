interface MedicineInfo {
    expiry_date: Date,
    image_url: string,
    manufacturer: string,
    med_des: string,
    med_name: string,
    seller_id: string,
    stock_quantity: string,
    category_id:string
}

export type MedicineType = Omit<MedicineInfo, "id" | "created_at" | "updated_at" | "is_active">