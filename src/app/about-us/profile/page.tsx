export default function profile() {
    return (
      <div className="container mx-auto mt-10 flex flex-wrap items-start px-4">
      <div className="w-full md:w-1/2">
        <img
          src="/assets/images/gb1.jpg"
          alt="logojcm"
          className="w-full max-w-xl"
        />
      </div>
      <div className="w-full md:w-1/2">
                <div className="inline-block py-2 transition-colors duration-300">
                    <h1 className="text__red border-b-2 ">About Us</h1>
                </div>
        <p className="text-justify">
        In 1976 Construction Management Division of PT Pembangunan Jaya developed and applied the construction management system in projects entrusted to PT Pembangunan Jaya such as Bumi Hyatt Hotel Surabaya, Ratu Plaza Project, Aircraft Industrial Complex of IPTN Bandung and other projects. As further development, PT JAYA CM then established on March 1st, 1983 and continuing the services for large scale of Commercial Buildings, Power Plants, Railways, Airports and Toll Roads. Since 1976 we have delivered services for more than 10.000 million M2 Buildings, 10.000 MW Power Plants, 400 KM Railways, 190 KM Toll Roads.
        </p>
      </div>
    </div>
    );
}
