import { Axios } from 'axios';
import 'pinia';
import { Router } from 'vue-router';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    axios: Axios;
    router: Router;
  }
}