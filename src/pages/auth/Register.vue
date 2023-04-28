<template>
  <q-layout view="hHh lpR fF2">
    <q-page>
      <div class="row">
        <div class="col-5 q-py-xl column justify-between">
          <div class="row items-center q-pl-xl">
            <q-icon name="img:icons/icon.svg" size="33px" />
            <p class="jose-b text-xl q-mb-none q-ml-sm">TRAVELEEN</p>
          </div>
          <q-form @submit="submit" class="auth-form-container q-mx-auto">
            <p class="inter-b text-5xl neutral-900 q-mb-none q-mb-sm text-center">Daftar</p>
            <p class="inter-sb text-lg neutral-500 q-mb-none text-center">Silakan masukan detail anda</p>
            <p class="inter-r text-sm neutral-900 q-mb-none q-mb-sm q-mt-lg">Username</p>
            <q-input outlined round v-model="username" :rules="[(val) => !!val]" dense />
            <p class="inter-r text-sm neutral-900 q-mb-none q-mb-sm q-mt-xs">Email</p>
            <q-input outlined round v-model="email"
              :rules="[(val) => !!val, (val) => isValidEmail(val) || 'email tidak valid']" dense />
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
            <p class="inter-r text-sm neutral-900 q-mb-none q-mb-sm q-mt-xs">Konfirmasi Kata Sandi</p>
            <q-input class="q-mt-sm" outlined v-model="passwordConfirmation" :type="isPwd ? 'password' : 'text'" :rules="[
                (val) => !!val,
                (val) => val === password || 'Password confirmation does not match'
              ]" dense>
              <template v-slot:append>
                <q-icon :name="isConfirm ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                  @click="isConfirm = !isConfirm" />
              </template>
            </q-input>
            <p class="inter-r text-base neutral-500 q-mb-none q-mb-xs q-mt-xs">Dengan mengklik Daftar, Anda menyetujui
              Ketentuan,
              Kebijakan Privasi, dan Kebijakan Cookie kami. Kami dapat mengirimkan pemberitahuan SMS yang dapat dihentikan
              kapan saja.</p>
            <q-btn class="masuk-button jakarta-b q-mb-md" type="submit" unelevated label="Masuk" text-color="white"
              no-caps />
          </q-form>
          <div class="register-link row q-mx-auto">
            <p class="inter-sb text-base neutral-500 q-mb-none">Tidak Punya Akun?</p>
            <router-link class="inter-sb text-base neutral-900 q-mb-none q-ml-xs cursor-pointer register-link"
              to="/login">
              Masuk
            </router-link>
          </div>
        </div>
        <div class="col-7 register-image q-pa-xl column justify-end">
          <div>
            <p class="inter-b text-5xl neutral-50 q-mb-none">Pantai Sanur</p>
            <p class="inter-b text-2xl neutral-50 q-mb-none">Bali, Indonesia</p>
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { setToken } from 'src/utils/localstorage';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  name: 'Register',

  data() {
    return {
      username: ref(null),
      email: ref(null),
      password: ref(null),
      passwordConfirmation: ref(null),
      isPwd: ref(true),
      isConfirm: ref(true),
      user: null
    };
  },

  methods: {

    async submit() {
      const userData = {
        email: this.email,
        password: this.password
      }

      try {
        const response = await api.post('/api/register', userData)
        let data = response.data;
        setToken(data.token);
        console.log(data)
        if (response.status === 200) {
          this.$router.push('/login');
        }
      } catch (error) {
        console.log(error);
      }
    },

    isValidEmail(email) {
      return EMAIL_REGEX.test(email);
    }
  },
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
