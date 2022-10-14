import { toast } from 'react-toastify';

export const toaster = (msg, type = null) => {
    if (type === 'warn') {
        toast.warn(msg);
    } else if (type === 'success') {
        toast.success(msg);
    } else if (type === 'error') {
        toast.error(msg);
    } else {
        toast(msg);
    }
}