import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:3000' : "";

export const useProjectStore = create((set, get) => ({

    projects: [],
    loading: false,
    error: null,
    project: null,

    getAllProjects: async () => {

        set({
            projects: [],
            loading: true,
            error: null
        });

        try {
            const response = await axios.get(`${BASE_URL}/api/projects`);
            set({
                projects: response.data.data,
                loading: false,
                error: null
            });

        } catch (err) {
            if (err.status === 429) {
                set({
                    projects: [],
                    error: "Rate limit exceeded."
                });
            } else {
                set({
                    projects: [],
                    error: "Something went wrong. Failed to get all projects."
                });
            }

        } finally {
            set({
                loading: false,
            });
        }
    },

    getProject: async (id) => {

        set({
            project: null,
            loading: true,
            error: null
        });

        try {
            const response = await axios.get(`${BASE_URL}/api/projects/${id}`);
            set({
                project: response.data.data,
                loading: false,
                error: null
            });

        } catch (err) {
            if (err.status === 429) {
                set({
                    project: null,
                    error: "Rate limit exceeded."
                });
                console.log("error", error);
            } else {
                set({
                    project: null,
                    error: `Something went wrong. Faild to get project id: ${id}`
                });
                console.log("error", error);
            }

        } finally {
            set({
                loading: false,
            });
        }
    }
}));