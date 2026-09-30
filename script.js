/* =========================================================
   JOBTRACK - COMPLETE JAVASCRIPT
   =========================================================
   Features:
   - Projects
   - Clients
   - Team Members
   - Tasks
   - Payments
   - Calendar / Deadlines
   - Dashboard
   - Search & Filters
   - Dark / Light Theme
   - LocalStorage
   - Mobile Sidebar
   - Permission Control

   TASKS + TEAM ACCESS:
   Only:
   - Mubeeey
   - Skyboy
   - Joby
   ========================================================= */


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
        name: "Portfolio Website",
        client: "Ahmed Designs",
        budget: 350,
        paid: 0,
        deadline: "2026-10-12",
        status: "pending",
        progress: 25,
        icon: "bi-code-slash"
    },

    {
        id: 3,
        name: "Business Website",
        client: "NextGen Solutions",
        budget: 800,
        paid: 800,
        deadline: "2026-09-20",
        status: "completed",
        progress: 100,
        icon: "bi-phone"
    }

];


const defaultClients = [

    {
        id: 1,
        name: "VampCatCoin",
        email: "contact@vampcatcoin.com",
        phone: "+234 800 000 0000",
        company: "VampCatCoin",
        notes: "Web3 client. Landing page project.",
        status: "active"
    },

    {
        id: 2,
        name: "Ahmed Designs",
        email: "ahmed@example.com",
        phone: "+234 801 111 1111",
        company: "Ahmed Designs",
        notes: "Portfolio website client.",
        status: "active"
    },

    {
        id: 3,
        name: "NextGen Solutions",
        email: "hello@nextgen.com",
        phone: "+234 802 222 2222",
        company: "NextGen Solutions",
        notes: "Business website completed.",
        status: "completed"
    }

];


const defaultTeamMembers = [];

const defaultTasks = [];


/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEYS = {

    jobs: "jobTrackJobs",
    clients: "jobTrackClients",
    team: "jobTrackTeam",
    tasks: "jobTrackTasks",
    theme: "jobTrackTheme"

};


/* =========================================================
   LOAD DATA
========================================================= */

let jobs = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.jobs)
) || defaultJobs;

let clients = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.clients)
) || defaultClients;

let teamMembers = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.team)
) || defaultTeamMembers;

let tasks = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.tasks)
) || defaultTasks;


/* =========================================================
   CURRENT USER / PERMISSIONS
========================================================= */

/*
   Change this name to test different users.

   Only these three users can manage:
   - Tasks
   - Team Members
*/

let currentUser = {
    name: "Mubeeey",
    role: "admin"
};


const ADMIN_USERS = [
    "Mubeeey",
    "Skyboy",
    "Joby"
];


function isAdmin() {

    return ADMIN_USERS.some(
        user =>
            user.toLowerCase() ===
            currentUser.name.toLowerCase()
    );

}


function canManageTasks() {

    return isAdmin();

}


function canManageTeam() {

    return isAdmin();

}


/* =========================================================
   PERMISSION MESSAGE
========================================================= */

function showPermissionDenied(feature = "this section") {

    alert(
        `Access denied.\n\nOnly Mubeeey, Skyboy, and Joby can access ${feature}.`
    );

}


/* =========================================================
   DOM HELPERS
========================================================= */

const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);


/* =========================================================
   SECTION TITLES
========================================================= */

const sectionTitles = {

    dashboard: "Dashboard",
    projects: "Projects",
    tasks: "Tasks",
    team: "Team",
    clients: "Clients",
    payments: "Payments",
    calendar: "Calendar",
    settings: "Settings"

};


/* =========================================================
   NAVIGATION
========================================================= */

function showSection(sectionName) {

    /*
       Prevent unauthorized users from entering Tasks.
    */

    if (
        sectionName === "tasks" &&
        !canManageTasks()
    ) {

        showPermissionDenied("Tasks");

        return;

    }


    /*
       Prevent unauthorized users from entering Team.
    */

    if (
        sectionName === "team" &&
        !canManageTeam()
    ) {

        showPermissionDenied("Team management");

        return;

    }


    $$(".page-section").forEach(section => {

        section.classList.remove("active");

    });


    const targetSection =
        $(`#${sectionName}`) ||
        $(`[data-section="${sectionName}"]`);


    if (targetSection) {

        targetSection.classList.add("active");

    }


    $$(".nav-link").forEach(link => {

        link.classList.remove("active");

        if (
            link.dataset.section === sectionName
        ) {

            link.classList.add("active");

        }

    });


    const title =
        sectionTitles[sectionName] ||
        "JobTrack";


    const pageTitle = $("#pageTitle");

    if (pageTitle) {

        pageTitle.textContent = title;

    }


    /*
       Render section data.
    */

    switch (sectionName) {

        case "dashboard":

            renderDashboard();

            break;


        case "projects":

            filterJobs();

            break;


        case "clients":

            filterClients();

            break;


        case "team":

            filterTeamMembers();

            break;


        case "tasks":

            filterTasks();

            break;


        case "payments":

            displayPayments();

            break;


        case "calendar":

            displayDeadlines();

            break;

    }


    /*
       Close mobile menu.
    */

    closeMobileSidebar();


    /*
       Update URL hash.
    */

    history.replaceState(
        null,
        "",
        `#${sectionName}`
    );

}


/* =========================================================
   NAVIGATION EVENTS
========================================================= */

const navLinks = $$(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const section =
            link.dataset.section;

        if (section) {

            showSection(section);

        }

    });

});


$$("[data-section-link]").forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const section =
            link.dataset.sectionLink;

        if (section) {

            showSection(section);

        }

    });

});


/* =========================================================
   UPDATE PERMISSION UI
========================================================= */

function updatePermissionUI() {

    const taskAllowed =
        canManageTasks();

    const teamAllowed =
        canManageTeam();


    /*
       Hide Tasks navigation for unauthorized users.
    */

    $$('[data-section="tasks"]').forEach(link => {

        link.style.display =
            taskAllowed ? "" : "none";

    });


    /*
       Hide Team navigation for unauthorized users.
    */

    $$('[data-section="team"]').forEach(link => {

        link.style.display =
            teamAllowed ? "" : "none";

    });


    /*
       Hide task add buttons.
    */

    const taskButtons = [

        "#addTaskBtn",
        "#emptyAddTaskBtn"

    ];


    taskButtons.forEach(selector => {

        const button = $(selector);

        if (button) {

            button.style.display =
                taskAllowed ? "" : "none";

        }

    });


    /*
       Hide team add buttons.
    */

    const teamButtons = [

        "#addMemberBtn",
        "#emptyAddMemberBtn"

    ];


    teamButtons.forEach(selector => {

        const button = $(selector);

        if (button) {

            button.style.display =
                teamAllowed ? "" : "none";

        }

    });

}


/* =========================================================
   HASH NAVIGATION
========================================================= */

function loadHashSection() {

    const hash =
        window.location.hash.replace("#", "");

    if (
        hash &&
        sectionTitles[hash]
    ) {

        showSection(hash);

    } else {

        showSection("dashboard");

    }

}


