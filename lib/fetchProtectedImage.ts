"use client";

export default async function fetchProtectedImage() {
  const response = await fetch(`/api/media`);

  if (response.ok) {
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    console.log(imageUrl);
    return imageUrl;
  } else {
    throw new Error("Ошибка при загрузке изображения");
  }
}
