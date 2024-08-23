"use client";
import React, { useState, useEffect, FormEvent } from 'react';

export default function ContactUs() {
    const [emailDestination, setEmailDestination] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://tech.jayacm.co.id:8081/jayacm/jayacm/api/contactus', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email_destination: emailDestination,
                    name,
                    email,
                    subject,
                    message
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setSuccess('Your message has been sent successfully!');
            console.log('Form submitted successfully:', data);
        } catch (err) {
            setError('An error occurred while submitting the form.');
            console.error('Form submission error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
        <div className="container mx-auto mt-10 flex flex-wrap px-4">
            <div className="w-full md:w-1/2 p-4">
                <div className="mb-5">
                    <h1 className="font-semibold text-red-700 border-b-2 border-red-700">Contact Us</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6">
                        <div>
                            <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipient</label>
                            <select 
                                id="contact" 
                                value={emailDestination} 
                                onChange={(e) => setEmailDestination(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            >
                                <option value="" disabled>Choose a recipient</option>
                                <option value="fahdiazhannu31@gmail.com">Head Office</option>
                                <option value="fahdiazhannu.tkjx@gmail.com">HRD Department</option>
                                <option value="zanuazhannu@gmail.com">Marketing Division</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                placeholder="Your Name" 
                                required 
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                placeholder="example@example.com" 
                                required 
                            />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                            <input 
                                type="text" 
                                id="subject" 
                                value={subject} 
                                onChange={(e) => setSubject(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                placeholder="Subject of your message" 
                                required 
                            />
                        </div>
                    </div>

                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                    <textarea 
                        id="message" 
                        rows={4} 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4" 
                        placeholder="Write your thoughts here..." 
                        required
                    ></textarea>

                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}

                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>

            <div className="w-full md:w-1/2 p-4">
                <div className="mb-5">
                    <h1 className="font-semibold text-red-700 border-b-2 border-red-700">Contact Information</h1>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Address</h2>
                    <p className="text-gray-600 dark:text-gray-400">Taman Perkantoran Blok B Sektor 1, Jalan Bintaro Utara, Bintaro Jaya, RT.17/RW.8, Bintaro, Kec. Pesanggrahan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12330</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Phone</h2>
                    <p className="text-gray-600 dark:text-gray-400">+62 21 7363939 | +62 7340260 | +62 7340254 | +62 21 7363962</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h2>
                    <p className="text-gray-600 dark:text-gray-400">jcmjkt@jayacm.co.id</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Find Us</h2>
                    <iframe
                        className="w-full h-64 border-0"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16975.83207835824!2d106.74806211789992!3d-6.278488247238592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ee2925f06529%3A0xea1e286573734cb5!2sPT%20Jaya%20CM%20Manggala%20Pratama!5e0!3m2!1sid!2sid!4v1723011406905!5m2!1sid!2sid"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
        </>
    );
}
