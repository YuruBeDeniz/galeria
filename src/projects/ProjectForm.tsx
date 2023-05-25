import { SyntheticEvent, useState } from "react";
import { Project } from "./Project";


type ProjectFormProps = {
    onCancel: () => void;
    onSave: (project: Project) => void;
    project: Project;
}

export default function ProjectForm({ onCancel, onSave, project: initialProject }: ProjectFormProps) {
  const [project, setProject] = useState(initialProject);
  
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSave(project);
  };

  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;

    let updatedValue = type === "checkbox" ? checked : value;

    if(type === "number") {
      updatedValue = Number(updatedValue)
    };

    const change = {
      [name]: updatedValue,
    };

    console.log(change)

    let updatedProject: Project;
    // need to do functional update b/c
    // the new project state is based on the previous project state
    // so we can keep the project properties that aren't being edited +like project.id
    // the spread operator (...) is used to
    // spread the previous project properties and the new change

    setProject((p) => {
      console.log(p)
      updatedProject = new Project({ ...p, ...change });
      return updatedProject;
    })
  }

  return (
    <form 
        onSubmit={handleSubmit}
        className="input-group vertical">
      <label htmlFor="name">Project Name</label>
      <input type="text" name="name" value={project.name} onChange={handleChange} placeholder="enter name" />
      
      <label htmlFor="description">Project Description</label>
      <textarea name="description" value={project.description} onChange={handleChange} placeholder="enter description" />
      
      <label htmlFor="budget">Project Budget</label>
      <input type="number" name="budget" value={project.budget} onChange={handleChange} placeholder="enter budget" />
      
      <label htmlFor="isActive">Active?</label>
      <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />
      
      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span />
        <button 
          onClick={onCancel}
          type="button" 
          className="bordered medium"
        >
          cancel
        </button>
      </div>
    </form>

  )
}
