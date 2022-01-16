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
      className="
      bg-gradient-to-bl from-slate-600 via-slate-600 to-slate-600
      dark:bg-gradient-to-bl dark:from-slate-700 dark:via-slate-700 dark:to-slate-700
      text-slate-700 dark:bg-slate-600 dark:text-white space-x-4 shadow-md"
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
    <Disclosure.Button className="transition duration-200 ease inline-flex items-center justify-center p-1 ml-3 mt-3 rounded text-slate-500 hover:text-white hover:bg-slate-400 focus:outline-none focus:ring focus:ring-inset focus:ring-white">
      <span className="sr-only">Open main menu</span>
      {open ? (
        <XIcon className="block h-6 w-6 transition duration-200 ease" aria-hidden="true" />
      ) : (
        <MenuIcon className="block h-6 w-6 transition duration-200 ease" aria-hidden="true" />
      )}
    </Disclosure.Button>
  </div>
)

const Home = () => (
  <div
    className="text-slate-600 dark:text-white hover:opacity-80 duration-200
    relative hidden md:inline-flex h-auto py-0.5 ml-4 md:mx-2 space-x-12"
  >
    <Link to={`/`}>
      <span className="absolute -top-2 -left-2">
        <Logo />
      </span>
    </Link>
  </div>
)

const Navigation = () => {
  const links = ['about', 'faq', 'contact']
  return (
    <div className="hidden md:inline-flex md:space-x-6">
      {links.map((location, index) => (
        <Link to={`/${location}`} key={`location-${index}`}>
          <button
            type="button"
            className="text-sky-50 dark:text-white hover:bg-slate-400/50 hover:text-white
            font-medium tracking-wider uppercase px-1.5 py-0.5 rounded duration-200"
          >
            {location}
          </button>
        </Link>
      ))}
    </div>
  )
}

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
          <button className="hover:bg-opacity-50 hover:bg-slate-400 hover:text-white px-1.5 py-0.5 rounded duration-200">
            About
          </button>
        </Link>
      </span>
      <span className="rounded text-lg font-medium h-auto mb-4">
        <Link to={`/faq`}>
          <button className="hover:bg-opacity-50 hover:bg-slate-400 hover:text-white px-1.5 py-0.5 rounded duration-200">
            FAQ
          </button>
        </Link>
      </span>
      <span className="rounded text-lg font-medium h-auto mb-4">
        <Link to={`/contact`}>
          <button className="hover:bg-opacity-50 hover:bg-slate-400 hover:text-white px-1.5 py-0.5 rounded duration-200">
            Contact us
          </button>
        </Link>
      </span>
    </div>
  </Disclosure.Panel>
)

const Logo = (props) => {
  return (
    <svg
      fill="#fff"
      viewBox="0 0 450 176"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className="text-white flex w-32 h-12 z-50 overflow-visible"
      {...props}
    >
      <path d="m149.359 17.908 15.039 85.287-81.38-29.62 66.341-55.667Z" fill="#E9D5FF" fillOpacity={0.75} />
      <path d="M98.056 158.862 83.018 73.576l81.38 29.619-66.342 55.667Z" fill="#E9D5FF" fillOpacity={0.75} />
      <path d="m98 9 43.301 75H54.699L98 9ZM98 159 54.699 84H141.3L98 159Z" fill="#99F6E4" fillOpacity={0.75} />
      <path d="m47.056 17.908 66.342 55.668-81.38 29.619 15.038-85.287Z" fill="#BFDBFE" fillOpacity={0.75} />
      <path d="m98.36 158.862-66.342-55.667 81.38-29.62-15.039 85.287Z" fill="#BFDBFE" fillOpacity={0.75} />
      <path
        d="M194.35 56.9V73H190V38h4.35v15.2h10.3V38H209v35h-4.35V56.9h-10.3ZM234.852 38v3.65h-12.35V53.1h11.1v3.65h-11.1v12.6h12.35V73h-16.7V38h16.7Zm13.802 26.15-1.95 8.85h-4.45l8.45-35h5.75l8.3 35h-4.45l-1.9-8.85h-9.75Zm8.95-3.75-4.1-19.1-4.05 19.1h8.15ZM277.106 38v31.2h11.15V73h-15.5V38h4.35Zm28.202 35V41.8h-7.95V38h20.25v3.8h-7.95V73h-4.35Zm24.052-16.1V73h-4.35V38h4.35v15.2h10.3V38h4.35v35h-4.35V56.9h-10.3ZM200.45 129c-2.9 0-5.133-.7-6.7-2.1-1.533-1.433-2.3-3.567-2.3-6.4v-18c0-2.833.767-4.95 2.3-6.35 1.567-1.433 3.8-2.15 6.7-2.15h7.1v3.8h-7.6c-1.233 0-2.233.367-3 1.1-.767.733-1.15 1.617-1.15 2.65v19.9c0 1.033.383 1.917 1.15 2.65.767.733 1.767 1.1 3 1.1h7.6v3.8h-7.1Zm20.902-16.1V129h-4.35V94h4.35v15.2h10.3V94h4.35v35h-4.35v-16.1h-10.3ZM261.854 94v3.65h-12.35v11.45h11.1v3.65h-11.1v12.6h12.35V129h-16.7V94h16.7Zm19.602 35c-2.9 0-5.133-.7-6.7-2.1-1.533-1.433-2.3-3.567-2.3-6.4v-18c0-2.833.767-4.95 2.3-6.35 1.567-1.433 3.8-2.15 6.7-2.15h7.1v3.8h-7.6c-1.233 0-2.233.367-3 1.1-.767.733-1.15 1.617-1.15 2.65v19.9c0 1.033.383 1.917 1.15 2.65.767.733 1.767 1.1 3 1.1h7.6v3.8h-7.1Zm20.952-12.9V129h-4.35V94h4.35v15.1l9.5-15.1h4.75l-9.65 15.45 10.25 19.55h-5l-7.95-15.75-1.9 2.85ZM342.86 94v3.65h-12.35v11.45h11.1v3.65h-11.1v12.6h12.35V129h-16.7V94h16.7Zm13.002 20.5V129h-4.35V94h9.4c2.833 0 4.966.633 6.4 1.9 1.466 1.233 2.2 3.2 2.2 5.9v4.8c0 3.767-1.5 6.117-4.5 7.05l6.95 15.35h-4.75l-6.45-14.5h-4.9Zm9.3-13.15c0-1.267-.3-2.183-.9-2.75-.567-.567-1.484-.85-2.75-.85h-5.65v13h5.65c1.266 0 2.183-.283 2.75-.85.6-.6.9-1.533.9-2.8v-5.75Z"
        fill="#fff"
      />
    </svg>
  )
}
