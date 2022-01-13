import * as React from 'react'
import { Link } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import PropTypes from 'prop-types'
import DarkModeSwitch from './DarkModeSwitch'

export default function Header({ siteTitle }) {
  return (
    <Disclosure
      as="nav"
      className="header-color text-bluegray-700 dark:bg-bluegray-600 dark:text-white space-x-4 shadow-md"
    >
      {({ open }) => {
        return (
          <>
            <div className="relative flex items-center justify-between h-14 md:h-16">
              <Hamburger open={open} />
              <div className="flex-1 flex items-center justify-between md:items-stretch md:justify-between md:mx-2">
                <Home siteTitle={siteTitle} />
                <Navigation />
                <DarkMode />
              </div>
            </div>
            <MobileView />
          </>
        )
      }}
    </Disclosure>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

const Hamburger = ({ open }) => (
  <div className="absolute inset-y-0 right-4 flex items-start md:hidden">
    <Disclosure.Button className="transition duration-200 ease inline-flex items-center justify-center p-1 ml-3 mt-3 rounded text-bluegray-500 hover:text-white hover:bg-bluegray-400 focus:outline-none focus:ring focus:ring-inset focus:ring-white">
      <span className="sr-only">Open main menu</span>
      {open ? (
        <XIcon className="block h-6 w-6 transition duration-200 ease" aria-hidden="true" />
      ) : (
        <MenuIcon className="block h-6 w-6 transition duration-200 ease" aria-hidden="true" />
      )}
    </Disclosure.Button>
  </div>
)

const Home = ({ siteTitle }) => (
  <div className="text-sky-600 h-auto py-0.5 ml-4 md:mx-2 space-x-12">
    <Link to={`/`}>
      <button className="hover:bg-opacity-50 hover:text-bluegray-400 transition duration-200">
        <span className="tracking-wider uppercase font-bold">{siteTitle}</span>
      </button>
    </Link>
  </div>
)

const Navigation = () => (
  <div className="hidden md:inline-flex md:space-x-5">
    <Link to={`/about`}>
      <button className="text-blue-400 hover:bg-opacity-50 uppercase hover:bg-bluegray-400 hover:text-white px-1.5 py-0.5 rounded duration-200">
        About
      </button>
    </Link>
    <Link to={`/faq`}>
      <button className="text-blue-400 hover:bg-opacity-50 uppercase hover:bg-bluegray-400 hover:text-white px-1.5 py-0.5 rounded duration-200">
        FAQ
      </button>
    </Link>
    <Link to={`/contact`}>
      <button className="text-blue-400 hover:bg-opacity-50 uppercase hover:bg-bluegray-400 hover:text-white px-1.5 py-0.5 rounded duration-200">
        Contact us
      </button>
    </Link>
  </div>
)

const DarkMode = () => (
  <div className="hidden md:block md:ml-6">
    <div className="flex space-x-2 mr-2">
      <span key="nav-dark-mode" className="px-2 pt-0.5 rounded h-auto divide-x-2 divide-red-400">
        <DarkModeSwitch />
      </span>
    </div>
  </div>
)

const MobileView = () => (
  <Disclosure.Panel className="md:hidden">
    <div className="flex flex-col px-0 pb-3 mr-4 space-y-1 md:block md:px-2">
      <span key="nav-dark-mode" className="rounded text-lg font-medium h-auto mb-4">
        <DarkModeSwitch />
      </span>
      <span className="rounded text-lg font-medium h-auto mb-4">
        <Link to={`/about`}>
          <button className="hover:bg-opacity-50 hover:bg-bluegray-400 hover:text-white px-1.5 py-0.5 rounded duration-200">
            About
          </button>
        </Link>
      </span>
      <span className="rounded text-lg font-medium h-auto mb-4">
        <Link to={`/faq`}>
          <button className="hover:bg-opacity-50 hover:bg-bluegray-400 hover:text-white px-1.5 py-0.5 rounded duration-200">
            FAQ
          </button>
        </Link>
      </span>
      <span className="rounded text-lg font-medium h-auto mb-4">
        <Link to={`/contact`}>
          <button className="hover:bg-opacity-50 hover:bg-bluegray-400 hover:text-white px-1.5 py-0.5 rounded duration-200">
            Contact us
          </button>
        </Link>
      </span>
    </div>
  </Disclosure.Panel>
)
