
// =======================================
// 1. Theme Management
// =======================================

const themeToggle = document.getElementById("theme-toggle");

function setTheme(theme) {
    const isLight = theme === "light";

    document.body.classList.toggle("light-mode", isLight);

    themeToggle.textContent = isLight ? "☾" : "☀";

    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );

    localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme") || "dark";

setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-mode");

    setTheme(isLight ? "dark" : "light");
});


// =======================================
// 2. Automatic Footer Year
// =======================================

document.getElementById("current-year").textContent =
    new Date().getFullYear();



// =======================================
// 3. Load Technical Skills
// =======================================

async function loadSkills() {
    const container = document.getElementById("skills-container");

    try {
        const response = await fetch("data/skills.json");

        if (!response.ok) {
            throw new Error("Failed to load skills");
        }

        const skillsData = await response.json();

        container.replaceChildren();

        skillsData.forEach(group => {
            const card = document.createElement("div");
            card.className = "skill-card";

            const title = document.createElement("h3");
            title.textContent = group.category;

            const tags = document.createElement("div");
            tags.className = "tags";

            group.skills.forEach(skill => {
                const tag = document.createElement("span");
                tag.className = "tag";
                tag.textContent = skill;

                tags.appendChild(tag);
            });

            card.appendChild(title);
            card.appendChild(tags);
            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading skills:", error);
        container.textContent = "Unable to load skills.";
    }
}

loadSkills();










// =======================================
// 4. Projects Management
// =======================================

let projects = [];
let activeCategory = "all";

const projectsContainer = document.getElementById("projects-container");
const emptyProjects = document.getElementById("empty-projects");
const filterButtons = document.querySelectorAll(".filter-btn");

const categoryNames = {
    analytics: "Data Analytics & BI",
    ai: "AI & Machine Learning"
};


// Load projects from JSON

async function loadProjects() {
    try {
        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error("Failed to load projects");
        }

        projects = await response.json();

        renderProjects();

    } catch (error) {
        console.error("Error loading projects:", error);

        emptyProjects.hidden = false;
        emptyProjects.querySelector("h3").textContent =
            "Unable to load projects";

        emptyProjects.querySelector("p").textContent =
            "Please try again later.";
    }
}


// Display projects

function renderProjects() {

    projectsContainer.replaceChildren();

    const filteredProjects = activeCategory === "all"
        ? projects
        : projects.filter(project =>
            project.category === activeCategory
        );

    emptyProjects.hidden = filteredProjects.length > 0;
    projectsContainer.hidden = filteredProjects.length === 0;

    emptyProjects.querySelector("h3").textContent =
        "Projects Coming Soon";

    emptyProjects.querySelector("p").textContent =
        "New projects will be published here.";

    filteredProjects.forEach(project => {

        const card = document.createElement("article");
        card.className = "project-card";

        // Project image

        if (project.image) {
            const image = document.createElement("img");

            image.src = project.image;
            image.alt = project.title;
            image.loading = "lazy";

            card.appendChild(image);
        }

        // Project category

        const category = document.createElement("span");

        category.className = "section-label";
        category.textContent =
            categoryNames[project.category] || project.category;

        // Project title

        const title = document.createElement("h3");
        title.textContent = project.title;

        // Project description

        const description = document.createElement("p");
        description.textContent = project.description;

        // Project technologies

        const tags = document.createElement("div");
        tags.className = "tags";

        (project.technologies || []).forEach(technology => {

            const tag = document.createElement("span");

            tag.className = "tag";
            tag.textContent = technology;

            tags.appendChild(tag);
        });

        // Project links

        const links = document.createElement("div");
        links.className = "project-links";

        const availableLinks = [
            { label: "View Project", url: project.details },
            { label: "GitHub", url: project.github },
            { label: "Live Demo", url: project.demo }
        ];

        availableLinks.forEach(item => {

            if (!item.url) return;

            const url = new URL(item.url, window.location.href);

            if (!["http:", "https:"].includes(url.protocol)) {
                return;
            }

            const link = document.createElement("a");

            link.href = url.href;
            link.textContent = item.label;
            link.className = "btn secondary";
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            links.appendChild(link);
        });

        card.append(category, title, description, tags, links);

        projectsContainer.appendChild(card);
    });
}


// Project category filters

filterButtons.forEach(button => {

    button.setAttribute(
        "aria-pressed",
        String(button.classList.contains("active"))
    );

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        activeCategory = button.dataset.category;

        renderProjects();
    });
});


