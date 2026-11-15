export const CATEGORIES = [
  { value: "Photo Studio", label: "Photo Studios" },
  { value: "Film Stage", label: "Sound Stages" },
  { value: "Podcast Lounge", label: "Podcast Rooms" },
  { value: "Music Suite", label: "Music Suites" },
  { value: "Art Workshop", label: "Art Workshops" },
];

export const AMENITIES = [
  "Wi-Fi", "Air Conditioning", "Lighting Kit", "Green Screen", "Soundproofing",
  "Parking", "Changing Room", "Backdrops", "Microphones", "Kitchenette",
];
export const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='#94a3b8'/><text x='50%' y='50%' fill='white' font-family='sans-serif' font-size='40' font-weight='bold' text-anchor='middle' dominant-baseline='middle'>StudioSpace</text></svg>"
  );

export const onImgError = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = FALLBACK_IMG;
};