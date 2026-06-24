# DevOps Learning Roadmap — Task Tracker

## Current Website Gaps (vs. DevOps Job Requirements)

| # | Gap | Currently on Site? | Priority |
|---|-----|--------------------|----------|
| 1 | Kubernetes (K8s) | ❌ Not mentioned anywhere | HIGH |
| 2 | Terraform / Infrastructure as Code | ❌ Not mentioned | HIGH |
| 3 | Monitoring (Prometheus + Grafana) | ❌ Not mentioned | HIGH |
| 4 | Security scanning in CI (Trivy/Dependabot) | ❌ Not mentioned | MEDIUM |
| 5 | Helm / ArgoCD / GitOps | ❌ Not mentioned | HIGH |
| 6 | Multi-stage Docker builds | ❌ Current Dockerfile is single-stage | MEDIUM |
| 7 | Jenkins (alternative CI/CD) | ❌ Only GitHub Actions listed | LOW |
| 8 | Linux administration (deeper) | ⚠️ Listed but no project proves it | LOW |
| 9 | End-to-end pipeline (not "practice") | ⚠️ Current project says "practice" | HIGH |

---

## 8-Week Plan

### Week 1: Multi-Stage Docker Build + CI Improvement
- [x] Convert `backend/Dockerfile` to multi-stage build (builder + runtime)
- [x] Add `docker build` step to CI workflow with image tagging (`:sha`, `:latest`)
- [x] Push image to Artifact Registry via GitHub Actions
- [x] Update website: change "CI/CD Pipeline Project" description to reflect real pipeline

**Skills gained:** Multi-stage Docker, image registry, CI automation

---

### Week 2: Kubernetes Basics (Local) ✅ COMPLETED
- [x] Install minikube, kubectl, Helm on your machine
- [x] `minikube start` — verify cluster is running
- [x] Deploy backend manually with `kubectl apply -f k8s/deployment.yaml`
- [x] Access the backend via `minikube service`
- [x] Practice: `kubectl get pods`, `kubectl logs`, `kubectl describe`, `kubectl exec`

**Skills gained:** Pods, Deployments, Services, kubectl

---

### Week 3: Security Scanning in CI
- [ ] Add Trivy container scan to GitHub Actions (scan Docker image for CVEs)
- [ ] Enable Dependabot on your GitHub repo (auto-PR for dependency updates)
- [ ] Add a `docker scan` or `trivy image` step in your build workflow
- [ ] Update website: add "Security" to DevOps & CI/CD card

**Skills gained:** Container security, vulnerability scanning, supply chain security

---

### Week 4: Helm Chart
- [ ] Create `helm/personal-website-backend/` chart structure
- [ ] Create Chart.yaml, values.yaml, templates (deployment, service, hpa, secret)
- [ ] Deploy with `helm install` on minikube
- [ ] Test `helm upgrade` with a changed value (e.g., replicas: 2)
- [ ] Practice `helm rollback`

**Skills gained:** Helm templating, releases, upgrades, rollbacks

---

### Week 5: ArgoCD + GitOps
- [ ] Install ArgoCD on minikube
- [ ] Access ArgoCD UI via port-forward
- [ ] Create `argocd/application.yaml` pointing at your Helm chart
- [ ] Push a change to GitHub → watch ArgoCD auto-sync
- [ ] Test self-heal: manually delete a pod → ArgoCD recreates it

**Skills gained:** GitOps, ArgoCD, declarative infrastructure, self-healing

---

