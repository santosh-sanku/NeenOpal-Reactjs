import { useState } from "react";
import "./App.css";
import ProfileCard from "./components/Card/ProfileCard";
import { initialMockData } from "./data/payload";

function App() {
  const [mockData, setMockData] = useState(initialMockData);

  const handleDelete = (id) => {
    setMockData(mockData.filter((profile) => profile.id !== id));
  };

  const handleUpdate = (id, updatedProfile) => {
    console.log(updatedProfile);
    setMockData(
      mockData.map((profile) =>
        profile.id === id ? { ...profile, ...updatedProfile } : profile
      )
    );
  };

  return (
    <div className="cards-container">
      {mockData.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}

export default App;
