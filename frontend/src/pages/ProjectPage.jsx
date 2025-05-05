import React, { useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";
import { useProjectStore } from '../stores/useProjectStore';
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";

const ProjectPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const { project, loading, error, getProject } = useProjectStore();

    useEffect(() => {
        getProject(id);
    }, [getProject, id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loading loading-spinner loading-lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="alert alert-error">{error}</div>
            </div>
        );
    }

    if (project) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 p-2 rounded-xl">

                <button onClick={() => navigate("/")} className="btn btn-ghost mb-8 justify-start">
                    <ArrowLeftIcon className="size-4 mr-2" />
                    Back to Projects
                </button>

                <div>
                    {/* PROJECT IMAGE */}
                    <figure className="relative pt-[56.25%]">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="absolute top-0 left-0 w-full h-full object-contain rounded-t-xl"
                        />
                    </figure>
                </div>

                <div className="card-body space-y-2">
                    <h2 className="card-title text-2xl font-bold text-neutral-800">{project.title}</h2>
                    <p className="inline-block px-2 py-1 bg-primary text-white font-semibold rounded-full w-fit">
                        {project.technology}
                    </p>
                    <p className="text-base text-neutral-600">{project.summary}</p>
                    <p className="text-base text-neutral-600">{project.description}</p>

                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline space-x-1"
                    >
                        <span>See the source code on GitHub</span>
                        <ExternalLinkIcon className="size-4" />
                    </a>

                    <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline space-x-1"
                    >
                        <span>Test out the project on the Website</span>
                        <ExternalLinkIcon className="size-4" />
                    </a>

                </div>

            </div>
        )
    }
}

export default ProjectPage