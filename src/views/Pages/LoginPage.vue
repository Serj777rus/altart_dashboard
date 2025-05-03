<template>
  <div class="main">
    <div class="main-container">
      <div class="left-side-container">
        <div class="left-side" :class="{active: loginPage}">
          <div class="text-block">
            <h1>Welcome!</h1>
            <h4>Today is a new day. It's your day. You shape it.
              Sign in to start managing your projects.</h4>
          </div>
          <div class="form-block">
            <div class="inputs">
              <label for="Email">Email</label>
              <input v-model="form.email" type="email" name="Email" id="Email" required placeholder="example@example.com">
            </div>
            <div class="inputs">
              <label for="password">Password</label>
              <input v-model="form.password" type="password" name="password" id="password">
            </div>
            <a>Forgot your password?</a>
            <button @click="register" type="submit">Sign in</button>
          </div>
          <div class="or-block">
            <div class="line"></div>
            <p>Or</p>
          </div>
          <div class="socials_button_block">
            <div class="google_btn">
              <img src="@/assets/images/—Pngtree—google%20internet%20icon%20vector_12256707.png" alt="icon">
              <p>Google</p>
            </div>
            <div class="google_btn">
              <img src="@/assets/images/3225194_app_facebook_logo_media_popular_icon.png" alt="icon">
              <p>Facebook</p>
            </div>
          </div>
          <p>Don't you have an account? <a @click="loginPage = false">Sign up</a></p>
        </div>
        <div class="left-side" :class="{active: loginPage === false}">
          <div class="text-block">
            <h1>Welcome Back</h1>
            <h4>Please, input your email and password to login in our account</h4>
          </div>
          <div class="form-block">
            <div class="inputs">
              <label for="Email">Email</label>
              <input v-model="loginForm.email" type="email" name="Email" id="Email" required placeholder="example@example.com">
            </div>
            <div class="inputs">
              <label for="password">Password</label>
              <input v-model="loginForm.password" type="password" name="password" id="password">
            </div>
            <button @click="login" type="submit">Sign up</button>
          </div>
          <div class="or-block">
            <div class="line"></div>
            <p>Or</p>
          </div>
          <div class="socials_button_block">
            <div class="google_btn">
              <img src="@/assets/images/—Pngtree—google%20internet%20icon%20vector_12256707.png" alt="icon">
              <p>Google</p>
            </div>
            <div class="google_btn">
              <img src="@/assets/images/3225194_app_facebook_logo_media_popular_icon.png" alt="icon">
              <p>Facebook</p>
            </div>
          </div>
          <p>Do you have an account? <a @click="loginPage = true">Sign in</a></p>
        </div>
      </div>
      <div class="right_side">
        <img src="@/assets/images/freepik__expand__8186.png" alt="cover">
      </div>
    </div>
    <NotificationAlert :message="message" :isShow="showNotification"></NotificationAlert>
  </div>
</template>

<script>
import axios from "axios";
import store from '../../../configs/store'
import NotificationAlert from '@/components/NotificationAlert.vue'
export default {
  components: {NotificationAlert},
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      loginForm: {
        email: '',
        password: '',
      },
      message: '',
      showNotification: false,
      loginPage: true
    }
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:3005/createUser', this.form);
        if (response.status === 200) {
          this.message = response.data.message;
          this.showNotification = true;
          store('set', 'token', response.data.token);
          setTimeout(() => { this.showNotification = false; this.message = ''; this.$router.push('/homepage')}, 2000);
        }
      } catch (error) {
        this.message = error.response.data.message;
        this.showNotification = true;
        setTimeout(() => { this.showNotification = false; this.message = ''}, 2000);
      }
    },
    async login() {
      try {
        const response = await axios.post('http://localhost:3005/login', this.loginForm);
        if (response.status === 200) {
          this.message = response.data.message;
          this.showNotification = true;
          localStorage.setItem('token', response.data.token);
          setTimeout(() => { this.showNotification = false; this.message = ''; this.$router.push('/homepage')}, 2000);
        }
      } catch (error) {
        this.message = error.response.data.message;
        this.showNotification = true;
        setTimeout(() => { this.showNotification = false; this.message = ''}, 2000);
      }
    }
  },
  mounted() {
    if (store('get', 'token')) {
      this.$router.push('/homepage');
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0;
}
.main-container {
  width: 1280px;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 32px;
  overflow-x: hidden;
  position: relative;
}
.left-side-container {
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.active {
  display: flex !important;
}
.left-side {
  width: 400px;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
}
.text-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.text-block  h1 {
  font-weight: 700;
}
.text-block  h4 {
  font-weight: 300;
}
.form-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.inputs {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.inputs label {
  font-size: 16px;
  font-weight: 300;
}
.inputs input {
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #D4D7E3;
  background: var(--background-shape);
}
.inputs input::placeholder {
  color: #D4D7E3;
}
.inputs input:focus {
  outline: none;
}
.form-block a {
  align-self: end;
}
.form-block button {
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  border: none;
  background: var(--background-button);
  color:  white;
}
.or-block {
  width: 100%;
  position: relative;
  display: flex;
}
.line {
  width: 100%;
  height: 1px;
  background: #CFDFE2;
}
.or-block p {
  padding: 4px 12px;
  background: white;
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
}
.socials_button_block {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.google_btn {
  width: 100%;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap:  16px;
  background: var(--background-shape);
  border-radius: 12px;
}
.google_btn img {
  width: 28px;
  height: 28px;
}
.right_side {
  width: 100%;
}
.right_side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 32px;
}
@media all and (max-width: 576px) {
  .main-container {
    width: 100%;
    flex-direction:  column;
    padding: 32px 12px;
    gap: 27px;
  }
  .left-side-container {
    order: 2 !important;
  }
  .right_side {
    order: 1 !important;
  }
  .right_side img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
  .text-block {
    gap: 16px;
  }
  .text-block h1 {
    font-size: 24px;
    font-weight: 600;
  }
  .text-block h4 {
    font-size: 15px;
  }
  .left-side {
    gap: 24px;
  }
  .form-block {
    gap: 16px;
  }
  .inputs label {
    font-size: 14px;
  }
  .form-block a {
    font-size: 14px;
  }
  .socials_button_block {
    flex-direction: row;
  }
  .google_btn p {
    font-size: 14px;
  }
}
</style>
