# Mealaway

## First install

Edit your hosts file `C:\Windows\System32\drivers\etc` and add these lines at the end

```sh
#archi
127.0.0.1 app.mealaway.test
127.0.0.1 api.mealaway.test
127.0.0.1 dashboard.mealaway.test
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
[dashboard.mealaway.test](dashboard.mealaway.test)

App
[app.mealaway.test](app.mealaway.test)

API
[api.mealaway.test](api.mealaway.test)