window.addEventListener(
    "hashchange",
    loadHashSection
);


/* =========================================================
   PROJECTS
========================================================= */

function displayJobs(jobList = jobs) {

    const grid = $("#jobsGrid");

    const empty = $("#emptyJobs");

    if (!grid) return;


    grid.innerHTML = "";


    if (!jobList.length) {

        if (empty) {

            empty.style.display = "";

        }

        return;

    }


    if (empty) {

        empty.style.display = "none";

    }


    jobList.forEach(job => {

        const paymentStatus =
            getPaymentStatus(job);


        const remaining =
            Math.max(
                0,
                Number(job.budget || 0) -
                Number(job.paid || 0)
            );


        const card = document.createElement("div");

        card.className =
            "project-card";


        card.innerHTML = `

            <div class="project-card-header">

                <div class="project-icon">

                    <i class="bi ${safeIcon(job.icon)}"></i>

                </div>

                <div class="project-actions">

                    <button
                        class="icon-btn edit-job"
                        data-id="${job.id}"
                        title="Edit"
                    >
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button
                        class="icon-btn delete-job"
                        data-id="${job.id}"
                        title="Delete"
                    >
                        <i class="bi bi-trash"></i>
                    </button>

                </div>

            </div>


            <h3>
                ${escapeHTML(job.name)}
            </h3>


            <p class="project-client">

                <i class="bi bi-building"></i>

                ${escapeHTML(job.client)}

            </p>


            <div class="project-meta">

                <span>
                    Budget:
                    ${formatMoney(job.budget)}
                </span>

                <span>
                    Paid:
                    ${formatMoney(job.paid)}
                </span>

            </div>


            <div class="progress-wrapper">

                <div class="progress-label">

                    <span>Progress</span>

                    <strong>
                        ${Number(job.progress) || 0}%
                    </strong>

                </div>

                <div class="progress">

                    <div
                        class="progress-bar"
                        style="width:${Number(job.progress) || 0}%"
                    ></div>

                </div>

            </div>


            <div class="project-footer">

                <span class="status-badge ${safeStatus(job.status)}">

                    ${capitalize(job.status)}

                </span>

                <span>

                    <i class="bi bi-calendar3"></i>

                    ${formatDate(job.deadline)}

                </span>

            </div>


            <div class="payment-status ${paymentStatus.class}">

                <span>
                    ${paymentStatus.label}
                </span>

                <strong>
                    ${formatMoney(remaining)}
                </strong>

            </div>

        `;


        grid.appendChild(card);

    });


    attachJobActions();

}


function attachJobActions() {

    $$(".edit-job").forEach(button => {

        button.addEventListener("click", () => {

            editJob(Number(button.dataset.id));

        });

    });


    $$(".delete-job").forEach(button => {

        button.addEventListener("click", () => {

            deleteJob(Number(button.dataset.id));

        });

    });

}


/* =========================================================
   PAYMENT STATUS
========================================================= */

function getPaymentStatus(job) {

    const budget =
        Number(job.budget) || 0;

    const paid =
        Number(job.paid) || 0;


    if (paid >= budget) {

        return {
            label: "Fully Paid",
            class: "paid"
        };

    }


    if (paid > 0) {

        return {
            label: "Partially Paid",
            class: "partial"
        };

    }


    return {
        label: "Unpaid",
        class: "unpaid"
    };

}


/* =========================================================
   PROJECT STATS
========================================================= */

function updateStats() {

    const totalJobs =
        jobs.length;


    const completedJobs =
        jobs.filter(
            job => job.status === "completed"
        ).length;


    const outstanding =
        jobs.reduce(
            (sum, job) =>
                sum +
                Math.max(
                    0,
                    Number(job.budget || 0) -
                    Number(job.paid || 0)
                ),
            0
        );


    const totalPaid =
        jobs.reduce(
            (sum, job) =>
                sum +
                Number(job.paid || 0),
            0
        );


    if ($("#totalJobs")) {

        $("#totalJobs").textContent =
            totalJobs;

    }


    if ($("#completedJobs")) {

        $("#completedJobs").textContent =
            completedJobs;

    }


    if ($("#outstandingAmount")) {

        $("#outstandingAmount").textContent =
            formatMoney(outstanding);

    }


    if ($("#totalPaid")) {

        $("#totalPaid").textContent =
            formatMoney(totalPaid);

    }

}


/* =========================================================
   PROJECT FILTER
========================================================= */

function filterJobs() {

    const search =
        ($("#jobSearch")?.value || "")
            .toLowerCase()
            .trim();


    const status =
        $("#statusFilter")?.value || "all";


    const payment =
        $("#paymentFilter")?.value || "all";


    const filtered =
        jobs.filter(job => {

            const matchesSearch =

                !search ||

                job.name
                    .toLowerCase()
                    .includes(search) ||

                job.client
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =

                status === "all" ||

                job.status === status;


            const paymentStatus =
                getPaymentStatus(job);


            const matchesPayment =

                payment === "all" ||

                paymentStatus.class === payment;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesPayment
            );

        });


    displayJobs(filtered);

}


/* =========================================================
   ADD PROJECT
========================================================= */

function openAddModal() {

    const form = $("#jobForm");

    if (form) {

        form.reset();

    }


    if ($("#jobId")) {

        $("#jobId").value = "";

    }


    if ($("#jobModalTitle")) {

        $("#jobModalTitle").textContent =
            "Add Project";

    }


    if ($("#progressValue")) {

        $("#progressValue").textContent =
            "0%";

    }


    updatePaymentPreview();


    openModal("jobModal");

}


/* =========================================================
   EDIT PROJECT
========================================================= */

function editJob(id) {

    const job =
        jobs.find(
            item => item.id === id
        );


    if (!job) return;


    $("#jobId").value =
        job.id;


    $("#jobName").value =
        job.name;


    $("#jobClient").value =
        job.client;


    $("#jobBudget").value =
        job.budget;


    $("#jobPaid").value =
        job.paid;


    $("#jobDeadline").value =
        job.deadline;


    $("#jobStatus").value =
        job.status;


    $("#jobProgress").value =
        job.progress;


    if ($("#progressValue")) {

        $("#progressValue").textContent =
            `${job.progress}%`;

    }


    if ($("#jobModalTitle")) {

        $("#jobModalTitle").textContent =
            "Edit Project";

    }


    updatePaymentPreview();


    openModal("jobModal");

}


/* =========================================================
   DELETE PROJECT
========================================================= */

function deleteJob(id) {

    const job =
        jobs.find(
            item => item.id === id
        );


    if (!job) return;


    const confirmed =
        confirm(
            `Delete "${job.name}"?`
        );


    if (!confirmed) return;


    jobs =
        jobs.filter(
            item => item.id !== id
        );


    saveJobs();

    renderAll();

}


/* =========================================================
   JOB FORM
========================================================= */

const jobForm = $("#jobForm");