// Initialize projects

loadProjects();












// =======================================
// 5. Personal Profile Management
// =======================================

async function loadProfile() {
    try {
        const response = await fetch("data/profile.json");

        if (!response.ok) {
            throw new Error("Failed to load profile");
        }

        const profile = await response.json();

        renderAbout(profile);
        renderExperience(profile);
        renderContact(profile.links);

    } catch (error) {
        console.error("Error loading profile:", error);

        document.getElementById("about-content").textContent =
            "Unable to load profile information.";
    }
}


// =======================================
// 6. About Me
// =======================================

function renderAbout(profile) {

    const container = document.getElementById("about-content");
    container.replaceChildren();

    const about = document.createElement("p");
    about.className = "about-description";
    about.textContent = profile.about;

    const grid = document.createElement("div");
    grid.className = "about-grid";

    const education = profile.education;

    const items = [
        {
            value: education.gpa,
            title: "Academic GPA",
            description: education.honors
        },
        {
            value: "B.Sc.",
            title: "Data Science",
            description: education.university
        }
    ];

    items.forEach(item => {

        const card = document.createElement("div");
        card.className = "card";

        const value = document.createElement("div");
        value.className = "stat-value";
        value.textContent = item.value;

        const title = document.createElement("h3");
        title.textContent = item.title;

        const description = document.createElement("p");
        description.textContent = item.description;

        card.append(value, title, description);

        grid.appendChild(card);
    });

    container.append(about, grid);
}


// =======================================
// 7. Experience & Education
// =======================================

function renderExperience(profile) {

    const container =
        document.getElementById("experience-container");

    container.replaceChildren();

    const items = [
        ...(profile.experience || []),
        {
            title: profile.education.degree,
            organization: profile.education.university,
            date: profile.education.graduationYear,
            description: profile.education.honors
        }
    ];

    items.forEach(item => {

        const timeline = document.createElement("article");
        timeline.className = "timeline-item";

        const date = document.createElement("span");
        date.className = "date";
        date.textContent = item.date;

        const title = document.createElement("h3");
        title.textContent = item.title;

        const organization = document.createElement("div");
        organization.className = "organization";
        organization.textContent = item.organization;

        const description = document.createElement("p");
        description.textContent = item.description;

        timeline.append(
            date,
            title,
            organization,
            description
        );

        container.appendChild(timeline);
    });
}



// =======================================
// 8. Contact & CV Links
// =======================================

