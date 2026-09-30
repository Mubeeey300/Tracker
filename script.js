/* =========================================================
   JOBTRACK
   COMPLETE FIXED JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DEFAULT DATA
========================================================= */

const defaultJobs = [
    {
        id: 1,
        name: "Web3 Landing Page",
        client: "VampCatCoin",
        budget: 500,
        paid: 250,
        deadline: "2026-10-05",
        status: "active",
        progress: 70,
        icon: "bi-globe2"
    },
    {
        id: 2,
        name: "Community Dashboard",
        client: "Next Level Funded",
        budget: 750,
        paid: 500,
        deadline: "2026-10-10",
        status: "active",
        progress: 60,
        icon: "bi-bar-chart"
    },
    {
        id: 3,
        name: "Portfolio Website",
        client: "Personal Project",
        budget: 400,
        paid: 400,
        deadline: "2026-09-28",
        status: "completed",
        progress: 100,
        icon: "bi-window"
    }
];


const defaultClients = [
    {
        id: 1,
        name: "VampCatCoin",
        email: "hello@vampcatcoin.com",
        phone: "",
        company: "VampCatCoin",
        notes: "Web3 project client."
    },
    {
        id: 2,
        name: "Next Level Funded",
        email: "contact@nlf.com",
        phone: "",
        company: "Next Level Funded",
        notes: "Funding platform client."
    },
    {
        id: 3,
        name: "Personal Project",
        email: "",
        phone: "",
        company: "Personal",
        notes: "Personal development project."
    }
];


const defaultTeamMembers = [
    {
        id: "tm-1",
        name: "Mubeeey",
        role: "Community Manager",
        email: "mubeeey@example.com",
        status: "active",
        avatar: ""
    },
    {
        id: "tm-2",
        name: "Skyboy",
        role: "Project Manager",
        email: "skyboy@example.com",
        status: "active",
        avatar: ""
    },
    {
        id: "tm-3",
        name: "Ahmed",
        role: "Developer",
        email: "ahmed@example.com",
        status: "busy",
        avatar: ""
    }
];


const defaultTasks = [
    {
        id: "task-1",
        title: "Finish landing page",
        description:
            "Complete the remaining sections and make the page responsive.",
        projectId: "1",
        assigneeId: "tm-3",
        priority: "high",
        status: "in-progress",
        dueDate: "2026-10-02",
        progress: 70
    },
    {
        id: "task-2",
        title: "Review client feedback",
        description:
            "Check the latest feedback and list the changes needed.",
        projectId: "2",
        assigneeId: "tm-1",
        priority: "medium",
        status: "todo",
        dueDate: "2026-10-04",
        progress: 20
    },
    {
        id: "task-3",
        title: "Final project check",
        description:
            "Run the final checks before handing the project over.",
        projectId: "3",
        assigneeId: "tm-2",
        priority: "low",
        status: "completed",
        dueDate: "2026-09-20",
        progress: 100
    }
];


/* =========================================================
   STORAGE
========================================================= */

const JOBS_KEY = "jobTrackJobs";
const CLIENTS_KEY = "jobTrackClients";
const TEAM_KEY = "jobTrackTeamMembers";
const TASKS_KEY = "jobTrackTasks";
const THEME_KEY = "jobTrackTheme";


function loadArray(key, fallback) {

    try {

        const saved = localStorage.getItem(key);

        if (!saved) {
            return fallback.map(item => ({ ...item }));
        }

        const parsed = JSON.parse(saved);

        if (!Array.isArray(parsed)) {
            return fallback.map(item => ({ ...item }));
        }

        return parsed;

    } catch (error) {

        console.warn("Could not load:", key, error);

        return fallback.map(item => ({ ...item }));
    }
}


let jobs = loadArray(JOBS_KEY, defaultJobs);
let clients = loadArray(CLIENTS_KEY, defaultClients);
let teamMembers = loadArray(TEAM_KEY, defaultTeamMembers);
let tasks = loadArray(TASKS_KEY, defaultTasks);


function saveJobs() {
    localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}


function saveClients() {
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}


function saveTeam() {
    localStorage.setItem(TEAM_KEY, JSON.stringify(teamMembers));
}


function saveTasks() {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}


/* =========================================================
   DOM HELPERS
========================================================= */

function $(id) {
    return document.getElementById(id);
}


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function getInitials(name) {

    if (!name) {
        return "?";
    }

    const words = String(name)
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }

    return (
        words[0][0] +
        words[1][0]
    ).toUpperCase();
}


function uid(prefix) {

    return (
        prefix +
        "-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .slice(2, 8)
    );
}


function formatCurrency(amount) {

    const number = Number(amount) || 0;

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    ).format(number);
}


function formatDate(dateString) {

    if (!dateString) {
        return "No deadline";
    }

    const date =
        new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return "Invalid date";
    }

    return date.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );
}


function formatShortDate(dateString) {

    if (!dateString) {
        return "";
    }

    const date =
        new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric"
        }
    );
}


function capitalize(value) {

    if (!value) {
        return "";
    }

    return (
        String(value).charAt(0).toUpperCase() +
        String(value).slice(1)
    );
}


function normalizeStatus(status) {

    return String(status || "")
        .toLowerCase()
        .replace(/_/g, "-")
        .replace(/\s+/g, "-");
}


function safeProjectStatus(status) {

    const value = normalizeStatus(status);

    if (
        value === "active" ||
        value === "pending" ||
        value === "completed" ||
        value === "cancelled"
    ) {
        return value;
    }

    return "pending";
}


function statusLabel(status) {

    const value = normalizeStatus(status);

    const labels = {
        active: "Active",
        pending: "Pending",
        completed: "Completed",
        cancelled: "Cancelled",
        todo: "To Do",
        "in-progress": "In Progress",
        completed: "Completed",
        review: "Review",
        busy: "Busy",
        inactive: "Inactive"
    };

    return labels[value] ||
        capitalize(String(status || ""));
}


function priorityLabel(priority) {

    return capitalize(
        String(priority || "medium")
    );
}


/* =========================================================
   DOM REFERENCES
========================================================= */

const pageTitle = $("pageTitle");
const currentDate = $("currentDate");

const pageSections =
    document.querySelectorAll(".page-section");

const navLinks =
    document.querySelectorAll("[data-section]");


/* PROJECTS */

const jobsGrid = $("jobsGrid");
const emptyJobs = $("emptyJobs");

const jobSearch = $("jobSearch");
const statusFilter =
    $("jobStatusFilter") ||
    $("statusFilter");

const addJobBtn = $("addJobBtn");


/* PROJECT STATS */

const totalJobs = $("totalJobs");
const activeJobs = $("activeJobs");
const completedJobs = $("completedJobs");


/* CLIENTS */

const clientsGrid = $("clientsGrid");
const emptyClients = $("emptyClients");

const clientSearch = $("clientSearch");
const addClientBtn = $("addClientBtn");

const totalClients = $("totalClients");
const activeClients = $("activeClients");
const completedClients = $("completedClients");


/* PAYMENTS */

const paymentList = $("paymentList");

const paymentFilter =
    $("paymentFilter");

const totalProjectValue =
    $("totalProjectValue");

const paymentTotalPaid =
    $("paymentTotalPaid");

const paymentOutstanding =
    $("paymentOutstanding");


/* CALENDAR */

const deadlineList =
    $("deadlineList");


/* DASHBOARD */

const dashboardStats =
    $("dashboardStats");

const recentProjects =
    $("recentProjects");

const upcomingDeadlines =
    $("upcomingDeadlines");


/* TASKS */

const tasksGrid =
    $("tasksGrid");

const emptyTasks =
    $("emptyTasks");

const taskSearch =
    $("taskSearch");

const taskStatusFilter =
    $("taskStatusFilter");

const taskPriorityFilter =
    $("taskPriorityFilter");

const taskProjectFilter =
    $("taskProjectFilter");

const taskAssigneeFilter =
    $("taskAssigneeFilter");

const addTaskBtn =
    $("addTaskBtn");


/* TEAM */

const teamGrid =
    $("teamGrid") ||
    $("teamMembersGrid");

const emptyTeam =
    $("emptyTeam") ||
    $("emptyTeamMembers");

const teamSearch =
    $("teamSearch") ||
    $("teamMemberSearch");

const teamStatusFilter =
    $("teamStatusFilter") ||
    $("teamFilter");

const addTeamBtn =
    $("addTeamBtn") ||
    $("addMemberBtn");


/* THEME */

const themeToggle =
    $("themeToggle");

const topThemeToggle =
    $("topThemeToggle");

const settingsThemeToggle =
    $("settingsThemeToggle");


/* MOBILE */

const mobileMenuBtn =
    $("mobileMenuBtn");

const sidebar =
    $("sidebar");

