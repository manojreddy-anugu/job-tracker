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

// Delete job
function deleteJob(index) {
  jobs.splice(index, 1);
  localStorage.setItem("jobs", JSON.stringify(jobs));
  renderJobs();
}

// Initial render
renderJobs();

