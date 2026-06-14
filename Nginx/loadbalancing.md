## Basic load balancing configuration
### Below is a sample load-balancing configuration for two Python applications running on different port to simulate two servers 

```
upstream backend {
    server localhost:8001;
    server localhost:8002;
}

server {
    listen 80;

    location / {
        proxy_pass http://backend;
    }
}

```
The above configuration should be inside the http block in nginx.conf file or default file in the sites-available folder
use the below command to run the first Python app and the second Python app
** run the command below ** Make sure you have python installed on your server
```
python3 -m http.server 8001
python3 -m http.server 8002
```