const sidebarOverlay =
    $("sidebarOverlay");


/* =========================================================
   DATE
========================================================= */

function updateCurrentDate() {

    if (!currentDate) {
        return;
    }

    currentDate.textContent =
        new Date().toLocaleDateString(
            "en-NG",
            {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
}


/* =========================================================
   NAVIGATION
========================================================= */

const sectionTitles = {

    dashboard: "Dashboard",

    projects: "Projects",

    tasks: "Tasks",

    team: "Team Members",

    clients: "Clients",

    payments: "Payments",

    calendar: "Calendar",

    settings: "Settings"

};


function showSection(sectionName) {

    if (!document.getElementById(sectionName)) {
        sectionName = "dashboard";
    }

    pageSections.forEach(section => {

        section.classList.toggle(
            "active",
            section.id === sectionName
        );

    });


    navLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.dataset.section === sectionName
        );

    });


    if (pageTitle) {

        pageTitle.textContent =
            sectionTitles[sectionName] ||
            "Dashboard";

    }


    if (sectionName === "dashboard") {
        renderDashboard();
    }

    if (sectionName === "projects") {
        filterJobs();
    }

    if (sectionName === "tasks") {
        filterTasks();
    }

    if (sectionName === "team") {
        filterTeamMembers();
    }

    if (sectionName === "clients") {
        filterClients();
    }

    if (sectionName === "payments") {
        displayPayments();
    }

    if (sectionName === "calendar") {
        displayDeadlines();
    }


    if (window.innerWidth <= 800) {
        closeMobileSidebar();
    }


    if (
        window.location.hash !==
        `#${sectionName}`
    ) {

        history.replaceState(
            null,
            "",
            `#${sectionName}`
        );

    }
}


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            event.preventDefault();

            showSection(
                link.dataset.section
            );

        }
    );

});


document
    .querySelectorAll("[data-section-link]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showSection(
                    button.dataset.sectionLink
                );

            }
        );

    });


function loadHashSection() {

    const section =
        window.location.hash.replace("#", "");

    if (section) {

        showSection(section);

    } else {

        showSection("dashboard");

    }
}


/* =========================================================
   PROJECTS — ORIGINAL CARD STYLE
========================================================= */

function displayJobs(jobList = jobs) {

    if (!jobsGrid) {
        return;
    }

    jobsGrid.innerHTML = "";


    if (!jobList.length) {

        if (emptyJobs) {
            emptyJobs.classList.remove("hidden");
            emptyJobs.style.display = "";
        }

        return;
    }


    if (emptyJobs) {
        emptyJobs.classList.add("hidden");
        emptyJobs.style.display = "none";
    }


    jobsGrid.innerHTML =
        jobList.map(job => {

            const budget =
                Number(job.budget) || 0;

            const paid =
                Number(job.paid) || 0;

            const remaining =
                Math.max(
                    budget - paid,
                    0
                );

            const progress =
                Math.min(
                    Math.max(
                        Number(job.progress) || 0,
                        0
                    ),
                    100
                );

            const status =
                safeProjectStatus(job.status);

            const icon =
                job.icon ||
                "bi-kanban";


            return `
                <article
                    class="job-card"
                    data-id="${escapeHTML(job.id)}"
                >

                    <div class="job-card-header">

                        <div class="job-card-left">

                            <div class="job-icon">
                                <i class="bi ${escapeHTML(icon)}"></i>
                            </div>

                            <div class="job-card-title">

                                <h3>
                                    ${escapeHTML(job.name)}
                                </h3>

                                <div class="client-name">
                                    ${escapeHTML(
                                        job.client || "No client"
                                    )}
                                </div>

                            </div>

                        </div>


                        <span
                            class="status status-${status}"
                        >
                            ${capitalize(status)}
                        </span>

                    </div>


                    <div class="job-details">

                        <div class="job-detail">

                            <span>Budget</span>

                            <strong>
                                ${formatCurrency(budget)}
                            </strong>

                        </div>


                        <div class="job-detail">

                            <span>Paid</span>

                            <strong>
                                ${formatCurrency(paid)}
                            </strong>

                        </div>

                    </div>


                    <div class="progress-section">

                        <div class="progress-top">

                            <span>Progress</span>

                            <strong>
                                ${progress}%
                            </strong>

                        </div>


                        <div class="progress-bar">

                            <div
                                class="progress-fill"
                                style="width:${progress}%"
                            ></div>

                        </div>

                    </div>


                    <div class="payment-info">

                        <div class="payment-row">

                            <span>Payment</span>

                            <strong
                                class="payment-balance payment-paid"
                            >
                                ${formatCurrency(paid)}
                            </strong>

                        </div>


                        <div class="payment-row">

                            <span>Remaining</span>

                            <strong
                                class="payment-due"
                            >
                                ${formatCurrency(remaining)}
                            </strong>

                        </div>

                    </div>


                    <div class="job-footer">

                        <div class="deadline">

                            <i class="bi bi-calendar3"></i>

                            ${formatDate(job.deadline)}

                        </div>


                        <div class="card-actions">

                            <button
                                type="button"
                                class="card-btn edit-job"
                                data-id="${escapeHTML(job.id)}"
                                title="Edit project"
                            >
                                <i class="bi bi-pencil"></i>
                            </button>


                            <button
                                type="button"
                                class="card-btn delete delete-job"
                                data-id="${escapeHTML(job.id)}"
                                title="Delete project"
                            >
                                <i class="bi bi-trash"></i>
                            </button>

                        </div>

                    </div>

                </article>
            `;

        }).join("");


    jobsGrid
        .querySelectorAll(".edit-job")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {
                    editJob(button.dataset.id);
                }
            );

        });


    jobsGrid
        .querySelectorAll(".delete-job")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {
                    deleteJob(button.dataset.id);
                }
            );

        });
}


/* =========================================================
   PROJECT FILTER
========================================================= */

function filterJobs() {

    if (!jobsGrid) {
        return;
    }

    const search =
        String(
            jobSearch?.value || ""
        )
            .trim()
            .toLowerCase();


    const status =
        normalizeStatus(
            statusFilter?.value || "all"
        );


    const filtered =
        jobs.filter(job => {

            const matchesSearch =
                !search ||
                String(job.name || "")
                    .toLowerCase()
                    .includes(search) ||
                String(job.client || "")
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                status === "all" ||
                !status ||
                normalizeStatus(job.status) === status;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    displayJobs(filtered);
}


/* =========================================================
   PROJECT STATS
========================================================= */

function updateStats() {

    const total =
        jobs.length;

    const active =
        jobs.filter(
            job =>
                normalizeStatus(job.status) === "active"
        ).length;

    const completed =
        jobs.filter(
            job =>
                normalizeStatus(job.status) === "completed"
        ).length;


    if (totalJobs) {
        totalJobs.textContent = total;
    }

    if (activeJobs) {
        activeJobs.textContent = active;
    }

    if (completedJobs) {
        completedJobs.textContent = completed;
    }
}


/* =========================================================
   PROJECT MODAL
========================================================= */

const jobModal =
    $("jobModal");

const jobForm =
    $("jobForm");

const jobModalTitle =
    $("jobModalTitle");

const jobId =
    $("jobId");

const jobName =
    $("jobName");

const jobClient =
    $("jobClient");

const jobBudget =
    $("jobBudget");

const jobPaid =
    $("jobPaid");

const jobDeadline =
    $("jobDeadline");

const jobStatus =
    $("jobStatus");

const jobProgress =
    $("jobProgress");

const progressValue =
    $("progressValue");

const previewPaymentStatus =
    $("previewPaymentStatus");

const previewRemaining =
    $("previewRemaining");


function openJobModal(job = null) {

    if (!jobModal) {
        return;
    }


    if (jobModalTitle) {

        jobModalTitle.textContent =
            job
                ? "Edit Project"
                : "Add Project";

    }


    if (jobId) {
        jobId.value =
            job?.id || "";
    }

    if (jobName) {
        jobName.value =
            job?.name || "";
    }

    if (jobClient) {
        jobClient.value =
            job?.client || "";
    }

    if (jobBudget) {
        jobBudget.value =
            job?.budget ?? "";
    }

    if (jobPaid) {
        jobPaid.value =
            job?.paid ?? "";
    }

    if (jobDeadline) {
        jobDeadline.value =
            job?.deadline || "";
    }

    if (jobStatus) {
        jobStatus.value =
            job?.status || "active";
    }

    if (jobProgress) {
        jobProgress.value =
            job?.progress ?? 0;
    }


    updateJobPreview();


    if (typeof openModal === "function") {
        openModal(jobModal);
    } else {
        jobModal.classList.add("active");
        jobModal.style.display = "flex";
    }
}


function editJob(id) {

    const job =
        jobs.find(
            item =>
                String(item.id) ===
                String(id)
        );

    if (job) {
        openJobModal(job);
    }
}


function deleteJob(id) {

    const job =
        jobs.find(
            item =>
                String(item.id) ===
                String(id)
        );

    if (!job) {
        return;
    }


    if (
        !confirm(
            `Delete "${job.name}"?`
        )
    ) {
        return;
    }


    jobs =
        jobs.filter(
            item =>
                String(item.id) !==
                String(id)
        );


    saveJobs();

    displayJobs(jobs);
    updateStats();

    populateTaskProjectOptions();
    displayTasks();

    renderDashboard();
    displayPayments();
    displayDeadlines();
}


function updateJobPreview() {

    const budget =
        Number(jobBudget?.value) || 0;

    const paid =
        Number(jobPaid?.value) || 0;

    const remaining =
        Math.max(
            budget - paid,
            0
        );


    if (progressValue) {

        progressValue.textContent =
            `${jobProgress?.value || 0}%`;

    }


    if (previewPaymentStatus) {

        previewPaymentStatus.textContent =
            formatCurrency(paid);

    }


    if (previewRemaining) {

        previewRemaining.textContent =
            formatCurrency(remaining);

    }
}


/* =========================================================
   PROJECT FORM
========================================================= */

if (jobForm) {

    jobForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                String(
                    jobName?.value || ""
                ).trim();


            if (!name) {

                jobName?.focus();

                return;
            }


            const id =
                String(
                    jobId?.value || ""
                ).trim();


            const data = {

                name,

                client:
                    String(
                        jobClient?.value || ""
                    ).trim(),

                budget:
                    Number(
                        jobBudget?.value
                    ) || 0,

                paid:
                    Number(
                        jobPaid?.value
                    ) || 0,

                deadline:
                    jobDeadline?.value || "",

                status:
                    safeProjectStatus(
                        jobStatus?.value || "active"
                    ),

                progress:
                    Math.min(
                        Math.max(
                            Number(
                                jobProgress?.value
                            ) || 0,
                            0
                        ),
                        100
                    )

            };


            if (id) {

                const existing =
                    jobs.find(
                        item =>
                            String(item.id) ===
                            id
                    );


                if (existing) {

                    Object.assign(
                        existing,
                        data
                    );

                }

            } else {

                data.id =
                    Date.now();

                data.icon =
                    "bi-kanban";

                jobs.push(data);

            }


            saveJobs();

            displayJobs(jobs);
            updateStats();

            populateTaskProjectOptions();
            displayTasks();

            renderDashboard();
            displayPayments();
            displayDeadlines();


            if (typeof closeModal === "function") {
                closeModal(jobModal);
            } else if (jobModal) {
                jobModal.classList.remove("active");
                jobModal.style.display = "none";
            }

        }
    );

}


