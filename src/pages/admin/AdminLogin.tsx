import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminAuth } from "@/lib/adminAuth";
import { toast } from "sonner";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await adminAuth.login(email, password);
    setLoading(false);
    
    if (!error) {
      toast.success("Welcome back, Prachi.");
      navigate("/admin");
    } else {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-navy text-cream grid place-items-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm">
        <div className="grid h-12 w-12 place-items-center border border-cream/30 mb-6">
          <Lock size={20} />
        </div>
        <div className="label-eyebrow text-cream/55">Admin · Restricted</div>
        <h1 className="display-serif text-5xl mt-3 mb-10">
          Welcome<br /><span className="italic-accent">back.</span>
        </h1>
        
        <label className="label-eyebrow text-cream/55 block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent border-b border-cream/30 focus:border-gold outline-none py-3 font-serif text-2xl mb-6"
          autoFocus
          required
        />

        <label className="label-eyebrow text-cream/55 block mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-cream/30 focus:border-gold outline-none py-3 font-serif text-2xl pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-cream/55 hover:text-gold transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button type="submit" disabled={loading} className="gold-pill mt-10 w-full disabled:opacity-50">
          {loading ? "Verifying..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
