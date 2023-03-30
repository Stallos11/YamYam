<template>
  <!-- 1st section -->
  <div class="home d-flex fx-col vcenter fx-center">
    <h1 class="h1 text-white mb-5 pb-5 font-s9">YAMYAM</h1>
    <div class="d-flex fx-center">
      <span class="bd-3 bd-solid bd-primary bd-light-2 text-white rounded-3 px-3 py-1 font-w600 mx-2">Last recipes</span>
      <span class="bd-3 bd-solid bd-primary bd-light-2 text-white rounded-3 px-3 py-1 font-w600 mx-2">Best protein bars</span>
    </div>
    <p class="text-center text-white font-s6">Free recipes adapted to you</p>
    <p class="text-center text-white mx-4">
      No more headaches to find recipes idea after work. <br />
      Browse free recipes, create yours and share them to the world.
    </p>
    <div class="d-flex fx-center mx-auto">
      <ax-btn class="rounded-3 px-5 py2 mt-5 primary text-white">Sign up for free</ax-btn>
    </div>
  </div>
  <!-- 2nd section -->
  <div class="pres grix xs1 md2 gutter-xs0">
    <div class="pres-left">
      <p class="text-center text-grey text-light-4 font-s5">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p class="text-center text-grey text-light-2 font-s2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />Sed soluta possimus, autem maxime pariatur quo, cum inventore deserunt
        !
      </p>
      <p class="text-center text-grey text-light-2 font-s2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />Sed soluta possimus, autem maxime pariatur quo, cum inventore deserunt
        !
      </p>
    </div>
    <div class="d-flex fx-center vcenter">
      <div class="orange1-bg"></div>
    </div>
  </div>
  <!-- 3rd section -->
</template>

<style lang="scss">
body {
  background: black;
}

.home {
  margin-top: -5.5rem;
  background-image: url(../assets/img/home-bg.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: black;
  height: 100vh;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 959px) {
    background: linear-gradient(rgb(0 0 0 / 15%), rgb(0 0 0 / 69%)), url('/src/assets/img/bg-mobile.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: black;
  }
}

.pres {
  background: #070606;

  .pres-left {
    background: radial-gradient(circle, #3d2208 0%, #2e1b07 20%, #080606 60%);
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-left: 2.5rem;
    padding-right: 2.5rem;

    @media screen and (max-width: 959px) {
      padding-top: 2rem;
      height: 50vh;
    }
  }

  .orange1-bg {
    background-image: url(../assets/img/orange.png);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 50vh;
    width: 35vw;
    max-height: 40vh !important;

    @media screen and (max-width: 959px) {
      width: 100vw;
    }
  }
}
</style>