/* =========================================================
   PROJECT BUTTONS
========================================================= */

if (addJobBtn) {

    addJobBtn.addEventListener(
        "click",
        () => openJobModal()
    );

}


document
    .getElementById("emptyAddJobBtn")
    ?.addEventListener(
        "click",
        () => openJobModal()
    );


jobSearch?.addEventListener(
    "input",
    filterJobs
);


statusFilter?.addEventListener(
    "change",
    filterJobs
);


jobBudget?.addEventListener(
    "input",
    updateJobPreview
);


jobPaid?.addEventListener(
    "input",
    updateJobPreview
);


jobProgress?.addEventListener(
    "input",
    updateJobPreview
);

/* =========================================================
   CLIENTS
========================================================= */

const clientModal =
    $("clientModal");

const clientForm =
    $("clientForm");

const clientModalTitle =
    $("clientModalTitle");

const clientId =
    $("clientId");

const clientName =
    $("clientName");

const clientEmail =
    $("clientEmail");

const clientPhone =
    $("clientPhone");

const clientCompany =
    $("clientCompany");

const clientNotes =
    $("clientNotes");


/* =========================================================
   CLIENT STATS
========================================================= */

function updateClientStats() {

    const total =
        clients.length;

    const activeClientNames =
        new Set(
            jobs
                .filter(
                    job =>
                        normalizeStatus(job.status) ===
                        "active"
                )
                .map(
                    job =>
                        String(
                            job.client || ""
                        ).toLowerCase()
                )
        );


    const completedClientNames =
        new Set(
            jobs
                .filter(
                    job =>
                        normalizeStatus(job.status) ===
                        "completed"
                )
                .map(
                    job =>
                        String(
                            job.client || ""
                        ).toLowerCase()
                )
        );


    if (totalClients) {
        totalClients.textContent = total;
    }


    if (activeClients) {
        activeClients.textContent =
            activeClientNames.size;
    }


    if (completedClients) {
        completedClients.textContent =
            completedClientNames.size;
    }
}


/* =========================================================
   CLIENT RENDER
========================================================= */

function displayClients(clientList = clients) {

    if (!clientsGrid) {
        return;
    }


    clientsGrid.innerHTML = "";


    if (!clientList.length) {

        if (emptyClients) {
            emptyClients.style.display = "";
        }

        return;
    }


    if (emptyClients) {
        emptyClients.style.display = "none";
    }


    clientsGrid.innerHTML =
        clientList.map(client => {

            const clientJobs =
                jobs.filter(
                    job =>
                        String(
                            job.client || ""
                        ).toLowerCase() ===
                        String(
                            client.name || ""
                        ).toLowerCase()
                );


            const totalValue =
                clientJobs.reduce(
                    (sum, job) =>
                        sum +
                        (Number(job.budget) || 0),
                    0
                );


            const totalPaid =
                clientJobs.reduce(
                    (sum, job) =>
                        sum +
                        (Number(job.paid) || 0),
                    0
                );


            const outstanding =
                Math.max(
                    totalValue - totalPaid,
                    0
                );


            const activeCount =
                clientJobs.filter(
                    job =>
                        normalizeStatus(
                            job.status
                        ) === "active"
                ).length;


            const completedCount =
                clientJobs.filter(
                    job =>
                        normalizeStatus(
                            job.status
                        ) === "completed"
                ).length;


            const initials =
                getInitials(
                    client.name
                );


            /*
               These classes intentionally follow the
               existing JobTrack client styling.
            */

            return `
                <article
                    class="client-card"
                    data-id="${escapeHTML(client.id)}"
                >

                    <div class="client-card-header">

                        <div class="client-info">

                            <div class="client-avatar">
                                ${escapeHTML(initials)}
                            </div>

                            <div class="client-details">

                                <h3>
                                    ${escapeHTML(
                                        client.name
                                    )}
                                </h3>

                                <span>
                                    ${escapeHTML(
                                        client.company ||
                                        "Independent Client"
                                    )}
                                </span>

                            </div>

                        </div>


                        <div class="client-actions">

                            <button
                                type="button"
                                class="card-btn edit-client"
                                data-id="${escapeHTML(client.id)}"
                                title="Edit client"
                            >
                                <i class="bi bi-pencil"></i>
                            </button>

                            <button
                                type="button"
                                class="card-btn delete delete-client"
                                data-id="${escapeHTML(client.id)}"
                                title="Delete client"
                            >
                                <i class="bi bi-trash"></i>
                            </button>

                        </div>

                    </div>


                    <div class="client-contact">

                        ${
                            client.email
                                ? `
                                    <div class="client-contact-row">
                                        <i class="bi bi-envelope"></i>
                                        <span>
                                            ${escapeHTML(
                                                client.email
                                            )}
                                        </span>
                                    </div>
                                `
                                : ""
                        }


                        ${
                            client.phone
                                ? `
                                    <div class="client-contact-row">
                                        <i class="bi bi-telephone"></i>
                                        <span>
                                            ${escapeHTML(
                                                client.phone
                                            )}
                                        </span>
                                    </div>
                                `
                                : ""
                        }

                    </div>


                    <div class="client-stats">

                        <div class="client-stat">

                            <span>Projects</span>

                            <strong>
                                ${clientJobs.length}
                            </strong>

                        </div>


                        <div class="client-stat">

                            <span>Active</span>

                            <strong>
                                ${activeCount}
                            </strong>

                        </div>


                        <div class="client-stat">

                            <span>Completed</span>

                            <strong>
                                ${completedCount}
                            </strong>

                        </div>

                    </div>


                    <div class="client-payment">

                        <div class="client-payment-row">

                            <span>Total Value</span>

                            <strong>
                                ${formatCurrency(
                                    totalValue
                                )}
                            </strong>

                        </div>


                        <div class="client-payment-row">

                            <span>Paid</span>

                            <strong class="payment-paid">
                                ${formatCurrency(
                                    totalPaid
                                )}
                            </strong>

                        </div>


                        <div class="client-payment-row">

                            <span>Outstanding</span>

                            <strong class="payment-due">
                                ${formatCurrency(
                                    outstanding
                                )}
                            </strong>

                        </div>

                    </div>

                </article>
            `;

        }).join("");


    clientsGrid
        .querySelectorAll(".edit-client")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editClient(
                        button.dataset.id
                    );

                }
            );

        });


    clientsGrid
        .querySelectorAll(".delete-client")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteClient(
                        button.dataset.id
                    );

                }
            );

        });


    updateClientStats();
}


