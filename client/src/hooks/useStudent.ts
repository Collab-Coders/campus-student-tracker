import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';

export const useStudent = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: api.getStudents,
  });

  const createMutation = useMutation({
    mutationFn: api.createStudent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.updateStudent(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteStudent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  });

  return {
    students: data,
    isLoading,
    error,
    addStudent: createMutation.mutateAsync,
    updateStudent: updateMutation.mutateAsync,
    removeStudent: deleteMutation.mutateAsync,
  };
};