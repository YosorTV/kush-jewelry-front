
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    key = "ecs_service/frontend"
  }
}

provider "aws" {
  region = var.region
}


resource "aws_ecs_service" "ecs_service" {
  name            = var.name
  cluster         = data.terraform_remote_state.ecs.outputs.ecs_cluster_arn
  task_definition = aws_ecs_task_definition.service.arn
  desired_count   = 1
  load_balancer {
    target_group_arn = data.terraform_remote_state.ecs.outputs.target_group_frontend_arn
    container_name = var.name
    container_port = 3000
  }
}

resource "aws_ecs_task_definition" "service" {
  family                = "service"
  container_definitions = data.template_file.template.rendered  
  task_role_arn         = data.terraform_remote_state.ci_frontend.outputs.role_arn
  execution_role_arn    = data.terraform_remote_state.ci_frontend.outputs.role_arn
}

data "template_file" "template" {
  template = "${file("taskdefinition.tpl")}"
  vars = {
    container_name = var.name
    role_arn = data.terraform_remote_state.ci_frontend.outputs.role_arn
    repo_arn = data.terraform_remote_state.ecr.outputs.ecr_repo_frontend_repository_url
    image_tag = var.image_tag
    container_port = 3000
    host_port = 3000
    environment = var.environment
  }
}