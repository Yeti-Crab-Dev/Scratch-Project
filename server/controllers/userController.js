const db = require('../models/dbModel');

const userController = {};

userController.createUser = async (req,res,next)=>{
    try{
        const {name, username, password} = req.body;
        const query = 'INSERT INTO users (name,username, password ) VALUES ( $1,$2,$3)';
        const result = await db.query(query,[name,username,password]);
        console.log('Created ')
        console.log(result)
        return next();
    }
    catch(err){
        return next({
            log: 'Error in userController.createUser',
            message: 'Cant create user!'
        });
    }
};

userController.getUser = async (req,res,next)=>{
    try{
        const {id} = req.params;
        const query = `SELECT * from users WHERE user_id = $1`;
        const response = await db.query(query,[id]);
        if(!response.rows.length) throw new Error ('no user detected');
        res.locals.user = response.rows[0];
        next();
    }
    catch(err){
        return next({
            log: 'Error in userController.getUser',
            message: 'Cant get user!'
        });
    }
};

userController.getAllUsers = async (req,res,next)=>{
    try{
        const {id} = req.params;
        const query = `SELECT * from users`;
        const response = await db.query(query);
        res.locals.users = response.rows;
        next();
    }
    catch(err){
        return next({
            log: 'Error in userController.getUser',
            message: 'Cant get user!'
        });
    }
};

userController.updateUser = async (req,res,next)=>{
    try{
        const {name, username, password} = req.body;
        const query = "UPDATE users SET name = $1, password = $2  WHERE username = $3"
        const result = await db.query(query,[name,password,username]);
        console.log(result);
        next();
    }
    catch(err){
        return next({
            log: 'Error in userController.updateUser',
            message: 'Cant update user!'
        });
    }
};

module.exports = userController;