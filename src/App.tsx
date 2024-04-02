import "./App.css";
import { FaCalendarAlt, FaDoorOpen, FaUsers } from "react-icons/fa";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import BookingsPage from "./page/BookingsPage";
import BookablesPage from "./page/BookablesPage";
import UsersPage from "./page/UsersPage";
import UserPicker from "./components/user/UserPicker";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/bookings" className="btn btn-header">
                  <FaCalendarAlt />
                  <span>Bookings</span>
                </Link>
              </li>
              <li>
                <Link to="/bookables" className="btn btn-header">
                  <FaDoorOpen />
                  <span>Bookables</span>
                </Link>
              </li>
              <li>
                <Link to="/users" className="btn btn-header">
                  <FaUsers />
                  <span>Users</span>
                </Link>
              </li>
            </ul>
          </nav>

          <UserPicker />
        </header>

        <Routes>
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/bookables" element={<BookablesPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
