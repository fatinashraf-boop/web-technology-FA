document.getElementById("reportForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // 1. Basic Validation Checks
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const location = document.getElementById("location").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const date = document.getElementById("item_date").value;

    if (!title || !description || !location || !contact || !date) {
        alert("Please fill in all required fields.");
        return;
    }

    // 2. Date Validation (Ensure date is not in the future)
    const selectedDate = new Date(date);
    const today = new Date();
    if (selectedDate > today) {
        alert("The date cannot be in the future.");
        return;
    }

    // Proceed with FormData and Fetch
    const formData = new FormData(e.target);
    const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        body: formData
    });

    if (res.ok) {
    alert("Item reported successfully!");
    window.location.href = "dashboard.html";
} else {
    // If the server returns an error (e.g., 401 Unauthorized or 500 Server Error)
    const errorData = await res.json();
    alert("Error: " + (errorData.message || "Failed to submit report. Please try again."));
}
});