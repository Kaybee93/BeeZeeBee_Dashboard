import { useState, useEffect } from "react";
import { set } from "react-native-reanimated";
import { firebase } from '../config'

const useFetch = (endpoint, query) => {
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);

    }

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { isLoading, refetch };
}

export default useFetch;