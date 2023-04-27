<template>
  <!--
  <div id="footer">
    <div class="social-area">
      <a href="javascript:void(0);"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKpSURBVHgBlVRBSFRhEJ75d/UpUaSEmqxEFF2COolnIUg6VFbuZXXLQ63rZuqinarFU4dKa1VMg4hNLw/ELhEogdCxS4fSQ3mwwkJQEZNcdt+bZvS99e1byd2B//0z3//PN/P/M/9D2EP6+/VSPJAMIMFlNmt5VFhLyzw+EsIb2tQmolH/X7cvuoGBkUQAEB/zQhX8RwjgNxD1dIeDE3sS6rruWVpLDvPOEBQiCKPVZVrE7/cbYnptfGk1GeepMLKdVEPsK2QRMZV8no4mmnhq31mHMTDhEquztgtj6zxv7HKAzmgDz9MW1G5xAMZ0vbhsNbnAus/afa0r3DIpav/Yq9PrRbTQ19q6JfajkUSFhurInbbmue1Enif6mOKBRfpzrVw74T28stXERfBloiussfXorRtfnKfrDQelyssZALFS0rXEJ1wKARsdF5JWhG8hTzENcFUYGxV/6xzQdGdb4CvkKdH2lg88zTkY66Qovt0E4RMUKgTfHJZPZa0hFEOhfAglTlsIV2yDu/wsFCCxWEy5fFYUN9lnR7z6wReJ43nyQVnVSSloZcabuThDnNndgt60gVNPhl/W7EcmPcpHGsxGcQYHRl8f5b/KIlvzHIMbGu9xaxkcaVJeQnW5NmG/03h8/JChEf+F8BzvldfkcbCl+D6Pqe5Qyy+ONMTAGTkF30kvjxImC3AFL9pkIh0dgQ0OHmayKy4yKcCQcG1XuSityfPhfsKOtDLfEdBVjnbTJHU3yweRCDG3tQjmU6V0X9RtwkjE/yedxgus/vCY6j2SOoVA615lHnT7Cp7FJdelzIbeYHAzQyjSc7t5MUVUR5Ip0kNuMN1ArM9JhsBwmDMeLVXbFbr+3Qa8zs3W4z//bGS80QTq5PvahFxJ8ZjlwsQ7w81T7sV/tET2DpGARgMAAAAASUVORK5CYII=" alt="github"></a>
      <a href="javascript:void(0);"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH9SURBVHgBrVQ7axRRFP7OnevOJhaBgNiJhVgIgrUgaqeI+IgGYSHNEhcCAbUz3TQipHArMdtICIr4IsQfEMRO8ZEqTRRsohBiRsEkk9y5J9/muZss2c1mPxju3PP4znfPuTPycOhlR6hJSaDXAbFoHp75oxou523WLz6GSDcN2CcMKMwkgTckvIEWQoGrZEcGLYVYU1FiEqrPq6qKjNAeY48wW5z4qEEwWOm0MA9U0Ic9wlTt0qWYai9Q4mUW+ZuqK7Dar3XvKI92lkV6yz7ul+nrV2gX536Ftnc1SeMsfvMSdBnjJkVRUk5x/RgzbTKfg/qCePwU1YiteXHAu9eicksDfGLMn5qkHWnazopnVILDXOc3HYL/q8ogJ/he9s2J+tlEMu1UflwdDtY+vqDT+sxJ9cEleDNDib1UdIgRx+g9uqBt9/1CeNqLTIjIAFuUU+ssQncuK2a2klSKT0YU+4FibNGEPVlNnnJ3rVpps5wGUYjkPJVd3LCVv/WET4gmwYF+3lkHeIvWYtxY5/tJPo4WgC2YUHX5zV9TcWj4iIrt3B4oqR/gzbhZYfqixuR3EDr8u9eX+7Gagzp4VHp2Srz/ulVFu+8Uel7tllN3+ndv576p4v2aHEzNTX9/Uy+nsStlUCwvIjoYRZGvH94A4umpMfbpgyzFw43ErwAe2r81HwuIagAAAABJRU5ErkJggg==" alt="naver"></a>
      <a href="javascript:void(0);"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIYSURBVHgBtZVNTBNBFMf/s4xsl3JQKk3VmIApX4piDF48eVNjoh5MDwS84IGECzePxqM3LiQc9KA0fjQxGi5y82RMlAMmxoQQEiAkfHXbhW0ItEuXecOytGUoUMI/6bR9b95v386+95ZBoaGhRK1TtdHlungCsE4w1EuHixWxjDOGb3wr8KG/P5YpjWWlhsHh973C/Fr8DKG8TAF/MdD37K0S+DKRqD6X2iRnN46neLpO730Vi2XpD9+1VggjdYtY+u6hRaNl5zYrgvlQjwFGDyBXtTmDw8/sMJlntvQGTk9TcI8EqzECaG+LorX5CizLxujYj0J3iFhclgYrD7p0IYwb11oQbbwMTZOnBGvV3rePWFzWmUKcc7Q2NeJmewtCdWfFZhdT07NojjZIfzq9qohindwvWk9GQMetjqu43tYEXa+WtjU7g5+/J3Dndoe/z1QBBYuXZtX19CFqgzW+7f/kNCb+TeLR/btF9pSlypDqkNrJy9JxHLz7NIqLkXpEwuexuJSEtWYj9vgegkGjKDClylCwOPWmyPXBro2gc/ML8kOKhEMwDL0ozs6sI5vNQUEc16jRUUaLyyY+fx0TZ2YVZGcp9xJLo6kB2egHazmZwscv3/Hrz1/kco64SFK1zSSWrEBvwrzBEUR1mM/nFR73OU0ev6QHh0dGUHk/xwf6evaGA4lGEDlwfMW9WKnTG7CFOskrYBtyfc23LevXlAAAAABJRU5ErkJggg==" alt="telegram"></a>
      <a href="javascript:void(0);"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAASCAYAAABfJS4tAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIwSURBVHgBrVRNaBNBFH5vZmNKpR4UwSoK3kQQrHopIlRFEKkXDz2oW9GDabSkjVrIrQTqRdB2U7C7lwpNVMilevCiQgX14kEInoQgaJGIWNJSbNpms69vkjZN023+6Acz++Z7M9/smzdvEOrEsBU9gQ4NAeI5HmrcEkg41Oe/PhmPx+Xv9NJFKTCBavKIGX1LCKGgT/9aSdQwY+cJ6A2b3s1emgLAY2yk0qnkcYxEYrucHTTHxDyLd7P4KzdRy7I8GWpOsnlo663BQcAxIloQQuQ8q2QLEkwaZvQxizSXr8jQzvYqogrCIerMOdlR0dt7Y4bDmC4GBHCP/+zbsDlxZXBwSlvjkWhfFVG1NkGQO33/7q3p/Bkb5sRtArRc5s5zS/K5/uKJkuU7qwgbwR69X9laZHx8L2WxldkPPO4om9vCrY3PrQ1qAEI+V3mImZ+H00TQ5yJaN1gnWRQOh8/a/H0J2wC+z1+KwqrLEoWhZLcG8aP/jv59g/CAv/svgX2BzWcckA2N4UXpQFs3ZQd3N1UKGsB/G6VRSog1Y/bPwVihLOsHX8eHD3xX/7kKqySmvblLnNlwacHUgHcHdjc9Kidd4x4Zi3EhkMXe/VABvPhjBr2XQ76uuU0+VSDZDDShEK38cJwBwmvMVy0IDn9ULs8OBAKBJTe/Zi96jkgJT9g+pWqyBnwiwlDQr3+GytEUYDx9ftKR1CWI2ln/KFN7Vl0pLLwX7wXg60CPnoAasAK9jMxZNLXSVgAAAABJRU5ErkJggg==" alt="twitter"></a>
      <a href="javascript:void(0);"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAATCAYAAAEISXYdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozOEQxNzMzNzc4MjkxMUVDODJFREFDQ0ZFM0Q3NjQxOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozOEQxNzMzODc4MjkxMUVDODJFREFDQ0ZFM0Q3NjQxOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM4RDE3MzM1NzgyOTExRUM4MkVEQUNDRkUzRDc2NDE5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM4RDE3MzM2NzgyOTExRUM4MkVEQUNDRkUzRDc2NDE5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+spsEzwAAAj9JREFUeNpiYACCCTMW3wPRjEDGPyD9AogTGaAyjiAaIIAY0JUZAOnzIA4TEFcDsXRBRiwjQACBZHiBnE8MqICPEar/P7IoSAdAAMEkMoHUNCDOAgpOZ0RXCbMIBGZD6URkwVQoPR/Zsf+B2AHGBwggmEWWQOoYA25gBXTAcZADLgE5D4A4CojrgbgfiJ9CFaUBsS8UXwa5YR+UkwfEr6AK9wAxKPBMgNgDiH+A1DEiue8ckDLE4oRzQCcYgxgsSIJcoNDC424GgABCNlkQSM0AYh+o0BYgzgAa8B45JJ4BKUkchj0HKpYChcIjIEeWAT94wgRVBPKtJTTIQBqloAq2AbE+EMvAPLQfiB9C3QgKmu9Q8QRo4oPHKwgIAXE7yMlA7ALEKdDwToIFEUjXAiDmhWpwg2IYAMklwHxtDqRO4PCIJdDXJ5DDEZQIb0I99BcoeRFDC1CRKhBb4AsfgABjRNMgDKQaoSmYi4Ew+AZN2PVAF7zFlp73AjEnA/kAFPzOsHRfCeS0AfFXIL6DpAiUVASA+C1SsgGlJ0EoG5TnuYGYGYjfQaMNBKpAcdkC5XBDU0IC1DB2INYB4tVQS0FACcnSfCBOB2JtpEQCAi1M0NyJDfhCLQKFWR8Qnwbif9AU9waqBpQz7IB4IpK+ByzQNHwdKWLOQ+lDWCz6iMSGlTwBaOHqgJyeQF6ZgpaxiQV/gTgHGEkzMJIU1HBQoTSTgCGgcukAEM8FGrSfUDoFhfFraESBwrEWqOkHqc4GABHvpxLhTr39AAAAAElFTkSuQmCC" alt="kakao"></a>
      <a href="javascript:void(0);"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAATCAYAAAAeVmTJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALpSURBVHgBrVZNSFRRFD7nvflxFpYzbhyDxLDohyiCWrQqLF0mBBOVmpRmk2L5dkE0zKZFPwpiGSIi/hQtWoRBFFJBQRDlJqUWpggD0o9OWYOOvndP5834xpczzqTzPhjunPO+e+/37jn3nIeQAq2dA3uRxDkQUApIWwHQxu4I/0aIcBAk6m6ur5qCNGjp6vJIqrOOED0k1EeKv+bdalxMnui4y+4T6TYggHkkDBbmO276fD4tScCdvhKU4TUvXmBMIYQGFt5hcNra+jeQXVy45K++gf9MlGAIEYrgP0FAj396cnxBn2/B8AUCL2153tB7XnjPCrrGQg6wkGHdaL3XpzDnNoE4KCVOQIbnaxGgAwGPuWeiPWaf2xs6lUKADhkJrpvs8qU1jsZEyKqzjYdiWB9Otnb0nk5YBPVpuOW32vuL4pvDzqVxN7Z09uyShDwC2WG80OPcFpqd3cjJ+J1taTUih+SiHA13C4d7Lq4BhiVZyGche2yZmlk4BMK+L50AHRyS/Zo91wvLl2KzjTP9CFgAgVDGJzoZuztpgdtBduSBEIbDqd//HWAB+A1LWEpkxa1PAt8GN3OdJl6ufnR2sABElM8LZ16L0EUCXWaXLmIRLAAiTnNFms/Moz8oY2SliE9gATjrx7icf83II/wBqhZN2AC/JI7MEFgAibjYgficiccFcVQjLZywuQVImqR1Q/YY93ocr0TE9UHvKxm4b2e/FevNL9ZzmD8hKedrRlnNAGQBTspreiNTFN8cAqU72UWbKp4Gg4dV/j+pOzgfvsQKi2aLNvEwAevDg2Z/9fJLELTDqmLhfmPjmek4jT7GfTgSE6HU1s4IDcqYNAlrgN5Fwx5njdl32V/9jJ88SUH/LdvwqmHw6Q/qo5DVwUSJVRqqxsge5bJLDyHj5hx3wiubPDnHzW3cwDzmVPLwxuQKc8gqmuoqQ4bDhXO9nMgVS+mQDCu+rAKBgOQuKCllbp5tkV4YYUiFv0SdHKEEFa6hAAAAAElFTkSuQmCC" alt="medium"></a>
    </div>
    <div class="link-area">
      <a href="javascript:void(0);">Contact</a>
      <a href="javascript:void(0);">Docs</a>
      <a href="javascript:void(0);">Audits</a>
    </div>
  </div>
  -->
  <div class="h-10"></div>
  <div class="h-10"></div>
  <div class="h-10"></div>
  <div class="fixed-bottom">
    <a :class="{ oPage: $route.name === 'myzq' }" @click="movePage('/myzq')">My Z.Q</a>
    <a :class="{ oPage: $route.name === 'zeronft' }" @click="movePage('/zeronft')">ZeroNFT</a>
    <a :class="{ oPage: $route.name === 'onft' }" @click="movePage('/onft')">O!NFT</a>
    <a :class="{ oPage: $route.name === 'mywallet' }" @click="movePage('/mywallet')">My<br />Wallet</a>
    <a @click="movePage('/market')">Open<br />Market</a>
  </div>
  <!-- <Modal :visible="store.state.isPopup" @hide="closeModal" @resData="checkData" @afterLogin="afterLogin" title="message.sorryChecking" /> -->
</template>

<script lang="ts" setup>
import router from "@/router";import { ref } from "vue";
import store from "@/store";
import Modal from "@/components/Modal/index.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const showModal = () => {
  store.state.isPopup = true;
};

const closeModal = () => {
  store.state.isPopup = false;
};

const checkData = (type: string) => {
  console.log("type = " + type);
}

const afterLogin = () => {
  router.push("/");
}

const movePage = (page: string) => {
  if (page === "/market") {
    showModal();
  } else {
    router.push(page);
  }
};
</script>

<style scoped lang="scss">
</style>
