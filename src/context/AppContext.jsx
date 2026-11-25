import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { initialRecipes } from '../data/recipes.js';

const STORAGE = {
  recipes: 'recipehub_recipes',
  users: 'recipehub_users',
  admins: 'recipehub_admins',
  user: 'recipehub_current_user',
  admin: 'recipehub_current_admin',
  saved: 'recipehub_saved_recipes',
  ratings: 'recipehub_ratings',
  collections: 'recipehub_collections',
  submissions: 'recipehub_submissions',
  reviews: 'recipehub_reviews',
  shoppingLists: 'recipehub_shopping_lists',
  weeklyPlans: 'recipehub_weekly_plans',
};

const defaultUser = {
  id: 'usr-1',
  name: 'Alex Morgan',
  email: 'alex@recipehub.com',
  username: 'foodie',
  password: 'password123',
  createdAt: '2026-01-01',
};

const defaultAdmin = {
  id: 'adm-1',
  name: 'Chef Gordon',
  email: 'admin@recipehub.com',
  username: 'admin',
  password: 'admin123',
  createdAt: '2026-01-01',
};

const initialSubmissions = [
  {
    id: 'sub-1',
    name: 'Avocado Toast with Poached Egg',
    description: 'Crispy sourdough toast with smashed avocado and a poached egg.',
    cuisine: 'American',
    mealType: 'Breakfast',
    dietaryPreference: 'Vegetarian',
    difficulty: 'Easy',
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    ingredients: ['2 slices sourdough bread', '1 ripe avocado', '2 eggs'],
    instructions: ['Toast the sourdough.', 'Mash the avocado with salt.', 'Poach eggs and serve on toast.'],
    submittedBy: 'Alex Morgan',
    submittedAt: '2026-03-01',
    status: 'pending',
  },
  {
    id: 'sub-2',
    name: 'Authentic Thai Green Curry',
    description: 'Aromatic green curry with coconut milk, Thai basil, and tender chicken.',
    cuisine: 'Asian',
    mealType: 'Dinner',
    dietaryPreference: 'Non-Vegetarian',
    difficulty: 'Medium',
    prepTime: 20,
    cookTime: 20,
    servings: 4,
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80',
    ingredients: ['400g chicken', '400ml coconut milk', 'Green curry paste', 'Thai basil'],
    instructions: ['Fry curry paste until fragrant.', 'Add chicken and cook through.', 'Add coconut milk and simmer.'],
    submittedBy: 'Sam Foodie',
    submittedAt: '2026-03-02',
    status: 'pending',
  },
];

const initialRatings = {
  'rec-1': { 'usr-1': 5, u2: 5, u3: 5, u4: 4, u5: 5 },
  'rec-2': { 'usr-1': 5, u2: 4, u3: 5, u4: 4 },
  'rec-3': { 'usr-1': 5, u2: 5, u3: 4, u4: 5 },
  'rec-4': { 'usr-1': 5, u2: 5, u3: 4, u4: 4, u5: 5 },
  'rec-5': { 'usr-1': 5, u2: 5, u3: 4, u4: 5 },
  'rec-6': { 'usr-1': 4, u2: 5, u3: 4, u4: 5 },
  'rec-7': { 'usr-1': 5, u2: 5, u3: 4, u4: 5 },
  'rec-8': { 'usr-1': 5, u2: 4, u3: 5, u4: 4 },
  'rec-9': { 'usr-1': 5, u2: 5, u3: 5, u4: 5, u5: 4 },
  'rec-10': { 'usr-1': 4, u2: 5, u3: 4, u4: 5 },
  'rec-11': { 'usr-1': 5, u2: 5, u3: 4, u4: 5 },
  'rec-12': { 'usr-1': 5, u2: 5, u3: 5, u4: 4 },
};

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored === null ? fallback : JSON.parse(stored);
  } catch (error) {
    console.error(`Unable to read ${key} from browser storage.`, error);
    return fallback;
  }
}

