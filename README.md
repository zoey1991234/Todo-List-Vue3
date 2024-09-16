# my-vue3-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

##專案結構
前端 (Vue.js)
* Vue3: 用於構建用戶界面。
* HTML5: 結構化內容。
* CSS3: 樣式化界面。

主要組件:
* App.vue: 包含 Todo 列表的顯示、添加、刪除和標記完成功能。
* style 樣式設置前端外觀，包括按鈕、輸入框等。

後端 (Node.js + Express + MongoDB)
* Express: 用於設置 RESTful API 服務。
* MongoDB: 用於儲存 Todo 列表數據。
* Mongoose: 用於簡化 MongoDB 的操作。
  
主要文件:
* server.js: 設置 Express 伺服器並定義 API 路由。
  * 連接到 MongoDB。
  * 定義了 CRUD 操作的路由（GET, POST, DELETE, PUT）。
 
路由:
* GET /todos: 獲取所有待辦事項。
* POST /todos: 新增待辦事項。
* DELETE /todos/:id: 刪除指定 ID 的待辦事項。
* PUT /todos/:id: 更新指定 ID 的待辦事項（如標記為完成）。
