import { toast } from 'vue-sonner';

const useNotify = () => {

  const success = (message: string) => {
    toast.success(message);
  };

  const error = (message: string) => {
    toast.error(message);
    console.log('toasting');
  };

  const warning = (message: string) => {
    toast.warning(message);
  };

  return {
    success,
    error,
    warning
  };
};

export default useNotify;
