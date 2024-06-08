import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
// import { Spinner } from "../../components/Spinner";


const TopicPage = () => {
  let { id } = useParams();
    const location = useLocation();
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { totalSubtopics } = location.state || {};
    const n = parseInt(totalSubtopics, 10); 

    const fetchData = async () => {
      try {
        const response = await axios.get('https://wow-syncfissionapi.vercel.app/problems');
        const data = response.data;
        // Slice the array to get the first 'n' objects
        setProblems(data.slice(0, n));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    
    setLoading(false)
    fetchData();
  }, [id]); 

  return (
    <div className="flex flex-col items-center gap-5">
      {problems.map((problem, index) => (
        <div key={index} className="w-full m-2 p-5 border border-gray-300 rounded-lg flex  items-center gap-2 text-white justify-evenly">
          <h3 className="text-yellow-300">{problem.title}</h3>
          <p>Difficulty: <span className={problem.difficulty === "Easy" ? "text-green-600" : problem.difficulty === "Medium" ? "text-yellow-600" : "text-red-600"}>{problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}</span></p>
          <a href={problem.lc_link}  className="flex items-center no-underline text-inherit text-green-400 cursor-pointer">
            code <FontAwesomeIcon icon={faCode} className="text-green-400"/> 
          </a>
        </div>
      ))}
    </div>
  );
};

export default TopicPage;