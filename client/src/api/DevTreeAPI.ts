import { isAxiosError } from 'axios';
import api from '../config/axios';
import { User } from '../types';

export async function getUser() {
  try {
    const { data } = await api.get<User>('/auth/user');
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function updateProfile(formData: User) {
  try {
    const { data } = await api.patch<string>('/auth/user', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function uploadImage(file: File) {
  let formData = new FormData();
  formData.append('file', file);
  try {
    const {
      data: { image },
    }: { data: { image: string } } = await api.post('/auth/user/image', formData);
    return image;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
