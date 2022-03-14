<template>
  <div class="row justify-content-center mt-3">
    <div class="col-9 p-3">
      <div class="card rounded shadow">
        <div class="card-body rounded">
          <div class="row d-flex" @click="goTo('Profile')">
            <div class="row">
              <p class="">
                {{ new Date(post.createdAt) }}
              </p>
              <img
                class="creator-image m-2 d-flex align-content-rightt"
                :src="post.creator.picture"
                alt=""
              />
            </div>
            <div class="col-12">
              <a v-if="post.creator.github" :href="post.creator.github">
                <img
                  class="github-img"
                  src="https://pngimg.com/uploads/github/github_PNG40.png"
                  alt=""
              /></a>

              <a v-if="post.creator.linkedin" :href="post.creator.linkedin">
                <img
                  class="linkedin-img"
                  src="https://sguru.org/wp-content/uploads/2018/02/linkedin-png-linkedin-icon-1600.png"
                  alt=""
              /></a>
              <a v-if="post.creator.email" :href="post.creator.email">
                <img
                  class="email-img"
                  src="https://th.bing.com/th/id/OIP.TODrg8JbRbVEcJaWHbeN8gHaHa?w=202&h=202&c=7&r=0&o=5&pid=1.7"
                  alt=""
                />
              </a>
            </div>
            <h2 class="p-0 m-1 d-flex align-items-center">
              {{ post.creator.name }}
            </h2>
            <h3 v-if="post.creator.graduated">graduated</h3>
          </div>
          <h3 v-if="account.id">
            {{ post.likes.length }}
            <i @click="likes(post.id)" class="mdi mdi-heart"></i>
          </h3>
          <div class="d-flex">
            <div class="card-text body-text p-2">{{ post.body }}</div>
          </div>
          <div
            @click="remove(post.id)"
            v-if="account.id == profile.id"
            class="mdi mdi-delete"
          ></div>
        </div>
        <img v-if="post.imgUrl" :src="post.imgUrl" alt="Card image cap" />
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, watchEffect } from "vue";
import { postsService } from "../services/PostsService";
import { useRoute } from "vue-router";
import { router } from "../router";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    watchEffect;
    return {
      async remove(id) {
        watchEffect;
        try {
          if (await Pop.confirm("Dude this post is sick, you sure??")) {
            await postsService.remove(id);
          }
        } catch (error) {}
        logger.log(error);
        Pop.toast("Something is wrong");
      },
      async likes(id) {
        try {
          postsService.likes(id);
        } catch (error) {
          logger.log(error);
          Pop.toast("Something is wrong");
        }
      },

      goTo(page) {
        router.push({
          name: page,
          params: { id: props.post.creator.id },
        });
      },
      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),
    };
  },
};
</script>


<style lang="scss" scoped>
.creator-image {
  height: 80px;
  width: 100px;
  border-radius: 50%;
}

.body-text {
  font-size: 20px;
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
</style>