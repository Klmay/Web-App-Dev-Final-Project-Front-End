addEventListener("DOMContentLoaded", async function() {
    document.querySelector("#deleteBtn").addEventListener("click", deleteClass);
    getALLClass();
});

async function getALLClass() {
    const response = await fetch("http://localhost:3000/api/class");
    if (response.ok) {
        const courses = await response.json();
        let html = "";
        for (let course of courses) {
            html += `<option value="${course._id}">${course.Course}</option>`;
        }
        document.querySelector("#classDropDown").innerHTML = html;
    }
}

async function deleteClass() {
    const classID = document.querySelector("#classDropDown option:checked").value;
    const response = await fetch("http://localhost:3000/api/class/" + classID, {
        method: "DELETE"
    });
    if (response.ok) {
        getALLClass();
        alert("Class Deleted");
        //test
        location.reload();
    } else {
        document.querySelector("#error").innerHTML = "Cannot delete Class";
    }
}