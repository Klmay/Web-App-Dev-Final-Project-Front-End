addEventListener("DOMContentLoaded",function(){

document.querySelector("#addBtn").addEventListener("click",addUser)

})
//add the song to the database.. it has to be async function because we are calling data outside our server

async function addUser() {
    //create a song object based on the form that the user fills out. make it easy to send things back to backend
    const User ={
    username: document.querySelector("#UserName").value,
     password: document.querySelector("#Password").value,
     privilege: "1"
     
   
    }
    const response = await  fetch("http://localhost:3000/api/user",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(User)
    })
     window.location.replace("/index.html")
    if(response.ok){
        const results = await response.json()
        //reset the form after done
        document.querySelector("form").reset()
        alert("User Add");
    window.location.replace("/index.html")
    }
    else{
        document.querySelector("#error").innerHTML ="Cannot add User"
    }
}