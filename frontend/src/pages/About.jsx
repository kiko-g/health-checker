import { Link } from 'react-router-dom'
import Layout from '../layout/Layout'

export default function About() {
  return (
    <Layout>
      <ul className="text-xl list-disc text-gray-700 dark:text-white space-y-2 px-8 py-4 font-normal">
        <li>
          Health is an{' '}
          <span className="font-bold underline decoration-2 decoration-blue-500/50">increasing concern</span> in modern
          society
        </li>
        <li>
          People are more focused on their{' '}
          <span className="font-bold underline decoration-2 decoration-teal-500/50">well being</span> than ever
        </li>
        <li>
          Information about diseases is very{' '}
          <span className="font-bold underline decoration-2 decoration-purple-500/50">widely spread</span> and often
          split into niches.
        </li>
        <li className="list-inside">
          It either is{' '}
          <span className="font-bold underline decoration-2 decoration-rose-500/50">too technically detailed</span> or
          simply <span className="font-bold underline decoration-2 decoration-rose-500/50">too generalist</span> and
          doesn't provide a useful insight for the users.
        </li>
      </ul>
      <div className="text-xl list-disc text-gray-700 dark:text-white space-y-2 px-4 py-4 font-normal mt-8">
        <p>
          With that being said our{' '}
          <Link
            to={`/about`}
            className="text-slate-400 dark:text-teal-200 duration-150 hover:text-slate-400/80 hover:underline dark:hover:text-teal-200/80 dark:hover:underline"
          >
            team
          </Link>{' '}
          created Health Checker in the context of a{' '}
          <a
            href="https://sigarra.up.pt/feup/en/UCURR_GERAL.FICHA_UC_VIEW?pv_ocorrencia_id=486299"
            className="text-slate-400 dark:text-teal-200 duration-150 hover:text-slate-400/80 hover:underline dark:hover:text-teal-200/80 dark:hover:underline"
          >
            Semantic Web and Linked Data
          </a>{' '}
          course taught at FEUP,{' '}
          <a
            href="https://sigarra.up.pt/feup/pt/CUR_GERAL.CUR_PLANOS_ESTUDOS_VIEW?pv_plano_id=31204&pv_ano_lectivo=2021"
            className="text-slate-400 dark:text-teal-200 duration-150 hover:text-slate-400/80 hover:underline dark:hover:text-teal-200/80 dark:hover:underline"
          >
            MEIC
          </a>
          , a web platform to consult accurate medically approved information and aims to save research time and help
          you expand your knowledge!
        </p>
      </div>
    </Layout>
  )
}
