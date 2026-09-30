this is my entire Js:  /* =========================================================
   JOBTRACK
   COMPLETE APPLICATION JAVASCRIPT
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


/*
 * We intentionally start Team and Tasks empty.
 * You can add your real team members and tasks
 * through the application.
 */

const defaultTeamMembers = [];

const defaultTasks = [];


/* =========================================================
   LOCAL STORAGE
========================================================= */

let jobs = loadStorage(
    "jobTrackJobs",
    defaultJobs
);

let clients = loadStorage(
    "jobTrackClients",
    defaultClients
);

let teamMembers = loadStorage(
    "jobTrackTeam",
    defaultTeamMembers
);

let tasks = loadStorage(
    "jobTrackTasks",
    defaultTasks
);


function loadStorage(key, fallback) {

    try {

        const saved =
            localStorage.getItem(key);

        if (!saved) {
            return fallback;
        }

        const parsed =
            JSON.parse(saved);

        return Array.isArray(parsed)
            ? parsed
            : fallback;

    } catch (error) {

        console.error(
            `Could not load ${key}:`,
            error
        );

        return fallback;

    }

}


function saveJobs() {

    localStorage.setItem(
        "jobTrackJobs",
        JSON.stringify(jobs)
    );

}


function saveClients() {

    localStorage.setItem(
        "jobTrackClients",
        JSON.stringify(clients)
    );

}


function saveTeamMembers() {

    localStorage.setItem(
        "jobTrackTeam",
        JSON.stringify(teamMembers)
    );

}


function saveTasks() {

    localStorage.setItem(
        "jobTrackTasks",
        JSON.stringify(tasks)
    );

}


/* =========================================================
   DOM
========================================================= */

const pageTitle =
    document.getElementById("pageTitle");

const pageSections =
    document.querySelectorAll(".page-section");

const navLinks =
    document.querySelectorAll(
        ".nav-link[data-section]"
    );

const currentDate =
    document.getElementById("currentDate");


/* =========================================================
   DASHBOARD DOM
========================================================= */

const totalJobs =
    document.getElementById("totalJobs");

const completedJobs =
    document.getElementById("completedJobs");

const outstandingAmount =
    document.getElementById("outstandingAmount");

const totalPaid =
    document.getElementById("totalPaid");

const recentProjects =
    document.getElementById("recentProjects");

const dashboardClients =
    document.getElementById("dashboardClients");

const dashboardTeamCount =
    document.getElementById(
        "dashboardTeamCount"
    );

const dashboardTaskCount =
    document.getElementById(
        "dashboardTaskCount"
    );

const dashboardActiveTasks =
    document.getElementById(
        "dashboardActiveTasks"
    );

const dashboardCompletedTasks =
    document.getElementById(
        "dashboardCompletedTasks"
    );

const dashboardTasks =
    document.getElementById(
        "dashboardTasks"
    );


/* =========================================================
   PROJECT DOM
========================================================= */

const jobsGrid =
    document.getElementById("jobsGrid");

const emptyJobs =
    document.getElementById("emptyJobs");

const jobSearch =
    document.getElementById("jobSearch");

const statusFilter =
    document.getElementById("statusFilter");

const paymentFilter =
    document.getElementById("paymentFilter");


/* =========================================================
   CLIENT DOM
========================================================= */

const clientsGrid =
    document.getElementById("clientsGrid");

const emptyClients =
    document.getElementById("emptyClients");

const clientSearch =
    document.getElementById("clientSearch");

const totalClients =
    document.getElementById("totalClients");

const activeClients =
    document.getElementById("activeClients");

const completedClients =
    document.getElementById("completedClients");


/* =========================================================
   TEAM DOM
========================================================= */

const teamGrid =
    document.getElementById("teamGrid");

const emptyTeam =
    document.getElementById("emptyTeam");

const teamSearch =
    document.getElementById("teamSearch");

const totalTeamMembers =
    document.getElementById(
        "totalTeamMembers"
    );

const activeTeamMembers =
    document.getElementById(
        "activeTeamMembers"
    );

const assignedTeamTasks =
    document.getElementById(
        "assignedTeamTasks"
    );

const teamCompletedTasks =
    document.getElementById(
        "teamCompletedTasks"
    );


/* =========================================================
   TASK DOM
========================================================= */

const tasksGrid =
    document.getElementById("tasksGrid");

const emptyTasks =
    document.getElementById("emptyTasks");

const taskSearch =
    document.getElementById("taskSearch");

const taskStatusFilter =
    document.getElementById(
        "taskStatusFilter"
    );

const taskPriorityFilter =
    document.getElementById(
        "taskPriorityFilter"
    );

const taskMemberFilter =
    document.getElementById(
        "taskMemberFilter"
    );

const totalTasks =
    document.getElementById("totalTasks");

const inProgressTasks =
    document.getElementById(
        "inProgressTasks"
    );

const pendingTasks =
    document.getElementById(
        "pendingTasks"
    );

const completedTasks =
    document.getElementById(
        "completedTasks"
    );


/* =========================================================
   PAYMENT DOM
========================================================= */

const totalProjectValue =
    document.getElementById(
        "totalProjectValue"
    );

const paymentTotalPaid =
    document.getElementById(
        "paymentTotalPaid"
    );

const paymentOutstanding =
    document.getElementById(
        "paymentOutstanding"
    );

const paymentList =
    document.getElementById("paymentList");


/* =========================================================
   CALENDAR DOM
========================================================= */

const deadlineList =
    document.getElementById("deadlineList");


/* =========================================================
   THEME DOM
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const topThemeToggle =
    document.getElementById(
        "topThemeToggle"
    );

const settingsThemeToggle =
    document.getElementById(
        "settingsThemeToggle"
    );


/* =========================================================
   MOBILE DOM
========================================================= */

const mobileMenuBtn =
    document.getElementById(
        "mobileMenuBtn"
    );

const sidebar =
    document.getElementById("sidebar");

const sidebarOverlay =
    document.getElementById(
        "sidebarOverlay"
    );


/* =========================================================
   JOB MODAL DOM
========================================================= */

const jobModal =
    document.getElementById("jobModal");

const jobForm =
    document.getElementById("jobForm");

const jobModalTitle =
    document.getElementById(
        "jobModalTitle"
    );

const jobId =
    document.getElementById("jobId");

const jobName =
    document.getElementById("jobName");

const jobClient =
    document.getElementById("jobClient");

const jobBudget =
    document.getElementById("jobBudget");

const jobPaid =
    document.getElementById("jobPaid");

const jobDeadline =
    document.getElementById(
        "jobDeadline"
    );

const jobStatus =
    document.getElementById("jobStatus");

const jobProgress =
    document.getElementById(
        "jobProgress"
    );

const progressValue =
    document.getElementById(
        "progressValue"
    );

const previewPaymentStatus =
    document.getElementById(
        "previewPaymentStatus"
    );

const previewRemaining =
    document.getElementById(
        "previewRemaining"
    );


/* =========================================================
   CLIENT MODAL DOM
========================================================= */

const clientModal =
    document.getElementById(
        "clientModal"
    );

const clientForm =
    document.getElementById(
        "clientForm"
    );

const clientModalTitle =
    document.getElementById(
        "clientModalTitle"
    );

const clientId =
    document.getElementById(
        "clientId"
    );

const clientName =
    document.getElementById(
        "clientName"
    );

const clientEmail =
    document.getElementById(
        "clientEmail"
    );

const clientPhone =
    document.getElementById(
        "clientPhone"
    );

const clientCompany =
    document.getElementById(
        "clientCompany"
    );

const clientNotes =
    document.getElementById(
        "clientNotes"
    );


/* =========================================================
   TEAM MODAL DOM
========================================================= */

const memberModal =
    document.getElementById(
        "memberModal"
    );

const memberForm =
    document.getElementById(
        "memberForm"
    );

const memberModalTitle =
    document.getElementById(
        "memberModalTitle"
    );

const memberId =
    document.getElementById(
        "memberId"
    );

const memberName =
    document.getElementById(
        "memberName"
    );

