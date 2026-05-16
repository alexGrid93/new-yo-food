<script setup lang="ts">
defineEmits(['clickLogo', 'clickTitle'])
</script>

<template>
  <div className="titleContainer">
    <img @click="$emit('clickLogo')" className="maskotImg" src="../assets/mascot.png" />
    <h1 @click="$emit('clickTitle')">YoFood</h1>
  </div>
</template>

<style>
.titleContainer {
  display: flex;
  align-items: center;
  gap: 10px;
}

.maskotImg {
  width: 120px;
}

h1 {
  font-family: 'Great Vibes', serif;
  font-size: 50px;
  color: #414042;
}
</style>