if (jobForm) {

    jobForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const id =
                Number($("#jobId")?.value);


            const jobData = {

                name:
                    $("#jobName").value.trim(),

                client:
                    $("#jobClient").value.trim(),

                budget:
                    Number($("#jobBudget").value) || 0,

                paid:
                    Number($("#jobPaid").value) || 0,

                deadline:
                    $("#jobDeadline").value,

                status:
                    $("#jobStatus").value,

                progress:
                    Number($("#jobProgress").value) || 0,

                icon:
                    getRandomIcon()

            };


            if (!jobData.name) {

                alert("Please enter a project name.");

                return;

            }


            if (id) {

                const index =
                    jobs.findIndex(
                        job => job.id === id
                    );


                if (index !== -1) {

                    jobData.id =
                        id;

                    jobData.icon =
                        jobs[index].icon ||
                        getRandomIcon();

                    jobs[index] =
                        jobData;

                }

            } else {

                jobData.id =
                    Date.now();

                jobs.push(jobData);

            }


            saveJobs();

            closeModal("jobModal");

            renderAll();

        }
    );

}


/* =========================================================
   PAYMENT PREVIEW
========================================================= */

function updatePaymentPreview() {

    const budget =
        Number($("#jobBudget")?.value) || 0;

    const paid =
        Number($("#jobPaid")?.value) || 0;


    const remaining =
        Math.max(
            0,
            budget - paid
        );


    const status =
        getPaymentStatus({
            budget,
            paid
        });


    if ($("#previewPaymentStatus")) {

        $("#previewPaymentStatus").textContent =
            status.label;

    }


    if ($("#previewRemaining")) {

        $("#previewRemaining").textContent =
            formatMoney(remaining);

    }

}


$("#jobBudget")?.addEventListener(
    "input",
    updatePaymentPreview
);


$("#jobPaid")?.addEventListener(
    "input",
    updatePaymentPreview
);


$("#jobProgress")?.addEventListener(
    "input",
    event => {

        if ($("#progressValue")) {

            $("#progressValue").textContent =
                `${event.target.value}%`;

        }

    }
);


/* =========================================================
   CLIENTS
========================================================= */

function displayClients(clientList = clients) {

    const grid =
        $("#clientsGrid");


    const empty =
        $("#emptyClients");


    if (!grid) return;


    grid.innerHTML = "";


    if (!clientList.length) {

        if (empty) {

            empty.style.display = "";

        }

        return;

    }


    if (empty) {

        empty.style.display = "none";

    }


    clientList.forEach(client => {

        const card =
            document.createElement("div");


        card.className =
            "client-card";


        card.innerHTML = `

            <div class="client-card-header">

                <div class="client-avatar">

                    ${getInitials(client.name)}

                </div>

                <div class="client-actions">

                    <button
                        class="icon-btn edit-client"
                        data-id="${client.id}"
                    >
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button
                        class="icon-btn delete-client"
                        data-id="${client.id}"
                    >
                        <i class="bi bi-trash"></i>
                    </button>

                </div>

            </div>


            <h3>
                ${escapeHTML(client.name)}
            </h3>


            <p>
                ${escapeHTML(client.company || "")}
            </p>


            <div class="client-info">

                <span>

                    <i class="bi bi-envelope"></i>

                    ${escapeHTML(client.email || "-")}

                </span>


                <span>

                    <i class="bi bi-telephone"></i>

                    ${escapeHTML(client.phone || "-")}

                </span>

            </div>


            <div class="client-footer">

                <span class="status-badge ${safeStatus(client.status)}">

                    ${capitalize(client.status)}

                </span>

            </div>

        `;


        grid.appendChild(card);

    });


    attachClientActions();

}


/* =========================================================
   CLIENT ACTIONS
========================================================= */

function attachClientActions() {

    $$(".edit-client").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                editClient(
                    Number(button.dataset.id)
                );

            }
        );

    });


    $$(".delete-client").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                deleteClient(
                    Number(button.dataset.id)
                );

            }
        );

    });

}


/* =========================================================
   CLIENT STATS
========================================================= */

function updateClientStats() {

    const total =
        clients.length;


    const active =
        clients.filter(
            client =>
                client.status === "active"
        ).length;


    const completed =
        clients.filter(
            client =>
                client.status === "completed"
        ).length;


    if ($("#totalClients")) {

        $("#totalClients").textContent =
            total;

    }


    if ($("#activeClients")) {

        $("#activeClients").textContent =
            active;

    }


    if ($("#completedClients")) {

        $("#completedClients").textContent =
            completed;

    }

}


/* =========================================================
   CLIENT FILTER
========================================================= */

function filterClients() {

    const search =
        ($("#clientSearch")?.value || "")
            .toLowerCase()
            .trim();


    const filtered =
        clients.filter(client => {

            return (

                !search ||

                client.name
                    .toLowerCase()
                    .includes(search) ||

                (client.company || "")
                    .toLowerCase()
                    .includes(search) ||

                (client.email || "")
                    .toLowerCase()
                    .includes(search)

            );

        });


    displayClients(filtered);

}


/* =========================================================
   OPEN CLIENT MODAL
========================================================= */

function openClientModal() {

    $("#clientForm")?.reset();


    if ($("#clientId")) {

        $("#clientId").value = "";

    }


    if ($("#clientModalTitle")) {

        $("#clientModalTitle").textContent =
            "Add Client";

    }


    openModal("clientModal");

}


/* =========================================================
   EDIT CLIENT
========================================================= */

function editClient(id) {

    const client =
        clients.find(
            item => item.id === id
        );


    if (!client) return;


    $("#clientId").value =
        client.id;


    $("#clientName").value =
        client.name || "";


    $("#clientEmail").value =
        client.email || "";


    $("#clientPhone").value =
        client.phone || "";


    $("#clientCompany").value =
        client.company || "";


    $("#clientNotes").value =
        client.notes || "";


    if ($("#clientModalTitle")) {

        $("#clientModalTitle").textContent =
            "Edit Client";

    }


    openModal("clientModal");

}


/* =========================================================
   DELETE CLIENT
========================================================= */

function deleteClient(id) {

    const client =
        clients.find(
            item => item.id === id
        );


    if (!client) return;


    if (
        !confirm(
            `Delete "${client.name}"?`
        )
    ) {

        return;

    }


    clients =
        clients.filter(
            item => item.id !== id
        );


    saveClients();

    renderAll();

}


/* =========================================================
   CLIENT FORM
========================================================= */

const clientForm =
    $("#clientForm");


