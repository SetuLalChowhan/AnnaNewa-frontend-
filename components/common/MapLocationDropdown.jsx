"use client";
import React, { useState, useEffect, useRef } from "react";
import { MapPin, Search, Navigation, X, Loader2, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MapLocationDropdown = ({ onLocationSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [shouldSearch, setShouldSearch] = useState(false); // Flag to prevent auto-re-searching on select
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch from OpenStreetMap (via Nominatim API) - Totally Free, No Key Required
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2 && shouldSearch) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              query
            )}&addressdetails=1&limit=5`
          );
          const data = await response.json();
          setSuggestions(data);
          setIsOpen(true);
        } catch (error) {
          console.error("Geocoding error:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 500); // Debounce

    return () => clearTimeout(timer);
  }, [query, shouldSearch]);

  const handleSelect = (item) => {
    const displayName = item.display_name;
    setShouldSearch(false); // Disable searching when setting from selection
    setQuery(displayName);
    setIsOpen(false);
    setSelectedLocation(item);
    if (onLocationSelect) {
      onLocationSelect({
        label: displayName,
        value: item,
        coordinates: { lat: item.lat, lon: item.lon },
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleSelect(suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-12 min-h-[400px]">
      <div className="relative group" ref={dropdownRef}>
        {/* Label and Status */}
        <div className="flex items-center justify-between mb-3 px-1">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Globe size={12} className="text-indigo-500" />
            Global Geocoding
            <span className="text-[9px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded ml-2">
              FREE / OPEN SOURCE
            </span>
          </label>
          {isLoading && (
            <div className="flex items-center gap-2 text-indigo-500 text-[10px] font-bold">
              <Loader2 size={12} className="animate-spin" />
              Searching...
            </div>
          )}
        </div>

        {/* Input Wrapper */}
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShouldSearch(true); // Re-enable searching on manual input
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (query.length > 2) {
                setIsOpen(true);
                setShouldSearch(true);
              }
            }}
            placeholder="Search for any city, street or landmark..."
            className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-16 text-slate-800 font-semibold placeholder:text-slate-400 placeholder:font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none shadow-sm hover:border-slate-200"
          />

          <div className="absolute left-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            <Search size={20} />
          </div>

          {query && (
            <button
              onClick={() => {
                setQuery("");
                setSuggestions([]);
              }}
              className="absolute right-12 text-slate-300 hover:text-red-500 transition-colors"
            >
              <X size={18} />
            </button>
          )}

          <div className="absolute right-4 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-focus-within:bg-indigo-50 group-focus-within:text-indigo-500 transition-all">
            <MapPin size={16} />
          </div>
        </div>

        {/* Dropdown Suggestions */}
        <AnimatePresence>
          {isOpen && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute z-50 w-full mt-3 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-3xl shadow-2xl shadow-indigo-200/50 overflow-hidden"
            >
              <div className="p-2">
                {suggestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left p-4 rounded-2xl flex items-start gap-4 transition-all ${
                      selectedIndex === index
                        ? "bg-indigo-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`mt-1 p-2 rounded-xl ${
                        selectedIndex === index
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <MapPin size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-bold truncate ${
                          selectedIndex === index
                            ? "text-indigo-900"
                            : "text-slate-800"
                        }`}
                      >
                        {item.display_name.split(",")[0]}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate font-medium">
                        {item.display_name.split(",").slice(1).join(",")}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 py-3 px-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Powered by OpenStreetMap
                </span>
                <div className="flex gap-2">
                  <kbd className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-500 shadow-sm font-bold">
                    ↵ Enter
                  </kbd>
                  <kbd className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-500 shadow-sm font-bold">
                    ↑↓ Select
                  </kbd>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map Preview Section */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden bg-white border border-slate-100 rounded-[32px] shadow-xl"
            >
              <div className="p-4 flex items-center justify-between bg-slate-50/50 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800 truncate max-w-[200px]">
                      {selectedLocation.display_name.split(",")[0]}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      Verified Location
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="relative h-64 w-full bg-slate-100">
                <iframe
                  title="Map Preview"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                    parseFloat(selectedLocation.lon) - 0.01
                  },${parseFloat(selectedLocation.lat) - 0.01},${
                    parseFloat(selectedLocation.lon) + 0.01
                  },${
                    parseFloat(selectedLocation.lat) + 0.01
                  }&layer=mapnik&marker=${selectedLocation.lat},${
                    selectedLocation.lon
                  }`}
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                />

                {/* Visual Overlay for that Premium Look */}
                <div className="absolute inset-0 pointer-events-none border-[12px] border-white/10" />
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/50 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-700">
                      Live Preview
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Location Chips */}
        <div className="mt-8">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 text-center">
            Popular Destinations
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["New York", "London", "Tokyo", "Paris", "Dubai"].map((city) => (
              <button
                key={city}
                onClick={() => {
                  setQuery(city);
                  setShouldSearch(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-white border border-slate-100 text-xs font-bold text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 hover:scale-105 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero-like visual detail */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 mb-4">
          <Navigation size={14} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Privacy Focused Geocoding
          </span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">
          Find your perfect spot.
        </h1>
        <p className="text-slate-400 max-w-sm mx-auto text-sm font-medium">
          Zero tracking, zero API keys, and 100% free location services powered
          by the community.
        </p>
      </div>
    </div>
  );
};

export default MapLocationDropdown;
