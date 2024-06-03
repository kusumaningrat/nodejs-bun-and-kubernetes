# simple-http-server

To install dependencies locally, run below command:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

Build and push docker image locally, run below command:

```bash
docker build -t simple-http-server .
docker tag simple-http-server <docker-hub-username>/simple-http-server
docker push <docker-hub-username>/simple-http-servert
```

Apply kubernetes configuration file

```bash
kubectl apply -f simple-http-server.yaml
kubectl apply -f hpa.yaml
```

Do stree test in your Deployment

```bash
kubectl run -it --rm load-generator --image=busybox /bin/sh
while true; do wget -q -O- http://<node_ip>:<port>; done 
```

