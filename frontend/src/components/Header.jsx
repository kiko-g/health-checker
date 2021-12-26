import * as React from 'react'
import { Link } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import PropTypes from 'prop-types'
import { DarkModeSwitch } from './Utils'

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default function Header({ siteTitle }) {
  return (
    <Disclosure as="nav" className="bg-bluegray-600 dark:bg-bluegray-700 text-white space-x-4 shadow-xl">
      {({ open }) => {
        return (
          <>
            <div className="mx-auto">
              <div className="relative flex items-center justify-between h-14 md:h-16">
                <div className="absolute inset-y-0 right-4 flex items-start md:hidden">
                  <Disclosure.Button className="transition duration-200 ease inline-flex items-center justify-center p-1 ml-3 mt-3 rounded-sm text-gray-400 hover:text-white hover:bg-bluegray-400 focus:outline-none focus:ring focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6 transition duration-200 ease" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6 transition duration-200 ease" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex-1 flex items-center justify-between md:items-stretch md:justify-between md:mx-2">
                  <div className="text-md font-medium h-auto py-0.5 ml-4 md:mx-2 space-x-12">
                    <Link to={`/`}>
                      <button className="hover:bg-opacity-50 hover:text-blue-200 text-white transition duration-200">
                        <span className="tracking-wider uppercase font-semibold">{siteTitle}</span>
                      </button>
                    </Link>
                  </div>
                  <div className="hidden md:inline-flex md:space-x-2">
                    <Link to={`/about`}>
                      <button className="text-bluegray-100 hover:bg-opacity-50 hover:bg-bluegray-400 hover:text-white px-1.5 py-0.5 rounded-sm duration-200">
                        About
                      </button>
                    </Link>
                    <Link to={`/faq`}>
                      <button className="text-bluegray-100 hover:bg-opacity-50 hover:bg-bluegray-400 hover:text-white px-1.5 py-0.5 rounded-sm duration-200">
                        FAQ
                      </button>
                    </Link>
                    <Link to={`/contact`}>
                      <button className="text-bluegray-100 hover:bg-opacity-50 hover:bg-bluegray-400 hover:text-white px-1.5 py-0.5 rounded-sm duration-200">
                        Contact us
                      </button>
                    </Link>
                  </div>
                  <div className="hidden md:block md:ml-6">
                    <div className="flex space-x-2 mr-2">
                      <span key="nav-dark-mode" className="px-2 pt-0.5 rounded-lg h-auto divide-x-2 divide-red-400">
                        <DarkModeSwitch />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* @@ Mobile view */}
            <Disclosure.Panel className="md:hidden">
              <div className="flex flex-col px-0 pb-3 mr-4 space-y-1 md:block md:px-2">
                <span key="nav-dark-mode" className="rounded-lg text-lg font-medium h-auto mb-4">
                  <DarkModeSwitch />
                </span>
                <span className="rounded-lg text-lg font-medium h-auto mb-4">
                  <Link to={`/about`}>
                    <button className="text-bluegray-100 hover:bg-opacity-50 hover:bg-bluegray-400 hover:text-white px-1.5 py-0.5 rounded-sm duration-200">
                      About
                    </button>
                  </Link>
                </span>
                <span className="rounded-lg text-lg font-medium h-auto mb-4">
                  <Link to={`/faq`}>
                    <button className="text-bluegray-100 hover:bg-opacity-50 hover:bg-bluegray-400 hover:text-white px-1.5 py-0.5 rounded-sm duration-200">
                      FAQ
                    </button>
                  </Link>
                </span>
                <span className="rounded-lg text-lg font-medium h-auto mb-4">
                  <Link to={`/contact`}>
                    <button className="text-bluegray-100 hover:bg-opacity-50 hover:bg-bluegray-400 hover:text-white px-1.5 py-0.5 rounded-sm duration-200">
                      Contact us
                    </button>
                  </Link>
                </span>
              </div>
            </Disclosure.Panel>
          </>
        )
      }}
    </Disclosure>
  )
}
