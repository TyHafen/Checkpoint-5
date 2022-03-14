<template>
  <div class="container-fluid">
    <div>
      <form>
        <div class="form-group">
          <label for="name">name</label>
          <input
            v-model="editable.name"
            type="text"
            class="form-control"
            id="name"
            aria-describedby="name"
            placeholder="add your name!"
          />
        </div>
        <div class="form-group">
          <label for="bio">Bio</label>
          <input
            v-model="editable.bio"
            type="text"
            class="form-control"
            id="bio"
            aria-describedby="bio"
            placeholder="Whats on your mind?"
          />
        </div>
        <div class="form-group">
          <label for="picture">Profile Photo</label>
          <input
            v-model="editable.picture"
            type="text"
            class="form-control"
            id="picture"
            placeholder="place photo URL here"
          />
        </div>
        <div class="form-group">
          <label for="github">Github</label>
          <input
            v-model="editable.github"
            type="text"
            class="form-control"
            id="github"
            placeholder="Link to github"
          />
        </div>
        <div class="form-group">
          <label for="linkedin">LinkedIn</label>
          <input
            v-model="editable.linkedin"
            type="text"
            class="form-control"
            id="linkedin"
            placeholder="Link to LinkedIn"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="editable.email"
            type="text"
            class="form-control"
            id="email"
            placeholder="email"
          />
        </div>
        <div class="form-group">
          <label for="class">Class</label>
          <input
            v-model="editable.class"
            type="text"
            class="form-control"
            id="class"
            placeholder="what year did you graduate"
          />
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="graduated"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Graduated
          </label>
        </div>
        <button @click="update()" class="btn btn-dark d-flex mt-3">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref, watchEffect } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { accountService } from "../services/AccountService";
export default {
  setup() {
    let editable = ref({});
    watchEffect(() => {
      editable.value = AppState.account;
    });
    return {
      editable,
      async update() {
        try {
          await accountService.update(editable.value);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>