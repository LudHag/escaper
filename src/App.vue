<template>
  <h1>UnEscaper</h1>
  <form v-if="!generated" @submit.prevent="onSubmit">
    <div class="flex flex-col gap-1">
      <Textarea v-model="text" rows="20" class="fira-code" />
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
    <Button severity="secondary" label="Clear" @click="clear" />
  </form>
  <div v-if="generated" class="flex flex-col gap-1">
    <Textarea disabled v-model="generated" rows="20" class="fira-code" />
    <Button severity="secondary" label="Clear" @click="clear" />
  </div>
</template>

<script setup lang="ts">
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import { ref } from "vue";
import { unEscapeJson } from "./utils/escaper";
import { formatJson } from "./utils/formater";

const text = ref<string>("");
const generated = ref<string | null>(null);

const onSubmit = () => {
  generated.value = formatJson(unEscapeJson(text.value));
  text.value = "";
};

const clear = () => {
  generated.value = null;
  text.value = "";
};
</script>

<style scoped>
textarea {
  width: 100%;
}
</style>
