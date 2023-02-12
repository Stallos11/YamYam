<template>
  <!-- 1st section -->
  <div class="h100 d-flex fx-col vcenter fx-center">
    <div class="d-flex fx-center">
      <span
        class="bd-3 bd-solid bd-primary bd-light-2 text-primary rounded-3 px-2 font-w600 mx-2"
        >Last recipes</span
      >
      <span
        class="bd-3 bd-solid bd-primary bd-light-2 text-primary rounded-3 px-2 font-w600 mx-2"
        >Best protein bars</span
      >
    </div>
    <h1 class="text-center text-white">Free recipes adapted to you</h1>
    <p class="text-center text-white mx-4">
      No more headaches to find recipes idea after work. <br />
      Browse free recipes, create yours and share them to the world.
    </p>
    <div class="d-flex fx-center mx-auto">
      <ax-btn class="primary rounded-1 rounded-1">Sign up for free</ax-btn>
    </div>
  </div>
  <!-- 2nd section -->
  <div class="pres grix xs1 sm2 gutter-xs0">
    <div class="pres-left d-flex fx-col fx-center vcenter">
      <p class="text-center text-grey text-light-4 font-s5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <p class="text-center text-grey text-light-2 font-s2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />Sed soluta
        possimus, autem maxime pariatur quo, cum inventore deserunt !
      </p>
      <p class="text-center text-grey text-light-2 font-s2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />Sed soluta
        possimus, autem maxime pariatur quo, cum inventore deserunt !
      </p>
    </div>
    <div class="d-flex fx-center vcenter">
      <div class="orange1-bg"></div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-image: url(../assets/img/home-bg.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: black;

  &::-webkit-scrollbar {
    display: none;
  }
}

.pres {
  background: #070606;
}

.pres-left {
  background: radial-gradient(circle, #7c3f00 0%, #3e2913 20%, #000000 70%);
  width: 50vw;
  height: 70vh;
}

.orange1-bg {
  background-image: url(../assets/img/orange.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 50vh;
  width: 50vw;
  max-height: 50vh !important;
  // box-shadow: 0 - 200px 200px -100px #1c2127 inset !important;
}

.orange2-bg {
  background-image: url(../assets/img/orange.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  // box-shadow: 0 - 200px 200px -100px #1c2127 inset !important;
}
</style>
