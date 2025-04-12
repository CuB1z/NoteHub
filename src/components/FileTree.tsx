"use client";
import styles from "@/styles/FileTree.module.css";
import { useState } from "react";
import { FileNode } from "@/types/FileNode";
import { Folder, FolderOpen, File as FileIcon } from "lucide-react";

interface FileTreeProps {
	basePath: string;
	nodes: FileNode[] | null;
	recursive?: boolean;
}

export function FileTree({ nodes, basePath, recursive }: FileTreeProps) {
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
			<div className={`${styles.tree} ${recursive ? styles.recursive : ""}`}>
				{!recursive && <h2 className={styles.title}>{basePath}</h2>}
				<ul className={styles.treeList}>
					{nodes.map((node) => (
						<li key={node.path} className={styles.treeItem}>
							{node.type === "file" ? (
								<a href={`/${basePath}/${node.name}`} className={styles.file}>
									<FileIcon className={styles.icon} size={16} />
									<span className={styles.fileName}>{node.name}</span>
								</a>
							) : (
								<>
									<span
										className={`${styles.folder} ${openFolders[node.path] ? styles.activeFolder : ""}`}
										onClick={() => toggleFolder(node.path)}
									>
										{openFolders[node.path] ? (
											<FolderOpen className={styles.icon} size={16} />
										) : (
											<Folder className={styles.icon} size={16} />
										)}
										{node.name}
									</span>
									{openFolders[node.path] && node.children && (
										<FileTree
											nodes={node.children}
											basePath={`${basePath}/${node.name}`}
											recursive
										/>
									)}
								</>
							)}
						</li>
					))}
				</ul>
			</div>
		);
	};

	return renderTree(nodes);
}
