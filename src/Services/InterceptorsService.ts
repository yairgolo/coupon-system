import axios from "axios";
import { authStore } from "../Redux/AuthState";

class InterceptorsService {

    // put this function in index.tsx
    public createInterceptors(): void {
        
        axios.interceptors.request.use(request => {

            if(authStore.getState().token) {                
                request.headers['Authorization'] = "Bearer " + authStore.getState().token
            };

            return request; // Must return the changed request.
            
        });
    }

}

const interceptorsService = new InterceptorsService();

export default interceptorsService;