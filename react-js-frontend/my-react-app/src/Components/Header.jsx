import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, username, setIsAuthenticated }) => {
const navigator = useNavigate();

function Register() {
    navigator('/register')
}
function Login() {
    navigator('/login')
}

const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    navigator('/');
  };
    
    return (
        <div>
            <nav className='navbar'>
                <div className='container-lg'>
                    <h2 onClick={() => navigator('/')}>Charlie's Restaurant</h2>
                    {!isAuthenticated ? (
                    <div>
                        <button type="button" className="btn btn-light btn-sm" onClick={Login}>Login</button>
                        <button type="button" className="btn btn-light btn-sm m-2" onClick={Register}>SignUp</button>
                    </div>
                    ) : (
                    <div>
                    <span>Welcome, <strong>{username}</strong>! </span>
                    <button type="button" className="btn btn-light btn-sm m-2" onClick={handleLogout}>
                        Logout</button>
                    <button type="button" className="btn btn-light btn-sm m-2" onClick={() => navigator('/cart')}>
                        Cart</button>
                    </div>
                    )}
                </div>
            </nav>

        </div>
    )
}

export default Header
