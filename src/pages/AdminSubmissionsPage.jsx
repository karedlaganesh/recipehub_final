import { Fragment, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function AdminSubmissionsPage() {
  const { submissions, reviewSubmission, notify } = useApp();
  const [viewingId, setViewingId] = useState(null);

  return (
    <section className="container admin-section">
      <div className="section-page-header">
        <div>
          <span className="section-tag">Community Submissions</span>
          <h1 className="section-title">User Submissions</h1>
          <p className="section-subtitle">Review submitted recipes before approving them for the catalog.</p>
        </div>
      </div>
      <div className="table-responsive-wrapper">
        <table className="data-table">
          <thead>
            <tr><th>Recipe Name</th><th>Submitted By</th><th>Date</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {submissions.map((submission) => {
              const isViewing = viewingId === submission.id;
              return (
                <Fragment key={submission.id}>
                  <tr>
                    <td>{submission.name}</td>
                    <td>{submission.submittedBy}</td>
                    <td>{submission.submittedAt}</td>
                    <td>{submission.status}</td>
                    <td className="submission-actions">
                      <button
                        className="btn btn-outline-dark btn-sm"
                        type="button"
                        aria-expanded={isViewing}
                        onClick={() => setViewingId(isViewing ? null : submission.id)}
                      >
                        {isViewing ? 'Hide Recipe' : 'View Recipe'}
                      </button>
                      {submission.status === 'pending' && (
                        <>
                          <button className="btn btn-primary-green btn-sm" onClick={() => { if (reviewSubmission(submission.id, 'approved')) notify('Submission approved and published.'); }}>Approve</button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => { if (reviewSubmission(submission.id, 'rejected')) notify('Submission rejected.'); }}>Reject</button>
                        </>
                      )}
                    </td>
                  </tr>
                  {isViewing && (
                    <tr key={`${submission.id}-details`}>
                      <td className="submission-details-cell" colSpan={5}>
                        <article className="submission-recipe-details">
                          {submission.image && <img src={submission.image} alt={submission.name} onError={(event) => { event.currentTarget.hidden = true; }} />}
                          <div className="submission-recipe-overview">
                            <h2>{submission.name}</h2>
                            <p>{submission.description || 'No description provided.'}</p>
                            <div className="submission-recipe-facts">
                              {[['Cuisine', submission.cuisine], ['Meal', submission.mealType], ['Diet', submission.dietaryPreference], ['Difficulty', submission.difficulty], ['Prep time', submission.prepTime != null ? `${submission.prepTime} min` : ''], ['Cook time', submission.cookTime != null ? `${submission.cookTime} min` : ''], ['Servings', submission.servings]].filter(([, value]) => value !== '' && value != null).map(([label, value]) => <span key={label}><strong>{label}:</strong> {value}</span>)}
                            </div>
                          </div>
                          <div className="submission-recipe-lists">
                            <section>
                              <h3>Ingredients</h3>
                              {submission.ingredients?.length ? <ul>{submission.ingredients.map((ingredient, index) => <li key={`${ingredient}-${index}`}>{ingredient}</li>)}</ul> : <p>No ingredients provided.</p>}
                            </section>
                            <section>
                              <h3>Instructions</h3>
                              {submission.instructions?.length ? <ol>{submission.instructions.map((instruction, index) => <li key={`${index}-${typeof instruction === 'string' ? instruction : instruction.text || instruction.description || ''}`}>{typeof instruction === 'string' ? instruction : instruction.text || instruction.description || ''}</li>)}</ol> : <p>No instructions provided.</p>}
                            </section>
                          </div>
                        </article>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      {!submissions.length && <div className="empty-state-box">No recipe submissions yet.</div>}
    </section>
  );
}
