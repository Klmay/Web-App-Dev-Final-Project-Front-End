/*I don’t know if you will read this i found out the problem it was the way I had my database,
 I did not set the data to be in a array, I found this out off make a new table which explains this monstrosity of code which I cant believe works lol. 
 This took a crazy amount of time but its good and
  I wish I could take what I learned make is the  teacher page but I don’t want to go back remake the JavaScripter to be one file like I did for the student.
   This was a lot of google and a lot of youtube and reddit but it works !!!!!!! */
const userId = localStorage.getItem("id");

addEventListener("DOMContentLoaded", async function () {
    if (!userId) {
        alert("User not logged in.");
        return;
    }

    try {
        const [coursesRes, chestsRes] = await Promise.all([
            fetch("http://localhost:3000/api/class"),
            fetch("http://localhost:3000/api/allChest")
        ]);

        const courses = await coursesRes.json();
        const storage = await chestsRes.json();

        let userChest = storage.find(chest => chest.userID.toString() === userId);

        // Create chest if missing
        if (!userChest) {
            const response = await fetch("http://localhost:3000/api/newchest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userID: userId })
            });

            if (response.ok) {
                userChest = await response.json();
                alert("New chest created");
            } else {
                const err = await response.json();
                document.querySelector("#error").innerHTML = err.error || "Cannot add chest";
                return;
            }
        }

        // Populate available courses table
        const tableBody = document.querySelector("#list_of_class");
        tableBody.innerHTML = "";
        courses.forEach(course => {
            if (!userChest.courses.includes(course._id)) {
                const tr = document.createElement("tr");

                const nameTd = document.createElement("td");
                nameTd.innerText = course.Course; 
                tr.appendChild(nameTd);

                const creditTd = document.createElement("td");
                creditTd.innerText = course.CreditHours;
                tr.appendChild(creditTd);

                const teacherTd = document.createElement("td");
                teacherTd.innerText = course.teacher;
                tr.appendChild(teacherTd);
                

                const DetailTd = document.createElement("td");
                DetailTd.innerHTML = `<a href="details.html?id=${course._id}"> Details</a>`;
                tr.appendChild(DetailTd);
               
 
                

                const actionTd = document.createElement("td");
                const btn = document.createElement("button");
                btn.innerText = "Add";
                btn.addEventListener("click", () => addclass(course._id, course.Course));
                actionTd.appendChild(btn);
                tr.appendChild(actionTd);

                tableBody.appendChild(tr);
            }
        });

        // Populate delete dropdown
        populateDeleteDropdown(courses, userChest.courses);

    } catch (err) {
        console.error(err);
        document.querySelector("#error").innerHTML = "Server error occurred";
    }
});

// Function to populate delete dropdown
function populateDeleteDropdown(allCourses, userCourseIds) {
    const dropdown = document.getElementById("classDropDown");
    dropdown.innerHTML = "";

    const userCourses = allCourses.filter(c => userCourseIds.includes(c._id));
    userCourses.forEach(c => {
        const option = document.createElement("option");
        option.value = c._id;
        option.innerText = c.Course; // only the class name
        dropdown.appendChild(option);
    });
}

async function addclass(courseId, courseName) {
    try {
        const response = await fetch("http://localhost:3000/api/addCourse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userID: userId, course: courseId })
        });

        if (response.ok) {
            alert("Course added successfully!");
            
            const btn = document.querySelector(`button[onclick="addclass('${courseId}')"]`);
            if (btn) btn.closest("tr").remove();
            
            const dropdown = document.getElementById("classDropDown");
            const option = document.createElement("option");
            option.value = courseId;
            option.innerText = courseName;
            dropdown.appendChild(option);
            location.reload();
        } else {
            const err = await response.json();
            alert(err.error || "Failed to add course");
        }
    } catch (err) {
        console.error(err);
        alert("Server error occurred while adding course");
    }
}

// Delete button
document.getElementById("deleteBtn").addEventListener("click", async () => {
    const dropdown = document.getElementById("classDropDown");
    const courseId = dropdown.value;
    if (!courseId) return alert("Select a course to delete.");

    try {
        const response = await fetch("http://localhost:3000/api/removeCourse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userID: userId, course: courseId })
        });

        if (response.ok) {
            alert("Course removed successfully!");
            // Remove option from dropdown
            dropdown.querySelector(`option[value="${courseId}"]`).remove();
            location.reload();
            
            
       
        } else {
            const err = await response.json();
            alert(err.error || "Failed to remove course");
        }
    } catch (err) {
        console.error(err);
        alert("Server error occurred while removing course");
    }
});

// Logout button
document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("id");
    window.location.href = "index.html";
});







   



   
