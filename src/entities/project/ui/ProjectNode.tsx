import { useState } from "react";
import type { Project } from "../model/types";

export function ProjectNode({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setOpen(!open)}>
        {open ? "▼" : "➤"} {project.name}
      </div>

      {open &&
        project.milestones.map((m) => (
          <div key={m.id} style={{ paddingLeft: 16 }}>
            {m.name}
          </div>
        ))}
    </div>
  );
}