const memberRole =
    document.getElementById(
        "memberRole"
    );

const memberEmail =
    document.getElementById(
        "memberEmail"
    );

const memberStatus =
    document.getElementById(
        "memberStatus"
    );

const memberNotes =
    document.getElementById(
        "memberNotes"
    );


/* =========================================================
   TASK MODAL DOM
========================================================= */

const taskModal =
    document.getElementById(
        "taskModal"
    );

const taskForm =
    document.getElementById(
        "taskForm"
    );

const taskModalTitle =
    document.getElementById(
        "taskModalTitle"
    );

const taskId =
    document.getElementById(
        "taskId"
    );

const taskTitle =
    document.getElementById(
        "taskTitle"
    );

const taskDescription =
    document.getElementById(
        "taskDescription"
    );

const taskProject =
    document.getElementById(
        "taskProject"
    );

const taskAssignee =
    document.getElementById(
        "taskAssignee"
    );

const taskPriority =
    document.getElementById(
        "taskPriority"
    );

const taskDueDate =
    document.getElementById(
        "taskDueDate"
    );

const taskStatus =
    document.getElementById(
        "taskStatus"
    );

const taskNotes =
    document.getElementById(
        "taskNotes"
    );


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

    team: "Team",

    clients: "Clients",

    payments: "Payments",

    calendar: "Calendar",

    settings: "Settings"

};


function showSection(sectionName) {

    if (!document.getElementById(sectionName)) {

        sectionName =
            "dashboard";

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
            link.dataset.section ===
            sectionName
        );

    });


    if (pageTitle) {

        pageTitle.textContent =
            sectionTitles[
                sectionName
            ] || "Dashboard";

    }


    switch (sectionName) {

        case "dashboard":

            renderDashboard();

            break;


        case "projects":

            filterJobs();

            break;


        case "tasks":

            populateTaskProjectOptions();

            populateTaskMemberOptions();

            filterTasks();

            break;


        case "team":

            filterTeamMembers();

            break;


        case "clients":

            filterClients();

            break;


        case "payments":

            displayPayments();

            break;


        case "calendar":

            displayDeadlines();

            break;

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
    .querySelectorAll(
        "[data-section-link]"
    )
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
        window.location.hash.replace(
            "#",
            ""
        );


    if (section) {

        showSection(section);

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

function displayJobs(jobList) {

    if (!jobsGrid) {
        return;
    }


    jobsGrid.innerHTML = "";


    if (!jobList.length) {

        emptyJobs.classList.remove(
            "hidden"
        );

        return;

    }


    emptyJobs.classList.add(
        "hidden"
    );


    jobList.forEach(job => {

        const budget =
            Number(job.budget) || 0;

        const paid =
            Math.min(
                Number(job.paid) || 0,
                budget
            );

        const balance =
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
            String(
                job.status ||
                "pending"
            ).toLowerCase();


        const paymentStatus =
            getPaymentStatus(
                budget,
                paid
            );


        const card =
            document.createElement(
                "article"
            );


        card.className =
            "job-card";


        card.innerHTML = `

            <div class="job-card-header">

                <div class="job-card-left">

                    <div class="job-icon">

                        <i class="bi ${safeIcon(
                            job.icon
                        )}"></i>

                    </div>

                    <div class="job-card-title">

                        <h3>
                            ${escapeHTML(
                                job.name
                            )}
                        </h3>

                        <div class="client-name">
                            ${escapeHTML(
                                job.client
                            )}
                        </div>

                    </div>

                </div>

                <span class="status status-${safeStatus(
                    status
                )}">

                    ${capitalize(
                        status
                    )}

                </span>

            </div>


            <div class="job-details">

                <div class="job-detail">

                    <span>
                        Budget
                    </span>

                    <strong>
                        ${formatMoney(
                            budget
                        )}
                    </strong>

                </div>


                <div class="job-detail">

                    <span>
                        Paid
                    </span>

                    <strong class="payment-paid">

                        ${formatMoney(
                            paid
                        )}

                    </strong>

                </div>

            </div>


            <div class="progress-section">

                <div class="progress-top">

                    <span>
                        Progress
                    </span>

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

                    <span>
                        Payment
                    </span>

                    <strong>
                        ${paymentStatus}
                    </strong>

                </div>


                <div class="payment-row">

                    <span>
                        Remaining
                    </span>

                    <strong class="${
                        balance > 0
                            ? "payment-due"
                            : "payment-paid"
                    }">

                        ${formatMoney(
                            balance
                        )}

                    </strong>

                </div>

            </div>


            <div class="job-footer">

                <div class="deadline">

                    <i class="bi bi-calendar3"></i>

                    ${formatDate(
                        job.deadline
                    )}

                </div>


                <div class="card-actions">

                    <button
                        type="button"
                        class="card-btn edit-job"
                        data-id="${job.id}"
                        title="Edit"
                    >

                        <i class="bi bi-pencil"></i>

                    </button>


                    <button
                        type="button"
                        class="card-btn delete delete-job"
                        data-id="${job.id}"
                        title="Delete"
                    >

                        <i class="bi bi-trash"></i>

                    </button>

                </div>

            </div>

        `;


        jobsGrid.appendChild(card);

    });


    attachJobActions();

}


function attachJobActions() {

    document
        .querySelectorAll(".edit-job")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editJob(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });


    document
        .querySelectorAll(".delete-job")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteJob(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });

}


function getPaymentStatus(
    budget,
    paid
) {

    if (budget <= 0) {

        return "Payment Pending";

    }


    if (paid >= budget) {

        return "Fully Paid";

    }


    if (paid > 0) {

        return "Partially Paid";

    }


    return "Payment Pending";

}


function updateStats() {

    const total =
        jobs.length;


    const completed =
        jobs.filter(
            job =>
                String(job.status)
                    .toLowerCase() ===
                "completed"
        ).length;


    const paid =
        jobs.reduce(
            (sum, job) =>
                sum +
                Math.min(
                    Number(job.paid) || 0,
                    Number(job.budget) || 0
                ),
            0
        );


    const outstanding =
        jobs.reduce(
            (sum, job) =>
                sum +
                Math.max(
                    Number(job.budget) || 0 -
                    Number(job.paid) || 0,
                    0
                ),
            0
        );


    if (totalJobs) {
        totalJobs.textContent = total;
    }

    if (completedJobs) {
        completedJobs.textContent =
            completed;
    }

    if (totalPaid) {
        totalPaid.textContent =
            formatMoney(paid);
    }

    if (outstandingAmount) {
        outstandingAmount.textContent =
            formatMoney(
                outstanding
            );
    }


    if (totalProjectValue) {

        totalProjectValue.textContent =
            formatMoney(
                jobs.reduce(
                    (sum, job) =>
                        sum +
                        (
                            Number(
                                job.budget
                            ) || 0
                        ),
                    0
                )
            );

    }


    if (paymentTotalPaid) {

        paymentTotalPaid.textContent =
            formatMoney(paid);

    }


    if (paymentOutstanding) {

        paymentOutstanding.textContent =
            formatMoney(
                outstanding
            );

    }

}


function filterJobs() {

    if (!jobSearch) {
        return;
    }


    const search =
        jobSearch.value
            .trim()
            .toLowerCase();


    const status =
        statusFilter.value;


    const payment =
        paymentFilter.value;


    const filtered =
        jobs.filter(job => {

            const matchesSearch =

                String(job.name)
                    .toLowerCase()
                    .includes(search)

                ||

                String(job.client)
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =

                status === "all" ||

                String(job.status)
                    .toLowerCase() ===
                status;


            let matchesPayment =
                true;


            if (payment !== "all") {

                const paymentStatus =
                    getPaymentStatus(
                        Number(job.budget) || 0,
                        Number(job.paid) || 0
                    );


                if (payment === "paid") {

                    matchesPayment =
                        paymentStatus ===
                        "Fully Paid";

                }


                if (payment === "partial") {

                    matchesPayment =
                        paymentStatus ===
                        "Partially Paid";

                }


                if (payment === "pending") {

                    matchesPayment =
                        paymentStatus ===
                        "Payment Pending";

                }

            }


            return (
                matchesSearch &&
                matchesStatus &&
                matchesPayment
            );

        });


    displayJobs(filtered);

}


