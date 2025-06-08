import {
  CloudArrowUpIcon,
  CpuChipIcon,
  BookOpenIcon,
  ChartBarIcon,
  UserIcon,
  Cog6ToothIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

export function Features() {
  return (
    
    <div className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32 transition-colors duration-300">
        <div className="relative lg:row-span-2 px-2  lg:-mt-36">

          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://whws.org.au/wp-content/uploads/2021/12/get-on-top-of-mental-health-early.jpg"
              className="h-12 w-auto"
            />
          </a>
        </div>
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-indigo-600 dark:text-indigo-400"></h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 dark:text-white sm:text-5xl">
          Features
        </p>

        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* Upload and Track Exercises */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800 lg:rounded-l-4xl"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <CloudArrowUpIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto" />
                <p className="mt-4 text-lg font-medium tracking-tight text-gray-950 dark:text-white text-center">
                  Upload and Track Exercises
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-300 text-center">
                  Easily upload and manage your daily exercises. Track your activity over time and keep your routine consistent.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 lg:rounded-l-4xl"></div>
          </div>

          {/* AI-Powered Mood Prediction */}
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800 max-lg:rounded-t-4xl"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <CpuChipIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto" />
                <p className="mt-4 text-lg font-medium tracking-tight text-gray-950 dark:text-white text-center">
                  AI-Powered Mood Prediction
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-300 text-center">
                  Let our AI analyze your journal inputs and detect your current emotional state, helping you stay aware of your mental well-being.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 max-lg:rounded-t-4xl"></div>
          </div>

          {/* Daily Mood Overview */}
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <ChartBarIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto" />
                <p className="mt-4 text-lg font-medium tracking-tight text-gray-950 dark:text-white text-center">
                  Daily Mood Overview
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-300 text-center">
                  View a clear summary of your mood over several days, based on journal entries and activity logs.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10"></div>
          </div>

          {/* Smart Journal Summaries */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800 max-lg:rounded-b-4xl lg:rounded-r-4xl"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <BookOpenIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto" />
                <p className="mt-4 text-lg font-medium tracking-tight text-gray-950 dark:text-white text-center">
                  Smart Journal Summaries
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-300 text-center">
                  Automatically generate insightful summaries of your diary inputs to reflect on your emotional and mental patterns.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10 max-lg:rounded-b-4xl lg:rounded-r-4xl"></div>
          </div>

          {/* Account Creation */}
          <div className="relative max-lg:row-start-4">
            <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <UserIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto" />
                <p className="mt-4 text-lg font-medium tracking-tight text-gray-950 dark:text-white text-center">
                  Account Creation
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-300 text-center">
                  Sign up for a personal account to securely store and access your mental health journey anytime, anywhere.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10"></div>
          </div>

          {/* User Settings */}
          <div className="relative max-lg:row-start-5">
            <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <Cog6ToothIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto" />
                <p className="mt-4 text-lg font-medium tracking-tight text-gray-950 dark:text-white text-center">
                  User Settings
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-300 text-center">
                  Manage your email, password, and username easily from one place. Stay in control of your profile settings.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10"></div>
          </div>

          {/* Dark Mode Support */}
          <div className="relative max-lg:row-start-6">
            <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <MoonIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto" />
                <p className="mt-4 text-lg font-medium tracking-tight text-gray-950 dark:text-white text-center">
                  Dark Mode Support
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 dark:text-gray-300 text-center">
                  Enjoy a seamless visual experience day or night with full dark mode support throughout the app.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 dark:ring-white/10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}