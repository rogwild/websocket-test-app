# Middleware Service

Service for connections with exchanges

## Development

To run the project, you need to create a `.env` file and fill it with data.

```bash
cp .env.example .env
```

Then execute the command:

```bash
yarn install && yarn develop
```

# Create image and push to Canister

To create and upload a new version of the project in [Canister](https://canister.io) replace the project version with the appropriate one.

It was: zenfuse/dashboard_middleware_service:**0.0.8**

Has become: zenfuse/dashboard_middleware_service:**0.0.9**

The change must be made in all commands.

Then log in to Canister:

```bash
docker login --username=zenfuse cloud.canister.io:5000
```

To create an `Image` and send it to the server, run the command:

```bash
docker build --no-cache -f Dockerfile.production -t zenfuse/dashboard_middleware_service:1.0.0 . && docker tag zenfuse/dashboard_middleware_service:1.0.0 cloud.canister.io:5000/zenfuse/dashboard_middleware_service:1.0.0 && docker push cloud.canister.io:5000/zenfuse/dashboard_middleware_service:1.0.0
```
