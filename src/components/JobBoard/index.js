import React from 'react'

const JobBoard = ({ job, handleTagClick }) => {
  const { logo, company, position, postedAt, contract, location, languages, tools, role, level, isNew, featured } = job

  const tags = [role, level, ...languages, ...tools]

  const tagsElement = tags ? tags.map((tag) => <span onClick={() => handleTagClick(tag)} className="text-teal-500 bg-teal-100 font-bold mr-4 mb-4 p-2 rounded cursor-pointer lg:mb-0 hover:text-white hover:bg-teal-500">{tag}</span>) : ''

  const newJob = isNew && (
    <span className="bg-teal-500 text-teal-100 font-bold m-2 py-1 px-2 rounded-full uppercase text-sm">New</span>
  )

  const featuredJob = featured && (
    <span className="bg-gray-800 text-teal-100 font-bold py-1 px-2 rounded-full uppercase text-sm">Featured</span>
  )

  return (
    <div className={`flex flex-col bg-white shadow-md my-16 mx-10 p-6 rounded ${featured && 'border-l-4 border-teal-500 border-solid'} lg:flex-row`}>
      <div>
        <img className="-mt-16 mb-4 w-20 h-20 lg:my-0 lg:h-24 lg:w-24" src={logo} alt={company} />
      </div>
      <div className="flex flex-col justify-between ml-4">
        <h3 className="font-bold text-teal-500">
          {company}
          {newJob}
          {featuredJob}
        </h3>
        <h2 className="font-bold text-xl my-2">{position}</h2>
        <p className="text-gray-700">
          {postedAt} - {contract} - {location}
        </p>
      </div>
      <div className="flex flex-wrap items-center mt-4 mx-4 pt-4 border-t border-gray-500 border-solid lg:ml-auto lg:border-0 lg:pt-0 lg:mt-0">
        {tagsElement}
      </div>
    </div>
  )
}

export default JobBoard