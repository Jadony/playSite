/** 按中英文句号分句，保留原句号，并用换行连接。 */
export const formatAchievementTitle = (title?: string | null): string => {
  const sentences = title?.match(/[^。.]+[。.]*/g);
  return (
    sentences?.map((sentence) => sentence.trim()).filter(Boolean).join("\n") ?? ""
  );
};