function seedAccounts() {
  const storedUsers = readStorage(STORAGE.users, []);
  const storedAdmins = readStorage(STORAGE.admins, []);
  const users = Array.isArray(storedUsers) ? storedUsers : [];
  const admins = Array.isArray(storedAdmins) ? storedAdmins : [];
  if (!users.some((user) => user.username === defaultUser.username)) {
    users.push({ ...defaultUser, status: 'active' });
  }
  if (!admins.some((admin) => admin.username === defaultAdmin.username)) {
    admins.push({ ...defaultAdmin, status: 'active' });
  }
  localStorage.setItem(STORAGE.users, JSON.stringify(users));
  localStorage.setItem(STORAGE.admins, JSON.stringify(admins));
  if (!localStorage.getItem(STORAGE.collections)) {
    localStorage.setItem(STORAGE.collections, JSON.stringify({
      'usr-1': [
        { id: 'col-1', name: 'My Favorites', description: 'All-time culinary winners and comfort dishes', recipeIds: ['rec-1', 'rec-4', 'rec-9'] },
        { id: 'col-2', name: 'Weekend Recipes', description: 'Special dishes to make when having friends over', recipeIds: ['rec-1', 'rec-2', 'rec-7'] },
        { id: 'col-3', name: 'Healthy Recipes', description: 'Nutritious & fresh plant-forward meals', recipeIds: ['rec-8', 'rec-10', 'rec-12'] },
      ],
    }));
  }
  if (!localStorage.getItem(STORAGE.saved)) {
    localStorage.setItem(STORAGE.saved, JSON.stringify({ 'usr-1': ['rec-1', 'rec-4', 'rec-9'] }));
  }
  return { users, admins };
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [{ users: seededUsers, admins: seededAdmins }] = useState(seedAccounts);
  const [recipes, setRecipes] = useState(() => {
    const saved = readStorage(STORAGE.recipes, null);
    return Array.isArray(saved) && saved.length ? saved : initialRecipes;
  });
  const [users, setUsers] = useState(seededUsers);
  const [admins, setAdmins] = useState(seededAdmins);
  const [session, setSession] = useState(() => {
    const admin = readStorage(STORAGE.admin, null);
    const user = readStorage(STORAGE.user, null);
    const storedSession = admin ? { role: 'admin', account: admin } : user ? { role: 'user', account: user } : null;
    if (!storedSession) return null;
    const accounts = storedSession.role === 'admin' ? seededAdmins : seededUsers;
    const account = accounts.find((item) => item.id === storedSession.account?.id && item.status !== 'disabled');
    return account ? { role: storedSession.role, account } : null;
  });
  const [savedRecipes, setSavedRecipes] = useState(() => readStorage(STORAGE.saved, {}));
  const [collections, setCollections] = useState(() => readStorage(STORAGE.collections, {}));
  const [ratings, setRatings] = useState(() => readStorage(STORAGE.ratings, initialRatings));
  const [submissions, setSubmissions] = useState(() => readStorage(STORAGE.submissions, initialSubmissions));
  const [reviews, setReviews] = useState(() => readStorage(STORAGE.reviews, {}));
  const [shoppingLists, setShoppingLists] = useState(() => readStorage(STORAGE.shoppingLists, {}));
  const [weeklyPlans, setWeeklyPlans] = useState(() => readStorage(STORAGE.weeklyPlans, {}));
  const [toast, setToast] = useState('');

  useEffect(() => {
    const entries = [
      [STORAGE.recipes, recipes],
      [STORAGE.users, users],
      [STORAGE.admins, admins],
      [STORAGE.saved, savedRecipes],
      [STORAGE.collections, collections],
      [STORAGE.ratings, ratings],
      [STORAGE.submissions, submissions],
      [STORAGE.reviews, reviews],
      [STORAGE.shoppingLists, shoppingLists],
      [STORAGE.weeklyPlans, weeklyPlans],
    ];
    try {
      entries.forEach(([key, value]) => localStorage.setItem(key, JSON.stringify(value)));
    } catch (error) {
      console.error('Unable to persist Recipe Hub data.', error);
      setToast('Could not save your changes in browser storage.');
    }
  }, [recipes, users, admins, savedRecipes, collections, ratings, submissions, reviews, shoppingLists, weeklyPlans]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const notify = useCallback((message) => setToast(message), []);

  const login = useCallback((role, username, password) => {
    if (role !== 'admin' && role !== 'user') return false;
    const accounts = role === 'admin' ? admins : users;
    const identifier = username.trim().toLowerCase();
    const account = accounts.find((item) => (item.username.toLowerCase() === identifier || item.email.toLowerCase() === identifier) && item.password === password && item.status !== 'disabled');
    if (!account) return false;
    const nextSession = { role, account };
    localStorage.removeItem(role === 'admin' ? STORAGE.user : STORAGE.admin);
    localStorage.setItem(role === 'admin' ? STORAGE.admin : STORAGE.user, JSON.stringify(account));
    setSession(nextSession);
    return true;
  }, [admins, users]);

  const register = useCallback((role, account) => {
    if (role !== 'user') return { ok: false, error: 'Administrator accounts cannot be registered publicly.' };
    const accounts = users;
    const username = account.username.trim().toLowerCase();
    const email = account.email.trim().toLowerCase();
    if (accounts.some((item) => item.username.toLowerCase() === username || item.email.toLowerCase() === email)) {
      return { ok: false, error: 'An account with this username or email already exists.' };
    }
    const created = {
      ...account,
      id: `usr-${Date.now()}`,
      username,
      email,
      status: 'active',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setUsers((current) => [...current, created]);
    setCollections((current) => ({
      ...current,
      [created.id]: [{ id: `col-${Date.now()}`, name: 'My Favorites', description: 'My favorite dishes', recipeIds: [] }],
    }));
    return { ok: true };
  }, [users]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE.admin);
    localStorage.removeItem(STORAGE.user);
    setSession(null);
  }, []);

  const setUserStatus = useCallback((userId, status) => {
    if (session?.role !== 'admin' || !['active', 'disabled'].includes(status)) return false;
    const user = users.find((item) => item.id === userId);
    if (!user) return false;
    setUsers((current) => current.map((item) => item.id === userId ? { ...item, status } : item));
    return true;
  }, [session, users]);

  const toggleSaved = useCallback((recipeId) => {
    if (!session || session.role !== 'user') return false;
    setSavedRecipes((current) => {
      const currentIds = current[session.account.id] || [];
      const nextIds = currentIds.includes(recipeId)
        ? currentIds.filter((id) => id !== recipeId)
        : [...currentIds, recipeId];
      return { ...current, [session.account.id]: nextIds };
    });
    return true;
  }, [session]);

  const submitRating = useCallback((recipeId, score) => {
    if (!session || session.role !== 'user' || !Number.isInteger(score) || score < 1 || score > 5) return false;
    const updatedRatings = { ...(ratings[recipeId] || {}), [session.account.id]: score };
    const allScores = Object.values(updatedRatings);
    setRatings((current) => ({ ...current, [recipeId]: updatedRatings }));
    setRecipes((current) => current.map((recipe) => recipe.id === recipeId
      ? { ...recipe, rating: allScores.reduce((sum, value) => sum + Number(value), 0) / allScores.length, ratingsCount: allScores.length }
      : recipe));
    return true;
  }, [session, ratings]);

  const submitReview = useCallback((recipeId, text) => {
    if (session?.role !== 'user' || !recipes.some((recipe) => recipe.id === recipeId) || !text.trim()) return false;
    const review = {
      id: `review-${Date.now()}`,
      userId: session.account.id,
      userName: session.account.name,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    setReviews((current) => ({ ...current, [recipeId]: [review, ...(current[recipeId] || []).filter((item) => item.userId !== session.account.id)] }));
    return true;
  }, [session, recipes]);

  const addCollection = useCallback((name, description = '') => {
    if (!session || session.role !== 'user' || !name.trim()) return;
    setCollections((current) => ({
      ...current,
      [session.account.id]: [
        ...(current[session.account.id] || []),
        { id: `col-${Date.now()}`, name: name.trim(), description: description.trim(), recipeIds: [] },
      ],
    }));
  }, [session]);

  const updateCollection = useCallback((collectionId, recipeId, remove = false) => {
    if (!session || session.role !== 'user') return false;
    setCollections((current) => ({
      ...current,
      [session.account.id]: (current[session.account.id] || []).map((collection) => {
        if (collection.id !== collectionId) return collection;
        const ids = collection.recipeIds || [];
        return {
          ...collection,
          recipeIds: remove ? ids.filter((id) => id !== recipeId) : [...new Set([...ids, recipeId])],
        };
      }),
    }));
    return true;
  }, [session]);

  const removeCollection = useCallback((collectionId) => {
    if (!session || session.role !== 'user') return;
    setCollections((current) => ({
      ...current,
      [session.account.id]: (current[session.account.id] || []).filter((item) => item.id !== collectionId),
    }));
  }, [session]);

  const submitRecipe = useCallback((recipe) => {
    if (session?.role !== 'user') return false;
    setSubmissions((current) => [{
      ...recipe,
      id: `sub-${Date.now()}`,
      submittedBy: session?.account.name || 'Recipe Hub user',
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'pending',
    }, ...current]);
    return true;
  }, [session]);

  const saveRecipe = useCallback((recipe) => {
    if (session?.role !== 'admin') return false;
    setRecipes((current) => [recipe, ...current]);
    return true;
  }, [session]);

  const updateRecipe = useCallback((recipeId, updatedRecipe) => {
    if (session?.role !== 'admin') return false;
    setRecipes((current) => current.map((recipe) => recipe.id === recipeId ? { ...recipe, ...updatedRecipe } : recipe));
    return true;
  }, [session]);

  const deleteRecipe = useCallback((recipeId) => {
    if (session?.role !== 'admin') return false;
    setRecipes((current) => current.filter((recipe) => recipe.id !== recipeId));
    return true;
  }, [session]);

  const reviewSubmission = useCallback((submissionId, status) => {
    if (session?.role !== 'admin' || !['approved', 'rejected'].includes(status)) return false;
    const submission = submissions.find((item) => item.id === submissionId);
    if (!submission || submission.status !== 'pending') return false;
    if (submission && status === 'approved') {
      setRecipes((existing) => [...existing, { ...submission, id: `rec-${Date.now()}` }]);
    }
    setSubmissions((current) => current.map((item) => item.id === submissionId ? { ...item, status } : item));
    return true;
  }, [submissions]);

  const saveShoppingList = useCallback((items) => {
    if (session?.role !== 'user' || !Array.isArray(items)) return false;
    setShoppingLists((current) => ({ ...current, [session.account.id]: items }));
    return true;
  }, [session]);

  const toggleShoppingListItem = useCallback((itemId) => {
    if (session?.role !== 'user') return false;
    setShoppingLists((current) => ({
      ...current,
      [session.account.id]: (current[session.account.id] || []).map((item) => item.id === itemId ? { ...item, checked: !item.checked } : item),
    }));
    return true;
  }, [session]);

  const clearShoppingList = useCallback(() => {
    if (session?.role !== 'user') return false;
    setShoppingLists((current) => ({ ...current, [session.account.id]: [] }));
    return true;
  }, [session]);

  const setWeeklyPlanRecipe = useCallback((day, meal, recipeId) => {
    if (session?.role !== 'user') return false;
    setWeeklyPlans((current) => ({
      ...current,
      [session.account.id]: {
        ...(current[session.account.id] || {}),
        [`${day}:${meal}`]: recipeId,
      },
    }));
    return true;
  }, [session]);

  const value = useMemo(() => ({
    recipes, users, admins, session, savedRecipes, collections, ratings, submissions, reviews,
    shoppingLists, weeklyPlans, toast, notify, login, register, logout, setUserStatus,
    toggleSaved, submitRating, submitReview, addCollection, updateCollection, removeCollection,
    submitRecipe, saveRecipe, updateRecipe, deleteRecipe, reviewSubmission, saveShoppingList,
    toggleShoppingListItem, clearShoppingList, setWeeklyPlanRecipe,
  }), [
    recipes, users, admins, session, savedRecipes, collections, ratings, submissions, reviews,
    shoppingLists, weeklyPlans, toast, notify, login, register, logout, setUserStatus,
    toggleSaved, submitRating, submitReview, addCollection, updateCollection, removeCollection,
    submitRecipe, saveRecipe, updateRecipe, deleteRecipe, reviewSubmission, saveShoppingList,
    toggleShoppingListItem, clearShoppingList, setWeeklyPlanRecipe,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider.');
  return context;
}
