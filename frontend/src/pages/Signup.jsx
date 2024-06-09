
import student from '../assets/students.jpg';
import tutor from '../assets/tutor.png';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import { createUser } from '../interactiveLearning';

export default function Signup(){

    const [isloading, setisLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const role = location.state.role;
    const [user, setuser] = useState(role.toUpperCase());
    let personimage = user === 'STUDENT' ? student : tutor;
    function changeUser(){
        setuser(user === 'STUDENT' ? 'TUTOR' : 'STUDENT');
        personimage = user === 'STUDENT' ? tutor : student;
    }


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');


    async function buttonclicked(e){
        setisLoading(true);
        e.preventDefault();
        if(firstName === '' || lastName === '' || email === '' || password === '' || passwordCheck === ''){
            toast.error('All fields are required');
            return;
        }
        if(password !== passwordCheck){
            toast.error('Passwords do not match');
            return;
          }
        const signupUser = {firstname:firstName, lastname:lastName, email, password};
        //send backend call to register signupUser
        console.log(signupUser);
        await axios.post(`http://localhost:3000/api/v1/signup/${user.toLowerCase()}`, signupUser)
        .then((response)=>{
            console.log(response.data);
            localStorage.setItem("token",response.data.token);
            if (response.data.message) {
                // If the response contains a message, display it as a success notification
                toast.success(response.data.message);
                setisLoading(false);
                navigate(`/${user.toLowerCase()}-dashboard`);
              }
              if (response.data.error) {
                // If the response contains an error message, display it as an error notification
                toast.error(response.data.error);
              }
        })
        .catch((error)=>{
            console.log(error.response.data);
            toast.error(error.response.data.error);
        });

        createUser(email);
    }






    return (
        isloading ? <Spinner/> :
        <div className="bg-[#03040e] text-white h-screen">
        <ToastContainer />
            <div className="flex items-center h-full ">
                <div className="w-1/2 pl-12 ml-3">
                    <div className="p-10 bg-gray-800 rounded-lg w-max ">
                        <form className="max-w-md mx-auto">
                        <div className="mb-6 text-3xl font-bold">Sign Up {user}</div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={(e)=>{setFirstName(e.target.value)}}  required/>
                                    <label  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text"  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={(e)=>{setLastName(e.target.value)}} required/>
                                    <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                                </div>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={(e)=>{setEmail(e.target.value)}} required/>
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="password" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  onChange={(e)=>{setPassword(e.target.value)}} required/>
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="password" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  onChange={(e)=>{setPasswordCheck(e.target.value)}} required/>
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                            </div>
                            
                            <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center " onClick={buttonclicked}>Sign Up</button>
                        </form>
                        <div className="pt-4 text-gray-400">Already have an account? <button className="text-white hover:underline hover:cursor-pointer" onClick={()=>{
                            navigate('/signin',{state:{role:user.toLowerCase()}});
                        }}>Sign In</button></div>
                    </div>
                </div>
                <div className='w-1/2'>
                    <div className="pl-8 text-2xl font-bold">Signing Up as an <span className='text-3xl text-[#5b21b6]'>{user}</span></div>
                    <img src={personimage} alt="student" className='w-1/2 p-1 mt-12 ml-12 h-5/6 rounded-2xl light-on-hover'/>
                    <div className='pl-8 mt-4 ml-12 text-gray-400'>Not A <span className='font-bold'>{user}</span>? <span className='text-white hover:cursor-pointer hover:underline' onClick={changeUser}>Change Role</span></div>
                </div>
            </div>
        </div>
    );
}