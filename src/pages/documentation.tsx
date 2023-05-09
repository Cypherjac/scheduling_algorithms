import Layout from '@/components/layout';
import GitHubIcon from '@mui/icons-material/GitHub';

const CodeQueueSort = () => {
    return (
		<div style={{width: "95%"}} className="mx-auto p-8 m-4 text-center dark:text-white bg:gray-100 dark:bg:gray-700">
            <p>
                Documentation under preparation ...
            </p>
            <p className='m-4'>
                Submit any bugs or feature requests through
                <a href='mailto:cypherjac@gmail.com' className='font-bold px-2 py-1 mx-2 rounded-md hover:text-underline bg-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition transition-ease transition-300ms'>EMAIL</a>
                or open a
                <a target='_blank' href='https://github.com/Cypherjac/scheduling_algorithms' className='font-bold px-2 py-1 mx-2 rounded-md hover:text-underline bg-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition transition-ease transition-300ms'>
                    <GitHubIcon className="mr-2"></GitHubIcon>
                    PULL REQUEST
                </a>
            </p>
		</div>
    )
}

export default function Documentation() {
    return (
        <Layout location="documentation">
            <CodeQueueSort></CodeQueueSort>
        </Layout>
    )
}