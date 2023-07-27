import User from '../models/User.js'
import moment from 'moment'


export const addUser =async  (req,res) =>{
      const {firstName,lastName,email,mobile,gender,status} = req.body

      if(!firstName || !lastName || !email || !mobile || !gender || !status){
        res.status(204).json('Please fill all fields')
      }

     try {
        const user = await User.findOne({email : email})
        if(user)  res.status(204).json('User already exists')
        const newUser = await new User({
            firstName  :req.body.firstName,
            lastName  :req.body.lastName,
            email  :req.body.email,
            mobile  :req.body.mobile,
            gender  :req.body.gender,
            status  :req.body.status,
         }).save()
         res.status(201).json({newUser})
     } catch (error) {
        res.status(500).json(error)
     }
}

export const getUser = async (req,res) =>{
    const search = req.query.search || ""
    const gender = req.query.gender || ""
    const status = req.query.status || ""
    const page = req.query.page || 1
    const PER_PAGE_ITEMS = 5
      

    const query = {
        firstName : {$regex:search,$options:"i"}
    }
    if(gender !== "All"){
        query.gender = gender
    }
    if(status !== "All"){
        query.status = status
    }
    try {
        const skip = (page - 1) * PER_PAGE_ITEMS // 1-1 * 5

        const count = await User.countDocuments(query)

        const user = await User.find(query)
        .sort({createdAt:-1})
        .limit(PER_PAGE_ITEMS)
        .skip(skip)

        const pageCount = Math.ceil(count / PER_PAGE_ITEMS)  // 10/4 = 2.5
        res.status(200).json({
            Pagination : {
                count,
                pageCount
            },
            user
        })   
    } catch (error) {
       res.status(400).json(error)   
    }
}

export const getSingleUser = async (req,res) =>{
    const {id} = req.params
    try {
        const user = await User.findOne({_id:  id})
        res.status(200).json(user)   
    } catch (error) {
       res.status(400).json(error)   
    }
}


export const editUser = async (req,res) =>{
    const {id} = req.params
    const {firstName,lastName,email,mobile,gender,status} = req.body
        try {
        
        const updateUser = await User.findByIdAndUpdate({_id:id},{
                firstName,lastName,email,mobile,gender,status, 
                } ,{new : true})
         
         await updateUser.save()
         res.status(200).json(updateUser)
        } catch (error) {
       res.status(400).json(error)   
    }
}

export const deleteUser = async (req,res) =>{
    const {id} = req.params   
    try {        
        await User.findByIdAndDelete({_id:id})
        res.status(200).json('User has been deleted')
        } catch (error) {
          res.status(400).json(error)   
    }
}

// Change status
export const userStatusChange = async (req,res) =>{
    const {id} = req.params
    const {data} = req.body
    
    try {
        
        const updateUser = await User.findByIdAndUpdate({_id:id},{status:data} ,{new : true})        
         await updateUser.save()
         res.status(200).json(updateUser)
        } catch (error) {
       res.status(400).json(error)   
    }
}