function openAddModal() {

    jobForm.reset();

    jobId.value = "";

    jobModalTitle.textContent =
        "Add New Job";

    jobPaid.value = "0";

    jobProgress.value = "0";

    progressValue.textContent =
        "0%";

    updatePaymentPreview();

    openModal(jobModal);

}


function editJob(id) {

    const job =
        jobs.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!job) {
        return;
    }


    jobModalTitle.textContent =
        "Edit Job";


    jobId.value =
        job.id;

    jobName.value =
        job.name || "";

    jobClient.value =
        job.client || "";

    jobBudget.value =
        job.budget ?? 0;

    jobPaid.value =
        job.paid ?? 0;

    jobDeadline.value =
        job.deadline || "";

    jobStatus.value =
        job.status || "active";

    jobProgress.value =
        job.progress ?? 0;

    progressValue.textContent =
        `${job.progress ?? 0}%`;

    updatePaymentPreview();

    openModal(jobModal);

}


function deleteJob(id) {

    const job =
        jobs.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!job) {
        return;
    }


    const attachedTasks =
        tasks.filter(
            task =>
                Number(task.projectId) ===
                Number(id)
        );


    if (attachedTasks.length) {

        const confirmed =
            window.confirm(
                `"${job.name}" has ${attachedTasks.length} attached task${
                    attachedTasks.length === 1
                        ? ""
                        : "s"
                }.\n\nDelete the project and leave those tasks without a project?`
            );


        if (!confirmed) {
            return;
        }


        tasks =
            tasks.map(task => {

                if (
                    Number(task.projectId) ===
                    Number(id)
                ) {

                    return {
                        ...task,
                        projectId: ""
                    };

                }

                return task;

            });


        saveTasks();

    } else {

        const confirmed =
            window.confirm(
                `Delete "${job.name}"?`
            );


        if (!confirmed) {
            return;
        }

    }


    jobs =
        jobs.filter(
            item =>
                Number(item.id) !==
                Number(id)
        );


    saveJobs();

    renderAll();

}


/* =========================================================
   JOB FORM
========================================================= */

jobForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            jobName.value.trim();

        const client =
            jobClient.value.trim();

        if (!name || !client) {
            return;
        }


        const budget =
            Math.max(
                Number(
                    jobBudget.value
                ) || 0,
                0
            );


        const paid =
            Math.min(
                Math.max(
                    Number(
                        jobPaid.value
                    ) || 0,
                    0
                ),
                budget
            );


        const deadline =
            jobDeadline.value;


        const status =
            jobStatus.value;


        let progress =
            Number(
                jobProgress.value
            ) || 0;


        if (
            status ===
            "completed"
        ) {

            progress = 100;

        }


        progress =
            Math.min(
                Math.max(
                    progress,
                    0
                ),
                100
            );


        const existingId =
            jobId.value;


        if (existingId) {

            const index =
                jobs.findIndex(
                    item =>
                        Number(item.id) ===
                        Number(existingId)
                );


            if (index !== -1) {

                jobs[index] = {

                    ...jobs[index],

                    name,

                    client,

                    budget,

                    paid,

                    deadline,

                    status,

                    progress

                };

            }

        } else {

            jobs.push({

                id: Date.now(),

                name,

                client,

                budget,

                paid,

                deadline,

                status,

                progress,

                icon:
                    getRandomIcon()

            });

        }


        saveJobs();

        closeModal(jobModal);

        renderAll();

        showSection("projects");

    }
);


/* =========================================================
   PAYMENT PREVIEW
========================================================= */

function updatePaymentPreview() {

    const budget =
        Number(
            jobBudget.value
        ) || 0;


    const paid =
        Math.min(
            Number(
                jobPaid.value
            ) || 0,
            budget
        );


    const remaining =
        Math.max(
            budget - paid,
            0
        );


    if (previewPaymentStatus) {

        previewPaymentStatus.textContent =
            getPaymentStatus(
                budget,
                paid
            );

    }


    if (previewRemaining) {

        previewRemaining.textContent =
            formatMoney(
                remaining
            );

    }

}


jobBudget.addEventListener(
    "input",
    updatePaymentPreview
);


jobPaid.addEventListener(
    "input",
    updatePaymentPreview
);


jobProgress.addEventListener(
    "input",
    () => {

        progressValue.textContent =
            `${jobProgress.value}%`;

    }
);


jobStatus.addEventListener(
    "change",
    () => {

        if (
            jobStatus.value ===
            "completed"
        ) {

            jobProgress.value =
                100;

            progressValue.textContent =
                "100%";

        }

    }
);


/* =========================================================
   CLIENTS
========================================================= */

