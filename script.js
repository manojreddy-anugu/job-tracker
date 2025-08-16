const form = document.getElementById("addJobForm");
const jobsTableBody = document.getElementById("jobsTableBody");

// Load jobs from LocalStorage
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

function renderJobs() {
    jobsTableBody.innerHTML = "";
    jobs.forEach((job, index) => {
        const row = `
  <tr>
    <td>${job.company}</td>
    <td>${job.position}</td>
    <td>${job.dateApplied}</td>
    <td>${job.status}</td>
    <td>
      <button onclick="editJob(${index})">Edit</button>
      <button onclick="deleteJob(${index})">Delete</button>
    </td>
  </tr>
`;
        jobsTableBody.innerHTML += row;
    });
}

// Add new job
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const job = {
    company: document.getElementById("company").value,
    position: document.getElementById("position").value,
    dateApplied: document.getElementById("dateApplied").value,
    status: document.getElementById("status").value
  };
  jobs.push(job);
  localStorage.setItem("jobs", JSON.stringify(jobs));
  renderJobs();
  form.reset();
});

// edit jobs
function editJob(index) {
  const job = jobs[index];

  // Pre-fill form with job details
  document.getElementById("company").value = job.company;
  document.getElementById("position").value = job.position;
  document.getElementById("dateApplied").value = job.dateApplied;
  document.getElementById("status").value = job.status;

  // Remove the old job so new one replaces it
  jobs.splice(index, 1);
  localStorage.setItem("jobs", JSON.stringify(jobs));
  renderJobs();
}


// Delete job
function deleteJob(index) {
  jobs.splice(index, 1);
  localStorage.setItem("jobs", JSON.stringify(jobs));
  renderJobs();
}

// Initial render
renderJobs();

