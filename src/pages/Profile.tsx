import { useState } from "react";
import { useAuth, type UserProfile } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Package, Lock, LogOut, LogIn } from "lucide-react";
import { toast } from "sonner";

/* ------------------------------------------------------------------ */
/*  Login / Signup form (shown when not logged in)                     */
/* ------------------------------------------------------------------ */

const AuthForm = () => {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const success = login(form.email, form.password);
      if (success) toast.success("Welcome back!");
      else toast.error("Invalid email or password");
    } else {
      const profile: UserProfile = { name: form.name, email: form.email, phone: form.phone, address: form.address };
      signup(profile, form.password);
      toast.success("Account created!");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-card rounded-xl border border-border p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <LogIn className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">{isLogin ? "Login" : "Create Account"}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isLogin ? "Sign in to access your account" : "Register to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <Label>Full Name</Label>
                <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Address</Label>
                <Input value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} className="mt-1" />
              </div>
            </>
          )}
          <div>
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="mt-1" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} className="mt-1" />
          </div>
          <Button type="submit" className="w-full">{isLogin ? "Login" : "Sign Up"}</Button>
        </form>

        <p className="text-sm text-center mt-4 text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button className="text-primary font-medium" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Profile dashboard (shown when logged in)                           */
/* ------------------------------------------------------------------ */

const ProfileDashboard = () => {
  const { user, orders, updateProfile, changePassword, logout } = useAuth();
  const [editForm, setEditForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", address: user?.address || "" });
  const [passForm, setPassForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(editForm);
    toast.success("Profile updated!");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passForm.newPassword !== passForm.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    const success = changePassword(passForm.oldPassword, passForm.newPassword);
    if (success) {
      toast.success("Password changed!");
      setPassForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      toast.error("Current password is incorrect");
    }
  };

  const STATUS_COLORS: Record<string, string> = {
    Processing: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
            {user?.name?.[0] || "U"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{user?.name}</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="profile" className="gap-2"><User className="h-4 w-4" />Profile</TabsTrigger>
          <TabsTrigger value="orders" className="gap-2"><Package className="h-4 w-4" />Orders</TabsTrigger>
          <TabsTrigger value="password" className="gap-2"><Lock className="h-4 w-4" />Password</TabsTrigger>
        </TabsList>

        {/* Profile tab */}
        <TabsContent value="profile">
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
              <div>
                <Label>Full Name</Label>
                <Input value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={editForm.email} onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={editForm.phone} onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Address</Label>
                <Input value={editForm.address} onChange={(e) => setEditForm((f) => ({ ...f, address: e.target.value }))} className="mt-1" />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </div>
        </TabsContent>

        {/* Orders tab */}
        <TabsContent value="orders">
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold mb-4">Order History</h2>
            {orders.length === 0 ? (
              <p className="text-muted-foreground text-sm">No orders yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-mono text-sm font-bold">{order.id}</span>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <Badge className={STATUS_COLORS[order.status] || ""}>{order.status}</Badge>
                    </div>
                    <div className="space-y-1 mb-3">
                      {order.items.map((item, i) => (
                        <p key={i} className="text-sm text-muted-foreground">
                          {item.name} × {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      ))}
                    </div>
                    <Separator />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm font-medium">Total</span>
                      <span className="font-bold">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Password tab */}
        <TabsContent value="password">
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold mb-4">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
              <div>
                <Label>Current Password</Label>
                <Input type="password" value={passForm.oldPassword} onChange={(e) => setPassForm((f) => ({ ...f, oldPassword: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>New Password</Label>
                <Input type="password" value={passForm.newPassword} onChange={(e) => setPassForm((f) => ({ ...f, newPassword: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Confirm New Password</Label>
                <Input type="password" value={passForm.confirmPassword} onChange={(e) => setPassForm((f) => ({ ...f, confirmPassword: e.target.value }))} className="mt-1" />
              </div>
              <Button type="submit">Update Password</Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Page wrapper                                                       */
/* ------------------------------------------------------------------ */

const Profile = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {isLoggedIn ? <ProfileDashboard /> : <AuthForm />}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