if (clientForm) {

    clientForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const id =
                Number($("#clientId")?.value);


            const clientData = {

                name:
                    $("#clientName").value.trim(),

                email:
                    $("#clientEmail").value.trim(),

                phone:
                    $("#clientPhone").value.trim(),

                company:
                    $("#clientCompany").value.trim(),

                notes:
                    $("#clientNotes").value.trim(),

                status:
                    "active"

            };


            if (!clientData.name) {

                alert(
                    "Please enter the client name."
                );

                return;

            }


            if (id) {

                const index =
                    clients.findIndex(
                        client =>
                            client.id === id
                    );


                if (index !== -1) {

                    const oldName =
                        clients[index].name;


                    clientData.id =
                        id;


                    clientData.status =
                        clients[index].status;


                    clients[index] =
                        clientData;


                    /*
                       Update projects using old client name.
                    */

                    jobs.forEach(job => {

                        if (
                            job.client === oldName
                        ) {

                            job.client =
                                clientData.name;

                        }

                    });


                    saveJobs();

                }

            } else {

                clientData.id =
                    Date.now();

                clients.push(clientData);

            }


            saveClients();

            closeModal("clientModal");

            renderAll();

        }
    );

}


/* =========================================================
   TEAM MEMBERS
========================================================= */

function updateTeamStats() {

    const total =
        teamMembers.length;


    const active =
        teamMembers.filter(
            member =>
                member.status === "active"
        ).length;


    const assignedTasks =
        tasks.filter(
            task =>
                task.status !== "completed"
        ).length;


    const completedTasks =
        tasks.filter(
            task =>
                task.status === "completed"
        ).length;


    if ($("#totalTeamMembers")) {

        $("#totalTeamMembers").textContent =
            total;

    }


    if ($("#activeTeamMembers")) {

        $("#activeTeamMembers").textContent =
            active;

    }


    if ($("#assignedTeamTasks")) {

        $("#assignedTeamTasks").textContent =
            assignedTasks;

    }


    if ($("#teamCompletedTasks")) {

        $("#teamCompletedTasks").textContent =
            completedTasks;

    }

}


/* =========================================================
   DISPLAY TEAM
========================================================= */

function displayTeamMembers(memberList = teamMembers) {

    const grid =
        $("#teamGrid");


    const empty =
        $("#emptyTeam");


    if (!grid) return;


    grid.innerHTML = "";


    if (!memberList.length) {

        if (empty) {

            empty.style.display = "";

        }

        return;

    }


    if (empty) {

        empty.style.display = "none";

    }


    memberList.forEach(member => {

        const memberTasks =
            tasks.filter(
                task =>
                    Number(task.assignee) ===
                    Number(member.id)
            );


        const completed =
            memberTasks.filter(
                task =>
                    task.status === "completed"
            ).length;


        const card =
            document.createElement("div");


        card.className =
            "team-card";


        card.innerHTML = `

            <div class="team-card-header">

                <div class="team-avatar">

                    ${getInitials(member.name)}

                </div>


                <div class="team-actions">

                    ${
                        canManageTeam()
                            ? `
                                <button
                                    class="icon-btn edit-member"
                                    data-id="${member.id}"
                                >
                                    <i class="bi bi-pencil"></i>
                                </button>

                                <button
                                    class="icon-btn delete-member"
                                    data-id="${member.id}"
                                >
                                    <i class="bi bi-trash"></i>
                                </button>
                              `
                            : ""
                    }

                </div>

            </div>


            <h3>
                ${escapeHTML(member.name)}
            </h3>


            <p>
                ${escapeHTML(member.role || "Team Member")}
            </p>


            <div class="team-info">

                <span>

                    <i class="bi bi-envelope"></i>

                    ${escapeHTML(member.email || "-")}

                </span>


                <span>

                    <i class="bi bi-list-task"></i>

                    ${memberTasks.length} tasks

                </span>

            </div>


            <div class="team-footer">

                <span class="status-badge ${safeStatus(member.status)}">

                    ${capitalize(member.status)}

                </span>


                <span>

                    ${completed} completed

                </span>

            </div>

        `;


        grid.appendChild(card);

    });


    attachTeamActions();

}


/* =========================================================
   TEAM ACTIONS
========================================================= */

function attachTeamActions() {

    $$(".edit-member").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                editTeamMember(
                    Number(button.dataset.id)
                );

            }
        );

    });


    $$(".delete-member").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                deleteTeamMember(
                    Number(button.dataset.id)
                );

            }
        );

    });

}


/* =========================================================
   TEAM FILTER
========================================================= */

function filterTeamMembers() {

    if (!canManageTeam()) {

        return;

    }


    const search =
        ($("#teamSearch")?.value || "")
            .toLowerCase()
            .trim();


    const filtered =
        teamMembers.filter(member => {

            return (

                !search ||

                member.name
                    .toLowerCase()
                    .includes(search) ||

                (member.role || "")
                    .toLowerCase()
                    .includes(search) ||

                (member.email || "")
                    .toLowerCase()
                    .includes(search)

            );

        });


    displayTeamMembers(filtered);

}


/* =========================================================
   OPEN TEAM MODAL
========================================================= */

function openMemberModal() {

    if (!canManageTeam()) {

        showPermissionDenied(
            "Team management"
        );

        return;

    }


    $("#memberForm")?.reset();


    if ($("#memberId")) {

        $("#memberId").value = "";

    }


    if ($("#memberModalTitle")) {

        $("#memberModalTitle").textContent =
            "Add Team Member";

    }


    openModal("memberModal");

}


/* =========================================================
   EDIT TEAM MEMBER
========================================================= */

function editTeamMember(id) {

    if (!canManageTeam()) {

        showPermissionDenied(
            "Team management"
        );

        return;

    }


    const member =
        teamMembers.find(
            item => item.id === id
        );


    if (!member) return;


    $("#memberId").value =
        member.id;


    $("#memberName").value =
        member.name || "";


    $("#memberRole").value =
        member.role || "";


    $("#memberEmail").value =
        member.email || "";


    $("#memberStatus").value =
        member.status || "active";


    $("#memberNotes").value =
        member.notes || "";


    if ($("#memberModalTitle")) {

        $("#memberModalTitle").textContent =
            "Edit Team Member";

    }


    openModal("memberModal");

}


/* =========================================================
   DELETE TEAM MEMBER
========================================================= */

function deleteTeamMember(id) {

    if (!canManageTeam()) {

        showPermissionDenied(
            "Team management"
        );

        return;

    }


    const member =
        teamMembers.find(
            item => item.id === id
        );


    if (!member) return;


    if (
        !confirm(
            `Delete "${member.name}"?`
        )
    ) {

        return;

    }


    teamMembers =
        teamMembers.filter(
            item => item.id !== id
        );


    /*
       Remove member assignment from tasks.
    */

    tasks.forEach(task => {

        if (
            Number(task.assignee) === id
        ) {

            task.assignee = "";

        }

    });


    saveTeam();

    saveTasks();

    renderAll();

}


/* =========================================================
   TEAM FORM
========================================================= */

const memberForm =
    $("#memberForm");


