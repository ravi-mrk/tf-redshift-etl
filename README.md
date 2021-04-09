### To run this:

First install terraform if you do not have it already.
Then run:
```
terraform init
terraform apply
yarn install
yarn build
yarn server
```

POST some data to `localhost:3000/data` in format `curl -H "Content-Type: application/json" -X POST http://localhost:3000/data -d '{    "request_id": "fc417c2b-fe7a-4737-afe2-bec49c0ebd6f",    "request_timestamp": "2020-06-01 00:00:24.000000",    "cookie_id": "a09c4ca3-d142-4312-ba78-029c3355b8ef",    "topic": "dolphin_cms.wizard.step.color_palette.set",    "message": "{\"isAffiliate\":false,\"language\":\"es\",\"isRecommendedPalette\":true,\"color\":\"#6d8d79\",\"paletteIndex\":\"0\",\"workspaceId\":\"ecaca5cd-e23c-4f6d-8ec9-ad8695b378d5\"}",    "environment": "dolphin_cms",    "website_id": null,    "user_account_id": "0f36f200-df29-4fbf-8625-39a88b7f778c",    "location": "https://cms.jimdo.com/wizard/color-palette/",    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0",    "referrer": "https://register.jimdo.com/es/product"  }'`

### Destroying created resources
```
terraform destroy
```

This will fail to remove the S3 bucket if there were data created outside of the Terraform configs, so those will have to be deleted manually.

