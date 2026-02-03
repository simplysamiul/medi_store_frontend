import { Truck, ShieldCheck, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Truck,
    title: "Same Day Delivery",
    description: "Order before 2 PM for same-day arrival.",
  },
  {
    icon: ShieldCheck,
    title: "Authenticity Guaranteed",
    description: "All medicines are checked and verified.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Chat with licensed pharmacists anytime.",
  },
];

export default function FeaturedSection() {
  return (
    <section className="w-full bg-slate-50 py-10">
      <div className="">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-none bg-white shadow-lg"
              >
                <CardContent className="flex md:flex-col lg:flex-row items-center gap-6 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded text-blue-600 bg-blue-600/20">
                    <Icon size={24} />
                  </div>

                  <div className="md:text-center lg:text-start">
                    <h4 className="text-lg font-bold text-slate-900">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
