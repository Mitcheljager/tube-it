<script>
  import { StatusBar, Style } from "@capacitor/status-bar"

  async function setStatusBar() {
    await StatusBar.setStyle({ style: Style.Dark })
    await StatusBar.hide()
  }
</script>
