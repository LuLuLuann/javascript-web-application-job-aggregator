// all the things related to the html --- styling template

// UI
// not working

// doesn't work
// import { fetchJobs, saveJob } from "./api.js";
import fetchJobs from "./api.js";

let currentPage = 1;
let currentKeyword = "";

async function updateJobs() {
    const jobsContainer = document.getElementById("jobs-container");
    jobsContainer.innerHTML = "<p>Loading jobs...</p>";

    const jobs = await fetchJobs(currentKeyword, currentPage);
    jobsContainer.innerHTML = ""; // Clear previous results

    if (jobs.length === 0) {
        jobsContainer.innerHTML = "<p>No jobs found.</p>";
        return;
    }

    jobs.forEach(job => {
        const jobDiv = document.createElement("div");
        jobDiv.classList.add("job-card");
        jobDiv.innerHTML = `
            <h3>${job.title}</h3>
            <h4>${job.company_name}</h4>
            <h4>${job.salary_min} to ${job.salary_max} USD</h4>
            <p>Job Description: ${job.description}</p>
            <p>Job Excerpt: ${job.excerpt}</p>
            <button class="save-job" data-id="${job.id}">Save Job</button>
        `;
        jobsContainer.appendChild(jobDiv);
    });

    document.querySelectorAll(".save-job").forEach(button => {
        button.addEventListener("click", (e) => {
            const jobId = e.target.getAttribute("data-id");
            saveJob(jobId);
        });
    });
}

// // Event Listeners
document.getElementById("search-btn").addEventListener("click", () => {
    currentKeyword = document.getElementById("search-input").value;
    currentPage = 1;
    updateJobs();
});

document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        updateJobs();
    }
});

document.getElementById("next-btn").addEventListener("click", () => {
    currentPage++;
    updateJobs();
});


// // Initial fetch
updateJobs();