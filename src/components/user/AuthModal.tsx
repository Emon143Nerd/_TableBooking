import { useState } from 'react';
import { X, Mail, Lock, User, Phone, Chrome, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '../../store/useAuthStore';

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const login = useAuthStore((state) => state.login);
  const [mode, setMode] = useState<'login' | 'signup' | 'otp'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    otp: '',
  });

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (mode === 'signup') {
        await login({ 
          email: formData.email, 
          password: formData.password,
          provider: 'credentials'
        });
        toast.success(`Welcome ${formData.name}!`);
      } else {
        await login({ 
          email: formData.email, 
          password: formData.password,
          provider: 'credentials'
        });
        toast.success('Welcome back!');
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      toast.error('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await login({ 
        provider: 'google',
        googleUser: {
          id: `g_${Date.now()}`,
          name: 'Google User',
          email: 'user@gmail.com'
        }
      });
      toast.success('Logged in with Google!');
      onClose();
    } catch (err) {
      toast.error('Google Sign-In failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="max-w-md w-full bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-8 pt-8 pb-6 text-center">
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-all text-gray-400 hover:text-[#d4af37]"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 bg-[#d4af37] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#d4af37]/20">
            <User className="w-8 h-8 text-[#0f0f0f]" />
          </div>
          <h2 className="text-white mb-2 text-xl font-bold">
            {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Verify OTP'}
          </h2>
          <p className="text-gray-400">
            {mode === 'login' ? 'Sign in to continue your journey' : mode === 'signup' ? 'Join TableBook today' : 'Enter the code sent to your phone'}
          </p>
        </div>

        <div className="px-8 pb-8">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-200 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {/* Auth Mode Tabs */}
          {mode !== 'otp' && (
            <div className="flex gap-2 bg-black/20 rounded-xl p-1 mb-6">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-2.5 rounded-lg transition-all font-medium ${
                  mode === 'login'
                    ? 'bg-[#d4af37] text-[#0f0f0f] shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 py-2.5 rounded-lg transition-all font-medium ${
                  mode === 'signup'
                    ? 'bg-[#d4af37] text-[#0f0f0f] shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* OTP Mode */}
          {mode === 'otp' ? (
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Enter OTP</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d4af37] w-5 h-5" />
                  <input
                    type="text"
                    placeholder="123456"
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                    required
                    autoComplete="one-time-code"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#d4af37] text-[#0f0f0f] rounded-xl hover:bg-[#b8860b] transition-all font-medium"
              >
                Verify OTP
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full py-2 text-gray-400 hover:text-[#d4af37] transition-colors"
              >
                Back to Login
              </button>
            </form>
          ) : (
            <>
              {/* Email/Password Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm font-medium">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d4af37] w-5 h-5" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                        required
                        autoComplete="name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d4af37] w-5 h-5" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d4af37] w-5 h-5" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-transparent transition-all"
                      required
                      autoComplete={mode === 'signup' ? "new-password" : "current-password"}
                    />
                  </div>
                </div>

                {mode === 'login' && (
                  <div className="text-right">
                    <button 
                      type="button" 
                      className="text-[#d4af37] hover:text-[#f4d03f] transition-colors text-sm"
                      onClick={() => {
                        setFormData({ ...formData, email: 'admin@tablehub.com', password: 'admin123' });
                        toast.info('Autofilled Admin credentials for demo');
                      }}
                    >
                      Forgot Password? (Demo: Use Admin)
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#d4af37] text-[#0f0f0f] rounded-xl hover:bg-[#b8860b] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                </button>
              </form>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#2a2a2a]"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-[#1a1a1a] text-gray-500 text-sm">or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="space-y-3">
                <button
                  onClick={handleGoogleAuth}
                  className="w-full py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl hover:bg-[#3a3a3a] hover:border-[#d4af37]/30 transition-all flex items-center justify-center gap-3"
                >
                  <Chrome className="w-5 h-5 text-gray-300" />
                  <span className="text-gray-300">Google</span>
                </button>

                <button
                  onClick={() => {
                    setMode('otp');
                    toast.success('Switched to OTP login');
                  }}
                  className="w-full py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl hover:bg-[#3a3a3a] hover:border-[#d4af37]/30 transition-all flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5 text-gray-300" />
                  <span className="text-gray-300">Login with OTP</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-[#0f0f0f]/50 backdrop-blur-sm rounded-b-2xl border-t border-[#2a2a2a]">
          <p className="text-center text-gray-400">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[#d4af37] hover:text-[#f4d03f] transition-colors font-medium"
            >
              {mode === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}