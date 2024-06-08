import React from "react";
import { useNavigate } from 'react-router-dom'; 
import { useLocation } from "react-router-dom";


const Dsa = () => {
    const navigate = useNavigate();
    const location = useLocation();
  return (
    <div className="flex flex-col h-screen w-full">
    <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
      <div className="text-2xl font-bold">DSA Learning Platform</div>
      <div className="flex items-center gap-4">
      </div>
    </header>
    <main className="flex-1 overflow-x-auto py-8 px-6">
    <div className="flex gap-6 w-max">
  {[
    { title: "Arrays", progress: 0.3, completed: 2, totalSubtopics: 10 },
    { title: "Linked Lists", progress: 0.6, completed: 4, totalSubtopics: 5 },
    { title: "Stacks", progress: 0.8, completed: 6, totalSubtopics: 11 },
    { title: "Queues", progress: 0.2, completed: 1, totalSubtopics: 8 },
    { title: "Trees", progress: 0.4, completed: 3, totalSubtopics: 6 },
    { title: "Graphs", progress: 0.7, completed: 5, totalSubtopics: 6 },
    { title: "Sorting", progress: 0.9, completed: 7, totalSubtopics: 4 },
    { title: "Searching", progress: 0.1, completed: 1, totalSubtopics: 10 },
    { title: "Searching", progress: 0.1, completed: 1, totalSubtopics: 13 },
    { title: "Searching", progress: 0.1, completed: 1, totalSubtopics: 2 },
  ].map((topic, index) => (
    <div key={index} onClick={() => navigate(`/topic/${index}`, { state: { totalSubtopics: topic.totalSubtopics } })}>
        <Card key={index} className="w-64 flex-shrink-0" >
        <CardContent className="grid gap-4 cursor-pointer">
            <div className="text-lg font-semibold">{topic.title}</div>
            <div className="flex items-center gap-2">
            <div className="flex-1">
                <Progress value={topic.progress * 100} />
            </div>
            <div className="text-sm font-medium">{topic.completed} / {topic.totalSubtopics} subtopics</div>
            </div>
        </CardContent>
        </Card>
    </div>
  ))}
</div>
    </main>
  </div>
  );
};

function Progress({ value }) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${value}%` }}></div>
      </div>
    );
  }

  function CardContent({ children, className }) {
    return (
      <div className={`p-4 ${className}`}>
        {children}
      </div>
    );
  }

  function Card({ children, className }) {
    return (
      <div className={`bg-white shadow rounded-lg p-4 ${className}`}>
        {children}
      </div>
    );
  }

export default Dsa;