/* =========================================================
   CLIENT FILTER
========================================================= */

function filterClients() {

    if (!clientsGrid) {
        return;
    }


    const search =
        String(
            clientSearch?.value || ""
        )
            .trim()
            .toLowerCase();


    const filtered =
        clients.filter(client => {

            if (!search) {
                return true;
            }


            return (

                String(
                    client.name || ""
                )
                    .toLowerCase()
                    .includes(search)

                ||

                String(
                    client.email || ""
                )
                    .toLowerCase()
                    .includes(search)

                ||

                String(
                    client.company || ""
                )
                    .toLowerCase()
                    .includes(search)

                ||

                String(
                    client.phone || ""
                )
                    .toLowerCase()
                    .includes(search)

            );

        });


    displayClients(filtered);
}


/* =========================================================
   CLIENT MODAL
========================================================= */

function openClientModal(client = null) {

    if (!clientModal) {
        return;
    }


    if (clientModalTitle) {

        clientModalTitle.textContent =
            client
                ? "Edit Client"
                : "Add Client";

    }


    if (clientId) {
        clientId.value =
            client?.id || "";
    }


    if (clientName) {
        clientName.value =
            client?.name || "";
    }


    if (clientEmail) {
        clientEmail.value =
            client?.email || "";
    }


    if (clientPhone) {
        clientPhone.value =
            client?.phone || "";
    }


    if (clientCompany) {
        clientCompany.value =
            client?.company || "";
    }


    if (clientNotes) {
        clientNotes.value =
            client?.notes || "";
    }


    if (typeof openModal === "function") {

        openModal(clientModal);

    } else {

        clientModal.classList.add("active");

        clientModal.style.display =
            "flex";

    }
}


function editClient(id) {

    const client =
        clients.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (client) {
        openClientModal(client);
    }
}


function deleteClient(id) {

    const client =
        clients.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!client) {
        return;
    }


    const linkedProjects =
        jobs.filter(
            job =>
                String(
                    job.client || ""
                ).toLowerCase() ===
                String(
                    client.name || ""
                ).toLowerCase()
        );


    let message =
        `Delete "${client.name}"?`;


    if (linkedProjects.length) {

        message =
            `"${client.name}" has ${linkedProjects.length} linked project(s). Delete the client anyway?`;

    }


    if (!confirm(message)) {
        return;
    }


    clients =
        clients.filter(
            item =>
                String(item.id) !==
                String(id)
        );


    saveClients();

    displayClients(clients);

    updateClientStats();

    renderDashboard();
}


/* =========================================================
   CLIENT FORM
========================================================= */

if (clientForm) {

    clientForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                String(
                    clientName?.value || ""
                ).trim();


            if (!name) {

                clientName?.focus();

                return;

            }


            const id =
                String(
                    clientId?.value || ""
                ).trim();


            const data = {

                name,

                email:
                    String(
                        clientEmail?.value || ""
                    ).trim(),

                phone:
                    String(
                        clientPhone?.value || ""
                    ).trim(),

                company:
                    String(
                        clientCompany?.value || ""
                    ).trim(),

                notes:
                    String(
                        clientNotes?.value || ""
                    ).trim()

            };


            if (id) {

                const existing =
                    clients.find(
                        item =>
                            String(item.id) ===
                            id
                    );


                if (existing) {

                    Object.assign(
                        existing,
                        data
                    );

                }

            } else {

                data.id =
                    uid("client");

                clients.push(data);

            }


            saveClients();

            displayClients(clients);

            updateClientStats();

            renderDashboard();


            if (typeof closeModal === "function") {

                closeModal(clientModal);

            } else if (clientModal) {

                clientModal.classList.remove(
                    "active"
                );

                clientModal.style.display =
                    "none";

            }

        }
    );

}


/* =========================================================
   CLIENT BUTTONS
========================================================= */

addClientBtn?.addEventListener(
    "click",
    () => openClientModal()
);


$("emptyAddClientBtn")
    ?.addEventListener(
        "click",
        () => openClientModal()
    );


$("closeClientModal")
    ?.addEventListener(
        "click",
        () => {

            if (typeof closeModal === "function") {
                closeModal(clientModal);
            }

        }
    );


$("cancelClientBtn")
    ?.addEventListener(
        "click",
        () => {

            if (typeof closeModal === "function") {
                closeModal(clientModal);
            }

        }
    );


clientSearch?.addEventListener(
    "input",
    filterClients
);


/* =========================================================
   PAYMENTS
========================================================= */

function getPaymentData() {

    const totalValue =
        jobs.reduce(
            (sum, job) =>
                sum +
                (Number(job.budget) || 0),
            0
        );


    const totalPaid =
        jobs.reduce(
            (sum, job) =>
                sum +
                (Number(job.paid) || 0),
            0
        );


    const outstanding =
        Math.max(
            totalValue - totalPaid,
            0
        );


    return {
        totalValue,
        totalPaid,
        outstanding
    };
}


/* =========================================================
   PAYMENT STATS
========================================================= */

function updatePaymentStats() {

    const data =
        getPaymentData();


    if (totalProjectValue) {

        totalProjectValue.textContent =
            formatCurrency(
                data.totalValue
            );

    }


    if (paymentTotalPaid) {

        paymentTotalPaid.textContent =
            formatCurrency(
                data.totalPaid
            );

    }


    if (paymentOutstanding) {

        paymentOutstanding.textContent =
            formatCurrency(
                data.outstanding
            );

    }
}


/* =========================================================
   PAYMENT RENDER
========================================================= */

