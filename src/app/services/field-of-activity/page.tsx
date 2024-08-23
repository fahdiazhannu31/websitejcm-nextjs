import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faBuilding, faBolt, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';

export default function fieldActivity() {
    return (
        <>
        <div className="container mx-auto mt-10 flex flex-wrap justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="red__jcm shadow-lg rounded-full p-4 h-48 w-48 flex flex-col items-center justify-center">
                    <FontAwesomeIcon icon={faTruck} className="h-12 w-12 text-white mb-2" />
                    <h2 className="text-xl font-semibold text-white">Transportation</h2>
                </div>
                <div className="red__jcm shadow-lg rounded-full p-4 h-48 w-48 flex flex-col items-center justify-center">
                    <FontAwesomeIcon icon={faBuilding} className="h-12 w-12 text-white mb-2" />
                    <h2 className="text-xl font-semibold text-white">Building</h2>
                </div>
                <div className="red__jcm shadow-lg rounded-full p-4 h-48 w-48 flex flex-col items-center justify-center">
                    <FontAwesomeIcon icon={faBolt} className="h-12 w-12 text-white mb-2" />
                    <h2 className="text-xl font-semibold text-white">Power Plant and Transmission</h2>
                </div>
                <div className="red__jcm shadow-lg rounded-full p-4 h-48 w-48 flex flex-col items-center justify-center">
                    <FontAwesomeIcon icon={faPuzzlePiece} className="h-12 w-12 text-white mb-2" />
                    <h2 className="text-xl font-semibold text-white">Other Projects</h2>
                </div>
            </div>
        </div>
        </>
    );
}


