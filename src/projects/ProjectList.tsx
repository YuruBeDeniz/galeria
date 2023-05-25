import { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

type ProjectListProps = {
    projects: Project[];
    onSave: (project: Project) => void;
}

export default function ProjectList({ projects, onSave }: ProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});
  
  const handleEdit = (project: Project) => {
    //console.log(project);
    setProjectBeingEdited(project);
  };

  const cancelEditing = () => {
    setProjectBeingEdited({});
  };


  return (
    <div className="row">
     {projects.map((project) => (
       <div key={project.id} className="cols-sm">
        {project === projectBeingEdited ? 
         <ProjectForm project={project} onCancel={cancelEditing} onSave={onSave}/> :
         <ProjectCard onEdit={handleEdit} project={project} />
        } 
       </div>
     ))}
   </div>
);
}
