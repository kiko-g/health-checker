import { useParams } from "react-router-dom"

export default function Results(props) {
  let {query} = useParams()
  console.log(query)
  return (
    <div>
      <span>Results Page</span>
    </div>
  )
}
