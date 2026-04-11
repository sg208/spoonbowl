export const headings: string[] = [
  "Your fork called. It's ready.",
  "Dinner won't cook itself. Yet.",
  "Hungry? Same. Let's fix that.",
  "Warning: May cause sudden cooking.",
  "Your taste buds deserve a vacation.",
  "Good food. No excuses needed.",
  "Life's short. Eat the good stuff.",
  "Adventure begins in the kitchen.",
  "What are we making today?",
  "Spice up your life, literally.",
  "Let's get this bread — and the soup.",
  "Plates are just canvases here.",
  "Cooking is love you can eat.",
  "The secret ingredient is joy.",
  "Nothing sad about seconds here.",
  "Fork yeah, let's cook something!",
  "Your next favorite meal is here.",
  "Chefs are just food therapists.",
  "Eat like nobody's watching.",
  "Recipes so good they'll text back.",
  "Today's mood: hungry and inspired.",
  "You had me at 'serves 4'.",
  "Nap later. Eat now. Repeat.",
  "Flavors that hit different.",
  "Brunch is a lifestyle, not a meal.",
  "Every meal tells a story.",
  "Your stomach is calling. Answer it.",
  "Less cooking, more eating? Nope.",
  "Mise en place and good vibes.",
  "Where did all the groceries go?",
  "Sauté first, ask questions later.",
  "The kitchen is your happy place.",
  "Taste the rainbow, but make it real.",
  "Ready, set, cook!",
  "One more bite never hurt anyone.",
  "Today we dine like royalty.",
  "Feed your soul, not just your body.",
  "Kitchen hours are the best hours.",
  "Zero regrets, full stomach.",
  "Your grandma called, she's proud.",
  "Even the pan is excited today.",
  "Plot twist: you're a great cook.",
  "Stir things up a little.",
  "100% better than sad desk lunch.",
  "Smells like dinner is coming.",
  "From fridge to fabulous in minutes.",
  "New recipe, new personality.",
  "No boring meals on our watch.",
  "Dish it out, every single day.",
  "Low effort, high delicious.",
  "Trust the process, eat the results.",
  "Great cooking starts with great recipes.",
  "The world is your sauté pan.",
  "Spoiler: it's going to taste amazing.",
  "More herbs, fewer problems.",
  "Elevate your weeknight game.",
  "Because cereal isn't dinner.",
  "Cooking: cheaper than therapy.",
  "Let the recipe do the talking.",
  "Your pantry is full of potential.",
  "Turn that fridge into a feast.",
  "Eating well is living well.",
  "Meals worth getting up for.",
  "Drool-worthy recipes, right here.",
  "Life begins after breakfast.",
  "A recipe a day keeps sadness away.",
  "Serving happiness, one dish at a time.",
  "No passport needed. Just a pan.",
  "Global flavors, your kitchen.",
  "Big flavors. Minimal drama.",
  "Your next obsession starts here.",
  "Make it. Eat it. Love it.",
  "The best table is yours.",
  "Tonight's menu: something amazing.",
  "Dinner just got an upgrade.",
  "Let's turn up the flavor dial.",
  "Hungry eyes? You've come to the right place.",
  "Less takeout, more takeaway ideas.",
  "New dish, new tradition.",
  "Cook with confidence. Eat with joy.",
  "Where every meal is a celebration.",
  "The kitchen called, it wants you back.",
  "Season to taste, season to live.",
  "Forget sad salads. Hello, flavor.",
  "Your meal plan was waiting for this.",
  "You're one recipe away from happy.",
  "Some people dream of flying. We dream of eating.",
  "Good meals are made, not ordered.",
  "Pick a recipe. Any recipe.",
  "Because you deserve a home-cooked meal.",
  "Chop. Sauté. Devour. Repeat.",
  "The ultimate cure for hanger.",
  "Every cuisine, every craving.",
  "Dinner just texted. It's on its way.",
  "Unlock your inner chef today.",
  "Happiness is homemade.",
  "From scratch, with love.",
  "Cook now, thank yourself later.",
  "Because food is the best language.",
  "This is where good meals are born.",
]

export const recipeSectionHeadings: string[] = [
  "Four Recipes Enter, One Dinner Leaves.",
  "Tonight's Tiny But Mighty Menu.",
  "Chef's Lucky Four.",
  "Dinner Speedrun: Top 4 Picks.",
  "Four Recipes, Zero Drama.",
  "Plot Twist: You Can Cook.",
  "Your Fridge's Favorite Four.",
  "Fast Lane Flavor Picks.",
  "Only Four, All Bangers.",
  "What To Cook When Life Is Loud.",
  "The No-Overthinking Four.",
  "Four Ways To Avoid Sad Toast.",
  "Meal Ideas That Do Not Judge.",
  "Dinner Answers, Not Questions.",
  "Four Picks For Hungry Legends.",
  "Pick One, Brag Later.",
  "Tiny Grid, Big Appetite.",
  "Quick Picks, Big Fork Energy.",
  "The I-Need-Food-Now Four.",
  "Minimal Scroll, Maximum Yum.",
  "Four Recipes That Understood The Assignment.",
  "Calm Mind, Hot Pan, Four Picks.",
  "Emergency Dinner Kit (4-Pack).",
  "Your Hunger's Shortlist.",
  "Cookbook Cliff Notes: Four Hits.",
  "Dinner, But Make It Efficient.",
  "Four Recipes You Can Totally Pull Off.",
  "The Snack Prevention Program.",
  "Handpicked By Chaos, Approved By Taste Buds.",
  "Your Stomach Sent These.",
  "Four Picks For Main Character Meals.",
  "The Anti-Takeout Quartet.",
  "Fast, Tasty, Slightly Unhinged.",
  "Four Meals, Infinite Confidence.",
  "Tonight's Panic-Proof Picks.",
  "The Weeknight Hero Bundle.",
  "Hunger Hotline: Press Any Recipe.",
  "Four Dishes, One Happy Kitchen.",
  "The Delicious Shortcut List.",
  "Meals That Beat Cereal For Dinner.",
  "Fork-Approved Finalists.",
  "The Flavor Starter Pack.",
  "Four Recipes To Flex Softly.",
  "Low Effort, Loud Flavor.",
  "The Cook-It-And-Crush-It Four.",
  "Dinner Ideas With Good Vibes Only.",
  "Four Recipes That Text Back.",
  "What We Are Pretending Is Meal Prep.",
  "The Four You Were Looking For.",
  "Certified Yum, Limited Scroll Edition.",
]

const pickRandomItem = <T>(items: T[]): T | null => {
  if (items.length === 0) return null
  return items[Math.floor(Math.random() * items.length)] ?? null
}

export const getRandomHeading = (): string => {
  return pickRandomItem(headings) ?? "Good food. No excuses needed."
}

type SessionRandomTextParams = {
  sessionKey: string
  texts: string[]
  fallback: string
}

export const getSessionRandomText = ({
  sessionKey,
  texts,
  fallback,
}: SessionRandomTextParams): string => {
  const randomText = pickRandomItem(texts) ?? fallback
  if (typeof window === "undefined") return randomText

  try {
    const savedText = window.sessionStorage.getItem(sessionKey)
    if (savedText && texts.includes(savedText)) {
      return savedText
    }
    try {
      window.sessionStorage.setItem(sessionKey, randomText)
    } catch {
      // setItem failed; proceed to return randomText
    }
  } catch {
    // getItem failed; proceed to return randomText
  }
  return randomText
}
