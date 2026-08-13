import { useAuth } from "../context/AuthContext.jsx";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="neu-card p-8">
        <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
        <p className="text-muted">{user.email}</p>
      </div>
    </div>
  );
};

export default Profile;