
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


function loadStorage(key, fallback) {

    try {

        const saved = localStorage.getItem(key);

        if (!saved) {
            return fallback;
        }

        const parsed = JSON.parse(saved);

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


/* =========================================================
   DOM
========================================================= */

const pageTitle = document.getElementById("pageTitle");

const pageSections = document.querySelectorAll(
    ".page-section"
);

const navLinks = document.querySelectorAll(
    ".nav-link[data-section]"
);


const currentDate = document.getElementById(
    "currentDate"
);


/* Dashboard */

const totalJobs = document.getElementById(
    "totalJobs"
);

const completedJobs = document.getElementById(
    "completedJobs"
);

const outstandingAmount = document.getElementById(
    "outstandingAmount"
);

const totalPaid = document.getElementById(
    "totalPaid"
);

const recentProjects = document.getElementById(
    "recentProjects"
);

const dashboardClients = document.getElementById(
    "dashboardClients"
);


/* Projects */

const jobsGrid = document.getElementById(
    "jobsGrid"
);

const emptyJobs = document.getElementById(
    "emptyJobs"
);

const jobSearch = document.getElementById(
    "jobSearch"
);

const statusFilter = document.getElementById(
    "statusFilter"
);

const paymentFilter = document.getElementById(
    "paymentFilter"
);


/* Clients */

const clientsGrid = document.getElementById(
    "clientsGrid"
);

const emptyClients = document.getElementById(
    "emptyClients"
);

const clientSearch = document.getElementById(
    "clientSearch"
);

const totalClients = document.getElementById(
    "totalClients"
);

const activeClients = document.getElementById(
    "activeClients"
);

const completedClients = document.getElementById(
    "completedClients"
);


/* Payments */

const totalProjectValue = document.getElementById(
    "totalProjectValue"
);

const paymentTotalPaid = document.getElementById(
    "paymentTotalPaid"
);

const paymentOutstanding = document.getElementById(
    "paymentOutstanding"
);

const paymentList = document.getElementById(
    "paymentList"
);


/* Calendar */

const deadlineList = document.getElementById(
    "deadlineList"
);


/* Theme */

const themeToggle = document.getElementById(
    "themeToggle"
);

const topThemeToggle = document.getElementById(
    "topThemeToggle"
);

const settingsThemeToggle = document.getElementById(
    "settingsThemeToggle"
);


/* Mobile */

const mobileMenuBtn = document.getElementById(
    "mobileMenuBtn"
);

const sidebar = document.getElementById(
    "sidebar"
);

const sidebarOverlay = document.getElementById(
    "sidebarOverlay"
);


/* =========================================================
   MODAL DOM
========================================================= */

const jobModal = document.getElementById(
    "jobModal"
);

const jobForm = document.getElementById(
    "jobForm"
);

const jobModalTitle = document.getElementById(
    "jobModalTitle"
);

const jobId = document.getElementById(
    "jobId"
);

const jobName = document.getElementById(
    "jobName"
);

const jobClient = document.getElementById(
    "jobClient"
);

const jobBudget = document.getElementById(
    "jobBudget"
);

const jobPaid = document.getElementById(
    "jobPaid"
);

const jobDeadline = document.getElementById(
    "jobDeadline"
);

const jobStatus = document.getElementById(
    "jobStatus"
);

const jobProgress = document.getElementById(
    "jobProgress"
);

const progressValue = document.getElementById(
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


const clientModal = document.getElementById(
    "clientModal"
);

const clientForm = document.getElementById(
    "clientForm"
);

const clientModalTitle = document.getElementById(
    "clientModalTitle"
);

const clientId = document.getElementById(
    "clientId"
);

const clientName = document.getElementById(
    "clientName"
);

const clientEmail = document.getElementById(
    "clientEmail"
);

const clientPhone = document.getElementById(
    "clientPhone"
);

const clientCompany = document.getElementById(
    "clientCompany"
);

const clientNotes = document.getElementById(
    "clientNotes"
);


/* =========================================================
   DATE
========================================================= */

function updateCurrentDate() {

    if (!currentDate) {
        return;
    }

    const now = new Date();

    currentDate.textContent =
        now.toLocaleDateString(
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


    pageTitle.textContent =
        sectionTitles[sectionName] ||
        "Dashboard";


    if (sectionName === "dashboard") {
        renderDashboard();
    }

    if (sectionName === "projects") {
        filterJobs();
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
   JOBS
========================================================= */

function displayJobs(jobList) {

    jobsGrid.innerHTML = "";


    if (!jobList.length) {

        emptyJobs.classList.remove("hidden");

        return;

    }


    emptyJobs.classList.add("hidden");


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
            String(job.status || "pending")
                .toLowerCase();


        const paymentStatus =
            getPaymentStatus(
                budget,
                paid
            );


        const card =
            document.createElement("article");


        card.className = "job-card";


        card.innerHTML = `

            <div class="job-card-header">

                <div class="job-card-left">

                    <div class="job-icon">

                        <i class="bi ${
                            escapeHTML(
                                job.icon ||
                                "bi-folder"
                            )
                        }"></i>

                    </div>


                    <div class="job-card-title">

                        <h3>
                            ${escapeHTML(job.name)}
                        </h3>

                        <div class="client-name">
                            ${escapeHTML(job.client)}
                        </div>

                    </div>

                </div>


                <span class="status status-${status}">
                    ${capitalize(status)}
                </span>

            </div>


            <div class="job-details">

                <div class="job-detail">

                    <span>
                        Budget
                    </span>

                    <strong>
                        ${formatMoney(budget)}
                    </strong>

                </div>


                <div class="job-detail">

                    <span>
                        Paid
                    </span>

                    <strong class="payment-paid">
                        ${formatMoney(paid)}
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

                    <strong class="payment-balance ${
                        balance > 0
                            ? "payment-due"
                            : "payment-paid"
                    }">

                        ${formatMoney(balance)}

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
                        Number(button.dataset.id)
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
                        Number(button.dataset.id)
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
                    (Number(job.budget) || 0) -
                    (Number(job.paid) || 0),
                    0
                ),
            0
        );


    totalJobs.textContent =
        total;

    completedJobs.textContent =
        completed;

    totalPaid.textContent =
        formatMoney(paid);

    outstandingAmount.textContent =
        formatMoney(outstanding);


    totalProjectValue.textContent =
        formatMoney(
            jobs.reduce(
                (sum, job) =>
                    sum +
                    (Number(job.budget) || 0),
                0
            )
        );


    paymentTotalPaid.textContent =
        formatMoney(paid);


    paymentOutstanding.textContent =
        formatMoney(outstanding);

}


function filterJobs() {

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
                    .toLowerCase() === status;


            let matchesPayment = true;


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
            item => Number(item.id) === Number(id)
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
            item => Number(item.id) === Number(id)
        );


    if (!job) {
        return;
    }


    const confirmed =
        window.confirm(
            `Delete "${job.name}"?`
        );


    if (!confirmed) {
        return;
    }


    jobs =
        jobs.filter(
            item =>
                Number(item.id) !== Number(id)
        );


    saveJobs();

    renderAll();

}


jobForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            jobName.value.trim();

        const client =
            jobClient.value.trim();

        const budget =
            Math.max(
                Number(jobBudget.value) || 0,
                0
            );

        const paid =
            Math.min(
                Math.max(
                    Number(jobPaid.value) || 0,
                    0
                ),
                budget
            );

        const deadline =
            jobDeadline.value;

        const status =
            jobStatus.value;

        let progress =
            Number(jobProgress.value) || 0;


        if (status === "completed") {
            progress = 100;
        }


        progress =
            Math.min(
                Math.max(progress, 0),
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

                icon: getRandomIcon()

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
        Number(jobBudget.value) || 0;

    const paid =
        Math.min(
            Number(jobPaid.value) || 0,
            budget
        );


    const remaining =
        Math.max(
            budget - paid,
            0
        );


    previewPaymentStatus.textContent =
        getPaymentStatus(
            budget,
            paid
        );


    previewRemaining.textContent =
        formatMoney(remaining);

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
            document.createElement("article");


        card.className =
            "client-card";


        card.innerHTML = `

            <div class="client-card-top">

                <div class="client-card-main">

                    <div class="client-avatar">
                        ${getInitials(client.name)}
                    </div>

                    <div>

                        <h3>
                            ${escapeHTML(client.name)}
                        </h3>

                        <div class="client-company">
                            ${escapeHTML(
                                client.company ||
                                "Independent Client"
                            )}
                        </div>

                    </div>

                </div>


                <span class="status status-${client.status || "active"}">
                    ${capitalize(client.status || "active")}
                </span>

            </div>


            <div class="client-contact">

                ${
                    client.email
                        ? `
                            <div>
                                <i class="bi bi-envelope"></i>
                                <span>
                                    ${escapeHTML(client.email)}
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
                                    ${escapeHTML(client.phone)}
                                </span>
                            </div>
                        `
                        : ""
                }

            </div>


            <p class="client-notes">

                ${
                    client.notes
                        ? escapeHTML(client.notes)
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
        .querySelectorAll(".edit-client")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    editClient(
                        Number(button.dataset.id)
                    );

                }
            );

        });


    document
        .querySelectorAll(".delete-client")
        .forEach(button => {

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


function updateClientStats() {

    totalClients.textContent =
        clients.length;


    activeClients.textContent =
        clients.filter(
            client =>
                String(client.status)
                    .toLowerCase() ===
                "active"
        ).length;


    completedClients.textContent =
        clients.filter(
            client =>
                String(client.status)
                    .toLowerCase() ===
                "completed"
        ).length;

}


function filterClients() {

    const search =
        clientSearch.value
            .trim()
            .toLowerCase();


    const filtered =
        clients.filter(client => {

            return (

                String(client.name)
                    .toLowerCase()
                    .includes(search)

                ||

                String(client.email)
                    .toLowerCase()
                    .includes(search)

                ||

                String(client.company)
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
                String(job.client)
                    .toLowerCase() ===
                String(client.name)
                    .toLowerCase()
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
                Number(item.id) !== Number(id)
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


                /*
                 * Keep projects connected when
                 * a client changes their name.
                 */

                jobs =
                    jobs.map(job => {

                        if (
                            String(job.client)
                                .toLowerCase() ===
                            String(oldName)
                                .toLowerCase()
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

                status: "active"

            });

        }


        saveClients();

        closeModal(clientModal);

        renderAll();

        showSection("clients");

    }
);


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    updateStats();

    updateClientStats();


    const latestJobs =
        [...jobs]
            .sort(
                (a, b) =>
                    Number(b.id) -
                    Number(a.id)
            )
            .slice(0, 5);


    recentProjects.innerHTML = "";


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

                        <i class="bi ${
                            escapeHTML(
                                job.icon ||
                                "bi-folder"
                            )
                        }"></i>

                    </div>


                    <div class="project-mini-info">

                        <strong>
                            ${escapeHTML(job.name)}
                        </strong>

                        <span>
                            ${escapeHTML(job.client)}
                        </span>

                    </div>


                    <span class="status status-${
                        escapeHTML(
                            job.status || "pending"
                        )
                    }">

                        ${capitalize(
                            job.status ||
                            "pending"
                        )}

                    </span>

                </div>

            `;

        });

    }


    dashboardClients.innerHTML = "";


    clients
        .slice(0, 5)
        .forEach(client => {

            dashboardClients.innerHTML += `

                <div class="dashboard-client-item">

                    <div class="client-mini-avatar">

                        ${getInitials(client.name)}

                    </div>


                    <div class="client-mini-info">

                        <strong>
                            ${escapeHTML(client.name)}
                        </strong>

                        <span>
                            ${escapeHTML(
                                client.company ||
                                "Client"
                            )}
                        </span>

                    </div>


                    <span class="status status-${
                        escapeHTML(
                            client.status ||
                            "active"
                        )
                    }">

                        ${capitalize(
                            client.status ||
                            "active"
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


    paymentList.innerHTML = "";


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

                        <i class="bi ${
                            escapeHTML(
                                job.icon ||
                                "bi-folder"
                            )
                        }"></i>

                    </div>


                    <div>

                        <strong>
                            ${escapeHTML(job.name)}
                        </strong>

                        <span>
                            ${escapeHTML(job.client)}
                        </span>

                    </div>

                </div>


                <div class="payment-amount">

                    <span>
                        Paid / Budget
                    </span>

                    <strong>
                        ${formatMoney(paid)}
                        /
                        ${formatMoney(budget)}
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
                            ${formatMoney(balance)}
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

    deadlineList.innerHTML = "";


    const activeJobs =
        jobs
            .filter(
                job =>
                    String(job.status)
                        .toLowerCase() !==
                    "completed" &&

                    String(job.status)
                        .toLowerCase() !==
                    "cancelled"
            )
            .sort(
                (a, b) =>
                    new Date(a.deadline) -
                    new Date(b.deadline)
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

        } else if (difference === 0) {

            warning =
                "Today";

        } else if (difference === 1) {

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
                                month: "short"
                            }
                        )}
                    </span>

                    <span class="day">
                        ${deadline.getDate()}
                    </span>

                </div>


                <div class="deadline-info">

                    <strong>
                        ${escapeHTML(job.name)}
                    </strong>

                    <span>
                        ${escapeHTML(job.client)}
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

    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


function closeModal(modal) {

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    document.body.style.overflow =
        "";

}


function closeAllModals() {

    document
        .querySelectorAll(".modal-overlay")
        .forEach(modal => {

            modal.classList.remove(
                "active"
            );

        });


    document.body.style.overflow =
        "";

}


/* Job buttons */

document
    .getElementById("addJobBtn")
    .addEventListener(
        "click",
        openAddModal
    );


document
    .getElementById("dashboardAddJobBtn")
    .addEventListener(
        "click",
        openAddModal
    );


document
    .getElementById("emptyAddJobBtn")
    .addEventListener(
        "click",
        openAddModal
    );


document
    .getElementById("closeJobModal")
    .addEventListener(
        "click",
        () => closeModal(jobModal)
    );


document
    .getElementById("cancelJobBtn")
    .addEventListener(
        "click",
        () => closeModal(jobModal)
    );


/* Client buttons */

document
    .getElementById("addClientBtn")
    .addEventListener(
        "click",
        openClientModal
    );


document
    .getElementById("emptyAddClientBtn")
    .addEventListener(
        "click",
        openClientModal
    );


document
    .getElementById("closeClientModal")
    .addEventListener(
        "click",
        () => closeModal(clientModal)
    );


document
    .getElementById("cancelClientBtn")
    .addEventListener(
        "click",
        () => closeModal(clientModal)
    );


/* Outside click */

document
    .querySelectorAll(".modal-overlay")
    .forEach(overlay => {

        overlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    overlay
                ) {

                    closeModal(overlay);

                }

            }
        );

    });


/* Escape */

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


    updateThemeButtons(isDark);

}


