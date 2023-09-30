## About

This is the intro web-page for the Xnor team.

## Pre-requirements

```
node
```

## Setup

you can clone it using git:
```
git clone
```
install the dependencies:
```
yarn install
```

then serve it with a process manager/service control

### Example: systemd

```
[Unit]
Description="Xnor intro node app"

[Service]
Type=simple
ExecStart=<node path> <project-path>/xnor-intro/index.js
WorkingDirectory=<project-path>/xnor-intro

User=nobody
Group=nogroup

# Environment variables:
Environment=NODE_ENV=production

# Allow many incoming connections
LimitNOFILE=infinity

# Allow core dumps for debugging
LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target


```
save it as a system service like ```/etc/systemd/system/xnor-intro.service```

then start it:
```
systemctl enable --now xnor-intro.service
```

Salavat

## Setup a reverse proxy (Optional)

you can setup a reverse proxy in order to off-load loads from the node.

### Example (Nginx)

```
server {
    listen 80;

    server_name <server-name>;
    root <project-path>/xnor-intro/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";


    charset utf-8;

    gzip on;
    gzip_types text/plain image/jpeg image/png;

    location / {
      proxy_redirect off;
      proxy_pass http://127.0.0.1:8009;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}

```