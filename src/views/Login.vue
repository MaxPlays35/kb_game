<template>
  <div
    class="flex flex-col border shadow-xl rounded-lg p-10 outline-none focus justify-center space-y-2"
  >
    <p class="text-lg self-center font-bold">Authentication</p>
    <form @submit.prevent="login" class="w-1/2 self-center flex flex-col">
      <label for="login" class="self-center">Login:</label>
      <input type="text" id="login" v-model="creds.login" />
      <label for="password" class="self-center">Password:</label>
      <input type="password" id="password" v-model="creds.password" />
      <button class="btn" type="submit">Log In</button>
    </form>
    <p class="self-center">
      If you don't have account go here
      <router-link to="/register" class="font-bold self-center"
        >Register</router-link
      >
    </p>
  </div>
</template>

<script lang="ts">
import Api from "@/api";
import { defineComponent, inject, reactive } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const api: Api | undefined = inject("api");
    const creds = reactive({
      login: "",
      password: ""
    });

    const login = async () => {
      const answer = await store.dispatch("login", creds);
      if (!answer.success) {
        store.dispatch("error", {
          error: "Error",
          text: answer.text
        });

        return;
      }
      if (api) {
        api.auth();
      }
    };

    return { login, creds };
  }
});
</script>

<style scoped>
input {
  @apply border transition-colors focus:border-blue-500 focus:outline-none border-1.5px rounded-md text-sm text-center w-full;
}
.btn {
  @apply w-25 self-center bg-blue-500 text-white rounded-sm focus:outline-none hover:bg-blue-700 transition-colors active:bg-blue-900 focus:border-red-500 border rounded-md h-10;
}
</style>
