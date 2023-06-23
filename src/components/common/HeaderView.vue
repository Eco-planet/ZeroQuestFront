<template>
  <div id="header" :class="{ open: menuVisible === true }">
    <div class="w-full flex justify-between items-center">
      <div class="wp-30 flex"><button type="button" class="menu-btn" @click="toggleMenu()"><span></span></button></div>
      <div class="wp-40 flex justify-center"><h1><a href="/"><img src="@/assets/images/logo.png" alt="ZeroQuest"></a></h1></div>
      <div class="wp-30 login-box">
        <div class="flex justify-end items-center">
          <div><Locale /></div>
          <div class="w-5"></div>
          <div><button type="button" class="login-id" @click="forceLogout">ID</button></div>
        </div>
      </div>
    </div>
  </div>
  <div v-show="menuVisible" class="menus flex" :class="{ ani: aniVisible === true }">
    <div class="wp-80 p-8 flex flex-col justify-start items-start" style="background: #fff;">
      <div class="text-2xl" :class="{ select: $route.name === 'myzq' }" @click="movePage('/myzq')">My Z.Q</div>
      <div class="h-6"></div>
      <div class="text-2xl" :class="{ select: $route.name === 'zeronft' }" @click="movePage('/zeronft')">ZeroNFT</div>
      <div class="h-6"></div>
      <div class="text-2xl" :class="{ select: $route.name === 'onft' }" @click="movePage('/onft')">O!NFT</div>
      <div class="h-6"></div>
      <div class="text-2xl" :class="{ select: $route.name === 'mywallet' }" @click="movePage('/mywallet')">My Wallet</div>
      <div class="h-6"></div>
      <div class="text-2xl" @click="movePage('/market')">Open Market</div>
      <div class="h-10"></div>
      <div class="text-2xl font-semibold">About</div>
      <div class="h-3"></div>
      <div class="text-2xl w-full flex" :class="{ select: $route.name === 'about' }" @click="movePage('/about')">
        <div class="wp-50 flex justify-start">About ZeroQuest</div>
        <div class="wp-50 flex justify-end menu-right">→</div>
      </div>
      <div class="h-3"></div>
      <div class="text-2xl w-full flex" :class="{ select: $route.name === 'terms' }" @click="movePage('/terms')">
        <div class="wp-50 flex justify-start">Terms & Conditions</div>
        <div class="wp-50 flex justify-end menu-right">→</div>
      </div>
      <div class="h-10"></div>
      <div class="text-2xl font-semibold">공식 채널 참여</div>
      <div class="h-3"></div>
      <div class="social-area wp-70 flex justify-between">
        <a href="javascript:void(0);"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKpSURBVHgBlVRBSFRhEJ75d/UpUaSEmqxEFF2COolnIUg6VFbuZXXLQ63rZuqinarFU4dKa1VMg4hNLw/ELhEogdCxS4fSQ3mwwkJQEZNcdt+bZvS99e1byd2B//0z3//PN/P/M/9D2EP6+/VSPJAMIMFlNmt5VFhLyzw+EsIb2tQmolH/X7cvuoGBkUQAEB/zQhX8RwjgNxD1dIeDE3sS6rruWVpLDvPOEBQiCKPVZVrE7/cbYnptfGk1GeepMLKdVEPsK2QRMZV8no4mmnhq31mHMTDhEquztgtj6zxv7HKAzmgDz9MW1G5xAMZ0vbhsNbnAus/afa0r3DIpav/Yq9PrRbTQ19q6JfajkUSFhurInbbmue1Enif6mOKBRfpzrVw74T28stXERfBloiussfXorRtfnKfrDQelyssZALFS0rXEJ1wKARsdF5JWhG8hTzENcFUYGxV/6xzQdGdb4CvkKdH2lg88zTkY66Qovt0E4RMUKgTfHJZPZa0hFEOhfAglTlsIV2yDu/wsFCCxWEy5fFYUN9lnR7z6wReJ43nyQVnVSSloZcabuThDnNndgt60gVNPhl/W7EcmPcpHGsxGcQYHRl8f5b/KIlvzHIMbGu9xaxkcaVJeQnW5NmG/03h8/JChEf+F8BzvldfkcbCl+D6Pqe5Qyy+ONMTAGTkF30kvjxImC3AFL9pkIh0dgQ0OHmayKy4yKcCQcG1XuSityfPhfsKOtDLfEdBVjnbTJHU3yweRCDG3tQjmU6V0X9RtwkjE/yedxgus/vCY6j2SOoVA615lHnT7Cp7FJdelzIbeYHAzQyjSc7t5MUVUR5Ip0kNuMN1ArM9JhsBwmDMeLVXbFbr+3Qa8zs3W4z//bGS80QTq5PvahFxJ8ZjlwsQ7w81T7sV/tET2DpGARgMAAAAASUVORK5CYII=" alt="github"></a>
        <a href="javascript:void(0);"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH9SURBVHgBrVQ7axRRFP7OnevOJhaBgNiJhVgIgrUgaqeI+IgGYSHNEhcCAbUz3TQipHArMdtICIr4IsQfEMRO8ZEqTRRsohBiRsEkk9y5J9/muZss2c1mPxju3PP4znfPuTPycOhlR6hJSaDXAbFoHp75oxou523WLz6GSDcN2CcMKMwkgTckvIEWQoGrZEcGLYVYU1FiEqrPq6qKjNAeY48wW5z4qEEwWOm0MA9U0Ic9wlTt0qWYai9Q4mUW+ZuqK7Dar3XvKI92lkV6yz7ul+nrV2gX536Ftnc1SeMsfvMSdBnjJkVRUk5x/RgzbTKfg/qCePwU1YiteXHAu9eicksDfGLMn5qkHWnazopnVILDXOc3HYL/q8ogJ/he9s2J+tlEMu1UflwdDtY+vqDT+sxJ9cEleDNDib1UdIgRx+g9uqBt9/1CeNqLTIjIAFuUU+ssQncuK2a2klSKT0YU+4FibNGEPVlNnnJ3rVpps5wGUYjkPJVd3LCVv/WET4gmwYF+3lkHeIvWYtxY5/tJPo4WgC2YUHX5zV9TcWj4iIrt3B4oqR/gzbhZYfqixuR3EDr8u9eX+7Gagzp4VHp2Srz/ulVFu+8Uel7tllN3+ndv576p4v2aHEzNTX9/Uy+nsStlUCwvIjoYRZGvH94A4umpMfbpgyzFw43ErwAe2r81HwuIagAAAABJRU5ErkJggg==" alt="naver"></a>
        <a href="javascript:void(0);"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIYSURBVHgBtZVNTBNBFMf/s4xsl3JQKk3VmIApX4piDF48eVNjoh5MDwS84IGECzePxqM3LiQc9KA0fjQxGi5y82RMlAMmxoQQEiAkfHXbhW0ItEuXecOytGUoUMI/6bR9b95v386+95ZBoaGhRK1TtdHlungCsE4w1EuHixWxjDOGb3wr8KG/P5YpjWWlhsHh973C/Fr8DKG8TAF/MdD37K0S+DKRqD6X2iRnN46neLpO730Vi2XpD9+1VggjdYtY+u6hRaNl5zYrgvlQjwFGDyBXtTmDw8/sMJlntvQGTk9TcI8EqzECaG+LorX5CizLxujYj0J3iFhclgYrD7p0IYwb11oQbbwMTZOnBGvV3rePWFzWmUKcc7Q2NeJmewtCdWfFZhdT07NojjZIfzq9qohindwvWk9GQMetjqu43tYEXa+WtjU7g5+/J3Dndoe/z1QBBYuXZtX19CFqgzW+7f/kNCb+TeLR/btF9pSlypDqkNrJy9JxHLz7NIqLkXpEwuexuJSEtWYj9vgegkGjKDClylCwOPWmyPXBro2gc/ML8kOKhEMwDL0ozs6sI5vNQUEc16jRUUaLyyY+fx0TZ2YVZGcp9xJLo6kB2egHazmZwscv3/Hrz1/kco64SFK1zSSWrEBvwrzBEUR1mM/nFR73OU0ev6QHh0dGUHk/xwf6evaGA4lGEDlwfMW9WKnTG7CFOskrYBtyfc23LevXlAAAAABJRU5ErkJggg==" alt="telegram"></a>
        <a href="javascript:void(0);"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAASCAYAAABfJS4tAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIwSURBVHgBrVRNaBNBFH5vZmNKpR4UwSoK3kQQrHopIlRFEKkXDz2oW9GDabSkjVrIrQTqRdB2U7C7lwpNVMilevCiQgX14kEInoQgaJGIWNJSbNpms69vkjZN023+6Acz++Z7M9/smzdvEOrEsBU9gQ4NAeI5HmrcEkg41Oe/PhmPx+Xv9NJFKTCBavKIGX1LCKGgT/9aSdQwY+cJ6A2b3s1emgLAY2yk0qnkcYxEYrucHTTHxDyLd7P4KzdRy7I8GWpOsnlo663BQcAxIloQQuQ8q2QLEkwaZvQxizSXr8jQzvYqogrCIerMOdlR0dt7Y4bDmC4GBHCP/+zbsDlxZXBwSlvjkWhfFVG1NkGQO33/7q3p/Bkb5sRtArRc5s5zS/K5/uKJkuU7qwgbwR69X9laZHx8L2WxldkPPO4om9vCrY3PrQ1qAEI+V3mImZ+H00TQ5yJaN1gnWRQOh8/a/H0J2wC+z1+KwqrLEoWhZLcG8aP/jv59g/CAv/svgX2BzWcckA2N4UXpQFs3ZQd3N1UKGsB/G6VRSog1Y/bPwVihLOsHX8eHD3xX/7kKqySmvblLnNlwacHUgHcHdjc9Kidd4x4Zi3EhkMXe/VABvPhjBr2XQ76uuU0+VSDZDDShEK38cJwBwmvMVy0IDn9ULs8OBAKBJTe/Zi96jkgJT9g+pWqyBnwiwlDQr3+GytEUYDx9ftKR1CWI2ln/KFN7Vl0pLLwX7wXg60CPnoAasAK9jMxZNLXSVgAAAABJRU5ErkJggg==" alt="twitter"></a>
        <a href="javascript:void(0);"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAATCAYAAAAeVmTJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALpSURBVHgBrVZNSFRRFD7nvflxFpYzbhyDxLDohyiCWrQqLF0mBBOVmpRmk2L5dkE0zKZFPwpiGSIi/hQtWoRBFFJBQRDlJqUWpggD0o9OWYOOvndP5834xpczzqTzPhjunPO+e+/37jn3nIeQAq2dA3uRxDkQUApIWwHQxu4I/0aIcBAk6m6ur5qCNGjp6vJIqrOOED0k1EeKv+bdalxMnui4y+4T6TYggHkkDBbmO276fD4tScCdvhKU4TUvXmBMIYQGFt5hcNra+jeQXVy45K++gf9MlGAIEYrgP0FAj396cnxBn2/B8AUCL2153tB7XnjPCrrGQg6wkGHdaL3XpzDnNoE4KCVOQIbnaxGgAwGPuWeiPWaf2xs6lUKADhkJrpvs8qU1jsZEyKqzjYdiWB9Otnb0nk5YBPVpuOW32vuL4pvDzqVxN7Z09uyShDwC2WG80OPcFpqd3cjJ+J1taTUih+SiHA13C4d7Lq4BhiVZyGche2yZmlk4BMK+L50AHRyS/Zo91wvLl2KzjTP9CFgAgVDGJzoZuztpgdtBduSBEIbDqd//HWAB+A1LWEpkxa1PAt8GN3OdJl6ufnR2sABElM8LZ16L0EUCXWaXLmIRLAAiTnNFms/Moz8oY2SliE9gATjrx7icf83II/wBqhZN2AC/JI7MEFgAibjYgficiccFcVQjLZywuQVImqR1Q/YY93ocr0TE9UHvKxm4b2e/FevNL9ZzmD8hKedrRlnNAGQBTspreiNTFN8cAqU72UWbKp4Gg4dV/j+pOzgfvsQKi2aLNvEwAevDg2Z/9fJLELTDqmLhfmPjmek4jT7GfTgSE6HU1s4IDcqYNAlrgN5Fwx5njdl32V/9jJ88SUH/LdvwqmHw6Q/qo5DVwUSJVRqqxsge5bJLDyHj5hx3wiubPDnHzW3cwDzmVPLwxuQKc8gqmuoqQ4bDhXO9nMgVS+mQDCu+rAKBgOQuKCllbp5tkV4YYUiFv0SdHKEEFa6hAAAAAElFTkSuQmCC" alt="medium"></a>
      </div>
    </div>
    <div class="wp-20"></div>
  </div>
  <Modal :visible="modalVisible" @hide="closeModal" title="message.sorryChecking" />
