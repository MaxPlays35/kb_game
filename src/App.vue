<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <router-view />

    <div
      class="w-full h-full fixed z-10 overflow-auto bg-black/40 flex flex-col justify-center items-center"
      :class="{
        'hidden ': !error.show
      }"
    >
      <div class="w-3/10 bg-white rounded-md">
        <div
          class="w-full p-8 flex flex-col space-y-4 justify-center items-center"
        >
          <div class="text-2xl font-bold">Error</div>
          <div class="text-lg">{{ error.text }}</div>

          <button
            class="@apply w-25 self-center bg-blue-500 text-white focus:outline-none hover:bg-blue-700 transition-colors active:bg-blue-900 focus:border-red-500 border rounded-md h-10;"
            @click="close"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const error = computed(() => store.state.error);
    const close = () => (store.state.error.show = false);

    return {
      error,
      close
    };
  }
});
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
