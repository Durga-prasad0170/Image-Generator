import React, { useEffect, useRef, useState } from 'react';
import { Camera, LoaderCircle, Download, Share2, ImagePlus, Sun, Moon } from 'lucide-react';
import { generateImage } from '../services/ImageService';
const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setError(null);

    try {
      const response = await generateImage(prompt);
      setImageData(response);
    } catch (err) {
      setError('Failed to generate images. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = (url) => {
    window.open(url, '_blank');
  };

  const handleShare = (unsplashUrl) => {
    window.open(unsplashUrl, '_blank');
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-black via-purple-900 to-black' : 'bg-gradient-to-br from-white via-purple-50 to-white'}`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-3 rounded-full transition-all duration-300 ${
          isDark 
            ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
            : 'bg-white hover:bg-gray-100 text-purple-600 shadow-lg'
        }`}
      >
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className={`absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl ${
          isDark 
            ? 'bg-gradient-to-br from-purple-500/20 to-transparent'
            : 'bg-gradient-to-br from-purple-200/40 to-transparent'
        }`} />
        <div className={`absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl ${
          isDark 
            ? 'bg-gradient-to-tl from-violet-500/20 to-transparent'
            : 'bg-gradient-to-tl from-violet-200/40 to-transparent'
        }`} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-6">
        {/* Website Name and Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent mb-4">
            VisionCraft
          </h1>
          {/* {/* <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Image <span className="text-purple-400">Generator</span>
          </h2> */}
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Transform your ideas into stunning visuals with our
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent"> AI-Image </span> generator
          </p> 
        </div>

        {/* Main Content */}
        <div className={`max-w-5xl mx-auto rounded-2xl shadow-xl p-6 md:p-8 border ${
          isDark 
            ? 'bg-gray-900/80 border-purple-500/20'
            : 'bg-white/80 border-purple-200'
        } backdrop-blur-lg`}>
          {/* Input Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="space-y-4">
              <label htmlFor="prompt" className={`block text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Describe your vision
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  id="prompt"
                  ref={input}
                  className={`flex-1 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDark 
                      ? 'bg-gray-800/90 text-white border-purple-500/30 placeholder-gray-400'
                      : 'bg-white text-gray-900 border-purple-200 placeholder-gray-500'
                  } border`}
                  placeholder="A serene lake surrounded by mountains at sunset..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading || !prompt}
                  className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-violet-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl shadow-purple-500/20"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" size={20} />
                      <span>Creating magic...</span>
                    </>
                  ) : (
                    <>
                      <Camera size={20} />
                      <span>Generate</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Image Display Area */}
          <div className={`border-2 border-dashed rounded-xl p-6 md:p-8 ${
            isDark 
              ? 'border-purple-500/30 bg-gray-800/50'
              : 'border-purple-300/50 bg-gray-50'
          }`}>
            {error && (
              <div className="text-red-400 text-center mb-6 p-4 bg-red-900/50 rounded-lg border border-red-500/30">
                {error}
              </div>
            )}

            {imageData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {imageData.map((photo, index) => (
                  <div key={index} className="group relative">
                    <div className={`rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 ${
                      isDark ? 'bg-gray-900' : 'bg-white'
                    }`}>
                      <div className="aspect-w-16 aspect-h-12 rounded-t-xl overflow-hidden">
                        <img
                          src={photo.url}
                          alt={`Search result ${index + 1}`}
                          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4 space-y-4 text-center">
                        <div className={`text-xs  ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Photo by{' '}
                          <a
                            href={photo.attribution.photographerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:underline"
                          >
                            {photo.attribution.photographer}
                          </a>{' '}
                          on{' '}
                          <a
                            href={photo.attribution.unsplashUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:underline"
                          >
                            Unsplash
                          </a>
                        </div>
                        <div className="flex justify-center gap-4 pb-4">
                          <button
                            onClick={() => handleDownload(photo.url)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                              isDark 
                                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                          >
                            <Download size={18} />
                            <span>Download</span>
                          </button>
                          <button
                            onClick={() => handleShare(photo.attribution.unsplashUrl)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                              isDark 
                                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                          >
                            <Share2 size={18} />
                            <span>View on Unsplash</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-12 space-y-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <ImagePlus size={64} className="mx-auto opacity-50" />
                <p className="text-lg">Your masterpiece will appear here</p>
                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Type your prompt above and let the magic happen
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {['High Quality', 'Fast Generation', 'Easy Sharing'].map((feature, index) => (
            <div
              key={feature}
              className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border ${
                isDark 
                  ? 'bg-gray-900/80 border-purple-500/20'
                  : 'bg-white/80 border-purple-200'
              } backdrop-blur-lg`}
            >
              <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                {feature}
              </h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                {index === 0 && 'Generate stunning, high-resolution images with incredible detail and clarity'}
                {index === 1 && 'Experience lightning-fast generation with our optimized AI pipeline'}
                {index === 2 && 'Download or share your generated masterpieces with just a single click'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;