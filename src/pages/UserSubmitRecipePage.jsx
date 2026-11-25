import { useNavigate } from 'react-router-dom';
import RecipeEditorForm from '../components/RecipeEditorForm.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function UserSubmitRecipePage() {
  const { submitRecipe, notify } = useApp();
  const navigate = useNavigate();

  function submit(recipe) {
    if (submitRecipe(recipe)) {
      notify('Your recipe was submitted for admin review.');
      navigate('/user/dashboard');
    } else {
      notify('Unable to submit your recipe. Please sign in again.');
    }
  }

  return <section className="container form-max-container submit-section"><div className="form-page-card"><div className="form-page-header"><span className="section-tag">Community Kitchen</span><h1 className="form-page-title">Submit Recipe</h1><p className="form-page-subtitle">Share your culinary creation. Admins review submissions before they appear in the catalog.</p></div><RecipeEditorForm onSubmit={submit} /></div></section>;
}
