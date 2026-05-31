import '../styles/CVPreview.css'

function CVPreview({ personal, education, experience }) {
  const hasPersonal = personal.name || personal.email || personal.phone
  const hasContent = hasPersonal || education.length > 0 || experience.length > 0

  if (!hasContent) {
    return (
      <div className="preview-empty">
        <div className="preview-empty-icon">📄</div>
        <p>Fill in your details on the other tabs to see your CV preview here.</p>
      </div>
    )
  }

  return (
    <div className="cv-paper">
      {/* Personal header */}
      {hasPersonal && (
        <header className="cv-header">
          {personal.name && <h1 className="cv-name">{personal.name}</h1>}
          <div className="cv-contact">
            {personal.email && (
              <span className="cv-contact-item">{personal.email}</span>
            )}
            {personal.phone && (
              <span className="cv-contact-item">{personal.phone}</span>
            )}
          </div>
        </header>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="cv-section">
          <h2 className="cv-section-heading">Education</h2>
          <div className="cv-entries">
            {education.map((entry, i) => (
              <div key={i} className="cv-entry">
                <div className="cv-entry-row">
                  <div>
                    <div className="cv-entry-title">{entry.school}</div>
                    <div className="cv-entry-sub">
                      {[entry.degree, entry.study].filter(Boolean).join(', ')}
                    </div>
                  </div>
                  {(entry.from || entry.to) && (
                    <div className="cv-entry-date">
                      {entry.from}{entry.from && entry.to ? ' – ' : ''}{entry.to}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="cv-section">
          <h2 className="cv-section-heading">Work Experience</h2>
          <div className="cv-entries">
            {experience.map((entry, i) => (
              <div key={i} className="cv-entry">
                <div className="cv-entry-row">
                  <div>
                    <div className="cv-entry-title">{entry.title}</div>
                    <div className="cv-entry-sub">{entry.company}</div>
                  </div>
                  {(entry.from || entry.to) && (
                    <div className="cv-entry-date">
                      {entry.from}{entry.from && entry.to ? ' – ' : ''}{entry.to}
                    </div>
                  )}
                </div>
                {entry.responsibilities && (
                  <p className="cv-entry-desc">{entry.responsibilities}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default CVPreview
