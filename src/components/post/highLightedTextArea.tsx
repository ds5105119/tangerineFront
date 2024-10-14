import React, { useEffect, useRef, ChangeEvent } from 'react';

interface HighlightedTextareaProps {
  text: string;
  tags: string[];
  setText: (text: string) => void;
  setTags: (tags: string[]) => void;
}

const HighlightedTextarea: React.FC<HighlightedTextareaProps> = ({ text, tags, setText, setTags }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [text, tags]); // tags제거해야함 (오류 때문에 잠시 넣음)

  const adjustTextareaHeight = () => {
    if (textareaRef.current && containerRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';

      // Calculate new height
      const newHeight = Math.min(textareaRef.current.scrollHeight, 384); // 384px = 24rem (h-96)

      // Set new height
      textareaRef.current.style.height = `${newHeight}px`;
      containerRef.current.style.height = `${newHeight}px`;
    }
  };

  const highlightHashtags = (): React.ReactNode[] => {
    const words: string[] = text.split(/(\s+)/);
    return words.map((word: string, index: number) => {
      if (word.startsWith('#')) {
        return (
          <span key={index} className="text-blue-500">
            {word}
          </span>
        );
      }
      return word;
    });
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const newText = e.target.value;
    if (newText.split('\n').length < 17) {
      setText(newText);
    }

    // Extract tags from the new text
    const newTags = newText.match(/#\w+/g) || [];
    setTags(newTags);
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-16 max-h-96 overflow-hidden">
      <div
        className="absolute inset-0 whitespace-pre-wrap break-words pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {highlightHashtags()}
      </div>
      <textarea
        ref={textareaRef}
        value={text}
        placeholder={`새로운 소식이 있나요?`}
        onChange={handleTextChange}
        className="w-full h-full bg-transparent resize-none outline-none border-none overflow-hidden"
        style={{ caretColor: 'black' }}
      />
    </div>
  );
};

export default HighlightedTextarea;
