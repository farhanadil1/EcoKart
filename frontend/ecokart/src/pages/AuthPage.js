import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import RotatingBanner from '../components/common/RotatingBanner'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import axios from 'axios'
import {toast, Toaster} from 'react-hot-toast'
import Cookies from 'js-cookie'
import {showDeveloperMsg} from '../components/common/DeveloperMsg'

const API = process.env.REACT_APP_API_URL;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [username, setUserName] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation();

  // Preload the background image
  useEffect(() => {
    const img = new Image();
    img.src = "/bg.png";
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    if (mode === 'login') {
      setIsLogin(true);
    } else if (mode === 'register') {
      setIsLogin(false);
    }
  }, [location]);

  const isFormValid =
    email.trim() &&
    password.trim() &&
    (isLogin || (fullName.trim() && username.trim()))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) return

    setLoading(true)

    try {
      if (isLogin) {
        //Login API call
        const response = await toast.promise(
        axios.post(`${API}/users/login`, {
          email,
          password,
        },{
          withCredentials: true
        }),
        {
          loading: 'Logging in...'
        }
      )
    
        console.log('Login success:', response.data)
        
        const user = response.data.data.user; 
        const username = user.username;
        toast.success(`Welcome back, ${username}!`, { duration: 1500 })
        Cookies.set('username', username, { expires: 7 });
        setTimeout(() => {
          navigate(-1)
        }, 1200)
      } else {
        //Register API call
        const response = await toast.promise(
        axios.post(`${API}/users/register`, {
          email,
          password,
          fullName,
          username,
        }),
        {
          loading: 'Signing Up',
          success: 'User Registered Successfully,Try to Login.',
        })
        console.log('Registration success:', response.data)
        setTimeout( () => {
          navigate('/auth?mode=login')
        }, 1200)
      }

      
    } catch (error) {
      console.error('Auth error:', error.response?.data || error.message)
      toast.error(error.response?.data?.message || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="relative min-h-screen font-poppins overflow-hidden">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 z-0">
        <img
          src="/bg.png"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <RotatingBanner />
        <Navbar />

        {/* Form Section */}
        <div className="flex-grow flex items-center justify-center mt-16 mb-16">
          <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
            {/* Tabs */}
            <div className="flex justify-between mb-6 border-b">
              <button
                onClick={() => setIsLogin(true)}
                className={`pb-2 w-1/2 text-center font-medium ${
                  isLogin
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500'
                }`}
              >
                Log in
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`pb-2 w-1/2 text-center font-medium ${
                  !isLogin
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500'
                }`}
              >
                Create account
              </button>
            </div>

            {/* Heading */}
            <h2 className="text-xl font-semibold mb-6">
              {isLogin ? 'Welcome back.' : 'Join us today.'}
            </h2>
            <Toaster position="top-center" />
            {/* Form */}
            <form className="space-y-6">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      User Name *
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full border-b border-gray-400 focus:outline-none focus:border-primary py-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full border-b border-gray-400 focus:outline-none focus:border-primary py-1"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-400 focus:outline-none focus:border-primary py-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-gray-400 focus:outline-none focus:border-primary py-1"
                />
              </div>

              {/* Main Button */}
              <button
                onClick={handleSubmit}
                disabled={!isFormValid || loading}
                className={`w-full py-2 rounded text-white ${
                  isFormValid
                    ? 'bg-primary hover:bg-primary'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {loading ? 'Processing...' : isLogin ? 'Log in' : 'Sign up'}
              </button>

              {/* Alternate Option */}
              {isLogin && (
                <button
                  onClick={(e) => {
                  e.preventDefault();
                    navigate('/auth/login/otp');
                  
                }}
                  type="button"
                  className="w-full py-2 border border-gray-400 rounded text-sm hover:bg-primary hover:text-white"
                >
                  Login without password
                </button>
              )}
            </form>

            {/* Footer Links */}
            <div className="mt-4 text-center text-sm">
              {isLogin ? (
                <button
                  onClick={() => showDeveloperMsg('This feature is under development.')}
                  className="text-blue-500 hover:underline"
                >
                  Forgot password?
                </button>
              ) : (
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-500 hover:underline"
                >
                  Already have an account? Log in
                </button>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
