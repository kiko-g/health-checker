import Header from "../components/Header"

export default function About() {
  return (
    <div className="homepage min-h-screen bg-coolgray-300 dark:bg-bluegray-700 font-inter">
      <Header siteTitle="Health Checker" />
      <div className="min-h-adjusted mx-auto p-4">
        <h1>About page content</h1>
      </div>
    </div>
  )
}
