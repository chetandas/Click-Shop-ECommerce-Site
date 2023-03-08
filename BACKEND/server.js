//this is the backend file
const dotenv = require("dotenv"); //dotenv is used to hide all the credentials lyk database password,ids etc...
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors"); //this is for middleware
var bcrypt = require("bcrypt"); //this is for hashing passwords
const app = express(); //this is lyk assume instance using which we place all our request on different routes
const mysql = require("mysql2"); //this is for including mysql database
/*we need express session for storing the data i.e we are using usestate for managing the login and we are setting the login status 
and all using state so now assume if user clicks login we are storing his info in usestate but as soon as we referesh the page
the info is lost we dont want that to happen so store the info until user logs out for that we need sessions*/
const session = require("express-session");
const cookieparser = require("cookie-parser");
dotenv.config({ path: "./config.env" }); //this includes our .env file by mentioning our path

//this is payment gateway
const Stripe = require("stripe");
const stripe = Stripe(process.env.stripe_key);

//this is the syntax for cors if we use sessions
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
); // Use this after the variable declaration and this is for middleware

app.use(cookieparser());

//this is maintaing sessions
app.use(
  session({
    key: process.env.session_key,
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: false,
  })
);

// view engine
app.set("views", "./views"); //express.static(path.join(__dirname, 'views')))
app.set("view engine", "ejs");

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//now we will declare a variable using which we will make all the connections and queries and all
const db = mysql.createConnection({
  //create a connection with sql database
  user: process.env.db_user,
  host: process.env.db_host,
  password: process.env.db_pwd,
  database: process.env.db_name,
});
if (db) {
  //if connection made then display success
  console.log("connection successfull");
} //else display failed
else {
  console.log("database connection failed");
}

const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
//syntax is we need to mention the route in express for api request

/* 1->adding user data into databse when the user registers on the website 
now to add any data into the database we need to make a post request 
the path is 'adduser'*/
//now in this post method along with path we have request and response
//request is the data sent from the frontend and the reponse is the data sent to frontend from backend
app.post("/adduser", (req, res) => {
  //now to insert data we need to write sql insert query and for that we use variable defined called 'db'
  //in the registration form we have name,email,phone,password... all these are present in req.body
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  // const password=await bcrypt.hash(req.body.password,10);
  // console.log(password);

  /*now we will hash the password and send it to database this will have the password uh want to has and salt rounds
  and it also calls a callback func(err,hash) which has error and hash=hashedpwd*/
  bcrypt.hash(password, 10, (err, hash) => {
    //if der is any error we will see the error
    if (err) {
      console.log(err);
    } else {//insert that into database
      //now write insert query to insert the data into the database
      const q =
        "INSERT INTO users (name, email, phone, password) VALUES(?, ?, ?, ?)";
      /*sql queries inturn call a callback function error and data to display the status after 
        executing the query*/
      db.query(q, [name, email, phone, hash], (error, data) => {
        if (error) {
          //if there is any error then display the error message
          console.log(error);
        } else {
          //if no error then send a successfull msg to frontend
          // console.log("registration done");
          res.send("User Registered Successfully");
        }
      });
    }
  });
});

/*
2->getting users details from database
now to get user data from database we need to make a get request... the path is '/getusers' 
now in this post method along with path we have request and response
request is the data sent from the frontend and the reponse is the data sent to frontend from backend
 */
app.get("/getusers", (req, res) => {
  //now we need to write sql query to get details so for that we use db to make queries
  const q = "SELECT * FROM users";
  db.query(q, (error, data) => {
    //query inturn returns a callback function which contains error and data
    if (error) {
      //if there is any error then send error msg to frontend
      res.send("Oops Somethin went wrong!! Please Try Again");
    } //if no error then send the retrieved data to frontend
    else {
      res.send(data);
    }
  });
});