function displayPayments() {

    updatePaymentStats();


    if (!paymentList) {
        return;
    }


    const filter =
        normalizeStatus(
            paymentFilter?.value || "all"
        );


    let paymentJobs =
        [...jobs];


    if (filter === "paid") {

        paymentJobs =
            paymentJobs.filter(
                job =>
                    Number(job.paid) >=
                    Number(job.budget)
            );

    }


    if (
        filter === "pending" ||
        filter === "outstanding"
    ) {

        paymentJobs =
            paymentJobs.filter(
                job =>
                    Number(job.paid) <
                    Number(job.budget)
            );

    }


    if (!paymentJobs.length) {

        paymentList.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-wallet2"></i>
                <p>No payment records found.</p>
            </div>
        `;

        return;
    }


    paymentList.innerHTML =
        paymentJobs.map(job => {

            const budget =
                Number(job.budget) || 0;

            const paid =
                Number(job.paid) || 0;

            const remaining =
                Math.max(
                    budget - paid,
                    0
                );


            const percentage =
                budget > 0
                    ? Math.min(
                        Math.round(
                            (paid / budget) * 100
                        ),
                        100
                    )
                    : 0;


            return `
                <div
                    class="payment-item"
                    data-id="${escapeHTML(job.id)}"
                >

                    <div class="payment-item-main">

                        <div class="payment-item-icon">

                            <i class="bi bi-wallet2"></i>

                        </div>


                        <div class="payment-item-info">

                            <strong>
                                ${escapeHTML(
                                    job.name
                                )}
                            </strong>

                            <span>
                                ${escapeHTML(
                                    job.client ||
                                    "No client"
                                )}
                            </span>

                        </div>

                    </div>


                    <div class="payment-item-progress">

                        <div class="payment-progress-top">

                            <span>
                                ${percentage}% paid
                            </span>

                            <strong>
                                ${formatCurrency(
                                    paid
                                )}
                                /
                                ${formatCurrency(
                                    budget
                                )}
                            </strong>

                        </div>


                        <div class="progress-bar">

                            <div
                                class="progress-fill"
                                style="width:${percentage}%"
                            ></div>

                        </div>

                    </div>


                    <div class="payment-item-amount">

                        <span>Outstanding</span>

                        <strong
                            class="${
                                remaining > 0
                                    ? "payment-due"
                                    : "payment-paid"
                            }"
                        >
                            ${formatCurrency(
                                remaining
                            )}
                        </strong>

                    </div>

                </div>
            `;

        }).join("");
}


paymentFilter?.addEventListener(
    "change",
    displayPayments
);


/* =========================================================
   CALENDAR / DEADLINES
========================================================= */

function getDaysUntil(dateString) {

    if (!dateString) {
        return null;
    }


    const today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    const deadline =
        new Date(
            `${dateString}T00:00:00`
        );


    if (
        Number.isNaN(
            deadline.getTime()
        )
    ) {
        return null;
    }


    return Math.ceil(
        (
            deadline.getTime() -
            today.getTime()
        ) /
        86400000
    );
}


function displayDeadlines() {

    if (!deadlineList) {
        return;
    }


    const projects =
        jobs
            .filter(
                job => job.deadline
            )
            .sort(
                (a, b) =>
                    new Date(
                        `${a.deadline}T00:00:00`
                    ) -
                    new Date(
                        `${b.deadline}T00:00:00`
                    )
            );


    if (!projects.length) {

        deadlineList.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-calendar3"></i>
                <p>No upcoming deadlines.</p>
            </div>
        `;

        return;
    }


    deadlineList.innerHTML =
        projects.map(job => {

            const date =
                new Date(
                    `${job.deadline}T00:00:00`
                );


            const days =
                getDaysUntil(
                    job.deadline
                );


            let warning = "";


            if (days !== null) {

                if (days < 0) {

                    warning =
                        "Overdue";

                } else if (days === 0) {

                    warning =
                        "Due today";

                } else if (days === 1) {

                    warning =
                        "Due tomorrow";

                } else if (days <= 7) {

                    warning =
                        `${days} days left`;

                }

            }


            return `
                <div
                    class="deadline-item"
                    data-id="${escapeHTML(job.id)}"
                >

                    <div class="deadline-date">

                        <span class="month">
                            ${date
                                .toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "short"
                                    }
                                )
                                .toUpperCase()}
                        </span>

                        <span class="day">
                            ${date.getDate()}
                        </span>

                    </div>


                    <div class="deadline-info">

                        <strong>
                            ${escapeHTML(
                                job.name
                            )}
                        </strong>

                        <span>
                            ${escapeHTML(
                                job.client ||
                                "No client"
                            )}
                        </span>

                    </div>


                    ${
                        warning
                            ? `
                                <div
                                    class="deadline-warning"
                                >
                                    ${escapeHTML(
                                        warning
                                    )}
                                </div>
                            `
                            : ""
                    }

                </div>
            `;

        }).join("");
}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    updateStats();

    updateClientStats();

    updatePaymentStats();


    /*
       Recent projects
    */

    if (recentProjects) {

        const recent =
            [...jobs]
                .sort(
                    (a, b) =>
                        Number(b.id) -
                        Number(a.id)
                )
                .slice(0, 5);


        if (!recent.length) {

            recentProjects.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-folder2-open"></i>
                    <p>No projects yet.</p>
                </div>
            `;

        } else {

            recentProjects.innerHTML =
                recent.map(job => {

                    const status =
                        safeProjectStatus(
                            job.status
                        );


                    return `
                        <div class="recent-project-item">

                            <div class="recent-project-icon">
                                <i class="bi ${
                                    escapeHTML(
                                        job.icon ||
                                        "bi-kanban"
                                    )
                                }"></i>
                            </div>

                            <div class="recent-project-info">

                                <strong>
                                    ${escapeHTML(
                                        job.name
                                    )}
                                </strong>

                                <span>
                                    ${escapeHTML(
                                        job.client ||
                                        "No client"
                                    )}
                                </span>

                            </div>

                            <span
                                class="status status-${status}"
                            >
                                ${capitalize(status)}
                            </span>

                        </div>
                    `;

                }).join("");

        }
    }


    /*
       Upcoming deadlines
    */

    if (upcomingDeadlines) {

        const upcoming =
            [...jobs]
                .filter(
                    job =>
                        job.deadline
                )
                .sort(
                    (a, b) =>
                        new Date(
                            `${a.deadline}T00:00:00`
                        ) -
                        new Date(
                            `${b.deadline}T00:00:00`
                        )
                )
                .slice(0, 5);


        if (!upcoming.length) {

            upcomingDeadlines.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-calendar3"></i>
                    <p>No upcoming deadlines.</p>
                </div>
            `;

        } else {

            upcomingDeadlines.innerHTML =
                upcoming.map(job => {

                    const days =
                        getDaysUntil(
                            job.deadline
                        );


                    let label =
                        formatShortDate(
                            job.deadline
                        );


                    if (days === 0) {
                        label = "Today";
                    }

                    if (days === 1) {
                        label = "Tomorrow";
                    }

                    if (days < 0) {
                        label = "Overdue";
                    }


                    return `
                        <div class="upcoming-deadline-item">

                            <div class="upcoming-deadline-icon">
                                <i class="bi bi-calendar-event"></i>
                            </div>

                            <div class="upcoming-deadline-info">

                                <strong>
                                    ${escapeHTML(
                                        job.name
                                    )}
                                </strong>

                                <span>
                                    ${escapeHTML(
                                        job.client ||
                                        "No client"
                                    )}
                                </span>

                            </div>

                            <span
                                class="${
                                    days !== null &&
                                    days < 0
                                        ? "deadline-warning"
                                        : ""
                                }"
                            >
                                ${escapeHTML(label)}
                            </span>

                        </div>
                    `;

                }).join("");

        }
    }
}

/* =========================================================
   TASKS + TEAM
========================================================= */


/* =========================================================
   TASK DOM ELEMENTS
========================================================= */

const tasksGrid =
    document.getElementById("tasksGrid") ||
    document.getElementById("taskGrid") ||
    document.getElementById("tasksBoard");

const emptyTasks =
    document.getElementById("emptyTasks") ||
    document.getElementById("emptyTask");

const taskSearch =
    document.getElementById("taskSearch") ||
    document.getElementById("tasksSearch");

const taskStatusFilter =
    document.getElementById("taskStatusFilter") ||
    document.getElementById("taskFilter");

const taskPriorityFilter =
    document.getElementById("taskPriorityFilter") ||
    document.getElementById("priorityFilter");

const taskProjectFilter =
    document.getElementById("taskProjectFilter") ||
    document.getElementById("projectTaskFilter");

const taskAssigneeFilter =
    document.getElementById("taskAssigneeFilter") ||
    document.getElementById("assigneeFilter") ||
    document.getElementById("taskMemberFilter");


/* =========================================================
   TASK STATISTICS
========================================================= */

const totalTasks =
    document.getElementById("totalTasks") ||
    document.getElementById("tasksTotal");

const completedTasks =
    document.getElementById("completedTasks") ||
    document.getElementById("tasksCompleted");

const pendingTasks =
    document.getElementById("pendingTasks") ||
    document.getElementById("tasksPending");

const overdueTasks =
    document.getElementById("overdueTasks") ||
    document.getElementById("tasksOverdue");


/* =========================================================
   TASK BUTTON + MODAL
========================================================= */

const addTaskBtn =
    document.getElementById("addTaskBtn") ||
    document.getElementById("newTaskBtn") ||
    document.getElementById("emptyAddTaskBtn");

const taskModal =
    document.getElementById("taskModal");

const taskModalTitle =
    document.getElementById("taskModalTitle");

const taskForm =
    document.getElementById("taskForm");

const taskIdInput =
    document.getElementById("taskId");

const taskTitleInput =
    document.getElementById("taskTitle");

const taskDescriptionInput =
    document.getElementById("taskDescription");

const taskProjectInput =
    document.getElementById("taskProject");

const taskAssigneeInput =
    document.getElementById("taskAssignee");

const taskPriorityInput =
    document.getElementById("taskPriority");

const taskStatusInput =
    document.getElementById("taskStatus");

const taskDueDateInput =
    document.getElementById("taskDueDate");


/* =========================================================
   TEAM DOM ELEMENTS
========================================================= */

const teamGrid =
    document.getElementById("teamGrid");

const emptyTeam =
    document.getElementById("emptyTeam");

const teamSearch =
    document.getElementById("teamSearch");

const totalTeam =
    document.getElementById("totalTeam");

const activeTeam =
    document.getElementById("activeTeam");

const inactiveTeam =
    document.getElementById("inactiveTeam");

const addTeamBtn =
    document.getElementById("addTeamBtn");


/* =========================================================
   TEAM MODAL
========================================================= */

const teamModal =
    document.getElementById("teamModal");

const teamModalTitle =
    document.getElementById("teamModalTitle");

const teamForm =
    document.getElementById("teamForm");

const teamIdInput =
    document.getElementById("teamId");

const teamNameInput =
    document.getElementById("teamName");

const teamRoleInput =
    document.getElementById("teamRole");

const teamEmailInput =
    document.getElementById("teamEmail");

const teamStatusInput =
    document.getElementById("teamStatus");


/* =========================================================
   HELPERS
========================================================= */