if (memberForm) {

    memberForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (!canManageTeam()) {

                showPermissionDenied(
                    "Team management"
                );

                return;

            }


            const id =
                Number($("#memberId")?.value);


            const memberData = {

                name:
                    $("#memberName").value.trim(),

                role:
                    $("#memberRole").value.trim(),

                email:
                    $("#memberEmail").value.trim(),

                status:
                    $("#memberStatus").value,

                notes:
                    $("#memberNotes").value.trim()

            };


            if (!memberData.name) {

                alert(
                    "Please enter the member name."
                );

                return;

            }


            if (id) {

                const index =
                    teamMembers.findIndex(
                        member =>
                            member.id === id
                    );


                if (index !== -1) {

                    memberData.id =
                        id;

                    teamMembers[index] =
                        memberData;

                }

            } else {

                memberData.id =
                    Date.now();

                teamMembers.push(
                    memberData
                );

            }


            saveTeam();

            closeModal("memberModal");

            renderAll();

        }
    );

}


/* =========================================================
   TASK HELPERS
========================================================= */

function getTaskStatusLabel(status) {

    const labels = {

        pending: "Pending",
        in_progress: "In Progress",
        completed: "Completed"

    };


    return labels[status] ||
        capitalize(status || "Pending");

}


function getTaskPriorityLabel(priority) {

    const labels = {

        low: "Low",
        medium: "Medium",
        high: "High",
        urgent: "Urgent"

    };


    return labels[priority] ||
        capitalize(priority || "Medium");

}


function getTaskProject(task) {

    return jobs.find(
        job =>
            Number(job.id) ===
            Number(task.project)
    );

}


function getTaskAssignee(task) {

    return teamMembers.find(
        member =>
            Number(member.id) ===
            Number(task.assignee)
    );

}


function isTaskOverdue(task) {

    if (
        !task.dueDate ||
        task.status === "completed"
    ) {

        return false;

    }


    const today =
        new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    const due =
        new Date(task.dueDate);

    due.setHours(
        0,
        0,
        0,
        0
    );


    return due < today;

}


/* =========================================================
   TASK STATS
========================================================= */

function updateTaskStats() {

    const total =
        tasks.length;


    const inProgress =
        tasks.filter(
            task =>
                task.status === "in_progress"
        ).length;


    const pending =
        tasks.filter(
            task =>
                task.status === "pending"
        ).length;


    const completed =
        tasks.filter(
            task =>
                task.status === "completed"
        ).length;


    if ($("#totalTasks")) {

        $("#totalTasks").textContent =
            total;

    }


    if ($("#inProgressTasks")) {

        $("#inProgressTasks").textContent =
            inProgress;

    }


    if ($("#pendingTasks")) {

        $("#pendingTasks").textContent =
            pending;

    }


    if ($("#completedTasks")) {

        $("#completedTasks").textContent =
            completed;

    }

}


/* =========================================================
   DISPLAY TASKS
========================================================= */

function displayTasks(taskList = tasks) {

    const grid =
        $("#tasksGrid");


    const empty =
        $("#emptyTasks");


    if (!grid) return;


    grid.innerHTML = "";


    if (!taskList.length) {

        if (empty) {

            empty.style.display = "";

        }

        return;

    }


    if (empty) {

        empty.style.display = "none";

    }


    taskList.forEach(task => {

        grid.appendChild(
            createTaskCard(task)
        );

    });


    attachTaskActions();

}


/* =========================================================
   CREATE TASK COLUMN
========================================================= */

function createTaskColumn(title, taskList) {

    const column =
        document.createElement("div");


    column.className =
        "task-column";


    column.innerHTML = `

        <div class="task-column-header">

            <h3>
                ${title}
            </h3>

            <span>
                ${taskList.length}
            </span>

        </div>

    `;


    taskList.forEach(task => {

        column.appendChild(
            createTaskCard(task)
        );

    });


    return column;

}


/* =========================================================
   CREATE TASK CARD
========================================================= */

function createTaskCard(task) {

    const card =
        document.createElement("div");


    card.className =
        "task-card";


    const project =
        getTaskProject(task);


    const assignee =
        getTaskAssignee(task);


    const overdue =
        isTaskOverdue(task);


    card.innerHTML = `

        <div class="task-card-header">

            <span class="task-priority ${safePriority(task.priority)}">

                ${getTaskPriorityLabel(task.priority)}

            </span>


            ${
                canManageTasks()
                    ? `
                        <div class="task-actions">

                            <button
                                class="icon-btn edit-task"
                                data-id="${task.id}"
                            >
                                <i class="bi bi-pencil"></i>
                            </button>

                            <button
                                class="icon-btn delete-task"
                                data-id="${task.id}"
                            >
                                <i class="bi bi-trash"></i>
                            </button>

                        </div>
                      `
                    : ""
            }

        </div>


        <h3>

            ${escapeHTML(task.title || "Untitled Task")}

        </h3>


        ${
            task.description
                ? `
                    <p>
                        ${escapeHTML(task.description)}
                    </p>
                  `
                : ""
        }


        <div class="task-meta">

            ${
                project
                    ? `
                        <span>

                            <i class="bi bi-folder"></i>

                            ${escapeHTML(project.name)}

                        </span>
                      `
                    : ""
            }


            ${
                assignee
                    ? `
                        <span>

                            <i class="bi bi-person"></i>

                            ${escapeHTML(assignee.name)}

                        </span>
                      `
                    : ""
            }


            ${
                task.dueDate
                    ? `
                        <span class="${overdue ? "overdue" : ""}">

                            <i class="bi bi-calendar3"></i>

                            ${formatDate(task.dueDate)}

                        </span>
                      `
                    : ""
            }

        </div>


        <div class="task-footer">

            <span class="status-badge ${safeStatus(task.status)}">

                ${getTaskStatusLabel(task.status)}

            </span>

        </div>

    `;


    return card;

}


/* =========================================================
   TASK ACTIONS
========================================================= */

function attachTaskActions() {

    $$(".edit-task").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                editTask(
                    Number(button.dataset.id)
                );

            }
        );

    });


    $$(".delete-task").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                deleteTask(
                    Number(button.dataset.id)
                );

            }
        );

    });

}


/* =========================================================
   TASK FILTER
========================================================= */

function filterTasks() {

    if (!canManageTasks()) {

        return;

    }


    const search =
        ($("#taskSearch")?.value || "")
            .toLowerCase()
            .trim();


    const status =
        $("#taskStatusFilter")?.value ||
        "all";


    const priority =
        $("#taskPriorityFilter")?.value ||
        "all";


    const member =
        $("#taskMemberFilter")?.value ||
        "all";


    const filtered =
        tasks.filter(task => {

            const matchesSearch =

                !search ||

                (task.title || "")
                    .toLowerCase()
                    .includes(search) ||

                (task.description || "")
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =

                status === "all" ||

                task.status === status;


            const matchesPriority =

                priority === "all" ||

                task.priority === priority;


            const matchesMember =

                member === "all" ||

                String(task.assignee || "") ===
                String(member);


            return (

                matchesSearch &&
                matchesStatus &&
                matchesPriority &&
                matchesMember

            );

        });


    displayTasks(filtered);

}


/* =========================================================
   TASK PROJECT OPTIONS
========================================================= */

