import { useState } from 'react'
import PersonalSection from './components/PersonalSection.jsx'
import EducationSection from './components/EducationSection.jsx'
import ExperienceSection from './components/ExperienceSection.jsx'
import CVPreview from './components/CVPreview.jsx'
import './styles/App.css'

const TABS = ['Personal', 'Education', 'Experience', 'Preview']

function App() {
  const [activeTab, setActiveTab] = useState('Personal')

  const [personal, setPersonal] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const [education, setEducation] = useState([])
  const [experience, setExperience] = useState([])

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="app-header-inner">
          <span className="app-logo">CV Builder</span>
          <span className="app-tagline">Build your résumé in minutes</span>
        </div>
      </header>

      <main className="app-main">
        <nav className="tab-nav" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="tab-content">
          {activeTab === 'Personal' && (
            <PersonalSection personal={personal} setPersonal={setPersonal} />
          )}
          {activeTab === 'Education' && (
            <EducationSection education={education} setEducation={setEducation} />
          )}
          {activeTab === 'Experience' && (
            <ExperienceSection experience={experience} setExperience={setExperience} />
          )}
          {activeTab === 'Preview' && (
            <CVPreview
              personal={personal}
              education={education}
              experience={experience}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
