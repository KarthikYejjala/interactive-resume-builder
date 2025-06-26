// DOM Elements
const form = document.getElementById("resume-form");
const preview = document.getElementById("resume-preview");
const skillsInput = document.getElementById("skills");
const eduSection = document.getElementById("education-section");
const expSection = document.getElementById("experience-section");

// Track dynamic input rows
let eduCount = 0;
let expCount = 0;

// Update preview on form change
form.addEventListener("input", updatePreview);

// Add dynamic education fields
function addEducation() {
  eduCount++;
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Degree & Institution" class="edu-input" data-id="${eduCount}" />
  `;
  eduSection.appendChild(div);
  div.querySelector("input").addEventListener("input", updatePreview);
}

// Add dynamic experience fields
function addExperience() {
  expCount++;
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Job Title & Company" class="exp-input" data-id="${expCount}" />
  `;
  expSection.appendChild(div);
  div.querySelector("input").addEventListener("input", updatePreview);
}

// Clear preview and form
function clearPreview() {
  preview.innerHTML = "";
  eduSection.innerHTML = "";
  expSection.innerHTML = "";
  eduCount = 0;
  expCount = 0;
}

// Update resume preview
function updatePreview() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const summary = document.getElementById("summary").value;
  const skills = skillsInput.value.split(",").map(s => s.trim()).filter(Boolean);

  // Education list
  const eduInputs = document.querySelectorAll(".edu-input");
  const eduItems = [...eduInputs].map(input => input.value).filter(Boolean);

  // Experience list
  const expInputs = document.querySelectorAll(".exp-input");
  const expItems = [...expInputs].map(input => input.value).filter(Boolean);

  // Construct preview HTML
  preview.innerHTML = `
    <div class="resume-block"><h3>${name || "Your Name"}</h3></div>
    <div class="resume-block">${email || ""} | ${phone || ""}</div>

    ${summary ? `<div class="resume-block"><h3>Profile Summary</h3><p>${summary}</p></div>` : ""}
    
    ${eduItems.length > 0 ? `<div class="resume-block"><h3>Education</h3><ul>${eduItems.map(e => `<li>${e}</li>`).join("")}</ul></div>` : ""}
    
    ${expItems.length > 0 ? `<div class="resume-block"><h3>Experience</h3><ul>${expItems.map(e => `<li>${e}</li>`).join("")}</ul></div>` : ""}
    
    ${skills.length > 0 ? `<div class="resume-block"><h3>Skills</h3><ul>${skills.map(s => `<li>${s}</li>`).join("")}</ul></div>` : ""}
  `;
}
