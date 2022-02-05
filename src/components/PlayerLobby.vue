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
        <h5>{{ nickname }}</h5>
        <h5>{{ level }} lvl &nbsp; &nbsp; {{ winRate }} %</h5>
      </div>

      <div class="flex flex-col items-center justify-center w-40">
        <h5
          :class="{
            'text-green-500': isReady,
            'text-red-500': !isReady
          }"
          class="font-bold"
        >
          {{ isReady ? "READY" : "NOT READY" }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    profileUrl: {
      type: String,
      default: "braytech.png"
    },
    nickname: {
      type: String,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    winRate: {
      type: Number,
      required: true
    },
    isReady: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    console.log(props);

    return { ...toRefs(props) };
  }
});
</script>

<style></style>
