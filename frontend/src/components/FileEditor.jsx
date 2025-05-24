import React, { useState, useEffect } from 'react';
import useGithubStore from '../stores/githubStore';
import useGithubAuth from '../hooks/useGithubAuth';
import { Loader2Icon, SaveIcon, FolderIcon, FileIcon, ArrowLeftIcon } from 'lucide-react';

// Component for viewing and editing repository files
const FileEditor = ({ repoOwner, repoName }) => {
  const [path, setPath] = useState('');
  const [content, setContent] = useState('');
  const [commitMessage, setCommitMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [showCreateFileForm, setShowCreateFileForm] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { 
    repoContents, 
    fetchRepositoryContents, 
    fetchFileContent, 
    createOrUpdateFile,
    currentFile,
    isLoading, 
    error 
  } = useGithubStore();
  
  const { 
    getGithubToken, 
    hasValidGithubToken, 
    handleGithubError, 
    setError 
  } = useGithubAuth();

  // Load repository contents when component mounts or path changes
  useEffect(() => {
    if (hasValidGithubToken() && repoOwner && repoName) {
      loadContents(path);
    }
  }, [repoOwner, repoName, path]);

  // Update breadcrumbs when path changes
  useEffect(() => {
    const pathParts = path ? path.split('/').filter(Boolean) : [];
    const crumbs = [{ name: 'Root', path: '' }];
    
    let currentPath = '';
    pathParts.forEach(part => {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      crumbs.push({ name: part, path: currentPath });
    });
    
    setBreadcrumbs(crumbs);
  }, [path]);

  const loadContents = async (contentPath) => {
    try {
      const token = getGithubToken();
      if (!token) {
        setError('GitHub access token not found. Please login again.');
        return;
      }
      
      await fetchRepositoryContents(token, repoOwner, repoName, contentPath);
      setIsEditMode(false);
      setContent('');
    } catch (error) {
      handleGithubError(error);
    }
  };

  const handleFileClick = async (file) => {
    try {
      if (file.type === 'dir') {
        // Navigate to directory
        setPath(file.path);
      } else {
        // Fetch and display file content
        const token = getGithubToken();
        if (!token) {
          setError('GitHub access token not found. Please login again.');
          return;
        }
        
        const fileData = await fetchFileContent(token, repoOwner, repoName, file.path);
        setContent(fileData.decodedContent);
        setIsEditMode(true);
        setCommitMessage(`Update ${file.name}`);
      }
    } catch (error) {
      handleGithubError(error);
    }
  };

  const handleSaveFile = async () => {
    try {
      const token = getGithubToken();
      if (!token) {
        setError('GitHub access token not found. Please login again.');
        return;
      }
      
      if (!commitMessage.trim()) {
        setError('Commit message is required');
        return;
      }
      
      // Get current file path from the currentFile object
      const filePath = currentFile.path;
      
      await createOrUpdateFile(
        token,
        repoOwner,
        repoName,
        filePath,
        content,
        commitMessage
      );
      
      // Reload contents to reflect changes
      loadContents(path);
    } catch (error) {
      handleGithubError(error);
    }
  };

}

export default FileEditor;