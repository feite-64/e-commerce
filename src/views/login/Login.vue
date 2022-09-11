<template>
  <div class="container">
    <div class="container-portrait">
      <img class="container-portrait_img"
        src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202221429453.png" alt="" />
    </div>
    <div class="container-input">
      <form>
        <input class="container-input_username" type="text" placeholder="请输入手机号" v-model="username"
          autocomplete="off" />
        <input class="container-input_possword" type="password" placeholder="请输入密码" v-model="password"
          autocomplete="off" />
      </form>
    </div>
    <div class="container-button">
      <button class="container-button_login" @click="handleLogin">登录</button>
    </div>
    <div class="container-content">
      <a href="javascript:;" @click="handleRegister" class="container-content_register">立即注册</a>
      <span class="container-content_gap">|</span>
      <a href="javascript:;" class="container-content_forget-password">
        忘记密码
      </a>
    </div>
  </div>
  <Toast v-if="isShow" :message="toastMessage" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { showToastEffect } from '../../components/Toast.vue'
const userLoginEffect = (showToast) => {
  const data = reactive({
    username: '',
    password: ''
  })
  const router = useRouter()
  const handleLogin = async () => {
    // 调用接口
    try {
      if (data.username === '') {
        showToast('用户名不能为空')
        return
      }
      if (data.password === '') {
        showToast('密码不能为空')
        return
      }
      const result = await post('http://localhost:3000/users/login', {
        username: data.username,
        password: data.password
      })
      console.log(result)
      if (result.data.code === 200) {
        localStorage.setItem('isLogin', 'true')
        localStorage.setItem('userId', result.data.data._id)
        router.push('/')
      } else {
        showToast('登录失败，用户名或者密码错误')
      }
    } catch (error) {
      showToast('请求失败!')
    }
  }
  // 返回数据
  const { username, password } = toRefs(data)
  return {
    username,
    password,
    handleLogin
  }
}
const userRegisterEffect = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.push('/register')
  }
  return { handleRegister }
}
export default {
  name: 'Login',
  components: { Toast },
  setup () {
    const { isShow, toastMessage, showToast } = showToastEffect()
    const { username, password, handleLogin } = userLoginEffect(showToast)
    const { handleRegister } = userRegisterEffect()
    return {
      handleLogin,
      handleRegister,
      username,
      password,
      isShow,
      toastMessage
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
@import "../../style/variables.scss";

.container {
  text-align: center;

  &-portrait {
    display: flex;
    justify-content: center;
    margin-top: 120rem;
    margin-bottom: 40rem;

    &_img {
      width: 66rem;
      height: 66rem;
    }
  }

  &-input {
    &_username {
      @include inputCss;
      margin-bottom: 16rem;
    }

    &_possword {
      @include inputCss;
      margin-bottom: 44rem;
    }
  }

  &-button {
    &_login {
      width: 295rem;
      height: 48rem;
      background: #0091ff;
      box-shadow: 0 4rem 8rem 0 rgba(0, 145, 255, 0.32);
      border-radius: 4rem;
      font-family: $font-Regular;
      font-size: 16rem;
      color: #ffffff;
      margin-bottom: 16rem;
    }
  }

  &-content {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: $font-Regular;
    font-size: 14rem;
    color: rgba(0, 0, 0, 0.5);
    letter-spacing: 0;

    &_gap {
      margin: 0 12rem;
    }
  }
}
</style>
