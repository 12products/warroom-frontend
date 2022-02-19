import { Component } from 'solid-js'

const IncidentSummary: Component = () => {
  return (
    <section class="bg-zinc-800 border border-zinc-700 rounded p-4 space-y-4">
      <div class="flex justify-between">
        <div>
          <label class="text-sm text-zinc-500">BAT-66</label>
          <h1 class="text-2xl font-bold">Broken thing</h1>
        </div>

        <div class="text-sm">
          <div class="grid gap-4 grid-cols-3">
            <div class="text-zinc-500">TTD</div>
            <div class="col-span-2">10 minutes</div>
          </div>

          <div class="grid gap-4 grid-cols-3">
            <div class="text-zinc-500">TTR</div>
            <div class="col-span-2">12 minutes</div>
          </div>
        </div>
      </div>

      <p class="text-zinc-300">
        Made in the interiors of collapsing stars explorations paroxysm of
        global death vastness is bearable only through love globular star
        cluster across the centuries. Preserve and cherish that pale blue dot
        are creatures of the cosmos the sky calls to us Cambrian explosion bits
        of moving fluff a still more glorious dawn awaits. Astonishment Cambrian
        explosion the ash of stellar alchemy hundreds of thousands Sea of
        Tranquility cosmic ocean and billions upon billions upon billions upon
        billions upon billions upon billions upon billions.
      </p>
    </section>
  )
}

export default IncidentSummary
