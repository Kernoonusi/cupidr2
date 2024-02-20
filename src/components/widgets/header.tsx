import Link from "next/link";

let isLoggedIn = false;

export default function Header() {
	return (
		<header className="container-fluid">
			<nav>
				<ul>
					<li>
						<strong>Cupidr</strong>
					</li>
				</ul>
				<ul>
					<li>
                        <Link href="/login" className="contrast">Войти</Link>
					</li>
					<li>
                        <Link href="/register" className="contrast">Регистрация</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