function renderContact(links) {

    const container = document.getElementById("contact-links");
    container.replaceChildren();

    // Social Icons

    const icons = {

        github: `<svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.91 2.63 3.27 1.88.1-.73.39-1.23.71-1.51-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.09 1.15a10.72 10.72 0 0 1 5.63 0c2.14-1.45 3.08-1.15 3.08-1.15.62 1.55.24 2.7.12 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.28-5.14 5.56.4.35.76 1.03.76 2.07v3.07c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75z"/>
        </svg>`,

        linkedin: `<svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96C2 21.32 2.69 22 3.55 22h16.9c.86 0 1.55-.68 1.55-1.52V3.52C22 2.68 21.31 2 20.45 2zM8 19H5V9h3zm-1.5-11.3A1.75 1.75 0 1 1 6.5 4.2a1.75 1.75 0 0 1 0 3.5zM19 19h-3v-5c0-1.2-.3-2-1.5-2S13 13 13 14v5h-3V9h3v1.4c.6-1 1.5-1.7 2.8-1.7 2.4 0 3.2 1.5 3.2 4z"/>
        </svg>`,

        email: `<svg viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="5" width="18" height="14" rx="2"/>
            <path d="m3 6 9 7 9-7"/>
        </svg>`,

        download: `<svg viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3v12"/>
            <path d="m7 10 5 5 5-5"/>
            <path d="M4 16v4h16v-4"/>
        </svg>`,

        copy: `<svg viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.8">
            <rect x="8" y="8" width="12" height="12" rx="2"/>
            <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>
        </svg>`
    };


    // Email Address & Copy Button

    if (links.email) {

        const emailBox = document.createElement("div");
        emailBox.className = "email-box";

        const emailIcon = document.createElement("span");
        emailIcon.className = "contact-icon";
        emailIcon.innerHTML = icons.email;

        const emailAddress = document.createElement("span");
        emailAddress.className = "email-address";
        emailAddress.textContent = links.email;

        const copyButton = document.createElement("button");
        copyButton.className = "copy-email-btn";
        copyButton.innerHTML = icons.copy + " Copy";

        const status = document.createElement("span");
        status.className = "copy-status";
        status.setAttribute("role", "status");

        copyButton.addEventListener("click", async () => {

            try {
                await navigator.clipboard.writeText(links.email);

                copyButton.textContent = "✓ Copied!";
                status.textContent = "Email copied successfully.";

                setTimeout(() => {
                    copyButton.innerHTML = icons.copy + " Copy";
                    status.textContent = "";
                }, 2500);

            } catch (error) {

                status.textContent =
                    "Please copy the email address manually.";
            }
        });

        emailBox.append(
            emailIcon,
            emailAddress,
            copyButton
        );

        container.append(emailBox, status);
    }


    // Contact Buttons

    const buttons = document.createElement("div");
    buttons.className = "contact-buttons";

    const contactItems = [

        {
            title: "GitHub",
            url: links.github,
            icon: icons.github
        },

        {
            title: "LinkedIn",
            url: links.linkedin,
            icon: icons.linkedin
        },

        {
            title: "Email",
            url: links.email
                ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(links.email)}`
                : "",
            icon: icons.email
        },

        {
            title: "Download CV",
            url: links.cv,
            icon: icons.download,
            download: true
        }
    ];

    contactItems.forEach(item => {

        if (!item.url) return;

        const link = document.createElement("a");

        link.href = item.url;

        link.className = item.download
            ? "btn primary contact-btn"
            : "btn secondary contact-btn";

        const icon = document.createElement("span");
        icon.className = "contact-icon";
        icon.innerHTML = item.icon;

        const text = document.createElement("span");
        text.textContent = item.title;

        link.append(icon, text);

        if (item.download) {

            link.setAttribute("download", "");

        } else {

            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }

        buttons.appendChild(link);
    });

    container.appendChild(buttons);


    // CV Button on Home Page

    if (links.cv) {

        const heroButtons =
            document.querySelector(".hero-buttons");

        if (!document.getElementById("hero-cv")) {

            const cvButton = document.createElement("a");

            cvButton.id = "hero-cv";
            cvButton.className = "btn secondary contact-btn";
            cvButton.href = links.cv;

            cvButton.innerHTML =
                icons.download + " Download CV";

            cvButton.setAttribute("download", "");

            heroButtons.appendChild(cvButton);
        }
    }
}



// =======================================
// 9. Certifications & Achievements
// =======================================

async function loadCertifications() {

    const container =
        document.getElementById("certifications-container");

    try {

        const response =
            await fetch("data/certifications.json");

        if (!response.ok) {
            throw new Error("Failed to load certifications");
        }

        const certifications = await response.json();

        container.replaceChildren();

        certifications.forEach(certification => {

            const card = document.createElement("article");
            card.className = "certification-card";

            const label = document.createElement("span");
            label.className = "section-label";
            label.textContent = "PROFESSIONAL CERTIFICATION";

            const title = document.createElement("h3");
            title.textContent = certification.title;

            const level = document.createElement("p");
            level.className = "certification-level";
            level.textContent = certification.level || "";

            const issuer = document.createElement("p");
            issuer.textContent = certification.issuer;

            const date = document.createElement("p");
            date.textContent = certification.date;

            card.append(label, title, level, issuer, date);

            if (certification.score) {

                const score = document.createElement("div");
                score.className = "stat-value";
                score.textContent = certification.score;

                card.appendChild(score);
            }

            if (certification.image) {

                const image = document.createElement("img");

                image.src = certification.image;
                image.alt = certification.title;
                image.loading = "lazy";

                card.appendChild(image);
            }

            if (certification.credentialUrl) {

                const link = document.createElement("a");

                link.href = certification.credentialUrl;
                link.textContent = "View Credential";
                link.className = "btn secondary";
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                card.appendChild(link);
            }

            container.appendChild(card);
        });

    } catch (error) {

        console.error("Error loading certifications:", error);

        container.textContent =
            "Unable to load certifications.";
    }
}


// =======================================
// 10. Initialize Profile & Certifications
// =======================================

loadProfile();
loadCertifications();
