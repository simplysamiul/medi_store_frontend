interface MedicineInfo {
    id?: string,
    expiry_date: Date,
    image_url: string,
    manufacturer: string,
    med_des: string,
    med_name: string,
    seller_id: string,
    stock_quantity: string,
    category_id: string,
    is_active?:boolean,
    price?:string
}

export type MedicineType = Omit<MedicineInfo, "created_at" | "updated_at">