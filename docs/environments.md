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

## DB_HOST

Default: **postgres** <br/>
PostgreSQL server host used by the application

## DB_NAME

Default: **cv_catalog_db** <br/>
Name of the database used by the application

## DB_PASSWORD

Default: **\<not set>** <br/>
Password for the PostgreSQL user

## DB_PORT

Default: **5432** <br/>
PostgreSQL server port

## DB_USER

Default: **postgres** <br/>
Username for connecting to the PostgreSQL database
