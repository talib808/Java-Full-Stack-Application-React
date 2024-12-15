
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddStudent from "../src/add-student"
import ViewStudents from "../src/view-students"
function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<AddStudent />} />
    <Route path = "view-students" element = {<ViewStudents/>}/>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
