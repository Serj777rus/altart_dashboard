<template>
  <div class="side-bar">
    <div class="logo_group">
      <img src="@/assets/images/icons/logo.svg" alt="logo" />
      <h4>ALTAR</h4>
    </div>
    <div class="first-menu">
      <div class="menus" v-for="item in menu" :key="item.name">
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        <p>{{ item.name }}</p>
      </div>
    </div>
<!--    <div class="avatar_name_group">-->
<!--      <img :src="`${fileBaseURL}` + avatar" alt="avatar" v-if="avatar !== 'null'" />-->
<!--      <div class="avatar_empty" v-else></div>-->
<!--      <h6>{{ name }}</h6>-->
<!--      <h6>{{ email }}</h6>-->
<!--    </div>-->

  </div>
</template>

<script>
import { inject } from 'vue'
import store from '../../configs/store'
export default {
  data() {
    return {
      menu: [
        { name: 'Home', icon: 'home', link: '/homepage' },
        { name: 'Documents', icon: 'folder_open', link: '/homepage' },
        { name: 'Online Ceremony', icon: 'video_camera_front', link: '/homepage' },
        { name: 'Marriage Certificate', icon: 'license', link: '/homepage' },
        { name: 'Helps & FAQ', icon: 'help', link: '/homepage' },
        { name: 'Settings', icon: 'settings', link: '/homepage' },
        { name: 'Log Out', icon: 'logout', link: '/homepage' },
      ],
      fileBaseURL: null,
      avatar: null,
      name: null,
      email: null,
      role: null,
      lastname: null,
    }
  },
  mounted() {
    this.fileBaseURL = inject('fileBaseURL')
    this.name = store('get', 'name')
    this.lastname = store('get', 'lastname')
    this.email = store('get', 'email')
    this.avatar = store('get', 'avatar')
    this.role = store('get', 'role')
  },
}
</script>

<style scoped>
.side-bar {
  width: fit-content;
  height: 100%;
  color: var(--third-text);
  padding: 16px;
  background: var(--secondary-shape-background);
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
}
.logo_group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-direction: column;
}
.logo_group img {
  width: 24px;
}
.logo_group h4 {
  font-size: 16px;
}
.first-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.menus {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  text-align: center;
}
.menus p {
  font-weight: 100;
  font-size: 10px;
  color: #C5C5C5FF;
  transition: color 200ms ease-in-out;
}
.material-symbols-outlined {
  font-weight: 100 !important;
  font-size: 28px !important;
  color: var(--secondary-text);
  transition: color 200ms ease-in-out;
}
.menus:hover > .material-symbols-outlined, .menus:hover > p {
  color: white;
}
</style>
