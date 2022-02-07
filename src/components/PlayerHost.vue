<template>
  <div class="bg-gray-300 rounded-md p-1">
    <div class="flex">
      <img
        :src="require(`@/assets/${profileUrl}`)"
        alt="Player's avatar"
        height="30"
        width="30"
        class="rounded-5xl w-20"
      />
      <div class="flex flex-col items-center justify-center w-40">
        <h5>You</h5>
        <h5>{{ level }} lvl &nbsp; &nbsp; {{ winRate }} %</h5>
      </div>

      <div class="flex flex-col items-center justify-center w-40">
        <button
          :class="{
            'bg-green-500 hover:bg-green-700': isReady,
            'bg-red-500 hover:bg-red-700': !isReady
          }"
          class="btn"
          @click="ready"
        >
          {{ isReady ? "READY" : "NOT READY" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Api from "@/api";
import { defineComponent, inject, toRefs, computed, ComputedRef } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    profileUrl: {
      type: String,
      default: "braytech.png"
    },
    level: {
      type: Number,
      required: true,
      default: 1
    },
    winRate: {
      type: Number,
      required: true,
      default: 0
    }
  },
  setup(props) {
    const store = useStore();
    const isReady: ComputedRef<boolean> = computed(
      () => store.state.user.isReady
    );
    const api: Api | undefined = inject("api");
    const ready = () => {
      if (api) {
        api.changeReady();
      }
    };

    return { ...toRefs(props), isReady, ready };
  }
});
</script>

<style scoped>
.btn {
  @apply w-25 self-center  text-white rounded-sm focus:outline-none  transition-colors border rounded-md h-10;
}
</style>