function displayClients(clientList) {

    clientsGrid.innerHTML = "";


    if (!clientList.length) {

        emptyClients.classList.remove(
            "hidden"
        );

        return;

    }


    emptyClients.classList.add(
        "hidden"
    );


    clientList.forEach(client => {

        const clientJobs =
            jobs.filter(
                job =>
                    String(job.client)
                        .toLowerCase() ===
                    String(client.name)
                        .toLowerCase()
            );


        const card =
            document.createElement(
                "article"
            );


        card.className =
            "client-card";


        card.innerHTML = `

            <div class="client-card-top">

                <div class="client-card-main">

                    <div class="client-avatar">

                        ${getInitials(
                            client.name
                        )}

                    </div>

                    <div>

                        <h3>
                            ${escapeHTML(
                                client.name
                            )}
                        </h3>

                        <div class="client-company">

                            ${escapeHTML(
                                client.company ||
                                "Independent Client"
                            )}

                        </div>

                    </div>

                </div>


                <span class="status status-${safeStatus(
                    client.status ||
                    "active"
                )}">

                    ${capitalize(
                        client.status ||
                        "active"
                    )}

                </span>

            </div>


            <div class="client-contact">

                ${
                    client.email
                        ? `
                            <div>

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
                            <div>

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


            <p class="client-notes">

                ${
                    client.notes
                        ? escapeHTML(
                            client.notes
                        )
                        : "No notes added."
                }

            </p>


            <div class="client-card-footer">

                <span class="client-company">

                    ${clientJobs.length}

                    ${
                        clientJobs.length === 1
                            ? " project"
                            : " projects"
                    }

                </span>


                <div class="card-actions">

                    <button
                        type="button"
                        class="card-btn edit-client"
                        data-id="${client.id}"
                        title="Edit client"
                    >

                        <i class="bi bi-pencil"></i>

                    </button>


                    <button
                        type="button"
                        class="card-btn delete delete-client"
                        data-id="${client.id}"
                        title="Delete client"
                    >

                        <i class="bi bi-trash"></i>

                    </button>

                </div>

            </div>

        `;


        clientsGrid.appendChild(card);

    });


    attachClientActions();

}


function attachClientActions() {

    document
        .querySelectorAll(
            ".edit-client"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editClient(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });


    document
        .querySelectorAll(
            ".delete-client"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteClient(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });

}


function updateClientStats() {

    if (totalClients) {

        totalClients.textContent =
            clients.length;

    }


    if (activeClients) {

        activeClients.textContent =
            clients.filter(
                client =>
                    String(
                        client.status
                    ).toLowerCase() ===
                    "active"
            ).length;

    }


    if (completedClients) {

        completedClients.textContent =
            clients.filter(
                client =>
                    String(
                        client.status
                    ).toLowerCase() ===
                    "completed"
            ).length;

    }

}


function filterClients() {

    const search =
        clientSearch.value
            .trim()
            .toLowerCase();


    const filtered =
        clients.filter(client => {

            return (

                String(
                    client.name
                )
                    .toLowerCase()
                    .includes(search)

                ||

                String(
                    client.email
                )
                    .toLowerCase()
                    .includes(search)

                ||

                String(
                    client.company
                )
                    .toLowerCase()
                    .includes(search)

            );

        });


    displayClients(filtered);

}


function openClientModal() {

    clientForm.reset();

    clientId.value = "";

    clientModalTitle.textContent =
        "Add New Client";

    openModal(clientModal);

}


function editClient(id) {

    const client =
        clients.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!client) {
        return;
    }


    clientModalTitle.textContent =
        "Edit Client";


    clientId.value =
        client.id;

    clientName.value =
        client.name || "";

    clientEmail.value =
        client.email || "";

    clientPhone.value =
        client.phone || "";

    clientCompany.value =
        client.company || "";

    clientNotes.value =
        client.notes || "";


    openModal(clientModal);

}


function deleteClient(id) {

    const client =
        clients.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!client) {
        return;
    }


    const attachedJobs =
        jobs.filter(
            job =>
                String(
                    job.client
                ).toLowerCase() ===
                String(
                    client.name
                ).toLowerCase()
        );


    if (attachedJobs.length) {

        alert(
            `You cannot delete ${client.name} because ${attachedJobs.length} project${
                attachedJobs.length === 1
                    ? ""
                    : "s"
            } is attached to this client.`
        );

        return;

    }


    const confirmed =
        window.confirm(
            `Delete client "${client.name}"?`
        );


    if (!confirmed) {
        return;
    }


    clients =
        clients.filter(
            item =>
                Number(item.id) !==
                Number(id)
        );


    saveClients();

    renderAll();

}


clientForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            clientName.value.trim();


        if (!name) {
            return;
        }


        const existingId =
            clientId.value;


        if (existingId) {

            const index =
                clients.findIndex(
                    item =>
                        Number(item.id) ===
                        Number(existingId)
                );


            if (index !== -1) {

                const oldName =
                    clients[index].name;


                clients[index] = {

                    ...clients[index],

                    name,

                    email:
                        clientEmail.value.trim(),

                    phone:
                        clientPhone.value.trim(),

                    company:
                        clientCompany.value.trim(),

                    notes:
                        clientNotes.value.trim()

                };


                jobs =
                    jobs.map(job => {

                        if (
                            String(
                                job.client
                            ).toLowerCase() ===
                            String(
                                oldName
                            ).toLowerCase()
                        ) {

                            return {

                                ...job,

                                client: name

                            };

                        }

                        return job;

                    });


                saveJobs();

            }

        } else {

            clients.push({

                id: Date.now(),

                name,

                email:
                    clientEmail.value.trim(),

                phone:
                    clientPhone.value.trim(),

                company:
                    clientCompany.value.trim(),

                notes:
                    clientNotes.value.trim(),

                status:
                    "active"

            });

        }


        saveClients();

        closeModal(clientModal);

        renderAll();

        showSection("clients");

    }
);


/* =========================================================
   TEAM
========================================================= */

function updateTeamStats() {

    const active =
        teamMembers.filter(
            member =>
                String(
                    member.status
                ).toLowerCase() ===
                "active"
        ).length;


    const assigned =
        tasks.filter(
            task =>
                task.assigneeId !==
                "" &&
                task.assigneeId !==
                null &&
                task.assigneeId !==
                undefined
        ).length;


    const completed =
        tasks.filter(
            task =>
                String(
                    task.status
                ).toLowerCase() ===
                "completed"
        ).length;


    if (totalTeamMembers) {

        totalTeamMembers.textContent =
            teamMembers.length;

    }


    if (activeTeamMembers) {

        activeTeamMembers.textContent =
            active;

    }


    if (assignedTeamTasks) {

        assignedTeamTasks.textContent =
            assigned;

    }


    if (teamCompletedTasks) {

        teamCompletedTasks.textContent =
            completed;

    }


    if (dashboardTeamCount) {

        dashboardTeamCount.textContent =
            teamMembers.length;

    }

}


function displayTeamMembers(
    memberList
) {

    if (!teamGrid) {
        return;
    }


    teamGrid.innerHTML = "";


    if (!memberList.length) {

        emptyTeam.classList.remove(
            "hidden"
        );

        return;

    }


    emptyTeam.classList.add(
        "hidden"
    );


    memberList.forEach(member => {

        const memberTasks =
            tasks.filter(
                task =>
                    Number(
                        task.assigneeId
                    ) ===
                    Number(
                        member.id
                    )
            );


        const completed =
            memberTasks.filter(
                task =>
                    String(
                        task.status
                    ).toLowerCase() ===
                    "completed"
            ).length;


        const status =
            String(
                member.status ||
                "active"
            ).toLowerCase();


        const card =
            document.createElement(
                "article"
            );


        card.className =
            "team-card";


        card.innerHTML = `

            <div class="team-card-header">

                <div class="team-member-info">

                    <div class="team-avatar">

                        ${getInitials(
                            member.name
                        )}

                    </div>


                    <div>

                        <h3>
                            ${escapeHTML(
                                member.name
                            )}
                        </h3>

                        <span>

                            ${escapeHTML(
                                member.email ||
                                "No email"
                            )}

                        </span>

                    </div>

                </div>


                <span class="team-role">

                    ${escapeHTML(
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
                            "active"
                                ? ""
                                : "inactive"
                        }"
                    >

                        ${capitalize(
                            status
                        )}

                    </strong>

                </div>


                <div class="team-card-row">

                    <span>
                        Assigned Tasks
                    </span>

                    <strong>
                        ${memberTasks.length}
                    </strong>

                </div>


                <div class="team-card-row">

                    <span>
                        Completed
                    </span>

                    <strong>
                        ${completed}
                    </strong>

                </div>

            </div>


            ${
                member.notes
                    ? `
                        <p class="client-notes">

                            ${escapeHTML(
                                member.notes
                            )}

                        </p>
                    `
                    : ""
            }


            <div class="team-card-footer">

                <span class="team-card-email">

                    ${escapeHTML(
                        member.email ||
                        "No email provided"
                    )}

                </span>


                <div class="team-card-actions">

                    <button
                        type="button"
                        class="card-btn edit-member"
                        data-id="${member.id}"
                        title="Edit member"
                    >

                        <i class="bi bi-pencil"></i>

                    </button>


                    <button
                        type="button"
                        class="card-btn delete delete-member"
                        data-id="${member.id}"
                        title="Delete member"
                    >

                        <i class="bi bi-trash"></i>

                    </button>

                </div>

            </div>

        `;


        teamGrid.appendChild(card);

    });


    attachTeamActions();

}


function attachTeamActions() {

    document
        .querySelectorAll(
            ".edit-member"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editTeamMember(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });


    document
        .querySelectorAll(
            ".delete-member"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteTeamMember(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });

}


function filterTeamMembers() {

    const search =
        teamSearch.value
            .trim()
            .toLowerCase();


    const filtered =
        teamMembers.filter(
            member => {

                return (

                    String(
                        member.name
                    )
                        .toLowerCase()
                        .includes(search)

                    ||

                    String(
                        member.role
                    )
                        .toLowerCase()
                        .includes(search)

                    ||

                    String(
                        member.email
                    )
                        .toLowerCase()
                        .includes(search)

                );

            }
        );


    displayTeamMembers(
        filtered
    );

    updateTeamStats();

}


function openMemberModal() {

    memberForm.reset();

    memberId.value = "";

    memberModalTitle.textContent =
        "Add Team Member";

    openModal(memberModal);

}


function editTeamMember(id) {

    const member =
        teamMembers.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!member) {
        return;
    }


    memberModalTitle.textContent =
        "Edit Team Member";


    memberId.value =
        member.id;

    memberName.value =
        member.name || "";

    memberRole.value =
        member.role || "";

    memberEmail.value =
        member.email || "";

    memberStatus.value =
        member.status ||
        "active";

    memberNotes.value =
        member.notes || "";


    openModal(memberModal);

}


function deleteTeamMember(id) {

    const member =
        teamMembers.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!member) {
        return;
    }


    const assignedTasks =
        tasks.filter(
            task =>
                Number(
                    task.assigneeId
                ) ===
                Number(id)
        );


    if (assignedTasks.length) {

        const confirmed =
            window.confirm(
                `${member.name} has ${assignedTasks.length} assigned task${
                    assignedTasks.length === 1
                        ? ""
                        : "s"
                }.\n\nDelete the member and leave those tasks unassigned?`
            );


        if (!confirmed) {
            return;
        }


        tasks =
            tasks.map(task => {

                if (
                    Number(
                        task.assigneeId
                    ) ===
                    Number(id)
                ) {

                    return {

                        ...task,

                        assigneeId: ""

                    };

                }

                return task;

            });


        saveTasks();

    } else {

        const confirmed =
            window.confirm(
                `Delete team member "${member.name}"?`
            );


        if (!confirmed) {
            return;
        }

    }


    teamMembers =
        teamMembers.filter(
            item =>
                Number(item.id) !==
                Number(id)
        );


    saveTeamMembers();

    renderAll();

}


memberForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            memberName.value.trim();


        if (!name) {
            return;
        }


        const existingId =
            memberId.value;


        const data = {

            name,

            role:
                memberRole.value.trim(),

            email:
                memberEmail.value.trim(),

            status:
                memberStatus.value ||
                "active",

            notes:
                memberNotes.value.trim()

        };


        if (existingId) {

            const index =
                teamMembers.findIndex(
                    member =>
                        Number(
                            member.id
                        ) ===
                        Number(
                            existingId
                        )
                );


            if (index !== -1) {

                teamMembers[index] = {

                    ...teamMembers[index],

                    ...data

                };

            }

        } else {

            teamMembers.push({

                id: Date.now(),

                ...data

            });

        }


        saveTeamMembers();

        closeModal(memberModal);

        renderAll();

        showSection("team");

    }
);


/* =========================================================
   TASK HELPERS
========================================================= */

function getTaskStatusLabel(
    status
) {

    const labels = {

        todo: "To Do",

        progress: "In Progress",

        review: "Review",

        completed: "Completed"

    };


    return (
        labels[status] ||
        capitalize(status)
    );

}


function getTaskPriorityLabel(
    priority
) {

    const labels = {

        low: "Low",

        medium: "Medium",

        high: "High",

        urgent: "Urgent"

    };


    return (
        labels[priority] ||
        capitalize(priority)
    );

}


function getTaskProject(
    task
) {

    return jobs.find(
        job =>
            Number(job.id) ===
            Number(task.projectId)
    );

}


function getTaskAssignee(
    task
) {

    return teamMembers.find(
        member =>
            Number(member.id) ===
            Number(task.assigneeId)
    );

}


function isTaskOverdue(task) {

    if (
        !task.dueDate ||
        task.status ===
        "completed"
    ) {

        return false;

    }


    const due =
        new Date(
            `${task.dueDate}T23:59:59`
        );


    return (
        !Number.isNaN(
            due.getTime()
        ) &&
        due < new Date()
    );

}


/* =========================================================
   TASK STATS
========================================================= */

function updateTaskStats() {

    const total =
        tasks.length;


    const progress =
        tasks.filter(
            task =>
                task.status ===
                "progress"
        ).length;


    const pending =
        tasks.filter(
            task =>
                task.status ===
                "todo"
        ).length;


    const completed =
        tasks.filter(
            task =>
                task.status ===
                "completed"
        ).length;


    if (totalTasks) {

        totalTasks.textContent =
            total;

    }


    if (inProgressTasks) {

        inProgressTasks.textContent =
            progress;

    }


    if (pendingTasks) {

        pendingTasks.textContent =
            pending;

    }


    if (completedTasks) {

        completedTasks.textContent =
            completed;

    }


    if (dashboardTaskCount) {

        dashboardTaskCount.textContent =
            total;

    }


    if (dashboardActiveTasks) {

        dashboardActiveTasks.textContent =
            total - completed;

    }


    if (dashboardCompletedTasks) {

        dashboardCompletedTasks.textContent =
            completed;

    }

}


/* =========================================================
   TASK DISPLAY
========================================================= */

function displayTasks(
    taskList
) {

    if (!tasksGrid) {
        return;
    }


    tasksGrid.innerHTML = "";


    if (!taskList.length) {

        emptyTasks.classList.remove(
            "hidden"
        );

        return;

    }


    emptyTasks.classList.add(
        "hidden"
    );


    /*
     * We use the existing .tasks-board
     * structure from your CSS.
     */

    const columns = {

        todo: createTaskColumn(
            "To Do",
            "bi-list-task",
            "todo"
        ),

        progress: createTaskColumn(
            "In Progress",
            "bi-arrow-repeat",
            "progress"
        ),

        review: createTaskColumn(
            "Review",
            "bi-eye",
            "review"
        ),

        completed: createTaskColumn(
            "Completed",
            "bi-check-circle",
            "completed"
        )

    };


    taskList.forEach(task => {

        const status =
            columns[task.status]
                ? task.status
                : "todo";


        columns[status]
            .querySelector(
                ".task-list"
            )
            .appendChild(
                createTaskCard(task)
            );


        const count =
            columns[status]
                .querySelector(
                    ".task-count"
                );


        count.textContent =
            columns[status]
                .querySelectorAll(
                    ".task-card"
                ).length;

    });


    Object.values(columns)
        .forEach(column => {

            tasksGrid.appendChild(
                column
            );

        });

}


function createTaskColumn(
    title,
    icon,
    status
) {

    const column =
        document.createElement(
            "div"
        );


    column.className =
        "task-column";


    column.innerHTML = `

        <div class="task-column-header">

            <div class="task-column-title">

                <i class="bi ${icon}"></i>

                <h3>
                    ${title}
                </h3>

                <span class="task-count">
                    0
                </span>

            </div>

        </div>


        <div class="task-list"></div>

    `;


    return column;

}


function createTaskCard(
    task
) {

    const project =
        getTaskProject(task);


    const assignee =
        getTaskAssignee(task);


    const priority =
        String(
            task.priority ||
            "medium"
        ).toLowerCase();


    const overdue =
        isTaskOverdue(task);


    const card =
        document.createElement(
            "article"
        );


    card.className =
        "task-card";


    const status =
        String(
            task.status ||
            "todo"
        ).toLowerCase();


    let progress = 0;


    if (status === "progress") {
        progress = 50;
    }

    if (status === "review") {
        progress = 80;
    }

    if (status === "completed") {
        progress = 100;
    }


    card.innerHTML = `

        <div class="task-card-header">

            <h4>
                ${escapeHTML(
                    task.title ||
                    "Untitled Task"
                )}
            </h4>


            <span class="task-priority ${safePriority(
                priority
            )}">

                ${getTaskPriorityLabel(
                    priority
                )}

            </span>

        </div>


        ${
            task.description
                ? `
                    <p class="task-description">

                        ${escapeHTML(
                            task.description
                        )}

                    </p>
                `
                : ""
        }


        <div class="task-meta">

            <span class="task-project">

                <i class="bi bi-folder"></i>

                ${
                    project
                        ? escapeHTML(
                            project.name
                        )
                        : "No project"
                }

            </span>

        </div>


        <div class="task-progress">

            <div class="task-progress-top">

                <span>
                    Progress
                </span>

                <strong>
                    ${progress}%
                </strong>

            </div>


            <div class="task-progress-bar">

                <div
                    class="task-progress-fill"
                    style="width:${progress}%"
                ></div>

            </div>

        </div>


        <div class="task-footer">

            <div class="task-assignee">

                <div class="task-assignee-avatar">

                    ${
                        assignee
                            ? getInitials(
                                assignee.name
                            )
                            : "?"
                    }

                </div>


                <span>

                    ${
                        assignee
                            ? escapeHTML(
                                assignee.name
                            )
                            : "Unassigned"
                    }

                </span>

            </div>


            ${
                task.dueDate
                    ? `
                        <div class="task-due-date ${
                            overdue
                                ? "overdue"
                                : ""
                        }">

                            <i class="bi bi-calendar3"></i>

                            ${formatDate(
                                task.dueDate
                            )}

                        </div>
                    `
                    : ""
            }


            <div class="task-actions">

                <button
                    type="button"
                    class="task-action-btn edit-task"
                    data-id="${task.id}"
                    title="Edit task"
                >

                    <i class="bi bi-pencil"></i>

                </button>


                <button
                    type="button"
                    class="task-action-btn delete delete-task"
                    data-id="${task.id}"
                    title="Delete task"
                >

                    <i class="bi bi-trash"></i>

                </button>

            </div>

        </div>

    `;


    return card;

}


function attachTaskActions() {

    document
        .querySelectorAll(
            ".edit-task"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editTask(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });


    document
        .querySelectorAll(
            ".delete-task"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    deleteTask(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });

}


/* =========================================================
   TASK FILTERING
========================================================= */

function filterTasks() {

    const search =
        taskSearch.value
            .trim()
            .toLowerCase();


    const status =
        taskStatusFilter.value;


    const priority =
        taskPriorityFilter.value;


    const member =
        taskMemberFilter.value;


    const filtered =
        tasks.filter(task => {

            const project =
                getTaskProject(task);


            const assignee =
                getTaskAssignee(task);


            const searchable = [

                task.title,

                task.description,

                task.notes,

                project?.name,

                assignee?.name

            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();


            const matchesSearch =
                searchable.includes(
                    search
                );


            const matchesStatus =
                status === "all" ||
                task.status === status;


            const matchesPriority =
                priority === "all" ||
                task.priority === priority;


            const matchesMember =
                member === "all" ||
                String(
                    task.assigneeId
                ) === String(member);


            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority &&
                matchesMember
            );

        });


    displayTasks(filtered);

    updateTaskStats();

    attachTaskActions();

}


/* =========================================================
   TASK SELECT OPTIONS
========================================================= */

function populateTaskProjectOptions() {

    if (!taskProject) {
        return;
    }


    const currentValue =
        taskProject.value;


    taskProject.innerHTML = `

        <option value="">
            No Project
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
            `${job.name} — ${job.client}`;


        taskProject.appendChild(
            option
        );

    });


    if (
        jobs.some(
            job =>
                String(job.id) ===
                String(currentValue)
        )
    ) {

        taskProject.value =
            currentValue;

    }

}


