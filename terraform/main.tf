# Enable required APIs
resource "google_project_service" "cloud_run" {
  service = "run.googleapis.com"
}

resource "google_project_service" "firestore" {
  service = "firestore.googleapis.com"
}

resource "google_project_service" "artifact_registry" {
  service = "artifactregistry.googleapis.com"
}

# Artifact Registry for Docker images
resource "google_artifact_registry_repository" "backend" {
  location      = var.region
  repository_id = "backend"
  format        = "DOCKER"
  description   = "Backend Docker images"
}

# Cloud Run service
resource "google_cloud_run_v2_service" "backend" {
  name     = "personal-website-backend"
  location = var.region

  template {
    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/backend/personal-website-backend:latest"

      ports {
        container_port = 8080
      }

      env {
        name  = "NODE_ENV"
        value = "production"
      }

      env {
        name  = "PORT"
        value = "8080"
      }
    }
  }

  depends_on = [google_project_service.cloud_run]
}

# Make Cloud Run publicly accessible
resource "google_cloud_run_v2_service_iam_member" "public" {
  name     = google_cloud_run_v2_service.backend.name
  location = var.region
  role     = "roles/run.invoker"
  member   = "allUsers"
}
