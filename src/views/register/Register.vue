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
        <input class="container-input_confirm-possword" type="password" placeholder="确认密码" v-model="confirmPassword"
          autocomplete="off" />
      </form>
    </div>
    <div class="container-button">
      <button class="container-button_register" @click="handleRegister">
        注册
      </button>
    </div>
    <div class="container-content">
      <a href="javascript:;" @click="handleLogin" class="container-content_login">已有账号去登录</a>
    </div>
  </div>
  <Toast v-if="isShow" :message="toastMessage" />
</template>

<script>
import { toRefs, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { showToastEffect } from '../../components/Toast.vue'
const userRegisterEffect = (showToast) => {
  const data = reactive({
    username: '',
    password: '',
    confirmPassword: ''
  })
  // 监控路由
  const router = useRouter()
  const handleRegister = async () => {
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
      if (data.confirmPassword === '') {
        showToast('确认密码不能为空')
        return
      }
      if (data.password !== data.confirmPassword) {
        showToast('密码不一致!')
        return
      }
      const result = await post('http://localhost:3000/users/register', {
        username: data.username,
        password: data.password
      })
      console.log(result)
      if (result.data.code === 200) {
        // 注册成功自动登录
        localStorage.setItem('isLogin', 'true')
        router.push({ name: 'Home' })
      } else if (result.data.code === 400) {
        showToast('用户已存在...')
      } else {
        showToast('注册失败...')
      }
    } catch (error) {
      console.log(error)
      showToast('发送请求失败!')
    }
  }
  // 返回数据
  const { username, password, confirmPassword } = toRefs(data)
  return {
    username,
    password,
    confirmPassword,
    handleRegister
  }
}
const userLoginEffect = () => {
  const router = useRouter()
  const handleLogin = () => {
    router.push('/login')
  }
  return { handleLogin }
}
export default {
  components: { Toast },
  name: 'Register',
  setup () {
    const { isShow, toastMessage, showToast } = showToastEffect()
    const { username, password, confirmPassword, handleRegister } =
      userRegisterEffect(showToast)
    const { handleLogin } = userLoginEffect()
    return {
      handleLogin,
      handleRegister,
      username,
      password,
      confirmPassword,
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

    &_username,
    &_possword {
      @include inputCss;
      margin-bottom: 16rem;
    }

    &_confirm-possword {
      @include inputCss;
      margin-bottom: 44rem;
    }
  }

  &-button {
    &_register {
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
