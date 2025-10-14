// components/TruncateText.tsx
"use client";

interface TruncateTextProps {
    text: string;
    maxLength: number;
}

export default function TruncateText({ text, maxLength }: TruncateTextProps) {
    if (!text) return null;

    const displayText = text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

    return <span title={text}>{displayText}</span>;
}
