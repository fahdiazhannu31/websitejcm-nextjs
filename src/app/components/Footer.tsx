import { PhoneIcon, EnvelopeIcon, MapIcon } from '@heroicons/react/24/outline';

export default function Footer() {
    return (
        <>        
        <footer className="bg__footer text-white mt-10 w-full">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="https://jayacm.co.id" className="flex items-center">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap">PT JAYA CM</span>
                        </a>
                        <div className="mb-4 flex items-start space-x-2">
                            <MapIcon className="h-7 w-7 text-white" />
                            <div>
                                <p className="font-semibold text-white">Address</p>
                                <p className="text-white">Taman Perkantoran Blok B Sektor 1, Jalan Bintaro Utara, Bintaro Jaya, RT.17/RW.8, Bintaro, Kec. Pesanggrahan, Kota Jakarta Selatan, DKI Jakarta 12330</p>
                            </div>
                        </div>
                        <div className="mb-4 flex items-start space-x-2">
                            <PhoneIcon className="h-5 w-5 text-white" />
                            <div>
                                <p className="font-semibold text-white">Phone</p>
                                <p className="text-white">+62 21 7363939 | +62 7340260 | +62 7340254 | +62 21 7363962</p>
                            </div>
                        </div>
                        <div className="mb-4 flex items-start space-x-2">
                            <EnvelopeIcon className="h-5 w-5 text-white" />
                            <div>
                                <p className="font-semibold text-white">Email</p>
                                <p className="text-white">jcmjkt@jayacm.co.id</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-white uppercase">About Us</h2>
                            <ul className="text-white font-medium">
                                <li className="mb-2">
                                    <a href="/about-us/profile" className="hover:underline">Profile</a>
                                </li>
                                <li className="mb-2">
                                    <a href="/about-us/visi-misi" className="hover:underline">Vision & Mission</a>
                                </li>
                                <li className="mb-2">
                                    <a href="/about-us/bod" className="hover:underline">Member of The Board</a>
                                </li>
                                <li className="mb-2">
                                    <a href="/about-us/legal-bussiness-regist" className="hover:underline">Legal and Bussiness Regist</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-white uppercase">Services</h2>
                            <ul className="text-white font-medium">
                                <li className="mb-2">
                                    <a href="/services/field-of-activity" className="hover:underline">Field Of Activity</a>
                                </li>
                                <li>
                                    <a href="/services/scope-of-service" className="hover:underline">Scope Of Service</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-white uppercase">Contact</h2>
                            <ul className="text-white font-medium">
                                <li className="mb-4">
                                    <a href="/contact-us" className="hover:underline">Contact Us</a>
                                </li>
                                <li>
                                    <a href="/contact-us" className="hover:underline">Contact Information</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-white sm:text-center">© 2024 <a href="https://jayacm.com/" className="hover:underline">PT Jaya CM</a>. All Rights Reserved.</span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <a href="#" className="text-white hover:text-white">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/>
                            </svg>
                            <span className="sr-only">Facebook page</span>
                        </a>
                        <a href="#" className="text-white hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M14.1 0H5.88A5.9 5.9 0 0 0 0 5.89v8.22A5.9 5.9 0 0 0 5.89 20h8.22A5.9 5.9 0 0 0 20 14.11V5.89A5.9 5.9 0 0 0 14.11 0Zm-5.48 15.82H5.6V7.72h3.02v8.1ZM7.12 6.39a1.74 1.74 0 1 1 0-3.48 1.74 1.74 0 0 1 0 3.48Zm9.5 9.42h-3.02v-4.22c0-1.01-.02-2.31-1.41-2.31-1.41 0-1.62 1.1-1.62 2.24v4.29H7.54V7.72h2.89v1.11h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.99 3.58 4.58v3.95Z" clipRule="evenodd"/>
                            </svg>
                            <span className="sr-only">LinkedIn account</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
        </>
    );
}