function populateTaskProjectOptions() {

    const select =
        $("#taskProject");


    if (!select) return;


    const current =
        select.value;


    select.innerHTML = `

        <option value="">
            Select project
        </option>

    `;


    jobs.forEach(job => {

        const option =
            document.createElement("option");


        option.value =
            job.id;


        option.textContent =
            job.name;


        select.appendChild(option);

    });


    if (current) {

        select.value =
            current;

    }

}


/* =========================================================
   TASK MEMBER OPTIONS
========================================================= */

function populateTaskMemberOptions() {

    const select =
        $("#taskAssignee");


    if (!select) return;


    const current =
        select.value;


    select.innerHTML = `

        <option value="">
            Unassigned
        </option>

    `;


    teamMembers.forEach(member => {

        const option =
            document.createElement("option");


        option.value =
            member.id;


        option.textContent =
            member.name;


        select.appendChild(option);

    });


    if (current) {

        select.value =
            current;

    }

}


/* =========================================================
   TASK MEMBER FILTER
========================================================= */

function populateTaskMemberFilter() {

    const select =
        $("#taskMemberFilter");


    if (!select) return;


    const current =
        select.value;


    select.innerHTML = `

        <option value="all">
            All Members
        </option>

    `;


    teamMembers.forEach(member => {

        const option =
            document.createElement("option");


        option.value =
            member.id;


        option.textContent =
            member.name;


        select.appendChild(option);

    });


    if (current) {

        select.value =
            current;

    }

}


/* =========================================================
   OPEN TASK MODAL
========================================================= */

function openTaskModal() {

    if (!canManageTasks()) {

        showPermissionDenied(
            "Tasks"
        );

        return;

    }


    $("#taskForm")?.reset();


    if ($("#taskId")) {

        $("#taskId").value = "";

    }


    populateTaskProjectOptions();

    populateTaskMemberOptions();


    if ($("#taskModalTitle")) {

        $("#taskModalTitle").textContent =
            "Add Task";

    }


    openModal("taskModal");

}


/* =========================================================
   EDIT TASK
========================================================= */

function editTask(id) {

    if (!canManageTasks()) {

        showPermissionDenied(
            "Tasks"
        );

        return;

    }


    const task =
        tasks.find(
            item => item.id === id
        );


    if (!task) return;


    populateTaskProjectOptions();

    populateTaskMemberOptions();


    $("#taskId").value =
        task.id;


    $("#taskTitle").value =
        task.title || "";


    $("#taskDescription").value =
        task.description || "";


    $("#taskProject").value =
        task.project || "";


    $("#taskAssignee").value =
        task.assignee || "";


    $("#taskPriority").value =
        task.priority || "medium";


    $("#taskDueDate").value =
        task.dueDate || "";


    $("#taskStatus").value =
        task.status || "pending";


    $("#taskNotes").value =
        task.notes || "";


    if ($("#taskModalTitle")) {

        $("#taskModalTitle").textContent =
            "Edit Task";

    }


    openModal("taskModal");

}


/* =========================================================
   DELETE TASK
========================================================= */

function deleteTask(id) {

    if (!canManageTasks()) {

        showPermissionDenied(
            "Tasks"
        );

        return;

    }


    const task =
        tasks.find(
            item => item.id === id
        );


    if (!task) return;


    if (
        !confirm(
            `Delete "${task.title}"?`
        )
    ) {

        return;

    }


    tasks =
        tasks.filter(
            item => item.id !== id
        );


    saveTasks();

    renderAll();

}


/* =========================================================
   TASK FORM
========================================================= */

const taskForm =
    $("#taskForm");


if (taskForm) {

    taskForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (!canManageTasks()) {

                showPermissionDenied(
                    "Tasks"
                );

                return;

            }


            const id =
                Number($("#taskId")?.value);


            const taskData = {

                title:
                    $("#taskTitle").value.trim(),

                description:
                    $("#taskDescription").value.trim(),

                project:
                    $("#taskProject").value,

                assignee:
                    $("#taskAssignee").value,

                priority:
                    $("#taskPriority").value,

                dueDate:
                    $("#taskDueDate").value,

                status:
                    $("#taskStatus").value,

                notes:
                    $("#taskNotes").value.trim()

            };


            if (!taskData.title) {

                alert(
                    "Please enter a task title."
                );

                return;

            }


            if (id) {

                const index =
                    tasks.findIndex(
                        task =>
                            task.id === id
                    );


                if (index !== -1) {

                    taskData.id =
                        id;

                    tasks[index] =
                        taskData;

                }

            } else {

                taskData.id =
                    Date.now();

                tasks.push(taskData);

            }


            saveTasks();

            closeModal("taskModal");

            renderAll();

        }
    );

}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    updateStats();

    updateClientStats();

    updateTeamStats();

    updateTaskStats();


    /*
       Recent projects
    */

    const recentProjects =
        $("#recentProjects");


    if (recentProjects) {

        recentProjects.innerHTML = "";


        jobs
            .slice()
            .reverse()
            .slice(0, 5)
            .forEach(job => {

                const item =
                    document.createElement("div");


                item.className =
                    "recent-project";


                item.innerHTML = `

                    <div>

                        <strong>
                            ${escapeHTML(job.name)}
                        </strong>

                        <small>
                            ${escapeHTML(job.client)}
                        </small>

                    </div>


                    <span class="status-badge ${safeStatus(job.status)}">

                        ${capitalize(job.status)}

                    </span>

                `;


                recentProjects.appendChild(item);

            });

    }


    /*
       Dashboard clients
    */

    const dashboardClients =
        $("#dashboardClients");


    if (dashboardClients) {

        dashboardClients.textContent =
            clients.length;

    }


    /*
       Dashboard team count
    */

    const dashboardTeamCount =
        $("#dashboardTeamCount");


    if (dashboardTeamCount) {

        dashboardTeamCount.textContent =
            teamMembers.length;

    }


    /*
       Dashboard task counts
    */

    const dashboardTaskCount =
        $("#dashboardTaskCount");


    if (dashboardTaskCount) {

        dashboardTaskCount.textContent =
            tasks.length;

    }


    const activeTasks =
        tasks.filter(
            task =>
                task.status !== "completed"
        ).length;


    const completedTasks =
        tasks.filter(
            task =>
                task.status === "completed"
        ).length;


    if ($("#dashboardActiveTasks")) {

        $("#dashboardActiveTasks").textContent =
            activeTasks;

    }


    if ($("#dashboardCompletedTasks")) {

        $("#dashboardCompletedTasks").textContent =
            completedTasks;

    }


    /*
       Dashboard recent tasks
    */

    const dashboardTasks =
        $("#dashboardTasks");


    if (dashboardTasks) {

        dashboardTasks.innerHTML = "";


        tasks
            .slice()
            .reverse()
            .slice(0, 5)
            .forEach(task => {

                const item =
                    document.createElement("div");


                item.className =
                    "recent-task";


                item.innerHTML = `

                    <div>

                        <strong>
                            ${escapeHTML(task.title)}
                        </strong>

                        <small>
                            ${getTaskStatusLabel(task.status)}
                        </small>

                    </div>


                    <span class="task-priority ${safePriority(task.priority)}">

                        ${getTaskPriorityLabel(task.priority)}

                    </span>

                `;


                dashboardTasks.appendChild(item);

            });

    }

}


