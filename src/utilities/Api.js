import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODFmMjdkNDdkZjFhMzJkNjQ3ZDcxMjdiODM3NDgxMSIsInN1YiI6IjY1MGFlMjYzNmMxOWVhMDE0ZjRiOGIwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kpwuuCtpkxemQMQ7nerNVL9obd0c_EqVhw-A0ZEGowk";

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        return err;
    }
};
