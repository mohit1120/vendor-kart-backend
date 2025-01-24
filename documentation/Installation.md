# Installation

## Prerequisites

Before you begin the installation process, ensure you have the following prerequisites installed and configured on your system:

1. **PostgreSQL Server:**

   - Make sure you have PostgreSQL installed and running on your machine. You can download and install PostgreSQL from the [official website](https://www.postgresql.org/).

2. **Redis Server:**

   - Make sure you have Redis installed and running on your machine. You can download and install Redis from the [official website](https://www.npmjs.com/package/redis/v/4.0.0-next.5/).

3. **Node.js:**

   - Install the latest version of Node.js from the [official website](https://nodejs.org/).

4. **Visual Studio Code:**

   - Install Visual Studio Code, a lightweight but powerful source code editor, from the [official website](https://code.visualstudio.com/).

5. **DBeaver:**

   - Install DBeaver, a universal database tool for developers and database administrators, from the [official website](https://dbeaver.io/).

6. **Redis Insight:**

   - Install Redis Insight, a universal redis tool for developers and database administrators, from the [official website](https://redis.io/insight/).

7. **Node.js Dependencies:**

   - Once Node.js is installed, navigate to the root directory of the Migrations repository and run the following command to install all Node.js dependencies:
     ```
     npm install
     ```
     This will install all the required Node.js packages specified in the `package.json` file.

8. **.env Setup:**
   - Run following commmand on root of repo:
   ```
   cp example.env .env
   ```

---

## Steps

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
    - [Setting up DATABASE](#setting-up-database)
      - [Postgres Start on Local Machine](#postgres-start-on-local-machine)
      - [Postgres Status Check](#postgres-status-check)
      - [Accessing Postgres in Ubuntu](#accessing-postgres-in-ubuntu)
      - [Create User](#create-user)
      - [Create Database](#create-database)
      - [Change User Password](#change-user-password)
      - [Grant User Permissions](#grant-user-permissions)
      - [Other Useful Commands](#other-useful-commands)
    - [Installing and Connecting to Database using DBeaver](#installing-and-connecting-to-database-using-dbeaver)
      - [Steps](#steps-1)
      - [Connecting to a Database](#connecting-to-a-database)
    - [Running this repo](#running-this-repo)
  - [Configuration](#configuration)
  - [Verification](#verification)
  - [Troubleshooting](#troubleshooting)
  - [Uninstallation](#uninstallation)
  - [Additional Resources](#additional-resources)

### Setting up DATABASE

#### Postgres Start on Local Machine

To start the Postgres service on your local machine, run the following command:

```shell
sudo service postgresql start
```

#### Postgres Status Check

To check the status of the Postgres service, use the following command:

```shell
sudo service postgresql status
```

#### Accessing Postgres in Ubuntu

To access the Postgres command line in Ubuntu, use the following command:

```shell
sudo -u postgres psql
```

#### Create User

To create a new user in Postgres, run the following command in the Postgres command line:

```shell
create user postgres;
```

#### Create Database

To create a new database in Postgres, run the following command in the Postgres command line:

```shell
create database postgres;
```

#### Change User Password

To change the password for a user in Postgres, run the following command in the Postgres command line:

```shell
alter user postgres password 'postgres';
```

#### Grant User Permissions

To grant permissions to a user in Postgres, run the following command in the Postgres command line:

```shell
GRANT postgres TO postgres;
```

#### Other Useful Commands

To list all databases, use the following command in the Postgres command line:

```shell
\l
```

To list all users and their roles, use the following command in the Postgres command line:

```shell
\du
```

### Installing and Connecting to Database using DBeaver

This guide will walk you through the process of installing DBeaver and connecting to a database.

#### Steps

1. Go to the [DBeaver website](https://dbeaver.io/) and download the appropriate version for your operating system.
2. Run the installer and follow the on-screen instructions to complete the installation.

#### Connecting to a Database

1. Launch DBeaver.
2. Click on the "New Connection" button in the toolbar, or go to `Database` -> `New Connection`.

3. In the "New Connection" dialog, select the database type you want to connect to (e.g., PostgreSQL, MySQL, Oracle, etc.) and click "Next".

4. Fill in the connection details:

   - **Host:** The hostname or IP address of the database server.
   - **Port:** The port number on which the database server is running.
   - **Database:** The name of the database you want to connect to.
   - **Username:** Your database username.
   - **Password:** Your database password.

5. Click "Test Connection" to verify that the connection settings are correct and DBeaver can connect to the database successfully. If the test is successful, click "Finish" to save the connection.

6. The new connection will appear in the DBeaver workspace. Double-click on it to establish a connection to the database.

7. You can now explore the database structure, run queries, and perform various database operations using DBeaver.

### Running this repo

this repo can `drop`, `migrate` and `seed` database.

to drop database run :

```shell
npm run droptables
```

to migrate run :

```shell
npm run migrate
```

to seed run :

```shell
npm run seed
```

Or you can run following command to run all three at once :

```shell
make run
```

---

## Configuration

Any configuration steps necessary after installation, such as setting up environment variables or modifying configuration files.

---

## Verification

Steps to verify that the installation was successful.

---

## Troubleshooting

Common issues that users might encounter during installation and how to resolve them.

---

## Uninstallation

Instructions for uninstalling the Migrations repository, if applicable.

---

## Additional Resources

Links to additional resources or documentation related to installation.
