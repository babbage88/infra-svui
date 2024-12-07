import { Icons } from "./icons";

type DocsConfig = {
	mainNav: NavItem[];
	sidebarNav: SidebarNavItem[];
};

export type NavItem = {
	title: string;
	href?: string;
	disabled?: boolean;
	external?: boolean;
	icon?: keyof typeof Icons;
	label?: string;
};

export type SidebarNavItem = NavItem & {
	items: SidebarNavItem[];
};

export type NavItemWithChildren = NavItem & {
	items: NavItemWithChildren[];
};

export const docsConfig: DocsConfig = {
	mainNav: [
		{
			title: "Documentation",
			href: "/docs",
		},
		{
			title: "Components",
			href: "/docs/components/accordion",
		},
		{
			title: "Themes",
			href: "/themes",
		},
		{
			title: "Examples",
			href: "/examples/dashboard",
		},
		{
			title: "Blocks",
			href: "/blocks",
		},
		{
			title: "Colors",
			href: "/colors",
		},
		{
			title: "GitHub",
			href: "https://github.com/huntabyte/shadcn-svelte",
			external: true,
		},
	],
	sidebarNav: [
		{
			title: "Getting Started",
			items: [
				{
					title: "Introduction",
					href: "/docs",
					items: [],
				},
				{
					title: "Installation",
					href: "/docs/installation",
					items: [],
				},
				{
					title: "components.json",
					href: "/docs/components-json",
					items: [],
				},
				{
					title: "Theming",
					href: "/docs/theming",
					items: [],
				},
				{
					title: "Dark mode",
					href: "/docs/dark-mode",
					items: [],
				},
				{
					title: "CLI",
					href: "/docs/cli",
					items: [],
				},
				{
					title: "Typography",
					href: "/docs/typography",
					items: [],
				},
				{
					title: "Figma",
					href: "/docs/figma",
					items: [],
				},
				{
					title: "Changelog",
					href: "/docs/changelog",
					items: [],
				},
				{
					title: "About",
					href: "/docs/about",
					items: [],
				},
			],
		},

],
};

type Example = {
	name: string;
	href: string;
	label?: string;
};
export const examples: Example[] = [
	{
		name: "Dashboard",
		href: "/dashboard",
	},
	{
		name: "Users",
		href: "/users",
	},
];