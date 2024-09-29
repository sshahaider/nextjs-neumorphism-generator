import Link from "next/link"
import { buttonVariants } from "./ui/button";
import { GithubIcon } from "lucide-react";
import { siteName } from "@/config";

export default function Header() {

    return (
        <header className="sticky top-0 z-50 w-full h-[60px] border border-b border-border/20 backdrop-filter backdrop-blur-lg flex items-center justify-center">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <nav className="w-full flex items-center justify-between">
                    <Link href="/" className='font-bold'>
                        {siteName}
                    </Link>

                    <div className='flex items-center justify-center gap-x-3'>
                        <Link
                            className={buttonVariants({ size: "icon", variant: "ghost" })}
                            href="https://github.com/sshahaider/nextjs-neumorphism-generator">
                            <GithubIcon />
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}