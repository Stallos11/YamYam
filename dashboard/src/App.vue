<template>
  <div
    :class="authStore.isLoggedIn ? 'layout-under-navbar' : 'layout'"
    class="bg-dark"
  >
    <header>
      <div v-if="authStore.isLoggedIn" class="navbar-fixed">
        <nav class="navbar">
          <router-link class="sidenav-brand" to="/">Home</router-link>
          <div class="navbar-menu ml-auto">
            <a class="navbar-link" href="#">Link 1</a>
            <a
              v-if="authStore.isLoggedIn"
              @click="authStore.logout()"
              class="navbar-link"
              href="#"
            >
              <Icon class="" icon="fa-solid:power-off" size="50"></Icon>
            </a>
          </div>
        </nav>
      </div>
    </header>

    <ax-sidenav
      v-if="authStore.isLoggedIn"
      v-model="isSidenavOpened"
      class="sidenav-fixed shadow-1"
    >
      <!-- Users -->
      <div>
        <ax-btn
          class="w100 bg-dark rounded-1 shadow-1 d-flex vcenter"
          @click="isUserCollapsibleOpened = !isUserCollapsibleOpened"
        >
          <Icon class="mr-2" icon="heroicons:users-20-solid" size="50"></Icon>
          Users
          <Icon
            class="ml-auto"
            icon="ic:round-keyboard-arrow-right"
            size="50"
          ></Icon>
        </ax-btn>
        <ax-collapsible v-model="isUserCollapsibleOpened">
          <div class="">
            <router-link class="sidenav-link" to="/users">List</router-link>
          </div>
        </ax-collapsible>
      </div>
      <!-- Recipes -->
      <div>
        <ax-btn
          class="w100 bg-dark rounded-1 shadow-1 d-flex vcenter"
          @click="isRecipeCollapsibleOpened = !isRecipeCollapsibleOpened"
        >
          <Icon class="mr-2" icon="mdi:cook" size="50"></Icon>
          Recipes
          <Icon
            class="ml-auto"
            icon="ic:round-keyboard-arrow-right"
            size="50"
          ></Icon>
        </ax-btn>
        <ax-collapsible v-model="isRecipeCollapsibleOpened">
          <div class="">
            <router-link class="sidenav-link" to="/recipes">List</router-link>
            <router-link class="sidenav-link" to="/recipes/create"
              >Create</router-link
            >
          </div>
        </ax-collapsible>
      </div>
      <!-- Recipes Types -->
      <div>
        <ax-btn
          class="w100 bg-dark rounded-1 shadow-1 d-flex vcenter"
          @click="
            isRecipeTypeCollapsibleOpened = !isRecipeTypeCollapsibleOpened
          "
        >
          <Icon
            class="mr-2"
            icon="mdi:format-list-bulleted-type"
            size="50"
          ></Icon>
          Types
          <Icon
            class="ml-auto"
            icon="ic:round-keyboard-arrow-right"
            size="50"
          ></Icon>
        </ax-btn>
        <ax-collapsible v-model="isRecipeTypeCollapsibleOpened">
          <div class="">
            <router-link class="sidenav-link" to="/recipe-types"
              >List</router-link
            >
            <router-link class="sidenav-link" to="/recipe-types/create"
              >Create</router-link
            >
          </div>
        </ax-collapsible>
      </div>
      <!-- Recipes Types -->
      <div>
        <ax-btn
          class="w100 bg-dark rounded-1 shadow-1 d-flex vcenter"
          @click="
            isRecipeCategoryCollapsibleOpened =
              !isRecipeCategoryCollapsibleOpened
          "
        >
          <Icon class="mr-2" icon="material-symbols:category" size="50"></Icon>
          Categories
          <Icon
            class="ml-auto"
            icon="ic:round-keyboard-arrow-right"
            size="50"
          ></Icon>
        </ax-btn>
        <ax-collapsible v-model="isRecipeCategoryCollapsibleOpened">
          <div class="">
            <router-link class="sidenav-link" to="/recipe-categories"
              >List</router-link
            >
            <router-link class="sidenav-link" to="/recipe-categories/create"
              >Create</router-link
            >
          </div>
        </ax-collapsible>
      </div>
      <div>
        <ax-btn
          class="w100 bg-dark rounded-1 shadow-1 d-flex vcenter"
          @click="
            isIngredientCollapsibleOpened = !isIngredientCollapsibleOpened
          "
        >
          <Icon class="mr-2" icon="material-symbols:category" size="50"></Icon>
          Ingredients
          <Icon
            class="ml-auto"
            icon="ic:round-keyboard-arrow-right"
            size="50"
          ></Icon>
        </ax-btn>
        <ax-collapsible v-model="isIngredientCollapsibleOpened">
          <div class="">
            <router-link class="sidenav-link" to="/ingredients"
              >List</router-link
            >
            <router-link class="sidenav-link" to="/ingredients/create"
              >Create</router-link
            >
          </div>
        </ax-collapsible>
      </div>
    </ax-sidenav>

    <main>
      <transition name="scale">
        <router-view></router-view>
      </transition>
      <Pwa />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "./stores/auth";
import Pwa from "./components/Pwa.vue";
const isSidenavOpened = ref(false),
  isUserCollapsibleOpened = ref(false),
  isRecipeCollapsibleOpened = ref(false),
  isRecipeTypeCollapsibleOpened = ref(false),
  isRecipeCategoryCollapsibleOpened = ref(false),
  isIngredientCollapsibleOpened = ref(false);

const authStore = useAuthStore();
</script>

<style lang="scss">
body::-webkit-scrollbar {
  display: none;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  scale: 0.6;
}

@font-face {
  font-family: "Quicksand";
  src: url("/assets/Quicksand-VariableFont_wght.ttf") format("truetype");
  font-weight: 1 999;
}

$font-family: "Quicksand", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
  "Segoe UI Symbol";

$axentix-palette: (
  "primary": #5893c0,
  "secondary": #53dfdf,
  "tertiary": #2781e6,
  "success": #12ad12,
  "warning": #fccc2e,
  "error": #df2c29,
  "white": #fff,
  "black": #000,
  "transparent": transparent,
  "bg-dark": #181818,
  "bg-light": #f3f3f3,
);

@import "axentix";
@import "@axentix/vue/dist/vue3/vue-axentix.css";

// Forms hack
.grix > .form-field {
  margin-top: 0.5rem !important;
}

.form-field {
  &:not(:first-child) {
    margin-top: 1.75rem;
  }

  label:not(.form-switch) {
    display: inline-block;
    position: absolute;
    top: -0.5rem;
    margin-bottom: 0;
    background-color: getColor("bg-dark");
    z-index: 10;
    margin-left: 0.5rem;
    padding: 0 0.25rem;
    color: getColor("grey", "light", 3);
  }

  .form-control {
    border-radius: 0.5rem;

    &:focus {
      border: 1px solid getColor("primary") !important;
      box-shadow: none;
    }
  }

  &.not-valid {
    label {
      color: getColor("error");
    }

    .form-control {
      border: 1px solid getColor("error") !important;
      box-shadow: none;
    }
  }
}

.form-control[disabled],
.form-control[readonly] {
  background-color: transparent !important;
  pointer-events: none;
}

.customize-table {
  --easy-table-border: 0px solid #445269;
  --easy-table-row-border: 0px solid #445269;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #1b1b1b;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #5893c0;

  --easy-table-body-row-font-color: #f5f5f5;
  --easy-table-body-row-background-color: #292929;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #f0f0f0;
  --easy-table-body-row-hover-background-color: #1b1b1b;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #1f1f1f;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-track-color: #4acef7;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>
