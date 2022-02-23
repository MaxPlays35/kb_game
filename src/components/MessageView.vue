<template>
  <div
    :class="{
      'bg-warm-gray-50 rounded w-5/6': !blue,
      'flex flex-col bg-blue-500 rounded w-5/6 self-end': blue
    }"
  >
    <p>{{ message }}</p>
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
