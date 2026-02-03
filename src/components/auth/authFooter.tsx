import { Lock } from "lucide-react";

const AuthFooter = () => {
    return (
        <footer className="w-full border-t bg-white py-6">
            <div className="mx-auto px-4">
                <div className="flex flex-col items-center gap-3 text-center">
                    {/* Links */}
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
                        <a
                            href="#"
                            className="hover:text-slate-900 transition-colors"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            className="hover:text-slate-900 transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="hover:text-slate-900 transition-colors"
                        >
                            Cookie Settings
                        </a>
                    </div>

                    {/* Security Note */}
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Lock className="h-3.5 w-3.5" />
                        <span>Secure SSL Encrypted Connection</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default AuthFooter;