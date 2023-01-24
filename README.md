# YamYam

## First install

Edit your hosts file `C:\Windows\System32\drivers\etc` and add these lines at the end

```sh
#archi
127.0.0.1 app.yamyam.test
127.0.0.1 api.yamyam.test
127.0.0.1 dashboard.yamyam.test
```

## Launch dev stack

Requirement : [docker compose](https://docs.docker.com/desktop/install/windows-install/).

On windows, open docker desktop.
Then :

```
docker-compose up -d
```

## Accesses

Dashboard
[dashboard.yamyam.test](dashboard.yamyam.test)

App
[app.yamyam.test](app.yamyam.test)

API
[api.yamyam.test](api.yamyam.test)
