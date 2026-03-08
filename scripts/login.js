
let token;

window.onload = function () {
  document.querySelector("#loginBtn").addEventListener("click", function () {
    const username = document.querySelector("#username").value
    const password = document.querySelector("#password").value
    login(username, password)
  })
}

async function login(username, password) {
  const login_cred = {
    username,
    password
  }

  const response = await fetch("http://localhost:3000/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(login_cred)
  })

  if (response.ok) {
    const tokenResponse = await response.json()

    let token = tokenResponse.token
    let uname = tokenResponse.username2
    let auth = tokenResponse.auth
    //need for other code
    let id = tokenResponse.id

    console.log(token)

    localStorage.setItem("token", token)
    localStorage.setItem("uname", uname)
    localStorage.setItem("auth", auth)
    // this for other things
   localStorage.setItem("id", id)

    window.location.replace("/index.html")
  } else {
    document.querySelector("#errorMsg").innerHTML =
      "Bad username and password"
  }
}