/* =========================================================
   PAYMENTS
========================================================= */

function displayPayments() {

    const totalValue =
        jobs.reduce(
            (sum, job) =>
                sum +
                Number(job.budget || 0),
            0
        );


    const totalPaid =
        jobs.reduce(
            (sum, job) =>
                sum +
                Number(job.paid || 0),
            0
        );


    const outstanding =
        Math.max(
            0,
            totalValue - totalPaid
        );


    if ($("#totalProjectValue")) {

        $("#totalProjectValue").textContent =
            formatMoney(totalValue);

    }


    if ($("#paymentTotalPaid")) {

        $("#paymentTotalPaid").textContent =
            formatMoney(totalPaid);

    }


    if ($("#paymentOutstanding")) {

        $("#paymentOutstanding").textContent =
            formatMoney(outstanding);

    }


    const list =
        $("#paymentList");


    if (!list) return;


    list.innerHTML = "";


    jobs.forEach(job => {

        const remaining =
            Math.max(
                0,
                Number(job.budget || 0) -
                Number(job.paid || 0)
            );


        const item =
            document.createElement("div");


        item.className =
            "payment-item";


        item.innerHTML = `

            <div>

                <strong>
                    ${escapeHTML(job.name)}
                </strong>

                <small>
                    ${escapeHTML(job.client)}
                </small>

            </div>


            <div>

                <strong>
                    ${formatMoney(job.paid)}
                </strong>

                <small>
                    ${remaining > 0
                        ? `${formatMoney(remaining)} outstanding`
                        : "Fully paid"}
                </small>

            </div>

        `;


        list.appendChild(item);

    });

}


/* =========================================================
   CALENDAR / DEADLINES
========================================================= */

function displayDeadlines() {

    const list =
        $("#deadlineList");


    if (!list) return;


    list.innerHTML = "";


    const sorted =
        jobs
            .filter(job => job.deadline)
            .slice()
            .sort(
                (a, b) =>
                    new Date(a.deadline) -
                    new Date(b.deadline)
            );


    if (!sorted.length) {

        list.innerHTML = `

            <div class="empty-state">

                <p>
                    No upcoming deadlines.
                </p>

            </div>

        `;

        return;

    }


    sorted.forEach(job => {

        const item =
            document.createElement("div");


        item.className =
            "deadline-item";


        item.innerHTML = `

            <div>

                <strong>
                    ${escapeHTML(job.name)}
                </strong>

                <small>
                    ${escapeHTML(job.client)}
                </small>

            </div>


            <div>

                <span>

                    <i class="bi bi-calendar3"></i>

                    ${formatDate(job.deadline)}

                </span>

            </div>

        `;


        list.appendChild(item);

    });

}


/* =========================================================
   MODALS
========================================================= */

function openModal(id) {

    const modal =
        document.getElementById(id);


    if (!modal) return;


    modal.classList.add("active");

    document.body.classList.add(
        "modal-open"
    );

}


function closeModal(id) {

    const modal =
        document.getElementById(id);


    if (!modal) return;


    modal.classList.remove("active");

    document.body.classList.remove(
        "modal-open"
    );

}


function closeAllModals() {

    $$(".modal").forEach(modal => {

        modal.classList.remove("active");

    });


    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   MODAL BUTTONS
========================================================= */

/* Projects */

$("#addJobBtn")?.addEventListener(
    "click",
    openAddModal
);


$("#dashboardAddJobBtn")?.addEventListener(
    "click",
    openAddModal
);


$("#emptyAddJobBtn")?.addEventListener(
    "click",
    openAddModal
);


$("#closeJobModal")?.addEventListener(
    "click",
    () => closeModal("jobModal")
);


$("#cancelJobBtn")?.addEventListener(
    "click",
    () => closeModal("jobModal")
);


/* Clients */

$("#addClientBtn")?.addEventListener(
    "click",
    openClientModal
);


$("#emptyAddClientBtn")?.addEventListener(
    "click",
    openClientModal
);


$("#closeClientModal")?.addEventListener(
    "click",
    () => closeModal("clientModal")
);


$("#cancelClientBtn")?.addEventListener(
    "click",
    () => closeModal("clientModal")
);


/* Team */

$("#addMemberBtn")?.addEventListener(
    "click",
    openMemberModal
);


$("#emptyAddMemberBtn")?.addEventListener(
    "click",
    openMemberModal
);


$("#closeMemberModal")?.addEventListener(
    "click",
    () => closeModal("memberModal")
);


$("#cancelMemberBtn")?.addEventListener(
    "click",
    () => closeModal("memberModal")
);


/* Tasks */

$("#addTaskBtn")?.addEventListener(
    "click",
    openTaskModal
);


$("#emptyAddTaskBtn")?.addEventListener(
    "click",
    openTaskModal
);


$("#closeTaskModal")?.addEventListener(
    "click",
    () => closeModal("taskModal")
);


$("#cancelTaskBtn")?.addEventListener(
    "click",
    () => closeModal("taskModal")
);


/* =========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================================= */

$$(".modal").forEach(modal => {

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                modal.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "modal-open"
                );

            }

        }
    );

});


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeAllModals();

        }

    }
);


/* =========================================================
   THEME
========================================================= */

function setTheme(theme) {

    document.documentElement.dataset.theme =
        theme;


    localStorage.setItem(
        STORAGE_KEYS.theme,
        theme
    );


    updateThemeButtons();

}


function updateThemeButtons() {

    const theme =
        document.documentElement.dataset.theme ||
        "dark";


    const buttons = [

        $("#themeToggle"),
        $("#topThemeToggle"),
        $("#settingsThemeToggle")

    ];


    buttons.forEach(button => {

        if (!button) return;


        const icon =
            button.querySelector("i");


        if (!icon) return;


        if (theme === "dark") {

            icon.className =
                "bi bi-sun";

        } else {

            icon.className =
                "bi bi-moon";

        }

    });

}


function toggleTheme() {

    const current =
        document.documentElement.dataset.theme ||
        "dark";


    setTheme(
        current === "dark"
            ? "light"
            : "dark"
    );

}


$("#themeToggle")?.addEventListener(
    "click",
    toggleTheme
);


$("#topThemeToggle")?.addEventListener(
    "click",
    toggleTheme
);


$("#settingsThemeToggle")?.addEventListener(
    "click",
    toggleTheme
);


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function openMobileSidebar() {

    $("#sidebar")?.classList.add(
        "active"
    );


    $("#sidebarOverlay")?.classList.add(
        "active"
    );

}


function closeMobileSidebar() {

    $("#sidebar")?.classList.remove(
        "active"
    );


    $("#sidebarOverlay")?.classList.remove(
        "active"
    );

}


$("#mobileMenuBtn")?.addEventListener(
    "click",
    openMobileSidebar
);


