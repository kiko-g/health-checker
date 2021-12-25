import React from 'react'
import Header from '../components/Header'
import DarkModeSwitch from '../components/utilities/DarkModeSwitch'

const HomeLayout = ({ content }) => (
  <div className="min-h-screen bg-gradient-to-br from-bluegray-100 via-bluegray-200 to-bluegray-300 dark:bg-bluegray-700 font-inter">
    <span className="absolute inset-y-0 top-4 left-4">
      <DarkModeSwitch />
    </span>
    <div className="min-h-screen grid grid-cols-1 2xl:grid-cols-2 mx-auto">{content}</div>
  </div>
)

const PageLayout = ({ content }) => (
  <div className="min-h-screen bg-gradient-to-br from-bluegray-100 via-bluegray-200 to-bluegray-300 dark:bg-bluegray-700 font-inter">
    <Header siteTitle="Health Checker" />
    <div className="min-h-adjusted p-4 dark:bg-bluegray-500 dark:text-white">{content}</div>
  </div>
)

export default function Layout(props) {
  const isHome = props.isHome || false
  return isHome ? <HomeLayout content={props.children} /> : <PageLayout content={props.children} />
}