</template>

<script lang="ts" setup>
import router from "@/router";
import store from "@/store";
import { ref } from "vue";
import Modal from "@/components/Modal/index.vue";

const modalVisible = ref(false);
const menuVisible = ref(false);
const aniVisible = ref(false);

const forceLogout = () => {
  store.commit("auth/setClearToken");

  if (store.state.showMode === 'webview') {
    window.Java.jsSignOut();

    router.push({ name: 'home', query: { showMode: 'webview', isLogin: 0 } });
  } else {
    router.push("/");
  }
};

const showModal = () => {
  store.state.popupType = 'message';
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
};

const toggleMenu = () => {
  if (menuVisible.value == true) {
    aniVisible.value = false;

    setTimeout(() => {
      menuVisible.value = false;
    }, 100);
  } else {
    menuVisible.value = true;

    setTimeout(() => {
      aniVisible.value = true;
    }, 100);
  }
};

const movePage = (page: string) => {
  menuVisible.value = false;
  aniVisible.value = false;

  if (page === "/market") {
    showModal();
  } else {
    router.push(page);
  }
};
</script>

<style scoped lang="scss">
.menus {
  z-index: 100;
  width: 100%;
  position: absolute;
  left: -100%;
  top: 48px;
  height: calc(100% - 48px);
  background-color: rgba(0, 0, 0, 0.7);
  transition: all 0.1s ease-in;

  .select {
    color: #18c050;
    font-weight: 500;
  }
}

.ani {
    transition: all 0.5s !important;
    left: 0;
}

.menu-right {
  font-family:"SUIT Variable", sans-serif !important;
}
</style>
