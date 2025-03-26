// filepath: a:\CuB1\markdown-publisher\frontend\components\FileTree.tsx
import { FileNode } from "../types/FileNode";

interface FileTreeProps {
  nodes: FileNode[];
}

export function FileTree({ nodes }: FileTreeProps) {
  const renderTree = (nodes: FileNode[]) => {
    return (
      <ul>
        {nodes.map((node) => (
          <li key={node.path}>
            {node.type === "file" ? (
              <a href={node.url} target="_blank" rel="noopener noreferrer">
                {node.name}
              </a>
            ) : (
              <>
                <strong>{node.name}</strong>
                {node.children && <FileTree nodes={node.children} />}
              </>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return renderTree(nodes);
}