function populateTaskMemberOptions() {

    if (!taskAssignee) {
        return;
    }


    const currentValue =
        taskAssignee.value;


    taskAssignee.innerHTML = `

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
            `${member.name}${
                member.role
                    ? ` — ${member.role}`
                    : ""
            }`;


        taskAssignee.appendChild(
            option
        );

    });


    if (
        teamMembers.some(
            member =>
                String(member.id) ===
                String(currentValue)
        )
    ) {

        taskAssignee.value =
            currentValue;

    }

}


function populateTaskMemberFilter() {

    if (!taskMemberFilter) {
        return;
    }


    const currentValue =
        taskMemberFilter.value;


    taskMemberFilter.innerHTML = `

        <option value="all">
            All Members
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


        taskMemberFilter.appendChild(
            option
        );

    });


    const exists =
        teamMembers.some(
            member =>
                String(member.id) ===
                String(currentValue)
        );


    taskMemberFilter.value =
        exists
            ? currentValue
            : "all";

}


/* =========================================================
   TASK MODAL
========================================================= */

function openTaskModal() {

    taskForm.reset();

    taskId.value = "";

    taskModalTitle.textContent =
        "Add New Task";


    populateTaskProjectOptions();

    populateTaskMemberOptions();


    openModal(taskModal);

}


