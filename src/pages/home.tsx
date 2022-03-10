import type { Component } from 'solid-js'
import { FiX } from 'solid-icons/fi'
import { FaSolidMicrophoneSlash, FaSolidMicrophone } from 'solid-icons/fa'

import PublicLayout from '../components/layouts/PublicLayout'
import Grid from '../components/Grid'

const Home: Component = () => {
  return (
    <PublicLayout>
      <header class="md:pb-18 max-w-7xl mx-auto">
        <div class="h-screen relative">
          <div class="relative flex flex-col justify-center h-full z-10 pointer-events-none">
            <div class="md:w-2/3 bg-black bg-opacity-40 p-10 rounded-t">
              <h1 class="text-5xl md:text-6xl leading-none font-bold">
                Nobody's in the dark anymore.
              </h1>
            </div>

            <div class="bg-zinc-900 md:w-2/3 p-10 rounded-b pointer-events-auto shadow-2xl">
              <p class="text-2xl">
                We make incident response{' '}
                <span class="font-bold">stress-free</span>.
              </p>
            </div>
          </div>

          <Grid />
        </div>

        <div class="text-4xl md:text-5xl text-center font-bold pt-32 md:pt-0">
          PagerDuty alerted you.{' '}
          <span class="border-b-8 border-green-500">Now what?</span>
        </div>
      </header>

      <main class="max-w-7xl mx-auto space-y-40 md:space-y-60">
        <section class="md:flex items-center space-y-10 md:space-y-0">
          <div class="md:w-1/2 p-10 rounded">
            <h2 class="text-3xl md:text-4xl leading-none font-bold mb-4">
              An intelligent status page
            </h2>

            <p class="text-xl md:text-2xl">
              Update stakeholders in{' '}
              <span class="font-bold border-b-4 border-green-500">
                real time based on open incidents
              </span>
              .
            </p>
          </div>

          <div class="mx-auto md:w-1/2">
            <div class="mx-auto bg-white w-2/3 p-5 rounded">
              <div class="w-full bg-red-500 rounded-t p-2 flex space-x-2 items-center relative z-10">
                <FiX /> <span class="text-xs">Outage</span>
              </div>
              <div class="bg-red-300 h-12 w-full rounded-b"></div>

              <div class="text-zinc-600 mt-2">Service Status</div>

              <div class="flex justify-between mt-2">
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-red-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-red-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-yellow-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-yellow-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-green-500 w-1 h-4 rounded"></div>
                <div class="bg-red-500 w-1 h-4 rounded relative">
                  <div class="bg-red-500 animate-ping absolute top-0 right-0 left-0 bottom-0 rounded"></div>
                </div>
              </div>

              <div class="text-zinc-600 mt-4 mb-2">Past Incidents</div>

              <div class="w-1/3 bg-zinc-300 h-4 rounded"></div>
              <div class="w-2/3 mt-2 bg-zinc-300 h-4 rounded"></div>

              <div class="w-1/3 mt-2 bg-zinc-300 h-4 rounded"></div>
              <div class="w-2/3 mt-2 bg-zinc-300 h-4 rounded"></div>

              <div class="w-1/3 mt-2 bg-zinc-300 h-4 rounded"></div>
              <div class="w-2/3 mt-2 bg-zinc-300 h-4 rounded"></div>

              <div class="w-1/3 mt-2 bg-zinc-300 h-4 rounded"></div>
              <div class="w-2/3 mt-2 bg-zinc-300 h-4 rounded"></div>
            </div>
          </div>
        </section>

        <section class="md:flex items-center space-y-10 md:space-y-0 md:space-x-10">
          <div class="mx-auto md:w-1/2 rounded hidden md:block bg-white ">
            <div class="w-full mx-auto p-5 flex space-x-4 text-zinc-600">
              <div class="grid grid-flow-col grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 w-2/3">
                <div class="bg-zinc-300 p-2 rounded flex items-end">
                  <div class="text-xs w-full flex justify-between items-center">
                    Michael Scott <FaSolidMicrophoneSlash />
                  </div>
                </div>

                <div class="bg-zinc-300 p-2 rounded md:flex items-end hidden">
                  <div class="text-xs w-full flex justify-between items-center">
                    Pam Beesly <FaSolidMicrophoneSlash />
                  </div>
                </div>

                <div class="bg-zinc-300 p-2 rounded flex items-end">
                  <div class="text-xs w-full flex justify-between items-center">
                    Dwight Schrute <FaSolidMicrophone class="text-green-500" />
                  </div>
                </div>

                <div class="bg-zinc-300 p-2 rounded md:flex items-end hidden">
                  <div class="text-xs w-full flex justify-between items-center">
                    Jim Halpert <FaSolidMicrophoneSlash />
                  </div>
                </div>
              </div>

              <div class="bg-zinc-300 h-64 w-1/3 rounded text-xs p-2">
                <div>Incident #42</div>

                <div class="w-full h-6 bg-zinc-400 rounded mt-2"></div>

                <div class="mt-2">Events</div>

                <div class="h-4 w-1/3 bg-zinc-400 rounded mt-2"></div>
                <div class="h-4 w-2/3 bg-zinc-400 rounded mt-2"></div>

                <div class="h-4 w-1/3 bg-zinc-400 rounded mt-2"></div>
                <div class="h-4 w-2/3 bg-zinc-400 rounded mt-2"></div>

                <div class="h-4 w-1/3 bg-zinc-400 rounded mt-2"></div>
                <div class="h-4 w-2/3 bg-zinc-400 rounded mt-2 animate-ping"></div>
              </div>
            </div>

            <div class="bg-green-500 p-4 rounded w-1/3 mx-auto mb-4 font-bold text-center">
              JOIN ROOM
            </div>
          </div>

          <div class="md:w-1/2 p-10 rounded">
            <h2 class="text-3xl md:text-4xl leading-none font-bold mb-6">
              Centralized effort
            </h2>

            <p class="text-xl md:text-2xl">
              Collaborate over{' '}
              <span class="font-bold border-b-4 border-green-500">
                video chat with real-time incident updates
              </span>
              . Join with a single click.
            </p>
          </div>

          <div class="mx-auto md:w-1/2 md:hidden bg-white rounded p-5">
            <div class="w-full mx-auto flex space-x-4 text-zinc-600">
              <div class="grid grid-flow-col grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 w-2/3">
                <div class="bg-zinc-300 p-2 rounded flex items-end">
                  <div class="text-xs w-full flex justify-between items-center">
                    Michael Scott <FaSolidMicrophoneSlash />
                  </div>
                </div>

                <div class="bg-zinc-300 p-2 rounded md:flex items-end hidden">
                  <div class="text-xs w-full flex justify-between items-center">
                    Pam Beesly <FaSolidMicrophoneSlash />
                  </div>
                </div>

                <div class="bg-zinc-300 p-2 rounded flex items-end">
                  <div class="text-xs w-full flex justify-between items-center">
                    Dwight Schrute <FaSolidMicrophone class="text-green-500" />
                  </div>
                </div>

                <div class="bg-zinc-300 p-2 rounded md:flex items-end hidden">
                  <div class="text-xs w-full flex justify-between items-center">
                    Jim Halpert <FaSolidMicrophoneSlash />
                  </div>
                </div>
              </div>

              <div class="bg-zinc-300 h-64 w-1/3 rounded text-xs p-2">
                <div>Incident #42</div>

                <div class="w-full h-6 bg-zinc-400 rounded mt-2"></div>

                <div class="mt-2">Events</div>

                <div class="h-4 w-1/3 bg-zinc-400 rounded mt-2"></div>
                <div class="h-4 w-2/3 bg-zinc-400 rounded mt-2"></div>

                <div class="h-4 w-1/3 bg-zinc-400 rounded mt-2"></div>
                <div class="h-4 w-2/3 bg-zinc-400 rounded mt-2"></div>

                <div class="h-4 w-1/3 bg-zinc-400 rounded mt-2"></div>
                <div class="h-4 w-2/3 bg-zinc-400 rounded mt-2 animate-ping"></div>
              </div>
            </div>

            <div class="bg-green-500 p-4 rounded w-1/3 mx-auto mt-5 font-bold text-center">
              JOIN ROOM
            </div>
          </div>
        </section>

        <section class="md:flex items-center space-y-10 md:space-y-0 md:space-x-10">
          <div class="md:w-1/2 p-10 rounded">
            <h2 class="text-3xl md:text-4xl leading-none font-bold mb-6">
              A history of events
            </h2>

            <p class="text-xl md:text-2xl">
              Keep incidents up to date with tools you already know and love,
              like{' '}
              <span class="font-bold border-b-4 border-green-500">Slack</span>{' '}
              and{' '}
              <span class="font-bold border-b-4 border-green-500">
                the command line
              </span>
              .
            </p>
          </div>

          <div class="bg-opacity-75 bg-zinc-900 p-5 font-mono space-y-2 rounded mx-auto md:w-1/2">
            <div class="font-bold">
              <span class="text-green-500">{'>'}</span> wr add event "aws logs"{' '}
              {'<'} aws logs get-log-events
            </div>

            <div>
              <div>Dec 24, 2020 05:00:00 UTC - ..........</div>
              <div>Dec 24, 2020 05:03:42 UTC - ..........</div>
              <div>Dec 24, 2020 05:04:17 UTC - ..........</div>
              <div>Dec 24, 2020 05:05:23 UTC - ..........</div>
              <div class="hidden md:block">
                Dec 24, 2020 05:05:26 UTC - ..........
              </div>
              <div class="hidden md:block">
                Dec 24, 2020 05:05:27 UTC - ..........
              </div>
              <div class="hidden md:block">
                Dec 24, 2020 05:05:28 UTC - ..........
              </div>
              <div class="hidden md:block">
                Dec 24, 2020 05:05:30 UTC - ..........
              </div>
            </div>

            <div class="font-bold text-green-500">
              ✔ 238 log events sent to War Room (Incident #42)
            </div>
          </div>
        </section>

        <section class="md:flex items-center space-y-10 md:space-y-0 z-10 relative">
          <div class="md:w-1/2 hidden md:flex flex-col items-center text-zinc-600">
            <div class="bg-white w-4/5 md:w-2/3 rounded p-4">
              <div class="uppercase text-xs text-zinc-400">Runbook</div>
              <div class="flex justify-between items-center">
                <div>Too Many Pods</div>
                <div class="text-xs uppercase bg-zinc-300 rounded px-2 p-1">
                  Stale
                </div>
              </div>

              <div class="mt-2">Description</div>

              <div class="h-12 w-full bg-zinc-300 rounded"></div>

              <div class="mt-2">Steps</div>

              <div class="h-4 w-2/3 bg-zinc-300 rounded"></div>
              <div class="h-4 w-1/6 bg-zinc-300 rounded mt-2"></div>
              <div class="h-4 w-1/3 bg-zinc-300 rounded mt-2"></div>
              <div class="h-4 w-1/3 bg-zinc-300 rounded mt-2"></div>
              <div class="h-4 w-1/6 bg-zinc-300 rounded mt-2"></div>
              <div class="h-4 w-1/3 bg-zinc-300 rounded mt-2"></div>
            </div>

            <div class="bg-white w-4/5 md:w-2/3 rounded p-4 shadow-xl -mt-48 ml-16 md:ml-20">
              <div class="uppercase text-xs text-zinc-400">Postmortem</div>
              <div class="">Incident #42</div>

              <div class="mt-2 flex space-x-4 text-xs">
                <div class="bg-zinc-300 p-4 rounded w-1/2">
                  <div class="font-bold">MTTD</div>
                  <div>
                    3 min <span class="text-green-500 font-bold">↓</span>
                  </div>
                </div>

                <div class="bg-zinc-300 p-4 rounded w-1/2">
                  <div class="font-bold">MTTR</div>
                  <div>
                    45 min <span class="text-red-600 font-bold">↑</span>
                  </div>
                </div>
              </div>

              <div class="mt-2">Root Cause</div>

              <div class="h-12 w-full bg-zinc-300 rounded"></div>

              <div class="mt-2">Action Items</div>

              <div class="h-4 w-2/3 bg-zinc-300 rounded"></div>
              <div class="h-4 w-1/6 bg-zinc-300 rounded mt-2"></div>
              <div class="h-4 w-1/3 bg-zinc-300 rounded mt-2"></div>
            </div>
          </div>

          <div class="md:w-1/2 p-10 rounded">
            <h2 class="text-3xl md:text-4xl leading-none font-bold mb-6">
              Remove silos, embrace learnings
            </h2>

            <p class="text-xl md:text-2xl">
              <span class="font-bold border-b-4 border-green-500">
                Postmortems, incidents, events, and runbooks
              </span>{' '}
              all under one roof.
            </p>
          </div>

          <div class="md:hidden flex flex-col items-center text-zinc-600">
            <div class="bg-white w-4/5 md:w-2/3 rounded p-4">
              <div class="uppercase text-xs text-zinc-400">Runbook</div>
              <div class="flex justify-between items-center">
                <div>Too Many Pods</div>
                <div class="text-xs uppercase bg-zinc-300 rounded px-2 p-1">
                  Stale
                </div>
              </div>

              <div class="mt-2">Description</div>

              <div class="h-12 w-full bg-zinc-300 rounded"></div>

              <div class="mt-2">Steps</div>

              <div class="h-4 w-2/3 bg-zinc-300 rounded"></div>
              <div class="h-4 w-1/6 bg-zinc-300 rounded mt-2"></div>
              <div class="h-4 w-1/3 bg-zinc-300 rounded mt-2"></div>
              <div class="h-4 w-1/3 bg-zinc-300 rounded mt-2"></div>
              <div class="h-4 w-1/6 bg-zinc-300 rounded mt-2"></div>
              <div class="h-4 w-1/3 bg-zinc-300 rounded mt-2"></div>
            </div>

            <div class="bg-white w-4/5 md:w-2/3 rounded p-4 shadow-xl -mt-48 ml-16 md:ml-20">
              <div class="uppercase text-xs text-zinc-400">Postmortem</div>
              <div class="">Incident #42</div>

              <div class="mt-2 flex space-x-4 text-xs">
                <div class="bg-zinc-300 p-4 rounded w-1/2">
                  <div class="font-bold">MTTD</div>
                  <div>
                    3 min <span class="text-green-500 font-bold">↓</span>
                  </div>
                </div>

                <div class="bg-zinc-300 p-4 rounded w-1/2">
                  <div class="font-bold">MTTR</div>
                  <div>
                    45 min <span class="text-red-600 font-bold">↑</span>
                  </div>
                </div>
              </div>

              <div class="mt-2">Root Cause</div>

              <div class="h-12 w-full bg-zinc-300 rounded"></div>

              <div class="mt-2">Action Items</div>

              <div class="h-4 w-2/3 bg-zinc-300 rounded"></div>
              <div class="h-4 w-1/6 bg-zinc-300 rounded mt-2"></div>
              <div class="h-4 w-1/3 bg-zinc-300 rounded mt-2"></div>
            </div>
          </div>
        </section>

        <section class="text-center pb-20 text-2xl">
          a{' '}
          <a
            href="https://12products.xyz"
            class="text-green-500 hover:text-green-600 font-bold"
          >
            12products
          </a>{' '}
          project
        </section>
      </main>
    </PublicLayout>
  )
}

export default Home
