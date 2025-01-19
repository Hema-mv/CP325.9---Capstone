import { token } from 'morgan';
import User from '../models/user.mjs'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

async function create(req, res) {

    // res.json({
    //     user:{0
    //         name:req.body.name,
    //         email:req.body.email
    //     }
    // })
  try {
    //add the user to the database
    console.log('here',req.body)
    const createdUser = await User.create(req.body);
 
    //create a jwt token. token will be a string
    const token=createJWT(createdUser);
    res.status(200).json(token);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(400).json(error);
  }
}
async function login(req, res) {
  try {
    console.log('login',req.body)
    // Query the database to find a user with the email provided
    const user = await User.findOne({ email: req.body.email });
    // If the email does not exist, throw an error
    if (!user) throw new Error("User Not Found");
    // Compare the password (remember it's stored encrypted)
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error("Bad password");
    // Create a JWT token
    const token = createJWT(user);
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
/*-- Helper Functions --*/

function createJWT(user) {
    return jwt.sign(
      // data payload
      { user },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
  }
//export default {create};
export default { create, login };