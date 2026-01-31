output "pages_url" {
  description = "The URL of the deployed Cloudflare Pages site"
  value       = "https://${cloudflare_pages_project.dyson.subdomain}.pages.dev"
}

output "pages_project_name" {
  description = "The name of the Cloudflare Pages project"
  value       = cloudflare_pages_project.dyson.name
}
