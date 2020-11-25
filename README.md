## Instructions to run the project (Production Mode)

### 1- Stop all running containers (if there is any)

```
docker-compose down
```

#### Optional: If you want to destroy and rebuild all docker images of the project, run the command below:

```
docker-compose down --rmi all
```

### 2- Build all images and run containers (services)

This command will Build new images, create all containers, and start all containers (Compose). (This will not rebuild images if a Dockerfile changes.)

```
docker-compose up
```

Thats it ! Congratulations, now you should have all the services up and running !
<br/>
<br/>

The React frontend application (Dapp) is spun up at `http://localhost:3000` and it proxies internally to the server using the linked name.

The API server (worker) is spun up at `http://localhost:8080`
<br/>
<br/>

## Advanced Configuration

### Build, create, and start all in the background.

```
docker-compose up -d
```

### Rebuild all images, create all containers, and start all containers.

```
docker-compose up --build
```

### Notes

If you face any issue in the first load of the application, try to restart services that are not responding using the commands below:

#### Restart server

```
docker-compose restart server
```

#### Restart client

```
docker-compose restart nginx
```

#### To check status

```
docker-compose ps
```
