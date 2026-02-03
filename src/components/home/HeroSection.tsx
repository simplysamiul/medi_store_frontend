import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const HeroSection = () => {
    return (
        <section className="relative w-full overflow-hidden rounded-2xl">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://visionshopfitters.co.uk/wp-content/uploads/2019/10/Carefully-selected-shelves-at-Zen-Paharmacy-1024x683.jpg')",
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-blue-950/80 via-blue-950/60 to-black/20" />

            {/* Content */}
            <div className="relative z-10 px-6 py-16 sm:px-10 md:px-16 lg:px-20">
                {/* Badge */}
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-600/20 px-4 py-1 text-sm font-medium text-blue-400">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    100% Certified Pharmacies
                </span>

                {/* Heading */}
                <h1 className="mt-6 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                    Trusted Medicines,
                    <br />
                    Delivered{" "}
                    <span className="text-blue-500">Safely.</span>
                </h1>

                {/* Description */}
                <p className="mt-4 max-w-xl text-sm text-gray-300 sm:text-base">
                    Access genuine healthcare products from certified sellers with
                    doorstep delivery and pharmacist support.
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap gap-4">
                    <Button className="bg-blue-600 px-6 py-5 text-sm font-medium hover:bg-blue-700">
                        Shop Now
                        <FiArrowRight className="ml-2" />
                    </Button>

                    <Button
                        asChild
                        variant="secondary"
                        className="bg-white/10 px-6 py-5 text-sm font-medium text-white backdrop-blur hover:bg-white/20"
                    >
                        <Link href="/categories">Browse Categories</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
