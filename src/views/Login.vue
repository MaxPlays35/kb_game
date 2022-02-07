<template>
  <div
    class="border shadow-xl rounded-lg p-10 outline-none focus justify-center divide-y-2 space-y-2 divide-emerald-400"
  >
    <button class="btn" @click="login">Log In</button>
  </div>
</template>

<script lang="ts">
import Api from "@/api";
import { defineComponent, inject } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const api: Api | undefined = inject("api");
    const login = async () => {
      await store.dispatch("login");
      if (api) {
        api.auth();
      }
    };

    return { login };
  }
});
</script>

<style scoped>
.btn {
  @apply w-25 self-center bg-blue-500 text-white rounded-sm focus:outline-none hover:bg-blue-700 transition-colors active:bg-blue-900 focus:border-red-500 border rounded-md h-10;
}
</style>
