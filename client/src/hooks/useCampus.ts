import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';

export const useCampus = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['campuses'],
    queryFn: api.getCampuses,
  });

  const createMutation = useMutation({
    mutationFn: api.createCampus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['campuses'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.updateCampus(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['campuses'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteCampus,
    onSuccess: () => {
      // Invalidate BOTH campuses and students
      queryClient.invalidateQueries({ queryKey: ['campuses'] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  return {
    campuses: data,
    isLoading,
    error,
    addCampus: createMutation.mutate,
    updateCampus: updateMutation.mutate,
    removeCampus: deleteMutation.mutateAsync,
  };
};