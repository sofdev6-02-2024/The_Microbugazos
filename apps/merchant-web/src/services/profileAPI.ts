import axiosInstance from "@/request/AxiosConfig";
import axios from "axios";
import {BackendProfileData} from "@/types/auth";

export class ProfileAPI {
    static async updateBackendProfile(token: string, data: BackendProfileData): Promise<void> {
        try {
            const response = await axiosInstance.put('/users/Auth', {
                name: data.Name,
                email: data.Email
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.data) {
                throw new Error('Failed to update profile in backend');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error('Failed to update profile in backend');
        }
    }
}