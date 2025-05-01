import React from "react";

const Screenshot = () => {
  const [screenshot, setScreenshot] = React.useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = React.useState("");

  // Fetch screenshot data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/screenshot");
        const data = await response.json();
        console.log("Fetched screenshot data:", data);

        if (Array.isArray(data)) {
          setScreenshot(data);
        } else if (typeof data === "object" && data !== null) {
          setScreenshot([data]); // 👈 Wrap single object into array
        } else {
          console.warn("Unexpected data format:", data);
          setScreenshot([]);
        }
      } catch (error) {
        console.error("Error fetching screenshot data:", error);
        setScreenshot([]);
      }
    };

    fetchData();
  }, []);

  // Extract unique employee IDs
  // const screenshotIds = Array.isArray(screenshot)
  //   ? [...new Set(screenshot.map((item) => item.employee_id))]
  //   : [];
  const screenshotIds = Array.isArray(screenshot)
    ? [...new Set(screenshot.map((item) => item.employee_id))].sort((a, b) =>
        a === null ? 1 : b === null ? -1 : a - b
      )
    : [];

  // Filtered screenshots
  const filteredScreenshots = selectedEmployeeId
    ? screenshot.filter(
        (item) => String(item.employee_id) === String(selectedEmployeeId)
      )
    : screenshot;

  return (
    <div className="w-full p-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">🖼️ Employee Screenshots</h1>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Employee ID:</label>
        <select
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="">All</option>
          {screenshotIds.map((id) => (
            <option key={id ?? "null"} value={String(id)}>
              {id === null ? "Unassigned" : id}
            </option>
          ))}
        </select>
      </div>

      {/* Screenshot Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredScreenshots.length > 0 ? (
          filteredScreenshots.map((screen, index) => (
            <div key={index} className="border p-2 rounded shadow">
              <img
                src={`http://127.0.0.1:5000/${screen.file_path}`}
                alt={`Screenshot ${index}`}
                className="w-full h-48 object-cover rounded"
              />
              <p className="text-center mt-2 text-sm">
                Employee ID:{" "}
                {screen.employee_id === null
                  ? "Unassigned"
                  : screen.employee_id}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No screenshots available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Screenshot;