/*
3->login function for the user... for this firstly we need to verify whether the entered credentials match or not
so we will using post method in this and search for the user in the database and if we find a match we will
be sending that to our frontend part
*/
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const q = "SELECT * FROM users WHERE email=?";
  db.query(q,email,(error, data) => {
    if (error) {
      res.send({ error: "Something went wrong Please try again!!" });
    }
    if (data.length > 0) {
      //if the user is found
      //here when we verify that the user entered valid login details we create a session variable called user and store his data
      bcrypt.compare(password,data[0].password,(err,result)=>{
        if(result)
        {
            req.session.user = data;
            res.send(data);
        }
        else
        {
            res.send({message:"Invalid Login Credentials"});
        }
      })
    } 
    //if the user is not found it means the entered credentials are not valid so send a msg to the user
    else {
      res.send({ message:"User Doesn't Exist" });
    }
  });
});

/* 4->our categories.... we need to fetch the categories in home page so for that we need to fetch the details from database
so we will make a get request to get the data so for that mention a path i.e 'categories'*/
app.get("/categories", (req, res) => {
  //now we need to write a sql query to fetch the data
  const q = "SELECT * FROM category";
  //query will call a callback func which has error and data
  db.query(q, (error, data) => {
    if (error) {
      //if der is any error send a error msg to client
      res.send({ message: "Something went wrong" });
    } //if no error send the data to client
    else {
      res.send(data);
    }
  });
});

/*5->top products... we need to fetch top 12 products randomnly in home so for that we need to fetch 12 products from database
so we will make a get request to get the data and for that we mention a path i.e 'topproducts'*/
app.get("/topproducts", (req, res) => {
  //this is the query to fetch randomly 12 records from table
  const q = "SELECT * FROM products ORDER BY RAND() LIMIT 12";
  //now we execute the query which will call a callback func having error and data
  db.query(q, (error, data) => {
    if (error) {
      //if der is any error send a error msg to client
      res.send(error);
    } //if no error send the data to client
    else {
      res.send(data);
    }
  });
});

/*6->in single product page we need to display the one specific product that user wants to view for that we need its id so 
we send id of the product along with path url from frontend*/
app.get("/getproduct/:id", (req, res) => {
  const { id } = req.params; //to get the id from the url we use params and we destructure it using {}
  const q = "SELECT * FROM products WHERE product_id=?";
  db.query(q, id, (error, data) => {
    //as we have nly single element no array is required
    if (error) {
      //if der is any error send dat to error to client
      res.send(error);
    }
    if (data.length <= 0) {
      //if no product is found den send dat msg to client
      res.send({ message: "Product Not Found" });
    } //else send the product data to client
    else {
      res.send(data);
    }
  });
});

