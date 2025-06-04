import React, { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

// Types
type Theme = 'light' | 'dark';

interface LetterDensity {
  key: string;
  percentage: number;
  value: number;
}

interface CharacterContextType {
  allText: string;
  characterLimit: boolean;
  characterLimitValue: number;
  excludeSpaces:boolean;
  wordCount: number; 
  characterCount: number;
  sentenceCount: number;
  readTime: string;
  theme: Theme;
  letterDensity: LetterDensity[];
  calculateReadTime: ()=> void;
  toggleTheme: () => void;
  toggleCharacterLimit: () => void;
  toggleExcludeSpaces: () => void;
  storeCharacterLimitValue: (value: number) => void;
  textSplitter: (text: string) => void;
  storeAllText: (text: string) => void;
}

// Create Context
const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

const CharacterContextProvider=({children}:{ children: ReactNode })=> {
  const [theme, setTheme] = useState<Theme>('dark');
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [characterLimit, setCharacterLimit] = useState(false);
  const [characterLimitValue, setCharacterLimitValue] = useState(0);
  const [excludeSpaces, setExcludeSpaces] = useState(false);
  //const [letterDensity, setLetterDensity] = useState<string[]>([]);
  //const [letterData, setLetterData] = useState<any[]>([]);
  const [letterDensity, setLetterDensity] = useState<LetterDensity[]>([]);
  const [allText, setAllText] = useState('');
  const [readTime, setReadTime] = useState('');

  // Update body background color based on theme
React.useEffect(() => {
  //const body = document.querySelector('html') as HTMLHtmlElement;
  const html = document.documentElement;
  if (theme === 'dark') {
    html.style.background = '#12131a';
  } else {
    html.style.background = '#f2f2f7';
  }
}, [theme]);


React.useEffect(() => {
  textSplitter(allText);
}, [allText]);
React.useEffect(() => {
  calculateReadTime();
}, [wordCount]);
  
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    console.log('toggle theme clicked')
  };
  const toggleCharacterLimit = () => {
    setCharacterLimit(prev => (prev === false ? true : false));
  };
  const toggleExcludeSpaces = () => {
    setExcludeSpaces(prev => (prev === false ? true : false));
  };

  const storeCharacterLimitValue = (value: number) => {
    setCharacterLimitValue(value);
  };

  const textSplitter =(text: string)=>{
    const words = text.split(/\s+/).filter(Boolean);
    const sentences = text.split('. ').filter(Boolean);
    let characters =[];
    if (!excludeSpaces){
      characters = text.split('').filter(Boolean);
    } else{
      characters = text.split('').filter((a)=>a!=" ").filter(Boolean);
    }
    setCharacterCount(characters.length);
    setWordCount(words.length);
    setSentenceCount(sentences.length);
    console.log(excludeSpaces);
    console.log(characters, characters.length)
}

const updateCharacterDensity =useMemo(()=>{
    //create a countLetters object and loop through the string
  let countLetters: Record<string, number> = {};
  for (let i = 0; i < allText.length; i++) {
    //convert each character to uppercase
    const char = allText[i].toUpperCase();
    //check again that the character is uppercase
    if (/[A-Z]/.test(char)) {
      countLetters[char] = (countLetters[char] || 0) + 1;
    }
  }

  //let letterDataHolder = [];
  let letterDataHolder: LetterDensity[] = [];

  for (const [key, value] of Object.entries(countLetters)) {
    const percentage = ((value / characterCount) * 100).toFixed(2);
    letterDataHolder.push({ key, percentage: parseFloat(percentage), value });
  }
  return letterDataHolder.sort((a, b) => b.percentage - a.percentage);
},[allText, characterCount])

const storeAllText =(text: string)=>{
  setAllText(text);
}

function calculateReadTime() {
  const readTime =
    wordCount == 0 ? `0 minutes` : wordCount < 200 ? `<1 minute` : `${Math.floor(wordCount / 200)} minutes`;
    setReadTime(readTime);
}

// Now, use useEffect to update the state when updateCharacterDensity (the memoized value) changes
  React.useEffect(() => {
    setLetterDensity(updateCharacterDensity);
    //console.log('LD (after update in useEffect):', updateCharacterDensity); // This will show the updated value
  }, [updateCharacterDensity]); // Dependency for useEffect



  return (
    <CharacterContext.Provider value={{
      allText,
      characterLimit,
      characterLimitValue,
      excludeSpaces,
      wordCount,
      characterCount,
      sentenceCount,
      readTime,
      theme,
      letterDensity,
      calculateReadTime,
      toggleTheme,
      textSplitter,
      storeAllText,
      storeCharacterLimitValue,
      toggleCharacterLimit,
      toggleExcludeSpaces
    }}>
      {children}
    </CharacterContext.Provider>
  )
}

export default CharacterContext;

export const useGlobalContext =()=>{
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacterContext must be used within an ExtensionProvider');
  }
  return context;
}

export {CharacterContextProvider}