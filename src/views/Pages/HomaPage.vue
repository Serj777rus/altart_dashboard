<template>
  <div class="main">
    <div class="main-container">
      <SideBar></SideBar>
      <div class="general-section">
        <HeadBar></HeadBar>
        <div class="general-main-section">
          <div class="steps">
            <div class="step" :class="{activeStep: name !== null && lastname !== null && role !== null}">
              <div class="upside">
                <img src="@/assets/images/icons/Icon=Docks@8x.png" alt="icon">
                <h4>Fill out your profile</h4>
              </div>
              <div class="downside">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eveniet minus nam non nulla pariatur quae! Ea repudiandae, voluptatum? Error est itaque molestiae neque, numquam reiciendis! Alias doloribus eum nihil?</p>
              </div>
            </div>
            <div class="step">
              <div class="upside">
                <img src="@/assets/images/icons/Icon=Calendar@8x.png" alt="icon">
                <h4>Book your date</h4>
              </div>
              <div class="downside">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eveniet minus nam non nulla pariatur quae! Ea repudiandae, voluptatum? Error est itaque molestiae neque, numquam reiciendis! Alias doloribus eum nihil?</p>
              </div>
            </div>
            <div class="step">
              <div class="upside">
                <img src="@/assets/images/icons/Icon=Video@8x.png" alt="icon">
                <h4>Join the conference</h4>
              </div>
              <div class="downside">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eveniet minus nam non nulla pariatur quae! Ea repudiandae, voluptatum? Error est itaque molestiae neque, numquam reiciendis! Alias doloribus eum nihil?</p>
              </div>
            </div>
          </div>
          <div class="info-board">
            <div class="video-block">
              <video ref="video" src="@/assets/videos/0_Man_Business%20Man_720x1280.mp4" preload="auto"></video>
              <div class="overlayPlay">
                <img v-if="!isPlay" @click="play" src="@/assets/images/icons/Icon=Play@8x.png" alt="icon">
                <img v-else @click="pause" src="@/assets/images/icons/Icon=Pause@8x.png" alt="icon">
              </div>
            </div>
            <div class="date-partner-block">
              <div class="date-block">
                <div class="upside_date">
                  <img src="@/assets/images/icons/Icon=Timer@8x.png" alt="icon">
                  <h6>Date of ceremony</h6>
                </div>
                <div class="downside_date">
<!--                  Добавить сюда блок с данными-->
                  <div class="empty_date_block">
                    <p>At now you don't book a date of ceremony</p>
                  </div>
                </div>
              </div>
              <div class="partner-block">
                <div class="upside_date">
                  <img src="@/assets/images/icons/Icon=Person@8x.png" alt="icon">
                  <h6>Your partner</h6>
                </div>
                <div class="downside_date">
                  <!--                  Добавить сюда блок с данными-->
                  <div class="empty_date_block">
                    <p>At now you don't added your partner</p>
                  </div>
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
import axios from 'axios'
import NotificationAlert from '@/components/NotificationAlert.vue'
import store from '../../../configs/store'
import SideBar from '@/components/SideBar.vue'
import HeadBar from '@/components/HeadBar.vue'
import { inject } from 'vue'
export default {
  components: {NotificationAlert, SideBar, HeadBar},
  data() {
    return {
      message: '',
      showNotification: false,
      fileBaseURL: null,
      avatar: null,
      name: null,
      email: null,
      role: null,
      lastname: null,
      isPlay: false
    }
  },
  methods: {
    async auth() {
      try {
        const response = await axios.post('http://localhost:3005/autoAuth', {token: localStorage.getItem('token') });
        if (response.status === 200) {
          this.message = response.data.message;
          this.showNotification = true;
          store('set', 'name', response.data.data.name);
          store('set', 'email', response.data.data.email);
          store('set', 'avatar', response.data.data.avatar);
          store('set', 'lastname', response.data.data.lastname);
          store('set', 'role', response.data.data.role);
          setTimeout(() => { this.showNotification = false; this.message = ''}, 2000);
        }
      } catch (error) {
        console.log(error);
          this.message = error.response.data.message;
          this.showNotification = true;
          store('delete', 'token');
          setTimeout(() => { this.showNotification = false; this.message = ''; this.$router.push('/login')}, 2000);
      }
    },
    play() {
      this.$refs.video.play();
      this.isPlay = true;
    },
    pause() {
      this.$refs.video.pause();
      this.isPlay = false;
    }
  },
  mounted() {
    this.auth();
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
.main {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/2149279137.jpg") center center no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
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
.steps {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 16px;
}
.step {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: var(--secondary-shape-background);
  color: var(--third-text);
}
.upside {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  color: white;
}
.step img {
  width: 48px;
  height: 48px;
}
.downside p {
  font-weight: 200;
}
.activeStep {
  border: 1px solid var(--active-ahspe);
  background: var(--active-ahspe);
}
.info-board {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 16px;
}
.video-block {
  flex: 2;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.video-block video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  aspect-ratio: 16 / 7;
}
.overlayPlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  opacity: 0;
  transition: opacity 500ms;
}
.overlayPlay img {
  cursor: pointer;
}
.video-block:hover .overlayPlay {
  opacity: 1;
}
.date-partner-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.date-block {
  width: 100%;
  height: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: var(--secondary-shape-background);
  color: var(--third-text);
}
.upside_date {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
}
.upside_date img {
  width: 36px;
  height: 36px;
}
.downside_date {
  padding: 16px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px dashed rgba(255, 255, 255, 0.3);
}
.partner-block {
  width: 100%;
  height: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: var(--secondary-shape-background);
  color: var(--third-text);
}
</style>
