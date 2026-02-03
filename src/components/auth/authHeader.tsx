import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Logo from "../modules/Logo";

const AuthHeader = () => {
    return (
        <header className="w-full">
            <div className="flex h-16 items-center justify-between">
                {/* Left: Logo */}
                <Logo />

                {/* Right: Desktop Actions */}
                <div className="hidden items-center gap-3 md:flex">
                    <Button variant="ghost" size="sm">
                        Help
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-800">Support</Button>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default AuthHeader;