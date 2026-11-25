import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import SiteLayout from './components/SiteLayout.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminRecipesPage from './pages/AdminRecipesPage.jsx';
import AdminRecipePreviewPage from './pages/AdminRecipePreviewPage.jsx';
import AdminSubmissionsPage from './pages/AdminSubmissionsPage.jsx';
import AdminRatingsPage from './pages/AdminRatingsPage.jsx';
import AdminUsersPage from './pages/AdminUsersPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RecipeDetailPage from './pages/RecipeDetailPage.jsx';
import RecipesPage from './pages/RecipesPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import SavedRecipesPage from './pages/SavedRecipesPage.jsx';
import UserCollectionsPage from './pages/UserCollectionsPage.jsx';
import UserDashboardPage from './pages/UserDashboardPage.jsx';
import UserSubmitRecipePage from './pages/UserSubmitRecipePage.jsx';
import ShoppingListPage from './pages/ShoppingListPage.jsx';
import WeeklyMealPlannerPage from './pages/WeeklyMealPlannerPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function LegacyHashRedirect() {
  const location = useLocation();
  const hashRoutes = {
    home: '/',
    recipes: '/recipes',
    'user-login': '/login',
    'admin-login': '/admin/login',
    'user-dashboard': '/user/dashboard',
    'saved-recipes': '/user/saved',
    collections: '/user/collections',
    'submit-recipe': '/user/submit',
    'admin-dashboard': '/admin',
    'admin-manage-recipes': '/admin/recipes',
    'admin-add-recipe': '/admin/recipes/new',
    'admin-submissions': '/admin/submissions',
    'admin-ratings': '/admin/ratings',
  };
  const hash = location.hash.slice(1);
  if (hash.startsWith('recipe/')) {
    return <Navigate to={`/recipe/${encodeURIComponent(hash.slice(7))}`} replace />;
  }
  if (hashRoutes[hash]) return <Navigate to={hashRoutes[hash]} replace />;
  if (['about', 'features', 'contact', 'modules-section'].includes(hash) && location.pathname === '/') {
    window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 0);
  }
  return null;
}

function AppRoutes() {
  return (
    <>
      <LegacyHashRedirect />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="recipes" element={<RecipesPage />} />
          <Route path="recipe/:recipeId" element={<ProtectedRoute role="user"><RecipeDetailPage /></ProtectedRoute>} />
          <Route path="login" element={<LoginPage />} />
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="user" element={<ProtectedRoute role="user" />}>
            <Route path="dashboard" element={<UserDashboardPage />} />
            <Route path="saved" element={<SavedRecipesPage />} />
            <Route path="collections" element={<UserCollectionsPage />} />
            <Route path="shopping-list" element={<ShoppingListPage />} />
            <Route path="meal-plan" element={<WeeklyMealPlannerPage />} />
            <Route path="submit" element={<UserSubmitRecipePage />} />
          </Route>
          <Route path="admin" element={<ProtectedRoute role="admin" />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="recipes" element={<AdminRecipesPage />} />
            <Route path="recipes/:recipeId" element={<AdminRecipePreviewPage />} />
            <Route path="recipes/new" element={<AdminRecipesPage create />} />
            <Route path="submissions" element={<AdminSubmissionsPage />} />
            <Route path="ratings" element={<AdminRatingsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
