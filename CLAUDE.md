# Personal Website

Personal portfolio website for Ron Mabulay (IT Engineer | Cloud • Automation • DevOps) deployed on Firebase Hosting.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Backend**: Node.js/Express (hosted on Google Cloud Run)
- **Database**: Google Firestore
- **Deployment**: Firebase Hosting (frontend), Google Cloud Run (backend)
- **CI/CD**: GitHub Actions

## Project Structure

```
/
├── index.html              # Main website (HTML/CSS/JS)
├── styles.css              # Styling
├── resume.pdf              # Resume file (downloadable from nav)
├── 404.html                # Custom 404 page
├── package-lock.json       # Root dependency lock file
├── backend/                # Backend API (Node.js/Express)
│   ├── index.js            # Express server with /api/contact endpoint
│   ├── package.json
│   ├── package-lock.json
│   ├── .dockerignore
│   └── Dockerfile          # Docker image for Cloud Run
├── .github/                # GitHub Actions workflows
│   └── workflows/
│       ├── ci.yml
│       ├── cloud-run-deploy.yml
│       ├── firebase-hosting-merge.yml
│       └── firebase-hosting-pull-request.yml
├── firebase.json           # Firebase configuration
├── firestore.rules         # Firestore security rules
├── firestore.indexes.json
├── .firebaserc             # Firebase project config
├── .gitignore
├── Dockerfile.frontend     # Frontend Docker image (for local dev)
├── docker-compose.yml      # Local development with Docker
└── nginx.conf              # Nginx config for frontend container
```

## Website Sections

1. **Hero** - Introduction with tagline "IT Engineer | Cloud • Automation • DevOps"
2. **About Me** - Professional summary
3. **Technical Skills** - Grid of skill cards:
   - Cloud & Platforms (AWS, Azure DevOps, Microsoft 365, Google Cloud)
   - DevOps & CI/CD (Docker, Docker Compose, Git, GitHub Actions)
   - Automation & Scripting (PowerShell, Python, SQL, Power Automate)
   - Networking & Security (Fortinet Firewall, DNS, MFA, Endpoint Protection)
   - Operating Systems (Linux, Windows, macOS)
4. **Certifications** - AWS Certified Cloud Practitioner, Udemy courses
5. **Projects** - CI/CD Pipeline, Snipe-IT Asset Management, Personal File Server
6. **Contact** - Contact form + contact info (Email, LinkedIn, GitHub)

## Navigation

Header nav includes: About, Skills, Projects, Certifications, Contact, Resume (download link)

## Frontend Details

- **Favicon**: Inline SVG (letter "R") — no external file needed
- **Meta**: Includes `<meta name="description">` for SEO
- **Icons**: SVG icons for contact items (Email, LinkedIn, GitHub) for cross-browser consistency
- **External links**: Use `rel="noopener noreferrer"` for security
- **Responsive**: Mobile-first responsive design with breakpoints at 900px, 768px, and 430px
- **No external JS libraries** — vanilla JavaScript only
- **No Firebase client SDK** — contact form uses backend API directly

## Contact Form

The contact form submits to a backend API endpoint.

**Endpoint**: `https://personal-website-backend-168209345755.asia-southeast1.run.app/api/contact`

**Request**:
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Message saved successfully."
}
```

**Features**:
- Validates email format before processing
- Stores messages in Firestore collection `contact_messages`
- Sends email notification via SendGrid (if configured)
- Success/error messages auto-clear after 5 seconds

**Error Responses**:
- `400`: Missing required fields or invalid email format
- `500`: Server error

## Backend API

- **Location**: `backend/index.js`
- **Runtime**: Node.js with Express
- **Database**: Google Firestore (project: `personal-website-ron-9f777`)
- **Email**: SendGrid for notifications
- **Endpoints**:
  - `GET /` - Health check
  - `POST /api/contact` - Submit contact form

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 8080) |
| `SENDGRID_API_KEY` | No | SendGrid API key for email notifications |
| `SENDGRID_SENDER_EMAIL` | No | Verified sender email (defaults to mabulayron420@gmail.com) |

When `SENDGRID_API_KEY` is set, the backend sends an email notification for each contact form submission.

**Important**: Secrets are stored in GitHub Secrets and injected at deploy time via the Cloud Run workflow. Never hardcode API keys in source files.

## Firebase Configuration

- **Project ID**: `personal-website-ron-9f777`
- **Hosting**: Serves from root directory (`.`)
- **Firestore**: Enabled with rules in `firestore.rules`

## CI/CD Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| `firebase-hosting-merge.yml` | Push to `main` | Deploys frontend to Firebase Hosting live channel |
| `firebase-hosting-pull-request.yml` | PR to `main` | Deploys frontend to preview channel |
| `cloud-run-deploy.yml` | Push to `main` (backend/** changes) | Deploys backend to Cloud Run |
| `ci.yml` | Push/PR to `uat` or `main` | Validates HTML and CSS files exist and are not empty |

## Deployment

- **Frontend URL**: https://personal-website-ron-9f777.web.app
- **Backend URL**: https://personal-website-backend-168209345755.asia-southeast1.run.app
- **Deploys automatically** on push to `main` branch
- Backend only redeploys when `backend/` files change

## Branches

- `main` - Production branch (triggers deployment)
- `uat` - Testing/development branch

## Running Locally

### Frontend
```bash
# Using Python
python -m http.server 8080

# Or any static file server
npx serve .
```

### Backend
```bash
cd backend
npm install
node index.js
```

### Docker (full stack)
```bash
docker-compose up
```

Note: For local email testing, create a `.env` file in `backend/` with `SENDGRID_API_KEY` and `SENDGRID_SENDER_EMAIL`.

## Security Notes

- `credentials.json` is in `.gitignore` — never commit service account keys
- SendGrid API key is managed via GitHub Secrets, not in source code
- Backend has rate limiting (5 requests per 15 minutes per IP)
- External links use `rel="noopener noreferrer"`
