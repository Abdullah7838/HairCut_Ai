import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import {
  Camera,
  Upload,
  Sparkles,
  Scissors,
  User,
  Heart,
  Star,
  Zap,
} from "lucide-react";

export default function AdvancedHairStyle() {
  const [imageSrc, setImageSrc] = useState(null);
  const [faceShape, setFaceShape] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [faceFeatures, setFaceFeatures] = useState({});
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const imageRef = useRef();
  const fileInputRef = useRef();

  // ... (keep all your existing hairstyle map and other functions)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      setImageSrc(reader.result);
      await analyzeImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const triggerCamera = () => {
    // This will open the native camera on mobile devices
    // and file picker with camera option on desktop
    fileInputRef.current.click();
  };

  // ... (keep all your existing analyze functions)

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gray-100 rounded-full blur-xl opacity-50"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gray-50 rounded-full blur-lg opacity-30"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gray-100 rounded-full blur-2xl opacity-40"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gray-50 rounded-full blur-xl opacity-30"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="relative">
              <Scissors className="w-12 h-12 text-black transform -rotate-12" />
              <Sparkles className="w-6 h-6 text-gray-600 absolute -top-2 -right-2" />
            </div>
            <h1 className="text-5xl font-black text-black">AI StyleCraft</h1>
            <Zap className="w-12 h-12 text-gray-600" />
          </div>
          <p
            className="text-xl text-gray-700 font-light max-w-2xl mx-auto leading-relaxed"
            style={{
              fontSize: "1.25rem",
              color: "#374151",
              fontWeight: 300,
              maxWidth: "42rem",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "1.625",
            }}
          >
            Discover your perfect hairstyle with advanced AI face analysis and
            personalized recommendations
          </p>
        </div>

        {/* Upload/Camera Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-lg">
            {!imageSrc && (
              <div className="text-center space-y-8">
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <label className="group relative cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                      <Upload className="w-6 h-6" />
                      Upload Photo
                    </div>
                  </label>

                  <label className="group relative cursor-pointer">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <button
                      onClick={triggerCamera}
                      className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      <Camera className="w-6 h-6" />
                      Use Camera
                    </button>
                  </label>
                </div>

                <div className="text-gray-600 text-sm">
                  <p>
                    📸 For best results: face the camera directly, ensure good
                    lighting, and keep hair visible
                  </p>
                </div>
              </div>
            )}

            {/* Uploaded Image Display */}
            {imageSrc && (
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <img
                    ref={imageRef}
                    src={imageSrc}
                    alt="Your Photo"
                    className="w-80 h-80 object-cover rounded-3xl shadow-2xl border-4 border-gray-300"
                    onLoad={() => {
                      // Trigger analysis when image loads
                      if (!loading && !faceShape) {
                        analyzeImage(imageSrc);
                      }
                    }}
                  />
                  {loading && (
                    <div className="absolute inset-0 bg-black/50 rounded-3xl flex items-center justify-center">
                      <div className="text-white text-center space-y-4">
                        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                        <div className="text-lg font-semibold">
                          {animationStep === 0 && "Scanning for face..."}
                          {animationStep === 1 &&
                            "Detecting facial features..."}
                          {animationStep === 2 && "Analyzing face shape..."}
                          {animationStep === 3 &&
                            "Generating recommendations..."}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setImageSrc(null);
                    setFaceShape("");
                    setSuggestions([]);
                    setSelectedStyle(null);
                  }}
                  className="text-gray-600 hover:text-black underline transition-colors"
                >
                  ← Upload Different Photo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* No Face Detected Message */}
        {faceShape === "no_face" && !loading && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 rounded-3xl p-8 border-2 border-red-200 shadow-2xl text-center">
              <div className="text-6xl mb-4">😔</div>
              <h2 className="text-2xl font-bold text-black mb-4">
                No Face Detected
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We couldn't detect a face in your photo. For best results,
                please ensure:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-white rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📸</span>
                    <span className="text-black font-semibold">
                      Clear Photo
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Face clearly visible and in focus
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">💡</span>
                    <span className="text-black font-semibold">
                      Good Lighting
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Well-lit environment, avoid shadows
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">👤</span>
                    <span className="text-black font-semibold">
                      Front Facing
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Look directly at the camera
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">✂️</span>
                    <span className="text-black font-semibold">Show Hair</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Keep hair visible in the frame
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setImageSrc(null);
                  setFaceShape("");
                  setSuggestions([]);
                  setSelectedStyle(null);
                }}
                className="mt-6 bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-2xl font-semibold transform transition-all duration-300 hover:scale-105"
              >
                📷 Try Another Photo
              </button>
            </div>
          </div>
        )}

        {/* Results Section */}
        {faceShape && !loading && faceShape !== "no_face" && (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Face Shape Analysis */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-lg">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-4 mb-4">
                  <User className="w-8 h-8 text-black" />
                  <h2 className="text-3xl font-bold text-black">
                    Face Analysis Results
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Face Shape
                    </h3>
                    <p className="text-3xl font-black text-black capitalize">
                      {faceShape}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Confidence
                    </h3>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-green-600">
                        {Math.round(confidence * 100)}%
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${confidence * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-black mb-2">
                      Recommendations
                    </h3>
                    <p className="text-2xl font-bold text-yellow-600">
                      {suggestions.length}
                    </p>
                    <p className="text-sm text-gray-600">Custom styles</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hairstyle Recommendations */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-lg">
              <div className="flex items-center gap-4 mb-8">
                <Sparkles className="w-8 h-8 text-yellow-600" />
                <h2 className="text-3xl font-bold text-black">
                  Perfect Styles For You
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {suggestions.map((style, index) => (
                  <div
                    key={index}
                    className={`group relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer hover:scale-105 hover:bg-gray-50 ${
                      selectedStyle === index
                        ? "border-yellow-400 bg-yellow-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() =>
                      setSelectedStyle(selectedStyle === index ? null : index)
                    }
                  >
                    {/* Style Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{style.image}</span>
                        <div>
                          <h3 className="text-xl font-bold text-black group-hover:text-gray-800 transition-colors">
                            {style.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {style.description}
                          </p>
                        </div>
                      </div>

                      {style.popularity > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-yellow-600 font-semibold">
                            {style.popularity}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Style Stats */}
                    {style.difficulty !== "N/A" && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                            style.difficulty
                          )}`}
                        >
                          {style.difficulty}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getMaintenanceColor(
                            style.maintenance
                          )}`}
                        >
                          {style.maintenance} Maintenance
                        </span>
                      </div>
                    )}

                    {/* Popularity Bar */}
                    {style.popularity > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/70">Popularity</span>
                          <span className="text-white font-semibold">
                            {style.popularity}%
                          </span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-pink-400 to-yellow-400 h-2 rounded-full transition-all duration-1000 delay-300"
                            style={{ width: `${style.popularity}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Selection Indicator */}
                    {selectedStyle === index && (
                      <div className="absolute -top-2 -right-2">
                        <div className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center">
                          <Heart className="w-4 h-4 fill-current" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {selectedStyle !== null &&
                suggestions[selectedStyle]?.name !==
                  "Photo Analysis Failed" && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-300/30">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        🎉 Great Choice! "{suggestions[selectedStyle].name}"
                      </h3>
                      <p className="text-white/80 mb-4">
                        This style perfectly complements your {faceShape} face
                        shape and matches your preferences.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105">
                          💾 Save to Favorites
                        </button>
                        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold transform transition-all duration-300 hover:scale-105">
                          📍 Find Nearby Salons
                        </button>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-black">
          <p className="text-sm">
            Powered by Advanced AI • Privacy Focused • No Data Stored
          </p>
        </div>
      </div>
    </div>
  );
}