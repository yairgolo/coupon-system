import { Notyf } from "notyf";
import { type } from "os";

class NotificationService {
    private notify = new Notyf({duration: 4000, position:{x:"center", y:"top"}, dismissible: true});

    public success(message: string): void {
        this.notify.success(message);
    }

    public error(err: any): void {
        const message = this.extractErrorMessage(err);
        this.notify.error(message);
    }

    private extractErrorMessage(err: any): string {         
        
        if(typeof err === "string") return err;

        if(typeof err.response?.data?.errorMsg === "string") return err.response.data.errorMsg;
        
        if(err.response?.data === "") return "failed, please log in again!";

        if(typeof err.response?.data === "string") return err.response.data;

        if(Array.isArray(err.response?.data)) return err.response.data[0];

        if(typeof err.message === "string") return err.message;        

        return "some error occurred, please try again"
    }
}

const notificationService = new NotificationService();

export default notificationService;