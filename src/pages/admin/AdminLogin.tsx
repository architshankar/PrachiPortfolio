import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminAuth } from "@/lib/adminAuth";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminAuth.login(password)) {
      toast.success("Welcome back, Prachi.");
      navigate("/admin");
    } else {
      toast.error("Wrong password");
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
        <label className="label-eyebrow text-cream/55 block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent border-b border-cream/30 focus:border-gold outline-none py-3 font-serif text-2xl"
          autoFocus
        />
        <button type="submit" className="gold-pill mt-10 w-full">
          Enter
        </button>
        <p className="text-cream/40 text-xs mt-8 leading-relaxed">
          Note: This is a client-side password gate stored in the bundle. For real protection, enable Lovable Cloud and store the password as a secret.
        </p>
      </form>
    </div>
  );
}
