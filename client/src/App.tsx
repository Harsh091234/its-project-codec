
import { Route, Routes } from 'react-router-dom'
import HomePage from './screens/HomePage'
import RegisterPage from './screens/RegisterPage';
import EditPage from './screens/EditPage';
import ProfilePage from './screens/ProfilePage';
import Header from './components/Header';


const App = () => {
  return (
    <div className='min-h-screen bg-neutral-200 flex flex-col '>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/userprofile/:id" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App
