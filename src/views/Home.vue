<template>
  <div class="container d-flex justify-content-center mt-0 text-white">
    <div class="text-center"></div>
    <b-card style="width: 700px" header="Todo List">
      <b-card-text>
        <div class="row no-gutters">
          <b-col lg="10" md="6" sm="2">
            <b-form-input
              type="text"
              v-model="newTask.name"
              required
            ></b-form-input>
          </b-col>
          <b-col lg="2" md="2" sm="1">
            <b-button variant="primary" @click="create">Add task </b-button>
          </b-col>
        </div>
        <b-spinner v-if="loading == true" variant="primary" small></b-spinner>
        <div v-for="todo in todos">
          <b-row class="mt-2">
            <b-col lg="6" md="4" sm="1">
              <div class="pt-2 text-primary">
                {{ todo.name }}
              </div>
            </b-col>
            <b-col lg="6" md="4" sm="1">
              <b-button variant="outline-primary" @click="Delete(todo.id)"
                >Delete
              </b-button>
              <b-button
                v-b-modal.modal-1
                variant="outline-primary"
                @click="edit(todo.id)"
                >Edit</b-button
              >
            </b-col>
          </b-row>

          <hr />
        </div>
        <b-modal id="modal-1" title="Edit post">
          <b-form-input type="text" v-model="editTask.name"></b-form-input>
          <template #modal-footer>
            <b-button variant="primary" @click="editItem">Edit post</b-button>
          </template>
        </b-modal>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import getTodoApi from "/api/getTodo";
import createTodoApi from "/api/createTodo";
import deleteTodoApi from "/api/deleteTodo";
import editTodoApi from "/api/editTodo";
import axios from "axios";

export default {
  name: "Home",

  data() {
    return {
      todos: [],
      newTask: { name: "" },
      loading: false,
      editTask: { name: "" },
      editTodo: null,
    };
  },
  methods: {
    create() {
      if (this.newTask.name !== "") {
        this.loading = true;
        createTodoApi
          .createTodo(this.newTask)
          .then((res) => {
            this.todos.unshift(res.data);
            this.newTask.name = "";
            this.loading = false;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    Delete(id) {
      this.loading = true;
      deleteTodoApi
        .deleteTodo(id)
        .then((res) => {
          this.loading = true;
          console.log(res);
          const found = (item) => item == id;
          let todo = this.todos.map((x) => {
            return x.id;
          });
          let index = todo.findIndex(found);
          this.todos.splice(index, 1);
          this.loading = false;
        })
        .catch((err) => alert(err));
    },
    edit(id) {
      this.editTodo = id;
      this.todos.map((x) => {
        let found = x.id == id;
        if (found) {
          this.editTask.name = x.name;
        }
      });
    },
    editItem() {
      let index = this.todos.findIndex((todo) => {
        return todo.id == this.editTodo;
      });

      editTodoApi.updateTodo(this.editTodo, this.editTask).then((res) => {
        this.todos.splice(index, 1, res.data);
        this.$bvModal.hide("modal-1");
      });
    },
  },
  mounted: async function () {
    await getTodoApi
      .getTodo()
      .then((res) => {
        this.todos = res.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>
<style scoped>
button.btn.btn-success {
  width: 100px;
}

.card-header {
  background: #335384;
}
.card {
  border: none;
  border-radius: 10px;
  box-shadow: 12px 0 15px -4px rgba(0, 0, 0, 0.2),
    -12px 0 8px -4px rgba(0, 0, 0, 0.2);
}

.container.d-flex.justify-content-center.mt-0 {
  margin-top: -25px !important;
}
a {
  text-decoration: none;
}
</style>

