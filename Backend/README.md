# UMApi - documentation

- [Navigation](#navigation)
  - [Features](#features)
  - [Installation](#installation)
 
## Features

<p>The goal of this Api is to create a user-management system that will, as it's name suggests, manage user accounts of <b>"<i>xy</i>"</b> system. The "xy" system can be for example a blog web application, bakery shop, eCommerce web app or something else.</p> 

### When I would like to use this subsystem?

<p>I would use this substem for accelerating project development. Instead of building a user-management system from scratch i would just copy/paste this code in "xy" project and continue the development of other functionalities that are specific for "xy" project.</p>

<p>Api contains following controllers:</p>
<ul>
  <li>RoleController</li>
  <li>UserController</li>
  <li>AuthController</li>
</ul>

<div align="center">

|        Controller         |               Method               | Description |
|:-------------------:|:---------------------------------------:|:--------|
| `RoleController` | getAll  |    Get all available roles (<i>because the api uses soft delete, when retrieveing data we check if role was meant to be deleted</i>).     |
| `RoleController` | getById |    Retrieve the role given the ID.     |
| `RoleController` | create  |    Create a new role (<i>every <b>active</b> role needs to have a unique name</i>).     |
| `RoleController` | update  |    Update name of a role.     |
| `RoleController` | delete  |    Soft delete a role given an id.     |
| `UserController` | getAll  |    Get all available users.     |
| `UserController` | getById |    Retrieve the user given the ID.     |
| `UserController` | create  |    Create a new user.     |
| `UserController` | update  |    Update data of a user.    |
| `UserController` | delete  |    Soft delete a user given an id.    |
| `AuthController` | login   |    Create a refresh token if the credentials are valid.    |


</div>

|        Name         |               Description               | Required | Default value |                   Limitations                    |
|:-------------------:|:---------------------------------------:|:--------:|:-------------:|:------------------------------------------------:|
|       `HOST`        | Host on which the API will be available |    ❌     |  `127.0.0.1`  |          If set, can't be empty string           |
|       `PORT`        | Port on which the API will be available |    ❌     |    `8080`     | If set, must be a number between `0` and `65535` |
|   `ENVIRONNEMENT`   |  Environment in which the API will run  |    ✅     |       ❌       |  Must be `development`, `production` or `test`   |
|   `DATABASE_HOST`   |        MongoDB database host URL        |    ✅     |       ❌       |              Can't be empty string               |
|   `DATABASE_PORT`   |          MongoDB database port          |    ❌     |  `undefined`  | If set, must be a number between `0` and `65535` |
|   `DATABASE_NAME`   |          MongoDB database name          |    ✅     |       ❌       |              Can't be empty string               |
| `DATABASE_USERNAME` |          MongoDB database user          |    ✅     |       ❌       |              Can't be empty string               |
| `DATABASE_PASSWORD` |        MongoDB database password        |    ✅     |       ❌       |              Can't be empty string               |
|    `CORS_ORIGIN`    |           CORS allowed origin           |    ❌     |      `*`      |          If set, can't be empty string           |

## Installation

9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9.

9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9.

9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9asdaoisdoaisdoaosdiao1293890109s8d9a8d9s8a9d8a9.
