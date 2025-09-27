export default function Profile() {
  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>This is the profile page</p>
      <button onClick={() => window.location.href = "/login"}>Logout</button>
    </div>
  );
}
