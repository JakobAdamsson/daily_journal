import {
  EyeIcon,
  BookOpenIcon,
  CpuChipIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const background = [
  {
    name: 'Emotional Awareness Through Reflection',
    description:
      'During therapy, I learned how crucial it is to track emotions and thoughts consistently. A structured journaling system helps make patterns visible — something a simple notebook often fails to do. This app provides an intelligent space to reflect and understand your mood over time.',
    icon: EyeIcon, // symbolizes awareness and observation
  },
  {
    name: 'Bringing Therapy Tools Into Daily Life',
    description:
      'Many exercises from KBT — such as thought records, behavioral activation, and mindfulness — are powerful but easy to forget between sessions. Having a place to upload and revisit these tools makes it easier to integrate therapy into everyday routines.',
    icon: BookOpenIcon, // represents knowledge and mental exercises
  },
  {
    name: 'AI as a Supportive Mirror',
    description:
      'AI-powered mood predictions and summaries act like a digital mirror, giving users immediate, personalized feedback. It’s not a replacement for therapy but an accessible way to stay in tune with your mental state between professional support.',
    icon: CpuChipIcon, // symbolizes artificial intelligence and processing
  },
  {
    name: 'Empowerment Through Insight',
    description:
      'When you struggle with mental health, it’s easy to feel lost in the noise of daily life. A consistent overview of how your mood changes — especially when linked to what you’ve written and done — creates a sense of control and progress. That feeling matters.',
    icon: ChartBarIcon, // represents progress and mood overview
  },
];




export function Background() {
  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32 transition-colors duration-300">
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
            Helping others through experience
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white sm:text-5xl lg:text-balance">
            Built from personal struggle to support your mental health
          </p>
          <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
            I have experience with mental health issues, I am 25 years old, and I have built this to help others in need.
            The app includes exercises and guidance for mental health gathered over years of my own challenges.
            I hope it brings clarity, support, and healing to those who need it.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {background.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
