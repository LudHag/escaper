<template>
  <h1>UnEscaper</h1>
  <Drawer v-model:visible="showHistory" header="History" position="right">
    <ul>
      <li v-for="item in orderedHistory" :key="item.date">
        <a href="#" @click.prevent="generated = item.value">{{ item.date }}</a>
      </li>
    </ul>
    <Button severity="danger" label="Delete history" @click="deleteHistory" />
  </Drawer>
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
  <div class="mt-2.5">
    <Button severity="help" label="Show history" @click="showHistory = true" />
  </div>
</template>

<script setup lang="ts">
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Drawer from "primevue/drawer";
import { computed, onMounted, ref } from "vue";
import { unEscapeJson } from "./utils/unescaper";
import { formatJson } from "./utils/formater";
import { UnEscapedText } from "./models";
import {
  loadAllFormated,
  removeHistory,
  saveFormated,
} from "./utils/historymethods";

const text = ref<string>("");
const generated = ref<string | null>(null);
const showHistory = ref<boolean>(false);

const history = ref<UnEscapedText[]>([]);

const onSubmit = () => {
  generated.value = formatJson(unEscapeJson(text.value));
  const historyItem = {
    date: new Date().toLocaleString(),
    value: generated.value,
  };
  history.value.push(historyItem);
  saveFormated(historyItem);
  text.value = "";
};

const orderedHistory = computed(() =>
  history.value.toSorted(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
);

const clear = () => {
  generated.value = null;
  text.value = "";
};

const deleteHistory = () => {
  removeHistory();
  history.value = [];
};

onMounted(() => {
  history.value = loadAllFormated();
});
</script>

<style scoped>
textarea {
  width: 100%;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 0.5rem;
  a {
    text-decoration: none;
  }
}
</style>
