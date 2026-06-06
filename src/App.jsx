import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './Screens/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}