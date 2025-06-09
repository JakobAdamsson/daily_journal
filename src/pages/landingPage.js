import React, { useState, useEffect } from 'react';
import '../App.css';

import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import { RecentDocuments } from './recentDocuments.js'
import { GetUsername } from '../helpers/fetchbackend.js';
import { useNavigate } from "react-router-dom";




export function LandingPage({ isLoggedIn, setIsLoggedIn, email}) {
    //console.log(localStorage.getItem("isLoggedIn"))
    const renderLoginComponents = localStorage.getItem("isLoggedIn") === "true";
    //console.log('textEditorEnabled:', textEditorEnabled);
    let tmp = ""
    if (renderLoginComponents) {
        tmp = [{
            name: 'Write Journal',
            href: '/Texteditor'},
          {
            name: 'Upload Document',
            href: '/upload_document',
          },
          {
            name: 'Your uploads',
            href: '/uploads',
          },
          {
            name: 'Mood graph',
            href: '/mood_graph',
          },
          {
            name: 'Export your data',
            href: '/export_data',
          },
          
          ]
    }
    else {
        tmp = []
    }
    const navigation = [
        { name: 'Features', href: '/features', requiresAuth: false },
        { name: 'Background', href: '/background', requiresAuth: false },
        ...tmp,
    ]
    //console.log('isLoggedIn in LandingPage:', isLoggedIn);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [loggedInUsername, setLoggedInUsername] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUsername = async () => {
        if (isLoggedIn && email) {
            const username = await GetUsername(email);
            setLoggedInUsername(username);
        }
        };

        fetchUsername();
    }, [isLoggedIn, email]);
    //console.log('loggedInUsername:', loggedInUsername, isLoggedIn);



return (
  <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
    <header className="relative  -mt-4 -mr-4 -ml-6">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://whws.org.au/wp-content/uploads/2021/12/get-on-top-of-mental-health-early.jpg"
              className="h-12 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-gray-900 dark:text-white"
            >
              {item.name}
            </a>
          ))}
        </div>
        {!isLoggedIn ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/login" className="text-sm/6 font-semibold text-gray-900 dark:text-white">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
                onClick={() => {
                    setIsLoggedIn(false);
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("email");
                }}
              className="text-sm/6 font-semibold text-gray-900 dark:text-white"
            >
              Log out
            </button>
          </div>
          
        )}


        {!isLoggedIn ? (
            <div></div>
        ) : (
            <button
              onClick={() => navigate('/user_settings')}
              
              className="text-sm/6 font-semibold text-gray-900 dark:text-white px-4"
            >
              Settings
            </button>
          
        )}
        
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:ring-white/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-700">
              <div className="space-y-2 py-6">
                {navigation
                .map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>

    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
        />
      </div>

      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-white/20 hover:ring-gray-900/20 dark:hover:ring-white/40">
            {isLoggedIn ? 
            ("Welcome, " + localStorage.getItem("username")): ("Guest")}
            <a href="#" className="font-semibold text-indigo-600 dark:text-indigo-400">
              <span aria-hidden="true" className="absolute inset-0" />
            </a>
            <a>, Always remember that you matter!</a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-white sm:text-7xl">
            Daily Journal For Mental Health
          </h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
          </div>
        </div>
      </div>


      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
        />
      </div>
    </div>
    
  </div>
);

}