import Link from "next/link";
import { routes } from "../../routes";

export default function Index() {
    return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <nav>
                <ul>
                    {routes.map((route, index) => (
                        <li key={index}>
                            <Link href={route.path}>
                                {route.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}