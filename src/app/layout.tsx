import "@/styles/globals.css";

import { cookies } from "next/headers";
import { DEFAULT_THEME, THEME_COOKIE_NAME } from "@/config/themes";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const theme = (await cookies()).get(THEME_COOKIE_NAME)?.value || DEFAULT_THEME;

	return (
		<html lang="en">
			<body className={theme}>
				{children}
			</body>
		</html>
	);
}