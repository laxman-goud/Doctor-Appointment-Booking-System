// Import dependencies and context
import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import api from '../../utils/axios';

const AddDoctor = () => {

    // State variables for doctor details
    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [speciality, setSpeciality] = useState('General Physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [about, setAbout] = useState('');

    // Get backend URL and admin token from context
    const { backendUrl, aToken } = useContext(AdminContext);

    // Function to handle form submission
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            // Validate image upload
            if(!docImg){
                return toast.error('Please upload doctor image');
            }

            // Prepare form data for backend submission
            const formData = new FormData();
            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({line1: address1, line2: address2}));
            formData.append('about', about);

            // API request to backend to add doctor
            const { data } = await api.post(`${backendUrl}/api/admin/add-doctor`, formData, {
                headers: {token: aToken}
            });

            // Handle success or error response
            if(data.success){
                toast.success(data.message);

                // Reset form fields
                setDocImg(false);
                setName('');
                setEmail('');
                setPassword('');
                setFees('');
                setDegree('');
                setAddress1('');
                setAddress2('');
                setAbout('');
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        // Form container
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Add Doctor</p>

            {/* Main content box */}
            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

                {/* Upload section */}
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="doc-img">
                        <img 
                            className='w-16 bg-gray-100 rounded-full cursor-pointer' 
                            src={ docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
                            alt="upload" 
                        />
                        <input onChange={(e)=>{setDocImg(e.target.files[0])}} type="file" id="doc-img" hidden />
                        <p>Upload doctor <br /> image</p>
                    </label>
                </div>

                {/* Form fields */}
                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

                    {/* Left column */}
                    <div className='w-full lg:flex-1 flex flex-col gap-4'> 
                        <div className='flex flex-col gap-1'>
                            <p>Doctor name</p>
                            <input onChange={(e)=>{setName(e.target.value)}} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p>Doctor email</p>
                            <input onChange={(e)=>{setEmail(e.target.value)}} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p>Doctor password</p>
                            <input onChange={(e)=>{setPassword(e.target.value)}} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p>Experience</p>
                            <select onChange={(e)=>{setExperience(e.target.value)}} value={experience} className='border rounded px-3 py-2'>
                                {Array.from({length: 10}, (_, i) => (
                                    <option key={i} value={`${i+1} Year`}>{i+1} Year</option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p>Fees</p>
                            <input onChange={(e)=>{setFees(e.target.value)}} value={fees} className='border rounded px-3 py-2' type="number" placeholder='Fees' required />
                        </div>
                    </div>

                    {/* Right column */}
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <p>Speciality</p>
                            <select onChange={(e)=>{setSpeciality(e.target.value)}} value={speciality} className='border rounded px-3 py-2'>
                                <option value="General Physician">General Physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatology">Dermatology</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p>Education</p>
                            <input onChange={(e)=>{setDegree(e.target.value)}} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p>Address</p>
                            <input onChange={(e)=>{setAddress1(e.target.value)}} value={address1} className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
                            <input onChange={(e)=>{setAddress2(e.target.value)}} value={address2} className='border rounded px-3 py-2' type="text" placeholder='Address 2' required />
                        </div>
                    </div>
                </div>

                {/* About section */}
                <div>
                    <p className='mt-4 mb-2'>About Doctor</p>
                    <textarea 
                        onChange={(e)=>{setAbout(e.target.value)}} 
                        value={about} 
                        className='w-full px-4 pt-2 border rounded' 
                        placeholder='Write about doctor' 
                        rows={5} required>
                    </textarea>
                </div>

                {/* Submit button */}
                <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add doctor</button>
            </div>
        </form>
    )
}

export default AddDoctor
