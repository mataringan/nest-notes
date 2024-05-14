# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "mataringan",
  "password": "rahasia",
  "name": "ari"
}
```

Response Body (Success) :

```json
{
  "data": {
      "username": "mataringan",
      "name": "ari"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username already registered"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "mataringan",
  "password": "rahasia"
}
```

Response Body (Success) :

```json
{
  "data": {
      "username": "mataringan",
      "name": "ari",
      "token": "rahasia"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Username or password is wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Headers: 
- Authorization: token

Response Body (Success) :

```json
{
  "data": {
      "username": "mataringan",
      "name": "ari"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users/current

Headers:
- Authorization: token


Request Body :

```json
{
  "username": "mataringan",
  "password": "rahasia",
  "name": "ari"
}
```

Response Body (Success) :

```json
{
  "data": {
      "username": "mataringan",
      "name": "ari"
  }
}
```

## Logout User

Endpoint : DELETE /api/users/current

Headers:
- Authorization: token

Response Body (Success) :

```json
{
  "data": true
}
```