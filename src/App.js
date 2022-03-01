import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Home from './pages/Home';
import ItemDetail from './components/ItemDetail';
import MenuProvider from './context/MenuContext';
import { ProtectedRoutes } from './routes/ProtectedRoutes';
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <MenuProvider default={[]}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<ProtectedRoutes>
              <Routes>
                <Route path="/" element={<Home />}>
                  <Route exact path="item/:id" element={<ItemDetail />} />
                </Route>
              </Routes>
            </ProtectedRoutes>} />
            {/* <Route path="/search" element={<Home />}>
              <Route exact path="item/:id" element={<ItemDetail />} />
            </Route> */}
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </MenuProvider>
    </AuthProvider>
  );
}

export default App;
