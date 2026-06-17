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
| 3 - Security scanning | ⬜ Not started | | |
| 4 - Helm | ⬜ Not started | | |
| 5 - ArgoCD | ⬜ Not started | | |
| 6 - Terraform | ⬜ Not started | | |
| 7 - Monitoring | ⬜ Not started | | |
| 8 - Website update | ⬜ Not started | | |

---

## Notes
- All learning happens on minikube (FREE, local)
- GKE only needed if you want a live demo (optional, ~$25-40/month)
- Keep all configs in your GitHub repo — recruiters will check
- Update this file as you complete tasks ✅
