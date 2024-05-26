import { create } from 'zustand';
import axios from 'axios';

const useProjectStore = create((set) => ({
  selectedProjectId: null,
  projectData: null,
  isModalOpen: false,
  setSelectedProjectId: (projectId) => set({ selectedProjectId: projectId }),
  setProjectData: (data) => set({ projectData: data }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  fetchProjectData: async (projectId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/projects/${projectId}`
      );
      const data = response.data;
      set({ projectData: data });

      const { status, isUserParticipant, isEvaluationPending } = data;

      if (status === 'closed' && isUserParticipant && isEvaluationPending) {
        set({ isModalOpen: true });
      }
    } catch (error) {
      console.error('Error fetching project data:', error);
      set({ projectData: null });
    }
  },
}));

export default useProjectStore;