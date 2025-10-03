import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RotatingBanner from '../components/common/RotatingBanner';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const isFormValid =
    email.trim() &&
    password.trim() &&
    (isLogin || (fullName.trim() && userName.trim()));

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
                      value={userName}
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
                  Email or username *
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
                onClick={(e) => {
                  e.preventDefault();
                  if (isFormValid) {
                    navigate('/home');
                  }
                }}
                disabled={!isFormValid}
                className={`w-full py-2 rounded text-white ${
                  isFormValid
                    ? 'bg-primary hover:bg-primary'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {isLogin ? 'Log in' : 'Sign up'}
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
                  onClick={() => alert('Redirect to password recovery')}
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
