import express from 'express'
const router  = express.Router()
import {addUser,getUser, getSingleUser,editUser, deleteUser, userStatusChange } from '../controllers/user.js'


//@  /api/user/add
router.post('/add' ,addUser)

//@  /api/user
router.get('/', getUser)

//@  /api/user/:id
router.get('/:id', getSingleUser)

//@  /api/user/edit/:id
router.put('/edit/:id',editUser )


//@ /api/user/:id
router.delete('/:id', deleteUser)

//@ /api/user/status/:id
router.put('/status/:id', userStatusChange)


export default router