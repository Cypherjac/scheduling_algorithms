import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const StackOverflowIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='#fff'>
            <path d="M15 21h-10v-2h10v2zm6-11.665l-1.621-9.335-1.993.346 1.62 9.335 1.994-.346zm-5.964 6.937l-9.746-.975-.186 2.016 9.755.879.177-1.92zm.538-2.587l-9.276-2.608-.526 1.954 9.306 2.5.496-1.846zm1.204-2.413l-8.297-4.864-1.029 1.743 8.298 4.865 1.028-1.744zm1.866-1.467l-5.339-7.829-1.672 1.14 5.339 7.829 1.672-1.14zm-2.644 4.195v8h-12v-8h-2v10h16v-10h-2z"/>
        </svg>
    )
}

export default function Footer() {
    return (
        <>
            <div style={{minHeight: "calc(60vh - 250px)"}}></div>
            <footer className="relatve w-screen rounded-lg shadow bg-gray-900">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="https://github.com/Cypherjac/scheduling_algorithms" className="flex items-center mb-4 sm:mb-0">
                            <img src="/images/scheduling_algorithms.png" className="h-14 mr-3" alt="Scheduling Algorithms" />
                        </a>
                        <ul className="flex flex-wrap justify-center items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
                            <li>
                                <a href="https://github.com/Cypherjac" className="mr-4 hover:underline md:mr-6 flex flex-col items-center justify-center">
                                    <GitHubIcon className='text-white'></GitHubIcon>
                                </a>
                            </li>
                            <li>
                                <a href="https://stackoverflow.com/users/13117070/cypherjac" className="mr-4 hover:underline md:mr-6 flex flex-col items-center justify-center">
                                    <StackOverflowIcon></StackOverflowIcon>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/nasir-jacob-663589198" className="mr-4 hover:underline md:mr-6 flex flex-col items-center justify-center">
                                    <LinkedInIcon className='text-white'></LinkedInIcon>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
                    <span className="block text-sm sm:text-center text-gray-400">© 2023 <a href="https://github.com/Cypherjac/scheduling_algorithms" className="hover:underline">Cypherjac ~ scheduling_algorithms</a>.</span>
                </div>
            </footer>
        </>
    )
}