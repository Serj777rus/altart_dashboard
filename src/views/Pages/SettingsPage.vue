<template>
  <div class="main">
    <div class="main-container">
      <SideBar></SideBar>
      <div class="general-section">
        <HeadBar></HeadBar>
        <div class="general-main-section">
          <div class="name_desk">
            <h3>Settings</h3>
            <p>Manage your account settings and preferences</p>
          </div>
          <div class="setting_block">
            <div class="name_of_setting">
              <h6>Your Profile</h6>
              <div class="inputs_block">
                <div class="grid_input">
                  <div class="inputs">
                    <label for="name">Name</label>
                    <input
                      v-model="name"
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      id="name"
                    />
                  </div>
                  <div class="inputs">
                    <label for="lastname">Last Name</label>
                    <input
                      v-model="lastname"
                      type="text"
                      placeholder="Your Last Name"
                      name="lastname"
                      id="lastname"
                    />
                  </div>
                  <div class="inputs">
                    <label for="lastname">Email</label>
                    <input
                      disabled
                      v-model="email"
                      type="email"
                      placeholder="Email"
                      name="email"
                      id="email"
                    />
                  </div>
                  <button @click="saveChanges">Save Changes</button>
                </div>
              </div>
              <div class="avatar_block">
                <img :src="`${fileBaseURL}` + avatar" alt="avatar" v-if="avatar !== 'null'">
                <div class="avatar_empty" v-else></div>
                <div class="avatar_button">
                  <label for="avatar"
                    >Change avatar
                    <input @change="updateAvatar" type="file" name="avatar" id="avatar" accept="'.JPG', '.PNG', '.webp', '.jpeg', '.png'" />
                  </label>
                  <span class="material-symbols-outlined" @click="deleteAvatar">delete</span>
                </div>
              </div>
            </div>
            <div class="name_of_setting">
              <h6>Other settings</h6>
              <div class="inputs_block">
                <div class="other_setting">
                  <p>Invite your partner</p>
                  <button>Invite</button>
                </div>
                <div class="other_setting">
                  <p>Delete my account</p>
                  <button @click="deleteAccount">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NotificationAlert :message="message" :isShow="showNotification"></NotificationAlert>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import HeadBar from '@/components/HeadBar.vue'
import { inject } from 'vue'
import store from '../../../configs/store'
import axios from 'axios'
import NotificationAlert from '@/components/NotificationAlert.vue'
export default {
  components: { SideBar, HeadBar, NotificationAlert },
  data() {
    return {
      fileBaseURL: null,
      avatar: null,
      name: null,
      email: null,
      role: null,
      lastname: null,
      isPlay: false,
      message: '',
      showNotification: false,
      formData: new FormData()
    }
  },
  methods: {
    async deleteAccount() {
      const email = store('get', 'email')
      try {
        const response = await axios.post('http://localhost:3005/deleteAccount', { email: email })
        if (response.status === 200) {
          this.message = response.data.message
          this.showNotification = true
          store('clear')
          setTimeout(() => {
            this.showNotification = false
            this.message = ''
            this.$router.push('/')
          }, 1000)
        }
      } catch (error) {}
    },
    async saveChanges() {
      const data = {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
      }
      try {
        const response = await axios.post('http://localhost:3005/updateUser', data)
        if (response.status === 200) {
          this.message = response.data.message
          this.showNotification = true
          store('set', 'name', this.name)
          store('set', 'lastname', this.lastname)
          setTimeout(() => {
            this.showNotification = false
            this.message = ''
          }, 2000)
        }
      } catch (error) {
        this.message = error.response.data.message
        this.showNotification = true
        setTimeout(() => { this.showNotification = false; this.message = ''}, 2000)
      }
    },
    async updateAvatar(event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {

      }
      this.formData.append('avatar', file)
      this.formData.append('email', this.email)
      try {
        const response = await axios.post('http://localhost:3005/updateAvatar', this.formData)
        if (response.status === 200) {
          this.message = response.data.message
          this.showNotification = true
          this.formData = new FormData()
          store('set', 'avatar', response.data.path)
          this.avatar = response.data.path
          setTimeout(() => {
            this.showNotification = false
            this.message = ''
          })
        }
      } catch (error) {
        this.message = error.response.data.message
        this.showNotification = true
        setTimeout(() => { this.showNotification = false; this.message = ''}, 2000)
      }
    },
    async deleteAvatar() {
      const data = {
        email: this.email,
        avatar: this.avatar,
      }
      try {
        const response = await axios.post('http://localhost:3005/deleteAvatar', data)
        if (response.status === 200) {
          this.message = response.data.message
          this.showNotification = true
          store('set', 'avatar', null)
          this.avatar = 'null'
          setTimeout(() => {
            this.showNotification = false
            this.message = ''
          })
        }
      } catch (error) {
        this.message = error.response.data.message
      }
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
.main {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/2149279137.jpg') center center no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
  color: var(--third-text);
}
.main-container {
  width: 1280px;
  height: 100%;
  border-radius: 24px;
  background: var(--secondary-background);
  overflow: hidden;
  display: flex;
  flex-direction: row;
}
.general-section {
  width: 100%;
}
.general-main-section {
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 32px;
}
.name_desk {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: end;
}
.name_of_setting {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}
.name_of_setting h6 {
  width: 30%;
}
.inputs_block {
  width: 70%;
  display: flex;
  flex-direction: row;
  gap: 16px;
}
.grid_input {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  padding: 16px;
}
.inputs {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.inputs label {
  font-weight: 100;
  font-size: 12px;
}
.inputs input {
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: var(--secondary-shape-background);
  color: var(--third-text);
}
.inputs input:focus {
  outline: none;
}
.avatar_block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}
.avatar_block img {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}
.avatar_empty {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  background-color: var(--secondary-shape-background);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.avatar_button {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
}
.avatar_button input {
  display: none;
}
.avatar_button label {
  padding: 2px 8px;
  background: var(--secondary-shape-background);
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 12px;
  white-space: nowrap;
}
.other_setting {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}
button {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: var(--background-button);
  color: var(--third-text);
  cursor: pointer;
}
</style>
