import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Media } from "./AppTypes";

export const queryClient = new QueryClient();

export const getLatestMedia = async ({
  type = "movie",
  limit = 1,
}: {
  type?: string;
  limit: number;
}) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/latest-media/?type=${type}&limit=${limit}`
    );
    return response.data.media as Media[];
  } catch (err: any) {
    throw err;
  }
};

export const getMedia = async ({
  path,
  signal,
}: {
  path: string;
  signal: AbortSignal;
}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API}/get-media/${path}`,
      { signal }
    );
    return response.data.media as Media;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getAllMedia = async ({
  pageParam,
  maxPerPage,
  type,
  genre,
  keyword,
  signal,
}: {
  pageParam: number;
  maxPerPage: number;
  type: string;
  genre: string;
  keyword: string;
  signal?: AbortSignal;
}) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/get-media/?page=${pageParam}&maxPerPage=${maxPerPage}&type=${type}&genre=${genre}&keyword=${keyword}`,
      { signal }
    );
    return response.data.media as Media[];
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getRandomMedia = async ({
  path,
  signal,
}: {
  path: string;
  signal: AbortSignal;
}) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/random-media/?size=5&currentPath=${path}`,
      { signal }
    );
    return response.data.media as Media[];
  } catch (err: any) {
    throw new Error(err);
  }
};
