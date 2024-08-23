"use client";
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

interface CareerPageProps {
    params: {
      slug: string;
    };
}

export default function Detail({ params }: CareerPageProps) {  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false); // State to track checkbox
    const { slug } = params;
    const [selectedEducation, setSelectedEducation] = useState('');
    const [otherEducation, setOtherEducation] = useState('');
    // Function to convert slug to normal text
    const slugToText = (slug: string) => {
        return slug
            .split('-') // Split slug into words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' '); // Join words with a space
    };
    const [formData, setFormData] = useState({
        position: slugToText(slug), // Use slug converted to text as default position
        name: '',
        gender: '',
        place_of_birth: '',
        date_of_birth: '',
        phone: '',
        email: '',
        education: '',
        university: '',
        major: '',
        graduation_year: '',
        last_work: '',
        resume: null // File input
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleCheckboxChange = (event) => {
        setIsAgreed(event.target.checked); // Update state based on checkbox
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            resume: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }
        try {
            const response = await axios.post('http://tech.jayacm.co.id:8081/jayacm/jayacm/api/career/apply', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your application has been submitted successfully!',
            });

            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error submitting your application. Please try again later.',
            });

            console.error('Error submitting form:', error);
        }
    };
    const normalText = slugToText(slug); // Convert slug to normal text
  
    return(
        <>
        <div className="container mx-auto mt-10 px-4">
            <div className="flex justify-center items-center">
            <div className="block max-w-xl w-full p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
                <div className="red__jcm rounded-2xl">
                <h1 className="py-1 text-lg flex justify-center items-center mb-8 text-white">Bio Applicants {normalText}</h1>
                </div>
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
            <label htmlFor="position" className="block mb-2 text-sm text-gray-900 font-semibold">Position</label>
            <input type="text" id="position" name="position" value={formData.position} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" readOnly disabled/>
        </div>
        <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm text-gray-900 font-semibold">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
        <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm text-gray-900 font-semibold">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
        
        <div className="mb-5">
            <fieldset>
            <label htmlFor="gender" className="block mb-2 text-sm text-gray-900 font-semibold">Gender</label>
            <div className="flex items-center mb-4">
                <input id="gender-male" type="radio" name="gender" value="male" onChange={handleInputChange} className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                <label htmlFor="gender-male" className="block ms-2 text-sm text-gray-900">Male</label>
            </div>

            <div className="flex items-center mb-4">
                <input id="gender-female" type="radio" name="gender" value="female" onChange={handleInputChange} className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300" />
                <label htmlFor="gender-female" className="block ms-2 text-sm text-gray-900">Female</label>
            </div>
            </fieldset>
        </div>
        <div className="mb-5">
            <label htmlFor="place_of_birth" className="block mb-2 text-sm text-gray-900 font-semibold">Place of Birth</label>
            <input type="text" name="place_of_birth" id="place_of_birth" value={formData.place_of_birth} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
        <div className="mb-5">
            <label htmlFor="date_of_birth" className="block mb-2 text-sm text-gray-900 font-semibold">Date of Birth</label>
            <input type="date" name="date_of_birth" id="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
        <div className="mb-5">
            <label htmlFor="phone" className="block mb-2 text-sm text-gray-900 font-semibold">Phone Number</label>
            <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
      
        <label htmlFor="gender" className="block mb-2 text-sm text-gray-900 font-semibold">Education</label>

        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="s1"
            name="education"
            value="S1"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            onChange={(e) => setSelectedEducation(e.target.value)}
          />
          <label htmlFor="s1" className="ml-2 text-sm font-medium text-gray-900">S1</label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="s2"
            name="education"
            value="S2"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            onChange={(e) => setSelectedEducation(e.target.value)}
          />
          <label htmlFor="s2" className="ml-2 text-sm font-medium text-gray-900">S2</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="other"
            name="education"
            value="Other"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            onChange={(e) => setSelectedEducation(e.target.value)}
          />
          <label htmlFor="other" className="ml-2 text-sm font-medium text-gray-900">Other</label>
        </div>
        {selectedEducation === 'Other' && (
          <div className="mt-2">
            <input
              type="text"
              value={otherEducation}
              onChange={(e) => setOtherEducation(e.target.value)}
              className="block w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Please specify your education"
            />
          </div>
        )}


        <div className="mb-5">
            <label htmlFor="university_name" className="block mb-2 text-sm text-gray-900 font-semibold">University</label>
            <input type="text" name="university" id="university" value={formData.university} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
        <div className="mb-5">
            <label htmlFor="major" className="block mb-2 text-sm text-gray-900 font-semibold">Major</label>
            <input type="text" name="major" id="major" value={formData.major} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
        <div className="mb-5">
            <label htmlFor="graduation_year" className="block mb-2 text-sm text-gray-900 font-semibold">Graduation Year</label>
            <input type="text" name="graduation_year" id="graduation_year" value={formData.graduation_year} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
        <div className="mb-5">
            <label htmlFor="last_work" className="block mb-2 text-sm text-gray-900 font-semibold">Last Work</label>
            <input type="text" name="last_work" id="last_work" value={formData.last_work} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
        <div className="mb-5">
            <label htmlFor="resume" className="block mb-2 text-sm text-gray-900 font-semibold">Resume</label>
            <input type="file" name="resume" id="resume" onChange={handleFileChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
        
        <div className="mb-5">
            <div className="flex items-center mb-4">
            <input type="checkbox" id="agree" onChange={handleCheckboxChange} className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor="terms" className="ms-2 text-sm text-gray-900 dark:text-gray-300">I agree with the <a onClick={openModal}className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
            </div>
        </div>

        <button
        type="submit"
        disabled={!isAgreed} // Disable the button if not agreed
        className={`bg-red-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none ${!isAgreed ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        Apply
        </button>
    </form>
    {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
            <div className="overflow-y-auto max-h-64">
                <p className="font-semibold">
              Syarat dan Ketentuan Penggunaan Data Diri Pelamar
              </p>      
        <ol className="space-y-4 text-gray-500 list-decimal list-inside dark:text-gray-400">
        <li className="text-justify">
        Pengumpulan Data Pribadi
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                <li className="text-justify">Kami mengumpulkan data pribadi Anda saat Anda mengisi formulir lamaran kerja melalui platform kami. Data yang dikumpulkan meliputi nama, alamat, nomor telepon, alamat email, riwayat pendidikan, pengalaman kerja, dan informasi relevan lainnya.</li>
            </ul>
        </li>
        <li className="text-justify">
            Tujuan Penggunaan Data Pribadi
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                <li className="text-justify">Data pribadi yang Anda berikan akan digunakan untuk keperluan proses rekrutmen, termasuk tetapi tidak terbatas pada, evaluasi kualifikasi Anda, komunikasi terkait proses seleksi, dan penyimpanan data untuk pertimbangan peluang kerja di masa mendatang.</li>
            </ul>
        </li>
        <li className="text-justify">
        Penyimpanan Data Pribadi
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                <li className="text-justify">Data pribadi Anda akan disimpan dalam sistem kami selama diperlukan untuk tujuan rekrutmen. Kami akan menjaga kerahasiaan dan keamanan data Anda sesuai dengan standar yang berlaku dan akan menghapus data Anda setelah tidak lagi diperlukan.
                </li>
            </ul>
        </li>
        <li className="text-justify">
        Pembagian Data Pribadi
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                <li className="text-justify">Data pribadi Anda tidak akan dibagikan kepada pihak ketiga tanpa persetujuan Anda, kecuali jika diwajibkan oleh hukum atau jika data tersebut dibutuhkan oleh pihak ketiga yang bekerja sama dengan kami dalam proses rekrutmen (misalnya, konsultan rekrutmen atau penyedia layanan teknis).
                </li>
            </ul>
        </li>
        <li className="text-justify">
        Hak Pelamar
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                <li className="text-justify">Anda memiliki hak untuk mengakses, memperbarui, atau menghapus data pribadi Anda yang disimpan dalam sistem kami. Permintaan untuk mengakses, memperbarui, atau menghapus data dapat dilakukan dengan menghubungi tim HRD kami.
                </li>
            </ul>
        </li>
        <li className="text-justify">
        Keamanan Data
            <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                <li className="text-justify">Kami berkomitmen untuk menjaga keamanan data pribadi Anda dan menggunakan langkah-langkah teknis serta organisasi yang sesuai untuk melindungi data Anda dari akses, pengungkapan, atau penggunaan yang tidak sah.
                </li>
            </ul>
        </li>
        </ol>
              {/* Add more content here if needed */}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 red__jcm text-white rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
</div>
</div>
</div>
</>
    )
}
