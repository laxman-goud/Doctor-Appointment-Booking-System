/* eslint-disable react-hooks/exhaustive-deps */
// Import necessary dependencies
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import api from '../../utils/axios';

const Appointment = () => {
    // Extract doctor ID from URL
    const { docId } = useParams();

    // Get data and functions from global AppContext
    const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
    const navigate = useNavigate();

    // Days of the week used in the UI
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    // Component state
    const [docInfo, setDocInfo] = useState(null);      // Current doctor's info
    const [slotIndex, setSlotIndex] = useState(0);     // Selected day index
    const [slotTime, setSlotTime] = useState("");      // Selected time slot
    const [docSlots, setDocSlots] = useState([]);      // Available slots for a doctor

    // 🕒 Function to generate available booking slots for the next 7 days
    const getAvailableSlots = async () => {
        if (!docInfo) return;

        setDocSlots([]);
        let today = new Date();
        let allSlots = [];

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            // Define start time
            let startTime = new Date(currentDate);
            if (i === 0) {
                // On the current day, start from the next hour if past 10 AM
                if (today.getHours() >= 10) {
                    startTime.setHours(today.getHours() + 1);
                } else {
                    startTime.setHours(10);
                }
                startTime.setMinutes(today.getMinutes() > 30 ? 30 : 0);
            } else {
                startTime.setHours(10, 0, 0, 0);
            }

            // Define end time (always 9 PM)
            let endTime = new Date(currentDate);
            endTime.setHours(21, 0, 0, 0);

            let timeSlots = [];
            let slot = new Date(startTime);

            // Create 30-minute slots between start and end time
            while (slot < endTime) {
                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();

                const slotDate = `${day}-${month}-${year}`;
                const formattedTime = slot.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                });

                // Skip already booked slots
                const isSlotAvailable = !(docInfo.slots_booked?.[slotDate]?.includes(formattedTime));

                if (isSlotAvailable) {
                    timeSlots.push({
                        date: slotDate,
                        time: formattedTime,
                        datetime: new Date(slot),
                    });
                }

                // Move to the next 30-minute interval
                slot.setMinutes(slot.getMinutes() + 30);
            }

            // Push the day's data with slots
            allSlots.push({
                date: currentDate.toDateString(),
                slots: timeSlots,
            });
        }

        setDocSlots(allSlots);
    };

    // 💬 Function to book an appointment
    const bookAppointment = async () => {
        if (!token) {
            toast.warn('Login to book an appointment');
            navigate('/login');
            return;
        }

        try {
            const selectedDay = docSlots[slotIndex];
            if (!selectedDay || selectedDay.slots.length === 0) {
                toast.error("No slots available for this day");
                return;
            }

            const selectedSlot = selectedDay.slots.find(slot => slot.time === slotTime);
            if (!selectedSlot) {
                toast.error("Please select a time slot");
                return;
            }

            const date = selectedSlot.datetime;
            const slotDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

            // Send booking request to backend
            const { data } = await api.post(
                `${backendUrl}/api/user/book-appointment`,
                { docId, slotDate, slotTime },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                getDoctorsData(); // Refresh doctor list to update booked slots
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Fetch doctor info from context when doctors list changes
    useEffect(() => {
        if (doctors?.length) {
            const found = doctors.find((doc) => doc._id === docId);
            setDocInfo(found || null);
        }
    }, [doctors, docId]);

    // Generate available slots once doctor info is set
    useEffect(() => {
        if (docInfo) getAvailableSlots();
    }, [docInfo]);

    // 🧩 JSX UI rendering
    return (
        <div>
            {!docInfo ? (
                <p>Loading doctor info...</p>
            ) : (
                <>
                    {/* Doctor details section */}
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
                                <img className="w-5" src={assets.verified_icon} alt="verify_icon" />
                            </p>

                            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                                <p>{docInfo.degree} - {docInfo.speciality}</p>
                                <button className="py-0.5 px-2 border text-xs rounded-full">
                                    {docInfo.experience}
                                </button>
                            </div>

                            <div>
                                <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                                    About <img src={assets.info_icon} alt="info_icon" />
                                </p>
                                <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
                            </div>

                            <p className="text-gray-500 font-medium mt-4">
                                Appointment fee:{" "}
                                <span className="text-gray-600">
                                    {currencySymbol}{docInfo.fees}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Booking slots section */}
                    <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
                        <p>Booking slots</p>

                        {/* Day selection buttons */}
                        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                            {docSlots.length > 0 && docSlots.map((dayItem, index) => (
                                <div
                                    onClick={() => setSlotIndex(index)}
                                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                                        slotIndex === index ? "bg-primary text-white" : "border border-gray-200"
                                    }`}
                                    key={index}
                                >
                                    <p>{daysOfWeek[new Date(dayItem.date).getDay()]}</p>
                                    <p>{new Date(dayItem.date).getDate()}</p>
                                </div>
                            ))}
                        </div>

                        {/* Time slots for selected day */}
                        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
                            {docSlots.length > 0 && docSlots[slotIndex]?.slots.length > 0 ? (
                                docSlots[slotIndex].slots.map((slotItem, index) => (
                                    <p
                                        onClick={() => setSlotTime(slotItem.time)}
                                        className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                                            slotTime === slotItem.time
                                                ? "bg-primary text-white"
                                                : "text-gray-400 border border-gray-300"
                                        }`}
                                        key={index}
                                    >
                                        {slotItem.time.toLowerCase()}
                                    </p>
                                ))
                            ) : (
                                <p className="text-gray-500">No slots available</p>
                            )}
                        </div>

                        {/* Book button */}
                        <button
                            onClick={bookAppointment}
                            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
                        >
                            Book an appointment
                        </button>
                    </div>

                    {/* Related doctors section */}
                    <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
                </>
            )}
        </div>
    );
};

export default Appointment;
