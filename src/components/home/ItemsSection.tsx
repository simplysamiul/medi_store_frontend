'use client'

import { Card } from "@/components/ui/card"
import {
  FaHandHoldingMedical,
  FaHeartPulse,
  FaDroplet,
  FaShieldHeart,
  FaBaby,
  FaUserDoctor,
} from "react-icons/fa6"

const items = [
  {
    title: "Pain Relief",
    count: "240+ Products",
    icon: FaHandHoldingMedical,
  },
  {
    title: "Heart Health",
    count: "110+ Products",
    icon: FaHeartPulse,
  },
  {
    title: "Diabetes Care",
    count: "85+ Products",
    icon: FaDroplet,
  },
  {
    title: "Immunity",
    count: "150+ Products",
    icon: FaShieldHeart,
  },
  {
    title: "Baby Care",
    count: "300+ Products",
    icon: FaBaby,
  },
  {
    title: "Dermatology",
    count: "190+ Products",
    icon: FaUserDoctor,
  },
]

export default function ItemsSection() {
  return (
    <section className="w-full py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className="flex flex-col items-center justify-center gap-3 rounded-xl border p-5 text-center shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded text-blue-600 bg-blue-600/20">
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500">{item.count}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
