import React, { useEffect } from 'react'
import { RefreshCwIcon } from 'lucide-react';

import { useProjectStore } from '../stores/useProjectStore'
import ProjectCard from '../components/ProjectCard';

function HomePage() {

    const { projects, loading, error, getAllProjects } = useProjectStore();

    useEffect(() => {
        getAllProjects();
    }, [getAllProjects]);

    console.log("projects", projects);

    return (

        <main className='max-w-6xl mx-auto px-4 py-8'>

            <div className='flex justify-end items-center mb-8'>
                <button className='btn btn-ghost btn-circle' onClick={getAllProjects}>
                    <RefreshCwIcon className='size-5' />
                </button>
            </div>

            {
                error && <div className='alert alert-error mb-8'>
                    {error}
                </div>
            }

            {
                loading ? (
                    <div className='flex justify-center items-center h-64'>
                        <div className='loading loading-spinner loading-lg' />
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {
                            projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        }
                    </div>
                )
            }
        </main>
    )
}

export default HomePage