/*7-> getting all products so that we can display them in products page so far that we need to fetch all product details from 
database and the path we use for it is '/getproducts'*/
app.get("/getproducts", (req, res) => {
  const q = "SELECT * FROM products"; //will select all products from products table
  db.query(q, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

/*8->getting all categories to display them in products page so for that we need to fetch them from categories table
 */
app.get("/getcategories", (req, res) => {
  const q = "SELECT category_name FROM category";
  db.query(q, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

/*9-> getting all brands i.e when we load products page by default the category is set to all so we need all products brands
 */
app.get("/getallbrands", (req, res) => {
  const q = "SELECT DISTINCT product_brand FROM products";
  db.query(q, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

/*10-> when user clicks on specific category i.e mobile, keyboard we need to display that category brands */
app.post("/getbrands", (req, res) => {
  const category = req.body.category;
  const q ="SELECT DISTINCT product_brand FROM products WHERE product_category=?";
  db.query(q, category, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

/*11-> this is for payment gateway whenever user clicks on checkout button in cart page we redirect him to gateway
from the frontend we will be sending all the cartitems so in line_items we will the cartitems  */
app.post("/create-checkout-session", async (req, res) => {
  const line_items = req.body.cartitems.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product_sname,
        },
        unit_amount: item.product_price * 100,
      },
      quantity: item.product_quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    //this is success url i.e if payment is successfull then redirect him to success page so store the url in success_url
    success_url: `${process.env.client_url}/success`,
    //if payment is not successfull then redirect him back to cart page so store the url in cancel_url
    cancel_url: `${process.env.client_url}/cart`,
  });

  //then finally send the url as response to frontend
  res.send({ url: session.url });
});

/*`12-> this is to check whether the user is logged in or not i.e we will check whether the session is set or not
so whenver the page loads or we reload we will call this in useEffect so that if session is started then we send the user
data to frontend */
app.get("/check", (req, res) => {
  if (req.session.user) {
    console.log("user is still loggedin");
    res.send({ loggedin: true, user: req.session.user });
  } else {
    res.send({ loggedin: false });
  }
});

/*13->this is for storing orders in database so that we can display all the orders of the user whenver he clicks on myorders */
app.post("/placeorder", (req, res) => {
  var date=new Date().toLocaleDateString();
  var time=new Date().toLocaleTimeString();
  var day=new Date().getDay();
  console.log(days[day]+" "+date+" at "+time);
  const order_datetime=days[day]+" "+date+" at "+time;
  const user_id = req.body.user_id;
  const product_id = req.body.product_id;
  const order_quantity = req.body.order_quantity;
  const order_amount = req.body.order_amount;
  const q ="INSERT INTO orders (user_id,product_id,order_datetime,order_quantity,order_amount ) VALUES(?, ?, ?, ?, ?)";
  db.query(
    q,
    [user_id, product_id,order_datetime,order_quantity, order_amount],
    (err, data) => {
      if (err) {
        res.send({ message: "insertion failed" });
      } else {
        res.send(data);
      }
    }
  );
});

/*14->this is for getting the user's orders from datababse we will sending the user's id to backend and fetch all his/her orders*/
app.post("/getorders", (req, res) => {
  // const user_id=req.body.user_id;
  // console.log(req.body.user_id);
  const q ="SELECT DISTINCT product_img,product_sname,product_price,order_quantity,order_datetime,order_amount,order_status from products INNER JOIN orders ON orders.product_id=products.product_id AND user_id=?";
  db.query(q, req.body.user_id, (err, data) => {
    if (err) {
      res.send({ message: "something went wrong!!!" });
    } else {
      res.send(data);
    }
  });
});

/*15->this is to delete duplicate records from orders table bocz we are making a post req for every item in the cart
so we are using axios inside a for loop which is causing the orders to be included twice in orders table so to avoid dat
we remove duplicates from table*/
app.post("/deleteduplicates", (req, res) => {
  const q =
    "DELETE t1 from orders t1 inner join orders t2 where t1.order_id < t2.order_id and t1.user_id=t2.user_id";
  db.query(q, (err, data) => {
    if (err) {
      res.send({ message: "something went wrong!!!" });
    } else {
      res.send(data);
    }
  });
});

//16->whenver user clicks on logout we need to destroy the session variable so make a req to backend
app.get("/logout", (req, res) => {
  req.session.destroy();
  console.log("session destroyed");
  res.send({ loggedout: true });
});



/* Admin Side Queries */
/*1-> fetching all the stats i.e total earnings,total products and total orders to display in dashboard*/
app.get("/orderstats",(req,res)=>{
  const q="SELECT SUM(order_amount) as earnings,COUNT(order_id) as orders FROM orders";
  db.query(q,(err,data)=>{
    if(err){
      res.send(err);
    }
    else
    {
      res.send(data);
    }
  })
})

/*2->fetching total products available so that we can display it on admin dashboard*/
app.get("/productstats",(req,res)=>{
  const q="SELECT COUNT(product_id) as products FROM products"
  db.query(q,(err,data)=>{
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send(data);
    }
  })
})

/* 3-> getting order status bcoz on dashboard we are displaying a bar chart showing the order status of all order*/
app.get("/getorderstatus",(req,res)=>{
  const q="SELECT order_status FROM orders";
  db.query(q,(err,data)=>{
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send(data);
    }
  })
})

/*4-> fetching all order details so that the admin can view all the orders */
app.get("/orders",(req,res)=>{
  const q="SELECT order_id,products.product_id,products.product_img,products.product_sname,products.product_price,order_datetime,order_quantity,order_amount,order_status FROM products inner join orders on products.product_id=orders.product_id";
  db.query(q,(err,data)=>{
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send(data);
    }
  })
})

/*5->when user clicks on order status then he must be redirected to update status page so that he can change the order status
for that we need to fetch that order details based on order_id */
app.get("/updatestatus/:id",(req,res)=>{
  const {id}=req.params;
  const q="SELECT products.product_id,products.product_img,products.product_sname,products.product_price,order_quantity,order_amount,order_status FROM products INNER JOIN orders ON products.product_id=orders.product_id AND order_id=?";
  db.query(q,id,(err,data)=>{
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send(data);
    }
  })
})

/*6->updating the order status of the product */
app.post("/updatestatus",(req,res)=>{
  const order_id=req.body.order_id;
  const order_status=req.body.order_status;
  const q="UPDATE orders SET order_status=? where order_id=?";
  db.query(q,[order_status,order_id],(err,data)=>{
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send(data);
    }
  })
})

/*7-> adding product into the products table */
app.post("/addproduct",(req,res)=>{
  const product_sname=req.body.product_sname;
  const product_name=req.body.product_name;
  const product_category=req.body.product_category;
  const product_brand=req.body.product_brand;
  const product_desc=req.body.product_desc;
  const product_price=req.body.product_desc;
  const product_img=req.body.product_img;
  const q="INSERT INTO products (product_sname,product_name,product_category,product_brand,product_desc,product_price,product_img) VALUES(?, ?, ?, ?, ?, ?, ?)";
  db.query(q,[product_sname,product_name,product_category,product_brand,product_desc,product_price,product_img],(err,data)=>{
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send(data);
    }
  })
})

/*7-> when admin clicks on edit button in products table then he will be redirected product form where all the data of that
particular must be present so that he can edit the existing data of that product lyk changing price as such so for that we need
to fetch all the details frm the database*/
app.get("/getdetails/:id",(req,res)=>{
  const {id}=req.params;
  const q="SELECT * FROM products WHERE product_id=?";
  db.query(q,id,(err,data)=>{
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send(data);
    }
  })
})

/*8->editing and updating product details */
app.post("/updateproduct/:id",(req,res)=>{
  const id=req.body.id;
  // console.log(id);
  const product_sname=req.body.product_sname;
  const product_name=req.body.product_name;
  const product_category=req.body.product_category;
  const product_brand=req.body.product_brand;
  const product_desc=req.body.product_desc;
  const product_price=req.body.product_price;
  // console.log(product_price)
  const product_img=req.body.product_img;
  const q="UPDATE products SET product_sname=?, product_name=?, product_category=?, product_brand=?, product_desc=?, product_price=?, product_img=? WHERE product_id=?";
  db.query(q,[product_sname,product_name,product_category,product_brand,product_desc,product_price,product_img,id],(err,data)=>{
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send(data);
    }
  })
})

/*9->deleting a product from our database */
app.get("/deleteproduct/:id",(req,res)=>{
  const {id}=req.params;
  const q="DELETE FROM products WHERE product_id=?";
  db.query(q,id,(err,data)=>{
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send(data);
    }
  })
})

//this is just to verify that are we getting the response or not
app.get("/", (req, res) => {
  res.send("Hello this is backend");
});
//this is just to verify whether our backend is running on the port or not
app.listen(process.env.port_no, () => {
  console.log(`Listening at http://localhost:${process.env.port_no}`);
  console.log("Connected to Backend!!! port-" + process.env.port_no);
});