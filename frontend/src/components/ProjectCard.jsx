import React from 'react'
import { Link } from 'react-router-dom'

function ProjectCard({ project }) {

    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 p-2 rounded-xl">
            <Link to={`/project/${project.id}`}>
                {/* PROJECT IMAGE */}
                <figure className="relative pt-[56.25%]">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="absolute top-0 left-0 w-full h-full object-contain rounded-t-xl"
                    />
                </figure>

                <div className="card-body space-y-2">
                    <h2 className="card-title text-2xl font-bold text-neutral-800">{project.title}</h2>
                    <p className="inline-block px-2 py-1 bg-primary text-white font-semibold rounded-full w-fit">
                        {project.technology}
                    </p>
                    <p className="text-base text-neutral-600">{project.summary}</p>
                </div>
            </Link>
        </div>
    );
}

export default ProjectCard