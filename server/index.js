require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  massive = require("massive"),
  session = require("express-session"),
  passport = require("passport"),
  Auth0Strategy = require("passport-auth0");
  path = require('path')
// fraction = require("fraction");
// con = require("./controller");

const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL,
  SUCCESS_REDIRECT,
  FAILURE_REDIRECT
} = process.env;

const app = express();
app.use(express.static(`${__dirname}/../build`));

app.use(bodyParser.json());

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());

app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope: "openid profile"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      const db = app.get("db");
      db.find_user([profile.id]).then(userResult => {
        if (!userResult[0]) {
          db
            .create_user([
              profile.name.givenName || profile.displayName,
              profile.id,
              profile.picture
            ])
            .then(createdUser => {
              return done(null, createdUser[0].id);
            });
        } else {
          return done(null, userResult[0].id);
        }
      });
    }
  )
);

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser((id, done) => {
  const db = app.get("db");
  db.find_session_user([id]).then(loggedInUser => {
    done(null, loggedInUser[0]);
  });
});

app.get("/auth", passport.authenticate("auth0"));
app.get(
  "/auth/callback",
  passport.authenticate("auth0", {
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT
  })
);

app.get("/auth/me", (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(401).send("Please Log In");
  }
});

app.get("/auth/logout", (req, res) => {
  req.logOut();
  res.redirect("http://localhost:3000/");
});

app.get("/recipes", (req, res) => {
  const db = app.get("db");

  db.get_recipes_names().then(recipes => {
    var promiseArray = [];
    recipes.forEach(recipe => {
      promiseArray.push(db.get_all_ingredients([recipe.id]));
    });
    Promise.all(promiseArray).then(resolvedArray => {
      // console.log(resolvedArray);
      // resolvedArray.forEach(resolvedThing=> {
      //   console.log(resolvedThing)
      // })

      // recipes.forEach((recipe, i) => {
      //   recipe[i].ingredients = resolvedArray[i]
      // })
      for (let i = 0; i < recipes.length; i++) {
        recipes[i].ingredients = resolvedArray[i];
      }

      // for(let i = 0; i < recipes.length; i++){
      //   var x =
      // }
      // console.log(recipes)
      // recipes[0].ingredients = resolvedArray[0]
      // recipes[1].ingredients = resolvedArray[1]
      res.status(200).send(recipes);
    });
  });
});

app.post("/recipes", async (req, res) => {
  const db = app.get("db");
  const { recipeName, ingredients, recipeImg } = req.body;
  // let ingredientId = []
  // const [recipe] = await db.find_add_recipeName([recipeName, recipeImg]);

  // const ingredientPromises = ingredients.map(ingredient =>
  //   db.find_add_ingredient([ingredient.item, ingredient.measurement])
  // );

  // const [resolvedIngredients] = await Promise.all(ingredientPromises);

  // const makeRecipes = resolvedIngredients.map((resolvedIngredient, i) => {
  //   return db.add_make_recipe([
  //     recipe.id,
  //     resolvedIngredient.id,
  //     ingredients[i].quantity
  //   ]);
  // });

  // const whatever = await Promise.all(makeRecipes);

  // res.status(200).send("Blam");
  var quantitys = [];
  var ingredIds = [];
  var makeRecipe = [];
  const recipeId = await db.find_add_recipeName([recipeName, recipeImg]);
  ingredients.forEach(ingredient => {
    quantitys.push(ingredient.quantity);
  });

  ingredients.forEach(ingredient => {
    ingredIds.push(
      db.find_add_ingredient([
        ingredient.item,
        ingredient.measurement,
        ingredient.img
      ])
    );
  });

  Promise.all(ingredIds).then(async resolvedIngredIds => {
    await resolvedIngredIds.map((resolvedId, i) => {
      makeRecipe.push(
        db.add_make_recipe([recipeId[0].id, resolvedId[0].id, quantitys[i]])
      );
    });

    Promise.all(makeRecipe).then(res.status(200).send("Blam"));
  });

  // await ingredients
  //   .map(async function(ingredient) {
  //     let resIngredientId = await db.find_add_ingredient([
  //       ingredient.item,
  //       ingredient.measurement
  //     ]);
  //     // ingredientId.push(resIngredientId[0].id)
  //     db.add_make_recipe([
  //       recipeId[0].id,
  //       resIngredientId[0].id,
  //       ingredient.quantity
  //     ]);
  //   })

  //get the recipe id
  // loop over all ingredients (just a lor loop or for each)
  // push each find_add_ingredint promise into an array
  // when all the promises int he array resolsve then we can loop agian to run add_make_recpie
  // push all those into anoher array
  // when all thsoe resolve then we can send data

  // console.log("end of function");
  // res.status(200).send("Blam");
});

app.delete("/recipes/:id", async (req, res) => {
  const db = app.get("db");
  db.delete_recipe([req.params.id]).then(() => res.status(200).send("done"));
});

app.post("/recipes/edit", (req, res) => {
let {make_recipe_recipe_id, make_recipe_id, ingredients_id, quantity} = req.body.updatedRecipe
const db = app.get("db");
req.body.updatedRecipe.forEach(ingredient => {
  db.update_quantity([ingredient.quantity,ingredient.make_recipe_recipe_id, ingredient.make_recipe_id])
})


res.status(200).send('Completed')


})

// app.get('/recipe', async (req, res) => {
//   const db = app.get("db");

// })
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(SERVER_PORT, () => {
  console.log(`${SERVER_PORT} Puppers Ready To Bork`);
});
