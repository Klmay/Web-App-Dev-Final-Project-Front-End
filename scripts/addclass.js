addEventListener("DOMContentLoaded",function(){

document.querySelector("#addBtn").addEventListener("click",addclass)

})
//add the song to the database.. it has to be async function because we are calling data outside our server

async function addclass() {
    //create a song object based on the form that the user fills out. make it easy to send things back to backend
    const Class ={
    Course: document.querySelector("#Course").value,
    teacher: document.querySelector("#teacher").value,
    CreditHours: document.querySelector("#CreditHours").value,
    description: document.querySelector("#description").value
    }
    const response = await  fetch("http://localhost:3000/api/class",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Class)
    })
    if(response.ok){
        const results = await response.json()
        alert("Added class with ID of " +results._id)

        //reset the form after done
        document.querySelector("form").reset()
         //reload so you can see that the class was add to the list
        location.reload();
    }
    else{
        document.querySelector("#error").innerHTML ="Cannot add class"
    }
}