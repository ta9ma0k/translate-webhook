terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.10.0"
    }
  }
}

resource "google_iam_workload_identity_pool" "aws_id_pool" {
  project = var.gcp_id
  workload_identity_pool_id = "aws-id-pool-1"
  display_name = "aws-id-pool"
  description = "For aws"
  timeouts {}
}

resource "google_iam_workload_identity_pool_provider" "aws_id_provider" {
  project = var.gcp_id
  workload_identity_pool_id = google_iam_workload_identity_pool.aws_id_pool.workload_identity_pool_id
  workload_identity_pool_provider_id = "aws-provider"
  display_name = "aws-provider"
  aws {
    account_id = var.aws_account_id
  }
}

resource "google_service_account" "aws_sa" {
  project      = var.gcp_id
  account_id   = "aws-cloud-translation"
  display_name = "awsからCloutTranslationを実行するサービスアカウント"
}
  
resource "google_project_iam_member" "aws_sa_role" {
  project = var.gcp_id
  role    = "roles/cloudtranslate.user"
  member  = "serviceAccount:${google_service_account.aws_sa.email}"
}

resource "google_service_account_iam_binding" "aws_sa_role_binging" {
  service_account_id = google_service_account.aws_sa.name
  role               = "roles/iam.workloadIdentityUser"
  
  members = [
    "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.aws_id_pool.name}/attribute.aws_role/arn:aws:sts::${var.aws_account_id}:assumed-role/${var.assumed_role_name}"
  ]
}
