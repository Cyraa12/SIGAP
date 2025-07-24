import { registerRootComponent } from 'expo';

import App from './App';

<<<<<<< HEAD
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
=======
// use express json
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// use cors
const whitelist = ["http://192.168.194.153:8082", "https://ppdbm2mjkt2025.com"];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(express.static("uploads"));

// use router
app.use(router);

app.use(function (err, req, res, next) {
  if (err.code === "LIMIT_FILE_TYPES") {
    res.status(422).json({ error: "Only images are allowed" });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") { // <--- ini harusnya LIMIT_FILE_SIZE
    res.status(422).json({ error: `Too Large. Max size is ${MAX_SIZE / 1000}Kb` });
    return;
  }  
});
// Default route
app.get("/", function (req, res) {
  res.json({ message: "Welcome to api SIGAP" });
});

// Handle Route Not Found
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Handle Errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});


// PORT
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
>>>>>>> ee3aeb8 (BE FEI)
