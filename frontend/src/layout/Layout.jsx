import React from 'react'
import Header from './Header'
import Footer from './Footer'
import DarkModeSwitch from './DarkModeSwitch'

export default function Layout(props) {
  const isHome = props.isHome || false
  return isHome ? <HomeLayout content={props.children} /> : <PageLayout content={props.children} />
}

const HomeLayout = ({ content }) => (
  <div className="min-h-screen bg-bluegray-50 dark:bg-bluegray-700 font-inter font-medium">
    <span className="absolute inset-y-0 top-4 left-4">
      <DarkModeSwitch />
    </span>
    <div className="min-h-screen grid grid-cols-1 2xl:grid-cols-2 mx-auto">{content}</div>
  </div>
)

const PageLayout = ({ content }) => (
  <div className="min-h-screen bg-bluegray-50 dark:bg-bluegray-700 dark:text-white font-inter font-medium">
    <Header siteTitle="Health Checker" />
    <div className="min-h-adjusted w-4/5 pt-5 mx-auto">{content}</div>
    <Footer />
  </div>
)
