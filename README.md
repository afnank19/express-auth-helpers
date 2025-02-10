## express-auth-helpers

Express auth helpers are a set of middleware and helper functions that speed up rolling your own auth for small projects.

The documentation is still being worked on :p

### API Reference

##### Function: `authenticateAction(options: Object)`

Middleware function for authenticating a user that presents an bearer token.
Returns an express middleware function that can be used in the typical way.
`options: { secret: your-jwt-key }`

### Example

```javascript
const authenticateUser = authenticateAction({ secrets: "your-jwt-secret" });
app.post("/users/blogs", authenticateUser, ...OtherMiddleware);
```

##### Function: `generateHash(password: string)`

Pass in a password to generate a hash using bcrypt, currently only 10 passes.
Returns the hash for storage in db

### Example

```javascript
const hash = generateHash("superstrongpassword");
```

##### Function: `verifyPassword(password: string, hash: string)`

Pass in the password provided by the user, along with the hash fetched from the DB
Returns a boolean isMatch which is true for success.

### Example

```javascript
const { password } = req.body;
const hash = userService.fetchUserHash(id);

const isMatch = await verifyPassword(password, hash);

if (!isMatch) {
  res.json({ msg: "Wrong credentials" });
}

// rest of your code
```
