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
  //allTextArray: string[];
  wordCount: number; 
  characterCount: number;
  sentenceCount: number;
  theme: Theme;
  letterDensity: LetterDensity[];
  toggleTheme: () => void;
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
  //const [letterDensity, setLetterDensity] = useState<string[]>([]);
  //const [letterData, setLetterData] = useState<any[]>([]);
  const [letterDensity, setLetterDensity] = useState<LetterDensity[]>([]);
  const [allText, setAllText] = useState('');

  // Update body background color based on theme
React.useEffect(() => {
  //const body = document.querySelector('html') as HTMLHtmlElement;
  const html = document.documentElement;
  if (theme === 'dark') {
    html.style.background = 'linear-gradient(180deg, #040918 0%, #091540 100%)';
  } else {
    html.style.background = 'linear-gradient(180deg, #EBF2FC 0%, #EEF8F9 100%)';
  }
}, [theme]);


React.useEffect(() => {
  textSplitter(allText);
}, [allText]);
  
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const textSplitter =(text: string)=>{
    const words = text.split(/\s+/).filter(Boolean);
    console.log(words);
    const sentences = text.split('. ').filter(Boolean);
    const spaces = false;
    let characters =[];
    if (!spaces){
      characters = text.split('').filter((a)=>a!=" ").filter(Boolean);
    } else{
      characters = text.split('').filter(Boolean);
    }
    console.log(characters)
    setCharacterCount(characters.length);
    setWordCount(words.length);
    setSentenceCount(sentences.length);
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
  console.log('Holder',letterDataHolder);
  return letterDataHolder.sort((a, b) => b.percentage - a.percentage);
},[allText, characterCount])

const storeAllText =(text: string)=>{
  setAllText(text);
}

// Now, use useEffect to update the state when updateCharacterDensity (the memoized value) changes
  React.useEffect(() => {
    setLetterDensity(updateCharacterDensity);
    console.log('LD (after update in useEffect):', updateCharacterDensity); // This will show the updated value
  }, [updateCharacterDensity]); // Dependency for useEffect



  return (
    <CharacterContext.Provider value={{
      allText,
      //allTextArray,
      wordCount,
      characterCount,
      sentenceCount,
      theme,
      letterDensity,
      toggleTheme,
      textSplitter,
      storeAllText,
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