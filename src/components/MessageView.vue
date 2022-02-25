<template>
  <div
    :class="{
      'bg-warm-gray-50 rounded w-5/6': !blue,
      'flex flex-col bg-blue-500 rounded w-5/6 self-end': blue
    }"
  >
    <div class="flex flex-row items-center space-x-4">
      <div class="w-full flex flex-row justify-between font-bold">
        <p class="truncate">{{ nickname }}</p>
        <p>
          {{
            new Date(Date.parse(time)).toLocaleString("ru-RU", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric"
            })
          }}
        </p>
      </div>
    </div>
    <p class="pt-2 break-words">
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ComputedRef } from "@vue/runtime-core";
import { toRefs } from "vue";
import { useStore } from "vuex";

// type props = {
//   nickname: string;
//   time: bigint;
// };

export default defineComponent({
  props: {
    nickname: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const blue: ComputedRef<boolean> = computed(
      () => store.state.user.nickname === props.nickname
    );

    return {
      blue,
      ...toRefs(props)
    };
  }
});
</script>

<style scoped></style>
