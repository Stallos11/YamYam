import { Axios } from "axios";
import "pinia";
import { Router } from "vue-router";

declare module "pinia" {
  export interface PiniaCustomProperties {
    axios: Axios;
    router: Router;
    toast: {
      showToast: (
        title: string,
        content: string,
        color: string,
        icon: string
      ) => void;
    };
  }
}