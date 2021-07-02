<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png"/>
    <div class="wrapper__input">
      <input class="wrapper__input__content"
             v-model="username"
             placeholder="用户名"/>
    </div>
    <div class="wrapper__input">
      <input
            type="password"
            v-model="password"
            class="wrapper__input__content"
            placeholder="请输入密码"/>
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__link">
      <div class="wrapper__link-register" @click="handleRegister">立即注册</div> | <div class="wrapper__link-password">忘记密码</div>
    </div>
    <Toast v-if="show" :message="toastMessage"/>
  </div>
</template>

<script>
import { post } from '@/utils/request'
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import Toast, { useToastEffect } from '@/components/Toast'

const useLoginEffect = (showToast) => {
  const data = reactive({
    username: '',
    password: ''
  })
  const router = useRouter()
  const handleLogin = async () => {
    try {
      if (data.username === '' || data.password === '') {
        showToast('请输入用户名或密码')
        return
      }
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登陆失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.push('Register')
  }
  return { handleRegister }
}

export default {
  name: 'Login',
  components: { Toast },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegister } = useRegisterEffect()
    return {
      show,
      toastMessage,
      showToast,
      username,
      password,
      handleLogin,
      handleRegister
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../style/viriables.scss";
  .wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    &__img{
      width: .66rem;
      height: .66rem;
      margin: 0 auto .4rem auto;
      display: block;
    }
    &__input {
      height: .48rem;
      margin: 0 .4rem .16rem .4rem;
      background: #F9F9F9;
      border: 1px solid rgba(0,0,0,0.10);
      border-radius: .06rem;
      padding: 0 .16rem;
      &__content{
        width: 100%;
        line-height: .48rem;
        border: none;
        outline: none;
        background: none;
        font-size: .16rem;
        color: $content-notice-fontcolor;
        &::placeholder {
          color: $content-notice-fontcolor;
        }
      }
    }
    &__login-button {
      margin: .32rem .4rem .16rem .4rem;
      height: .48rem;
      line-height: .48rem;
      background: #0091FF;
      box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
      border-radius: .04rem;
      color: $bgColor;
      font-size: .16rem;
      text-align: center;
    }
    &__link {
      margin: .16rem .4rem;
      text-align: center;
      font-size: .14rem;
      color: $content-notice-fontcolor;
      &-register{
        display: inline-block;
        margin-right: .1rem;
      }
      &-password{
        display: inline-block;
        margin-left: .1rem;
      }
    }
  }
</style>