function editTask(id) {

    const task =
        tasks.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!task) {
        return;
    }


    taskModalTitle.textContent =
        "Edit Task";


    taskId.value =
        task.id;


    taskTitle.value =
        task.title || "";


    taskDescription.value =
        task.description || "";


    populateTaskProjectOptions();

    populateTaskMemberOptions();


    taskProject.value =
        task.projectId || "";


    taskAssignee.value =
        task.assigneeId || "";


    taskPriority.value =
        task.priority ||
        "medium";


    taskDueDate.value =
        task.dueDate || "";


    taskStatus.value =
        task.status ||
        "todo";


    taskNotes.value =
        task.notes || "";


    openModal(taskModal);

}


function deleteTask(id) {

    const task =
        tasks.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!task) {
        return;
    }


    const confirmed =
        window.confirm(
            `Delete task "${task.title}"?`
        );


    if (!confirmed) {
        return;
    }


    tasks =
        tasks.filter(
            item =>
                Number(item.id) !==
                Number(id)
        );


    saveTasks();

    renderAll();

}


/* =========================================================
   TASK FORM
========================================================= */

taskForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const title =
            taskTitle.value.trim();


        if (!title) {
            return;
        }


        const data = {

            title,

            description:
                taskDescription.value.trim(),

            projectId:
                taskProject.value || "",

            assigneeId:
                taskAssignee.value || "",

            priority:
                taskPriority.value ||
                "medium",

            dueDate:
                taskDueDate.value || "",

            status:
                taskStatus.value ||
                "todo",

            notes:
                taskNotes.value.trim()

        };


        const existingId =
            taskId.value;


        if (existingId) {

            const index =
                tasks.findIndex(
                    item =>
                        Number(item.id) ===
                        Number(existingId)
                );


            if (index !== -1) {

                tasks[index] = {

                    ...tasks[index],

                    ...data

                };

            }

        } else {

            tasks.push({

                id: Date.now(),

                ...data

            });

        }


        saveTasks();

        closeModal(taskModal);

        renderAll();

        showSection("tasks");

    }
);


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    updateStats();

    updateClientStats();

    updateTeamStats();

    updateTaskStats();


    /* -----------------------------------------------------
       Recent Projects
    ----------------------------------------------------- */

    const latestJobs =
        [...jobs]
            .sort(
                (a, b) =>
                    Number(b.id) -
                    Number(a.id)
            )
            .slice(0, 5);


    recentProjects.innerHTML =
        "";


    if (!latestJobs.length) {

        recentProjects.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">

                    <i class="bi bi-kanban"></i>

                </div>

                <p>
                    No projects yet.
                </p>

            </div>

        `;

    } else {

        latestJobs.forEach(job => {

            recentProjects.innerHTML += `

                <div class="recent-project-item">

                    <div class="project-mini-icon">

                        <i class="bi ${safeIcon(
                            job.icon
                        )}"></i>

                    </div>


                    <div class="project-mini-info">

                        <strong>

                            ${escapeHTML(
                                job.name
                            )}

                        </strong>


                        <span>

                            ${escapeHTML(
                                job.client
                            )}

                        </span>

                    </div>


                    <span class="status status-${safeStatus(
                        job.status ||
                        "pending"
                    )}">

                        ${capitalize(
                            job.status ||
                            "pending"
                        )}

                    </span>

                </div>

            `;

        });

    }


    /* -----------------------------------------------------
       Dashboard Clients
    ----------------------------------------------------- */

    dashboardClients.innerHTML =
        "";


    clients
        .slice(0, 5)
        .forEach(client => {

            dashboardClients.innerHTML += `

                <div class="dashboard-client-item">

                    <div class="client-mini-avatar">

                        ${getInitials(
                            client.name
                        )}

                    </div>


                    <div class="client-mini-info">

                        <strong>

                            ${escapeHTML(
                                client.name
                            )}

                        </strong>


                        <span>

                            ${escapeHTML(
                                client.company ||
                                "Client"
                            )}

                        </span>

                    </div>


                    <span class="status status-${safeStatus(
                        client.status ||
                        "active"
                    )}">

                        ${capitalize(
                            client.status ||
                            "active"
                        )}

                    </span>

                </div>

            `;

        });


    /* -----------------------------------------------------
       Dashboard Tasks
    ----------------------------------------------------- */

    if (!dashboardTasks) {
        return;
    }


    dashboardTasks.innerHTML =
        "";


    const latestTasks =
        [...tasks]
            .sort(
                (a, b) =>
                    Number(b.id) -
                    Number(a.id)
            )
            .slice(0, 5);


    if (!latestTasks.length) {

        dashboardTasks.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">

                    <i class="bi bi-check2-square"></i>

                </div>

                <p>
                    No tasks yet.
                </p>

            </div>

        `;

        return;

    }


    latestTasks.forEach(task => {

        const project =
            getTaskProject(task);


        const assignee =
            getTaskAssignee(task);


        dashboardTasks.innerHTML += `

            <div class="recent-project-item">

                <div class="project-mini-icon">

                    <i class="bi bi-check2-square"></i>

                </div>


                <div class="project-mini-info">

                    <strong>

                        ${escapeHTML(
                            task.title
                        )}

                    </strong>


                    <span>

                        ${
                            assignee
                                ? escapeHTML(
                                    assignee.name
                                )
                                : "Unassigned"
                        }

                        ${
                            project
                                ? ` • ${escapeHTML(
                                    project.name
                                )}`
                                : ""
                        }

                    </span>

                </div>


                <span class="status status-${
                    task.status ===
                    "completed"
                        ? "completed"
                        : task.status ===
                          "todo"
                            ? "pending"
                            : "active"
                }">

                    ${getTaskStatusLabel(
                        task.status
                    )}

                </span>

            </div>

        `;

    });

}


