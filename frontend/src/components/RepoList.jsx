import React, { useEffect, useState } from 'react';
import useGithubStore from '../stores/githubStore';
import useGithubAuth from '../hooks/useGithubAuth';
import { Loader2Icon, FolderIcon, PlusIcon } from 'lucide-react';

const RepoList = () => {
  const { repositories, fetchUserRepositories, isLoading, error } = useGithubStore();
  const { getGithubToken, hasValidGithubToken, handleGithubError, setError } = useGithubAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRepoName, setNewRepoName] = useState('');
  const [newRepoDesc, setNewRepoDesc] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    // Load repositories when component mounts
    if (hasValidGithubToken()) {
      loadRepositories();
    }
  }, []);

  const loadRepositories = async () => {
    try {
      const token = getGithubToken();
      if (!token) {
        setError('GitHub access token not found. Please login again.');
        return;
      }
      
      await fetchUserRepositories(token);
    } catch (error) {
      handleGithubError(error);
    }
  };

  const handleCreateRepo = async (e) => {
    e.preventDefault();
    
    if (!newRepoName.trim()) {
      setError('Repository name is required');
      return;
    }

    try {
      const token = getGithubToken();
      if (!token) {
        setError('GitHub access token not found. Please login again.');
        return;
      }
      
      await useGithubStore.getState().createRepository(token, {
        name: newRepoName.trim(),
        description: newRepoDesc.trim(),
        private: isPrivate,
        autoInit: true
      });
      
      // Reset form
      setNewRepoName('');
      setNewRepoDesc('');
      setIsPrivate(false);
      setShowCreateForm(false);
    } catch (error) {
      handleGithubError(error);
    }
  };

  if (!hasValidGithubToken()) {
    return (
      <div className="p-4 text-center">
        <p>GitHub authentication required. Please log in again.</p>
      </div>
    );
  }

  return (
    <div className="p-4 text-neutral-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Repositories</h2>
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-1 bg-neon-yellow text-black px-4 py-2 rounded-md hover:opacity-90 transition-all"
        >
          <PlusIcon size={18} />
          <span>New Repo</span>
        </button>
      </div>

      {/* Create Repository Form */}
      {showCreateForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-md bg-white shadow-sm">
          <h3 className="text-lg font-medium mb-3">Create New Repository</h3>
          <form onSubmit={handleCreateRepo}>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Repository Name *</label>
              <input
                type="text"
                value={newRepoName}
                onChange={(e) => setNewRepoName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-yellow"
                placeholder="e.g., my-awesome-project"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Description (Optional)</label>
              <input
                type="text"
                value={newRepoDesc}
                onChange={(e) => setNewRepoDesc(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-yellow"
                placeholder="Brief description of your repository"
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">Private repository</span>
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-neon-yellow text-black rounded-md hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2Icon size={16} className="animate-spin" />
                    Creating...
                  </span>
                ) : (
                  'Create Repository'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <Loader2Icon size={30} className="animate-spin text-neon-yellow" />
        </div>
      )}

      {/* Repository List */}
      {!isLoading && repositories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repositories.map(repo => (
            <div 
              key={repo.id} 
              className="p-4 border border-gray-200 rounded-md hover:border-neon-yellow transition-all bg-white shadow-sm"
            >
              <div className="flex items-start gap-2">
                <FolderIcon size={20} className="text-neon-yellow flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-blue-600 hover:underline">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                  </h3>
                  {repo.description && (
                    <p className="text-sm text-gray-600 mt-1">{repo.description}</p>
                  )}
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <span className={`px-2 py-0.5 rounded-full ${repo.private ? 'bg-gray-100' : 'bg-green-100 text-green-800'}`}>
                      {repo.private ? 'Private' : 'Public'}
                    </span>
                    <span className="ml-2">Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && repositories.length === 0 && (
        <div className="text-center py-10">
          <FolderIcon size={40} className="mx-auto text-gray-400 mb-2" />
          <h3 className="text-lg font-medium">No repositories found</h3>
          <p className="text-gray-500">Create your first repository to get started</p>
        </div>
      )}
    </div>
  );
};

export default RepoList;