$("#sidebarOverlay")?.addEventListener(
    "click",
    closeMobileSidebar
);


/* =========================================================
   SEARCH / FILTER EVENTS
========================================================= */

$("#jobSearch")?.addEventListener(
    "input",
    filterJobs
);


$("#statusFilter")?.addEventListener(
    "change",
    filterJobs
);


$("#paymentFilter")?.addEventListener(
    "change",
    filterJobs
);


$("#clientSearch")?.addEventListener(
    "input",
    filterClients
);


$("#teamSearch")?.addEventListener(
    "input",
    filterTeamMembers
);


$("#taskSearch")?.addEventListener(
    "input",
    filterTasks
);


$("#taskStatusFilter")?.addEventListener(
    "change",
    filterTasks
);


$("#taskPriorityFilter")?.addEventListener(
    "change",
    filterTasks
);


$("#taskMemberFilter")?.addEventListener(
    "change",
    filterTasks
);


/* =========================================================
   WALLET / COPY BUTTONS
========================================================= */

$$("[data-copy]").forEach(button => {

    button.addEventListener(
        "click",
        async () => {

            const value =
                button.dataset.copy;


            if (!value) return;


            try {

                await navigator.clipboard.writeText(
                    value
                );


                const original =
                    button.innerHTML;


                button.innerHTML =
                    '<i class="bi bi-check"></i>';


                setTimeout(() => {

                    button.innerHTML =
                        original;

                }, 1500);


            } catch (error) {

                /*
                   Fallback for browsers that
                   block navigator.clipboard.
                */

                const textarea =
                    document.createElement(
                        "textarea"
                    );


                textarea.value =
                    value;


                document.body.appendChild(
                    textarea
                );


                textarea.select();

                document.execCommand(
                    "copy"
                );


                textarea.remove();

            }

        }
    );

});


/* =========================================================
   SAVE FUNCTIONS
========================================================= */

function saveJobs() {

    localStorage.setItem(
        STORAGE_KEYS.jobs,
        JSON.stringify(jobs)
    );

}


function saveClients() {

    localStorage.setItem(
        STORAGE_KEYS.clients,
        JSON.stringify(clients)
    );

}


function saveTeam() {

    localStorage.setItem(
        STORAGE_KEYS.team,
        JSON.stringify(teamMembers)
    );

}


function saveTasks() {

    localStorage.setItem(
        STORAGE_KEYS.tasks,
        JSON.stringify(tasks)
    );

}


/* =========================================================
   CURRENT DATE
========================================================= */

function updateCurrentDate() {

    const element =
        $("#currentDate");


    if (!element) return;


    const now =
        new Date();


    element.textContent =
        now.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

}


/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function formatMoney(amount) {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        }
    ).format(
        Number(amount) || 0
    );

}


function formatDate(date) {

    if (!date) {

        return "-";

    }


    const parsed =
        new Date(date);


    if (Number.isNaN(parsed.getTime())) {

        return "-";

    }


    return parsed.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );

}


function capitalize(value) {

    if (!value) return "";


    return value
        .replace(/_/g, " ")
        .replace(
            /\b\w/g,
            char => char.toUpperCase()
        );

}


function getInitials(name) {

    if (!name) return "?";


    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map(
            word =>
                word.charAt(0).toUpperCase()
        )
        .join("");

}


function getRandomIcon() {

    const icons = [

        "bi-globe2",
        "bi-code-slash",
        "bi-window",
        "bi-phone",
        "bi-laptop",
        "bi-brush",
        "bi-kanban",
        "bi-layout-text-window"

    ];


    return icons[
        Math.floor(
            Math.random() *
            icons.length
        )
    ];

}


function safeIcon(icon) {

    const allowed = [

        "bi-globe2",
        "bi-code-slash",
        "bi-window",
        "bi-phone",
        "bi-laptop",
        "bi-brush",
        "bi-kanban",
        "bi-layout-text-window"

    ];


    return allowed.includes(icon)
        ? icon
        : "bi-globe2";

}


function safeStatus(status) {

    const allowed = [

        "active",
        "pending",
        "completed",
        "in_progress",
        "cancelled"

    ];


    return allowed.includes(status)
        ? status
        : "pending";

}


function safePriority(priority) {

    const allowed = [

        "low",
        "medium",
        "high",
        "urgent"

    ];


    return allowed.includes(priority)
        ? priority
        : "medium";

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   RENDER EVERYTHING
========================================================= */

function renderAll() {

    updateStats();

    updateClientStats();

    updateTeamStats();

    updateTaskStats();


    displayJobs();

    displayClients();


    /*
       Team and Tasks are still rendered internally,
       but unauthorized users cannot navigate to them.
    */

    if (canManageTeam()) {

        displayTeamMembers();

    }


    if (canManageTasks()) {

        displayTasks();

    }


    populateTaskProjectOptions();

    populateTaskMemberOptions();

    populateTaskMemberFilter();


    displayPayments();

    displayDeadlines();

    renderDashboard();


    updatePermissionUI();

}


/* =========================================================
   INITIALIZE
========================================================= */

function initialize() {

    /*
       Set current date.
    */

    updateCurrentDate();


    /*
       Load saved theme.
    */

    const savedTheme =
        localStorage.getItem(
            STORAGE_KEYS.theme
        );


    setTheme(
        savedTheme || "dark"
    );


    /*
       Apply permission restrictions.
    */

    updatePermissionUI();


    /*
       Render application.
    */

    renderAll();


    /*
       Load requested section.
    */

    loadHashSection();

}


/* =========================================================
   UPDATE DATE EVERY MINUTE
========================================================= */

setInterval(
    updateCurrentDate,
    60000
);


/* =========================================================
   START APP
========================================================= */

initialize();


/* =========================================================
   COPY WALLET ADDRESS
========================================================= */

function copyWalletAddress(button) {
    const address = button.dataset.address;

    if (!address) {
        console.error("Wallet address not found.");
        return;
    }

    navigator.clipboard.writeText(address)
        .then(() => {
            const originalHTML = button.innerHTML;

            button.innerHTML = `
                <i class="bi bi-check2"></i>
                Copied
            `;

            button.classList.add("copied");

            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.classList.remove("copied");
            }, 1500);
        })
        .catch(error => {
            console.error("Failed to copy address:", error);

            // Fallback for browsers where Clipboard API is unavailable
            const textarea = document.createElement("textarea");

            textarea.value = address;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";

            document.body.appendChild(textarea);
            textarea.select();

            try {
                document.execCommand("copy");

                const originalHTML = button.innerHTML;

                button.innerHTML = `
                    <i class="bi bi-check2"></i>
                    Copied
                `;

                setTimeout(() => {
                    button.innerHTML = originalHTML;
                }, 1500);
            } catch (err) {
                alert("Unable to copy the address.");
            }

            textarea.remove();
        });
}


/* Attach copy buttons */

document.querySelectorAll(".copy-address").forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        copyWalletAddress(this);
    });
});