function safeText(value) {

    if (typeof escapeHTML === "function") {
        return escapeHTML(String(value ?? ""));
    }

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function createId(prefix) {

    return `${prefix}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;

}


function getProjectById(id) {

    if (!Array.isArray(jobs)) {
        return null;
    }

    return jobs.find(
        job => String(job.id) === String(id)
    ) || null;

}


function getTeamMemberById(id) {

    if (!Array.isArray(teamMembers)) {
        return null;
    }

    return teamMembers.find(
        member => String(member.id) === String(id)
    ) || null;

}


function getTaskProjectName(task) {

    const project =
        getProjectById(task.projectId);

    if (!project) {
        return "No project";
    }

    return (
        project.name ||
        project.title ||
        "Untitled Project"
    );

}


function getAssigneeName(task) {

    const member =
        getTeamMemberById(task.assigneeId);

    return member
        ? member.name
        : "Unassigned";

}


/* =========================================================
   TASK STATUS
========================================================= */

function normalizeTaskStatus(status) {

    const value =
        String(status || "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "_")
            .replace(/-/g, "_");

    if (
        value === "todo" ||
        value === "to_do" ||
        value === "pending"
    ) {
        return "pending";
    }

    if (
        value === "inprogress" ||
        value === "in_progress"
    ) {
        return "in_progress";
    }

    if (value === "completed") {
        return "completed";
    }

    return "pending";

}


function getTaskStatusLabel(status) {

    const normalized =
        normalizeTaskStatus(status);

    if (normalized === "pending") {
        return "Pending";
    }

    if (normalized === "in_progress") {
        return "In Progress";
    }

    if (normalized === "completed") {
        return "Completed";
    }

    return "Pending";

}


function getTaskProgress(status) {

    const normalized =
        normalizeTaskStatus(status);

    if (normalized === "completed") {
        return 100;
    }

    if (normalized === "in_progress") {
        return 50;
    }

    return 10;

}


/* =========================================================
   TASK PRIORITY
========================================================= */

function getPriorityClass(priority) {

    const value =
        String(priority || "medium")
            .toLowerCase();

    if (
        value === "low" ||
        value === "medium" ||
        value === "high" ||
        value === "urgent"
    ) {
        return value;
    }

    return "medium";

}


function getPriorityLabel(priority) {

    const value =
        getPriorityClass(priority);

    return (
        value.charAt(0).toUpperCase() +
        value.slice(1)
    );

}


/* =========================================================
   TASK DATE
========================================================= */

function isTaskOverdue(task) {

    if (
        !task.dueDate ||
        normalizeTaskStatus(task.status) === "completed"
    ) {
        return false;
    }

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    const due =
        new Date(
            `${task.dueDate}T00:00:00`
        );

    if (Number.isNaN(due.getTime())) {
        return false;
    }

    return due < today;

}


function formatTaskDate(date) {

    if (!date) {
        return "No due date";
    }

    if (
        typeof formatDate === "function"
    ) {
        return formatDate(date);
    }

    const parsed =
        new Date(
            `${date}T00:00:00`
        );

    if (Number.isNaN(parsed.getTime())) {
        return date;
    }

    return parsed.toLocaleDateString(
        "en-NG",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================================
   TASK CARD
========================================================= */

function createTaskCard(task) {

    const projectName =
        getTaskProjectName(task);

    const assignee =
        getAssigneeName(task);

    const priorityClass =
        getPriorityClass(task.priority);

    const overdue =
        isTaskOverdue(task);

    const progress =
        getTaskProgress(task.status);

    const initials =
        typeof getInitials === "function"
            ? getInitials(assignee)
            : assignee
                .split(/\s+/)
                .map(word => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

    return `

        <article
            class="task-card"
            data-id="${safeText(task.id)}"
        >

            <div class="task-card-header">

                <h4>
                    ${safeText(
                        task.title ||
                        "Untitled Task"
                    )}
                </h4>

                <div class="task-actions">

                    <button
                        type="button"
                        class="task-action-btn edit-task"
                        data-id="${safeText(task.id)}"
                        title="Edit task"
                    >
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button
                        type="button"
                        class="task-action-btn delete delete-task"
                        data-id="${safeText(task.id)}"
                        title="Delete task"
                    >
                        <i class="bi bi-trash"></i>
                    </button>

                </div>

            </div>


            <p class="task-description">

                ${safeText(
                    task.description ||
                    "No description added."
                )}

            </p>


            <div class="task-meta">

                <span class="task-project">

                    <i class="bi bi-folder"></i>

                    ${safeText(projectName)}

                </span>


                <span
                    class="task-priority ${priorityClass}"
                >

                    ${safeText(
                        getPriorityLabel(
                            task.priority
                        )
                    )}

                </span>

            </div>


            <div class="task-footer">

                <div class="task-assignee">

                    <div class="task-assignee-avatar">

                        ${
                            assignee !== "Unassigned"
                                ? safeText(initials)
                                : `<i class="bi bi-person"></i>`
                        }

                    </div>

                    <span>
                        ${safeText(assignee)}
                    </span>

                </div>


                ${
                    task.dueDate
                        ? `

                            <div
                                class="task-due-date ${
                                    overdue
                                        ? "overdue"
                                        : ""
                                }"
                            >

                                <i class="bi bi-calendar3"></i>

                                ${safeText(
                                    formatTaskDate(
                                        task.dueDate
                                    )
                                )}

                            </div>

                          `
                        : ""
                }

            </div>


            <div class="task-progress">

                <div class="task-progress-top">

                    <span>
                        Status
                    </span>

                    <strong>
                        ${safeText(
                            getTaskStatusLabel(
                                task.status
                            )
                        )}
                    </strong>

                </div>


                <div class="task-progress-bar">

                    <div
                        class="task-progress-fill"
                        style="width:${progress}%"
                    ></div>

                </div>

            </div>

        </article>

    `;

}


/* =========================================================
   TASK COLUMN
========================================================= */

function createTaskColumn(
    title,
    columnTasks
) {

    const column =
        document.createElement("div");

    column.className =
        "task-column";

    column.innerHTML = `

        <div class="task-column-header">

            <div class="task-column-title">

                <h3>
                    ${safeText(title)}
                </h3>

                <span class="task-count">
                    ${columnTasks.length}
                </span>

            </div>

        </div>


        <div class="task-list">

            ${
                columnTasks.length

                    ? columnTasks
                        .map(createTaskCard)
                        .join("")

                    : `

                        <div class="task-empty">

                            <i class="bi bi-inbox"></i>

                            <span>
                                No tasks here
                            </span>

                        </div>

                      `
            }

        </div>

    `;

    return column;

}


/* =========================================================
   DISPLAY TASKS
========================================================= */

function displayTasks(list = tasks) {

    if (!tasksGrid) {
        return;
    }

    if (!Array.isArray(list)) {
        list = [];
    }

    if (!list.length) {

        tasksGrid.innerHTML = "";

        if (emptyTasks) {
            emptyTasks.style.display = "";
        }

        updateTaskStats();

        return;
    }

    if (emptyTasks) {
        emptyTasks.style.display = "none";
    }

    tasksGrid.innerHTML = "";


    const pending =
        list.filter(
            task =>
                normalizeTaskStatus(
                    task.status
                ) === "pending"
        );


    const progress =
        list.filter(
            task =>
                normalizeTaskStatus(
                    task.status
                ) === "in_progress"
        );


    const completed =
        list.filter(
            task =>
                normalizeTaskStatus(
                    task.status
                ) === "completed"
        );


    tasksGrid.appendChild(
        createTaskColumn(
            "Pending",
            pending
        )
    );


    tasksGrid.appendChild(
        createTaskColumn(
            "In Progress",
            progress
        )
    );


    tasksGrid.appendChild(
        createTaskColumn(
            "Completed",
            completed
        )
    );


    tasksGrid
        .querySelectorAll(".edit-task")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editTask(
                        button.dataset.id
                    );

                }
            );

        });


    tasksGrid
        .querySelectorAll(".delete-task")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteTask(
                        button.dataset.id
                    );

                }
            );

        });


    updateTaskStats();

}


/* =========================================================
   TASK STATISTICS
========================================================= */

function updateTaskStats() {

    const completed =
        tasks.filter(
            task =>
                normalizeTaskStatus(
                    task.status
                ) === "completed"
        ).length;


    const pending =
        tasks.filter(
            task =>
                normalizeTaskStatus(
                    task.status
                ) !== "completed"
        ).length;


    const overdue =
        tasks.filter(
            isTaskOverdue
        ).length;


    if (totalTasks) {
        totalTasks.textContent =
            tasks.length;
    }

    if (completedTasks) {
        completedTasks.textContent =
            completed;
    }

    if (pendingTasks) {
        pendingTasks.textContent =
            pending;
    }

    if (overdueTasks) {
        overdueTasks.textContent =
            overdue;
    }

}


/* =========================================================
   TASK FILTER
========================================================= */

function filterTasks() {

    const search =
        (
            taskSearch?.value ||
            ""
        )
            .toLowerCase()
            .trim();


    const status =
        taskStatusFilter?.value ||
        "all";


    const priority =
        taskPriorityFilter?.value ||
        "all";


    const project =
        taskProjectFilter?.value ||
        "all";


    const assignee =
        taskAssigneeFilter?.value ||
        "all";


    const filtered =
        tasks.filter(task => {

            const title =
                String(
                    task.title || ""
                ).toLowerCase();


            const description =
                String(
                    task.description || ""
                ).toLowerCase();


            const projectName =
                getTaskProjectName(
                    task
                ).toLowerCase();


            const memberName =
                getAssigneeName(
                    task
                ).toLowerCase();


            const matchesSearch =
                !search ||
                title.includes(search) ||
                description.includes(search) ||
                projectName.includes(search) ||
                memberName.includes(search);


            const normalizedStatus =
                normalizeTaskStatus(
                    task.status
                );


            let matchesStatus =
                true;


            if (status !== "all") {

                const normalizedFilter =
                    normalizeTaskStatus(
                        status
                    );

                matchesStatus =
                    normalizedStatus ===
                    normalizedFilter;

            }


            const matchesPriority =
                priority === "all" ||
                String(
                    task.priority || ""
                ).toLowerCase() ===
                String(priority)
                    .toLowerCase();


            const matchesProject =
                project === "all" ||
                String(
                    task.projectId || ""
                ) ===
                String(project);


            const matchesAssignee =
                assignee === "all" ||
                String(
                    task.assigneeId || ""
                ) ===
                String(assignee);


            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority &&
                matchesProject &&
                matchesAssignee
            );

        });


    displayTasks(filtered);

}


/* =========================================================
   TASK SELECT OPTIONS
========================================================= */

function populateTaskSelects() {

    if (
        taskProjectInput &&
        Array.isArray(jobs)
    ) {

        const current =
            taskProjectInput.value;

        taskProjectInput.innerHTML = `

            <option value="">
                Select project
            </option>

        `;

        jobs.forEach(job => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                job.id;

            option.textContent =
                job.name ||
                job.title ||
                "Untitled Project";

            taskProjectInput.appendChild(
                option
            );

        });

        if (current) {
            taskProjectInput.value =
                current;
        }

    }


    if (
        taskProjectFilter &&
        Array.isArray(jobs)
    ) {

        const current =
            taskProjectFilter.value;

        taskProjectFilter.innerHTML = `

            <option value="all">
                All Projects
            </option>

        `;

        jobs.forEach(job => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                job.id;

            option.textContent =
                job.name ||
                job.title ||
                "Untitled Project";

            taskProjectFilter.appendChild(
                option
            );

        });

        if (current) {
            taskProjectFilter.value =
                current;
        }

    }


    if (
        taskAssigneeInput &&
        Array.isArray(teamMembers)
    ) {

        const current =
            taskAssigneeInput.value;

        taskAssigneeInput.innerHTML = `

            <option value="">
                Unassigned
            </option>

        `;

        teamMembers.forEach(member => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                member.id;

            option.textContent =
                member.name;

            taskAssigneeInput.appendChild(
                option
            );

        });

        if (current) {
            taskAssigneeInput.value =
                current;
        }

    }


    if (
        taskAssigneeFilter &&
        Array.isArray(teamMembers)
    ) {

        const current =
            taskAssigneeFilter.value;

        taskAssigneeFilter.innerHTML = `

            <option value="all">
                All Team Members
            </option>

        `;

        teamMembers.forEach(member => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                member.id;

            option.textContent =
                member.name;

            taskAssigneeFilter.appendChild(
                option
            );

        });

        if (current) {
            taskAssigneeFilter.value =
                current;
        }

    }

}


/* =========================================================
   OPEN TASK MODAL
========================================================= */

function openTaskModal(task = null) {

    if (!taskModal) {
        return;
    }

    populateTaskSelects();


    if (taskModalTitle) {

        taskModalTitle.textContent =
            task
                ? "Edit Task"
                : "Add Task";

    }


    if (taskIdInput) {
        taskIdInput.value =
            task
                ? task.id
                : "";
    }


    if (taskTitleInput) {
        taskTitleInput.value =
            task?.title || "";
    }


    if (taskDescriptionInput) {
        taskDescriptionInput.value =
            task?.description || "";
    }


    if (taskProjectInput) {
        taskProjectInput.value =
            task?.projectId || "";
    }


    if (taskAssigneeInput) {
        taskAssigneeInput.value =
            task?.assigneeId || "";
    }


    if (taskPriorityInput) {
        taskPriorityInput.value =
            task?.priority || "medium";
    }


    if (taskStatusInput) {

        const status =
            normalizeTaskStatus(
                task?.status || "pending"
            );

        taskStatusInput.value =
            status;

    }


    if (taskDueDateInput) {
        taskDueDateInput.value =
            task?.dueDate || "";
    }


    taskModal.classList.add("active");

}


/* =========================================================
   EDIT TASK
========================================================= */

function editTask(id) {

    const task =
        tasks.find(
            item =>
                String(item.id) ===
                String(id)
        );

    if (!task) {
        return;
    }

    openTaskModal(task);

}


/* =========================================================
   DELETE TASK
========================================================= */

function deleteTask(id) {

    const task =
        tasks.find(
            item =>
                String(item.id) ===
                String(id)
        );

    if (!task) {
        return;
    }


    const confirmed =
        confirm(
            `Delete "${task.title}"?`
        );

    if (!confirmed) {
        return;
    }


    const index =
        tasks.findIndex(
            item =>
                String(item.id) ===
                String(id)
        );


    if (index !== -1) {

        tasks.splice(
            index,
            1
        );

    }


    localStorage.setItem(
        "jobTrackTasks",
        JSON.stringify(tasks)
    );


    displayTasks();
    updateTaskStats();


    if (
        typeof renderDashboard ===
        "function"
    ) {
        renderDashboard();
    }

}


/* =========================================================
   SAVE TASK
========================================================= */

if (taskForm) {

    taskForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const id =
                taskIdInput?.value;


            const taskData = {

                title:
                    taskTitleInput?.value
                        .trim() ||
                    "Untitled Task",

                description:
                    taskDescriptionInput?.value
                        .trim() ||
                    "",

                projectId:
                    taskProjectInput?.value ||
                    "",

                assigneeId:
                    taskAssigneeInput?.value ||
                    "",

                priority:
                    taskPriorityInput?.value ||
                    "medium",

                status:
                    normalizeTaskStatus(
                        taskStatusInput?.value ||
                        "pending"
                    ),

                dueDate:
                    taskDueDateInput?.value ||
                    ""

            };


            if (id) {

                const index =
                    tasks.findIndex(
                        task =>
                            String(task.id) ===
                            String(id)
                    );


                if (index !== -1) {

                    tasks[index] = {

                        ...tasks[index],

                        ...taskData

                    };

                }

            } else {

                tasks.push({

                    id:
                        createId("task"),

                    ...taskData

                });

            }


            localStorage.setItem(
                "jobTrackTasks",
                JSON.stringify(tasks)
            );


            if (typeof closeModal === "function") {

                closeModal(taskModal);

            } else {

                taskModal?.classList.remove(
                    "active"
                );

            }


            displayTasks();
            updateTaskStats();


            if (
                typeof renderDashboard ===
                "function"
            ) {
                renderDashboard();
            }

        }
    );

}


/* =========================================================
   ADD TASK BUTTON
========================================================= */

if (addTaskBtn) {

    addTaskBtn.addEventListener(
        "click",
        () => openTaskModal()
    );

}


/* =========================================================
   TASK FILTER EVENTS
========================================================= */

if (taskSearch) {

    taskSearch.addEventListener(
        "input",
        filterTasks
    );

}


if (taskStatusFilter) {

    taskStatusFilter.addEventListener(
        "change",
        filterTasks
    );

}


if (taskPriorityFilter) {

    taskPriorityFilter.addEventListener(
        "change",
        filterTasks
    );

}


if (taskProjectFilter) {

    taskProjectFilter.addEventListener(
        "change",
        filterTasks
    );

}


if (taskAssigneeFilter) {

    taskAssigneeFilter.addEventListener(
        "change",
        filterTasks
    );

}


/* =========================================================
   TEAM — DISPLAY
========================================================= */

function displayTeamMembers(
    list = teamMembers
) {

    if (!teamGrid) {
        return;
    }

    if (!Array.isArray(list)) {
        list = [];
    }


    if (!list.length) {

        teamGrid.innerHTML = "";

        if (emptyTeam) {
            emptyTeam.style.display = "";
        }

        updateTeamStats();

        return;
    }


    if (emptyTeam) {
        emptyTeam.style.display =
            "none";
    }


    teamGrid.innerHTML =
        list.map(member => {

            const initials =
                typeof getInitials ===
                "function"

                    ? getInitials(
                        member.name
                    )

                    : String(
                        member.name ||
                        ""
                    )
                        .split(/\s+/)
                        .map(
                            part =>
                                part[0]
                        )
                        .join("")
                        .slice(0, 2)
                        .toUpperCase();


            const status =
                String(
                    member.status ||
                    "active"
                ).toLowerCase();


            const statusText =
                status === "inactive"
                    ? "Inactive"
                    : status === "busy"
                        ? "Busy"
                        : "Active";


            return `

                <article
                    class="team-card"
                    data-id="${safeText(
                        member.id
                    )}"
                >

                    <div class="team-card-header">

                        <div class="team-member-info">

                            <div class="team-avatar">

                                ${safeText(
                                    initials
                                )}

                            </div>


                            <div>

                                <h3>
                                    ${safeText(
                                        member.name ||
                                        "Unnamed"
                                    )}
                                </h3>

                                <span>
                                    ${safeText(
                                        member.email ||
                                        "No email"
                                    )}
                                </span>

                            </div>

                        </div>


                        <span class="team-role">

                            ${safeText(
                                member.role ||
                                "Team Member"
                            )}

                        </span>

                    </div>


                    <div class="team-card-body">

                        <div class="team-card-row">

                            <span>
                                Status
                            </span>

                            <strong
                                class="team-status ${
                                    status ===
                                    "inactive"
                                        ? "inactive"
                                        : ""
                                }"
                            >

                                ${statusText}

                            </strong>

                        </div>


                        <div class="team-card-row">

                            <span>
                                Tasks
                            </span>

                            <strong>

                                ${
                                    tasks.filter(
                                        task =>
                                            String(
                                                task.assigneeId
                                            ) ===
                                            String(
                                                member.id
                                            )
                                    ).length
                                }

                            </strong>

                        </div>

                    </div>


                    <div class="team-card-footer">

                        <span class="team-card-email">

                            ${safeText(
                                member.email ||
                                "No email"
                            )}

                        </span>


                        <div class="team-card-actions">

                            <button
                                type="button"
                                class="card-btn team-edit-btn"
                                data-id="${safeText(
                                    member.id
                                )}"
                                title="Edit member"
                            >

                                <i class="bi bi-pencil"></i>

                            </button>


                            <button
                                type="button"
                                class="card-btn delete team-delete-btn"
                                data-id="${safeText(
                                    member.id
                                )}"
                                title="Delete member"
                            >

                                <i class="bi bi-trash"></i>

                            </button>

                        </div>

                    </div>

                </article>

            `;

        }).join("");


    teamGrid
        .querySelectorAll(
            ".team-edit-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editTeamMember(
                        button.dataset.id
                    );

                }
            );

        });


    teamGrid
        .querySelectorAll(
            ".team-delete-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteTeamMember(
                        button.dataset.id
                    );

                }
            );

        });


    updateTeamStats();

}


/* =========================================================
   TEAM STATISTICS
========================================================= */

function updateTeamStats() {

    const total =
        teamMembers.length;


    const active =
        teamMembers.filter(
            member =>
                String(
                    member.status ||
                    "active"
                ).toLowerCase() ===
                "active"
        ).length;


    const inactive =
        teamMembers.filter(
            member =>
                String(
                    member.status ||
                    ""
                ).toLowerCase() ===
                "inactive"
        ).length;


    if (totalTeam) {
        totalTeam.textContent =
            total;
    }

    if (activeTeam) {
        activeTeam.textContent =
            active;
    }

    if (inactiveTeam) {
        inactiveTeam.textContent =
            inactive;
    }

}


/* =========================================================
   TEAM FILTER
========================================================= */

function filterTeamMembers() {

    if (!teamSearch) {

        displayTeamMembers();

        return;

    }


    const query =
        teamSearch.value
            .toLowerCase()
            .trim();


    if (!query) {

        displayTeamMembers();

        return;

    }


    const filtered =
        teamMembers.filter(
            member => {

                return (

                    String(
                        member.name ||
                        ""
                    )
                        .toLowerCase()
                        .includes(query)

                    ||

                    String(
                        member.role ||
                        ""
                    )
                        .toLowerCase()
                        .includes(query)

                    ||

                    String(
                        member.email ||
                        ""
                    )
                        .toLowerCase()
                        .includes(query)

                );

            }
        );


    displayTeamMembers(
        filtered
    );

}


if (teamSearch) {

    teamSearch.addEventListener(
        "input",
        filterTeamMembers
    );

}


/* =========================================================
   OPEN TEAM MODAL
========================================================= */

function openTeamModal(member = null) {

    if (!teamModal) {
        return;
    }


    if (teamModalTitle) {

        teamModalTitle.textContent =
            member
                ? "Edit Team Member"
                : "Add Team Member";

    }


    if (teamIdInput) {
        teamIdInput.value =
            member
                ? member.id
                : "";
    }


    if (teamNameInput) {
        teamNameInput.value =
            member?.name || "";
    }


    if (teamRoleInput) {
        teamRoleInput.value =
            member?.role || "";
    }


    if (teamEmailInput) {
        teamEmailInput.value =
            member?.email || "";
    }


    if (teamStatusInput) {
        teamStatusInput.value =
            member?.status ||
            "active";
    }


    teamModal.classList.add(
        "active"
    );

}


/* =========================================================
   EDIT TEAM MEMBER
========================================================= */

function editTeamMember(id) {

    const member =
        teamMembers.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!member) {
        return;
    }


    openTeamModal(
        member
    );

}


/* =========================================================
   DELETE TEAM MEMBER
========================================================= */

function deleteTeamMember(id) {

    const member =
        teamMembers.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!member) {
        return;
    }


    const confirmed =
        confirm(
            `Delete ${member.name} from the team?`
        );


    if (!confirmed) {
        return;
    }


    const index =
        teamMembers.findIndex(
            item =>
                String(item.id) ===
                String(id)
        );


    if (index !== -1) {

        teamMembers.splice(
            index,
            1
        );

    }


    localStorage.setItem(
        "jobTrackTeamMembers",
        JSON.stringify(
            teamMembers
        )
    );


    displayTeamMembers();
    populateTaskSelects();


    if (
        typeof renderDashboard ===
        "function"
    ) {
        renderDashboard();
    }

}


/* =========================================================
   SAVE TEAM MEMBER
========================================================= */

if (teamForm) {

    teamForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const id =
                teamIdInput?.value;


            const memberData = {

                name:
                    teamNameInput?.value
                        .trim() ||
                    "Unnamed Member",

                role:
                    teamRoleInput?.value
                        .trim() ||
                    "Team Member",

                email:
                    teamEmailInput?.value
                        .trim() ||
                    "",

                status:
                    teamStatusInput?.value ||
                    "active"

            };


            if (id) {

                const index =
                    teamMembers.findIndex(
                        member =>
                            String(
                                member.id
                            ) ===
                            String(id)
                    );


                if (index !== -1) {

                    teamMembers[index] = {

                        ...teamMembers[index],

                        ...memberData

                    };

                }

            } else {

                teamMembers.push({

                    id:
                        createId("member"),

                    ...memberData

                });

            }


            localStorage.setItem(
                "jobTrackTeamMembers",
                JSON.stringify(
                    teamMembers
                )
            );


            if (
                typeof closeModal ===
                "function"
            ) {

                closeModal(
                    teamModal
                );

            } else {

                teamModal?.classList.remove(
                    "active"
                );

            }


            displayTeamMembers();
            populateTaskSelects();
            updateTeamStats();

        }
    );

}


/* =========================================================
   ADD TEAM BUTTON
========================================================= */

if (addTeamBtn) {

    addTeamBtn.addEventListener(
        "click",
        () => openTeamModal()
    );

}


/* =========================================================
   PUBLIC FUNCTIONS
========================================================= */

window.displayTasks =
    displayTasks;

window.openTaskModal =
    openTaskModal;

window.editTask =
    editTask;

window.deleteTask =
    deleteTask;

window.filterTasks =
    filterTasks;


window.displayTeamMembers =
    displayTeamMembers;

window.openTeamModal =
    openTeamModal;

window.editTeamMember =
    editTeamMember;

window.deleteTeamMember =
    deleteTeamMember;

window.filterTeamMembers =
    filterTeamMembers;


/* =========================================================
   INITIAL RENDER
========================================================= */

populateTaskSelects();

displayTeamMembers();

displayTasks();

updateTeamStats();

updateTaskStats();
