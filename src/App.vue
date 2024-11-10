<template>
  <h1>Escaper</h1>
  <form @submit.prevent="onSubmit">
    <div class="flex flex-col gap-1">
      <Textarea rows="20" />
    </div>
    <Button type="submit" severity="secondary" label="Submit" />
  </form>
</template>

<script setup lang="ts">
import Textarea from "primevue/textarea";
import Button from "primevue/button";

const onSubmit = () => {
  console.log("submit");
};
</script>

<style scoped>
textarea {
  width: 100%;
}
</style>
