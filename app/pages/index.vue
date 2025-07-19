<template>
  <div class="bg-red-950 flex justify-center page-container shadow-2xl relative">
    <div class="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
    <div class=" w-full lg:w-1/2 min-h-14 pt-8 pb-4 mx-8 shadow-accent content-end">
      
      <Textarea class="" placeholder="Type your message here." />
    </div>
  </div>
</template>

<script setup>
import Textarea from '@components/ui/textarea/Textarea.vue'
</script>

<style>
.page-container {
  min-height: calc(30vh - 80px);
}

@media only screen and (max-width: 1024px) {
  .page-container {
    min-height: 30vh;
  }
}

</style>