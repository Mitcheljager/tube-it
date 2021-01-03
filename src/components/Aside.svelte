<script>
  export let align = "left"
  let randomString = Math.random().toString(16).substr(2, 5)
</script>

<svg width=30 x={ align == "left" ? 0 : 300 } y=0>
  <defs>
    <linearGradient id="gradient-{ randomString }">
      { #if align == "left" }
        <stop offset="0%" stop-color="#12191d" />
        <stop offset="80%" stop-color="#12191d" stop-opacity="0" />
      { :else }
        <stop offset="20%" stop-color="#12191d" stop-opacity="0" />
        <stop offset="100%" stop-color="#12191d" />
      { /if }
    </linearGradient>
  </defs>

  { #each [...Array(12)] as _, i }
    <svg y={ i * 45 - 0.5 } height=45>
      <rect y=0 height=1 width=30 fill=#ffffff15 />
      <rect height=46 width=5 x={ align == "left" ? 25 : 0 } fill=#ffffff15 />

      <rect height=15 x={ align == "left" ? 26 : 0 } y=15.5 width=4 class=pipe--{ i } />
      <rect height=2 y=22 width=30 class=pipe--{ i } />
    </svg>
  { /each }

  <rect width=30 height=100% fill=url(#gradient-{ randomString }) />
</svg>

<style lang="scss">
  $primary: #bd1d46;
  $gray: #738b98;

  .pipe {
    --pipe-color: #{ $gray };

    @for $i from 0 through 11 {
      &--#{ $i } {
        --pipe-color: #{ adjust-hue($primary, (11 - $i) * 30) };
        fill: var(--pipe-color);
        stroke: var(--pipe-color);
      }
    }
  }
</style>
