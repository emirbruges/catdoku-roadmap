window.addEventListener("DOMContentLoaded", () => {
	const savedTheme = localStorage.getItem("theme") || "light";
	setTheme(savedTheme);

	function setTheme(theme) {
		const root = document.documentElement;
		if (theme === "dark") {
			root.classList.add("dark-theme");
			document.getElementById("theme-toggle").checked = true;
		} else {
			root.classList.remove("dark-theme");
			document.getElementById("theme-toggle").checked = false;
		}
		localStorage.setItem("theme", theme);
	}

	function toggleTheme() {
		const isDark = document.documentElement.classList.toggle("dark-theme");
		localStorage.setItem("theme", isDark ? "dark" : "light");
		document.getElementById("theme-toggle").checked = isDark;
	}

	const toggle = document.getElementById("theme-toggle");
	if (toggle) {
		toggle.addEventListener("change", () => {
			toggleTheme();
		});
	}
});
