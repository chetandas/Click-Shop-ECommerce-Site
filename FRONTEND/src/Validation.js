/*
this file contains the validation logic. For validation we use yup package so firstly we need to create a schema for validation
so for that we need to import all the yup library modules from yup package
*/
import * as Yup from "yup";//* indicates everything lyk in sql we will be aliasing them as Yup
//below is the regex for phone no
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
//below is the regex for password
const pwdrules="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$"
//indicates the password must contain min 6 characters,1 uppercase,lowercase,numeric digit
export const regSchema= Yup.object({
    //this is the syntax for writing the validation logic
    //indicates->name shld be string having min 3 and max 20 characters required is lyk normal html required tag
    name:Yup.string().min(3).max(20).required("Please Enter Your Name"),
    email:Yup.string().email().required("Please Enter Your Email"),
    //the phone number pattern shld match to the phoneregex to verify the validity for that we use matches()
    phone:Yup.string().min(10).matches(phoneRegExp, 'Phone number is not valid').required("Please Enter Your Phone Number"),
    //pwd must also match the pwdrules and must contain min 6 characters
    password:Yup
        .string()
        .min(6)
        .matches(pwdrules,{message:"Password Must Contain minimum 6 Characters and 1 uppercase,lowercase,numeric digit"})
        .required("Please Enter Your Password"),
    //now confirm_pwd must be same as entered password so for that we use oneof function and it accepts an array nd it shld match to
    //pwd so take its referece
        confirm_password:Yup.string().oneOf([Yup.ref("password"),null], "Passwords Must Match").required("Please Enter Confirm Password"),
})