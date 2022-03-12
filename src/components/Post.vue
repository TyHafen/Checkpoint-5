<template>
  <div class="row justify-content-center mt-3">
    <div class="col-12 p-3">
      <div class="card rounded shadow">
        <div class="card-body rounded">
          <div class="d-flex" @click="goTo('Profile')">
            <img class="creator-image m-2" :src="post.creator.picture" alt="" />
            <h2 class="p-2 m-1 d-flex align-items-center">
              {{ post.creator.name }}
            </h2>
          </div>
          <p class="card-text body-text p-2">{{ post.body }}</p>
        </div>
        <img v-if="post.imgUrl" :src="post.imgUrl" alt="Card image cap" />
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import { postsService } from "../services/PostsService";
import { useRoute } from "vue-router";
import { router } from "../router";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
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
  width: 80px;
  border-radius: 50%;
}

.body-text {
  font-size: 16px;
}
</style>