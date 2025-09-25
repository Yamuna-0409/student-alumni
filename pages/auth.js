(function () {
	const STORAGE_KEY_USER = "alumniConnect.currentUser";

	function getCurrentUser() {
		try {
			const raw = localStorage.getItem(STORAGE_KEY_USER);
			return raw ? JSON.parse(raw) : null;
		} catch (_) {
			return null;
		}
	}

	function setCurrentUser(user) {
		localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
	}

	function clearCurrentUser() {
		localStorage.removeItem(STORAGE_KEY_USER);
	}

	// Modal helpers
	window.openAuthModal = function openAuthModal() {
		const modal = document.getElementById("authModal");
		if (modal) modal.classList.add("show");
	};

	window.closeAuthModal = function closeAuthModal() {
		const modal = document.getElementById("authModal");
		if (modal) modal.classList.remove("show");
	};

	window.switchTab = function switchTab(which) {
		const loginForm = document.getElementById("loginForm");
		const registerForm = document.getElementById("registerForm");
		const tabs = document.querySelectorAll(".auth-tabs .tab-btn");
		tabs.forEach(function (b) { b.classList.remove("active"); });
		if (which === "login") {
			loginForm && loginForm.classList.add("active");
			registerForm && registerForm.classList.remove("active");
			tabs[0] && tabs[0].classList.add("active");
		} else {
			registerForm && registerForm.classList.add("active");
			loginForm && loginForm.classList.remove("active");
			tabs[1] && tabs[1].classList.add("active");
		}
	};

	function hydrateAuthUI() {
		const user = getCurrentUser();
		const authBtn = document.querySelector(".auth-btn");
		const navWelcome = document.getElementById("navUserWelcome");
		const protectedLinks = document.querySelectorAll(".requires-auth");

		if (user) {
			// Show welcome + sign out
			if (authBtn) {
				authBtn.textContent = "Sign Out";
				authBtn.onclick = function () { signOut(); };
			}
			if (navWelcome) {
				navWelcome.style.display = "block";
				navWelcome.textContent = "Welcome, " + user.name;
			}
			protectedLinks.forEach(function (a) { a.classList.remove("disabled"); });
		} else {
			// Show login/register
			if (authBtn) {
				authBtn.textContent = "Login/Register";
				authBtn.onclick = function () { openAuthModal(); };
			}
			if (navWelcome) { navWelcome.style.display = "none"; }
			protectedLinks.forEach(function (a) { a.classList.add("disabled"); });
		}
	}

	function signOut() {
		clearCurrentUser();
		hydrateAuthUI();
		closeAuthModal();
	}

	function handleLoginSubmit(e) {
		e.preventDefault();
		var email = document.getElementById("loginEmail").value.trim();
		var password = document.getElementById("loginPassword").value;
		if (!email || !password) return;
		// For demo, accept any credentials; in real app, validate against backend
		setCurrentUser({ name: email.split("@")[0] || "User", email: email, type: "student" });
		hydrateAuthUI();
		closeAuthModal();
	}

	function handleRegisterSubmit(e) {
		e.preventDefault();
		var name = document.getElementById("regName").value.trim();
		var email = document.getElementById("regEmail").value.trim();
		var password = document.getElementById("regPassword").value;
		var confirm = document.getElementById("regConfirmPassword").value;
		var type = document.getElementById("userType").value;
		if (!name || !email || !password || !confirm || !type) return;
		if (password !== confirm) {
			alert("Passwords do not match");
			return;
		}
		setCurrentUser({ name: name, email: email, type: type });
		hydrateAuthUI();
		closeAuthModal();
		showWelcomeCard(name);
	}

	document.addEventListener("DOMContentLoaded", function () {
		// Attach handlers for forms if present on page
		var loginForm = document.querySelector("#loginForm form");
		var registerForm = document.querySelector("#registerForm form");
		if (loginForm) loginForm.addEventListener("submit", handleLoginSubmit);
		if (registerForm) registerForm.addEventListener("submit", handleRegisterSubmit);
		hydrateAuthUI();
		// If user just registered on a previous page and returned, you could read a flag here
	});

	function showWelcomeCard(name) {
		var card = document.createElement("div");
		card.className = "welcome-card";
		card.innerHTML = '<h4>Welcome, ' + (name || 'User') + '!</h4>' +
			'<p>Your account is ready. Explore the platform now.</p>';
		document.body.appendChild(card);
		// Force reflow to apply transition
		requestAnimationFrame(function () { card.classList.add("show"); });
		setTimeout(function () {
			card.classList.remove("show");
			setTimeout(function () { card.remove(); }, 250);
		}, 3500);
	}
})();


