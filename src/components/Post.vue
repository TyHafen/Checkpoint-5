<template>
  <div class="row justify-content-center mt-3">
    <div class="col-9 p-3">
      <div class="card rounded shadow">
        <div class="card-body rounded">
          <div class="row d-flex" @click="goTo('Profile')">
            <img class="creator-image m-2" :src="post.creator.picture" alt="" />
            <a
              v-if="post.creator.github"
              class="mdi mdi-github"
              :href="post.creator.github"
            ></a>
            <a
              v-if="post.creator.linkedin"
              class="mdi mdi-linkedin"
              :href="post.creator.linkedin"
            ></a>
            <a
              v-if="post.creator.email"
              class="mdi mdi-email"
              :href="post.creator.email"
            ></a>

            <h2 class="p-0 m-1 d-flex align-items-center">
              {{ post.creator.name }}
            </h2>
          </div>
          <h3 v-if="account.id">
            {{ post.likes.length }}
            <i @click="likes(post.id)" class="mdi mdi-heart"></i>
          </h3>
          <div class="d-flex">
            <p class="card-text body-text p-2">{{ post.body }}</p>
            <div
              @click="remove(post.id)"
              v-if="account.id == profile.id"
              class="mdi mdi-delete"
            ></div>
          </div>
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
  font-size: 16px;
}
</style>