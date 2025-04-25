import mongoose from 'mongoose'
// import { Timestamp } from './../node_modules/bson/src/timestamp';
const userSchema= new mongoose.Schema({
   fullName:{type:String,required:true},
   username:{type:String,required:true,unique:true},
   password:{type:String,required:true}, 
   gender:{type:String,required:true},
   avatar:{type:String,required:true}
},{timestamps:true}
)

export const user=mongoose.model('User',userSchema)