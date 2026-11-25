<script setup lang="ts">
defineEmits(['clickLogo', 'clickTitle'])
</script>

<template>
  <div class="title-container">
    <img
      @click="$emit('clickLogo')"
      class="title-container__img"
      src="../assets/mascot-winter-frog.png"
      alt="Маскот проекта"
    />
    <h1 @click="$emit('clickTitle')">YoFood</h1>
  </div>
</template>

<style scoped>
.title-container {
  display: flex;
  align-items: center;
  gap: 10px;

  h1 {
    font-family: 'Great Vibes', serif;
    font-size: 50px;
    color: #414042;
  }
}

.title-container__img {
  width: 120px;
}
</style>
