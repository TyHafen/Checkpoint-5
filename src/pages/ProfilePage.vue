<template>
  <div class="container-fluid">
    <!-- Profile content -->
    <div class="row justify-content-center align-content-center">
      <div class="col-10 d-flex justify-content-center m-3">
        <div class="card shadow rounded p-4">
          <img class="profile-image" :src="profile.picture" alt="" />
          <h1>{{ profile.name }}</h1>
          <h3>{{ profile.bio }}</h3>
        </div>
      </div>
    </div>
    <!-- create post -->
    <CreatePost />
    <!-- POSTS -->
    <div class="row justify-content-center">
      <div v-for="p in posts" :key="p.id" class="col-md-8">
        <Post :post="p" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { postsService } from "../services/PostsService";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { profileService } from "../services/ProfileService";

export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        await profileService.getProfile(route.params.id);
        await postsService.getProfilePosts(route.params.id);
      } catch (error) {
        logger.log(error);
        Pop.toast(error.message, "error");
      }
    });

    return {
      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),
      posts: computed(() => AppState.profilePosts),
    };
  },
};
</script>


<style lang="scss" scoped>
.profile-image {
  height: 150px;
  width: 150px;
  border-radius: 50%;
}
</style>