import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGoogleAuthMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const GoogleLoginButton = ({ redirect }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [googleAuth, { isLoading }] = useGoogleAuthMutation();

  const onSuccess = async (credentialResponse) => {
    try {
      const res = await googleAuth({ idToken: credentialResponse.credential }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const onError = () => {
    toast.error('Google Login Failed');
  };

  return (
    <div className='my-3'>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        useOneTap
        theme='filled_blue'
        shape='pill'
      />
    </div>
  );
};

export default GoogleLoginButton;
