# Notes API Spec

## Create Note

Endpoint : POST /api/notes

Headers: 
- Authorization: token

Request Body :

```json
{
  "title" : "notes",
  "content": "notes"
}
```

Response Body :

```json
{
  "data": {
    "id": 1,
    "title" : "notes",
    "content": "notes",
    "createdAt": "240901",
    "updatedAt": "240901",
    "createdBy": "mataringan",
    "updatedBy": "mataringan"
  }
}
```

## Get Note

Endpoint : GET /api/notes/:noteId

Headers:
- Authorization: token

Response Body :

```json
{
  "data": {
    "id": 1,
    "title" : "notes",
    "content": "notes",
    "createdAt": "240901",
    "updatedAt": "240901",
    "createdBy": "mataringan",
    "updatedBy": "mataringan"
  }
}
```

## Update Note


Endpoint : PUT /api/notes/:noteId

Headers:
- Authorization: token

Request Body :

```json
{
  "title" : "notes",
  "content": "notes"
}
```

Response Body :

```json
{
  "data": {
    "id": 1,
    "title" : "notes",
    "content": "notes",
    "createdAt": "240901",
    "updatedAt": "240901",
    "createdBy": "mataringan",
    "updatedBy": "mataringan"
  }
}
```

## Remove Note

Endpoint : DELETE /api/notes/:noteId

Headers:
- Authorization: token

Response Body :

```json
{
  "data": true
}
```

## Search Note

Endpoint : GET /api/notes

Headers:
- Authorization: token

Query Params:
- title: string,
- content: string,
- page: number, default 1
- size: number, default 10


Response Body :

```json
{
  "data": [
    {
      "id": 1,
      "title" : "notes",
      "content": "notes",
      "createdAt": "240901",
      "updatedAt": "240901",
      "createdBy": "mataringan",
      "updatedBy": "mataringan"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```
