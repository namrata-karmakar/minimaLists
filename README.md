# To-Do List App
This is a To-Do List Application built using Node.js, Express and TypeScript. This repository only holds the back-end code of the application. For front-end (made using VanillajJS and Bootstrap 5) please [click here](https://github.com/namrata-karmakar/todo-vanilla-ui).
## API Reference

#### Get all todos for a particular userID

```http
  GET /api/todo/user/${userID}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userID` | `string` | **Required**. User ID whose todos to be fetched. |

#### Get item

```http
  GET /api/todo/id/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of todo to be fetched |

```http
  GET /api/todo/id/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of todo to be fetched |



  
## Running Tests

To run tests, run the following command

```bash
  npm run test
```

  
## Run Locally

Clone the project

```bash
  git clone https://github.com/namrata-karmakar/todo-ts-tdd
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

  
