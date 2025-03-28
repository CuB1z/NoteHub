"use client";

import { useState } from "react";
import { FileNode } from "@/types/FileNode";
import styles from "@/styles/FileTree.module.css";

interface FileTreeProps {
	basePath: string;
	nodes: FileNode[] | null;
}

export function FileTree({ nodes, basePath }: FileTreeProps) {
	const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

	const toggleFolder = (path: string) => {
		setOpenFolders((prev) => ({
			...prev,
			[path]: !prev[path],
		}));
	};

	if (!nodes) {
		return <p>No repository files found.</p>;
	}

	const renderTree = (nodes: FileNode[]) => {
		return (
			<ul className={styles.tree}>
				{nodes.map((node) => (
					<li key={node.path} className={styles.treeItem}>
						{node.type === "file" ? (
							<a
								href={`/${basePath}/${node.name}`}
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
									<FileTree nodes={node.children} basePath={`${basePath}/${node.name}`} />
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