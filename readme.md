## BTS Technical Test

Developed using javascript

### Function List

Functions included in this application:

### 1. JWT Auth

Endpoint
```
http://{url}/login POST
```
Request Body
```
{
    "username":"{username}",
    "password":"{password}"
}
```
Response Body
```
{
    "status": "200",
    "result": [{userData}, {token}],
    "message": "login succeeded"
}
```
Endpoint
```
http://{url}/register POST
```
Request Body
```
{
    "username":"{username}",
    "password":"{password}",
    "email": "{email}"
}
```
Response Body
```
{
    "status": "201",
    "result": "{accountCreated}",
    "message": "A new account has been successfully made"
}
```

### 2. Checklist

Endpoint
```
http://{url}/checklist GET
```

Request Header
```
{
    "Authorization":"Bearer {token}"
}
```

Response Body
```
{
    "status": "200",
    "result": [{
        "id": {id},
        "name": "{name"
    }],
    "message": "data have been successfully fetched"
}
```

Endpoint
```
http://{url}/checklist POST
```

Request Header
```
{
    "Authorization":"Bearer {token}"
}
```
Request Body
```
{
    "name":"{name}"
}
```

Response Body
```
{
    "status": "200",
    "result": [{result}],
    "message": "new checklist has been successfully made"
}
```
Endpoint
```
http://{url}/checklist/:id DELETE
```

Request Header
```
{
    "Authorization":"Bearer {token}"
}
```

Response Body
```
{
    "status": "200",
    "result" [{result}],
    "message": "a checklist has been successfully made"
}
```
