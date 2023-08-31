import React, {useEffect} from 'react'
import NavbarAdmin from '../../../components/Layouts/Admin/NavbarAdmin'
import SidebarAdmin from '../../../components/Layouts/Admin/SidebarAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../../features/authSlice'

const LayoutAdmin = ({ children }) => {
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
        <React.Fragment>
            <NavbarAdmin />
            <div className="columns mt-6" style={{ minHeight: "90vh" }}>
                <div className="column-is-2"><SidebarAdmin /></div>
                <div className="column has-background-light">
                    <main>{children}</main>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LayoutAdmin