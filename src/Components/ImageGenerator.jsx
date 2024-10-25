import React, { useEffect, useRef, useState } from 'react';
import { Camera, LoaderCircle, Download, Share2, ImagePlus } from 'lucide-react';
import { generateImage } from '../services/ImageService';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState([]); // Change to an array
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await generateImage(prompt);
      setImageData(response); // Store the array of image objects
    } catch (err) {
      setError('Failed to fetch images. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  const input=useRef(null)

  useEffect(()=>{
      input.current.focus()
  },[])
  const handleDownload = (url) => {
    window.open(url, '_blank');
  };

  const handleShare = (unsplashUrl) => {
    window.open(unsplashUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Image <span className='text-4xl font-bold text-blue-600 mb-2'>Generator</span></h1>
          <p className="text-gray-600">Unleash Your <span className=' text-blue-600'>Imagination</span>: Transform Words into<span className='text-blue-500'> Stunning Visuals!</span></p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Input Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                Search for an image
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="prompt"
                  ref={input}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                  placeholder="A serene lake surrounded by mountains at sunset..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading || !prompt}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" size={20} />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Camera size={20} />
                      Generate
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Image Display Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}
            
            {imageData.length > 0 ? (
              <div className=" gap-y-10 flex flex-wrap justify-between">
              {
                imageData.map((photo, index) => (
                  <div key={index} className="space-y-4">
                    <div className="bg-white rounded-lg flex flex-wrap justify-center w-[350px] shadow-lg">
                      <img
                        src={photo.url}
                        alt={`Search result ${index + 1}`}
                        className="rounded-lg w-full h-[300px] object-cover"
                      />
                    <div className="text-center text-sm text-gray-600 pt-6 pb-3">
                      Photo by{' '}
                      <a 
                        href={photo.attribution.photographerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {photo.attribution.photographer}
                      </a>
                      {' '}on{' '}
                      <a 
                        href={photo.attribution.unsplashUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Unsplash
                      </a>
                    </div>
                    <div className="flex justify-center gap-4 pb-6">
                      <button 
                        onClick={() => handleDownload(photo.url)}
                        className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        <Download size={20} />
                        Download
                      </button>
                      <button 
                        onClick={() => handleShare(photo.attribution.unsplashUrl)}
                        className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        <Share2 size={20} />
                        View on Unsplash
                      </button>
                    </div>
                    </div>
                    {/* Attribution */}
                 
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 space-y-2">
                <ImagePlus size={48} className="mx-auto opacity-50" />
                <p>Your images will appear here</p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">High Quality</h3>
            <p className="text-gray-600 text-sm">Generate stunning, high-resolution images with incredible detail</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">Fast Generation</h3>
            <p className="text-gray-600 text-sm">Get your results in seconds with our optimized pipeline</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold mb-2">Easy Sharing</h3>
            <p className="text-gray-600 text-sm">Download or share your generated images instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
