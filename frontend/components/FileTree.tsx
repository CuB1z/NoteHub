import { useState } from "react";
import { FileNode } from "@/types/FileNode";
import styles from "@/styles/FileTree.module.css";

interface FileTreeProps {
	nodes: FileNode[];
}

export function FileTree({ nodes }: FileTreeProps) {
	const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

	const toggleFolder = (path: string) => {
		setOpenFolders((prev) => ({
			...prev,
			[path]: !prev[path],
		}));
	};

	const renderTree = (nodes: FileNode[]) => {
		return (
			<ul className={styles.tree}>
				{nodes.map((node) => (
					<li key={node.path} className={styles.treeItem}>
						{node.type === "file" ? (
							<a
								href={`/CuB1z/Obsidian-Notes/${node.path}`}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.file}
							>
								{node.name}
							</a>
						) : (
							<>
								<span
									className={`${styles.folder} ${openFolders[node.path] ? styles.activeFolder : ""}`}
									onClick={() => toggleFolder(node.path)}
								>
									{node.name}
								</span>
								{openFolders[node.path] && node.children && (
									<FileTree nodes={node.children} />
								)}
							</>
						)}
					</li>
				))}
			</ul>
		);
	};

	return renderTree(nodes);
}