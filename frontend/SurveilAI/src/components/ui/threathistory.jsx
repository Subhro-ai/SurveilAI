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
      const sampleData = [
        { id: 1, timestamp: '2025-03-20 14:32:45', threatType: 'Unauthorized Access', imageLink: '#' },
        { id: 2, timestamp: '2025-03-20 13:15:22', threatType: 'Suspicious Activity', imageLink: '#' },
        { id: 3, timestamp: '2025-03-20 11:47:03', threatType: 'Weapon Detected', imageLink: '#' },
        { id: 4, timestamp: '2025-03-20 09:22:18', threatType: 'Unauthorized Access', imageLink: '#' },
        { id: 5, timestamp: '2025-03-19 23:41:56', threatType: 'Suspicious Activity', imageLink: '#' },
      ];
      setThreats(sampleData);
      setLoading(false);
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-20 pb-10 relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('/path/to/your/pattern.svg')] opacity-10"></div>

      <div className="w-full max-w-5xl px-4 relative z-10">
        <h2 className="text-2xl font-semibold text-gray-200 text-center mb-6">Threat History</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-800 text-gray-300 text-left">
                <th className="px-6 py-3 border-b border-gray-700">Timestamp</th>
                <th className="px-6 py-3 border-b border-gray-700">Threat Type</th>
                <th className="px-6 py-3 border-b border-gray-700">Image</th>
              </tr>
            </thead>
            <tbody>
              {threats.map((threat, index) => (
                <tr key={threat.id} className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} hover:bg-gray-700 transition-all`}>
                  <td className="px-6 py-3 border-b border-gray-700">{threat.timestamp}</td>
                  <td className="px-6 py-3 border-b border-gray-700">
                    <span className="px-3 py-1 rounded bg-gray-700 text-gray-300 text-xs">{threat.threatType}</span>
                  </td>
                  <td className="px-6 py-3 border-b border-gray-700">
                    <a href={threat.imageLink} className="text-blue-400 hover:underline">View Image</a>
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