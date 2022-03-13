<template>
  <div class="container-fluid">
    <!-- Profile content -->
    <div class="row justify-content-center align-content-center">
      <div class="col-12 d-flex justify-content-center m-3">
        <div class="card shadow rounded p-4">
          <div class="row">
            <div class="col-9">
              <img class="profile-image m-2" :src="profile.picture" alt="" />
              <h1>{{ profile.name }}</h1>
              <h3>{{ profile.bio }}</h3>
            </div>
            <div class="col-3">
              <a class="mdi mdi-github" :href="profile.github"></a>
              <a class="mdi mdi-linkedin" :href="profile.linkedin"></a>
              <a class="mdi mdi-email" :href="profile.email"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- create post -->
    <CreatePost v-if="account.id == profile.id" />
    <!-- POSTS -->
    <div class="row justify-content-center">
      <div v-for="p in posts" :key="p.id" class="col-md-8">
        <Post :post="p" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
import { postsService } from "../services/PostsService";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { profileService } from "../services/ProfileService";

export default {
  setup() {
    const route = useRoute();
    watchEffect(async () => {
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