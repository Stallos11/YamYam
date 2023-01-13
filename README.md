# m2-archi

## First install

Edit your hosts file `C:\Windows\System32\drivers\etc` and add these lines at the end

```sh
#archi
127.0.0.1 app.archi.test
127.0.0.1 api.archi.test
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
[app.archi.test](app.archi.test)

API
[api.archi.test](api.archi.test)
