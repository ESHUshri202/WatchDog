import React, { useEffect, useState } from "react";

const LogActivity = () => {
  const [activity, setActivity] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [filteredActivity, setFilteredActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/log-acitivity");
        const data = await response.json();
        console.log(data);
        setActivity(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter activity logs based on selected employee ID
    if (selectedEmployeeId) {
      const filtered = activity.filter(
        (item) => String(item.employee_id) === String(selectedEmployeeId)
      );
      setFilteredActivity(filtered);
    } else {
      setFilteredActivity(activity);
    }
  }, [selectedEmployeeId, activity]);

  // Get unique employee IDs for the dropdown
  const employeeIds = [...new Set(activity.map((item) => item.employee_id))];

  return (
    <div className="w-full p-4 ">
      <div className="bg-orange-100 text-center p-4">
        <h1 className="text-4xl font-bold">🧑‍🏭 Employees Activity Logs</h1>
      </div>

      {/* Employee ID Filter */}
      <div className="my-4">
        <label className="mr-2 font-semibold">Filter by Employee ID:</label>
        <select
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="">All</option>
          {employeeIds.map((id) => (
            <option key={id} value={String(id)}>
              {id}
            </option>
          ))}
        </select>
      </div>

      <div className="border w-full overflow-auto max-h-[500px]">
  <table className="w-full">
    <thead>
      <tr className="bg-orange-200 border">
        <th className="border-r">Employee ID</th>
        <th className="border-r">Process Name</th>
        <th className="border-r">Timestamp</th>
        <th className="border-r">Password</th>
        <th className="border-r">Log Activity</th>
        <th>Log Screenshot</th>
      </tr>
    </thead>
    <tbody>
      {filteredActivity.map((active, index) => (
        <tr key={index} className="border-b">
          <td className="border-r">{active.employee_id}</td>
          <td className="border-r">{active.process_name}</td>
          <td className="border-r">{active.timestamp}</td>
          <td className="border-r">{active.password}</td>
          <td className="border-r">View</td>
          <td>View 2</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default LogActivity;
