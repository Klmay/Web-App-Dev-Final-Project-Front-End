
document.addEventListener("DOMContentLoaded", () => {
    const auth = new Auth();

    const logoutBtn = document.querySelector("#logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            auth.logOut();
            alert("Logout");
        });
    }
});