import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ThreatHistoryTable = () => {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    document.documentElement.style.backgroundColor = "black";
    document.body.style.backgroundColor = "black";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    const fetchThreats = async () => {
      // const sampleData = [
      //   { id: 1, timestamp: '2025-03-20 14:32:45', threatType: 'Unauthorized Access', imageLink: '#' },
      //   { id: 2, timestamp: '2025-03-20 13:15:22', threatType: 'Suspicious Activity', imageLink: '#' },
      //   { id: 3, timestamp: '2025-03-20 11:47:03', threatType: 'Weapon Detected', imageLink: '#' },
      //   { id: 4, timestamp: '2025-03-20 09:22:18', threatType: 'Unauthorized Access', imageLink: '#' },
      //   { id: 5, timestamp: '2025-03-19 23:41:56', threatType: 'Suspicious Activity', imageLink: '#' },
      // ];
      try {
        const response = await axios.get("http://192.168.57.214:8000/history")
        setThreats(response.data.history);
        console.log(response.data.history[1].image_link)
        
        setLoading(false);

      } catch (error) {
        console.error("Error fetching prediction:", error);
      }
    
   
    };
    
    fetchThreats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-black">
        <div className="animate-spin w-12 h-12 border-4 border-t-gray-500 border-r-gray-400 border-b-gray-400 border-l-gray-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white flex flex-col items-center pt-20 pb-10 overflow-hidden">
      {/* Background with Parallax Effect */}
      <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="parallax absolute top-20 left-20 w-full h-full rounded-full bg-purple-700 blur-3xl"></div>
          <div className="parallax absolute bottom-20 right-40 w-80 h-80 rounded-full bg-purple-500 blur-3xl"></div>
          <div className="parallax absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900 blur-3xl"></div>
        </div>
      </div>

      <div className="w-full max-w-6xl px-4 relative z-10">
        <h2 className="text-3xl font-bold text-gray-200 text-center mb-8">Threat History</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
          <table className="w-full border-collapse text-base">
            <thead>
              <tr className="bg-gray-800 text-gray-300 text-left">
                <th className="px-8 py-8 border-b border-gray-700 text-center text-lg">Timestamp</th>
                <th className="px-8 py-8 border-b border-gray-700 text-center text-lg">Threat Type</th>
                <th className="px-8 py-8 border-b border-gray-700 text-center text-lg">Image</th>
              </tr>
            </thead>
            <tbody>
              {threats.map((threat, index) => (
                <tr key={threat.id} className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} hover:bg-gray-700 transition-all`}>
                  <td className="px-8 py-8 border-b border-gray-700">{threat.timestamp}</td>
                  <td className="px-8 py-8 border-b border-gray-700">
                    <span className="px-4 py-3 rounded bg-gray-700 text-gray-300 text-m">{threat.threat_type}</span>
                  </td>
                  <td className="px-8 py-8 border-b border-gray-700">
                    <a href={`http://192.168.57.214:8000/${threat.image_link}`} className="text-blue-400 hover:underline text-lg">View Image</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ThreatHistoryTable;
