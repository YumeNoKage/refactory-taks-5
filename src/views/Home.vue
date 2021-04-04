<template>
  <div class="px-3">
    <div class="row pt-5">
      <div class="col-3 date-todo">
        <div>
          <div class="w-100 banner bg-primary d-flex text-white p-3 mb-5">
            <img src="@/assets/img/to-do-list-1.svg" alt="todo" />

            <div class="content ms-3">
              <h4 class="title fw-bold font-yellow">Hallo, Sam!</h4>
              You have 2 tasks left for today, Already completed Task today?
            </div>
          </div>

          <div>
            <v-calendar
              class="calenders"
              title-position="left"
              is-expanded
              :attributes="attributes"
            />
          </div>
        </div>
      </div>
      <div class="v-border"></div>

      <div class="col-9">
        <h1 class="fw-bold title-list-todo">Task For Today</h1>
        <div class="create-btn my-4 d-flex">
          <div class="create w-20">
            <button
              class="btn create-new bg-primary text-white font-montserrat fw-normal"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="white"
                  class="bi bi-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                  />
                </svg>
              </span>

              Create New
            </button>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content p-3">
                  <div class="modal-header">
                    <h5
                      class="modal-title modal-title-font fw-bold"
                      id="exampleModalLabel"
                    >
                      New Task
                    </h5>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="createTask">
                      <div class="mb-4 pe-4">
                        <label for="exampleInputEmail1" class="form-label">
                          <h5 class="modal-title-font fw-bold">Title</h5>
                        </label>
                        <input
                          type="text"
                          v-model="createTodo.title"
                          class="form-control form-todo"
                          placeholder="Fill title"
                        />
                      </div>
                      <div class="mb-4 pe-4">
                        <label for="exampleInputEmail1" class="form-label">
                          <h5 class="modal-title-font fw-bold">Description</h5>
                        </label>
                        <textarea
                          type="text"
                          v-model="createTodo.desc"
                          class="form-control form-todo"
                          placeholder="Fill description"
                          rows="4"
                          cols="50"
                        />
                      </div>
                      <div class="mb-4 d-block">
                        <h5 class="modal-title-font form-label mb-3 fw-bold">
                          Chose Date
                        </h5>
                        <v-calendar
                          title-position="left"
                          @dayclick="onDayClick"
                          :attributes="attribute"
                        />
                      </div>
                      <div class="modal-footer justify-content-center">
                        <button
                          type="button"
                          class="btn color-primary fw-semi mx-3"
                          data-bs-dismiss="modal"
                          id="closeTaskModal"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          class="btn btn-primary fw-semi btn-create-task mx-3"
                        >
                          Create Task
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cari ms-auto w-80">
            <form class="d-flex position-relative">
              <input
                class="form-control search-todo font-montserrat color-primary w-100"
                type="search"
                placeholder="Cari"
                aria-label="Search"
              />
              <button
                class="color-primary btn btn-outline-none position-absolute end-0 me-3"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div class="content">
          <CardTodo />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardTodo from "@/components/list-todo";
import { mapActions } from "vuex";

export default {
  name: "Home",

  data() {
    return {
      createTodo: {
        title: "",
        desc: "",
        days: [],
        completed: false,
      },
      attributes: [
        {
          key: "today",
          highlight: true,
          dates: new Date(),
        },
      ],
    };
  },

  components: {
    CardTodo,
  },

  computed: {
    dates() {
      return this.createTodo.days.map((day) => day.date);
    },
    attribute() {
      return this.dates.map((date) => ({
        highlight: true,
        dates: date,
      }));
    },
  },
  methods: {
    ...mapActions({
      createNewTask: "createNewTask",
    }),

    onDayClick(day) {
      const idx = this.createTodo.days.findIndex((d) => d.id === day.id);
      if (idx >= 0) {
        this.createTodo.days.splice(idx, 1);
      } else {
        this.createTodo.days.push({
          id: day.id,
          date: day.date,
        });
      }
    },

    createTask: async function () {
      await this.createNewTask(this.createTodo);

      this.createTodo.title = "";
      this.createTodo.desc = "";
      this.createTodo.days = [];
      this.createTodo.completed = false;

      document.getElementById("closeTaskModal").click();
    },
  },
};
</script>

<style lang="scss" scoped>
.banner {
  border-radius: 20px !important;
}

.date-todo {
  padding: 0 2rem;
}

.calenders {
  border-radius: 20px;
  border: none !important;
  box-shadow: 10px 10px 50px 10px #eef3fd;
}

.w-20 {
  width: 18%;
}

.w-80 {
  width: 82%;
}

.v-border {
  padding-left: 10px;
  height: 100vh;
  border: 1px #eef3fd solid;
  width: 1px;
  padding: 0;
  top: 0;
  left: 33.3333333333% - 8.7%;
  z-index: 1;
  position: absolute;
}

.title-list-todo {
  color: #525c77;
  font-size: 35px;
}

.create {
  width: fit-content;
}

.create-new {
  font-size: 15px;
  border-radius: 15px;
  padding: 8.5px 20px;
}

.search-todo {
  border-radius: 15px;
  height: 43px;
  border-color: #0442d0;
}

.modal-title-font {
  font-size: 25px;
}

.modal-content {
  border: none !important;
  background: #fbfcff;
  border-radius: 20px;
  border: none;
  box-shadow: 10px 10px 50px 10px hsla(220, 32%, 51%, 0.2);
  color: #525c77;

  .modal-header {
    border: none !important;
  }

  .modal-body {
    form {
      .form-todo {
        border: 1px solid #cfdefc99 !important;
        font-size: 18px;
        padding: 20px;
      }
    }
  }

  .modal-footer {
    border-top: none;

    .btn-create-task {
      border-radius: 10px;
    }
  }
}
</style>