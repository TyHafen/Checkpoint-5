<template>
  <div class="container-fluid">
    <!-- Profile content -->
    <div class="row justify-content-center align-content-center">
      <div class="col-6 d-flex justify-content-center m-3">
        <div class="card shadow rounded p-4 container-fluid">
          <div class="row">
            <img
              class="img-fluid cover-img rounded p-3"
              :src="profile.coverImg"
              alt=""
            />
            <div class="col-9">
              <img class="profile-image m-2" :src="profile.picture" alt="" />
              <h2 v-if="profile.graduated">graduated</h2>
              <h2 v-if="profile.class">Class of {{ profile.class }}</h2>
              <h2>{{ profile.name }}</h2>
              <h3>{{ profile.bio }}</h3>
            </div>
            <div class="col-3">
              <div class="row">
                <div class="col-12">
                  <a v-if="profile.github" :href="profile.github">
                    <img
                      class="github-img"
                      src="https://pngimg.com/uploads/github/github_PNG40.png"
                      alt=""
                  /></a>

                  <a v-if="profile.linkedin" :href="profile.linkedin">
                    <img
                      class="linkedin-img"
                      src="https://sguru.org/wp-content/uploads/2018/02/linkedin-png-linkedin-icon-1600.png"
                      alt=""
                  /></a>
                  <a v-if="profile.email" :href="profile.email">
                    <img
                      class="email-img"
                      src="https://th.bing.com/th/id/OIP.TODrg8JbRbVEcJaWHbeN8gHaHa?w=202&h=202&c=7&r=0&o=5&pid=1.7"
                      alt=""
                    />
                  </a>
                </div>
                <div class="col-12 p-3">
                  <b
                    v-if="account.id == profile.id"
                    title="profile"
                    class="
                      btn btn-success
                      rounded-pill
                      shadow
                      d-flex
                      align-items-center
                      justify-content-center
                    "
                    data-bs-toggle="modal"
                    data-bs-target="#profile"
                  >
                    <p>Edit Profile</p>
                  </b>
                  <Modal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 container-fluid">
        <!-- create post -->
        <CreatePost v-if="account.id == profile.id" />
      </div>
    </div>
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
.github-img {
  height: 65px;
}
.linkedin-img {
  height: 65px;
}
.email-img {
  height: 65px;
}
.cover-img {
  height: 35vh;
  width: 100vh;
}
</style>