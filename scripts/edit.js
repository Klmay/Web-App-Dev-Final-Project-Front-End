addEventListener("DOMContentLoaded", async function() {
    document.querySelector("#UpdateBtn").addEventListener("click", updateClass);

    const urlparam = new URLSearchParams(window.location.search);
    const classID = urlparam.get('id');

    const response = await fetch("http://localhost:3000/api/class/" + classID);
    if (response.ok) {
        const course = await response.json();
        document.querySelector("#classId").value = course._id;
        document.querySelector("#course").value = course.Course;
        document.querySelector("#teacher").value = course.teacher;
        document.querySelector("#CreditHours").value = course.CreditHours;
        document.querySelector("#description").value = course.description;
    }
});

async function updateClass() {
    const urlparam = new URLSearchParams(window.location.search);
    const classID = urlparam.get('id');

    const course = {
        _id: document.querySelector("#classId").value,
        Course: document.querySelector("#course").value,
        teacher: document.querySelector("#teacher").value,
        CreditHours: document.querySelector("#CreditHours").value,
        description: document.querySelector("#description").value
    };

    const response = await fetch("http://localhost:3000/api/class/" + classID, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(course)
    });

    if (response.ok) {
        alert("Class Updated");
         window.location.replace("/TeacherPage.html")
    } else {
        document.querySelector("#error").innerHTML = "Cannot update class";
    }
}