import { useState, useEffect } from "react";
import { DataTable } from "./datatable";
import logo from "./assets/logo.png";

export default function App() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/curriculum")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setFilteredCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch curriculum:", err);
        setLoading(false);
      });
  }, []);

  const formatCode = (code) => code.toLowerCase().replace(/\s+/g, "");

  const canComplete = async (courseCode) => {
    try {
      const res = await fetch("http://localhost:5000/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          course: courseCode, 
          completed: completed 
        }),
      });
      const data = await res.json();
      return data.canComplete;
    } catch {
      return false;
    }
  };

  const markCompleted = async (courseCode) => {
    if (completed.includes(courseCode)) return;
    
    setCompleted((prev) => [...prev, courseCode]);
  };

  useEffect(() => {
    const updateRowData = async () => {
      const data = await Promise.all(
        filteredCourses.map(async (course) => {
          const canCompleteResult = await canComplete(course.code);
          return {
            ...course,
            completed: completed.includes(course.code),
            canComplete: canCompleteResult,
            prerequisitesList: Array.isArray(course.prerequisites) 
              ? course.prerequisites 
              : []
          };
        })
      );
      setRowData(data);
    };
    
    if (filteredCourses.length > 0) {
      updateRowData();
    }
  }, [filteredCourses, completed]);

  const searchFunction = (value) => {
    if (!value.trim()) return setFilteredCourses(courses);
    const term = value.toLowerCase();
    setFilteredCourses(
      courses.filter(
        (c) =>
          c.code.toLowerCase().includes(term) ||
          (c.description && c.description.toLowerCase().includes(term))
      )
    );
  };

  const colDefs = [
    { 
      headerName: "", 
      field: "completed", 
      width: 50,
      cellRenderer: (params) => (
        <input
          type="checkbox"
          checked={params.data.completed || false}
          disabled={params.data.completed || !params.data.canComplete}
          onChange={() => markCompleted(params.data.code)}
          className="w-4 h-4"
        />
      ), filter: true
    },
    { headerName: "Course Number", field: "code", flex: .5 },
    { headerName: "Description", field: "description", flex: 1.5 },
    { headerName: "Units", field: "units", flex: .5 },
    { headerName: "Year", field: "year", flex: .25 },
    { headerName: "Sem", field: "sem", flex: .25 },
    { 
      headerName: "Prerequisites", 
      field: "prerequisites", 
      flex: 1,
      cellRenderer: (params) => (
        <span className="text-sm">
          {params.data.prerequisitesList && params.data.prerequisitesList.length > 0 
            ? params.data.prerequisitesList.join(", ") 
            : "None"}
        </span>
      )
    },
    { 
      headerName: "Action", 
      field: "action", 
      flex: .5,
      cellRenderer: (params) => (
        <button
          onClick={() => markCompleted(params.data.code)}
          disabled={params.data.completed || !params.data.canComplete}
          className={`px-3 py-1 rounded text-xs font-medium ${
            params.data.completed
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : params.data.canComplete
              ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {params.data.completed ? "Completed" : "Complete"}
        </button>
      )
    },
  ];

  if (loading) {
    return (
      <div className="bg-[#f0f0f0] min-h-screen">
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
          <img src={logo} className="w-40" alt="logo" />
        </div>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading curriculum...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <img src={logo} className="w-40" alt="logo" />
      </div>

      <div className="p-4">
        <DataTable
          colDefs={colDefs}
          rowData={rowData}
          searchFunction={searchFunction}
          searchPlaceholder="Search for a course by code or description"
        />
      </div>
    </div>
  );
}