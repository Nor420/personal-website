# Personal Website

Personal portfolio website for Ron Mabulay (IT Engineer | Cloud • Automation • DevOps) deployed on Firebase Hosting.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Backend**: Node.js/Express (hosted on Google Cloud Run)
- **Database**: Google Firestore
- **Deployment**: Firebase Hosting
- **CI/CD**: GitHub Actions

## Project Structure

```
/
├── index.html          # Main website (HTML/CSS/JS)
├── styles.css          # Styling
├── resume.pdf          # Resume file
├── backend/            # Backend API (Node.js/Express)
│   ├── index.js        # Express server with /api/contact endpoint
│   ├── package.json
│   └── Dockerfile      # Docker image for Cloud Run
├── .github/            # GitHub Actions workflows
├── firebase.json      # Firebase configuration
├── firestore.rules    # Firestore security rules
├── firestore.indexes.json
├── .firebaserc        # Firebase project config
├── Dockerfile.frontend
├── docker-compose.yml
└── nginx.conf
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

## Contact Form

The contact form submits to a backend API endpoint instead of using EmailJS.

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
- Sends email notification to `mabulayron420@gmail.com` via SendGrid (if configured)

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

When `SENDGRID_API_KEY` is set, the backend sends an email notification to `mabulayron420@gmail.com` for each contact form submission.

## Firebase Configuration

- **Project ID**: `personal-website-ron-9f777`
- **Hosting**: Serves from root directory (`.`)
- **Firestore**: Enabled with rules in `firestore.rules`

## CI/CD Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| `firebase-hosting-merge.yml` | Push to `main` | Deploys to Firebase Hosting live channel |
| `firebase-hosting-pull-request.yml` | PR to `main` | Deploys to preview channel |
| `ci.yml` | Push/PR to `uat` or `main` | Validates HTML and CSS files exist and are not empty |

## Deployment

- **Live URL**: https://personal-website-ron-9f777.web.app
- **Deploys automatically** on push to `main` branch
- **Workflow**: `.github/workflows/firebase-hosting-merge.yml`

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

### Docker
```bash
docker-compose up
```