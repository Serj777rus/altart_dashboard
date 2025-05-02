<template>
  <div class="notification" :class="{active: isShow}">
    <p>{{ message }}</p>
    <button>Ok</button>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    }
  },
}
</script>

<style scoped>
.notification {
  position: fixed;
  top: -100%;
  right: 50%;
  transform: translateX(50%);
  padding: 16px 32px;
  background: var(--background-button);
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: white;
  border-radius: 16px;
  transition: top 200ms ease-in-out;
}
.active {
  top: 20px;
}
.notification p {
  font-weight: 300;
}
button {
  align-self: end;
  padding: 4px 16px;
  border-radius: 8px;
  border: none;
}
</style>
