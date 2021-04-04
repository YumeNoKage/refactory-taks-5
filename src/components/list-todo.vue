<template>
  <div class="listTodo">
    <div class="mb-5" v-for="(list, i) in listTodos" :key="i">
      <div class="card p-3">
        <div class="card-body">
          <div class="d-flex">
            <h3 class="title-list-todo fw-bold mb-3">
              {{ list.title }}
            </h3>
            <span class="ms-4" v-if="list.completed !== false">
              <button class="btn btn-danger fw-bold">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </span>
                complete
              </button>
            </span>
            <span class="ms-4" v-else>
              <button class="btn btn-dark fw-bold">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </span>
                Set as Complete
              </button>
            </span>
          </div>

          <div class="d-flex">
            <div class="description fw-normal w-100">{{ list.desc }}</div>
            <div class="d-flex">
              <span class="align-bottom fit-content mt-auto">
                <button class="btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#525C77"
                    class="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                    />
                  </svg>
                </button>
              </span>
              <span class="align-bottom fit-content mt-auto">
                <button class="btn" @click="removedTodo(list)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#525C77"
                    class="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CardTodo",
  //   props: ["listTodo"],
  data() {
    return {
      listTodos: null,
    };
  },

  watch: {
    listTodo: function () {
      this.upTodo();
    },
  },

  computed: {
    ...mapGetters({
      listTodo: "listTodo",
    }),
  },

  mounted() {
    this.getListTodo();
  },

  methods: {
    ...mapActions({
      getListTodo: "getListTodo",
      removeTodo: "removeTodo",
    }),

    upTodo: async function () {
      this.listTodos = await this.listTodo;
    },

    removedTodo(data) {
      this.removeTodo(data);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-danger {
  background-color: #feeaeb;
  color: #fb3453;
  border: none;
  font-size: 10px;
  border-radius: 5px;
}

.btn-dark {
  color: #d3d5db;
  background-color: #f2f4f8;
  border: none;
  font-size: 10px;
  border-radius: 5px;
}

.fit-content {
  height: fit-content;
}
.listTodo {
  height: 68vh;
  overflow: auto;
}
.card {
  border: none;
  box-shadow: 10px 10px 50px 10px #eef3fd;
  border-radius: 15px;

  .title-list-todo {
    color: #525c77;
    font-size: 25px;
  }

  .description {
    white-space: pre-wrap;
    color: #525c77;
    font-size: 15px;
  }
}
</style>

// Code belum selesai