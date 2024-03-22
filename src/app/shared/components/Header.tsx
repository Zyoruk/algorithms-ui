'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathName = usePathname();
    const parsedPath = pathName.replace('/', '').replaceAll('/', ' > ');
    return (
        <>
            <header className="p-4 bg-blue-900 text-white flex justify-between">
                <h1 className="text-lg"><Link className="hover:text-gray-300" href={'/'}>Algorithms UI</Link> | {parsedPath}</h1>
                <a href="https://github.com/zyoruk" className="text-white hover:text-gray-300">
                    GitHub
                </a>
            </header>
        </>
    )
}