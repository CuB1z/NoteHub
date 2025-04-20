"use client";
import styles from "@/styles/FileTree.module.css";
import { useState } from "react";
import { FileNode } from "@/types/FileNode";
import { Folder, FolderOpen, File as FileIcon } from "lucide-react";

interface FileTreeProps {
	basePath: string;
	nodes: FileNode[] | null;
	recursive?: boolean;
	selectedNode?: FileNode | null;
}

// Function to initialize open folders based on the selected node's path
function initializeOpenFolders(node?: FileNode): Record<string, boolean> {
	if (!node) return {};

	const foldersTree = node.path.split("/").slice(0, -1);
	const openFolders: Record<string, boolean> = {};

	for (let i = 0; i < foldersTree.length; i++) {
		const folderPath = foldersTree.slice(0, i + 1).join("/");
		if (folderPath) {
			openFolders[folderPath] = true;
		}
	}

	return openFolders;
}

export function FileTree({ nodes, basePath, recursive, selectedNode }: FileTreeProps) {
	const [openFolders, setOpenFolders] = useState<Record<string, boolean>>(
		initializeOpenFolders(selectedNode || undefined)
	);

	const handleFileClick = (path: string) => {
		const event = new CustomEvent("fileClick", { detail: { path } });
		window.dispatchEvent(event);
	}

	const toggleFolder = (path: string) => {
		console.log("Toggling folder:", path);
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
				<ul className={styles.treeList}>
					{nodes.map((node) => (
						<li key={node.path} className={styles.treeItem}>
							{node.type === "file" ? (
								<span
									className={`${styles.file} ${selectedNode?.path === node.path ? styles.selected : ""}`}
									onClick={() => handleFileClick?.(node.path)}
								>
									<FileIcon className={styles.icon} size={16} />
									<span className={styles.fileName}>{node.name}</span>
								</span>
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
											selectedNode={selectedNode}
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
