import { useState, useEffect } from "react"
import data from './API/data.json'
import JobBoard from "./components/JobBoard"
import './App.scss';

function App() {
  const [jobs, setJobs] = useState([])
  const [filters, setFilters] = useState([])

  useEffect(() => setJobs(data), [])

  const filterByTags = (job) => {
    const { role, level, tools, languages } = job
    const tags = [role, level]

    if (filters.length === 0) {
      return true
    }

    if (tools) {
      tags.push(...tools)
    }

    if (languages) {
      tags.push(...languages)
    }

    return tags.some(tag => filters.includes(tag))
  }

  const handleTagClick = (tag) => {
    // avoid reading the tag
    if (filters.includes(tag)) return
    setFilters([...filters, tag])
  }
  const handleFilterClick = (filter) => {
    setFilters(filters.filter(f => f !== filter))
  }
  const clearFilters = () => {
    setFilters([])
  }

  const filteresJobs = jobs.filter(filterByTags)

  const getJobElement = jobs.length === 0 ?
  ( <p>Jobs are fethcing...</p> ) :
  ( filteresJobs.map((job) => <JobBoard job={job} key={job.id} handleTagClick={handleTagClick} />) )

  const filtersElement = filters.length > 0 && filters.map(filter => (
    <span className="mr-4 mb-4 lg:mb-0">
      <span className="text-teal-500 bg-teal-100 font-bold p-2 rounded-r-none rounded-l">{filter}</span>
      <span onClick={() => handleFilterClick(filter)} className="text-white bg-teal-500 text-tral-100 p-2 rounded-l-none rounded-r cursor-pointer hover:bg-gray-800">X</span>
    </span>
  ))

  return (
    <div className="App bg-blue-100 h-full">
      <header className="bg-teal-500 mb-12">
        <img src="/images/bg-header-desktop.svg" alt="bg-img" className="w-full desktop" />
        <img src="/images/bg-header-mobile.svg" alt="bg-img" className="w-full mobile" />
      </header>
      {filters.length > 0 && 
        <div className="container px-10 mx-auto lg:px-0 relative w-full">
          <div className="job-filter flex flex-col bg-white shadow-md mb-16 mx-10 p-6 rounded md:flex-row">
            <div className="flex flex-wrap">
              {filtersElement}
            </div>
            <button onClick={clearFilters} className="font-bold text-teal-500 ml-auto hover:underline">Clear</button>
          </div>
        </div>
      }
      <section className={`container px-10 mx-auto lg:px-0 ${filters.length > 0 ? 'mt-10' : null}`}>
        {getJobElement}
      </section>
    </div>
  );
}

export default App;
