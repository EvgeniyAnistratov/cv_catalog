# Environment variables description

The list of expected environment variables used by the application is described in the `.env.example` file. Environment variables can be configured in the `.env` file. To do this, copy the `.env.example` file to `.env` and set the environment variables in that file:

```bash
cp .env.example .env
```

Environment variables can also be configured without creating a `.env` file in the project root directory. In this case, all variables can be set as **environment variables** or **shell variables**. For example, using the `export` command (a built-in Bash shell utility: `export ENV_NAME=ENV_VALUE`), or any other available method.<br />

## APP_LISTEN_HOST

Default: **0.0.0.0** <br/>
Host address on which the application will listen for incoming requests.<br />

## APP_LISTEN_PORT

Default: **3000** <br/>
Port number on which the application will listen for incoming requests.<br />

## DB_URL

Default: **postgres://postgres:<password>@postgres:5432/cv_catalog_db** <br/>
Connection string for the PostgreSQL database. Don't forget to set the password.<br />
