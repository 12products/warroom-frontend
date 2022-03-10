import { Component, For, createEffect, onCleanup } from 'solid-js'

const Grid: Component = () => {
  createEffect(() => {
    const ping = setInterval(() => {
      const cells = document.querySelectorAll('.cell-child')
      const cell = cells[Math.floor(Math.random() * cells.length)]

      cell.classList.remove('hidden')
      cell.classList.add('animate-ping')

      setTimeout(() => {
        cell.classList.add('hidden')
        cell.classList.remove('animate-ping')
      }, 2000)
    }, 2000)

    onCleanup(() => clearInterval(ping))
  })

  const grid: number[][] = []

  for (let i = 0; i < 10; i++) {
    const row = []

    for (let j = 0; j < 10; j++) {
      row.push(j)
    }

    grid.push(row)
  }

  return (
    <>
      <div class="grid-container flex justify-center items-center absolute top-0 bottom-0 left-0 right-0">
        <For each={grid}>
          {(row) => (
            <div class="row border-2 border-green-500 divide-y-4 divide-green-500">
              <For each={row}>
                {(cell) => (
                  <div class="cell w-24 h-24 transition duration-500 ease-in-out relative hover:bg-green-500">
                    <div class="cell-child hidden bg-red-500 absolute top-0 bottom-0 right-0 left-0"></div>
                  </div>
                )}
              </For>
            </div>
          )}
        </For>
      </div>

      <style>{`
        .grid-container {
          transform: rotateX(65deg) rotateY(0deg) rotateZ(-45deg);
        }
        .cell:hover {
          box-shadow: 0px 0px 25px 2px rgba(72, 187, 120, 1);
          transform: translateY(-20px) translateX(20px);
          border-radius: 0.25rem;
        }
      `}</style>
    </>
  )
}

export default Grid
