<script>
  import { StatusBar, Style } from "@capacitor/status-bar"
  import { onMount } from "svelte"

  onMount(setStatusBar)

  async function setStatusBar() {
    await StatusBar.setStyle({ style: Style.Dark })
    await StatusBar.hide()
  }
</script>
