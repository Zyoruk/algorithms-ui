'use client';

import Link from "next/link";
import { routes } from "../../routes";
import { usePathname } from "next/navigation";

export default function Index() {
    const pathName = usePathname();
    return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <nav>
                <ul>
                    {routes.map((route, index) => (
                        <li key={index}>
                            <Link href={route.path} className={route.path === pathName ? "text-blue-500" : "hover:text-blue-300"}>
                                {route.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}