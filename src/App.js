import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Layouts/Admin/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Admin/Users/Users";
import Pegawai from "./pages/Admin/Pegawai/Pegawai";
import Bidang from "./pages/Admin/Bidang/Bidang";
import UserAdd from "./pages/Admin/Users/UserAdd";
import UserEdit from "./pages/Admin/Users/UserEdit";
import PegawaiAdd from "./pages/Admin/Pegawai/PegawaiAdd";
import PegawaiEdit from "./pages/Admin/Pegawai/PegawaiEdit";
import BidangAdd from "./pages/Admin/Bidang/BidangAdd";
import BidangEdit from "./pages/Admin/Bidang/BidangEdit";
import DetailPegawai from "./pages/Admin/Pegawai/DetailPegawai";


function App() {
  return (
    <div>
     <BrowserRouter>
      <Routes>
        {/* Route Admin */}
        <Route path="/" element={<Login/>}/>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>

        <Route path="/admin/users" element={<Users/>}/>
        <Route path="/admin/users/add" element={<UserAdd/>}/>
        <Route path="/admin/users/edit/:id" element={<UserEdit/>}/>

        <Route path="/admin/pegawai" element={<Pegawai/>}/>
        <Route path="/admin/pegawai/add" element={<PegawaiAdd/>}/>
        <Route path="/admin/pegawai/edit/:id" element={<PegawaiEdit/>}/>
        <Route path="/admin/pegawai/show/:id" element={<DetailPegawai/>}/>

        <Route path="/admin/bidang" element={<Bidang/>}/>
        <Route path="/admin/bidang/add" element={<BidangAdd/>}/>
        <Route path="/admin/bidang/edit/:id" element={<BidangEdit/>}/>
        {/* End Route Admin */}
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
