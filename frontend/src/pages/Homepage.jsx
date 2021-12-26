import * as React from 'react'
import Hero from '../components/Hero'
import Search from '../components/Search'
import Layout from '../layout/Layout'

export default function Homepage() {
  return (
    <Layout isHome={true}>
      <Hero classnames="px-16 py-12" />
      <Search classnames="px-16 py-12" />
    </Layout>
  )
}