/* =========================================================
   PAYMENTS
========================================================= */

function displayPayments() {

    updateStats();


    paymentList.innerHTML =
        "";


    if (!jobs.length) {

        paymentList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">

                    <i class="bi bi-wallet2"></i>

                </div>

                <h3>
                    No payment records
                </h3>

                <p>
                    Add a project to start tracking payments.
                </p>

            </div>

        `;

        return;

    }


    jobs.forEach(job => {

        const budget =
            Number(job.budget) || 0;


        const paid =
            Math.min(
                Number(job.paid) || 0,
                budget
            );


        const balance =
            Math.max(
                budget - paid,
                0
            );


        const paymentStatus =
            getPaymentStatus(
                budget,
                paid
            );


        let statusClass =
            "pending";


        if (
            paymentStatus ===
            "Fully Paid"
        ) {

            statusClass =
                "paid";

        } else if (
            paymentStatus ===
            "Partially Paid"
        ) {

            statusClass =
                "partial";

        }


        paymentList.innerHTML += `

            <div class="payment-item">

                <div class="payment-project">

                    <div class="payment-project-icon">

                        <i class="bi ${safeIcon(
                            job.icon
                        )}"></i>

                    </div>


                    <div>

                        <strong>

                            ${escapeHTML(
                                job.name
                            )}

                        </strong>


                        <span>

                            ${escapeHTML(
                                job.client
                            )}

                        </span>

                    </div>

                </div>


                <div class="payment-amount">

                    <span>
                        Paid / Budget
                    </span>


                    <strong>

                        ${formatMoney(
                            paid
                        )}

                        /

                        ${formatMoney(
                            budget
                        )}

                    </strong>

                </div>


                <div>

                    <div class="payment-status ${statusClass}">

                        ${paymentStatus}

                    </div>


                    <div class="payment-amount">

                        <span>
                            Balance
                        </span>


                        <strong>

                            ${formatMoney(
                                balance
                            )}

                        </strong>

                    </div>

                </div>

            </div>

        `;

    });

}


/* =========================================================
   CALENDAR
========================================================= */

function displayDeadlines() {

    deadlineList.innerHTML =
        "";


    const activeJobs =
        jobs
            .filter(
                job =>
                    String(
                        job.status
                    ).toLowerCase() !==
                    "completed" &&

                    String(
                        job.status
                    ).toLowerCase() !==
                    "cancelled"
            )
            .sort(
                (a, b) =>
                    new Date(
                        a.deadline
                    ) -
                    new Date(
                        b.deadline
                    )
            );


    if (!activeJobs.length) {

        deadlineList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">

                    <i class="bi bi-calendar-check"></i>

                </div>

                <h3>
                    No upcoming deadlines
                </h3>

                <p>
                    You're all caught up.
                </p>

            </div>

        `;

        return;

    }


    activeJobs.forEach(job => {

        const deadline =
            new Date(
                `${job.deadline}T00:00:00`
            );


        const now =
            new Date();


        const today =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
            );


        const difference =
            Math.ceil(
                (
                    deadline -
                    today
                ) /
                86400000
            );


        let warning =
            "";


        if (difference < 0) {

            warning =
                "Overdue";

        } else if (
            difference === 0
        ) {

            warning =
                "Today";

        } else if (
            difference === 1
        ) {

            warning =
                "Tomorrow";

        } else {

            warning =
                `${difference} days left`;

        }


        deadlineList.innerHTML += `

            <div class="deadline-item">

                <div class="deadline-date">

                    <span class="month">

                        ${deadline.toLocaleDateString(
                            "en-US",
                            {
                                month:
                                    "short"
                            }
                        )}

                    </span>


                    <span class="day">

                        ${deadline.getDate()}

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
                            job.client
                        )}

                    </span>

                </div>


                <span class="deadline-warning">

                    ${warning}

                </span>

            </div>

        `;

    });

}


/* =========================================================
   MODALS
========================================================= */

