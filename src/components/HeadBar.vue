<template>
  <div class="head-bar">
    <div class="hello-name">
      <h5>Hello, {{ name }}</h5>
      <p>{{ new Date().toDateString() }}</p>
    </div>
    <span class="material-symbols-outlined">notifications</span>
  </div>
</template>

<script>
import { inject } from 'vue'
import store from '../../configs/store'
export default {
  data() {
    return {
      fileBaseURL: null,
      avatar: null,
      name: null,
      email: null,
      role: null,
      lastname: null,
    };
  },
  mounted() {
    this.fileBaseURL = inject('fileBaseURL')
    this.name = store('get', 'name')
    this.lastname = store('get', 'lastname')
    this.email = store('get', 'email')
    this.avatar = store('get', 'avatar')
    this.role = store('get', 'role')
  }
}
</script>

<style scoped>
.head-bar {
  width: 100%;
  background: transparent;
  padding: 24px 16px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hello-name {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.material-symbols-outlined {
  font-size: 28px;
}
</style>
