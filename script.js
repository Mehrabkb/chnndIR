const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const togglePassword = document.getElementById("togglePassword");

phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, "");
    if (phoneInput.value.length > 11) {
        phoneInput.value = phoneInput.value.slice(0, 11);
    }
});

passwordInput.addEventListener("input", () => {
    passwordInput.value = passwordInput.value.replace(/[^a-zA-Z0-9]/g, "");
});

togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "👁️";
    }
});

loginBtn.addEventListener("click", () => {
    const phone = phoneInput.value.trim();
    const password = passwordInput.value.trim();

    if (!phone || !password) {
        alert("همه فیلدها را پر کنید");
        return;
    }

    if (phone.length !== 11) {
        alert("شماره موبایل باید 11 رقم باشد");
        return;
    }

    if (password.length > 25) {
        alert("رمز عبور نباید بیشتر از 25 کاراکتر باشد");
        return;
    }

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password })
    })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(() => alert("خطا در ارتباط با سرور"));
});
