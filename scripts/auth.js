class Auth {
    constructor() {
        document.querySelector("body").style.display = "none";

        const auth = localStorage.getItem("auth");
        this.validateAuth(auth);
    }

    validateAuth(auth) {

        // Not logged in
        if (!auth) {
            window.location.replace("/login.html");
            return;
        }

        // Admin can access everything
        else if (auth === "3" || auth === "2" ||  auth === "1") {
            document.querySelector("body").style.display = "block";
            return;
        }

        // Must match page level
        else {
            window.location.replace("/unauthorized.html");
            return;
        }
    }

    logOut() {
        alert("Logout");
        localStorage.removeItem("auth");
        localStorage.removeItem("token");
        localStorage.removeItem("uname");
        localStorage.removeItem("id");
        window.location.replace("/login.html");
    }
}
     