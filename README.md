# Admin backend service

## Setup

1. Clone project
2. Run `yarn install`
3. Setup .env file
4. Run `yarn dev` for development, or `docker-compose start -d` for production

## Env variables

Provide this variables to the .env file

```bash
COOKIE_SECRET=string # Secret word for signing session cookie
PORT=number # Port on which application would run
NODE_ENV=production|development # Is application should run in development or production mode
```
