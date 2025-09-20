import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)

    const navigate = useNavigate()

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const [docInfo, setDocInfo] = useState(null)
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState("")
    const [docSlots, setDocSlots] = useState([])

    const getAvailableSlots = async () => {
        setDocSlots([])

        let today = new Date()

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // start time
            let startTime = new Date(currentDate)
            if (i === 0) {
                if (today.getHours() >= 10) {
                    startTime.setHours(today.getHours() + 1)
                } else {
                    startTime.setHours(10)
                }
                startTime.setMinutes(today.getMinutes() > 30 ? 30 : 0)
            } else {
                startTime.setHours(10, 0, 0, 0)
            }

            // end time → always 21:00
            let endTime = new Date(currentDate)
            endTime.setHours(21, 0, 0, 0)

            // build slots
            let timeSlots = []
            let slotTime = new Date(startTime)
            while (slotTime < endTime) {
                timeSlots.push({
                    datetime: new Date(slotTime),
                    time: slotTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                })
                slotTime.setMinutes(slotTime.getMinutes() + 30)
            }

            // always push the day (even if no slots)
            setDocSlots(prev => [
                ...prev,
                timeSlots.length > 0 ? timeSlots : [{
                    datetime: currentDate,
                    time: null
                }]
            ])
        }
    }
    const bookAppointment = async () => {
        if(!token){
            toast.warn('Login to book an appointment')
            navigate('/login')
        }
        try {
            const date = docSlots[slotIndex][0].datetime
 
            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            const slotDate = day + '-' + month + '-' + year
            
            const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, {
                docId,
                slotDate,
                slotTime,
            }, {headers: {token}})

            if (data.success) {
                toast.success(data.message)
                getDoctorsData()
                navigate('/my-appointments')

            }
            else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (doctors?.length) {
            const found = doctors.find((doc) => doc._id === docId)
            setDocInfo(found || null)
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) getAvailableSlots()
    }, [docInfo])

    return (
        <div>
            {!docInfo ? (
                <p>Loading doctor info...</p>
            ) : (
                <>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div>
                            <img
                                className="bg-primary w-full sm:max-w-72 rounded-lg"
                                src={docInfo.image}
                                alt="doctor_img"
                            />
                        </div>
                        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
                            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                                {docInfo.name}
                                <img
                                    className="w-5"
                                    src={assets.verified_icon}
                                    alt="verify_icon"
                                />
                            </p>
                            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                                <p>
                                    {docInfo.degree} - {docInfo.speciality}
                                </p>
                                <button className="py-0.5 px-2 border text-xs rounded-full">
                                    {docInfo.experience}
                                </button>
                            </div>

                            <div>
                                <p className="flex   items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                                    About <img src={assets.info_icon} alt="info_icon" />
                                </p>
                                <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                                    {docInfo.about}
                                </p>
                            </div>
                            <p className="text-gray-500 font-medium mt-4">
                                Appointment fee:{" "}
                                <span className="text-gray-600">
                                    {currencySymbol}
                                    {docInfo.fees}
                                </span>
                            </p>
                        </div>
                    </div>
                    {/* Booking Slots */}
                    <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
                        <p>Booking slots</p>
                        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                            {
                                docSlots.length && docSlots.map((item, index) => (
                                    <div onClick={() => { setSlotIndex(index) }} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                                        <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                        <p>{item[0] && item[0].datetime.getDate()}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                            {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                                <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
                                    {item.time ? item.time.toLowerCase() : "No slots"}
                                </p>
                            ))}
                        </div>
                        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
                    </div>
                    {/* Listing related doctors */}
                    <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
                </>
            )}
        </div>
    )
}

export default Appointment
