import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUserUrls } from '../api/user.api';
import Loader from './ui/Loader';
import ErrorBox from './ui/ErrorBox';
import { VITE_BASE_URL } from '../utils/constant';

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  });

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) return <Loader />;
  if (isError) return <ErrorBox message={error.message} />;

  if (!urls?.urls?.length)
    return <p className="text-center text-gray-500 dark:text-gray-400">No URLs found</p>;

  return (
    <div className="overflow-x-auto mt-8 bg-white dark:bg-gray-800 shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Original URL
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Short URL
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Clicks
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {urls.urls.reverse().map((url) => (
            <tr key={url._id}>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 truncate max-w-xs">
                {url.full_url}
              </td>
              <td className="px-6 py-4 text-sm">
                <a
                  href={`${VITE_BASE_URL}/${url.short_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {`${VITE_BASE_URL}/${url.short_url}`}
                </a>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                </span>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleCopy(`${VITE_BASE_URL}/${url.short_url}`, url._id)}
                  className={`text-sm font-medium px-3 py-1 rounded-md transition ${
                    copiedId === url._id
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copiedId === url._id ? 'Copied!' : 'Copy URL'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserUrl;