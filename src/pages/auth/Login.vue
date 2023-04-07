<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="login-container row">
        <div class="col-5 q-py-xl column justify-between">
          <div class="row items-center q-pl-xl">
            <q-icon name="img:icons/icon.svg" size="33px" />
            <p class="jose-b text-xl q-mb-none q-ml-sm">TRAVELEEN</p>
          </div>
          <q-form @submit="submit" class="auth-form-container q-mx-auto">
            <p class="inter-b text-5xl neutral-900 q-mb-none q-mb-sm text-center">Masuk</p>
            <p class="inter-sb text-lg neutral-500 q-mb-none text-center">Silakan masukan detail anda</p>
            <p class="inter-r text-sm neutral-900 q-mb-none q-mb-sm q-mt-lg">Username atau Email</p>
            <q-input outlined round v-model="username" :rules="[(val) => !!val]" dense />
            <p class="inter-r text-sm neutral-900 q-mb-none q-mb-sm q-mt-xs">Kata Sandi</p>
            <q-input class="q-mt-sm" outlined v-model="password" :type="isPwd ? 'password' : 'text'" :rules="[
              (val) => !!val,
              (val) =>
                val.length > 5 ||
                'Password minimal terdiri dari 6 karakter',
            ]" dense>
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
              </template>
            </q-input>
            <div class="row justify-between items-end q-mt-xs">
              <q-checkbox size="55px" v-model="remember" label="Ingat Saya" class="inter-r text-base neutral-900" />
              <q-btn flat label="Lupa Kata Sandi?" no-caps size="16px" class="inter-r text-base neutral-900" />
            </div>
            <q-btn class="masuk-button jakarta-b q-mt-xl q-mb-md" type="submit" unelevated label="Masuk"
              text-color="white" no-caps />
          </q-form>
          <div class="register-link row q-mx-auto">
            <p class="inter-sb text-base neutral-500 q-mb-none">Tidak Punya Akun?</p>
            <router-link class="inter-sb text-base neutral-900 q-mb-none q-ml-xs cursor-pointer register-link"
              to="/register">
              Daftar
            </router-link>
          </div>
        </div>
        <div class="col-7 login-image q-pa-xl column justify-end">
          <div>
            <p class="inter-b text-5xl neutral-50 q-mb-none">Gunung Semeru</p>
            <p class="inter-b text-2xl neutral-50 q-mb-none">Jawa Timur, Indonesia</p>
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { api } from 'src/boot/axios';

export default {
  name: 'Landing',

  data() {
    return {
      username: ref(null),
      password: ref(null),
      isPwd: ref(true),
      remember: ref(false)
    };
  },

  methods: {
    async submit() {
      const userData = {
        email: this.username,
        password: this.password
      }
      await api.post('/api/login', userData).then((response) => {
        let data = response.data;
        console.log(data);
        localStorage.setItem('token', data.token);
        console.log(response);
        if (response.status === 200) {
          this.$router.push('/');
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  }
}
</script>

<style>
.masuk-button {
  background: #10B981;
  width: 100%;
  height: 32px;
  border-radius: 6px;
}

.register-link {
  text-decoration: none;
}
</style>
