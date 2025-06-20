import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createShortUrl } from '../api/shortURL.api';
import { queryClient } from '../main';
import Button from './ui/Button';
import Input from './ui/Input';
import ErrorBox from './ui/ErrorBox';

const URLForm = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
  try {
    const slugToSend = isAuthenticated ? customSlug.trim() : undefined;
    const short = await createShortUrl(url, slugToSend);
    setShortUrl(short);
    setError(null);
    queryClient.invalidateQueries({ queryKey: ['userUrls'] });
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div className="space-y-6">
      <Input
        label="Your Long URL"
        id="url"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        required
      />

      {isAuthenticated && (
        <Input
          label="Custom Slug (optional)"
          id="customSlug"
          type="text"
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value)}
          placeholder="my-custom-url"
        />
      )}

      <Button onClick={handleSubmit} type="submit" className="w-full">
        Shorten URL
      </Button>

      {error && <ErrorBox message={error} />}

      {shortUrl && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Short URL
          </label>
          <div className="flex items-center space-x-2">
            <input
              readOnly
              value={shortUrl}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-sm rounded-md"
            />
            <Button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-3 py-2"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default URLForm;