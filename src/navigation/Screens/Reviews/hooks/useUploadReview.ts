import axios from "axios";
import { API } from "constants/routes";
import { useState } from "react";
import { useUser } from "utils/context/UserContext";

interface Input {
  description: string;
  title: string;
  prod_id: number;
  rating: number;
}

export interface State {
  status: 201 | 400;
  message: string;
  error: string | null;
  hasFinished: boolean;
}

export default function useUploadReview() {
  const [response, setResponse] = useState<Partial<State>>({});

  const { user } = useUser();

  async function asyncPostReview(input: Input, token: string) {
    return axios.post(`${API}/ratings`, input, {
      headers: {
        token: token,
      },
    });
  }

  async function upload(input: Input) {
    try {
      const { status } = await asyncPostReview(input, user.token);
      setResponse({
        status: status as 201 | 400,
        error: null,
        message:
          "Your opinion has been uploaded, thank you for your contribution",
      });
    } catch (error: any) {
      setResponse({
        status: 400,
        error: error?.response?.data?.error,
        message: "Something went wrong, try again",
      });
    } finally {
      setResponse((prev) => ({ ...prev, hasFinished: true }));
    }
  }

  return { upload, response, setResponse };
}
