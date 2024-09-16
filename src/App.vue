<template>
  <div id="app">
    <h1>Todo List</h1>
    
    <ul v-if="todos.length">
      <li v-for="todo in todos" :key="todo._id" :class="todo.completed ? 'completed' : ''">
        {{ todo.name }}
        <button @click="toggleCompleted(todo)">Completed</button>
        <button @click="remove(todo._id)" class="delete">Delete</button>
      </li>
    </ul>

    <form @submit.prevent="addTodo">
      <input v-model="newTodo" type="text" :class="!newTodo ? 'error' : ''" placeholder="Enter a new task">
      <button type="submit" class="add" :disabled="!newTodo">Add</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newTodo: '',
      todos: []
    };
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await axios.get('http://localhost:3000/todos');
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async addTodo() {
      if (this.newTodo) {
        try {
          const response = await axios.post('http://localhost:3000/todos', {
            name: this.newTodo
          });
          this.todos.push(response.data);
          this.newTodo = '';
        } catch (error) {
          console.error('Error adding todo:', error);
        }
      }
    },
    async remove(id) {
      try {
        await axios.delete(`http://localhost:3000/todos/${id}`);
        this.todos = this.todos.filter(todo => todo._id !== id);
      } catch (error) {
        console.error('Error removing todo:', error);
      }
    },
    async toggleCompleted(todo) {
      try {
        todo.completed = !todo.completed;
        await axios.put(`http://localhost:3000/todos/${todo._id}`, {
          completed: todo.completed
        });
      } catch (error) {
        console.error('Error toggling todo:', error);
      }
    }
  }
}
</script>

<style>
h1 {
  color: #11c170; /* 標題顏色 */
  font-size: 36px; /* 標題字體大小 */
  margin-bottom: 20px; /* 標題和內容之間的距離 */
  font-family: Arial, sans-serif; /* 標題字體 */
  text-align: center; /* 將標題文字置中 */
}

/* 應用程式外的背景（全局背景色） */
body {
  background-color: #6FB7B7; 
  margin: 0;
  padding: 0;
}

/* 應用程式內的背景 */
#app {
  margin: 45px auto;
  background: white;
  width: 80%; /* 自適應寬度 */
  max-width: 600px; /* 最大寬度 */
  min-width: 300px; /* 最小寬度 */
  height: auto; /* 高度自動調整 */
  padding: 20px;
  box-shadow: 0 0 8px 3px #2222221a;
}

ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
  background: #fff;
  margin: 5px 0;
  padding: 18px;
  font-weight: 700;
  color: #11c170;
  border: 1px solid #11c170;
}

button {
  border-radius: 3px;
  float: right;
  border: 1px solid #ffffff;
  margin-left: 10px; /* 左邊的外邊距 */
  margin-top: -5px; /* 增加上邊的外邊距以向上移動按鈕 */
  padding: 5px 8px; /* 減少內邊距 */
  font-size: 13px;
  color: #fff;
  background: #11c170;
}



button.delete {
  background: red; /* 設定 delete 按鈕的背景顏色為紅色 */
}

input[type="text"] {
  height: 36px;
  padding: 6px;
  margin: 20px 0px;
  width: 97.5%;
  border: 1px solid #eee;
}

button.add {
  
  background: #11c170;
}

.error {
  border-color: red !important;
}

button:disabled {
  color: #bfb9b9;
  cursor: not-allowed;
}

.completed {
  text-decoration: line-through;
}
</style>
