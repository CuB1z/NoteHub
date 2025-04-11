import { FileNode } from "./FileNode";
import { RepositoryData } from "./RepositoryData";

export interface RepositoryResponse {
    repoData: RepositoryData;
    repoStructure: FileNode[];
}