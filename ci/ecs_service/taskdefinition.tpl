[
  {
    "containerName": "${container_name}", 
    "name": "${container_name}", 
    "secrets": [
      {"name": "NEXT_PUBLIC_DATABASE_URL", "valueFrom": "/backend/dev/NEXT_PUBLIC_DATABASE_URL"},
      {"name": "GOOGLE_CLIENT_ID", "valueFrom": "/backend/dev/GOOGLE_CLIENT_ID"},
      {"name": "GOOGLE_CLIENT_SECRET", "valueFrom": "/backend/dev/GOOGLE_CLIENT_SECRET"},
      {"name": "JWT_SECRET", "valueFrom": "/backend/dev/JWT_SECRET"},
      {"name": "NEXT_PUBLIC_API_URL", "valueFrom": "/backend/dev/NEXT_PUBLIC_API_URL"},
      {"name": "NEXTAUTH_URL", "valueFrom": "/backend/dev/NEXTAUTH_URL"},
      {"name": "NEXT_PUBLIC_URL", "valueFrom": "/backend/dev/NEXT_PUBLIC_URL"},
      {"name": "NEXT_PUBLIC_STRAPI_URL", "valueFrom": "/backend/dev/NEXT_PUBLIC_STRAPI_URL"},
      {"name": "NEXTAUTH_SECRET", "valueFrom": "/backend/dev/NEXTAUTH_SECRET"},
      {"name": "STRIPE_WEBHOOK_SECRET", "valueFrom": "/backend/dev/STRIPE_WEBHOOK_SECRET"},
      {"name": "STRIPE_SECRET_KEY", "valueFrom": "/backend/dev/STRIPE_SECRET_KEY"},
      {"name": "NEXT_PUBLIC_STRIPE_PUBLISH_KEY", "valueFrom": "/backend/dev/NEXT_PUBLIC_STRIPE_PUBLISH_KEY"}
    ],
    "taskRoleArn": "${role_arn}",
    "executionRoleArn": "${role_arn}",
    "image": "${repo_arn}:${image_tag}",
    "portMappings": [
      {
        "containerPort": ${container_port},
        "hostPort": ${host_port}
      }
    ],
    "memoryReservation": 256
  }
]