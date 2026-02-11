import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa"
import Logo from "../modules/Logo"

export default function FooterSection() {
  return (
    <footer className="border border-blue-200 mt-8">
      <div className="px-6 pt-12 pb-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Connecting you with certified pharmacies for reliable, fast, and
              safe healthcare delivery since 2024.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 text-gray-600">
              <Button size="icon" variant="outline" className="rounded-full">
                <FaFacebookF className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full">
                <FaTwitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full">
                <FaLinkedinIn className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Shop By */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Shop By</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#">Generics</Link></li>
              <li><Link href="#">Supplements</Link></li>
              <li><Link href="#">OTC Meds</Link></li>
              <li><Link href="#">Medical Devices</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Pharmacy Partners</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#">Order Tracking</Link></li>
              <li><Link href="#">Returns Policy</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Help Center</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-300 pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© 2024 MediStore Health Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