### Week 6: Terraform (IaC)
- [ ] Install Terraform CLI
- [ ] Create `terraform/` folder with: main.tf, variables.tf, outputs.tf
- [ ] Define your existing GCP resources (Cloud Run, Firestore, Artifact Registry)
- [ ] `terraform init` → `terraform plan` (don't apply yet, just see the plan)
- [ ] Import existing resources with `terraform import`
- [ ] Add Terraform state to a GCS bucket (remote backend)

**Skills gained:** IaC, Terraform HCL, state management, resource imports

---

### Week 7: Monitoring (Prometheus + Grafana)
- [ ] Add `prom-client` to your backend — expose `/metrics` endpoint
- [ ] Metrics to expose: request_count, response_time, error_rate
- [ ] Deploy Prometheus on minikube (via Helm: `kube-prometheus-stack`)
- [ ] Configure Prometheus to scrape your backend's `/metrics`
- [ ] Create a Grafana dashboard showing your backend's health
- [ ] Set up an alert (e.g., error rate > 5%)

**Skills gained:** Prometheus, Grafana, metrics, alerting, observability

---

### Week 8: Update Website + Polish
- [ ] Update Skills section with new tools
- [ ] Rewrite Projects section with real descriptions (not "practice")
- [ ] Add architecture diagram (text or image)
- [ ] Add "Tools" visual grid showing all DevOps tools used
- [ ] Update resume.pdf to match
- [ ] Push to main, deploy

---

## Website Updates to Make After Each Week

### Skills section (target state):
```
Cloud & Infrastructure    → AWS, GCP, Terraform, Cloud Run, GKE
Containers & Orchestration → Docker, Kubernetes, Helm
CI/CD & GitOps            → GitHub Actions, ArgoCD, multi-stage builds
Monitoring & Observability → Prometheus, Grafana
Security                  → Trivy, Dependabot, container scanning
Automation & Scripting    → PowerShell, Python, Bash, SQL
```

### Projects section (target state):
```
1. Personal Website Infrastructure (this project)
   - Full CI/CD pipeline: GitHub Actions → Docker build → Artifact Registry → ArgoCD → Kubernetes
   - Infrastructure as Code with Terraform (Cloud Run, Firestore, IAM)
   - Helm chart with HPA, health checks, secrets management
   - Prometheus + Grafana monitoring with custom dashboards
   - Security scanning with Trivy in CI pipeline

2. Snipe-IT Asset Management
   - (keep as-is or enhance with K8s deployment)

3. Personal File Server
   - (keep as-is)
```

---

## Progress Tracker

| Week | Status | Completed Date | Notes |
|------|--------|----------------|-------|
| 1 - Docker + CI | ✅ Done | June 15, 2026 | Multi-stage Dockerfile, CI push to Artifact Registry |
| 2 - Kubernetes basics | ✅ Done | June 15, 2026 | Deployed backend to minikube, pod running |
| 3 - Security scanning | ✅ Done | June 15, 2026 | Trivy in CI pipeline, Dependabot enabled |
| 4 - Helm | ✅ Done | June 18, 2026 | Chart created, lint passed, helm install/upgrade tested |
| 5 - ArgoCD | ✅ Done | June 20, 2026 | Installed on minikube, GitOps auto-sync working, UI accessed |
| 6 - Terraform | ✅ Done | June 22, 2026 | IaC for GCP (Cloud Run, Firestore, Artifact Registry), plan validated |
| 7 - Monitoring | ⬜ Not started | | |
| 8 - Website update | ⬜ Not started | | |

---

## Key Learnings & Notes

### Week 1: Docker + CI
- Multi-stage builds = smaller images, no build tools in production
- Non-root user in container = security best practice
- Tag images with git SHA for traceability (`:sha` + `:latest`)
- CI pipeline: Build → Scan → Push (scan gates the push)

### Week 2: Kubernetes
- Pod = your running container
- Deployment = manages pods (replicas, rolling updates)
- Service = stable network endpoint for pods
- `imagePullPolicy: Never` for local images in minikube
- Key commands: `kubectl get pods`, `kubectl logs`, `kubectl describe`

### Week 3: Security
- Trivy scans Docker images for CVEs before pushing
- `exit-code: '1'` = fail the pipeline if vulnerabilities found
- Dependabot auto-creates PRs for outdated/vulnerable dependencies
- Three ecosystems: npm, docker, github-actions

### Week 4: Helm
- Helm = package manager for Kubernetes (like npm for Node)
- Chart.yaml = metadata (name, version)
- values.yaml = configurable variables (change here, applies everywhere)
- templates/ = Kubernetes YAML with `{{ .Values.* }}` placeholders
- `_helpers.tpl` = reusable snippets (like functions)
- Key commands: `helm lint`, `helm install`, `helm upgrade`, `helm rollback`, `helm uninstall`

### Week 5: ArgoCD
- GitOps = git repo is the single source of truth
- ArgoCD watches your repo and auto-syncs to cluster
- Self-heal = if someone manually changes something, ArgoCD reverts it
- Prune = deletes resources removed from git
- Application YAML points ArgoCD at your Helm chart path
- UI blocked by corporate TLS policy — use kubectl or try at home

### Week 6: Terraform
- IaC = Infrastructure as Code — define cloud resources in .tf files
- `terraform init` = download provider plugins
- `terraform plan` = preview what would change (safe, read-only)
- `terraform apply` = actually create/modify resources
- `terraform destroy` = delete all managed resources
- `terraform import` = adopt existing resources into state
- **Key insight:** To recreate the same infra in a new project, just `terraform apply -var="project_id=new-project"` — one command, full infra
- Don't commit `.terraform/` or `*.tfstate` files (add to .gitignore)

---

## General Notes
- All learning happens on minikube (FREE, local)
- GKE only needed if you want a live demo (optional, ~$25-40/month)
- Keep all configs in your GitHub repo — recruiters will check
- Minikube pods show ErrImagePull/CrashLoopBackOff because no GCP credentials locally — expected, not a config error
- Corporate laptop blocks self-signed certs (ArgoCD UI) — use Firefox at home or CLI
- Update this file as you complete tasks ✅
