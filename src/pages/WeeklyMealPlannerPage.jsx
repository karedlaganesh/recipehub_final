import { useApp } from '../context/AppContext.jsx';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const meals = ['Breakfast', 'Lunch', 'Dinner'];

export default function WeeklyMealPlannerPage() {
  const { recipes, session, weeklyPlans, setWeeklyPlanRecipe, notify } = useApp();
  const plan = weeklyPlans[session.account.id] || {};

  function update(day, meal, recipeId) {
    if (setWeeklyPlanRecipe(day, meal, recipeId)) notify('Meal plan updated.');
  }

  return (
    <section className="container dashboard-section">
      <div className="section-page-header"><div><span className="section-tag">Plan Ahead</span><h1 className="section-title">Weekly Meal Planner</h1><p className="section-subtitle">Choose recipes for each meal; your plan is saved in this browser.</p></div></div>
      <div className="meal-planner-grid">
        {days.map((day) => (
          <article className="meal-plan-day" key={day}>
            <h2>{day}</h2>
            {meals.map((meal) => (
              <div className="form-group" key={meal}>
                <label htmlFor={`plan-${day}-${meal}`}>{meal}</label>
                <select id={`plan-${day}-${meal}`} className="form-select" value={plan[`${day}:${meal}`] || ''} onChange={(event) => update(day, meal, event.target.value)}>
                  <option value="">No recipe planned</option>
                  {recipes.map((recipe) => <option value={recipe.id} key={recipe.id}>{recipe.name}</option>)}
                </select>
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
