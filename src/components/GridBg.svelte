<g>
  { #each Array(7) as _, i }
    <line
      x1={ i * 45 }
      x2={ i * 45 }
      y1=0
      y2=100%
      stroke=#ffffff11 />

    { #each Array(13) as _, l }
      <line
        x1={ (i * 45) }
        x2={ (i * 45) }
        y1={ (l * 45) - 3 }
        y2={ (l * 45) + 3 }
        stroke=#ffffff15 />
    { /each }

    { #each Array(3) as _, j }
      <line
        x1={ (j + 1) * 15 + (i * 45)  }
        x2={ (j + 1) * 15 + (i * 45)  }
        y1=0
        y2=100%
        stroke-dasharray="3 2"
        stroke=#ffffff05 />
    { /each }
  { /each }

  { #each Array(13) as _, i }
    <line
      x1=0
      x2=100%
      y1={ i * 45 }
      y2={ i * 45 }
      stroke=#ffffff11 />

    { #each Array(7) as _, l }
      <line
        x1={ (l * 45) - 3 }
        x2={ (l * 45) + 3 }
        y1={ (i * 45) }
        y2={ (i * 45) }
        stroke=#ffffff15 />
    { /each }

    { #each Array(3) as _, j }
      <line
        x1=0
        x2=100%
        y1={ (j + 1) * 15 + (i * 45)  }
        y2={ (j + 1) * 15 + (i * 45)  }
        stroke-dasharray="3 2"
        stroke=#ffffff05 />
    { /each }
  { /each }
</g>
