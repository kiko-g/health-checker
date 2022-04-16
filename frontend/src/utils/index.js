const query = 'heart'
const doid = '5504'

export const requests = {
  dbpedia: '/dbpedia',
  bioportal: '/bioportal',
  bioportalSearch: `/bioportal/search/${query}`,
  bioportalClass: `/bioportal/getClass/${doid}`,
  bioportalSynonym: `/bioportal/getSynonyms/${doid}`,
  bioportalSubclass: `/bioportal/getSubClasses/${doid}`,
  dbpediaAbstract: `/dbpedia/getAbstract/${query}`,
}

