const cuisines = ['Indian', 'Italian', 'Chinese', 'Mexican', 'American', 'Mediterranean'];
const meals = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks'];
const diets = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Non-Vegetarian'];
const difficulties = ['Easy', 'Medium', 'Hard'];

export default function RecipeEditorForm({ onSubmit, admin = false, initialRecipe = null, submitLabel }) {
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit({
      name: data.get('name').trim(),
      description: data.get('description').trim(),
      cuisine: data.get('cuisine'),
      mealType: data.get('mealType'),
      dietaryPreference: data.get('dietaryPreference'),
      difficulty: data.get('difficulty'),
      prepTime: Number(data.get('prepTime')),
      cookTime: Number(data.get('cookTime')),
      servings: Number(data.get('servings')),
      image: data.get('image').trim(),
      ingredients: data.get('ingredients').split('\n').map((item) => item.trim()).filter(Boolean),
      instructions: data.get('instructions').split('\n').map((item) => item.trim()).filter(Boolean),
      rating: 0,
      ratingsCount: 0,
    });
    event.currentTarget.reset();
  }

  return (
    <form className="recipe-editor-form" onSubmit={submit}>
      <div className="form-group"><label htmlFor="recipe-name">Recipe Name *</label><input id="recipe-name" className="form-control" name="name" defaultValue={initialRecipe?.name || ''} required /></div>
      <div className="form-group"><label htmlFor="recipe-description">Description *</label><textarea id="recipe-description" className="form-control" name="description" rows="2" defaultValue={initialRecipe?.description || ''} required /></div>
      <div className="form-row-2">
        <SelectField id="recipe-cuisine" name="cuisine" label="Cuisine" options={cuisines} value={initialRecipe?.cuisine} />
        <SelectField id="recipe-meal" name="mealType" label="Meal Type" options={meals} value={initialRecipe?.mealType} />
      </div>
      <div className="form-row-2">
        <SelectField id="recipe-diet" name="dietaryPreference" label="Dietary Preference" options={diets} value={initialRecipe?.dietaryPreference} />
        <SelectField id="recipe-difficulty" name="difficulty" label="Difficulty" options={difficulties} value={initialRecipe?.difficulty} />
      </div>
      <div className="form-row-3">
        <NumberField id="recipe-prep" name="prepTime" label="Preparation Time (mins)" min="1" defaultValue={initialRecipe?.prepTime || 15} />
        <NumberField id="recipe-cook" name="cookTime" label="Cooking Time (mins)" min="0" defaultValue={initialRecipe?.cookTime || 20} />
        <NumberField id="recipe-servings" name="servings" label="Servings" min="1" defaultValue={initialRecipe?.servings || 4} />
      </div>
      <div className="form-group"><label htmlFor="recipe-image">Image URL *</label><input id="recipe-image" className="form-control" name="image" type="url" defaultValue={initialRecipe?.image || ''} required placeholder="https://..." /></div>
      <div className="form-group"><label htmlFor="recipe-ingredients">Ingredients (one per line) *</label><textarea id="recipe-ingredients" className="form-control" name="ingredients" rows="5" defaultValue={initialRecipe?.ingredients?.join('\n') || ''} required /></div>
      <div className="form-group"><label htmlFor="recipe-instructions">Cooking Instructions (one per line) *</label><textarea id="recipe-instructions" className="form-control" name="instructions" rows="6" defaultValue={initialRecipe?.instructions?.join('\n') || ''} required /></div>
      <button className={`btn ${admin ? 'btn-primary-green' : 'btn-primary-orange'} btn-lg`} type="submit">{submitLabel || (admin ? 'Add Recipe' : 'Submit Recipe')}</button>
    </form>
  );
}

function SelectField({ id, name, label, options, value }) {
  const initial = value || (name === 'cuisine' ? 'Indian' : name === 'mealType' ? 'Dinner' : name === 'dietaryPreference' ? 'Vegetarian' : 'Medium');
  return <div className="form-group"><label htmlFor={id}>{label} *</label><select className="form-select" id={id} name={name} defaultValue={initial} required>{options.map((option) => <option key={option}>{option}</option>)}</select></div>;
}

function NumberField({ id, name, label, min, defaultValue }) {
  return <div className="form-group"><label htmlFor={id}>{label} *</label><input className="form-control" id={id} name={name} type="number" min={min} defaultValue={defaultValue} required /></div>;
}
