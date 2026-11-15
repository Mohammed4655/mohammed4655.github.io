
# Mohammed Ali Alharbi | Personal Portfolio

A personal portfolio showcasing my projects, skills, and achievements in Data Science, Analytics, BI, AI, and ML.

## Live Website

https://mohammed4655.github.io/

## Features

- Modern and responsive design
- Dark and light modes
- Dynamic project filtering
- JSON-driven content management
- Technical skills showcase
- Experience and education timeline
- Certifications and achievements
- CV download
- Social media integration
- Email and clipboard functionality
- Basic SEO optimization

## Technologies

- HTML5
- CSS3
- JavaScript
- JSON
- GitHub Pages

## Project Structure

```text
Portfolio/
│
├── index.html
├── README.md
│
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── images/
│   │   └── favicon.svg
│   └── documents/
│       └── Mohammed_Alharbi_CV.pdf
│
├── data/
│   ├── profile.json
│   ├── skills.json
│   ├── projects.json
│   └── certifications.json
│
└── pages/
```

## Run Locally

Open the project folder in Visual Studio Code.

Run the following command in the terminal:

```bash
python -m http.server 8000
```

Open the website in your browser:

http://localhost:8000/

To stop the server, press Ctrl + C.

## Content Management

The website separates content from design.
Most content can be updated through JSON files
without changing HTML, CSS, or JavaScript.

### Add a New Project

Open:

`data/projects.json`

Add a project using the following structure:

```json
[
    {
        "title": "Project Name",
        "category": "analytics",
        "description": "Project description",
        "image": "assets/images/project.png",
        "technologies": [
            "Python",
            "SQL",
            "Power BI"
        ],
        "github": "",
        "demo": "",
        "details": ""
    }
]
```

Project categories:

- `analytics`: Data Analytics & BI
- `ai`: AI & Machine Learning

Project fields:

- `title`: Project name
- `category`: Project category
- `description`: Brief project overview
- `image`: Project image path
- `technologies`: Tools and technologies
- `github`: GitHub repository URL
- `demo`: Live application or dashboard URL
- `details`: Detailed project page URL

To add multiple projects, add more objects
to the JSON array separated by commas.

Only publish real projects and valid links.

### Update Technical Skills

Open:

`data/skills.json`

Add, remove, or update skill categories and technologies.

Example:

```json
{
    "category": "Data Analytics & BI",
    "skills": [
        "Python",
        "SQL",
        "Power BI",
        "Excel"
    ]
}
```

### Update Personal Information

Open:

`data/profile.json`

This file manages:

- About Me
- Academic information
- GPA and honors
- Professional experience
- GitHub URL
- LinkedIn URL
- Email address
- CV path

The main heading and name on the homepage
can also be updated in `index.html`.

### Add Certifications

Open:

`data/certifications.json`

Use the following structure:

```json
{
    "title": "Certification Name",
    "level": "",
    "issuer": "Issuing Organization",
    "date": "Month Year",
    "score": "",
    "image": "",
    "credentialUrl": ""
}
```

Add each certification as a separate object
inside the existing JSON array.

### Update CV

Replace the existing PDF file in:

`assets/documents/`

Keep the same filename:

`Mohammed_Alharbi_CV.pdf`

If the filename changes, update the CV path
in `data/profile.json`.

Review the CV for sensitive information
before publishing it publicly.

### Update Website Design

Open:

`assets/css/style.css`

The website uses CSS variables to manage
its visual identity.

Main design variables:

```css
:root {
    --bg: #080e19;
    --surface: #101a2a;
    --border: #243247;
    --text: #f1f5f9;
    --muted: #95a5bb;
    --accent: #60a5fa;
    --primary: #2563eb;
}
```

Update these variables to change the website colors.

Light mode colors are defined separately
under `body.light-mode`.

### Update Website Functionality

Open:

`assets/js/script.js`

This file manages:

- Theme switching
- Project filtering
- Dynamic content loading
- Contact links
- Email copying
- CV download links
- Automatic footer year

### Update Website SEO

Open:

`index.html`

Update the following elements inside the head section:

- Page title
- Meta description
- Author
- Canonical URL
- Open Graph metadata
- Favicon

### Add New Pages

Create additional HTML files inside:

`pages/`

Update the navigation links when necessary.

## Deployment

The website is hosted using GitHub Pages.

Repository:

https://github.com/Mohammed4655/mohammed4655.github.io

Deployment settings:

- Source: Deploy from a branch
- Branch: main
- Folder: / (root)

Upload or commit updated files to the main branch
to publish new changes.

Verify the deployment under the Actions tab.

## Maintenance Checklist

Before publishing updates:

- Validate JSON files.
- Verify images and document paths.
- Test project filters.
- Test dark and light modes.
- Check contact links.
- Test CV download.
- Check mobile responsiveness.
- Review browser console errors.
- Remove sensitive information.
- Verify the deployed website.

## Future Improvements

- Individual project detail pages
- Interactive Power BI dashboards
- Live AI and ML applications
- Arabic and English language support
- Improved mobile navigation
- Project search
- Content management interface
- Custom domain
- Enhanced SEO

## Author

Mohammed Ali Alharbi

Data Science Graduate

## Copyright

© Mohammed Ali Alharbi. All rights reserved.
