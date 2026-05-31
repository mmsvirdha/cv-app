import { useState } from 'react'
import '../styles/Section.css'

const EMPTY_ENTRY = { school: '', study: '', degree: '', from: '', to: '' }

function EducationForm({ initial, onSave, onCancel, title }) {
  const [draft, setDraft] = useState({ ...initial })
  const [errors, setErrors] = useState({})

  function handleChange(field, value) {
    setDraft(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  function handleSave() {
    const e = {}
    if (!draft.school.trim()) e.school = 'School name is required.'
    if (!draft.study.trim()) e.study = 'Field of study is required.'
    if (Object.keys(e).length > 0) { setErrors(e); return }
    onSave(draft)
  }

  return (
    <div className="inline-form">
      <h3 className="inline-form-title">{title}</h3>

      <div className="form-field">
        <label className="field-label" htmlFor="e-school">School / University *</label>
        <input
          id="e-school"
          type="text"
          value={draft.school}
          onChange={e => handleChange('school', e.target.value)}
          placeholder="University of Example"
        />
        {errors.school && <span className="field-error">{errors.school}</span>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label className="field-label" htmlFor="e-study">Field of study *</label>
          <input
            id="e-study"
            type="text"
            value={draft.study}
            onChange={e => handleChange('study', e.target.value)}
            placeholder="Computer Science"
          />
          {errors.study && <span className="field-error">{errors.study}</span>}
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="e-degree">Degree / Title</label>
          <input
            id="e-degree"
            type="text"
            value={draft.degree}
            onChange={e => handleChange('degree', e.target.value)}
            placeholder="B.Sc."
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label className="field-label" htmlFor="e-from">Start date</label>
          <input
            id="e-from"
            type="text"
            value={draft.from}
            onChange={e => handleChange('from', e.target.value)}
            placeholder="Sep 2018"
          />
        </div>
        <div className="form-field">
          <label className="field-label" htmlFor="e-to">End date</label>
          <input
            id="e-to"
            type="text"
            value={draft.to}
            onChange={e => handleChange('to', e.target.value)}
            placeholder="Jun 2022"
          />
        </div>
      </div>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>Save entry</button>
      </div>
    </div>
  )
}

function EducationSection({ education, setEducation }) {
  const [showForm, setShowForm] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  function handleAdd(entry) {
    setEducation(prev => [...prev, entry])
    setShowForm(false)
  }

  function handleEdit(entry) {
    setEducation(prev => prev.map((e, i) => i === editIndex ? entry : e))
    setEditIndex(null)
  }

  function handleDelete(index) {
    setEducation(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="section-card">
      <h2 className="section-title">Education</h2>
      <p className="section-desc">Add your academic qualifications.</p>

      {education.length === 0 && !showForm && editIndex === null && (
        <div className="empty-list">No education entries yet. Add one below.</div>
      )}

      <div className="entry-list">
        {education.map((entry, i) => (
          editIndex === i ? (
            <EducationForm
              key={i}
              title="Edit education"
              initial={entry}
              onSave={handleEdit}
              onCancel={() => setEditIndex(null)}
            />
          ) : (
            <div key={i} className="entry-item">
              <div className="entry-main">
                <div className="entry-title">
                  {entry.degree ? `${entry.degree} · ` : ''}{entry.study}
                </div>
                <div className="entry-sub">{entry.school}</div>
                {(entry.from || entry.to) && (
                  <div className="entry-date">
                    {entry.from}{entry.from && entry.to ? ' – ' : ''}{entry.to}
                  </div>
                )}
              </div>
              <div className="entry-actions">
                <button
                  className="btn btn-sm"
                  onClick={() => { setEditIndex(i); setShowForm(false) }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(i)}
                >
                  Remove
                </button>
              </div>
            </div>
          )
        ))}
      </div>

      {showForm && (
        <EducationForm
          title="Add education"
          initial={EMPTY_ENTRY}
          onSave={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {!showForm && editIndex === null && (
        <button
          className="btn-add-entry"
          onClick={() => setShowForm(true)}
        >
          + Add education
        </button>
      )}
    </div>
  )
}

export default EducationSection
