import { redirect } from "next/navigation";

export default function Home() {
	redirect("/auth/login");
	return (
		<>
			<main>
				Кто увидел тот лох
				{/* Вставить страницу Qwano */}
			</main>
		</>
	);
}
