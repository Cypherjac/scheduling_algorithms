import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Theme from './theme'

export default function NavBar(props) {
    return (
        <nav className="bg-white dark:bg-gray-800 fixed z-50 w-screen shadow-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://github.com/Cypherjac/scheduling_algorithms" className="flex items-center">
                    <img src="/images/scheduling_algorithms.png" className="h-14 mr-3" alt="Scheduling Algorithms" />
                </a>
                <Theme></Theme>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 dark:border-gray-700">
                        <li>
                            {
                                props.location == "home" ?
                                    <a className="flex items-center justify-center py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-primary-100 md:p-0 dark:text-white md:dark:text-primary-100" aria-current="page">Home</a>
                                : <a href="/" className="flex items-center justify-center py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-200 md:p-0 dark:text-white md:dark:hover:text-primary-200 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
                            }
                        </li>
                        <li>
                            {
                                props.location == "simulate" ?
                                    <a className="flex items-center justify-center py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-primary-100 md:p-0 dark:text-white md:dark:text-primary-100" aria-current="page">
                                        <PlayArrowIcon className='mr-1'></PlayArrowIcon>
                                        Simulate
                                    </a>
                                : <a href="/simulate" className="flex items-center justify-center py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-200 md:p-0 dark:text-white md:dark:hover:text-primary-200 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    <PlayArrowIcon className='mr-1'></PlayArrowIcon>
                                    Simulate
                                </a>
                            }
                        </li>
                        <li>
                            {
                                props.location == "documentation" ?
                                    <a className="flex items-center justify-center py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-primary-100 md:p-0 dark:text-white md:dark:text-primary-100" aria-current="page">Documentation</a>
                                : <a href="/documentation" className="flex items-center justify-center py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-200 md:p-0 dark:text-white md:dark:hover:text-primary-200 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Documentation</a>
                            }
                        </li>
                        <li>
                            {
                                props.location == "about" ?
                                    <a className="flex items-center justify-center py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-primary-100 md:p-0 dark:text-white md:dark:text-primary-100" aria-current="page">About</a>
                                : <a href="/about" className="flex items-center justify-center py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-200 md:p-0 dark:text-white md:dark:hover:text-primary-200 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}