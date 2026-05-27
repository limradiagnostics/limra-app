import { syncUserAPI } from "@/api/clinic.api";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSyncUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.log(error.message);
      return;
    }

    console.log(data.user);
    setUser(data.user);

    try {
      await syncUserAPI(
        data.user.id,
        data.user.user_metadata?.full_name!,
        data.user.email,
        data.user.user_metadata?.avatar_url! || null,
      );

      console.log("Clinic user sync to database");
    } catch (error) {
      console.log("Clinic user already exist in database");
    }
  };

  useEffect(() => {
    handleSyncUser();
  }, []);

  return (
    <div className="flex justify-center items-center w-full min-h-screen flex-col gap-y-6">
      {!user && <Button onClick={handleLogin}>Continue with Google</Button>}
      {user && <Button onClick={handleLogout}>Logout</Button>}
      {user && <h1>{user?.id!}</h1>}
    </div>
  );
};

export default Dashboard;
