# Detail Notes API Spec

## Create Detail

Endpoint: POST /api/notes/:noteId/detail

Headers: 
- Authorization: token

Request Body :

```json
{
  "categories": "Personal",
  "tags": "Urgent"
}
```

Response Body :

```json
{
  "data": {
    "id": 1,
    "categories" : "Personal",
    "tags": "Urgent",
    "createdAt": "240901",
    "updatedAt": "240901",
    "createdBy": "mataringan",
    "updatedBy": "mataringan"
  }
}
```

## Get Detail

Endpoint: GET /api/notes/:noteId/detail/:detailId

Headers:
- Authorization: token

Response Body :

```json
{
  "data": {
    "id": 1,
    "categories" : "Personal",
    "tags": "Urgent",
    "createdAt": "240901",
    "updatedAt": "240901",
    "createdBy": "mataringan",
    "updatedBy": "mataringan"
  }
}
```

## Update Detail

Endpoint: PUT /api/notes/:noteId/detail/:detailId

Headers:
- Authorization: token

Request Body :

```json
{
  "categories": "Personal",
  "tags": "Urgent"
}
```

Response Body :

```json
{
  "data": {
    "id": 1,
    "categories" : "Personal",
    "tags": "Urgent",
    "createdAt": "240901",
    "updatedAt": "240901",
    "createdBy": "mataringan",
    "updatedBy": "mataringan"
  }
}
```

## Remove Detail

Endpoint: DELETE /api/notes/:noteId/detail/:detailId

Headers:
- Authorization: token

Response Body :

```json
{
  "data": true
}
```

## List Detail

Endpoint: GET /api/notes/:noteId/detail

Headers:
- Authorization: token

Response Body :

```json
{
  "data": [
    {
      "id": 1,
      "categories" : "Personal",
      "tags": "Urgent",
      "createdAt": "240901",
      "updatedAt": "240901",
      "createdBy": "mataringan",
      "updatedBy": "mataringan"
    }
  ]
}
```
