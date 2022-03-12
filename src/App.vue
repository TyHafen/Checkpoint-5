<template>
  <div class="row container-fluid p-0">
    <div class="col-2 side-bar">
      <Sidebar />
    </div>
    <div class="col-10 p-0">
      <header>
        <Navbar />
      </header>
      <main>
        <router-view />
      </main>
    </div>
  </div>
  <footer></footer>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
import Sidebar from "./components/Sidebar.vue";
export default {
  components: { Sidebar },
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.side-bar {
  height: 100vh;
  background-color: aqua;
}
</style>