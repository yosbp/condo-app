import type { User, UserLogin, UserRegister, LoginResponse } from '~/types/User';

const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} as User,
    loading: false,
  }),
  getters: {},
  actions: {
    async login(credentials: UserLogin) {
      this.loading = true;
      const { data, error } = await useFetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        watch: false,
      });

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }

      localStorage.setItem('token', (data.value as LoginResponse).token);
      localStorage.setItem('user', JSON.stringify((data.value as LoginResponse).user));
      this.user = (data.value as LoginResponse).user;
      this.loading = false;
      return data.value as LoginResponse;
    },
    async register(credentials: UserRegister) {
      this.loading = true;
      const { data, error } = await useFetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        body: JSON.stringify(credentials),
        watch: false,
      });

      if (error.value) {
        this.loading = false;
        throw new Error(error.value?.data.message);
      }

      localStorage.setItem('token', (data.value as LoginResponse).token);
      localStorage.setItem('user', JSON.stringify((data.value as LoginResponse).user));
      this.user = (data.value as LoginResponse).user;
      this.loading = false;
      return data.value;
    },
    async logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.user = {} as User;
    },
  },
});

export default useAuthStore;
