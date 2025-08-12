"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "../app/themeprovider";


const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/projects", label: "Projects" },
	{ href: "/contact", label: "Contact" },
];

const Links = () => {
      const { theme, toggleTheme } = useTheme();
	const pathname = usePathname();
	



	

	return (
		<ul className="flex gap-6">
			{navLinks.map((link) => (
				<li key={link.href}>
					<Link
						href={link.href}
						className={`relative z-10 font-medium px-3 py-1 rounded transition-colors duration-200
              ${
								pathname === link.href
									? "text-primary after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-primary after:rounded after:pointer-events-none"
									: "text-foreground hover:text-link"
							}
            `}
					>
						{link.label}
					</Link>
				</li>
			))}
			<li onClick={toggleTheme} className="cursor-pointer select-none">
				{theme === "light" ? "🌜" : "🌞"}
			</li>
		</ul>
	);
};

export default Links;