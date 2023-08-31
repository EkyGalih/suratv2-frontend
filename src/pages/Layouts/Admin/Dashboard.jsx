import React, { useEffect } from 'react'
import LayoutAdmin from './LayoutAdmin'
import WelcomeAdmin from '../../../components/Layouts/Admin/Admin'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../../features/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.level !== 'admin') {
      navigate(-1);
    }
  }, [isError, user, navigate]);

  return (
    <LayoutAdmin>
      <WelcomeAdmin />
    </LayoutAdmin>
  )
}

export default Dashboard