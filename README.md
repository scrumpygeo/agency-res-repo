# API - Express and MongoDB

API for employment agency client list using mongoDB and Express
This is the api part of a mern stack course.

Uses JWT.
User id is contained in the token.
Token is contained in x-auth-token in header and identifies id

End points:

```
Register User:                 POST   /api/users
Login User:                    POST   /api/auth
Authorize User:                GET    /api/auth
Delete User:                   DELETE /api/profiles
Create/Update Profile:         POST   /api/profiles
Get Logged in User Profile:    GET    /api/profiles/me
Get all Profiles               GET    /api/profiles
Get Profile by user id         GET    /api/profiles/user/:id
Add Experience to Profile      POST   /api/profiles/experience
Delete Experience from Profile DELETE /api/profiles/experience/:exp_id
Add Education to Profile       POST   /api/profiles/education/
Delete Education from Profile  DELETE /api/profiles/education/:edu_id
```