function updateThemeButtons(isDark) {

    const iconClass =
        isDark
            ? "bi-sun"
            : "bi-moon-stars";


    if (themeToggle) {

        themeToggle.innerHTML = `

            <i class="bi ${iconClass}"></i>

            <span>
                ${isDark
                    ? "Light Mode"
                    : "Dark Mode"}
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

            ${isDark
                ? "Light Mode"
                : "Dark Mode"}

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


themeToggle.addEventListener(
    "click",
    toggleTheme
);


topThemeToggle.addEventListener(
    "click",
    toggleTheme
);


settingsThemeToggle.addEventListener(
    "click",
    toggleTheme
);


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function openMobileSidebar() {

    sidebar.classList.add(
        "mobile-open"
    );

    sidebarOverlay.classList.add(
        "active"
    );

}


function closeMobileSidebar() {

    sidebar.classList.remove(
        "mobile-open"
    );

    sidebarOverlay.classList.remove(
        "active"
    );

}


mobileMenuBtn.addEventListener(
    "click",
    openMobileSidebar
);


sidebarOverlay.addEventListener(
    "click",
    closeMobileSidebar
);


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


/* =========================================================
   WALLET COPY
========================================================= */

const copyWalletButtons =
    document.querySelectorAll(
        ".copy-wallet-btn"
    );


copyWalletButtons.forEach(button => {

    button.addEventListener(
        "click",
        async () => {

            const walletAddress =
                button.dataset.wallet;


            if (
                !walletAddress ||
                walletAddress.startsWith(
                    "YOUR_"
                )
            ) {

                alert(
                    "Copied"
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

});


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


function formatDate(dateString) {

    if (!dateString) {
        return "No deadline";
    }


    const date =
        new Date(
            `${dateString}T00:00:00`
        );


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


function capitalize(value) {

    if (!value) {
        return "";
    }


    return String(value)
        .charAt(0)
        .toUpperCase()
        +
        String(value)
            .slice(1);

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

    displayJobs(jobs);

    displayClients(clients);

    displayPayments();

    displayDeadlines();

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


    if (savedTheme === "dark") {

        setTheme("dark");

    } else {

        setTheme("light");

    }


    renderAll();

    loadHashSection();

}


initialize();


/* Update date occasionally */

setInterval(
    updateCurrentDate,
    60000
);
