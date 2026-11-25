
(function () {
  'use strict';

  const STORAGE_KEYS = {
    RECIPES: 'recipehub_recipes',
    USERS: 'recipehub_users',
    ADMINS: 'recipehub_admins',
    CURRENT_USER: 'recipehub_current_user',
    CURRENT_ADMIN: 'recipehub_current_admin',
    SAVED_RECIPES: 'recipehub_saved_recipes',      
    RATINGS: 'recipehub_ratings',                   
    COLLECTIONS: 'recipehub_collections',           
    SUBMISSIONS: 'recipehub_submissions'           
  };

  
  const INITIAL_RECIPES = [
    {
      id: 'rec-1',
      name: 'Chicken Biryani',
      description: 'Fragrant royal basmati rice layered with tender spiced marinated chicken, saffron, mint, and crisp caramelized onions.',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      cuisine: 'Indian',
      mealType: 'Dinner',
      dietaryPreference: 'Non-Vegetarian',
      prepTime: 30,
      cookTime: 45,
      servings: 6,
      difficulty: 'Medium',
      rating: 4.9,
      ratingsCount: 48,
      ingredients: [
        '500g Fresh Chicken, cut into curry pieces',
        '2 cups Aged Basmati Rice',
        '1 cup Plain Greek Yogurt',
        '2 Large Onions, thinly sliced & fried golden',
        '2 tbsp Ginger-Garlic Paste',
        '2 tbsp Biryani Masala / Garam Masala',
        '1/2 tsp Saffron strands soaked in 3 tbsp warm milk',
        '1/4 cup Fresh Mint leaves, chopped',
        '1/4 cup Fresh Coriander leaves, chopped',
        '3 tbsp Pure Ghee',
        'Whole spices: 2 bay leaves, 4 green cardamoms, 1 cinnamon stick',
        'Salt to taste'
      ],
      instructions: [
        'Marinate chicken with yogurt, ginger-garlic paste, biryani spices, half the fried onions, mint, and salt for at least 1 hour.',
        'Wash basmati rice thoroughly and soak in cold water for 30 minutes.',
        'In a large pot, boil water with whole spices and salt. Add soaked rice and cook until 70% done. Drain carefully.',
        'In a heavy-bottomed pot or handi, heat ghee and sear the marinated chicken for 8 minutes until lightly browned.',
        'Spread the partially cooked rice evenly over the chicken layer. Top with saffron milk, remaining fried onions, and cilantro.',
        'Seal the pot tightly with aluminum foil and lid. Cook on low heat (Dum) for 25 minutes.',
        'Rest for 10 minutes before gently fluffing the rice layers. Serve hot with cooling cucumber raita.'
      ]
    },
    {
      id: 'rec-2',
      name: 'Paneer Tikka',
      description: 'Succulent cubes of cottage cheese skewered with crisp peppers and onions, marinated in spiced tandoori yogurt and grilled to smoky perfection.',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
      cuisine: 'Indian',
      mealType: 'Snacks',
      dietaryPreference: 'Vegetarian',
      prepTime: 25,
      cookTime: 15,
      servings: 4,
      difficulty: 'Medium',
      rating: 4.8,
      ratingsCount: 42,
      ingredients: [
        '400g Fresh Paneer, cut into 1.5-inch cubes',
        '1 Large Bell Pepper (Capsicum), cut into squares',
        '1 Large Red Onion, cut into square petals',
        '1 cup Thick Hung Curd / Greek Yogurt',
        '1.5 tbsp Roasted Gram Flour (Besan)',
        '1 tbsp Kashmiri Red Chili powder',
        '1 tbsp Kasuri Methi (crushed fenugreek leaves)',
        '1 tbsp Chaat Masala',
        '1 tbsp Ginger-Garlic paste',
        '2 tbsp Mustard oil, heated and cooled',
        '1 Lemon, juiced',
        'Salt to taste'
      ],
      instructions: [
        'In a large mixing bowl, combine hung curd, besan, mustard oil, ginger-garlic paste, Kashmiri chili, chaat masala, kasuri methi, and salt.',
        'Add paneer cubes, capsicum, and onion squares. Coat thoroughly with marinade and refrigerate for at least 30 minutes.',
        'Thread paneer and vegetables alternatively onto soaked wooden or metal skewers.',
        'Preheat oven or grill to 425°F (220°C). Place skewers on a lined baking rack.',
        'Bake/grill for 12-15 minutes, basting with melted butter halfway through until edges are nicely charred.',
        'Sprinkle chaat masala and fresh lemon juice over skewers before serving with mint chutney.'
      ]
    },
    {
      id: 'rec-3',
      name: 'Masala Dosa',
      description: 'Ultra-crispy golden fermented rice and lentil crepe stuffed with a mildly spiced mustard-tempered potato masala, served with coconut chutney.',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      cuisine: 'Indian',
      mealType: 'Breakfast',
      dietaryPreference: 'Vegan',
      prepTime: 20,
      cookTime: 15,
      servings: 4,
      difficulty: 'Medium',
      rating: 4.9,
      ratingsCount: 51,
      ingredients: [
        '3 cups Dosa Batter (fermented rice and urad dal)',
        '4 Medium Potatoes, boiled, peeled, and mashed coarsely',
        '1 Large Onion, sliced',
        '2 Green Chilies, slit',
        '1 tsp Mustard seeds',
        '1 sprig Fresh Curry Leaves',
        '1/2 tsp Turmeric powder',
        '1 tbsp Ginger, minced',
        '2 tbsp Oil or Ghee',
        'Fresh coriander leaves, chopped',
        'Salt to taste'
      ],
      instructions: [
        'Prepare the potato masala: Heat 1 tbsp oil in a pan. Splutter mustard seeds, then add curry leaves, green chilies, ginger, and sliced onions. Sauté until translucent.',
        'Add turmeric powder and salt, followed by coarsely mashed boiled potatoes and 3 tbsp water. Simmer for 3 minutes, then garnish with coriander.',
        'Heat a flat cast-iron dosa tawa until smoking, splash with water droplets, and wipe clean with a cloth.',
        'Pour a ladleful of fermented batter into the center and spread quickly in concentric outward circles into a thin crepe.',
        'Drizzle 1 tsp ghee or oil around edges. Cook on medium-high until base turns golden brown and crispy.',
        'Place a generous portion of potato masala in center. Fold the dosa and serve immediately with hot sambar and coconut chutney.'
      ]
    },
    {
      id: 'rec-4',
      name: 'Vegetable Pasta',
      description: 'Al dente penne pasta tossed with roasted bell peppers, zucchini, cherry tomatoes, and garlic infused basil pesto.',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281781?auto=format&fit=crop&w=800&q=80',
      cuisine: 'Italian',
      mealType: 'Dinner',
      dietaryPreference: 'Vegetarian',
      prepTime: 15,
      cookTime: 20,
      servings: 4,
      difficulty: 'Easy',
      rating: 4.7,
      ratingsCount: 35,
      ingredients: [
        '300g Penne Rigate or Rigatoni Pasta',
        '1 cup Cherry Tomatoes, halved',
        '1 medium Zucchini, sliced into half-moons',
        '1 Red Bell Pepper, sliced',
        '3 cloves Garlic, finely minced',
        '1/3 cup Basil Pesto sauce',
        '2 tbsp Extra Virgin Olive Oil',
        '1/3 cup Grated Parmesan Cheese',
        '1/2 tsp Red pepper flakes',
        'Fresh basil leaves for garnish',
        'Salt and freshly ground black pepper'
      ],
      instructions: [
        'Bring a large pot of salted water to a rolling boil. Cook penne until al dente, reserving 1/2 cup pasta water before draining.',
        'Heat olive oil in a large skillet over medium heat. Sauté garlic and red pepper flakes for 1 minute until fragrant.',
        'Add sliced zucchini, red bell pepper, and cherry tomatoes. Sauté for 6-8 minutes until tender-crisp.',
        'Add the cooked pasta and basil pesto to the skillet, drizzling in 2-3 tablespoons of reserved pasta water to emulsify.',
        'Toss thoroughly over low heat until pasta is evenly coated and glossy.',
        'Garnish with freshly grated Parmesan and fresh basil leaves. Serve immediately.'
      ]
    },
    {
      id: 'rec-5',
      name: 'Margherita Pizza',
      description: 'Classic artisanal Italian pizza featuring bubbly Neapolitan crust, San Marzano tomato sauce, fresh mozzarella, and sweet basil leaves.',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
      cuisine: 'Italian',
      mealType: 'Dinner',
      dietaryPreference: 'Vegetarian',
      prepTime: 20,
      cookTime: 12,
      servings: 3,
      difficulty: 'Medium',
      rating: 4.9,
      ratingsCount: 56,
      ingredients: [
        '1 Ball Pizza Dough (homemade or artisan store-bought)',
        '1/2 cup Crushed San Marzano Canned Tomatoes',
        '150g Fresh Mozzarella, sliced or torn',
        'Handful Fresh Basil leaves',
        '2 tbsp Extra Virgin Olive Oil',
        '1 clove Garlic, minced',
        '1/2 tsp Sea salt',
        'Semolina flour for dusting'
      ],
      instructions: [
        'Preheat your oven with a pizza stone or heavy baking sheet at highest heat (500°F / 260°C) for 45 minutes.',
        'Stretch the pizza dough gently on a surface dusted with semolina flour into a 12-inch circle, leaving a slightly raised rim.',
        'Mix crushed San Marzano tomatoes with minced garlic, a pinch of sea salt, and 1 tsp olive oil.',
        'Spread the tomato sauce thinly over the dough, leaving a 1-inch border for the crust.',
        'Distribute torn fresh mozzarella slices evenly across the sauce.',
        'Slide pizza into the oven onto the hot stone and bake for 10-12 minutes until crust is blistered and cheese is melted.',
        'Scatter fresh basil leaves over top and finish with a delicate drizzle of extra virgin olive oil.'
      ]
    },
    {
      id: 'rec-6',
      name: 'Vegetable Fried Rice',
      description: 'Fluffy cold jasmine rice stir-fried in a roaring hot wok with crispy garden vegetables, toasted sesame oil, and umami soy sauce.',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
      cuisine: 'Chinese',
      mealType: 'Lunch',
      dietaryPreference: 'Vegan',
      prepTime: 15,
      cookTime: 10,
      servings: 4,
      difficulty: 'Easy',
      rating: 4.6,
      ratingsCount: 29,
      ingredients: [
        '4 cups Cooked Jasmine Rice (day-old, cold from fridge)',
        '1 cup Mixed Vegetables (carrots, green peas, sweet corn)',
        '3 Scallions (green onions), whites and greens separated',
        '3 cloves Garlic, minced',
        '1 tbsp Fresh Ginger, minced',
        '2.5 tbsp Low-Sodium Soy Sauce',
        '1 tbsp Toasted Sesame Oil',
        '2 tbsp Neutral Cooking Oil',
        '1 tsp White Pepper powder'
      ],
      instructions: [
        'Break up any clumps in the chilled cooked rice with your fingers or a spatula.',
        'Heat neutral oil in a large wok over high heat until smoking hot.',
        'Add minced garlic, ginger, and scallion whites. Stir-fry for 30 seconds until aromatic.',
        'Toss in diced carrots, peas, and sweet corn. Stir-fry for 2-3 minutes until bright and tender.',
        'Add the cold rice into the wok and spread it against the hot sides. Let sizzle for 1 minute before tossing.',
        'Drizzle soy sauce, sesame oil, and white pepper evenly over the rice. Toss continuously for 3 minutes.',
        'Fold in sliced scallion greens and remove from heat. Serve steaming hot.'
      ]
    },
    {
      id: 'rec-7',
      name: 'Chicken Tacos',
      description: 'Zesty spiced grilled chicken piled into warm corn tortillas with creamy avocado salsa, pickled red onions, and cotija cheese.',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
      cuisine: 'Mexican',
      mealType: 'Dinner',
      dietaryPreference: 'Non-Vegetarian',
      prepTime: 20,
      cookTime: 15,
      servings: 4,
      difficulty: 'Easy',
      rating: 4.8,
      ratingsCount: 39,
      ingredients: [
        '500g Boneless Skinless Chicken Breasts or Thighs',
        '8 Small Corn or Flour Tortillas',
        '1 Ripe Avocado, diced',
        '1/2 cup Pickled Red Onions',
        '1/3 cup Crumbled Cotija or Feta Cheese',
        '1/4 cup Fresh Cilantro leaves',
        '2 tbsp Olive Oil',
        '1 Packet Taco Seasoning (or cumin, chili powder, paprika, garlic powder)',
        '2 Limes, sliced into wedges',
        '1/4 cup Sour cream or Mexican crema'
      ],
      instructions: [
        'Coat chicken evenly with olive oil, taco seasoning, and juice of 1 lime.',
        'Heat a cast-iron skillet or grill pan over medium-high heat. Sear chicken for 6-7 minutes per side until cooked through.',
        'Transfer chicken to a cutting board, rest for 5 minutes, then chop into bite-sized juicy chunks.',
        'Warm the tortillas on the dry pan for 30 seconds per side until pliable and lightly charred.',
        'Assemble tacos by heaping warm chicken onto each tortilla.',
        'Top with diced avocado, pickled red onions, crumbled cheese, cilantro, and crema.',
        'Serve with lime wedges for a final fresh squeeze.'
      ]
    },
    {
      id: 'rec-8',
      name: 'Greek Salad',
      description: 'Crisp English cucumbers, vine-ripened tomatoes, briny Kalamata olives, and rich feta slabs dressed in extra virgin olive oil and oregano.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      cuisine: 'Mediterranean',
      mealType: 'Lunch',
      dietaryPreference: 'Gluten-Free',
      prepTime: 15,
      cookTime: 0,
      servings: 4,
      difficulty: 'Easy',
      rating: 4.7,
      ratingsCount: 31,
      ingredients: [
        '3 Large Vine-Ripened Tomatoes, cut into wedges',
        '1 English Cucumber, sliced into half-moons',
        '1/2 Red Onion, thinly sliced',
        '1 Green Bell Pepper, sliced into rings',
        '1/2 cup Kalamata Olives, pitted',
        '200g Greek Feta Cheese (slab or cubed)',
        '3 tbsp Extra Virgin Greek Olive Oil',
        '1.5 tbsp Red Wine Vinegar',
        '1 tsp Dried Mediterranean Oregano',
        'Sea salt and freshly cracked black pepper'
      ],
      instructions: [
        'In a large salad bowl, combine tomato wedges, sliced cucumber, green bell pepper, and red onion.',
        'Add the pitted Kalamata olives.',
        'In a small bowl, whisk together extra virgin olive oil, red wine vinegar, sea salt, and cracked pepper.',
        'Pour dressing over vegetables and toss gently to coat.',
        'Place the block of feta cheese on top of the salad.',
        'Sprinkle dried oregano generously over the cheese and vegetables, then drizzle with one more teaspoon of olive oil before serving.'
      ]
    },
    {
      id: 'rec-9',
      name: 'Chocolate Brownie',
      description: 'Rich, dense, and deeply fudgy chocolate brownies featuring crackly shiny tops, intense cocoa depth, and melted dark chocolate chunks.',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
      cuisine: 'American',
      mealType: 'Dessert',
      dietaryPreference: 'Vegetarian',
      prepTime: 20,
      cookTime: 30,
      servings: 9,
      difficulty: 'Medium',
      rating: 4.9,
      ratingsCount: 64,
      ingredients: [
        '200g High Quality Dark Chocolate (70%), chopped',
        '1/2 cup (115g) Unsalted Butter',
        '1 cup (200g) Granulated Sugar',
        '1/2 cup (100g) Brown Sugar',
        '3 Large Eggs at room temperature',
        '3/4 cup (95g) All-Purpose Flour',
        '1/4 cup Dutch-Processed Cocoa Powder',
        '1 tsp Pure Vanilla Extract',
        '1/2 tsp Espresso powder',
        '1/2 tsp Flaky Sea Salt'
      ],
      instructions: [
        'Preheat oven to 350°F (175°C). Line an 8x8 inch square baking pan with parchment paper.',
        'Melt butter and chopped dark chocolate together in a heatproof bowl set over simmering water, stirring until silky smooth. Cool slightly.',
        'In a bowl, beat eggs, white sugar, and brown sugar vigorously for 4-5 minutes until pale, frothy, and doubled in volume.',
        'Gently pour in the melted chocolate mixture and vanilla extract, folding carefully to retain aeration.',
        'Sift in the flour, cocoa powder, espresso powder, and salt. Fold just until no dry flour streaks remain.',
        'Pour batter into prepared pan and level with a spatula.',
        'Bake for 28-32 minutes until edges are set and a toothpick inserted in center comes out with moist fudgy crumbs.',
        'Cool completely before slicing into decadent glossy squares.'
      ]
    },
    {
      id: 'rec-10',
      name: 'Vegetable Soup',
      description: 'A comforting, nutrient-dense pot of simmered garden carrots, celery, zucchini, kidney beans, and aromatic herbs in a rich tomato broth.',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
      cuisine: 'American',
      mealType: 'Dinner',
      dietaryPreference: 'Vegan',
      prepTime: 15,
      cookTime: 25,
      servings: 4,
      difficulty: 'Easy',
      rating: 4.6,
      ratingsCount: 27,
      ingredients: [
        '2 Carrots, diced',
        '2 stalks Celery, sliced',
        '1 Medium Zucchini, diced',
        '1 cup Green Beans, trimmed & cut',
        '1 can (15 oz) Diced Tomatoes',
        '1 can (15 oz) Cannellini or Kidney Beans, rinsed',
        '4 cups Vegetable Broth',
        '1 Onion, chopped',
        '3 cloves Garlic, minced',
        '1 tsp Italian Seasoning (oregano, thyme, basil)',
        '2 tbsp Olive oil',
        'Salt and black pepper to taste'
      ],
      instructions: [
        'Heat olive oil in a large stockpot over medium heat.',
        'Add chopped onion, celery, and carrots. Cook for 5 minutes until starting to soften.',
        'Stir in minced garlic, Italian seasoning, salt, and pepper, cooking for 1 minute until fragrant.',
        'Pour in vegetable broth and canned diced tomatoes with their juices. Bring soup to a boil.',
        'Reduce heat to low, add green beans, zucchini, and rinsed beans.',
        'Cover and simmer gently for 20 minutes until all vegetables are tender.',
        'Taste and adjust seasoning. Ladle into warm bowls and serve with crusty bread.'
      ]
    },
    {
      id: 'rec-11',
      name: 'Grilled Chicken',
      description: 'Tender chicken breasts marinated in zesty lemon, garlic, rosemary, and olive oil, char-grilled with beautiful grill marks.',
      image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
      cuisine: 'American',
      mealType: 'Dinner',
      dietaryPreference: 'Keto',
      prepTime: 15,
      cookTime: 15,
      servings: 4,
      difficulty: 'Easy',
      rating: 4.8,
      ratingsCount: 38,
      ingredients: [
        '4 Boneless Skinless Chicken Breasts (about 700g)',
        '3 tbsp Extra Virgin Olive Oil',
        'Juice & zest of 1 large Lemon',
        '4 cloves Garlic, minced',
        '1 tbsp Fresh Rosemary, finely chopped',
        '1 tsp Dried Thyme',
        '1 tsp Smoked Paprika',
        '1 tsp Kosher salt',
        '1/2 tsp Freshly cracked black pepper'
      ],
      instructions: [
        'Pound chicken breasts between plastic wrap to an even 1/2-inch thickness so they cook evenly.',
        'In a bowl, whisk olive oil, lemon juice, lemon zest, garlic, rosemary, thyme, paprika, salt, and pepper.',
        'Pour marinade over chicken breasts. Marinate for 30 minutes (or up to 4 hours).',
        'Preheat grill or indoor grill pan to medium-high heat and lightly oil the grates.',
        'Grill chicken undisturbed for 6-7 minutes until deep char marks form.',
        'Flip chicken and cook for another 5-6 minutes until cooked through.',
        'Transfer to a cutting board and rest for 5 minutes before slicing against the grain.'
      ]
    },
    {
      id: 'rec-12',
      name: 'Mango Smoothie',
      description: 'A creamy tropical beverage blended with sweet ripe Alphonso mangoes, creamy Greek yogurt, honey, almond milk, and a pinch of fragrant cardamom.',
      image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
      cuisine: 'Indian',
      mealType: 'Breakfast',
      dietaryPreference: 'Vegetarian',
      prepTime: 5,
      cookTime: 0,
      servings: 2,
      difficulty: 'Easy',
      rating: 4.9,
      ratingsCount: 44,
      ingredients: [
        '2 cups Ripe Mango Chunks (fresh or frozen)',
        '1 cup Plain Greek Yogurt',
        '1/2 cup Cold Milk or Almond Milk',
        '1.5 tbsp Honey or Agave Nectar',
        '1/4 tsp Ground Cardamom powder',
        '4 Ice cubes',
        '1 tbsp Sliced Pistachios for garnish'
      ],
      instructions: [
        'Place mango chunks, Greek yogurt, cold milk, honey, cardamom, and ice cubes into a blender.',
        'Blend on high for 60-90 seconds until completely smooth and velvety.',
        'Taste and adjust sweetness with extra honey if desired.',
        'Pour into two chilled tall glasses.',
        'Garnish top with sliced pistachios and serve immediately for a refreshing tropical treat.'
      ]
    }
  ];

  /* ============================================================================
     3. LOCALSTORAGE HELPERS & SEED DATA INITIALIZATION
     ============================================================================ */
  function getStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error(`Error reading ${key} from LocalStorage:`, e);
      return fallback;
    }
  }

  function setStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error writing ${key} to LocalStorage:`, e);
      showToast('Storage quota exceeded or private mode enabled.', 'error');
    }
  }

  function initializeDatabase() {
    // 1. Seed Recipes
    const existingRecipes = getStorage(STORAGE_KEYS.RECIPES, null);
    if (!existingRecipes || existingRecipes.length === 0) {
      setStorage(STORAGE_KEYS.RECIPES, INITIAL_RECIPES);
    }

    // 2. Seed Default Demo User
    const existingUsers = getStorage(STORAGE_KEYS.USERS, []);
    const demoUserExists = existingUsers.some(u => u.username === 'foodie');
    if (!demoUserExists) {
      const demoUser = {
        id: 'usr-1',
        name: 'Alex Morgan',
        email: 'alex@recipehub.com',
        username: 'foodie',
        password: 'password123',
        createdAt: '2026-01-01'
      };
      existingUsers.push(demoUser);
      setStorage(STORAGE_KEYS.USERS, existingUsers);

      // Seed Default Collections for Demo User
      const collections = getStorage(STORAGE_KEYS.COLLECTIONS, {});
      collections['usr-1'] = [
        { id: 'col-1', name: 'My Favorites', description: 'All-time culinary winners and comfort dishes', recipeIds: ['rec-1', 'rec-4', 'rec-9'] },
        { id: 'col-2', name: 'Weekend Recipes', description: 'Special dishes to make when having friends over', recipeIds: ['rec-1', 'rec-2', 'rec-7'] },
        { id: 'col-3', name: 'Healthy Recipes', description: 'Nutritious & fresh plant-forward meals', recipeIds: ['rec-8', 'rec-10', 'rec-12'] }
      ];
      setStorage(STORAGE_KEYS.COLLECTIONS, collections);

      // Seed Default Saved Recipes for Demo User
      const saved = getStorage(STORAGE_KEYS.SAVED_RECIPES, {});
      saved['usr-1'] = ['rec-1', 'rec-4', 'rec-9'];
      setStorage(STORAGE_KEYS.SAVED_RECIPES, saved);
    }

    // 3. Seed Default Demo Admin
    const existingAdmins = getStorage(STORAGE_KEYS.ADMINS, []);
    const demoAdminExists = existingAdmins.some(a => a.username === 'admin');
    if (!demoAdminExists) {
      const demoAdmin = {
        id: 'adm-1',
        name: 'Chef Gordon',
        email: 'admin@recipehub.com',
        username: 'admin',
        password: 'admin123',
        createdAt: '2026-01-01'
      };
      existingAdmins.push(demoAdmin);
      setStorage(STORAGE_KEYS.ADMINS, existingAdmins);
    }

    // 4. Seed Ratings Map (recipeId -> { userId: score })
    const existingRatings = getStorage(STORAGE_KEYS.RATINGS, null);
    if (!existingRatings) {
      const seedRatings = {
        'rec-1': { 'usr-1': 5, 'u2': 5, 'u3': 5, 'u4': 4, 'u5': 5 },
        'rec-2': { 'usr-1': 5, 'u2': 4, 'u3': 5, 'u4': 4 },
        'rec-3': { 'usr-1': 5, 'u2': 5, 'u3': 4, 'u4': 5 },
        'rec-4': { 'usr-1': 5, 'u2': 5, 'u3': 4, 'u4': 4, 'u5': 5 },
        'rec-5': { 'usr-1': 5, 'u2': 5, 'u3': 4, 'u4': 5 },
        'rec-6': { 'usr-1': 4, 'u2': 5, 'u3': 4, 'u4': 5 },
        'rec-7': { 'usr-1': 5, 'u2': 5, 'u3': 4, 'u4': 5 },
        'rec-8': { 'usr-1': 5, 'u2': 4, 'u3': 5, 'u4': 4 },
        'rec-9': { 'usr-1': 5, 'u2': 5, 'u3': 5, 'u4': 5, 'u5': 4 },
        'rec-10': { 'usr-1': 4, 'u2': 5, 'u3': 4, 'u4': 5 },
        'rec-11': { 'usr-1': 5, 'u2': 5, 'u3': 4, 'u4': 5 },
        'rec-12': { 'usr-1': 5, 'u2': 5, 'u3': 5, 'u4': 4 }
      };
      setStorage(STORAGE_KEYS.RATINGS, seedRatings);
    }

    // 5. Seed Sample User Submissions
    const existingSubmissions = getStorage(STORAGE_KEYS.SUBMISSIONS, null);
    if (!existingSubmissions) {
      const seedSubmissions = [
        {
          id: 'sub-1',
          name: 'Avocado Toast with Poached Egg',
          description: 'Crispy sourdough toast topped with seasoned smashed avocado, a perfectly runny poached egg, chili flakes, and microgreens.',
          cuisine: 'American',
          mealType: 'Breakfast',
          dietaryPreference: 'Vegetarian',
          prepTime: 10,
          cookTime: 5,
          servings: 2,
          difficulty: 'Easy',
          image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
          ingredients: ['2 Slices Sourdough bread', '1 Ripe Avocado', '2 Fresh Organic Eggs', '1 tsp White Vinegar', 'Chili flakes & sea salt'],
          instructions: ['Toast sourdough slices until crisp.', 'Mash avocado with lemon juice and salt.', 'Poach eggs in simmering water with vinegar for 3 minutes.', 'Spread avocado on toast and place poached eggs on top.'],
          submittedBy: 'Alex Morgan (alex@recipehub.com)',
          submittedAt: '2026-03-01',
          status: 'pending'
        },
        {
          id: 'sub-2',
          name: 'Authentic Thai Green Curry',
          description: 'Aromatic green curry paste simmered with rich coconut milk, bamboo shoots, Thai basil, and tender chicken.',
          cuisine: 'Asian',
          mealType: 'Dinner',
          dietaryPreference: 'Non-Vegetarian',
          prepTime: 20,
          cookTime: 20,
          servings: 4,
          difficulty: 'Medium',
          image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80',
          ingredients: ['400g Chicken thighs', '400ml Coconut Milk', '3 tbsp Green Curry Paste', '1 cup Bamboo shoots', 'Fresh Thai Basil'],
          instructions: ['Fry curry paste in 2 tbsp coconut cream until fragrant.', 'Add chicken and cook until opaque.', 'Pour in remaining coconut milk and simmer for 15 minutes.', 'Finish with Thai basil and fish sauce.'],
          submittedBy: 'Sam Foodie (sam@example.com)',
          submittedAt: '2026-03-02',
          status: 'pending'
        }
      ];
      setStorage(STORAGE_KEYS.SUBMISSIONS, seedSubmissions);
    }
  }

  /* ============================================================================
     4. TOAST NOTIFICATIONS
     ============================================================================ */
  function showToast(message, type = 'info', duration = 3200) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-hide');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, duration);
  }

  /* ============================================================================
     5. CHANGING FOOD HERO BANNER / SLIDER ENGINE
     ============================================================================ */
  let currentSlideIndex = 0;
  let slideInterval = null;
  const SLIDE_DURATION = 3500; // Changes automatically every 4.5 seconds

  function initBannerSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    if (slides.length === 0) return;

    function showSlide(index) {
      if (index >= slides.length) currentSlideIndex = 0;
      else if (index < 0) currentSlideIndex = slides.length - 1;
      else currentSlideIndex = index;

      slides.forEach((slide, idx) => {
        if (idx === currentSlideIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      dots.forEach((dot, idx) => {
        if (idx === currentSlideIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function nextSlide() {
      showSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
      showSlide(currentSlideIndex - 1);
    }

    function resetAutoSlide() {
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, SLIDE_DURATION);
    }

    // Previous Arrow Button
    const prevBtn = document.getElementById('slider-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
      });
    }

    // Next Arrow Button
    const nextBtn = document.getElementById('slider-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
      });
    }

    // Slider Dot Indicators
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const targetIndex = parseInt(e.target.getAttribute('data-slide-to'), 10);
        if (!isNaN(targetIndex)) {
          showSlide(targetIndex);
          resetAutoSlide();
        }
      });
    });

    // Pause slider on hover
    const sliderSection = document.getElementById('hero-slider-section');
    if (sliderSection) {
      sliderSection.addEventListener('mouseenter', () => {
        if (slideInterval) clearInterval(slideInterval);
      });
      sliderSection.addEventListener('mouseleave', () => {
        resetAutoSlide();
      });
    }

    // Initialize first slide and start auto timer
    showSlide(0);
    resetAutoSlide();
  }

  /* ============================================================================
     6. SESSION MANAGEMENT & STRICT ROLE ISOLATION
     ============================================================================ */
  function getCurrentUser() {
    return getStorage(STORAGE_KEYS.CURRENT_USER, null);
  }

  function getCurrentAdmin() {
    return getStorage(STORAGE_KEYS.CURRENT_ADMIN, null);
  }

  function setCurrentUser(user) {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_ADMIN);
    setStorage(STORAGE_KEYS.CURRENT_USER, user);
    updateNavigationUI();
  }

  function setCurrentAdmin(admin) {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    setStorage(STORAGE_KEYS.CURRENT_ADMIN, admin);
    updateNavigationUI();
  }

  function logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    updateNavigationUI();
    showToast('Logged out successfully.', 'info');
    window.location.hash = 'home';
  }

  function logoutAdmin() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_ADMIN);
    updateNavigationUI();
    showToast('Admin logged out successfully.', 'info');
    window.location.hash = 'home';
  }

  function updateNavigationUI() {
    const currentUser = getCurrentUser();
    const currentAdmin = getCurrentAdmin();

    const publicNav = document.getElementById('public-nav');
    const userNav = document.getElementById('user-nav');
    const adminNav = document.getElementById('admin-nav');

    closeMobileMenu();

    if (currentAdmin) {
      // ADMIN MODE
      if (publicNav) publicNav.classList.add('hidden');
      if (userNav) userNav.classList.add('hidden');
      if (adminNav) adminNav.classList.remove('hidden');

      const adminNameEl = document.getElementById('admin-display-name');
      const adminInitialEl = document.getElementById('admin-avatar-initial');
      const adminWelcomeHeadline = document.getElementById('admin-welcome-headline');

      const name = currentAdmin.name || currentAdmin.username;
      if (adminNameEl) adminNameEl.textContent = name;
      if (adminInitialEl) adminInitialEl.textContent = name[0].toUpperCase();
      if (adminWelcomeHeadline) adminWelcomeHeadline.textContent = `Welcome, ${name}!`;

      updateAdminPendingBadge();
    } else if (currentUser) {
      // USER MODE
      if (publicNav) publicNav.classList.add('hidden');
      if (userNav) userNav.classList.remove('hidden');
      if (adminNav) adminNav.classList.add('hidden');

      const userNameEl = document.getElementById('user-display-name');
      const userInitialEl = document.getElementById('user-avatar-initial');
      const userWelcomeHeadline = document.getElementById('user-welcome-headline');

      const name = currentUser.name || currentUser.username;
      if (userNameEl) userNameEl.textContent = name;
      if (userInitialEl) userInitialEl.textContent = name[0].toUpperCase();
      if (userWelcomeHeadline) userWelcomeHeadline.textContent = `Welcome to Recipe Hub, ${name}!`;

      updateUserSavedBadge();
    } else {
      // GUEST / PUBLIC MODE
      if (publicNav) publicNav.classList.remove('hidden');
      if (userNav) userNav.classList.add('hidden');
      if (adminNav) adminNav.classList.add('hidden');
    }
  }

  function updateUserSavedBadge() {
    const user = getCurrentUser();
    const badge = document.getElementById('saved-count-badge');
    const dashSavedCount = document.getElementById('user-stat-saved-count');

    if (!user) {
      if (badge) badge.textContent = '0';
      if (dashSavedCount) dashSavedCount.textContent = '0';
      return;
    }

    const savedMap = getStorage(STORAGE_KEYS.SAVED_RECIPES, {});
    const count = (savedMap[user.id] || []).length;

    if (badge) badge.textContent = count;
    if (dashSavedCount) dashSavedCount.textContent = count;
  }

  function updateAdminPendingBadge() {
    const badge = document.getElementById('admin-pending-badge');
    const statPending = document.getElementById('stat-pending-submissions');
    const submissions = getStorage(STORAGE_KEYS.SUBMISSIONS, []);
    const pendingCount = submissions.filter(s => (s.status || '').toLowerCase() === 'pending' || (s.status || '').toLowerCase() === 'pending approval').length;

    if (badge) badge.textContent = pendingCount;
    if (statPending) statPending.textContent = pendingCount;
  }

  /* ============================================================================
     7. HASH ROUTING & VIEW CONTROLLER
     ============================================================================ */
  let currentActiveView = 'home-view';
  let activeRecipeDetailId = null;

function showView(viewId, scrollToTop = true) {
  const views = document.querySelectorAll('.view-section');

  if (views.length === 0) return;

  // Hide EVERY view first
  views.forEach(view => {
    view.classList.remove('active');
    view.style.display = 'none';
  });

  // Show ONLY the requested view
  const target = document.getElementById(viewId);

  if (!target) {
    console.error('View not found:', viewId);
    return;
  }

  target.classList.add('active');
  target.style.display = 'block';
  currentActiveView = viewId;

  // Always move to the top AFTER the correct view is displayed
  if (scrollToTop) {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }

  updateNavLinksHighlight(viewId);
  closeMobileMenu();

  // Trigger re-renders based on view
  if (viewId === 'home-view') {
    renderHomeFeaturedRecipes();
  } else if (viewId === 'recipes-view') {
    renderPublicRecipes();
  } else if (viewId === 'user-dashboard-view') {
    renderUserDashboard();
  } else if (viewId === 'saved-recipes-view') {
    renderSavedRecipes();
  } else if (viewId === 'collections-view') {
    renderCollections();
  } else if (viewId === 'admin-dashboard-view') {
    renderAdminDashboard();
  } else if (viewId === 'admin-manage-recipes-view') {
    renderAdminRecipeTable();
  } else if (viewId === 'admin-submissions-view') {
    renderAdminSubmissionsTable();
  } else if (viewId === 'admin-ratings-view') {
    renderAdminRatingsAnalytics();
  }
}

  function updateNavLinksHighlight(activeViewId) {
    const routeMap = {
      'home-view': 'home',
      'recipes-view': 'recipes',
      'saved-recipes-view': 'saved-recipes',
      'collections-view': 'collections',
      'submit-recipe-view': 'submit-recipe',
      'user-dashboard-view': 'user-dashboard',
      'user-login-view': 'user-login',
      'admin-login-view': 'admin-login',
      'admin-dashboard-view': 'admin-dashboard',
      'admin-manage-recipes-view': 'admin-manage-recipes',
      'admin-add-recipe-view': 'admin-add-recipe',
      'admin-submissions-view': 'admin-submissions',
      'admin-ratings-view': 'admin-ratings'
    };

    const currentRoute = routeMap[activeViewId] || '';
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkRoute = link.getAttribute('data-route') || link.getAttribute('href')?.replace('#', '');
      if (linkRoute && linkRoute === currentRoute) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function handleHashRoute() {
    const hash = window.location.hash.replace('#', '').trim();

    // If viewing recipe details modal via hash
    if (hash.startsWith('recipe/')) {
      const recipeId = hash.replace('recipe/', '').trim();
      openRecipeModal(recipeId);
      return;
    }

    // Scroll targets on Home page
    if (hash === 'about' || hash === 'features' || hash === 'contact' || hash === 'modules-section') {
      showView('home-view', false);
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    switch (hash) {
      case 'home':
      case '':
        showView('home-view');
        break;
      case 'recipes':
        showView('recipes-view');
        break;
      case 'user-login':
        showView('user-login-view');
        break;
      case 'admin-login':
        showView('admin-login-view');
        break;
      case 'user-dashboard':
        if (!getCurrentUser()) {
          showToast('Please login to access User Dashboard.', 'error');
          showView('user-login-view');
        } else {
          showView('user-dashboard-view');
        }
        break;
      case 'saved-recipes':
        if (!getCurrentUser()) {
          showToast('Please login to view Saved Recipes.', 'error');
          showView('user-login-view');
        } else {
          showView('saved-recipes-view');
        }
        break;
      case 'collections':
        if (!getCurrentUser()) {
          showToast('Please login to access Collections.', 'error');
          showView('user-login-view');
        } else {
          showView('collections-view');
        }
        break;
      case 'submit-recipe':
        if (!getCurrentUser()) {
          showToast('Please login to submit a recipe.', 'error');
          showView('user-login-view');
        } else {
          showView('submit-recipe-view');
        }
        break;
      case 'admin-dashboard':
        if (!getCurrentAdmin()) {
          showToast('Admin authentication required.', 'error');
          showView('admin-login-view');
        } else {
          showView('admin-dashboard-view');
        }
        break;
      case 'admin-manage-recipes':
        if (!getCurrentAdmin()) {
          showView('admin-login-view');
        } else {
          showView('admin-manage-recipes-view');
        }
        break;
      case 'admin-add-recipe':
        if (!getCurrentAdmin()) {
          showView('admin-login-view');
        } else {
          showView('admin-add-recipe-view');
        }
        break;
      case 'admin-submissions':
        if (!getCurrentAdmin()) {
          showView('admin-login-view');
        } else {
          showView('admin-submissions-view');
        }
        break;
      case 'admin-ratings':
        if (!getCurrentAdmin()) {
          showView('admin-login-view');
        } else {
          showView('admin-ratings-view');
        }
        break;
      default:
        showView('home-view');
    }
  }

  /* ============================================================================
     8. RECIPE FILTER & MULTI-INGREDIENT SEARCH ENGINE
     ============================================================================ */
  function getFilteredRecipes() {
    const allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);

    const searchInput = document.getElementById('recipe-search-input');
    const ingredientInput = document.getElementById('ingredient-search-input');
    const cuisineSelect = document.getElementById('filter-cuisine');
    const dietSelect = document.getElementById('filter-diet');
    const mealSelect = document.getElementById('filter-meal');
    const sortSelect = document.getElementById('filter-sort');

    const searchKeyword = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const ingredientKeywords = ingredientInput ? 
      ingredientInput.value.trim().toLowerCase().split(',').map(s => s.trim()).filter(Boolean) : [];
    const selectedCuisine = cuisineSelect ? cuisineSelect.value : 'all';
    const selectedDiet = dietSelect ? dietSelect.value : 'all';
    const selectedMeal = mealSelect ? mealSelect.value : 'all';
    const selectedSort = sortSelect ? sortSelect.value : 'highest-rated';

    let filtered = allRecipes.filter(recipe => {
      // 1. Text Keyword Filter
      if (searchKeyword) {
        const titleMatch = recipe.name.toLowerCase().includes(searchKeyword);
        const descMatch = recipe.description.toLowerCase().includes(searchKeyword);
        const cuisineMatch = recipe.cuisine.toLowerCase().includes(searchKeyword);
        const ingMatch = recipe.ingredients.some(ing => ing.toLowerCase().includes(searchKeyword));
        if (!titleMatch && !descMatch && !cuisineMatch && !ingMatch) {
          return false;
        }
      }

      // 2. Multi-Ingredient Search ("What's in your kitchen?")
      if (ingredientKeywords.length > 0) {
        // Must contain at least one of the searched ingredients
        const hasMatchingIngredient = ingredientKeywords.some(keyword =>
          recipe.ingredients.some(ing => ing.toLowerCase().includes(keyword))
        );
        if (!hasMatchingIngredient) return false;
      }

      // 3. Cuisine Filter
      if (selectedCuisine !== 'all' && recipe.cuisine.toLowerCase() !== selectedCuisine.toLowerCase()) {
        return false;
      }

      // 4. Dietary Preference Filter
      if (selectedDiet !== 'all' && recipe.dietaryPreference.toLowerCase() !== selectedDiet.toLowerCase()) {
        return false;
      }

      // 5. Meal Type Filter
      if (selectedMeal !== 'all' && recipe.mealType.toLowerCase() !== selectedMeal.toLowerCase()) {
        return false;
      }

      return true;
    });

    // Ranking: if ingredient search is active, rank recipes with more matching ingredients first!
    if (ingredientKeywords.length > 0) {
      filtered.sort((a, b) => {
        const countA = ingredientKeywords.filter(k => a.ingredients.some(i => i.toLowerCase().includes(k))).length;
        const countB = ingredientKeywords.filter(k => b.ingredients.some(i => i.toLowerCase().includes(k))).length;
        return countB - countA;
      });
    } else {
      // Standard Sorting
      if (selectedSort === 'highest-rated') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (selectedSort === 'most-ratings') {
        filtered.sort((a, b) => b.ratingsCount - a.ratingsCount);
      } else if (selectedSort === 'shortest-prep') {
        filtered.sort((a, b) => a.prepTime - b.prepTime);
      } else if (selectedSort === 'alpha-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    return filtered;
  }

  /* ============================================================================
     9. RECIPE CARD HTML GENERATOR
     ============================================================================ */
  function generateRecipeCardHTML(recipe, options = {}) {
    const user = getCurrentUser();
    let isSaved = false;
    if (user) {
      const savedMap = getStorage(STORAGE_KEYS.SAVED_RECIPES, {});
      const userSaved = savedMap[user.id] || [];
      isSaved = userSaved.includes(recipe.id);
    }

    const { showRemoveSaved = false, showRemoveFromCollection = false, collectionId = null } = options;
    const prepTime = getRecipeTimeValue(recipe.prepTime);
    const cookTime = getRecipeTimeValue(recipe.cookTime);

    return `
      <article class="recipe-card" data-recipe-id="${recipe.id}">
        <div class="recipe-card-media">
          <img src="${recipe.image}" alt="${escapeHtml(recipe.name)}" class="recipe-card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'">
          <div class="recipe-card-badges">
            <span class="recipe-tag tag-cuisine">${recipe.cuisine}</span>
            <span class="recipe-tag tag-diet">${recipe.dietaryPreference}</span>
            <span class="recipe-tag tag-meal">${recipe.mealType}</span>
          </div>
          <button type="button" class="btn-save-recipe ${isSaved ? 'saved' : ''}" data-recipe-id="${recipe.id}" title="${isSaved ? 'Remove from Saved' : 'Save Recipe'}" aria-label="Save Recipe">
            <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>

        <div class="recipe-card-body">
          <h4 class="recipe-card-title">${escapeHtml(recipe.name)}</h4>
          <p class="recipe-card-desc">${escapeHtml(recipe.description)}</p>

          <div class="recipe-meta-row">
            ${prepTime === null ? '' : `<span class="recipe-meta-item">⏱️ Prep: ${prepTime}m</span>`}
            ${cookTime === null ? '' : `<span class="recipe-meta-item">🍳 Cook: ${cookTime}m</span>`}
            <div class="recipe-rating-badge">
              <span class="star-icon">★</span>
              <span>${Number(recipe.rating).toFixed(1)}</span>
              <span class="text-muted text-sm">(${recipe.ratingsCount})</span>
            </div>
          </div>

          <div class="recipe-card-footer">
            <button type="button" class="btn btn-primary-orange btn-view-recipe" data-recipe-id="${recipe.id}">
              View Recipe
            </button>
            ${showRemoveSaved ? `
              <button type="button" class="btn btn-outline-danger btn-sm btn-remove-saved" data-recipe-id="${recipe.id}">
                Remove
              </button>
            ` : ''}
            ${showRemoveFromCollection ? `
              <button type="button" class="btn btn-outline-danger btn-sm btn-remove-from-col" data-recipe-id="${recipe.id}" data-col-id="${collectionId}">
                Remove
              </button>
            ` : ''}
          </div>
        </div>
      </article>
    `;
  }

  // Render Home featured recipes teaser
  function renderHomeFeaturedRecipes() {
    const grid = document.getElementById('home-featured-recipe-grid');
    if (!grid) return;
    const allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);
    const featured = [...allRecipes].sort((a, b) => b.rating - a.rating).slice(0, 6);
    grid.innerHTML = featured.map(r => generateRecipeCardHTML(r)).join('');
  }

  // Render Public Recipe Catalog
  function renderPublicRecipes() {
    const grid = document.getElementById('public-recipe-grid');
    const countEl = document.getElementById('recipes-result-count');
    const emptyMsg = document.getElementById('no-recipes-found');
    const clearBtn = document.getElementById('search-clear-btn');
    const activeTagsContainer = document.getElementById('active-filter-tags');

    if (!grid) return;

    const filtered = getFilteredRecipes();
    if (countEl) countEl.textContent = `(${filtered.length})`;

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (emptyMsg) emptyMsg.classList.remove('hidden');
    } else {
      if (emptyMsg) emptyMsg.classList.add('hidden');
      grid.innerHTML = filtered.map(r => generateRecipeCardHTML(r)).join('');
    }

    // Toggle clear search cross button
    const searchVal = document.getElementById('recipe-search-input')?.value || '';
    if (clearBtn) {
      if (searchVal.trim()) clearBtn.classList.remove('hidden');
      else clearBtn.classList.add('hidden');
    }

    // Render active filter badges
    if (activeTagsContainer) {
      renderActiveFilterTags(activeTagsContainer);
    }
  }

  function renderActiveFilterTags(container) {
    const searchInput = document.getElementById('recipe-search-input');
    const ingredientInput = document.getElementById('ingredient-search-input');
    const cuisineSelect = document.getElementById('filter-cuisine');
    const dietSelect = document.getElementById('filter-diet');
    const mealSelect = document.getElementById('filter-meal');

    const tags = [];
    if (searchInput && searchInput.value.trim()) {
      tags.push({ label: `Query: "${searchInput.value.trim()}"`, type: 'search' });
    }
    if (ingredientInput && ingredientInput.value.trim()) {
      tags.push({ label: `Pantry: ${ingredientInput.value.trim()}`, type: 'ingredient' });
    }
    if (cuisineSelect && cuisineSelect.value !== 'all') {
      tags.push({ label: `Cuisine: ${cuisineSelect.value}`, type: 'cuisine' });
    }
    if (dietSelect && dietSelect.value !== 'all') {
      tags.push({ label: `Diet: ${dietSelect.value}`, type: 'diet' });
    }
    if (mealSelect && mealSelect.value !== 'all') {
      tags.push({ label: `Meal: ${mealSelect.value}`, type: 'meal' });
    }

    if (tags.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <span class="text-sm font-bold text-muted" style="align-self: center;">Active Filters:</span>
      ${tags.map(t => `
        <span class="filter-pill-tag">
          ${escapeHtml(t.label)}
          <button type="button" class="btn-remove-tag" data-tag-type="${t.type}" aria-label="Remove filter">&times;</button>
        </span>
      `).join('')}
    `;
  }

  function parseQuantityValue(value) {
    const quantityText = value === null || value === undefined ? '' : String(value).trim();
    const match = quantityText.match(/^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)$/);
    if (!match) return null;

    if (quantityText.includes(' ')) {
      const [whole, fraction] = quantityText.split(/\s+/);
      const [numerator, denominator] = fraction.split('/').map(Number);
      const quantity = Number(whole) + numerator / denominator;
      return Number.isFinite(quantity) ? quantity : null;
    }
    if (quantityText.includes('/')) {
      const [numerator, denominator] = quantityText.split('/').map(Number);
      const quantity = numerator / denominator;
      return Number.isFinite(quantity) ? quantity : null;
    }

    const quantity = Number(quantityText);
    return Number.isFinite(quantity) ? quantity : null;
  }

  function parseIngredientQuantity(ingredient) {
    if (ingredient && typeof ingredient === 'object') {
      const quantity = parseQuantityValue(ingredient.quantity);
      if (quantity === null || quantity < 0) return null;
      return {
        quantity,
        unit: ingredient.unit || '',
        name: ingredient.name || ingredient.ingredient || ''
      };
    }

    const text = String(ingredient || '');
    const match = text.match(/^\s*(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)\s*(.*)$/);
    if (!match) return null;

    const quantity = parseQuantityValue(match[1]);
    if (quantity === null) return null;
    return { quantity, unit: '', name: match[2].trim() };
  }

  function scaleQuantitiesInText(text, multiplier) {
    return String(text || '').replace(/\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?/g, (quantityText, offset, source) => {
      const previousCharacter = source[offset - 1];
      const followingText = source.slice(offset + quantityText.length);
      if ((previousCharacter && !/[\s:,(&]/.test(previousCharacter)) || !/^\s*[a-z]/i.test(followingText)) {
        return quantityText;
      }
      const quantity = parseQuantityValue(quantityText);
      return quantity === null ? quantityText : formatQuantity(quantity * multiplier);
    });
  }

  function formatQuantity(quantity) {
    const rounded = Math.round(quantity * 100) / 100;
    const whole = Math.floor(rounded);
    const fraction = Math.round((rounded - whole) * 100) / 100;
    const fractions = [
      [0.13, '⅛'], [0.25, '¼'], [0.33, '⅓'], [0.38, '⅜'],
      [0.5, '½'], [0.63, '⅝'], [0.67, '⅔'], [0.75, '¾'], [0.88, '⅞']
    ];
    const match = fractions.find(([value]) => Math.abs(fraction - value) < 0.015);

    if (match) return `${whole || ''}${whole ? ' ' : ''}${match[1]}`;
    return String(rounded);
  }

  function formatIngredient(ingredient, selectedServings, originalServings) {
    const multiplier = selectedServings / originalServings;
    const parsed = parseIngredientQuantity(ingredient);
    if (!parsed) {
      if (ingredient && typeof ingredient === 'object') {
        return scaleQuantitiesInText(ingredient.name || ingredient.ingredient || ingredient.text || '', multiplier);
      }
      return scaleQuantitiesInText(ingredient, multiplier);
    }

    const adjustedQuantity = parsed.quantity * multiplier;
    return [formatQuantity(adjustedQuantity), parsed.unit, scaleQuantitiesInText(parsed.name, multiplier)].filter(Boolean).join(' ');
  }

  function getInstructionDetails(instruction) {
    if (typeof instruction === 'string') {
      return { text: instruction, durationMinutes: null, overlapGroup: null, isEstimate: false };
    }
    if (!instruction || typeof instruction !== 'object') {
      return { text: String(instruction || ''), durationMinutes: null, overlapGroup: null, isEstimate: false };
    }

    const duration = getRecipeTimeValue(instruction.durationMinutes);
    return {
      text: instruction.text || instruction.description || '',
      durationMinutes: duration,
      overlapGroup: instruction.overlapGroup || null,
      isEstimate: instruction.isEstimate === true
    };
  }

  function parseInstructionLines(value) {
    return value.split('\n').map(line => line.trim()).filter(Boolean).map(line => {
      const durationMatch = line.match(/^(.*?)(?:\s+[—–-]\s+|\s+\(\s*)(\d+(?:\.\d+)?)\s*(?:min(?:ute)?s?)\s*\)?\s*$/i);
      if (!durationMatch || !durationMatch[1].trim()) return line;
      return {
        text: durationMatch[1].trim(),
        durationMinutes: Number(durationMatch[2]),
        isEstimate: true
      };
    });
  }

  function formatInstructionForEditor(instruction) {
    const details = getInstructionDetails(instruction);
    return details.durationMinutes === null
      ? details.text
      : `${details.text} — ${details.durationMinutes} min`;
  }

  function formatRecipeTime(minutes) {
    const time = getRecipeTimeValue(minutes);
    return time === null ? 'Not specified' : `${time} min`;
  }

  function getRecipeTimeValue(value) {
    if (value === null || value === undefined || value === '') return null;
    const minutes = Number(value);
    return Number.isFinite(minutes) && minutes >= 0 ? minutes : null;
  }

  function getOriginalServings(recipe) {
    const servings = Number(recipe.servings);
    return Number.isInteger(servings) && servings >= 1 ? servings : 1;
  }

  function getTotalStepTime(instructions) {
    const steps = instructions.map(getInstructionDetails);
    if (!steps.length || steps.some(step => step.durationMinutes === null)) return null;

    const overlapTotals = new Map();
    let total = 0;
    steps.forEach(step => {
      if (step.overlapGroup) {
        overlapTotals.set(step.overlapGroup, Math.max(overlapTotals.get(step.overlapGroup) || 0, step.durationMinutes));
      } else {
        total += step.durationMinutes;
      }
    });
    overlapTotals.forEach(duration => { total += duration; });
    return total;
  }

  function updateServingIngredients(input, restoreInvalidValue) {
    const servings = Number(input.value);
    const error = document.getElementById('serving-error');
    if (!Number.isInteger(servings) || servings < 1) {
      input.setAttribute('aria-invalid', 'true');
      if (error) error.textContent = 'Enter a whole number of 1 or more.';
      if (restoreInvalidValue) {
        input.value = input.dataset.lastValid || input.dataset.originalServings || '1';
        input.removeAttribute('aria-invalid');
        if (error) error.textContent = '';
      }
      return;
    }

    input.removeAttribute('aria-invalid');
    if (error) error.textContent = '';
    input.dataset.lastValid = String(servings);

    const recipeId = input.dataset.recipeId;
    const recipes = getStorage(STORAGE_KEYS.RECIPES, []);
    const recipe = Array.isArray(recipes) ? recipes.find(item => item.id === recipeId) : null;
    if (!recipe) return;
    const originalServings = getOriginalServings(recipe);
    const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
    document.querySelectorAll('#recipe-details-modal-body .ingredient-amount').forEach(amount => {
      const ingredientIndex = Number(amount.dataset.ingredientIndex);
      if (Number.isInteger(ingredientIndex) && ingredients[ingredientIndex] !== undefined) {
        amount.textContent = formatIngredient(ingredients[ingredientIndex], servings, originalServings);
      }
    });
  }

  /* ============================================================================
     10. 11. RECIPE DETAILS MODAL (POPUP ON "VIEW RECIPE")
     ============================================================================ */
  function openRecipeModal(recipeId) {
    const allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);
    const recipe = allRecipes.find(r => r.id === recipeId);

    if (!recipe) {
      showToast('Recipe not found.', 'error');
      return;
    }

    activeRecipeDetailId = recipeId;

    const modal = document.getElementById('recipe-details-modal');
    const body = document.getElementById('recipe-details-modal-body');
    const footer = document.getElementById('recipe-details-modal-footer');
    if (!modal || !body || !footer) return;

    const user = getCurrentUser();
    let isSaved = false;
    let userCurrentRating = null;

    if (user) {
      const savedMap = getStorage(STORAGE_KEYS.SAVED_RECIPES, {});
      const userSaved = savedMap[user.id] || [];
      isSaved = userSaved.includes(recipe.id);

      const ratingsMap = getStorage(STORAGE_KEYS.RATINGS, {});
      if (ratingsMap[recipe.id] && ratingsMap[recipe.id][user.id]) {
        userCurrentRating = ratingsMap[recipe.id][user.id];
      }
    }

    const originalServings = getOriginalServings(recipe);
    const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
    const instructions = Array.isArray(recipe.instructions) ? recipe.instructions : [];
    const prepTime = getRecipeTimeValue(recipe.prepTime);
    const cookTime = getRecipeTimeValue(recipe.cookTime);
    const storedTotalTime = getRecipeTimeValue(recipe.totalTime);
    const prepCookOverlap = getRecipeTimeValue(recipe.prepCookOverlapMinutes) || 0;
    const totalTime = storedTotalTime !== null
      ? storedTotalTime
      : prepTime !== null && cookTime !== null
        ? Math.max(0, prepTime + cookTime - Math.min(prepTime + cookTime, prepCookOverlap))
        : null;
    const totalStepTime = getTotalStepTime(instructions);

    // Modal Content
    body.innerHTML = `
      <div class="recipe-detail-hero">
        <img src="${recipe.image}" alt="${escapeHtml(recipe.name)}" class="recipe-detail-hero-img" onerror="this.src='https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'">
        <div class="recipe-detail-hero-overlay">
          <div class="recipe-detail-hero-badges">
            <span class="recipe-tag tag-cuisine">${recipe.cuisine}</span>
            <span class="recipe-tag tag-diet">${recipe.dietaryPreference}</span>
            <span class="recipe-tag tag-meal">${recipe.mealType}</span>
          </div>
          <h1 class="recipe-detail-hero-title">${escapeHtml(recipe.name)}</h1>
          <p class="recipe-detail-hero-desc">${escapeHtml(recipe.description)}</p>
        </div>
      </div>

      <div class="recipe-specs-bar">
        ${prepTime === null ? '' : `
          <div class="spec-item">
            <span class="spec-label">Prep Time</span>
            <span class="spec-val">⏱️ ${formatRecipeTime(prepTime)}</span>
          </div>
        `}
        ${cookTime === null ? '' : `
          <div class="spec-item">
            <span class="spec-label">Cook Time</span>
            <span class="spec-val">🍳 ${formatRecipeTime(cookTime)}</span>
          </div>
        `}
        ${totalTime === null ? '' : `
          <div class="spec-item">
            <span class="spec-label">Total Time</span>
            <span class="spec-val">⌛ ${formatRecipeTime(totalTime)}</span>
          </div>
        `}
        <div class="spec-item">
          <span class="spec-label">Servings</span>
          <span class="spec-val">👥 ${originalServings} People</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">Difficulty</span>
          <span class="spec-val">🔥 ${recipe.difficulty}</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">Rating</span>
          <span class="spec-val text-orange">★ ${Number(recipe.rating).toFixed(1)} (${recipe.ratingsCount})</span>
        </div>
      </div>

      <div class="recipe-detail-body">
        <!-- Ingredients Section -->
        <div class="ingredients-box">
          <h3 class="detail-section-title">
            <span>🛒</span> INGREDIENTS:
          </h3>
          <div class="serving-control">
            <label for="recipe-serving-input">Number of People</label>
            <div class="serving-control-inputs">
              <button type="button" class="serving-adjust-btn" data-serving-change="-1" aria-label="Decrease number of people">−</button>
              <input type="number" id="recipe-serving-input" min="1" step="1" value="${originalServings}" data-original-servings="${originalServings}" data-last-valid="${originalServings}" data-recipe-id="${escapeHtml(recipe.id)}" inputmode="numeric" aria-describedby="serving-error">
              <button type="button" class="serving-adjust-btn" data-serving-change="1" aria-label="Increase number of people">+</button>
            </div>
            <span class="serving-error" id="serving-error" role="status"></span>
          </div>
          <p class="text-sm text-muted ingredient-instruction">Check off ingredients as you prepare your dish:</p>
          <div class="ingredients-list">
            ${ingredients.map((ing, i) => `
              <label class="ingredient-item" for="detail-ing-${i}">
                <input type="checkbox" id="detail-ing-${i}">
                <span class="ingredient-amount" data-ingredient-index="${i}">${escapeHtml(formatIngredient(ing, originalServings, originalServings))}</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Step-by-Step Instructions Section -->
        <div class="instructions-box">
          <h3 class="detail-section-title">
            <span>👨‍🍳</span> INSTRUCTIONS:
          </h3>
          <p class="text-sm text-muted" style="margin-bottom: 14px;">Follow clear step-by-step instructions:${totalStepTime === null ? '' : ` Total step time: ${formatRecipeTime(totalStepTime)}.`}</p>
          <div class="instructions-list">
            ${instructions.map((step, idx) => {
              const details = getInstructionDetails(step);
              const duration = details.durationMinutes === null
                ? 'Time not specified'
                : `${details.isEstimate ? 'Estimated: ' : ''}${formatRecipeTime(details.durationMinutes)}`;
              return `
              <div class="instruction-step">
                <div class="step-number">Step ${idx + 1}</div>
                <div class="step-content">
                  <div class="step-text">${escapeHtml(details.text)}</div>
                  ${details.durationMinutes === null ? '' : `<span class="step-duration">${escapeHtml(duration)}</span>`}
                </div>
              </div>
            `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    // Modal Action Buttons (Save Recipe, Rate Recipe, Share Recipe)
    footer.innerHTML = `
      <div style="display: flex; gap: 10px; flex-wrap: wrap; width: 100%; justify-content: space-between;">
        <div style="display: flex; gap: 10px;">
          <button type="button" class="btn ${isSaved ? 'btn-danger' : 'btn-outline-dark'}" id="modal-save-btn" data-recipe-id="${recipe.id}">
            ${isSaved ? '❤️ Saved' : '🤍 Save Recipe'}
          </button>
          <button type="button" class="btn btn-outline-dark" id="modal-rate-btn" data-recipe-id="${recipe.id}">
            ⭐ ${userCurrentRating ? `Rated: ${userCurrentRating}★` : 'Rate Recipe'}
          </button>
          <button type="button" class="btn btn-outline-dark" id="modal-col-btn" data-recipe-id="${recipe.id}">
            📚 Add to Collection
          </button>
        </div>
        <div style="display: flex; gap: 10px;">
          <button type="button" class="btn btn-outline-orange" id="modal-share-btn" data-recipe-id="${recipe.id}">
            🔗 Share Recipe
          </button>
          <button type="button" class="btn btn-outline-dark" id="modal-close-action-btn">Close</button>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
  }

  function closeRecipeModal() {
    const modal = document.getElementById('recipe-details-modal');
    if (modal) modal.classList.add('hidden');
  }

  /* ============================================================================
     11. 12. SAVE / BOOKMARK RECIPE ENGINE
     ============================================================================ */
  function toggleSaveRecipe(recipeId) {
    const user = getCurrentUser();
    if (!user) {
      showAuthPromptModal({ action: 'save', recipeId });
      return;
    }

    const savedMap = getStorage(STORAGE_KEYS.SAVED_RECIPES, {});
    let userSaved = savedMap[user.id] || [];

    if (userSaved.includes(recipeId)) {
      // Remove
      userSaved = userSaved.filter(id => id !== recipeId);
      savedMap[user.id] = userSaved;
      setStorage(STORAGE_KEYS.SAVED_RECIPES, savedMap);
      showToast('Recipe removed from Saved Favorites.', 'info');
    } else {
      // Add
      userSaved.push(recipeId);
      savedMap[user.id] = userSaved;
      setStorage(STORAGE_KEYS.SAVED_RECIPES, savedMap);
      showToast('Recipe saved to your favorites! ❤️', 'success');
    }

    updateUserSavedBadge();

    // Re-render active views
    if (currentActiveView === 'recipes-view') renderPublicRecipes();
    if (currentActiveView === 'saved-recipes-view') renderSavedRecipes();
    if (currentActiveView === 'user-dashboard-view') renderUserDashboard();

    // Update modal button if currently open
    const modalSaveBtn = document.getElementById('modal-save-btn');
    if (modalSaveBtn && modalSaveBtn.getAttribute('data-recipe-id') === recipeId) {
      const nowSaved = userSaved.includes(recipeId);
      modalSaveBtn.className = `btn ${nowSaved ? 'btn-danger' : 'btn-outline-dark'}`;
      modalSaveBtn.innerHTML = nowSaved ? '❤️ Saved' : '🤍 Save Recipe';
    }
  }

  function renderSavedRecipes() {
    const user = getCurrentUser();
    const grid = document.getElementById('saved-recipe-grid');
    const emptyMsg = document.getElementById('no-saved-recipes');
    if (!grid) return;

    if (!user) {
      grid.innerHTML = '';
      if (emptyMsg) emptyMsg.classList.remove('hidden');
      return;
    }

    const savedMap = getStorage(STORAGE_KEYS.SAVED_RECIPES, {});
    const savedIds = savedMap[user.id] || [];
    const allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);

    const savedList = allRecipes.filter(r => savedIds.includes(r.id));

    if (savedList.length === 0) {
      grid.innerHTML = '';
      if (emptyMsg) emptyMsg.classList.remove('hidden');
    } else {
      if (emptyMsg) emptyMsg.classList.add('hidden');
      grid.innerHTML = savedList.map(r => generateRecipeCardHTML(r, { showRemoveSaved: true })).join('');
    }

    updateUserSavedBadge();
  }

  /* ============================================================================
     12. 13. 5-STAR RATING SYSTEM (DUPLICATE PREVENTION & AVERAGE RECALCULATION)
     ============================================================================ */
  let activeRatingRecipeId = null;
  let selectedRatingScore = 0;

  function openRatingModal(recipeId) {
    const user = getCurrentUser();
    if (!user) {
      showAuthPromptModal({ action: 'rate', recipeId });
      return;
    }

    const allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);
    const recipe = allRecipes.find(r => r.id === recipeId);
    if (!recipe) return;

    activeRatingRecipeId = recipeId;
    selectedRatingScore = 0;

    const modal = document.getElementById('rating-modal');
    const nameEl = document.getElementById('rating-recipe-name');
    const scoreLabel = document.getElementById('rating-score-label');
    const submitBtn = document.getElementById('rating-submit-btn');
    const noteEl = document.getElementById('rating-prevent-note');

    if (nameEl) nameEl.textContent = recipe.name;

    const ratingsMap = getStorage(STORAGE_KEYS.RATINGS, {});
    const recipeRatings = ratingsMap[recipeId] || {};
    const existingScore = recipeRatings[user.id];

    // Reset stars
    document.querySelectorAll('#interactive-star-picker .star-pick').forEach(star => {
      star.classList.remove('active');
    });

    if (existingScore) {
      selectedRatingScore = existingScore;
      highlightStars(existingScore);
      if (scoreLabel) scoreLabel.textContent = `Your current rating: ${existingScore} of 5 Stars`;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Update Rating';
      }
      if (noteEl) noteEl.textContent = 'You have already rated this recipe. You may update your rating.';
    } else {
      if (scoreLabel) scoreLabel.textContent = 'Select a rating (1 to 5 Stars)';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submit Rating';
      }
      if (noteEl) noteEl.textContent = 'Each user can submit one rating per recipe.';
    }

    if (modal) modal.classList.remove('hidden');
  }

  function highlightStars(score) {
    document.querySelectorAll('#interactive-star-picker .star-pick').forEach(star => {
      const val = parseInt(star.getAttribute('data-value'), 10);
      if (val <= score) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  function submitRating() {
    if (!activeRatingRecipeId || selectedRatingScore < 1 || selectedRatingScore > 5) return;
    const user = getCurrentUser();
    if (!user) return;

    const ratingsMap = getStorage(STORAGE_KEYS.RATINGS, {});
    if (!ratingsMap[activeRatingRecipeId]) {
      ratingsMap[activeRatingRecipeId] = {};
    }

    ratingsMap[activeRatingRecipeId][user.id] = selectedRatingScore;
    setStorage(STORAGE_KEYS.RATINGS, ratingsMap);

    // Recalculate average rating & count
    const scores = Object.values(ratingsMap[activeRatingRecipeId]);
    const count = scores.length;
    const avg = scores.reduce((sum, s) => sum + s, 0) / count;

    // Update in recipes array
    const allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);
    const recipeIndex = allRecipes.findIndex(r => r.id === activeRatingRecipeId);
    if (recipeIndex !== -1) {
      allRecipes[recipeIndex].rating = parseFloat(avg.toFixed(1));
      allRecipes[recipeIndex].ratingsCount = count;
      setStorage(STORAGE_KEYS.RECIPES, allRecipes);
    }

    showToast(`Rating of ${selectedRatingScore}★ saved! Thank you.`, 'success');
    document.getElementById('rating-modal')?.classList.add('hidden');

    // Refresh active views
    if (currentActiveView === 'recipes-view') renderPublicRecipes();
    if (currentActiveView === 'home-view') renderHomeFeaturedRecipes();
    if (currentActiveView === 'admin-ratings-view') renderAdminRatingsAnalytics();

    // If recipe details modal is open, re-open with fresh stats
    const detailsModal = document.getElementById('recipe-details-modal');
    if (detailsModal && !detailsModal.classList.contains('hidden') && activeRecipeDetailId === activeRatingRecipeId) {
      openRecipeModal(activeRatingRecipeId);
    }
  }

  /* ============================================================================
     13. 15. MY COLLECTIONS MANAGEMENT (CREATE, ADD, REMOVE, DELETE)
     ============================================================================ */
  let activeCollectionId = null;

  function renderCollections() {
    const user = getCurrentUser();
    const grid = document.getElementById('collections-cards-grid');
    const emptyMsg = document.getElementById('no-collections-msg');
    const mainContainer = document.getElementById('collections-main-container');
    const drilldownContainer = document.getElementById('single-collection-drilldown');

    if (!grid) return;
    if (mainContainer) mainContainer.classList.remove('hidden');
    if (drilldownContainer) drilldownContainer.classList.add('hidden');

    if (!user) {
      grid.innerHTML = '';
      if (emptyMsg) emptyMsg.classList.remove('hidden');
      return;
    }

    const collectionsMap = getStorage(STORAGE_KEYS.COLLECTIONS, {});
    const userCollections = collectionsMap[user.id] || [];

    if (userCollections.length === 0) {
      grid.innerHTML = '';
      if (emptyMsg) emptyMsg.classList.remove('hidden');
    } else {
      if (emptyMsg) emptyMsg.classList.add('hidden');
      grid.innerHTML = userCollections.map(col => `
        <div class="collection-card" data-col-id="${col.id}">
          <div class="collection-icon">📚</div>
          <div class="collection-content">
            <h3 class="collection-name">${escapeHtml(col.name)}</h3>
            <p class="collection-desc">${escapeHtml(col.description || 'Personal recipe collection')}</p>
            <div class="collection-meta">
              <span>🍽️ ${col.recipeIds ? col.recipeIds.length : 0} Recipes</span>
            </div>
            <div class="collection-actions">
              <button type="button" class="btn btn-outline-dark btn-sm btn-open-collection" data-col-id="${col.id}">
                Open Collection &rarr;
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm btn-delete-collection-card" data-col-id="${col.id}">
                Delete
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  function openCollectionDrilldown(colId) {
    const user = getCurrentUser();
    if (!user) return;

    const collectionsMap = getStorage(STORAGE_KEYS.COLLECTIONS, {});
    const userCollections = collectionsMap[user.id] || [];
    const col = userCollections.find(c => c.id === colId);
    if (!col) return;

    activeCollectionId = colId;

    const mainContainer = document.getElementById('collections-main-container');
    const drilldownContainer = document.getElementById('single-collection-drilldown');
    const nameEl = document.getElementById('drilldown-collection-name');
    const descEl = document.getElementById('drilldown-collection-desc');
    const grid = document.getElementById('single-collection-recipe-grid');
    const emptyMsg = document.getElementById('empty-collection-drilldown');

    if (mainContainer) mainContainer.classList.add('hidden');
    if (drilldownContainer) drilldownContainer.classList.remove('hidden');

    if (nameEl) nameEl.textContent = col.name;
    if (descEl) descEl.textContent = col.description || 'Personal recipe collection';

    const allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);
    const colRecipes = allRecipes.filter(r => (col.recipeIds || []).includes(r.id));

    if (!grid) return;
    if (colRecipes.length === 0) {
      grid.innerHTML = '';
      if (emptyMsg) emptyMsg.classList.remove('hidden');
    } else {
      if (emptyMsg) emptyMsg.classList.add('hidden');
      grid.innerHTML = colRecipes.map(r => generateRecipeCardHTML(r, {
        showRemoveFromCollection: true,
        collectionId: col.id
      })).join('');
    }
  }

  function createNewCollection(name, description = '') {
    const user = getCurrentUser();
    if (!user) return;

    const cleanName = name.trim();
    if (!cleanName) {
      showToast('Collection name cannot be empty.', 'error');
      return;
    }

    const collectionsMap = getStorage(STORAGE_KEYS.COLLECTIONS, {});
    if (!collectionsMap[user.id]) collectionsMap[user.id] = [];

    const newCol = {
      id: 'col-' + Date.now(),
      name: cleanName,
      description: description.trim(),
      recipeIds: []
    };

    collectionsMap[user.id].push(newCol);
    setStorage(STORAGE_KEYS.COLLECTIONS, collectionsMap);
    showToast(`Collection "${cleanName}" created!`, 'success');

    renderCollections();
    document.getElementById('create-collection-modal')?.classList.add('hidden');
  }

  function deleteCollection(colId) {
    const user = getCurrentUser();
    if (!user) return;

    const collectionsMap = getStorage(STORAGE_KEYS.COLLECTIONS, {});
    let userCollections = collectionsMap[user.id] || [];

    userCollections = userCollections.filter(c => c.id !== colId);
    collectionsMap[user.id] = userCollections;
    setStorage(STORAGE_KEYS.COLLECTIONS, collectionsMap);

    showToast('Collection deleted.', 'info');
    renderCollections();
  }

  function removeRecipeFromCollection(recipeId, colId) {
    const user = getCurrentUser();
    if (!user) return;

    const collectionsMap = getStorage(STORAGE_KEYS.COLLECTIONS, {});
    const userCollections = collectionsMap[user.id] || [];
    const col = userCollections.find(c => c.id === colId);
    if (!col) return;

    col.recipeIds = (col.recipeIds || []).filter(id => id !== recipeId);
    setStorage(STORAGE_KEYS.COLLECTIONS, collectionsMap);
    showToast('Recipe removed from collection.', 'info');

    openCollectionDrilldown(colId);
  }

  function openCollectionPickerModal(recipeId) {
    const user = getCurrentUser();
    if (!user) {
      showAuthPromptModal({ action: 'collection', recipeId });
      return;
    }

    const modal = document.getElementById('collection-picker-modal');
    const list = document.getElementById('collection-picker-list');
    if (!modal || !list) return;

    const collectionsMap = getStorage(STORAGE_KEYS.COLLECTIONS, {});
    const userCollections = collectionsMap[user.id] || [];

    if (userCollections.length === 0) {
      list.innerHTML = `<p class="text-sm text-muted">You don't have any collections yet. Create one below!</p>`;
    } else {
      list.innerHTML = userCollections.map(col => {
        const inCollection = (col.recipeIds || []).includes(recipeId);
        return `
          <div class="col-picker-item" style="display: flex; align-items: center; justify-content: space-between; padding: 10px; border-bottom: 1px solid var(--color-cream-border);">
            <div>
              <strong>${escapeHtml(col.name)}</strong>
              <span class="text-xs text-muted" style="display: block;">${col.recipeIds ? col.recipeIds.length : 0} recipes</span>
            </div>
            <button type="button" class="btn ${inCollection ? 'btn-danger' : 'btn-primary-orange'} btn-sm btn-toggle-recipe-in-col" data-col-id="${col.id}" data-recipe-id="${recipeId}">
              ${inCollection ? 'Remove' : '+ Add'}
            </button>
          </div>
        `;
      }).join('');
    }

    modal.classList.remove('hidden');
  }

  /* ============================================================================
     14. USER DASHBOARD OVERVIEW
     ============================================================================ */
  function renderUserDashboard() {
    const user = getCurrentUser();
    if (!user) return;

    updateUserSavedBadge();

    // Update Collections count
    const collectionsMap = getStorage(STORAGE_KEYS.COLLECTIONS, {});
    const userCollections = collectionsMap[user.id] || [];
    const colCountEl = document.getElementById('user-stat-col-count');
    if (colCountEl) colCountEl.textContent = userCollections.length;

    // Render Saved highlights preview (up to 3)
    const savedMap = getStorage(STORAGE_KEYS.SAVED_RECIPES, {});
    const savedIds = savedMap[user.id] || [];
    const allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);
    const savedRecipes = allRecipes.filter(r => savedIds.includes(r.id)).slice(0, 3);

    const previewGrid = document.getElementById('dash-saved-preview-grid');
    if (previewGrid) {
      if (savedRecipes.length === 0) {
        previewGrid.innerHTML = `
          <div style="grid-column: 1/-1; background: white; padding: 24px; border-radius: var(--radius-md); text-align: center; border: 1.5px dashed var(--color-cream-border);">
            <p class="text-muted" style="margin-bottom: 12px;">You haven't saved any recipes yet!</p>
            <a href="#recipes" class="btn btn-primary-orange btn-sm">Explore Recipes Now</a>
          </div>
        `;
      } else {
        previewGrid.innerHTML = savedRecipes.map(r => generateRecipeCardHTML(r)).join('');
      }
    }
  }

  /* ============================================================================
     15. 16. SUBMIT RECIPE (COMMUNITY WORKFLOW - STATUS: PENDING APPROVAL)
     ============================================================================ */
  function handleUserRecipeSubmission(e) {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) {
      showToast('Please login to submit recipes.', 'error');
      showView('user-login-view');
      return;
    }

    const name = document.getElementById('sub-recipe-name')?.value.trim();
    const desc = document.getElementById('sub-recipe-desc')?.value.trim();
    const cuisine = document.getElementById('sub-recipe-cuisine')?.value;
    const meal = document.getElementById('sub-recipe-meal')?.value;
    const diet = document.getElementById('sub-recipe-diet')?.value;
    const difficulty = document.getElementById('sub-recipe-difficulty')?.value || 'Medium';
    const prep = parseInt(document.getElementById('sub-recipe-prep')?.value, 10);
    const cook = parseInt(document.getElementById('sub-recipe-cook')?.value, 10);
    const servings = parseInt(document.getElementById('sub-recipe-servings')?.value, 10);
    const image = document.getElementById('sub-recipe-image')?.value.trim();
    const ingredientsRaw = document.getElementById('sub-recipe-ingredients')?.value.trim();
    const instructionsRaw = document.getElementById('sub-recipe-instructions')?.value.trim();

    if (!name || !desc || !cuisine || !meal || !diet || isNaN(prep) || isNaN(cook) || isNaN(servings) || !image || !ingredientsRaw || !instructionsRaw) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const ingredients = ingredientsRaw.split('\n').map(s => s.trim()).filter(Boolean);
    const instructions = parseInstructionLines(instructionsRaw);

    const newSubmission = {
      id: 'sub-' + Date.now(),
      name,
      description: desc,
      cuisine,
      mealType: meal,
      dietaryPreference: diet,
      difficulty,
      prepTime: prep,
      cookTime: cook,
      servings,
      image,
      ingredients,
      instructions,
      submittedBy: `${user.name || user.username} (${user.email})`,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'pending' // Pending Approval
    };

    const submissions = getStorage(STORAGE_KEYS.SUBMISSIONS, []);
    submissions.unshift(newSubmission);
    setStorage(STORAGE_KEYS.SUBMISSIONS, submissions);

    showToast('Recipe submitted successfully! Status: Pending Approval', 'success', 4000);
    document.getElementById('user-submit-recipe-form')?.reset();
    document.getElementById('sub-image-preview-container')?.classList.add('hidden');

    window.location.hash = 'user-dashboard';
  }

  /* ============================================================================
     16. 17. ADMIN DASHBOARD & STATISTICS (CALCULATED FROM LOCALSTORAGE)
     ============================================================================ */
  function renderAdminDashboard() {
    const admin = getCurrentAdmin();
    if (!admin) return;

    const allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);
    const allUsers = getStorage(STORAGE_KEYS.USERS, []);
    const allRatingsMap = getStorage(STORAGE_KEYS.RATINGS, {});
    const allSubmissions = getStorage(STORAGE_KEYS.SUBMISSIONS, []);

    // Calculate Total Ratings
    let totalRatingsCount = 0;
    Object.values(allRatingsMap).forEach(ratingsObj => {
      totalRatingsCount += Object.keys(ratingsObj).length;
    });

    // Calculate Pending Submissions
    const pendingCount = allSubmissions.filter(s => (s.status || '').toLowerCase() === 'pending' || (s.status || '').toLowerCase() === 'pending approval').length;

    // Update 4 Statistics Cards
    const elRecipes = document.getElementById('stat-total-recipes');
    const elUsers = document.getElementById('stat-total-users');
    const elRatings = document.getElementById('stat-total-ratings');
    const elPending = document.getElementById('stat-pending-submissions');

    if (elRecipes) elRecipes.textContent = allRecipes.length;
    if (elUsers) elUsers.textContent = allUsers.length;
    if (elRatings) elRatings.textContent = totalRatingsCount;
    if (elPending) elPending.textContent = pendingCount;

    updateAdminPendingBadge();

    // Render Recent Submissions Preview (up to 3)
    const recentSubmissionsList = document.getElementById('admin-recent-submissions-list');
    if (recentSubmissionsList) {
      if (allSubmissions.length === 0) {
        recentSubmissionsList.innerHTML = `<p class="text-muted text-sm">No submissions received yet.</p>`;
      } else {
        recentSubmissionsList.innerHTML = allSubmissions.slice(0, 3).map(sub => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--color-cream-border);">
            <div>
              <strong>${escapeHtml(sub.name)}</strong>
              <span class="text-xs text-muted" style="display: block;">By: ${escapeHtml(sub.submittedBy)} • ${sub.submittedAt}</span>
            </div>
            <span class="status-badge status-${(sub.status || 'pending').toLowerCase()}">${sub.status}</span>
          </div>
        `).join('');
      }
    }

    // Render Top Rated Snapshot (up to 3)
    const topRecipesList = document.getElementById('admin-top-recipes-list');
    if (topRecipesList) {
      const topRated = [...allRecipes].sort((a, b) => b.rating - a.rating).slice(0, 3);
      topRecipesList.innerHTML = topRated.map(rec => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--color-cream-border);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${rec.image}" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'">
            <div>
              <strong>${escapeHtml(rec.name)}</strong>
              <span class="text-xs text-muted" style="display: block;">${rec.cuisine} • ${rec.mealType}</span>
            </div>
          </div>
          <span class="text-orange font-bold text-sm">★ ${Number(rec.rating).toFixed(1)}</span>
        </div>
      `).join('');
    }
  }

  /* ============================================================================
     17. 18. ADMIN ADD RECIPE (INSTANT CATALOG PUBLISHING)
     ============================================================================ */
  function handleAdminAddRecipe(e) {
    e.preventDefault();
    const admin = getCurrentAdmin();
    if (!admin) {
      showToast('Admin authentication required.', 'error');
      showView('admin-login-view');
      return;
    }

    const name = document.getElementById('admin-recipe-name')?.value.trim();
    const desc = document.getElementById('admin-recipe-desc')?.value.trim();
    const cuisine = document.getElementById('admin-recipe-cuisine')?.value;
    const meal = document.getElementById('admin-recipe-meal')?.value;
    const diet = document.getElementById('admin-recipe-diet')?.value;
    const difficulty = document.getElementById('admin-recipe-difficulty')?.value || 'Medium';
    const prep = parseInt(document.getElementById('admin-recipe-prep')?.value, 10);
    const cook = parseInt(document.getElementById('admin-recipe-cook')?.value, 10);
    const servings = parseInt(document.getElementById('admin-recipe-servings')?.value, 10);
    const image = document.getElementById('admin-recipe-image')?.value.trim();
    const ingredientsRaw = document.getElementById('admin-recipe-ingredients')?.value.trim();
    const instructionsRaw = document.getElementById('admin-recipe-instructions')?.value.trim();

    if (!name || !desc || !cuisine || !meal || !diet || isNaN(prep) || isNaN(cook) || isNaN(servings) || !image || !ingredientsRaw || !instructionsRaw) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const ingredients = ingredientsRaw.split('\n').map(s => s.trim()).filter(Boolean);
    const instructions = parseInstructionLines(instructionsRaw);

    const newRecipe = {
      id: 'rec-' + Date.now(),
      name,
      description: desc,
      cuisine,
      mealType: meal,
      dietaryPreference: diet,
      difficulty,
      prepTime: prep,
      cookTime: cook,
      servings,
      image,
      ingredients,
      instructions,
      rating: 5.0,
      ratingsCount: 1
    };

    const allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);
    allRecipes.unshift(newRecipe);
    setStorage(STORAGE_KEYS.RECIPES, allRecipes);

    showToast(`Recipe "${name}" published immediately to catalog!`, 'success');
    document.getElementById('admin-add-recipe-form')?.reset();
    document.getElementById('admin-image-preview-container')?.classList.add('hidden');

    window.location.hash = 'admin-manage-recipes';
  }

  /* ============================================================================
     18. 19. ADMIN MANAGE RECIPES (TABLE SEARCH, EDIT, DELETE)
     ============================================================================ */
  function renderAdminRecipeTable() {
    const tbody = document.getElementById('admin-recipe-table-body');
    const emptyMsg = document.getElementById('admin-empty-table-msg');
    if (!tbody) return;

    const allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);
    const searchVal = document.getElementById('admin-recipe-table-search')?.value.trim().toLowerCase() || '';
    const cuisineFilter = document.getElementById('admin-table-cuisine-filter')?.value || 'all';

    const filtered = allRecipes.filter(r => {
      const matchSearch = !searchVal || r.name.toLowerCase().includes(searchVal) || r.cuisine.toLowerCase().includes(searchVal);
      const matchCuisine = cuisineFilter === 'all' || r.cuisine.toLowerCase() === cuisineFilter.toLowerCase();
      return matchSearch && matchCuisine;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = '';
      if (emptyMsg) emptyMsg.classList.remove('hidden');
    } else {
      if (emptyMsg) emptyMsg.classList.add('hidden');
      tbody.innerHTML = filtered.map(r => `
        <tr>
          <td>
            <img src="${r.image}" alt="${escapeHtml(r.name)}" class="table-thumb" onerror="this.src='https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'">
          </td>
          <td>
            <strong>${escapeHtml(r.name)}</strong>
          </td>
          <td>${r.cuisine}</td>
          <td>${r.mealType}</td>
          <td><span class="recipe-tag tag-diet" style="font-size: 0.75rem;">${r.dietaryPreference}</span></td>
          <td><span class="text-orange font-bold">★ ${Number(r.rating).toFixed(1)}</span></td>
          <td><span class="status-badge status-approved">Active</span></td>
          <td>
            <div class="table-actions">
              <button type="button" class="btn btn-outline-dark btn-sm btn-admin-view-recipe" data-recipe-id="${r.id}">View</button>
              <button type="button" class="btn btn-outline-primary btn-sm btn-admin-edit-recipe" data-recipe-id="${r.id}">Edit</button>
              <button type="button" class="btn btn-outline-danger btn-sm btn-admin-delete-recipe" data-recipe-id="${r.id}">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  }

  function openAdminEditRecipeModal(recipeId) {
    const allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);
    const recipe = allRecipes.find(r => r.id === recipeId);
    if (!recipe) return;

    document.getElementById('edit-recipe-id').value = recipe.id;
    document.getElementById('edit-recipe-name').value = recipe.name;
    document.getElementById('edit-recipe-desc').value = recipe.description;
    document.getElementById('edit-recipe-cuisine').value = recipe.cuisine;
    document.getElementById('edit-recipe-meal').value = recipe.mealType;
    document.getElementById('edit-recipe-diet').value = recipe.dietaryPreference;
    document.getElementById('edit-recipe-difficulty').value = recipe.difficulty;
    document.getElementById('edit-recipe-prep').value = recipe.prepTime;
    document.getElementById('edit-recipe-cook').value = recipe.cookTime;
    document.getElementById('edit-recipe-servings').value = recipe.servings;
    document.getElementById('edit-recipe-image').value = recipe.image;
    const servings = getOriginalServings(recipe);
    const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
    const instructions = Array.isArray(recipe.instructions) ? recipe.instructions : [];
    document.getElementById('edit-recipe-ingredients').value = ingredients.map(ingredient => formatIngredient(ingredient, servings, servings)).join('\n');
    document.getElementById('edit-recipe-instructions').value = instructions.map(formatInstructionForEditor).join('\n');

    document.getElementById('admin-edit-recipe-modal')?.classList.remove('hidden');
  }

  function handleAdminSaveEditRecipe(e) {
    e.preventDefault();
    const recipeId = document.getElementById('edit-recipe-id').value;
    const allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);
    const index = allRecipes.findIndex(r => r.id === recipeId);
    if (index === -1) return;

    allRecipes[index].name = document.getElementById('edit-recipe-name').value.trim();
    allRecipes[index].description = document.getElementById('edit-recipe-desc').value.trim();
    allRecipes[index].cuisine = document.getElementById('edit-recipe-cuisine').value;
    allRecipes[index].mealType = document.getElementById('edit-recipe-meal').value;
    allRecipes[index].dietaryPreference = document.getElementById('edit-recipe-diet').value;
    allRecipes[index].difficulty = document.getElementById('edit-recipe-difficulty').value;
    allRecipes[index].prepTime = parseInt(document.getElementById('edit-recipe-prep').value, 10) || 15;
    allRecipes[index].cookTime = parseInt(document.getElementById('edit-recipe-cook').value, 10) || 20;
    allRecipes[index].servings = parseInt(document.getElementById('edit-recipe-servings').value, 10) || 4;
    allRecipes[index].image = document.getElementById('edit-recipe-image').value.trim();
    allRecipes[index].ingredients = document.getElementById('edit-recipe-ingredients').value.split('\n').map(s => s.trim()).filter(Boolean);
    const previousInstructions = Array.isArray(allRecipes[index].instructions) ? allRecipes[index].instructions : [];
    allRecipes[index].instructions = parseInstructionLines(document.getElementById('edit-recipe-instructions').value).map((step, stepIndex) => {
      const previousStep = previousInstructions[stepIndex];
      if (typeof step !== 'string') {
        return previousStep && typeof previousStep === 'object' ? { ...previousStep, ...step } : step;
      }
      const details = getInstructionDetails(previousStep);
      if (details.durationMinutes === null) return step;
      return {
        ...previousStep,
        text: step,
        durationMinutes: details.durationMinutes,
        overlapGroup: details.overlapGroup,
        isEstimate: details.isEstimate
      };
    });

    setStorage(STORAGE_KEYS.RECIPES, allRecipes);
    showToast('Recipe updated successfully!', 'success');
    document.getElementById('admin-edit-recipe-modal')?.classList.add('hidden');

    renderAdminRecipeTable();
  }

  function deleteRecipe(recipeId) {
    let allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);
    allRecipes = allRecipes.filter(r => r.id !== recipeId);
    setStorage(STORAGE_KEYS.RECIPES, allRecipes);
    showToast('Recipe deleted from catalog.', 'info');
    renderAdminRecipeTable();
  }

  /* ============================================================================
     19. 20. ADMIN USER SUBMISSIONS (APPROVE, REJECT, VIEW)
     ============================================================================ */
  let activeSubFilter = 'all';

  function renderAdminSubmissionsTable() {
    const tbody = document.getElementById('admin-submissions-table-body');
    const emptyMsg = document.getElementById('no-submissions-msg');
    if (!tbody) return;

    const allSubmissions = getStorage(STORAGE_KEYS.SUBMISSIONS, []);
    const filtered = allSubmissions.filter(s => {
      if (activeSubFilter === 'all') return true;
      return (s.status || '').toLowerCase() === activeSubFilter;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = '';
      if (emptyMsg) emptyMsg.classList.remove('hidden');
    } else {
      if (emptyMsg) emptyMsg.classList.add('hidden');
      tbody.innerHTML = filtered.map(sub => `
        <tr>
          <td><strong>${escapeHtml(sub.name)}</strong></td>
          <td>${escapeHtml(sub.submittedBy)}</td>
          <td>${sub.submittedAt || 'N/A'}</td>
          <td><span class="status-badge status-${(sub.status || 'pending').toLowerCase()}">${sub.status}</span></td>
          <td>
            <div class="table-actions">
              <button type="button" class="btn btn-outline-dark btn-sm btn-sub-view" data-sub-id="${sub.id}">View</button>
              ${sub.status === 'pending' || sub.status === 'Pending Approval' ? `
                <button type="button" class="btn btn-primary-green btn-sm btn-sub-approve" data-sub-id="${sub.id}">Approve</button>
                <button type="button" class="btn btn-outline-danger btn-sm btn-sub-reject" data-sub-id="${sub.id}">Reject</button>
              ` : ''}
            </div>
          </td>
        </tr>
      `).join('');
    }
  }

  function approveSubmission(subId) {
    const submissions = getStorage(STORAGE_KEYS.SUBMISSIONS, []);
    const sub = submissions.find(s => s.id === subId);
    if (!sub) return;

    sub.status = 'Approved';
    setStorage(STORAGE_KEYS.SUBMISSIONS, submissions);

    // Add to main active recipes catalog so it is immediately visible to all users!
    const newRecipe = {
      id: 'rec-' + Date.now(),
      name: sub.name,
      description: sub.description,
      cuisine: sub.cuisine,
      mealType: sub.mealType,
      dietaryPreference: sub.dietaryPreference,
      difficulty: sub.difficulty || 'Medium',
      prepTime: sub.prepTime,
      cookTime: sub.cookTime,
      servings: sub.servings,
      image: sub.image,
      ingredients: sub.ingredients,
      instructions: sub.instructions,
      rating: 5.0,
      ratingsCount: 1
    };

    const allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);
    allRecipes.unshift(newRecipe);
    setStorage(STORAGE_KEYS.RECIPES, allRecipes);

    showToast(`Submission "${sub.name}" approved and published to catalog!`, 'success');
    renderAdminSubmissionsTable();
    updateAdminPendingBadge();
  }

  function rejectSubmission(subId) {
    const submissions = getStorage(STORAGE_KEYS.SUBMISSIONS, []);
    const sub = submissions.find(s => s.id === subId);
    if (!sub) return;

    sub.status = 'Rejected';
    setStorage(STORAGE_KEYS.SUBMISSIONS, submissions);

    showToast(`Submission "${sub.name}" rejected.`, 'info');
    renderAdminSubmissionsTable();
    updateAdminPendingBadge();
  }

  function openSubmissionPreviewModal(subId) {
    const submissions = getStorage(STORAGE_KEYS.SUBMISSIONS, []);
    const sub = submissions.find(s => s.id === subId);
    if (!sub) return;

    const modal = document.getElementById('submission-preview-modal');
    const body = document.getElementById('sub-preview-modal-body');
    const footer = document.getElementById('sub-preview-modal-footer');
    if (!modal || !body || !footer) return;

    body.innerHTML = `
      <div style="display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">
        <img src="${sub.image}" style="width: 200px; height: 140px; object-fit: cover; border-radius: 8px;" onerror="this.src='https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'">
        <div style="flex: 1;">
          <h2>${escapeHtml(sub.name)}</h2>
          <p class="text-muted">${escapeHtml(sub.description)}</p>
          <div style="margin-top: 8px; font-size: 0.85rem;">
            <span><strong>Cuisine:</strong> ${sub.cuisine}</span> | 
            <span><strong>Meal:</strong> ${sub.mealType}</span> | 
            <span><strong>Diet:</strong> ${sub.dietaryPreference}</span> | 
            <span><strong>Status:</strong> <span class="status-badge status-${(sub.status || 'pending').toLowerCase()}">${sub.status}</span></span>
          </div>
          <div class="text-xs text-muted" style="margin-top: 6px;">Submitted by: ${escapeHtml(sub.submittedBy)} on ${sub.submittedAt}</div>
        </div>
      </div>
      <div>
        <h4>Ingredients:</h4>
        <ul style="padding-left: 20px; margin-bottom: 16px;">
          ${sub.ingredients.map(i => `<li>${escapeHtml(i)}</li>`).join('')}
        </ul>
        <h4>Instructions:</h4>
        <ol style="padding-left: 20px;">
          ${sub.instructions.map(step => `<li>${escapeHtml(step)}</li>`).join('')}
        </ol>
      </div>
    `;

    footer.innerHTML = `
      <div style="display: flex; justify-content: space-between; width: 100%;">
        <button type="button" class="btn btn-outline-dark" id="preview-sub-close-btn">Close</button>
        <div style="display: flex; gap: 10px;">
          ${sub.status === 'pending' || sub.status === 'Pending Approval' ? `
            <button type="button" class="btn btn-outline-danger btn-modal-reject" data-sub-id="${sub.id}">Reject</button>
            <button type="button" class="btn btn-primary-green btn-modal-approve" data-sub-id="${sub.id}">Approve &amp; Publish</button>
          ` : ''}
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
  }

  /* ============================================================================
     20. 21. ADMIN RATINGS & DISTRIBUTION (PURE CSS DISTRIBUTION BARS)
     ============================================================================ */
  function renderAdminRatingsAnalytics() {
    const container = document.getElementById('admin-ratings-container');
    if (!container) return;

    const allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);
    const ratingsMap = getStorage(STORAGE_KEYS.RATINGS, {});

    container.innerHTML = allRecipes.map(recipe => {
      const recipeRatings = ratingsMap[recipe.id] || {};
      const scoreValues = Object.values(recipeRatings);
      const totalReviews = scoreValues.length || 1; // avoid divide by 0

      // Count stars 5, 4, 3, 2, 1
      const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      scoreValues.forEach(s => {
        const star = Math.max(1, Math.min(5, Math.round(s)));
        starCounts[star] = (starCounts[star] || 0) + 1;
      });

      // If no custom user ratings exist yet, simulate standard seed distribution
      if (scoreValues.length === 0) {
        starCounts[5] = Math.round(recipe.ratingsCount * 0.7);
        starCounts[4] = Math.round(recipe.ratingsCount * 0.2);
        starCounts[3] = Math.round(recipe.ratingsCount * 0.07);
        starCounts[2] = Math.round(recipe.ratingsCount * 0.02);
        starCounts[1] = Math.max(1, Math.round(recipe.ratingsCount * 0.01));
      }

      const totalCalculated = starCounts[5] + starCounts[4] + starCounts[3] + starCounts[2] + starCounts[1];

      return `
        <div class="rating-recipe-card">
          <div style="display: flex; gap: 14px; align-items: center; margin-bottom: 14px;">
            <img src="${recipe.image}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'">
            <div>
              <h4 style="font-size: 1.1rem; margin-bottom: 2px;">${escapeHtml(recipe.name)}</h4>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="text-orange font-bold text-sm">★ ${Number(recipe.rating).toFixed(1)} / 5.0</span>
                <span class="text-muted text-xs">(${recipe.ratingsCount} reviews)</span>
              </div>
            </div>
          </div>

          <!-- Pure CSS Rating Distribution Bars (5 Stars down to 1 Star) -->
          <div class="rating-distribution-block">
            ${[5, 4, 3, 2, 1].map(starNum => {
              const count = starCounts[starNum] || 0;
              const pct = Math.round((count / totalCalculated) * 100);
              return `
                <div class="rating-bar-row">
                  <span class="rating-bar-label">${starNum} Stars</span>
                  <div class="rating-bar-track">
                    <div class="rating-bar-fill" style="width: ${pct}%;"></div>
                  </div>
                  <span class="rating-bar-pct">${count} (${pct}%)</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  /* ============================================================================
     21. 22. SHARE RECIPE ENGINE (WEB SHARE API & CLIPBOARD COPY FALLBACK)
     ============================================================================ */
  function shareRecipe(recipeId) {
    const allRecipes = getStorage(STORAGE_KEYS.RECIPES, []);
    const recipe = allRecipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const shareUrl = window.location.origin + window.location.pathname + '#recipe/' + recipe.id;

    if (navigator.share) {
      navigator.share({
        title: `${recipe.name} - Recipe Hub`,
        text: `Discover how to make ${recipe.name} on Recipe Hub! "${recipe.description}"`,
        url: shareUrl
      }).catch(() => {});
    } else {
      // Clipboard Copy Fallback
      const recipeText = `${recipe.name} (${recipe.cuisine} • ${recipe.dietaryPreference})\n` +
        `Rating: ★ ${recipe.rating} | Prep: ${recipe.prepTime}m | Cook: ${recipe.cookTime}m\n\n` +
        `Ingredients:\n` + recipe.ingredients.map(i => `• ${i}`).join('\n') + `\n\n` +
        `Instructions:\n` + recipe.instructions.map((step, i) => `${i + 1}. ${step}`).join('\n') + `\n\n` +
        `Cook this dish on Recipe Hub: ${shareUrl}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(recipeText).then(() => {
          showToast('Recipe copied to clipboard! Ready to share.', 'success');
        }).catch(() => {
          showToast('Failed to copy to clipboard.', 'error');
        });
      } else {
        showToast('Clipboard copy not supported by your browser.', 'error');
      }
    }
  }

  /* ============================================================================
     22. GUEST LOGIN PROMPT MODAL
     ============================================================================ */
  function showAuthPromptModal(context = {}) {
    const modal = document.getElementById('auth-prompt-modal');
    const msgEl = document.getElementById('auth-prompt-message');
    const headlineEl = document.getElementById('auth-prompt-headline');
    if (!modal) return;

    if (context.action === 'save') {
      if (headlineEl) headlineEl.textContent = 'Save This Recipe';
      if (msgEl) msgEl.textContent = 'Please login to save recipes to your personal cooklist and favorites.';
    } else if (context.action === 'rate') {
      if (headlineEl) headlineEl.textContent = 'Rate This Recipe';
      if (msgEl) msgEl.textContent = 'Please login to submit your authentic 5-star rating for this dish.';
    } else if (context.action === 'collection') {
      if (headlineEl) headlineEl.textContent = 'Add to Collection';
      if (msgEl) msgEl.textContent = 'Please login to organize recipes into custom personal cookbooks.';
    }

    modal.classList.remove('hidden');
  }

  /* ============================================================================
     23. STANDALONE REGISTRATION PAGE (registration.html) LOGIC
     ============================================================================ */
  function initRegistrationPage() {
    const form = document.getElementById('standalone-register-form');
    if (!form) return; // Not on registration.html

    const selectedRoleInput = document.getElementById('selected-role');
    const successAlert = document.getElementById('registration-success-alert');
    const errorAlert = document.getElementById('registration-error-alert');

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('role') === 'admin') {
      if (errorAlert) {
        errorAlert.classList.remove('hidden');
        document.getElementById('error-alert-message').textContent = 'Administrator registration is restricted.';
      }
      form.hidden = true;
      return;
    }
    if (selectedRoleInput) selectedRoleInput.value = 'user';

    // Handle Form Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear field errors
      document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
      successAlert?.classList.add('hidden');
      errorAlert?.classList.add('hidden');

      const role = selectedRoleInput?.value || 'user';
      if (role !== 'user') {
        if (errorAlert) {
          errorAlert.classList.remove('hidden');
          document.getElementById('error-alert-message').textContent = 'Administrator registration is restricted.';
        }
        return;
      }
      const fullname = document.getElementById('reg-fullname')?.value.trim();
      const email = document.getElementById('reg-email')?.value.trim().toLowerCase();
      const username = document.getElementById('reg-username')?.value.trim().toLowerCase();
      const password = document.getElementById('reg-password')?.value;
      const confirm = document.getElementById('reg-confirm')?.value;

      let hasError = false;

      // Validate Full Name
      if (!fullname) {
        document.getElementById('reg-fullname-error').textContent = 'Please enter your full name.';
        hasError = true;
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        document.getElementById('reg-email-error').textContent = 'Please enter a valid email address.';
        hasError = true;
      }

      // Validate Username
      if (!username || username.length < 3) {
        document.getElementById('reg-username-error').textContent = 'Username must be at least 3 characters.';
        hasError = true;
      }

      // Validate Password
      if (!password || password.length < 6) {
        document.getElementById('reg-password-error').textContent = 'Password must be at least 6 characters.';
        hasError = true;
      }

      // Validate Confirm Password
      if (password !== confirm) {
        document.getElementById('reg-confirm-error').textContent = 'Passwords do not match.';
        hasError = true;
      }

      if (hasError) {
        if (errorAlert) {
          errorAlert.classList.remove('hidden');
          document.getElementById('error-alert-message').textContent = 'Please fix the errors indicated above.';
        }
        return;
      }

      // Check Duplicates in LocalStorage
      const users = getStorage(STORAGE_KEYS.USERS, []);
      if (users.some(u => u.username === username || u.email === email)) {
        if (errorAlert) {
          errorAlert.classList.remove('hidden');
          document.getElementById('error-alert-message').textContent = 'A user with this username or email already exists.';
        }
        return;
      }

      const newUser = {
        id: 'usr-' + Date.now(),
        name: fullname,
        email,
        username,
        password,
        createdAt: new Date().toISOString().split('T')[0]
      };

      users.push(newUser);
      setStorage(STORAGE_KEYS.USERS, users);

      // Initialize default empty collections & saved for new user
      const collections = getStorage(STORAGE_KEYS.COLLECTIONS, {});
      collections[newUser.id] = [
        { id: 'col-' + Date.now(), name: 'My Favorites', description: 'My favorite dishes', recipeIds: [] }
      ];
      setStorage(STORAGE_KEYS.COLLECTIONS, collections);

      if (successAlert) {
        successAlert.classList.remove('hidden');
        document.getElementById('success-alert-title').textContent = 'User Account Created!';
        document.getElementById('success-alert-message').textContent = `Welcome ${fullname}! Redirecting to Login in 2 seconds...`;
        document.getElementById('success-login-redirect-btn').setAttribute('href', '/#user-login');
      }

      setTimeout(() => {
        window.location.href = '/#user-login';
      }, 2200);
    });
  }

  /* ============================================================================
     24. EVENT LISTENERS SETUP
     ============================================================================ */
  function setupEventListeners() {
    // Hash Routing
    window.addEventListener('hashchange', handleHashRoute);

    // Mobile Hamburger Menu Toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        const navContainer = document.getElementById('nav-container');
        const isOpen = navContainer?.classList.toggle('open');
        mobileToggle.classList.toggle('open', isOpen);
        mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    // Recipe Search Inputs
    const recipeSearchInput = document.getElementById('recipe-search-input');
    if (recipeSearchInput) {
      recipeSearchInput.addEventListener('input', renderPublicRecipes);
    }

    const recipeSearchBtn = document.getElementById('recipe-search-btn');
    if (recipeSearchBtn) {
      recipeSearchBtn.addEventListener('click', renderPublicRecipes);
    }

    // 14. Ingredient Search ("What's in your kitchen?")
    const ingredientInput = document.getElementById('ingredient-search-input');
    const ingredientFindBtn = document.getElementById('ingredient-find-btn');
    if (ingredientFindBtn) {
      ingredientFindBtn.addEventListener('click', () => {
        renderPublicRecipes();
        showToast('Filtering recipes by your ingredients!', 'info');
      });
    }
    if (ingredientInput) {
      ingredientInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          renderPublicRecipes();
        }
      });
    }

    // Filter Dropdowns
    ['filter-cuisine', 'filter-diet', 'filter-meal', 'filter-sort'].forEach(id => {
      const select = document.getElementById(id);
      if (select) {
        select.addEventListener('change', renderPublicRecipes);
      }
    });

    // Reset Filters Button
    const resetFiltersBtn = document.getElementById('reset-filters-btn');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        if (recipeSearchInput) recipeSearchInput.value = '';
        if (ingredientInput) ingredientInput.value = '';
        ['filter-cuisine', 'filter-diet', 'filter-meal'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.value = 'all';
        });
        const sortEl = document.getElementById('filter-sort');
        if (sortEl) sortEl.value = 'highest-rated';

        renderPublicRecipes();
        showToast('All filters have been reset.', 'info');
      });
    }

    // Remove single filter tag
    document.addEventListener('click', (e) => {
      const tagRemoveBtn = e.target.closest('.btn-remove-tag');
      if (tagRemoveBtn) {
        const type = tagRemoveBtn.getAttribute('data-tag-type');
        if (type === 'search') document.getElementById('recipe-search-input').value = '';
        if (type === 'ingredient') document.getElementById('ingredient-search-input').value = '';
        if (type === 'cuisine') document.getElementById('filter-cuisine').value = 'all';
        if (type === 'diet') document.getElementById('filter-diet').value = 'all';
        if (type === 'meal') document.getElementById('filter-meal').value = 'all';
        renderPublicRecipes();
      }
    });

    // Global Click Handler for Recipe Actions (Delegation)
    document.addEventListener('click', (e) => {
      const servingAdjustBtn = e.target.closest('.serving-adjust-btn');
      if (servingAdjustBtn) {
        const servingInput = document.getElementById('recipe-serving-input');
        if (!servingInput) return;
        const currentServings = Number(servingInput.value);
        const baseline = Number(servingInput.dataset.lastValid) || Number(servingInput.dataset.originalServings) || 1;
        const nextServings = (Number.isInteger(currentServings) && currentServings >= 1 ? currentServings : baseline)
          + Number(servingAdjustBtn.dataset.servingChange);
        if (nextServings >= 1) {
          servingInput.value = String(nextServings);
          updateServingIngredients(servingInput, false);
        }
        return;
      }

      // 1. View Recipe Button
      const viewBtn = e.target.closest('.btn-view-recipe');
      if (viewBtn) {
        const recipeId = viewBtn.getAttribute('data-recipe-id');
        if (!getCurrentUser()) {
          showToast('Please login to view recipes.', 'error');
          window.location.hash = 'user-login';
          return;
        }
        if (recipeId) openRecipeModal(recipeId);
        return;
      }

      // 2. Save Recipe Button (on cards)
      const saveBtn = e.target.closest('.btn-save-recipe');
      if (saveBtn) {
        const recipeId = saveBtn.getAttribute('data-recipe-id');
        if (recipeId) toggleSaveRecipe(recipeId);
        return;
      }

      // 3. Remove Saved Button
      const removeSavedBtn = e.target.closest('.btn-remove-saved');
      if (removeSavedBtn) {
        const recipeId = removeSavedBtn.getAttribute('data-recipe-id');
        if (recipeId) toggleSaveRecipe(recipeId);
        return;
      }

      // 4. Modal Save Button
      const modalSaveBtn = e.target.closest('#modal-save-btn');
      if (modalSaveBtn) {
        const recipeId = modalSaveBtn.getAttribute('data-recipe-id');
        if (recipeId) toggleSaveRecipe(recipeId);
        return;
      }

      // 5. Modal Rate Button
      const modalRateBtn = e.target.closest('#modal-rate-btn');
      if (modalRateBtn) {
        const recipeId = modalRateBtn.getAttribute('data-recipe-id');
        if (recipeId) openRatingModal(recipeId);
        return;
      }

      // 6. Modal Collection Button
      const modalColBtn = e.target.closest('#modal-col-btn');
      if (modalColBtn) {
        const recipeId = modalColBtn.getAttribute('data-recipe-id');
        if (recipeId) openCollectionPickerModal(recipeId);
        return;
      }

      // 7. Modal Share Button
      const modalShareBtn = e.target.closest('#modal-share-btn');
      if (modalShareBtn) {
        const recipeId = modalShareBtn.getAttribute('data-recipe-id');
        if (recipeId) shareRecipe(recipeId);
        return;
      }

      // 8. Close Recipe Details Modal
      if (e.target.closest('#recipe-details-close-btn') || e.target.closest('#modal-close-action-btn')) {
        closeRecipeModal();
        return;
      }

      // 9. Interactive Rating Stars Picker
      const starPick = e.target.closest('.star-pick');
      if (starPick) {
        const val = parseInt(starPick.getAttribute('data-value'), 10);
        if (val) {
          selectedRatingScore = val;
          highlightStars(val);
          const scoreLabel = document.getElementById('rating-score-label');
          if (scoreLabel) scoreLabel.textContent = `Selected: ${val} of 5 Stars ★`;
          const submitBtn = document.getElementById('rating-submit-btn');
          if (submitBtn) submitBtn.disabled = false;
        }
        return;
      }

      // 10. Open Collection Drilldown
      const openColBtn = e.target.closest('.btn-open-collection');
      if (openColBtn) {
        const colId = openColBtn.getAttribute('data-col-id');
        if (colId) openCollectionDrilldown(colId);
        return;
      }

      // 11. Delete Collection Card
      const deleteColBtn = e.target.closest('.btn-delete-collection-card');
      if (deleteColBtn) {
        const colId = deleteColBtn.getAttribute('data-col-id');
        if (colId && confirm('Are you sure you want to delete this collection?')) {
          deleteCollection(colId);
        }
        return;
      }

      // 12. Remove Recipe from Collection
      const removeColRecipeBtn = e.target.closest('.btn-remove-from-col');
      if (removeColRecipeBtn) {
        const recipeId = removeColRecipeBtn.getAttribute('data-recipe-id');
        const colId = removeColRecipeBtn.getAttribute('data-col-id');
        if (recipeId && colId) removeRecipeFromCollection(recipeId, colId);
        return;
      }

      // 13. Toggle Recipe in Collection (Picker)
      const toggleInColBtn = e.target.closest('.btn-toggle-recipe-in-col');
      if (toggleInColBtn) {
        const colId = toggleInColBtn.getAttribute('data-col-id');
        const recipeId = toggleInColBtn.getAttribute('data-recipe-id');
        const user = getCurrentUser();
        if (colId && recipeId && user) {
          const collectionsMap = getStorage(STORAGE_KEYS.COLLECTIONS, {});
          const userCollections = collectionsMap[user.id] || [];
          const col = userCollections.find(c => c.id === colId);
          if (col) {
            if (!col.recipeIds) col.recipeIds = [];
            if (col.recipeIds.includes(recipeId)) {
              col.recipeIds = col.recipeIds.filter(id => id !== recipeId);
              showToast(`Removed from "${col.name}"`, 'info');
            } else {
              col.recipeIds.push(recipeId);
              showToast(`Added to "${col.name}"!`, 'success');
            }
            setStorage(STORAGE_KEYS.COLLECTIONS, collectionsMap);
            openCollectionPickerModal(recipeId);
          }
        }
        return;
      }

      // 14. Admin Actions (View, Edit, Delete)
      const adminViewBtn = e.target.closest('.btn-admin-view-recipe');
      if (adminViewBtn) {
        openRecipeModal(adminViewBtn.getAttribute('data-recipe-id'));
        return;
      }

      const adminEditBtn = e.target.closest('.btn-admin-edit-recipe');
      if (adminEditBtn) {
        openAdminEditRecipeModal(adminEditBtn.getAttribute('data-recipe-id'));
        return;
      }

      const adminDeleteBtn = e.target.closest('.btn-admin-delete-recipe');
      if (adminDeleteBtn) {
        const recId = adminDeleteBtn.getAttribute('data-recipe-id');
        if (confirm('Are you sure you want to delete this recipe from the catalog?')) {
          deleteRecipe(recId);
        }
        return;
      }

      // 15. Admin Submission Actions (Approve, Reject, View)
      const subApproveBtn = e.target.closest('.btn-sub-approve');
      if (subApproveBtn) {
        approveSubmission(subApproveBtn.getAttribute('data-sub-id'));
        return;
      }

      const subRejectBtn = e.target.closest('.btn-sub-reject');
      if (subRejectBtn) {
        rejectSubmission(subRejectBtn.getAttribute('data-sub-id'));
        return;
      }

      const subViewBtn = e.target.closest('.btn-sub-view');
      if (subViewBtn) {
        openSubmissionPreviewModal(subViewBtn.getAttribute('data-sub-id'));
        return;
      }

      const modalApproveBtn = e.target.closest('.btn-modal-approve');
      if (modalApproveBtn) {
        approveSubmission(modalApproveBtn.getAttribute('data-sub-id'));
        document.getElementById('submission-preview-modal')?.classList.add('hidden');
        return;
      }

      const modalRejectBtn = e.target.closest('.btn-modal-reject');
      if (modalRejectBtn) {
        rejectSubmission(modalRejectBtn.getAttribute('data-sub-id'));
        document.getElementById('submission-preview-modal')?.classList.add('hidden');
        return;
      }
    });

    document.addEventListener('input', (e) => {
      if (e.target.matches('#recipe-serving-input')) updateServingIngredients(e.target, false);
    });
    document.addEventListener('change', (e) => {
      if (e.target.matches('#recipe-serving-input')) updateServingIngredients(e.target, true);
    });

    // Rating Submit Button
    document.getElementById('rating-submit-btn')?.addEventListener('click', submitRating);
    document.getElementById('rating-modal-close-btn')?.addEventListener('click', () => {
      document.getElementById('rating-modal')?.classList.add('hidden');
    });
    document.getElementById('rating-cancel-btn')?.addEventListener('click', () => {
      document.getElementById('rating-modal')?.classList.add('hidden');
    });

    // Collection Modals
    document.getElementById('open-new-collection-modal-btn')?.addEventListener('click', () => {
      document.getElementById('create-collection-modal')?.classList.remove('hidden');
    });
    document.getElementById('create-first-collection-btn')?.addEventListener('click', () => {
      document.getElementById('create-collection-modal')?.classList.remove('hidden');
    });
    document.getElementById('create-col-modal-close-btn')?.addEventListener('click', () => {
      document.getElementById('create-collection-modal')?.classList.add('hidden');
    });
    document.getElementById('cancel-create-col-btn')?.addEventListener('click', () => {
      document.getElementById('create-collection-modal')?.classList.add('hidden');
    });
    document.getElementById('create-collection-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('new-col-name')?.value;
      const desc = document.getElementById('new-col-desc')?.value;
      createNewCollection(name, desc);
    });

    // Quick Add Collection in Picker
    document.getElementById('quick-create-col-btn')?.addEventListener('click', () => {
      const nameInput = document.getElementById('quick-new-col-name');
      const name = nameInput?.value.trim();
      if (!name) {
        showToast('Please enter a collection name.', 'error');
        return;
      }
      createNewCollection(name);
      nameInput.value = '';
    });
    document.getElementById('col-modal-close-btn')?.addEventListener('click', () => {
      document.getElementById('collection-picker-modal')?.classList.add('hidden');
    });
    document.getElementById('col-modal-done-btn')?.addEventListener('click', () => {
      document.getElementById('collection-picker-modal')?.classList.add('hidden');
    });

    // Collection Drilldown Back & Delete
    document.getElementById('back-to-all-collections-btn')?.addEventListener('click', renderCollections);
    document.getElementById('delete-current-collection-btn')?.addEventListener('click', () => {
      if (activeCollectionId && confirm('Are you sure you want to delete this collection?')) {
        deleteCollection(activeCollectionId);
        activeCollectionId = null;
      }
    });

    // User Recipe Submission Form
    document.getElementById('user-submit-recipe-form')?.addEventListener('submit', handleUserRecipeSubmission);

    // Image URL live test previews
    setupImagePreview('sub-recipe-image', 'sub-test-img-btn', 'sub-image-preview', 'sub-image-preview-container');
    setupImagePreview('admin-recipe-image', 'admin-test-img-btn', 'admin-image-preview', 'admin-image-preview-container');

    // Admin Add Recipe Form
    document.getElementById('admin-add-recipe-form')?.addEventListener('submit', handleAdminAddRecipe);

    // Admin Edit Recipe Form
    document.getElementById('admin-edit-recipe-form')?.addEventListener('submit', handleAdminSaveEditRecipe);
    document.getElementById('edit-modal-close-btn')?.addEventListener('click', () => {
      document.getElementById('admin-edit-recipe-modal')?.classList.add('hidden');
    });
    document.getElementById('edit-cancel-btn')?.addEventListener('click', () => {
      document.getElementById('admin-edit-recipe-modal')?.classList.add('hidden');
    });

    // Admin Table Search & Filter
    document.getElementById('admin-recipe-table-search')?.addEventListener('input', renderAdminRecipeTable);
    document.getElementById('admin-table-cuisine-filter')?.addEventListener('change', renderAdminRecipeTable);

    // Admin Submissions Filter Pills
    document.querySelectorAll('#submissions-filter-pills .pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('#submissions-filter-pills .pill-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        activeSubFilter = e.target.getAttribute('data-sub-filter');
        renderAdminSubmissionsTable();
      });
    });

    // Submission Preview Modal Close
    document.getElementById('sub-preview-close-btn')?.addEventListener('click', () => {
      document.getElementById('submission-preview-modal')?.classList.add('hidden');
    });

    // User Login Form
    document.getElementById('user-login-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const loginId = document.getElementById('user-login-id')?.value.trim().toLowerCase();
      const pass = document.getElementById('user-login-pass')?.value;
      const errorEl = document.getElementById('user-login-pass-error');

      const users = getStorage(STORAGE_KEYS.USERS, []);
      const matched = users.find(u => (u.username.toLowerCase() === loginId || u.email.toLowerCase() === loginId) && u.password === pass);

      if (matched) {
        if (errorEl) errorEl.textContent = '';
        setCurrentUser(matched);
        showToast(`Welcome back, ${matched.name || matched.username}! 👋`, 'success');
        window.location.hash = 'user-dashboard';
      } else {
        if (errorEl) errorEl.textContent = 'Invalid username/email or password.';
        showToast('Invalid login credentials.', 'error');
      }
    });

    // Admin Login Form
    document.getElementById('admin-login-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const loginId = document.getElementById('admin-login-id')?.value.trim().toLowerCase();
      const pass = document.getElementById('admin-login-pass')?.value;
      const errorEl = document.getElementById('admin-login-pass-error');

      const admins = getStorage(STORAGE_KEYS.ADMINS, []);
      const matched = admins.find(a => (a.username.toLowerCase() === loginId || a.email.toLowerCase() === loginId) && a.password === pass);

      if (matched) {
        if (errorEl) errorEl.textContent = '';
        setCurrentAdmin(matched);
        showToast(`Welcome Administrator, ${matched.name || matched.username}!`, 'success');
        window.location.hash = 'admin-dashboard';
      } else {
        if (errorEl) errorEl.textContent = 'Invalid administrator credentials.';
        showToast('Invalid admin credentials.', 'error');
      }
    });

    // User Demo Auto-Fill
    document.getElementById('fill-demo-user-btn')?.addEventListener('click', () => {
      const idEl = document.getElementById('user-login-id');
      const passEl = document.getElementById('user-login-pass');
      if (idEl) idEl.value = 'foodie';
      if (passEl) passEl.value = 'password123';
      showToast('Demo user credentials auto-filled.', 'info');
    });

    // Admin Demo Auto-Fill
    document.getElementById('fill-demo-admin-btn')?.addEventListener('click', () => {
      const idEl = document.getElementById('admin-login-id');
      const passEl = document.getElementById('admin-login-pass');
      if (idEl) idEl.value = 'admin';
      if (passEl) passEl.value = 'admin123';
      showToast('Demo admin credentials auto-filled.', 'info');
    });

    // Logout Buttons
    document.getElementById('user-logout-btn')?.addEventListener('click', logoutUser);
    document.getElementById('admin-logout-btn')?.addEventListener('click', logoutAdmin);
    document.getElementById('profile-logout-btn')?.addEventListener('click', () => {
      document.getElementById('user-profile-modal')?.classList.add('hidden');
      logoutUser();
    });

    // User Profile Modal
    document.getElementById('nav-user-profile-btn')?.addEventListener('click', () => {
      const user = getCurrentUser();
      if (!user) return;

      document.getElementById('profile-fullname').textContent = user.name || user.username;
      document.getElementById('profile-email').textContent = user.email;
      document.getElementById('profile-username').textContent = user.username;
      document.getElementById('profile-avatar-circle').textContent = (user.name || user.username)[0].toUpperCase();

      const savedMap = getStorage(STORAGE_KEYS.SAVED_RECIPES, {});
      const count = (savedMap[user.id] || []).length;
      document.getElementById('profile-saved-count').textContent = `${count} Recipes`;

      document.getElementById('user-profile-modal')?.classList.remove('hidden');
    });

    document.getElementById('user-profile-close-btn')?.addEventListener('click', () => {
      document.getElementById('user-profile-modal')?.classList.add('hidden');
    });
    document.getElementById('profile-close-btn')?.addEventListener('click', () => {
      document.getElementById('user-profile-modal')?.classList.add('hidden');
    });

    // Auth Prompt Modal Close
    document.getElementById('auth-prompt-close-btn')?.addEventListener('click', () => {
      document.getElementById('auth-prompt-modal')?.classList.add('hidden');
    });
    document.getElementById('auth-prompt-cancel-btn')?.addEventListener('click', () => {
      document.getElementById('auth-prompt-modal')?.classList.add('hidden');
    });

    // Show/Hide Password Toggle Buttons
    document.querySelectorAll('.toggle-password-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (input) {
          if (input.type === 'password') {
            input.type = 'text';
            btn.textContent = '🙈';
          } else {
            input.type = 'password';
            btn.textContent = '👁️';
          }
        }
      });
    });

    // Contact Form (Campus Information: KL University)
    document.getElementById('contact-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for reaching out to Recipe Hub at KL University! We will respond shortly.', 'success');
      document.getElementById('contact-form').reset();
    });

    // Close Modals on ESC Key or Backdrop Click
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
          modal.classList.add('hidden');
        });
      }
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.add('hidden');
        }
      });
    });
  }

  /* ============================================================================
     25. UTILITY & HELPER FUNCTIONS
     ============================================================================ */
  function setupImagePreview(inputId, btnId, imgId, containerId) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    const img = document.getElementById(imgId);
    const container = document.getElementById(containerId);

    if (btn && input && img && container) {
      btn.addEventListener('click', () => {
        const url = input.value.trim();
        if (url) {
          img.src = url;
          container.classList.remove('hidden');
        } else {
          showToast('Please enter an image URL first.', 'error');
        }
      });
    }
  }

  function closeMobileMenu() {
    const navContainer = document.getElementById('nav-container');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    if (navContainer) navContainer.classList.remove('open');
    if (mobileToggle) {
      mobileToggle.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ============================================================================
     26. INITIALIZE APPLICATION
     ============================================================================ */
  function init() {
    initializeDatabase();
    setupEventListeners();
    updateNavigationUI();

    // Check if on registration page
    initRegistrationPage();

    // Initialize Changing Food Banner Slider
    initBannerSlider();

    // Handle initial route
    handleHashRoute();

    console.log('%c🍳 Recipe Hub initialized successfully! "Discover. Cook. Share."', 'font-size: 14px; font-weight: bold; color: #ff6b35;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