function openModal(modal) {

    if (!modal) {
        return;
    }


    modal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


function closeModal(modal) {

    if (!modal) {
        return;
    }


    modal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


function closeAllModals() {

    document
        .querySelectorAll(
            ".modal-overlay"
        )
        .forEach(modal => {

            modal.classList.remove(
                "active"
            );

        });


    document.body.style.overflow =
        "";

}


/* =========================================================
   JOB BUTTONS
========================================================= */

document
    .getElementById(
        "addJobBtn"
    )
    .addEventListener(
        "click",
        openAddModal
    );


document
    .getElementById(
        "dashboardAddJobBtn"
    )
    .addEventListener(
        "click",
        openAddModal
    );


document
    .getElementById(
        "emptyAddJobBtn"
    )
    .addEventListener(
        "click",
        openAddModal
    );


document
    .getElementById(
        "closeJobModal"
    )
    .addEventListener(
        "click",
        () =>
            closeModal(
                jobModal
            )
    );


document
    .getElementById(
        "cancelJobBtn"
    )
    .addEventListener(
        "click",
        () =>
            closeModal(
                jobModal
            )
    );


/* =========================================================
   CLIENT BUTTONS
========================================================= */

document
    .getElementById(
        "addClientBtn"
    )
    .addEventListener(
        "click",
        openClientModal
    );


document
    .getElementById(
        "emptyAddClientBtn"
    )
    .addEventListener(
        "click",
        openClientModal
    );


document
    .getElementById(
        "closeClientModal"
    )
    .addEventListener(
        "click",
        () =>
            closeModal(
                clientModal
            )
    );


document
    .getElementById(
        "cancelClientBtn"
    )
    .addEventListener(
        "click",
        () =>
            closeModal(
                clientModal
            )
    );


/* =========================================================
   TEAM BUTTONS
========================================================= */

document
    .getElementById(
        "addMemberBtn"
    )
    .addEventListener(
        "click",
        openMemberModal
    );


document
    .getElementById(
        "emptyAddMemberBtn"
    )
    .addEventListener(
        "click",
        openMemberModal
    );


document
    .getElementById(
        "closeMemberModal"
    )
    .addEventListener(
        "click",
        () =>
            closeModal(
                memberModal
            )
    );


document
    .getElementById(
        "cancelMemberBtn"
    )
    .addEventListener(
        "click",
        () =>
            closeModal(
                memberModal
            )
    );


/* =========================================================
   TASK BUTTONS
========================================================= */

document
    .getElementById(
        "addTaskBtn"
    )
    .addEventListener(
        "click",
        openTaskModal
    );


document
    .getElementById(
        "emptyAddTaskBtn"
    )
    .addEventListener(
        "click",
        openTaskModal
    );


document
    .getElementById(
        "closeTaskModal"
    )
    .addEventListener(
        "click",
        () =>
            closeModal(
                taskModal
            )
    );


document
    .getElementById(
        "cancelTaskBtn"
    )
    .addEventListener(
        "click",
        () =>
            closeModal(
                taskModal
            )
    );


/* =========================================================
   MODAL OUTSIDE CLICK
========================================================= */

document
    .querySelectorAll(
        ".modal-overlay"
    )
    .forEach(overlay => {

        overlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    overlay
                ) {

                    closeModal(
                        overlay
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

        if (
            event.key ===
            "Escape"
        ) {

            closeAllModals();

        }

    }
);


/* =========================================================
   THEME
========================================================= */

function setTheme(theme) {

    const isDark =
        theme === "dark";


    document.body.classList.toggle(
        "dark",
        isDark
    );


    localStorage.setItem(
        "jobTrackTheme",
        isDark
            ? "dark"
            : "light"
    );


    updateThemeButtons(
        isDark
    );

}


function updateThemeButtons(
    isDark
) {

    const iconClass =
        isDark
            ? "bi-sun"
            : "bi-moon-stars";


    if (themeToggle) {

        themeToggle.innerHTML = `

            <i class="bi ${iconClass}"></i>

            <span>

                ${
                    isDark
                        ? "Light Mode"
                        : "Dark Mode"
                }

            </span>

        `;

    }


    if (topThemeToggle) {

        topThemeToggle.innerHTML = `

            <i class="bi ${iconClass}"></i>

        `;

    }


    if (settingsThemeToggle) {

        settingsThemeToggle.innerHTML = `

            <i class="bi ${iconClass}"></i>

            ${
                isDark
                    ? "Light Mode"
                    : "Dark Mode"
            }

        `;

    }

}


function toggleTheme() {

    const isDark =
        document.body.classList.contains(
            "dark"
        );


    setTheme(
        isDark
            ? "light"
            : "dark"
    );

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        toggleTheme
    );

}


if (topThemeToggle) {

    topThemeToggle.addEventListener(
        "click",
        toggleTheme
    );

}


if (settingsThemeToggle) {

    settingsThemeToggle.addEventListener(
        "click",
        toggleTheme
    );

}


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function openMobileSidebar() {

    if (!sidebar ||
        !sidebarOverlay) {
        return;
    }


    sidebar.classList.add(
        "mobile-open"
    );


    sidebarOverlay.classList.add(
        "active"
    );

}


function closeMobileSidebar() {

    if (!sidebar ||
        !sidebarOverlay) {
        return;
    }


    sidebar.classList.remove(
        "mobile-open"
    );


    sidebarOverlay.classList.remove(
        "active"
    );

}


if (mobileMenuBtn) {

    mobileMenuBtn.addEventListener(
        "click",
        openMobileSidebar
    );

}


if (sidebarOverlay) {

    sidebarOverlay.addEventListener(
        "click",
        closeMobileSidebar
    );

}


/* =========================================================
   SEARCH / FILTERS
========================================================= */

jobSearch.addEventListener(
    "input",
    filterJobs
);


statusFilter.addEventListener(
    "change",
    filterJobs
);


paymentFilter.addEventListener(
    "change",
    filterJobs
);


clientSearch.addEventListener(
    "input",
    filterClients
);


teamSearch.addEventListener(
    "input",
    filterTeamMembers
);


taskSearch.addEventListener(
    "input",
    filterTasks
);


taskStatusFilter.addEventListener(
    "change",
    filterTasks
);


taskPriorityFilter.addEventListener(
    "change",
    filterTasks
);


taskMemberFilter.addEventListener(
    "change",
    filterTasks
);


/* =========================================================
   WALLET COPY
========================================================= */

const copyWalletButtons =
    document.querySelectorAll(
        ".copy-wallet-btn"
    );


copyWalletButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            async () => {

                let walletAddress =
                    button.dataset.wallet;


                /*
                 * If data-wallet is still a placeholder,
                 * copy the actual visible address instead.
                 */

                if (
                    !walletAddress ||
                    walletAddress.startsWith(
                        "YOUR_"
                    )
                ) {

                    const addressElement =
                        button
                            .closest(
                                ".wallet-card"
                            )
                            ?.querySelector(
                                ".wallet-address span"
                            );


                    walletAddress =
                        addressElement
                            ?.textContent
                            .trim();

                }


                if (!walletAddress) {

                    alert(
                        "No wallet address available."
                    );

                    return;

                }


                const originalHTML =
                    button.innerHTML;


                try {

                    if (
                        navigator.clipboard &&
                        window.isSecureContext
                    ) {

                        await navigator.clipboard.writeText(
                            walletAddress
                        );

                    } else {

                        const textarea =
                            document.createElement(
                                "textarea"
                            );


                        textarea.value =
                            walletAddress;


                        textarea.style.position =
                            "fixed";

                        textarea.style.opacity =
                            "0";


                        document.body.appendChild(
                            textarea
                        );


                        textarea.focus();

                        textarea.select();


                        document.execCommand(
                            "copy"
                        );


                        textarea.remove();

                    }


                    button.classList.add(
                        "copied"
                    );


                    button.innerHTML = `

                        <i class="bi bi-check-lg"></i>

                        <span>
                            Copied
                        </span>

                    `;


                    setTimeout(
                        () => {

                            button.classList.remove(
                                "copied"
                            );

                            button.innerHTML =
                                originalHTML;

                        },
                        1800
                    );


                } catch (error) {

                    console.error(
                        "Copy failed:",
                        error
                    );


                    alert(
                        "Could not copy the wallet address."
                    );

                }

            }
        );

    }
);


/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function formatMoney(amount) {

    const number =
        Number(amount) || 0;


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


function formatDate(
    dateString
) {

    if (!dateString) {

        return "No deadline";

    }


    const date =
        new Date(
            `${dateString}T00:00:00`
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

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


function capitalize(value) {

    if (!value) {
        return "";
    }


    const text =
        String(value);


    return (
        text.charAt(0).toUpperCase() +
        text.slice(1)
    );

}


function getInitials(name) {

    if (!name) {
        return "?";
    }


    const words =
        String(name)
            .trim()
            .split(/\s+/)
            .filter(Boolean);


    if (words.length === 1) {

        return words[0]
            .slice(0, 2)
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[1][0]
    ).toUpperCase();

}


function getRandomIcon() {

    const icons = [

        "bi-globe2",

        "bi-code-slash",

        "bi-window",

        "bi-phone",

        "bi-laptop",

        "bi-palette",

        "bi-shop",

        "bi-bar-chart",

        "bi-brush",

        "bi-kanban"

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

        "bi-palette",

        "bi-shop",

        "bi-bar-chart",

        "bi-brush",

        "bi-kanban",

        "bi-folder"

    ];


    return allowed.includes(icon)
        ? icon
        : "bi-folder";

}


function safeStatus(status) {

    const allowed = [

        "active",

        "pending",

        "completed",

        "cancelled"

    ];


    return allowed.includes(
        String(status)
            .toLowerCase()
    )
        ? String(status)
            .toLowerCase()
        : "pending";

}


function safePriority(priority) {

    const allowed = [

        "low",

        "medium",

        "high",

        "urgent"

    ];


    return allowed.includes(
        String(priority)
            .toLowerCase()
    )
        ? String(priority)
            .toLowerCase()
        : "medium";

}


function escapeHTML(value) {

    return String(
        value ?? ""
    )
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

    populateTaskProjectOptions();

    populateTaskMemberOptions();

    populateTaskMemberFilter();

    displayJobs(jobs);

    displayClients(clients);

    displayTeamMembers(
        teamMembers
    );

    displayPayments();

    displayDeadlines();

    displayTasks(tasks);

    renderDashboard();

}


/* =========================================================
   INITIALIZE
========================================================= */

function initialize() {

    updateCurrentDate();


    const savedTheme =
        localStorage.getItem(
            "jobTrackTheme"
        );


    if (
        savedTheme ===
        "dark"
    ) {

        setTheme("dark");

    } else {

        setTheme("light");

    }


    renderAll();

    loadHashSection();

}


initialize();


/* =========================================================
   UPDATE DATE
========================================================= */

setInterval(
    updateCurrentDate,
    60000
);
