terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }

  required_version = ">= 1.0.0"
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_pages_project" "dyson" {
  account_id        = var.cloudflare_account_id
  name              = "project-dyson"
  production_branch = "main"

  source {
    type = "github"
    config {
      owner                         = "thijs-hakkenberg"
      repo_name                     = "dyson"
      production_branch             = "main"
      pr_comments_enabled           = true
      deployments_enabled           = true
      production_deployment_enabled = true
      preview_deployment_setting    = "custom"
      preview_branch_includes       = ["dev", "staging", "feature/*"]
    }
  }

  build_config {
    build_command   = "npm run build"
    destination_dir = "build"
  }

  deployment_configs {
    production {
      environment_variables = {
        NODE_VERSION = "20"
      }
    }
    preview {
      environment_variables = {
        NODE_VERSION = "20"
      }
    }
  }
}
