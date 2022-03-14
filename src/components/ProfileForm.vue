<template>
  <div class="container-fluid">
    <div class="card shadow">
      <form @submit.prevent="createPost">
        <div class="form-group">
          <label for="bio">Bio</label>
          <input
            v-model="editable.bio"
            required
            type="text"
            class="form-control"
            id="photo"
            aria-describedby="photo"
            placeholder="Whats on your mind?"
          />
        </div>
        <div class="form-group">
          <label for="image">Profile Photo</label>
          <input
            v-model="editable.imgUrl"
            type="text"
            class="form-control"
            id="image"
            placeholder="place photo URL here"
          />
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    let editable = ref({});

    return {
      editable,
      async createPost() {
        try {
          await postsService.createPost(editable.value);
          editable = {};
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