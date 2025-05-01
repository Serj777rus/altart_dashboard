<template>
  <div class="main">
    <div class="main-container">
      <div class="left-side-container">
        <div class="left-side">
          <div class="text-block">
            <h1>Welcome Back</h1>
            <h4>Today is a new day. It's your day. You shape it.
              Sign in to start managing your projects.</h4>
          </div>
          <div class="form-block">
            <div class="inputs">
              <label for="Email">Email</label>
              <input type="email" name="Email" id="Email" required placeholder="example@example.com">
            </div>
            <div class="inputs">
              <label for="password">Password</label>
              <input type="password" name="password" id="password">
            </div>
            <a>Forgot your password?</a>
            <button type="submit">Sign in</button>
          </div>
          <div class="or-block">
            <div class="line"></div>
            <p>Or</p>
          </div>
          <div class="socials_button_block">
            <div class="google_btn">
              <img src="@/assets/images/—Pngtree—google%20internet%20icon%20vector_12256707.png" alt="icon">
              <p>Sign in with Google</p>
            </div>
            <div class="google_btn">
              <img src="@/assets/images/3225194_app_facebook_logo_media_popular_icon.png" alt="icon">
              <p>Sign in with Facebook</p>
            </div>
          </div>
          <p>Don't you have an account? <a>Sign up</a></p>
        </div>
      </div>
      <div class="right_side">
        <img src="@/assets/images/freepik__expand__8186.png" alt="cover">
      </div>
    </div>
  </div>
</template>

<script>
export default {

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
}
.left-side-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left-side {
  width: 400px;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
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
</style>
